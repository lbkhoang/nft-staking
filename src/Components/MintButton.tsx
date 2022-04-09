import { useEthers } from "@usedapp/core"
import { Button } from "@mui/material"
import { useMintGenesisNFT } from "../hooks/mint";

export const MintButton = () => {
    const { account, activateBrowserWallet } = useEthers()
    const isConnected = account !== undefined

    const { mint, mintState, isWhitelisted } = useMintGenesisNFT(account)
    const handleStakeSubmit = () => {
        return mint()
    }
    return (
        <>
            {isConnected ? (
                <Button 
                    color="secondary" fullWidth
                    variant="outlined"
                    onClick={handleStakeSubmit}>
                    Mint!!!
                </Button>
            ) : (
                <Button
                    color="primary" fullWidth
                    variant="outlined"
                    onClick={() => activateBrowserWallet()}>
                    Connect
                </Button>
            )
            }
        </>
    )
}