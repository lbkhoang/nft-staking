import { useCall, useContractFunction } from "@usedapp/core"
import { BigNumber } from "ethers"
import { StakingContract } from "../contract/stakingContract"

export const useClaim = (walletAddress : string | undefined) => {

    // stakingAbi
    const stakingContract = StakingContract();
    
    function useBalanceOf(walletAddress: string | undefined): BigNumber | undefined {
        const { value, error } = useCall(walletAddress && {
          contract: stakingContract,
          method: 'useBalanceOf',
          args: [walletAddress]
        }) ?? {}
        if(error) {
          console.error(error.message)
          return undefined
        }
        return value?.[0]
    }
  
    const nftList = useBalanceOf(walletAddress)?.toString();

    const { send: mintNFT, state: mintState} = useContractFunction(stakingContract, "mint", { transactionName: "Mint" })

    const mint = () => {
        return mintNFT("1")
    }

    return { mint, mintState }
}