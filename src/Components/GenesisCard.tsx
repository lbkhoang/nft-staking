import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import StarIcon from '@mui/icons-material/StarBorder';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import stakingAbi from '../abi/stakingAbi.json'
import nftAbi from '../abi/nftAbi.json'
import { BigNumber, utils } from "ethers"
import { StakeButton } from './StakeButton';
import { CONTRACT_ADDRESS } from '../constant/CONSTANT';
import { Contract } from '@ethersproject/contracts';
import { useCall, useEthers } from "@usedapp/core"
import { Button, Container } from '@mui/material';
import { MintButton } from './MintButton';

export const GenesisCard = () => {
    const tier =
    {
        title: 'Genesis Node',
        price: '0',
        subheader: '',
        description: [
            '10 users included',
            '2 GB of storage',
            'Help center access',
            'Email support',
        ],
        buttonText: 'Sign up for free',
        buttonVariant: 'outlined',
    }

    const { account } = useEthers();
    const isConnected = account !== undefined
    const walletAddress = account?.toString();

    // stakingAbi
    const stakingContractAddress = CONTRACT_ADDRESS.STAKING_CONTRACT_ADDRESS;
    const stakingInterface = new utils.Interface(stakingAbi);
    const stakingContract = new Contract(
        stakingContractAddress,
        stakingInterface
    )

    // nftAbi
    const nftContractAddress = CONTRACT_ADDRESS.NFT_CONTRACT_ADDRESS;
    const nftInterface = new utils.Interface(nftAbi);
    const nftContract = new Contract(
        nftContractAddress,
        nftInterface
    )

    function useBalanceOf(walletAddress: string | undefined): BigNumber | undefined {
        const { value, error } = useCall(walletAddress && {
            contract: nftContract,
            method: 'balanceOf',
            args: [walletAddress]
        }) ?? {}
        if (error) {
            console.error(error.message)
            return undefined
        }
        return value?.[0]
    }

    const nftOwned = useBalanceOf(walletAddress)?.toString();

    function useTokensOfOwner(walletAddress: string | undefined): BigNumber | undefined {
        const { value, error } = useCall(walletAddress && {
            contract: stakingContract,
            method: 'tokensOfOwner',
            args: [walletAddress]
        }) ?? {}
        if (error) {
            console.error(error.message)
            return undefined
        }
        return value?.[0]
    }

    const nftId = useTokensOfOwner(walletAddress)?.[0];
    const nftCount = useTokensOfOwner(walletAddress);
    const staked = (nftCount?.toString().match(/,/g) || []).length

    function useEarningInfo(nftId: string | undefined): BigNumber | undefined {
        const { value, error } = useCall(nftId && {
            contract: stakingContract,
            method: 'earningInfo',
            args: [nftId]
        }) ?? {}
        if (error) {
            console.error(error.message)
            return undefined
        }
        return value?.[0]
    }

    const earned = useEarningInfo(nftId);

    const earningNull = earned ? earned : BigNumber.from("0");

    const earning = utils.formatEther(earningNull).slice(0, 5);

    return (
        <>
            <Container maxWidth="md" component="main">
                <Grid container spacing={5} alignItems="flex-end">
                    {/* ------------------------------------------------------------------------------------- */}
                    <Grid
                        item
                        key='Genesis Node Wallet'
                        xs={12}
                        sm={tier.title === 'Enterprise' ? 12 : 6}
                        md={4}
                    >
                        <Card>
                            <CardHeader
                                title='Node Owned'
                                subheader={tier.subheader}
                                titleTypographyProps={{ align: 'center' }}
                                action={tier.title === 'Pro' ? <StarIcon /> : null}
                                subheaderTypographyProps={{
                                    align: 'center',
                                }}
                                sx={{
                                    backgroundColor: (theme) =>
                                        theme.palette.mode === 'light'
                                            ? theme.palette.grey[200]
                                            : theme.palette.grey[700],
                                }}
                            />
                            <CardContent>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'baseline',
                                        mb: 2,
                                    }}
                                >
                                    <Typography component="h2" variant="h3" color="text.primary">
                                        {nftOwned === undefined ? '0' : nftOwned}
                                    </Typography>
                                    {/* <Typography variant="h6" color="text.secondary">
                                        /mo
                                    </Typography> */}
                                </Box>
                                <ul>
                                    {tier.description.map((line) => (
                                        <Typography
                                            component="li"
                                            variant="subtitle1"
                                            align="center"
                                            key={line}
                                        >
                                            {line}
                                        </Typography>
                                    ))}
                                </ul>
                            </CardContent>
                            <CardActions>
                                <MintButton />
                            </CardActions>
                        </Card>
                    </Grid>
                    {/* ------------------------------------------------------------------------------------- */}
                    <Grid
                        item
                        key='Genesis Node Staked'
                        xs={12}
                        sm={tier.title === 'Enterprise' ? 12 : 6}
                        md={4}
                    >
                        <Card>
                            <CardHeader
                                title='Node Staked'
                                subheader={tier.subheader}
                                titleTypographyProps={{ align: 'center' }}
                                action={tier.title === 'Pro' ? <StarIcon /> : null}
                                subheaderTypographyProps={{
                                    align: 'center',
                                }}
                                sx={{
                                    backgroundColor: (theme) =>
                                        theme.palette.mode === 'light'
                                            ? theme.palette.grey[200]
                                            : theme.palette.grey[700],
                                }}
                            />
                            <CardContent>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'baseline',
                                        mb: 2,
                                    }}
                                >
                                    <Typography component="h2" variant="h3" color="text.primary">
                                        {(staked === undefined) ? '0' : staked}
                                    </Typography>
                                    {/* <Typography variant="h6" color="text.secondary">
                                        /mo
                                    </Typography> */}
                                </Box>
                                <ul>
                                    {tier.description.map((line) => (
                                        <Typography
                                            component="li"
                                            variant="subtitle1"
                                            align="center"
                                            key={line}
                                        >
                                            {line}
                                        </Typography>
                                    ))}
                                </ul>
                            </CardContent>
                            <CardActions>
                                <StakeButton />
                            </CardActions>
                        </Card>
                    </Grid>
                    {/* ------------------------------------------------------------------------------------- */}
                    <Grid
                        item
                        key='Genesis Node Earning'
                        xs={12}
                        sm={tier.title === 'Enterprise' ? 12 : 6}
                        md={4}
                    >
                        <Card>
                            <CardHeader
                                title='Node Earning'
                                subheader={tier.subheader}
                                titleTypographyProps={{ align: 'center' }}
                                action={tier.title === 'Pro' ? <StarIcon /> : null}
                                subheaderTypographyProps={{
                                    align: 'center',
                                }}
                                sx={{
                                    backgroundColor: (theme) =>
                                        theme.palette.mode === 'light'
                                            ? theme.palette.grey[200]
                                            : theme.palette.grey[700],
                                }}
                            />
                            <CardContent>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'baseline',
                                        mb: 2,
                                    }}
                                >
                                    <Typography component="h2" variant="h3" color="text.primary">
                                        {earning}
                                    </Typography>
                                    <Typography variant="h6" color="text.secondary">
                                        𝛑
                                    </Typography>
                                </Box>
                                <ul>
                                    {tier.description.map((line) => (
                                        <Typography
                                            component="li"
                                            variant="subtitle1"
                                            align="center"
                                            key={line}
                                        >
                                            {line}
                                        </Typography>
                                    ))}
                                </ul>
                            </CardContent>
                            <CardActions>
                                {isConnected ? (
                                    <Button
                                        disabled
                                        size="medium"
                                        color="primary" fullWidth
                                        variant="contained">
                                        CLAIM
                                    </Button>
                                ) : (
                                    <Button
                                        color="primary" fullWidth
                                        variant="outlined">
                                        Connect
                                    </Button>
                                )
                                }
                                {isConnected ? (
                                    <Button
                                        disabled
                                        size="medium"
                                        color="primary" fullWidth
                                        variant="contained">
                                        UNSTAKE
                                    </Button>
                                ) : (
                                    <Button
                                        color="primary" fullWidth
                                        variant="contained">
                                        Connect
                                    </Button>
                                )
                                }
                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}