import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';
import logo from '../img/logo.png';
import footerbg from '../img/footerbg.png';
import { WalletInfo } from './WalletInfo';
import { GenesisCard } from './GenesisCard';

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        NFT Staking
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const styles = {
  footers: {
      backgroundImage: `url(${footerbg})`,
      "background-size": "cover",
  }
};

const footers = [
  {
    title: 'Resources',
    description: ['Resource', 'Resource name', 'Another resource', 'Final resource'],
  },
  {
    title: 'Legal',
    description: ['Privacy policy', 'Terms of use'],
  },
];

function PricingContent() {
  return (
    <React.Fragment>
      <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
      <CssBaseline />
      <AppBar
        position="static"
        color="default"
        elevation={0}
        style={{ background: '#ffffff' }}
        sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
      >
        <Toolbar sx={{ flexWrap: 'wrap' }}>
          <Typography variant="h5" noWrap sx={{ flexGrow: 1 }}>
            NFT Staking
          </Typography>
          <nav>
            {/* <Link
              variant="button"
              color="text.primary"
              href="#"
              sx={{ my: 1, mx: 1.5 }}
            >
              Home
            </Link>
            <Link
              variant="button"
              color="text.secondary"
              href="#"
              sx={{ my: 1, mx: 1.5 }}
            >
              App
            </Link>
            <Link
              variant="button"
              color="text.secondary"
              href="#"
              sx={{ my: 1, mx: 1.5 }}
            >
              Marketplace
            </Link> */}
          </nav>
          <WalletInfo />
        </Toolbar>
      </AppBar>
      {/* Hero unit */}
      <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 8, pb: 6 }} >
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.secondary"
          gutterBottom
        >
          Pricing
        </Typography>
        <Typography variant="h5" align="center" color="text.secondary" component="p" sx={{ pt: 3, pb: 3, pl: 3, pr: 3 }}>
          Pi Is The Digital Currency You Can Mine On Your Phone.
          Start earning cryptocurrency today with our Pi-Nodes, a lifetime of passive income.
          Quickly build an effective Pi-Node with just a few click.
          Monthly ROI: 21.75%, which means 261% increase on your investment every year !!!
        </Typography>
      </Container>
      {/* End hero unit */}
      {/*Genesis card container */}
      <Container maxWidth="md" component="main" sx={{ pt: 3, pb: 3, pl: 7, pr: 3,
          borderTop: (theme) => `1px solid ${theme.palette.divider}`,
          mt: 0,
          py: [15, 8],
        }}>
        <Grid container spacing={5} alignItems="flex-end">
          <Typography
            component="h1"
            variant="h4"
            align="left"
            color="text.secondary"
            gutterBottom
          >
            Genesis Node
          </Typography>
          <GenesisCard />
        </Grid>
      </Container>

      {/* Footer */}
      <Container maxWidth={false} style={styles.footers}>
        <Container
          maxWidth="md"
          component="footer"
          sx={{
            borderTop: (theme) => `1px solid ${theme.palette.divider}`,
            mt: 8,
            py: [3, 6],
          }}
        >
          <Grid container spacing={4} justifyContent="space-evenly">
            {footers.map((footer) => (
              <Grid item xs={6} sm={3} key={footer.title}>
                <Typography variant="h6" color="text.primary" gutterBottom>
                  {footer.title}
                </Typography>
                <ul>
                  {footer.description.map((item) => (
                    <li key={item}>
                      <Link href="#" variant="subtitle1" color="text.secondary">
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </Grid>
            ))}
          </Grid>
          <Copyright sx={{ mt: 5 }} />
        </Container>

      </Container>
      {/* End footer */}
    </React.Fragment>
  );
}

export default function Pricing() {
  return <PricingContent />;
}