import { Api } from '@/service/api';
import { Box, Button } from '@mui/material';
import {
  useWeb3Modal,
  useWeb3ModalAccount,
  useWeb3ModalProvider,
  useDisconnect
} from '@web3modal/ethers5/react';
import { ethers } from 'ethers';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useAuth } from '@/contexts/AuthContext';

export default function Login() {
  const { open } = useWeb3Modal();
  const { isConnected } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();
  const { disconnect } = useDisconnect();
  const { updateUser } = useAuth();

  useEffect(() => {
    if (walletProvider) {
      handleSubmit(walletProvider);
    }
  }, [isConnected]);

  const handleSubmit = async (wProvider: ethers.providers.ExternalProvider) => {
    try {
      const provider = new ethers.providers.Web3Provider(wProvider);
      const signer = provider.getSigner();

      const id = Date.now();
      const message: string = 'wallet_login_' + id * 3;
      const signature: string = await signer.signMessage(message);

      const { data } = await Api.post('/admin/auth/login', {
        signature,
        message
      });

      if (data && data.status) {
        updateUser(data.token);
      } else {
        throw new Error('Something went wrong!');
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      disconnect();
      if (err.response?.data) {
        toast.error(err.response.data);
      } else {
        toast.error('Something went wrong');
      }
    }
  };

  return (
    <Box
      sx={{
        padding: '4px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh'
      }}
    >
      <Button variant="contained" onClick={() => open()}>
        Wallet Connect
      </Button>
    </Box>
  );
}
