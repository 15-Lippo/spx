import React, { Suspense, useEffect, useState } from 'react'
import {
    Stack, HStack, 
    SimpleGrid, 
    Image,
    Box,
    useCheckboxGroup,
    Skeleton,
    Alert, AlertIcon, Spinner, Center,
} from '@chakra-ui/react'
import { AnchorProvider } from '@project-serum/anchor'
import { Connection } from '@solana/web3.js'
import { FriktionSDK, VoltSDK } from '@friktion-labs/friktion-sdk'
import MockWallet from '@/context/Anchor/MockWallet'

const FilterToggle = React.lazy(() => import('./FilterToggle'))
const MarketCard = React.lazy(() => import('./MarketCard'))

// Style config //
const gradientBackgroundStyle = {
    filter: 'blur(110px)',
    position: 'absolute',
    zIndex: -1,
    opacity: '50%',
}
// Style config //

const categories = ['Covered Calls', 'Cash Secured Puts', 'Basis', 'Capital Protection']

// TODO: 1. add createMarket button/modal for admin
//  2. Search bar

const MarketList: any = () => {
    // FilterToggle state management is be ignored for the time being
    const { value, getCheckboxProps } = useCheckboxGroup({ defaultValue: [] })
    const [volts, setVolts] = useState<any>([])

    const PROVIDER_URL = "https://friktion.rpcpool.com/07afafb9df9b278fb600cadb4111"
    const provider = new AnchorProvider(
      new Connection(PROVIDER_URL),
      MockWallet,
      {}
    )
    const friktionSdk = new FriktionSDK({
      provider: provider,
      // network: "devnet",
      network: "mainnet-beta",
    })

    useEffect(() => {
        const getFriktionVolts = async () => {
            const voltVaults = await friktionSdk.getAllVoltsInSnapshot()

            setVolts(voltVaults[0].sdk.snapshot?.allMainnetVolts)
        }
        getFriktionVolts()
            .catch(console.error)
    }, [])
    console.log("volts", volts)

    for (let i = 0; i < volts.length; i++) {
        if (volts[i].globalId.includes("call")) {
            volts[i]["category"] = 'Covered Calls'
        } else if (volts[i].globalId.includes("put")) {
            volts[i]["category"] = 'Cash Secured Puts'
        } else if (volts[i].globalId.includes("basis")) {
            volts[i]["category"] = 'basis'
        } else if (volts[i].globalId.includes("protection")) {
            volts[i]["category"] = 'Capital Protection'
        }
    }
    
    if (!volts) {
        return (
            <Alert status='error' rounded={'lg'}>
                <AlertIcon mr={4} />
                An error has occured loading Friktion volts.            
            </Alert>
        )
    }

    let filteredVolts = []
    if (volts) {
        filteredVolts = volts.filter(({ category }) => value.includes(category))
    }
    console.log("filteredVolts", filteredVolts)
    
    return (
        <Box>
            <HStack py={5}>
                {categories.map((category, index) => (
                    <Stack key={index}>
                        <Suspense fallback={<Skeleton height={'30px'} width={'100px'} />}>
                            <FilterToggle
                                {...getCheckboxProps({ value: category })}
                                iconUrl={`./${category}.svg`}
                                title={category}
                            />
                        </Suspense>
                    </Stack>
                ))}
            </HStack>

            <Suspense fallback={
                <Center mt={"200px"}>
                    <Spinner/>
                </Center>
            }>
                <SimpleGrid columns={{ base: 1, md: 3 }} spacing={5}>
                    {filteredVolts.length != 0 ?
                        (filteredVolts.map((volt: any) => (
                            <Stack key={volt.voltKey}>
                                <MarketCard volt={volt} />
                            </Stack>
                        )))
                        : (volts && volts.map((volt: any) => (
                            <Stack key={volt.voltKey}>
                                <MarketCard volt={volt} />
                            </Stack>
                        )))
                    }
                </SimpleGrid>
            </Suspense>

            <Image sx={gradientBackgroundStyle} src={'gradient-bg.png'}
                // eslint-disable-next-line react-hooks/rules-of-hooks
                alt={'background'} right={'100px'} top={'100px'} transform={'rotate(180deg)'} 
            />
            <Image sx={gradientBackgroundStyle} src={'gradient-bg.png'} 
                // eslint-disable-next-line react-hooks/rules-of-hooks
                alt={'background'} right={'100px'} bottom={'0px'} transform={'rotate(300deg)'} 
            />
      </Box>
    );
};
  
export default MarketList