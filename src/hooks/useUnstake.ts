import { useCall, useContractFunction } from "@usedapp/core"
import { BigNumber } from "ethers"
import { StakingContract } from "../contract/stakingContract"

export const useUnstake = (walletAddress : string | undefined) => {

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

    const { send: unstakeToken, state: unstakeState} = useContractFunction(stakingContract, "unstake", { transactionName: "Unstake" })

    const unstake = () => {
        return unstakeToken(nftList)
    }

    return { unstake, unstakeState, nftList }
}