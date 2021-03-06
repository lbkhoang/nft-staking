import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import StarIcon from '@mui/icons-material/StarBorder';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { BigNumber, utils } from "ethers"
import { StakeButton } from './StakeButton';
import { useCall, useEthers } from "@usedapp/core"
import { Container } from '@mui/material';
import { MintButton } from './MintButton';
import { StakingContract } from "../contract/stakingContract"
import { NftContract } from "../contract/nftContract"
import { ClaimButton } from './ClaimButton';
import { UnstakeButton } from './UnstakeButton';

export const GenesisCard = () => {
    const tier =
    {
        title: 'NFT',
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
    const walletAddress = account?.toString();

    // nftAbi
    const nftContract = NftContract();
        
    // stakingAbi
    const stakingContract = StakingContract();

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

    let nftId = useTokensOfOwner(walletAddress)?.toString().split(",");
    nftId =  useTokensOfOwner(walletAddress)?.toString() === "" ? undefined : nftId;
    let staked = useTokensOfOwner(walletAddress)?.toString() === "" ? 0 : nftId?.length;

    function useEarningInfo(nftId: string[] | undefined): BigNumber | undefined {
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
    console.log(earning)

    return (
        <>
            <Container maxWidth="md" component="main">
                <Grid container spacing={5} alignItems="flex-end">
                    {/* ------------------------------------------------------------------------- */}
                    <Grid
                        item
                        key='NFT Wallet'
                        xs={12}
                        sm={tier.title === 'Enterprise' ? 12 : 6}
                        md={4}
                    >
                        <Card>
                            <CardHeader
                                title='NFT Owned'
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
                        key='NFT Staked'
                        xs={12}
                        sm={tier.title === 'Enterprise' ? 12 : 6}
                        md={4}
                    >
                        <Card>
                            <CardHeader
                                title='NFT Staked'
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
                        key='NFT Earning'
                        xs={12}
                        sm={tier.title === 'Enterprise' ? 12 : 6}
                        md={4}
                    >
                        <Card>
                            <CardHeader
                                title='NFT Earning'
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
                                        ????
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
                                <ClaimButton/>
                                <UnstakeButton/>
                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}