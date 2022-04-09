import { DAppProvider, Config, BSCTestnet, BSC } from '@usedapp/core'
import Pricing  from './Components/Main'

const config: Config = {
  readOnlyChainId: BSCTestnet.chainId,
  readOnlyUrls: {
    [BSCTestnet.chainId]: 'https://data-seed-prebsc-1-s2.binance.org:8545/',
  },
}

const configMainnet: Config = {
  readOnlyChainId: BSC.chainId,
  readOnlyUrls: {
    [BSC.chainId]: 'https://bsc-dataseed1.ninicoin.io/',
  },
}

function App() {
  return (
    <DAppProvider config={config}>
      <Pricing  />
    </DAppProvider>
  );
}

export default App;
