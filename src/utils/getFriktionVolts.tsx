import { FriktionSDK, VoltSDK } from "@friktion-labs/friktion-sdk"
import { AnchorProvider } from "@project-serum/anchor"
import { Connection, PublicKey } from "@solana/web3.js"
import MockWallet from "@/context/Anchor/MockWallet"

export async function getFriktionVolts() {
    const PROVIDER_URL =
    "https://friktion.rpcpool.com/07afafb9df9b278fb600cadb4111"
    // const PROVIDER_URL = "https://ssc-dao.genesysgo.net/"
    // const PROVIDER_URL = "https://api.devnet.solana.com"
    // const PROVIDER_URL = "https://solana-api.projectserum.com"
    // const PROVIDER_URL = "https://api.mainnet-beta.solana.com"
    const provider = new AnchorProvider(
      new Connection(PROVIDER_URL),
      MockWallet,
      {}
    )
    let voltVaults: VoltSDK[]
    const friktionSdk = new FriktionSDK({
      provider: provider,
      // network: "devnet",
      network: "mainnet-beta",
    })
    
    voltVaults = await friktionSdk.getAllVoltsInSnapshot()
    // console.log("voltVaults", voltVaults)

    return voltVaults
}