import { useEthers, useTokenBalance } from "@usedapp/core"
import { formatUnits } from '@ethersproject/units'
import { Button } from "@mui/material"
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { CONTRACT_ADDRESS } from "../constant/CONSTANT";

export const WalletInfo = () => {
    const { account, activateBrowserWallet, deactivate } = useEthers()
    const isConnected = account !== undefined
    const piNodeBalance = useTokenBalance(CONTRACT_ADDRESS.TOKEN_CONTRACT_ADDRESS, account)
    return (
        <>
            {isConnected ? (
                <>                  
                <Button color="secondary">
                    {piNodeBalance && <p>{formatUnits(piNodeBalance, 9)}</p>}
                </Button>
                <div color="secondary">|</div>
                <Button color="secondary" onClick={deactivate}>
                    {`${account?.slice(0, 4)}...${account?.slice(-3)}`} 
                    <AccountBalanceWalletIcon />
                </Button>
                </>
            ) : (
                <Button
                    color="primary"
                    variant="contained"
                    onClick={() => activateBrowserWallet()}>
                    Connect
                </Button>
            )
            }
        </>
    )
}