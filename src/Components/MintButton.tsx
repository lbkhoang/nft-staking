import { useEthers, useTokenBalance } from "@usedapp/core"
import { useEtherBalance } from "@usedapp/core"
import { formatUnits } from '@ethersproject/units'
import { Button } from "@mui/material"
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { useStakeToken } from "../hooks/useStakeToken";
import { utils } from "ethers"

export const MintButton = () => {
    const { account, activateBrowserWallet, deactivate } = useEthers()
    const isConnected = account !== undefined
    const piNode = '0xa1d9C943388029493422fE9fF83163758880bABa'
    const piNodeBalance = useTokenBalance(piNode, account)
    const accountBalance = useEtherBalance(account)

    const { approveAndMint, approveErc20State } = useStakeToken(piNode)
    const handleStakeSubmit = () => {
        return approveAndMint(utils.parseEther("10000").toString())
    }

    return (
        <>
            {isConnected ? (
                <>
                    {/* Mint button 
                    <Button color="secondary" onClick={handleStakeSubmit}>
                        Stake!!!
                    </Button>
                    */}
                    <Button color="secondary">
                        {piNodeBalance && <p>{formatUnits(piNodeBalance, 9)} 𝛑 </p>}
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