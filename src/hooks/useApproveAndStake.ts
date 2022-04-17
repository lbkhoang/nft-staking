import { useContractFunction, useCall } from "@usedapp/core"
import { BigNumber } from "ethers"
import { useEffect, useState } from "react"
import { CONTRACT_ADDRESS } from "../constant/CONSTANT"
import { StakingContract } from "../contract/stakingContract"
import { NftContract } from "../contract/nftContract"

export const useStakeNFT = (walletAddress : string | undefined) => {
    
    // nftAbi
    const nftContract = NftContract();
        
    // stakingAbi
    const stakingContract = StakingContract();


    function useWalletOfOwner(walletAddress: string | undefined): BigNumber | undefined {
        const { value, error } = useCall(walletAddress && {
          contract: nftContract,
          method: 'walletOfOwner',
          args: [walletAddress]
        }) ?? {}
        if(error) {
          console.error(error.message)
          return undefined
        }
        return value?.[0]
    }
  
    const nftId = useWalletOfOwner(walletAddress)?.[0]?.toString();

    function useIsApprovedForAll(walletAddress: string | undefined): BigNumber | undefined {
        const { value, error } = useCall(walletAddress && {
          contract: nftContract,
          method: 'isApprovedForAll',
          args: [walletAddress, CONTRACT_ADDRESS.STAKING_CONTRACT_ADDRESS]
        }) ?? {}
        if(error) {
          console.error(error.message)
          return undefined
        }
        return value?.[0].toString()
    }

    const isApproved = useIsApprovedForAll(walletAddress);

    const { send: approveErc721Send, state: approveErc721State } =
    useContractFunction(nftContract, "setApprovalForAll", {
        transactionName: "Approve ERC721 transfer",
    })
    
    const { send: stakeNFT, state: stakeState} = 
    useContractFunction(stakingContract, "stake", { 
        transactionName: "Stake NFT" 
    })
            

    const approveAndStake = (amount: string | null | undefined) => {
        if (isApproved) {
            if (nftId === undefined) {
                //alert("You need NFT in your wallet to stake");
            } else {
                return stakeNFT([nftId])
            }
        } else {
            return approveErc721Send(CONTRACT_ADDRESS.NFT_CONTRACT_ADDRESS, amount)
        }
    }

    const [state, setState] = useState(approveErc721State)

    useEffect(() => {
        if(approveErc721State.status === "Success"){
            stakeNFT([nftId])
        }
    }, [approveErc721State])

    return { approveAndStake, approveErc721State, nftId, stakeState }
}
