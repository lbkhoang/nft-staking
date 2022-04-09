import { useContractFunction, useCall } from "@usedapp/core"
import stakingAbi from '../abi/stakingAbi.json'
import nftAbi from '../abi/nftAbi.json'
import { utils } from "ethers"
import { Contract } from "@ethersproject/contracts"
import { useEffect, useState } from "react"
import { CONTRACT_ADDRESS } from "../constant/CONSTANT"

export const useStakeNFT = (tokenAddress : string | null | undefined) => {
    
    // nftAbi
    const nftContractAddress = CONTRACT_ADDRESS.NFT_CONTRACT_ADDRESS;
    const nftInterface = new utils.Interface(nftAbi);
    const nftContract = new Contract(
        nftContractAddress,
        nftInterface
    )
        
    // stakingAbi
    const stakingContractAddress = CONTRACT_ADDRESS.STAKING_CONTRACT_ADDRESS;
    const stakingInterface = new utils.Interface(stakingAbi);
    const stakingContract = new Contract(
        stakingContractAddress,
        stakingInterface
    )

    const nftIdArray = useCall({
        contract: nftContract,
        method: 'walletOfOwner',
        args: [tokenAddress]
    });

    const nftId = [nftIdArray?.value[0][0]?.toNumber().toString()]

    const isApprovedForAll = useCall({
        contract: nftContract,
        method: 'isApprovedForAll',
        args: [tokenAddress, CONTRACT_ADDRESS.STAKING_CONTRACT_ADDRESS]
    });

    const { send: approveErc721Send, state: approveErc721State } =
    useContractFunction(nftContract, "setApprovalForAll", {
        transactionName: "Approve ERC721 transfer",
    })
    
    const { send: stakeNFT, state: stakeState} = 
    useContractFunction(stakingContract, "stake", { 
        transactionName: "Stake NFT" 
    })
            

    const approveAndStake = (amount: string | null | undefined) => {
        if (isApprovedForAll?.value[0]) {
            if (nftId[0] === undefined) {
                alert("You need to mint nft to stake");
            } else {
                return stakeNFT(nftId)
            }
        } else {
            return approveErc721Send(nftContractAddress, amount)
        }
    }

    const [state, setState] = useState(approveErc721State)

    useEffect(() => {
        if(approveErc721State.status === "Success"){
            // console.log("hello")
            // console.log(nftId?.value[0])
            // console.log()
            stakeNFT(nftId)
        }
    }, [approveErc721State])

    return { approveAndStake, approveErc721State }
}
