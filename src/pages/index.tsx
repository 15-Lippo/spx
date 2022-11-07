import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import WithSubnavigation from 'components/TopBar'
import MarketList from '@/components/Trade'
import { Box, Stack, Heading, Text, useColorModeValue as mode, Image } from '@chakra-ui/react'
import Layout from 'components/Layout'

const Home: NextPage = () => {
  
  return (
    <div className={styles.container}>
      <Head>
        <title>Pascal Protocol</title>
        <meta name="description" content="Trade directly on the outcome of events" />
        <meta property="og:title" content="Pascal Protocol" />
        <meta
          property="og:description"
          content="Trade directly on the outcome of events"
        />
        <meta
          property="og:image"
          content="/Preview.png"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <WithSubnavigation />

      <Layout>
        <Box maxW={{ base: '3xl', lg: '5xl' }}
          mx="auto"
          py={{ base: '10', md: '10', lg: '12' }}
          zIndex={1}
        >
          <Stack spacing={{ base: 8, md: 10 }}>
            <Heading
                lineHeight={1.1}
                fontWeight={600}
                fontSize={{ base: '4xl', sm: '4xl', lg: '6xl' }}>
                <Text
                  as={'span'}
                  position={'relative'}
                >
                  Friktion
                </Text>
                <Text
                  as={'span'}
                  position={'relative'}
                  color={'gray.500'}
                >
                  &nbsp;SDK Challenge
                </Text>
                <br />
              </Heading>
              <Text color={mode('gray.500', 'gray.200')} fontSize={{ base: 'xl', md: '2xl' }}>
                A very superficial view of Friktion volts
              </Text>
              
            <MarketList />
          </Stack>
        </Box>
      </Layout>
    </div>
  )
}

export default Home
