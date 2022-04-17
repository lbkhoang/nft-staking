import { useCall, useContractFunction } from "@usedapp/core"
import { BigNumber } from "ethers"
import { NftContract } from "../contract/nftContract"

export const useMintGenesisNFT = (walletAddress : string | undefined) => {

    // nftAbi
    const nftContract = NftContract();
    
    function useWhitelist(walletAddress: string | undefined): BigNumber | undefined {
        const { value, error } = useCall(walletAddress && {
          contract: nftContract,
          method: 'whitelist',
          args: [walletAddress]
        }) ?? {}
        if(error) {
          console.error(error.message)
          return undefined
        }
        return value?.[0]
    }
  
    const isWhitelisted = useWhitelist(walletAddress);

    const { send: mintNFT, state: mintState} = useContractFunction(nftContract, "mint", { transactionName: "Mint" })

    const mint = () => {
        return mintNFT("1")
    }

    return { mint, mintState, isWhitelisted }
}