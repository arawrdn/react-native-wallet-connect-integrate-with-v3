import { connectWalletKit, disconnectWalletKit } from './walletKit';
import { useState } from 'react';
import { Button, ActivityIndicator, ToastAndroid } from 'react-native';

export default function WalletButtons() {
  const [loading, setLoading] = useState(false);

  const handleConnect = async () => {
    setLoading(true);
    try {
      const { address } = await connectWalletKit();
      ToastAndroid.show(`Connected: ${address}`, ToastAndroid.SHORT);
    } catch (err) {
      ToastAndroid.show(`Connect failed: ${err}`, ToastAndroid.SHORT);
    } finally {
      setLoading(false);
    }
  };

  const handleDisconnect = async () => {
    setLoading(true);
    try {
      await disconnectWalletKit();
      ToastAndroid.show("Wallet disconnected", ToastAndroid.SHORT);
    } catch (err) {
      ToastAndroid.show(`Disconnect failed: ${err}`, ToastAndroid.SHORT);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button title="Connect Wallet" onPress={handleConnect} />
      <Button title="Disconnect Wallet" onPress={handleDisconnect} />
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
    </>
  );
}
