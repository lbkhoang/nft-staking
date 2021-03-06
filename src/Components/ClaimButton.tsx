import { useEthers } from "@usedapp/core"
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material"
import { useState } from "react";
import { red } from "@mui/material/colors";
import { LoadingButton } from "@mui/lab";
import { useClaim } from "../hooks/useClaim";

export const ClaimButton = () => {
    const { account, activateBrowserWallet } = useEthers()
    const isConnected = account !== undefined
    const walletAddress = account?.toString();

    const [notice, setNotice] = useState(false);

    const color = red[500];

    const handleClose = () => {
        setNotice(false);
    };

    const { claim, claimState , nftList } = useClaim(walletAddress)
    const handleStakeSubmit = () => {
        if (nftList === undefined) {
            setNotice(true);
        } else {
            return claim()
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
                    claimState.status === "PendingSignature" ||
                    claimState.status === "Mining"
                }>
                    Claim!!!
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
                        You need to stake NFT in pool to claim
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

