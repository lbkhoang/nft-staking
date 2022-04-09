import { useEthers, useContractFunction } from "@usedapp/core"
import tokenAbi from '../abi/tokenAbi.json'
import stakingAbi from '../abi/stakingAbi.json'
import nftAbi from '../abi/nftAbi.json'
import { utils } from "ethers"
import { Contract } from "@ethersproject/contracts"
import { useEffect, useState } from "react"
import { CONTRACT_ADDRESS } from "../constant/CONSTANT"

export const useStakeToken = (tokenAddress : string) => {
    const {account} = useEthers()
    // tokenAbi
    const tokenContractAddress = CONTRACT_ADDRESS.TOKEN_CONTRACT_ADDRESS;
    const tokenInterface = new utils.Interface(tokenAbi);
    const tokenContract = new Contract(
        tokenContractAddress,
        tokenInterface
    )

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
    const { send: mintNFT, state: mintState} = useContractFunction(nftContract, "mint", { transactionName: "Mint" })

    const { send: approveErc20Send, state: approveErc20State } =
        useContractFunction(tokenContract, "approve", {
        transactionName: "Approve ERC20 transfer",
    })

    const approveAndMint = (amount: string) => {
        return approveErc20Send(nftContractAddress, amount)
    }

    const [state, setState] = useState(approveErc20State)

    useEffect(() => {
        if(approveErc20State.status === "Success"){
            console.log("hello")
            mintNFT(account,3)
        }
    }, [approveErc20State])

    return { approveAndMint, approveErc20State }
}