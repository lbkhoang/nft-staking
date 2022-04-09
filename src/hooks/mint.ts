import { useCall, useContractFunction } from "@usedapp/core"
import nftAbi from '../abi/nftAbi.json'
import { utils } from "ethers"
import { Contract } from "@ethersproject/contracts"
import { CONTRACT_ADDRESS } from "../constant/CONSTANT"

export const useMintGenesisNFT = (walletAddress : string | null | undefined) => {

    // nftAbi
    const nftContractAddress = CONTRACT_ADDRESS.NFT_CONTRACT_ADDRESS;;
    const nftInterface = new utils.Interface(nftAbi);
    const nftContract = new Contract(
        nftContractAddress,
        nftInterface
    )
    
    
    const getWhitelist = useCall({
        contract: nftContract,
        method: 'whitelist',
        args: [walletAddress]
    });   
    
    const isWhitelisted = getWhitelist?.value[0]

    const { send: mintNFT, state: mintState} = useContractFunction(nftContract, "mint", { transactionName: "Mint" })

    const mint = () => {
        return mintNFT("1")
    }

    return { mint, mintState, isWhitelisted }
}