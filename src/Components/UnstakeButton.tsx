import { useEthers } from "@usedapp/core"
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material"
import { useState } from "react";
import { red } from "@mui/material/colors";
import { LoadingButton } from "@mui/lab";
import { useUnstake } from "../hooks/useUnstake";

export const UnstakeButton = () => {
    const { account, activateBrowserWallet } = useEthers()
    const isConnected = account !== undefined
    const walletAddress = account?.toString();

    const [notice, setNotice] = useState(false);

    const color = red[500];

    const handleClose = () => {
        setNotice(false);
    };

    const { unstake, unstakeState , nftList } = useUnstake(walletAddress)
    const handleStakeSubmit = () => {
        if (nftList === undefined) {
            setNotice(true);
        } else {
            return unstake()
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
                    unstakeState.status === "PendingSignature" ||
                    unstakeState.status === "Mining"
                }>
                    Unstake!!!
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
                        You need to stake NFT in pool to unstake
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

