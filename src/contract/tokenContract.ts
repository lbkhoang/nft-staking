import { Contract } from "@ethersproject/contracts";
import { utils } from "ethers";
import { CONTRACT_ADDRESS } from "../constant/CONSTANT";
import tokenAbi from '../abi/tokenAbi.json'

export const TokenContract = () : Contract => {
    
    const tokenContractAddress = CONTRACT_ADDRESS.TOKEN_CONTRACT_ADDRESS;
    const tokenInterface = new utils.Interface(tokenAbi);
    const tokenContract = new Contract(
        tokenContractAddress,
        tokenInterface
    )

    return tokenContract
}