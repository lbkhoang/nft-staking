import { Contract } from "@ethersproject/contracts";
import { utils } from "ethers";
import { CONTRACT_ADDRESS } from "../constant/CONSTANT";
import stakingAbi from '../abi/stakingAbi.json'

export const StakingContract = () : Contract => {
    
    const stakingContractAddress = CONTRACT_ADDRESS.STAKING_CONTRACT_ADDRESS;
    const stakingInterface = new utils.Interface(stakingAbi);
    const stakingContract = new Contract(
        stakingContractAddress,
        stakingInterface
    )

    return stakingContract
}