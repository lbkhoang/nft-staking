import { useEthers } from "@usedapp/core"
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material"
import { useStakeNFT } from "../hooks/approveAndStake";
import { useState } from "react";
import { red } from "@mui/material/colors";
import { LoadingButton } from "@mui/lab";

export const StakeButton = () => {
    const { account, activateBrowserWallet } = useEthers()
    const isConnected = account !== undefined
    const walletAddress = account?.toString();

    const [notice, setNotice] = useState(false);

    const color = red[500];

    const handleClose = () => {
        setNotice(false);
    };

    const { approveAndStake, approveErc721State, nftId, stakeState } = useStakeNFT(walletAddress)
    const handleStakeSubmit = () => {
        if (nftId === undefined) {
            setNotice(true);
        } else {
            return approveAndStake(account)
        }
    }

    return (
        <>
            {isConnected ? (
                <>
                <LoadingButton color="secondary" fullWidth
                variant="outlined" 
                onClick={handleStakeSubmit}
                loading={
                    approveErc721State.status === "PendingSignature" ||
                    approveErc721State.status === "Mining" ||
                    stakeState.status === "PendingSignature" ||
                    stakeState.status === "Mining" 
                }>
                    Stake!!!
                </LoadingButton>
                <Dialog
                open={notice}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title" color={color}>
                    {"Error!?!"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description" color={color}>
                        You need Genesis Node in your wallet to stake
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
                </>
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