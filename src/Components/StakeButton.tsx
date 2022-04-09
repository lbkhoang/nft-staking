import { useEthers } from "@usedapp/core"
import { Button } from "@mui/material"
import { useStakeNFT } from "../hooks/approveAndStake";

export const StakeButton = () => {
    const { account, activateBrowserWallet, deactivate } = useEthers()
    const isConnected = account !== undefined

    const { approveAndStake, approveErc721State } = useStakeNFT(account)
    const handleStakeSubmit = () => {
        return approveAndStake(account)
    }

    return (
        <>
            {isConnected ? (
                <Button color="secondary" fullWidth
                variant="outlined" 
                onClick={handleStakeSubmit}>
                    Stake!!!
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