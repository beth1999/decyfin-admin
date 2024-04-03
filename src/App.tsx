import Router from './router';
import { CssBaseline } from '@mui/material';
import { createWeb3Modal, defaultConfig } from '@web3modal/ethers5/react';
import { ToastContainer, Slide } from 'react-toastify';

import { SidebarProvider } from './contexts/SidebarContext';
import { AuthProvider } from './contexts/AuthContext';

import ThemeProvider from './theme/ThemeProvider';

import 'react-toastify/dist/ReactToastify.css';

const projectId = 'faf641330f6b3ce2811bb5eb411267df';

// Set chains
const chains = [
  {
    chainId: 1,
    name: 'Ethereum',
    currency: 'ETH',
    explorerUrl: 'https://etherscan.io',
    rpcUrl: 'https://cloudflare-eth.com'
  },
  {
    chainId: 11155111,
    name: 'Sepolia',
    currency: 'ETH',
    explorerUrl: 'https://sepolia.etherscan.io',
    rpcUrl: 'https://ethereum-sepolia.publicnode.com'
  },
  {
    chainId: 4002,
    name: 'Fantom',
    currency: 'FTM',
    explorerUrl: 'https://testnet.ftmscan.com',
    rpcUrl: 'https://rpc.testnet.fantom.network'
  }
];

const ethersConfig = defaultConfig({
  metadata: {
    name: 'Web3Modal',
    description: 'Web3Modal Laboratory',
    url: 'https://web3modal.com',
    icons: ['https://avatars.githubusercontent.com/u/37784886']
  },
  defaultChainId: 1,
  rpcUrl: 'https://cloudflare-eth.com'
});

// Create modal
createWeb3Modal({
  ethersConfig,
  chains,
  projectId,
  enableAnalytics: true,
  themeMode: 'dark'
});

function App() {
  return (
    <AuthProvider>
      <SidebarProvider>
        <ThemeProvider>
          <CssBaseline />
          <Router />
          <ToastContainer
            position="top-center"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
            transition={Slide}
          />
        </ThemeProvider>
      </SidebarProvider>
    </AuthProvider>
  );
}
export default App;
