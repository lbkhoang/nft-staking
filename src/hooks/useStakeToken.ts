import { useEthers, useContractFunction } from "@usedapp/core"
import tokenAbi from '../abi/tokenAbi.json'
import stakingAbi from '../abi/stakingAbi.json'
import nftAbi from '../abi/nftAbi.json'
import { utils } from "ethers"
import { Contract } from "@ethersproject/contracts"
import { useEffect, useState } from "react"

export const useStakeToken = (tokenAddress : string) => {
    const {account} = useEthers()
    // tokenAbi
    const tokenContractAddress = '0xa1d9C943388029493422fE9fF83163758880bABa';
    const tokenInterface = new utils.Interface(tokenAbi);
    const tokenContract = new Contract(
        tokenContractAddress,
        tokenInterface
    )

    // nftAbi
    const nftContractAddress = '0xc3cc20df24b714be6b817e167b33900944690b5d';
    const nftInterface = new utils.Interface(nftAbi);
    const nftContract = new Contract(
        nftContractAddress,
        nftInterface
    )

    // stakingAbi
    const stakingContractAddress = '0xa1d9C943388029493422fE9fF83163758880bABa';
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
        console.log(approveErc20State.status === "Success")
        if(approveErc20State.status === "Success"){
            console.log("hello")
            mintNFT(account,3)
        }
    }, [approveErc20State])

    return { approveAndMint, approveErc20State }
}