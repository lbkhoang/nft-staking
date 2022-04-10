import { useCall, useContractFunction } from "@usedapp/core"
import nftAbi from '../abi/nftAbi.json'
import { utils, BigNumber } from "ethers"
import { Contract } from "@ethersproject/contracts"
import { CONTRACT_ADDRESS } from "../constant/CONSTANT"

export const useMintGenesisNFT = (walletAddress : string | undefined) => {

    // nftAbi
    const nftContractAddress = CONTRACT_ADDRESS.NFT_CONTRACT_ADDRESS;;
    const nftInterface = new utils.Interface(nftAbi);
    const nftContract = new Contract(
        nftContractAddress,
        nftInterface
    )
    
    function useWhitelist(walletAddress: string | undefined): BigNumber | undefined {
        const { value, error } = useCall(walletAddress && {
          contract: nftContract,
          method: 'whitelist',
          args: [walletAddress]
        }) ?? {}
        if(error) {
          console.error(error.message)
          return undefined
        }
        return value?.[0]
    }
  
    const isWhitelisted = useWhitelist(walletAddress);

    const { send: mintNFT, state: mintState} = useContractFunction(nftContract, "mint", { transactionName: "Mint" })

    const mint = () => {
        return mintNFT("1")
    }

    return { mint, mintState, isWhitelisted }
}