import ChakraNextLink from '../ChakraNextLink'
import React, { Suspense } from 'react'
import {
    Flex, 
    Stack, HStack, 
    useColorModeValue as mode, 
    Image, Text, Heading,
    ScaleFade,
    Skeleton, SkeletonText,
} from '@chakra-ui/react'
import styles from '@/styles/Home.module.css'

// Style config //
const statStyle = {
    align: 'center',
    direction: 'row',
    filter: 'invert(40%)'
}
// Style config //

const MarketCard = ({ volt }) => {
    const { apy, nextAutocompoundingTime, underlyingTokenSymbol, voltVaultId, tvlUsd, capacityUsd } = volt
    const iconColor = mode('invert(0%)', 'invert(100%)')
    
    const dt = new Date(nextAutocompoundingTime)

    return (
        <ChakraNextLink to={`/trade/${voltVaultId}`} _hover={{ textDecoration:'none'}}>
            <ScaleFade initialScale={0.9} in={true}>
                <Stack spacing={4} p={5}
                    borderColor={mode('#CFDAE1', '#696969')} borderWidth={1} rounded={'10px'}
                    backdropFilter={{ 'base': 'none', 'md': 'blur(0px)' }} // <-- Somehow improves page transition latency
                    bg={mode('transparent', 'rgba(23, 25, 35, 0.2)')}
                    _hover={{
                        boxShadow: '2xl',
                        transition: 'all .3s ease',
                        borderColor: 'white',
                        background: mode('white', ''),
                    }}
                >
                    {/* <Image filter={iconColor} src={`/${volt.category}.svg`} alt={volt.category} 
                        width={25} height={25}
                        fallback={<Skeleton width={25} height={25} />}
                    /> */}
                        
                    <Suspense fallback={<SkeletonText width={{ 'base': '80%', 'md': '100px' }}/>}>
                        <Stack spacing={1}>
                            <Heading size={'md'}>{underlyingTokenSymbol}</Heading>
                            <h3>on {dt.toLocaleString('default', { month: 'long' })} {dt.getDate()}</h3>
                        </Stack>
                    </Suspense>
                    
                        <Flex fontWeight={'semibold'} justify={'space-between'} direction={{ 'base': 'row', 'md': 'column', 'lg': 'row' }}>
                            <Text>TVL ${tvlUsd.toLocaleString("en-US", { maximumFractionDigits: 0})}</Text>
                            <Stack direction={'row'} spacing={3}>
                                <Text color={'purple.500'}>APY {apy}%</Text>
                            </Stack>
                        </Flex>

                        <hr />

                        <Stack pt={2} spacing={4} direction={'column'}>                
                            <HStack sx={statStyle}>
                                <Image filter={iconColor} src={'/liquidity.png'} width={17} height={17} alt="recurrence" />
                                <h4>${capacityUsd.toLocaleString("en-US")}</h4>
                            </HStack>
                            <HStack sx={statStyle}>
                                <Image filter={iconColor} src={'/recurrence.png'} width={17} height={17} alt="recurrence" />
                                <h4>Weekly</h4>
                            </HStack>
                        </Stack>
                </Stack>
            </ScaleFade>
        </ChakraNextLink>
    );
};

export default MarketCard