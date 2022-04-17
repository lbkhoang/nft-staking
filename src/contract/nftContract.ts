import { Contract } from "@ethersproject/contracts";
import { utils } from "ethers";
import { CONTRACT_ADDRESS } from "../constant/CONSTANT";
import nftAbi from '../abi/nftAbi.json'

export const NftContract = () : Contract => {
    
    const nftContractAddress = CONTRACT_ADDRESS.NFT_CONTRACT_ADDRESS;
    const nftInterface = new utils.Interface(nftAbi);
    const nftContract = new Contract(
        nftContractAddress,
        nftInterface
    )
    return nftContract
}