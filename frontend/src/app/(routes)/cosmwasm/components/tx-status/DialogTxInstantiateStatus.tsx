import Copy from '@/components/common/Copy';
import DialogTxnStatus from '@/components/txn-status-popups/DialogTxnStatus';
import TxnInfoCard from '@/components/txn-status-popups/TxnInfoCard';
import TxnStatus from '@/components/txn-status-popups/TxnStatus';
import { useAppSelector } from '@/custom-hooks/StateHooks';
import useGetChainInfo from '@/custom-hooks/useGetChainInfo';
import { TxStatus } from '@/types/enums';
import { TXN_FAILED_ICON, TXN_SUCCESS_ICON } from '@/utils/constants';
import { parseBalance } from '@/utils/denom';
import { shortenAddress, shortenMsg } from '@/utils/util';
import Image from 'next/image';
import React, { useEffect, useMemo, useState } from 'react';

const DialogTxInstantiateStatus = ({ chainID }: { chainID: string }) => {
  const { getChainInfo, getDenomInfo } = useGetChainInfo();
  const { explorerTxHashEndpoint, chainName } = getChainInfo(chainID);
  const {
    decimals = 0,
    displayDenom = '',
    minimalDenom = '',
  } = getDenomInfo(chainID);
  const currency = useMemo(
    () => ({
      coinMinimalDenom: minimalDenom,
      coinDecimals: decimals,
      coinDenom: displayDenom,
    }),
    [minimalDenom, decimals, displayDenom]
  );

  const [open, setOpen] = useState(false);
  const txInstantiateStatus = useAppSelector(
    (state) => state.cosmwasm.chains?.[chainID]?.txInstantiate?.status
  );
  const txHash = useAppSelector(
    (state) => state.cosmwasm.chains?.[chainID]?.txInstantiate?.txHash
  );
  const txResponse = useAppSelector(
    (state) => state.cosmwasm.chains?.[chainID]?.txInstantiate?.txResponse
  );

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (txHash && txInstantiateStatus === TxStatus.IDLE) setOpen(true);
  }, [txHash, txInstantiateStatus]);

  return (
    <DialogTxnStatus handleClose={handleClose} open={open}>
      <div>
        <Image
          src={txResponse?.code === 0 ? TXN_SUCCESS_ICON : TXN_FAILED_ICON}
          height={60}
          width={60}
          alt={
            txResponse?.code === 0
              ? 'Transaction Successful'
              : 'Transaction Failed'
          }
        />
      </div>
      <div className="w-full">
        <TxnStatus
          explorer={explorerTxHashEndpoint || ''}
          txHash={txResponse?.transactionHash || ''}
          txSuccess={txResponse?.code === 0}
          chainName={chainName}
        />
        <div className="divider-line mt-2 mb-6"></div>
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <TxnInfoCard name="Code ID">
              <div className="text-b1">{txResponse?.codeId || '-'}</div>
              {txResponse?.codeId ? (
                <Copy content={txResponse?.codeId} />
              ) : null}
            </TxnInfoCard>
            <TxnInfoCard name="Contract Address">
              <div className="text-b1">
                {shortenAddress(txResponse?.contractAddress, 12) || '-'}
              </div>
              {txResponse?.contractAddress ? (
                <Copy content={txResponse?.contractAddress} />
              ) : null}
            </TxnInfoCard>
          </div>
          <TxnInfoCard name="Txn Hash">
            <div className="text-b1">
              {shortenMsg(txResponse?.transactionHash || '', 20) || '-'}
            </div>
            {txResponse?.transactionHash ? (
              <Copy content={txResponse?.transactionHash} />
            ) : null}
          </TxnInfoCard>
          <TxnInfoCard name="Fees">
            <div className="text-[#fffffff0] text-b1">
              {txResponse?.fee?.[0]
                ? parseBalance(
                    txResponse?.fee,
                    currency.coinDecimals,
                    currency.coinMinimalDenom
                  )
                : '-'}{' '}
              {currency.coinDenom}
            </div>
          </TxnInfoCard>
          {txResponse?.code === 0 ? null : (
            <TxnInfoCard name="Raw Log">
              <div className="txn-details-item-content !leading-4 text-[#e75656]">
                {txResponse?.rawLog || '-'}
              </div>
            </TxnInfoCard>
          )}
        </div>
      </div>
    </DialogTxnStatus>
  );
};

export default DialogTxInstantiateStatus;