import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import StarIcon from '@mui/icons-material/StarBorder';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import stakingAbi from '../abi/stakingAbi.json'
import { BigNumber, utils } from "ethers"
import { StakeButton } from './StakeButton';
import { CONTRACT_ADDRESS } from '../constant/CONSTANT';
import { Contract } from '@ethersproject/contracts';
import { useCall , useEthers } from "@usedapp/core"

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

    const { account } = useEthers()
    // stakingAbi
    const stakingContractAddress = CONTRACT_ADDRESS.STAKING_CONTRACT_ADDRESS;
    const stakingInterface = new utils.Interface(stakingAbi);
    const stakingContract = new Contract(
        stakingContractAddress,
        stakingInterface
    )

    const tokenOfOwner = useCall({
        contract: stakingContract,
        method: 'tokensOfOwner',
        args: [account]
    });

    let nftId = [tokenOfOwner?.value[0][0]?.toNumber().toString()]
    let methodCall
    if (nftId[0] !== undefined) {
        methodCall = 'earningInfo'
    } else {
        methodCall = 'balanceOf'
        nftId = ["0x3fe5d3B04d7164d5f6529BA16c46f0CeBB30e91f"]
    }
    const earned = useCall({
        contract: stakingContract,
        method: methodCall,
        args: nftId
    });

    const earningNull = earned?.value[0] ? earned?.value[0] : BigNumber.from("0");
    
    const earning = utils.formatEther( earningNull ).slice(0, 5);
    
    return (
        <>
            <Grid
                item
                key={tier.title}
                xs={12}
                sm={tier.title === 'Enterprise' ? 12 : 6}
                md={4}
            >
                <Card>
                    <CardHeader
                        title="Genesis Node"
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
                                ${earning}
                            </Typography>
                            <Typography variant="h6" color="text.secondary">
                                /mo
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
                        <StakeButton/>
                    </CardActions>
                </Card>
            </Grid>
        </>
    )

}