import { useEthers } from "@usedapp/core"
import LoadingButton from '@mui/lab/LoadingButton';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material"
import { red } from '@mui/material/colors';
import { useMintGenesisNFT } from "../hooks/mint";
import { useState } from "react";

export const MintButton = () => {


    const { account, activateBrowserWallet } = useEthers()
    const isConnected = account !== undefined
    const wallet = account?.toString();
    const color = red[500];
    const { mint, mintState, isWhitelisted } = useMintGenesisNFT(wallet)

    const [notice, setNotice] = useState(false);

    const handleClose = () => {
        setNotice(false);
    };

    const handleStakeSubmit = () => {
        if (!isWhitelisted) {
            return mint()
        } else {
            setNotice(true)
        }
    }

    return (<>
        {isConnected ? (
            <>
                <LoadingButton
                    size="medium"
                    color="primary" fullWidth
                    variant="contained"
                    loading={
                        mintState.status === "PendingSignature" ||
                        mintState.status === "Mining" 
                    }
                    onClick={handleStakeSubmit}>
                    Mint!!!
                </LoadingButton>
                <Dialog
                    open={notice}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title" color={color}>
                        {"Oops!?!"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description" color={color}>
                            Looks like you need a whitelist to mint. Refer to our docs to learn more
                            about Genesis Minting program.
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
                variant="contained"
                onClick={() => activateBrowserWallet()}>
                Connect
            </Button >
        )
        }
    </>
    )
}