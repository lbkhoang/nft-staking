import { useCall, useContractFunction } from "@usedapp/core"
import { BigNumber } from "ethers"
import { StakingContract } from "../contract/stakingContract"

export const useClaim = (walletAddress : string | undefined) => {

    // stakingAbi
    const stakingContract = StakingContract();
    
    function useTokensOfOwner(walletAddress: string | undefined): BigNumber | undefined {
        const { value, error } = useCall(walletAddress && {
          contract: stakingContract,
          method: 'tokensOfOwner',
          args: [walletAddress]
        }) ?? {}
        if(error) {
          console.error(error.message)
          return undefined
        }
        return value?.[0]
    }
  
    const nftList = useTokensOfOwner(walletAddress)?.toString().split(",");

    const { send: claimToken, state: claimState} = useContractFunction(stakingContract, "claim", { transactionName: "Claim" })

    const claim = () => {
        return claimToken(nftList)
    }

    return { claim, claimState, nftList }
}