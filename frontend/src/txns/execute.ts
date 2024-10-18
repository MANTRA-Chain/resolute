import { OfflineAminoSigner, OfflineDirectSigner } from '@keplr-wallet/types';

import {
  defaultRegistryTypes,
  StdFee,
  DeliverTxResponse,
} from '@cosmjs/stargate';
import { SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate';
import { TxRaw } from 'cosmjs-types/cosmos/tx/v1beta1/tx';
import { GeneratedType, Registry } from '@cosmjs/proto-signing';
import { GAS_FEE } from '../utils/constants';
import { CosmjsOfflineSigner } from '@leapwallet/cosmos-snap-provider';
import { isMetaMaskWallet } from '@/utils/localStorage';

declare let window: WalletWindow;

export async function signAndBroadcastAmino(
  msgs: Msg[],
  fee: number,
  chainID: string,
  rpcURL: string,
  memo: string = ''
): Promise<DeliverTxResponse> {
  const result = await getWalletAmino(chainID);
  const wallet = result[0];
  const account = result[1];
  const registry = new Registry();
  defaultRegistryTypes.forEach((v: [string, GeneratedType]) => {
    registry.register(v[0], v[1]);
  });

  const cosmJS = await SigningCosmWasmClient.connectWithSigner(rpcURL, wallet, {
    registry: registry,
  });

  return await cosmJS.signAndBroadcast(account.address, msgs, fee, memo);
}

export async function signAndBroadcastProto(
  msgs: Msg[],
  fee: StdFee,
  rpcURL: string
): Promise<DeliverTxResponse> {
  const client = await SigningCosmWasmClient.connect(rpcURL);

  const chainId = await client.getChainId();
  const result = await getWalletDirect(chainId);
  const wallet = result[0];
  const account = result[1];
  const registry = new Registry();
  defaultRegistryTypes.forEach((v: [string, GeneratedType]) => {
    registry.register(v[0], v[1]);
  });

  const signingClient = await SigningCosmWasmClient.offline(wallet, {
    registry: registry,
  });

  const accountInfo = await client.getAccount(account.address);

  const signed = await signingClient.sign(account.address, msgs, fee, '', {
    accountNumber: accountInfo?.accountNumber || -1,
    chainId: chainId,
    sequence: accountInfo?.sequence || -1,
  });

  return await client.broadcastTx(
    Uint8Array.from(TxRaw.encode(signed).finish())
  );
}

export function fee(
  coinMinimalDenom: string,
  amount: string,
  gas: number = GAS_FEE,
  feeGranter: string = ''
): StdFee {
  return {
    amount: [{ amount: String(amount), denom: coinMinimalDenom }],
    gas: String(gas),
    granter: feeGranter,
  };
}

export async function getWalletAmino(
  chainID: string
): Promise<
  [OfflineAminoSigner, { address: string; algo: string; pubKey: Uint32Array }]
> {
  if (isMetaMaskWallet()) {
    await window.ethereum.enable(chainID);
    const offlineSigner = new CosmjsOfflineSigner(chainID)
    const accounts = await offlineSigner.getAccounts();
    return [offlineSigner, { address: accounts[0].address, algo: accounts[0].algo, pubKey: new Uint32Array(accounts[0].pubkey) }];
  } else {
    await window.wallet.enable(chainID);
    const offlineSigner = window.wallet.getOfflineSignerOnlyAmino(chainID);
    const accounts = await offlineSigner.getAccounts();
    return [offlineSigner, accounts[0]];
  }

}

export async function getWalletDirect(
  chainID: string
): Promise<
  [
    OfflineAminoSigner & OfflineDirectSigner,
    { address: string; algo: string; pubKey: Uint32Array },
  ]
> {
  await window.wallet.enable(chainID);
  const offlineSigner = window.wallet.getOfflineSigner(chainID);
  const accounts = await offlineSigner.getAccounts();
  return [offlineSigner, accounts[0]];
}

export function isWalletInstalled(): boolean {
  return window.wallet ? true : false;
}
