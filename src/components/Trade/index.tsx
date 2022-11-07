import React, { Suspense, useEffect } from 'react'
import {
    Stack, HStack, 
    SimpleGrid, 
    Image,
    Box,
    useCheckboxGroup,
    Skeleton,
    Alert, AlertIcon, Spinner, Center,
} from '@chakra-ui/react'
import { getFriktionVolts } from '@/utils/getFriktionVolts'

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

const fetcher = (url) => fetch(url).then((res) => res.json())

const categories = ['Shorts Options', 'Principal Protection', 'Entropy']

// TODO: 1. add createMarket button/modal for admin
//  2. Search bar

const MarketList: any = () => {
    // FilterToggle state management is be ignored for the time being
    const { value, getCheckboxProps } = useCheckboxGroup({ defaultValue: [] })

    const volts = useMemo(() => {
        getFriktionVolts()
    }, [])
    console.log(volts)

    if (!volts) {
        return (
            <Alert status='error' rounded={'lg'}>
                <AlertIcon mr={4} />
                An error has occured loading Friktion volts.            
            </Alert>
        )
    }

    let filteredMarkets = []
    // if (volts) {
    //     filteredMarkets = volts.filter(({ category }) => value.includes(category))
    // }
    
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
                        {volts.map((volt: any) => (
                            <Stack key={volt.voltKey}>
                                <MarketCard volt={volt} />
                            </Stack>
                        ))}
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