import { formatAmount, formatCoin, formatDollarAmount } from '@/utils/util';
import Link from 'next/link';
import React, { RefObject, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useAppDispatch, useAppSelector } from '@/custom-hooks/StateHooks';
import { txWithdrawAllRewards } from '@/store/features/distribution/distributionSlice';
import useGetTxInputs from '@/custom-hooks/useGetTxInputs';
import { TxStatus } from '@/types/enums';
import { txRestake } from '@/store/features/staking/stakeSlice';
import { RootState } from '@/store/store';
import { CircularProgress, Tooltip } from '@mui/material';
import { setError } from '@/store/features/common/commonSlice';
import { capitalize } from 'lodash';
import useGetChainInfo from '@/custom-hooks/useGetChainInfo';
import { DelegationsPairs } from '@/types/distribution';
import useAuthzStakingExecHelper from '@/custom-hooks/useAuthzStakingExecHelper';

const Asset = ({
  asset,
  // showChainName,
}: {
  asset: ParsedAsset;
  // showChainName: boolean;
}) => {
  const txClaimStatus = useAppSelector(
    (state: RootState) =>
      state.distribution.chains[asset.chainID]?.tx?.status || TxStatus.IDLE
  );
  const txRestakeStatus = useAppSelector(
    (state: RootState) =>
      state.staking.chains[asset.chainID]?.reStakeTxStatus || TxStatus.IDLE
  );
  const authzRewards = useAppSelector(
    (state) => state.distribution.authzChains
  );
  const isAuthzMode = useAppSelector((state) => state.authz.authzModeEnabled);
  const authzAddress = useAppSelector((state) => state.authz.authzAddress);
  const { getChainInfo } = useGetChainInfo();

  const dispatch = useAppDispatch();
  const { txWithdrawAllRewardsInputs, txRestakeInputs, txAuthzRestakeMsgs } =
    useGetTxInputs();
  const { txAuthzClaim, txAuthzRestake } = useAuthzStakingExecHelper();

  const claim = (chainID: string) => {
    if (isAuthzMode) {
      const { address } = getChainInfo(chainID);
      const pairs: DelegationsPairs[] = (
        authzRewards[chainID]?.delegatorRewards?.list || []
      ).map((reward) => {
        const pair = {
          delegator: authzAddress,
          validator: reward.validator_address,
        };
        return pair;
      });
      txAuthzClaim({
        grantee: address,
        granter: authzAddress,
        pairs: pairs,
        chainID: chainID,
      });
      return;
    }
    if (txClaimStatus === TxStatus.PENDING) {
      dispatch(
        setError({
          type: 'error',
          message: `A claim transaction is still pending on ${capitalize(
            asset.chainName
          )} network...`,
        })
      );
      return;
    }
    const txInputs = txWithdrawAllRewardsInputs(chainID);
    if (txInputs.msgs.length) dispatch(txWithdrawAllRewards(txInputs));
    else {
      dispatch(
        setError({
          type: 'error',
          message: `You don't have any rewards on ${capitalize(
            asset.chainName
          )} network`,
        })
      );
    }
  };

  const claimAndStake = (chainID: string) => {
    if (isAuthzMode) {
      const { address } = getChainInfo(chainID);
      const msgs = txAuthzRestakeMsgs(chainID);
      txAuthzRestake({
        grantee: address,
        granter: authzAddress,
        msgs: msgs,
        chainID: chainID,
      });
      return;
    }
    if (txRestakeStatus === TxStatus.PENDING) {
      dispatch(
        setError({
          type: 'error',
          message: `A reStake transaction is still pending on ${capitalize(
            asset.chainName
          )} network...`,
        })
      );
      return;
    }
    const txInputs = txRestakeInputs(chainID);
    if (txInputs.msgs.length) dispatch(txRestake(txInputs));
    else
      dispatch(
        setError({
          type: 'error',
          message: `You don't have any rewards on ${capitalize(
            asset.chainName
          )} network`,
        })
      );
  };

  // actions for claim and claim and stake

  const [showPopup, setShowPopup] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);
  const buttonRef: RefObject<HTMLImageElement> = useRef<HTMLImageElement>(null);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      popupRef.current &&
      !popupRef.current.contains(event.target as Node) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target as Node)
    ) {
      setShowPopup(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <tr className="table-border-line">
      <th className="px-0 py-8">
        <div className="flex flex-col items-start gap-2">
          <div className="text-base font-normal leading-[normal]">
            {formatCoin(asset.balance, asset.displayDenom)}
          </div>
          <div className="flex space-x-1 justify-center items-center">
            <Image
              src={asset?.chainLogoURL}
              width={16}
              height={16}
              alt="chain-Logo"
              loading="lazy"
              className="w-4 h-4"
            />
            <p className="text-b1-light">
              on{' '}
              <Link className='capitalize' href={`/overview/${asset.chainName}`}>
                {asset.chainName}
              </Link>
            </p>
          </div>
        </div>
      </th>
      <th>
        <div className="flex flex-col items-start gap-2">
          <div className="text-base font-normal leading-[normal] items-start flex">
            {asset.type === 'native'
              ? formatCoin(asset.staked, asset.displayDenom)
              : '-'}
          </div>

          <div className="w-4 h-4" />
        </div>
      </th>
      <th>
        <div className="flex flex-col items-start gap-2">
          <div className="text-base font-normal leading-[normal] items-start flex">
            {asset.type === 'native'
              ? formatCoin(asset.rewards, asset.displayDenom)
              : '-'}
          </div>
          <div className="w-4 h-4" />
        </div>
      </th>
      <th>
        <div className="flex flex-col gap-2">
          <div className="text-base font-normal leading-[normal] items-start flex">
            {formatDollarAmount(asset.usdPrice)}
          </div>
          <div className="flex">
            <div
              className={
                'text-sm font-normal leading-[normal] ' +
                (asset.inflation >= 0 ? 'text-[#238636]' : 'text-[#F1575780]')
              }
            >
              <p className="text-sm font-extralight leading-[normal]">
                {formatAmount(Math.abs(asset.inflation))}%
              </p>
            </div>
            <Image
              src={`/${asset.inflation >= 0 ? 'up' : 'down'
                }-arrow-filled-icon.svg`}
              width={18}
              height={5}
              alt="down-arrow-filled-icon"
            />
          </div>
        </div>
      </th>
      <th>
        <div className="flex flex-col gap-2">
          <div className="text-base font-normal leading-[normal] items-start flex">
            {formatDollarAmount(asset.usdValue)}
          </div>
          <div className="w-4 h-4" />
        </div>
      </th>
      <th>
        <div className="items-center justify-center relative inline-block">
          <Image
            src="/more.svg"
            width={24}
            height={24}
            alt="more-icon"
            className="cursor-pointer"
            ref={buttonRef}
            onClick={togglePopup}
          />

          {/* <button
            ref={buttonRef}
            onClick={togglePopup}
            className="w-8 h-8 border-2 border-transparent rounded-full text-white flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500 p-[0.5px]"
          >
            <div className="flex items-center justify-center w-full h-full bg-black rounded-full">
              <p className='mt-[-7px]'> ...</p>
            </div>
          </button> */}
          {/* <button
            ref={buttonRef}
            onClick={togglePopup}
            className="w-10 h-10 border border-white rounded-full text-white flex items-center justify-center"
          >
            . . .
          </button> */}

          {showPopup && (
            <div
              ref={popupRef}
              className="absolute right-0 z-10 more-popup-grid"
            >
              <div className="w-full">
                <a
                  href="#"
                  className="flex items-center w-full p-4 text-b1 hover:bg-[#FFFFFF10] rounded-t-2xl"
                  onClick={() => {
                    if (asset.type === 'native') claim(asset.chainID);
                  }}
                >
                  <Tooltip
                    title={
                      asset.type === 'ibc'
                        ? 'IBC Deposit feature is coming soon..'
                        : 'Claim'
                    }
                    placement="top-end"
                  >
                    <div>
                      {asset.type !== 'ibc' &&
                        txClaimStatus === TxStatus.PENDING ? (
                        <> Claiming.... <CircularProgress size={16} /></>
                      ) : (
                        'Claim'
                      )}
                    </div>
                  </Tooltip>
                </a>
                <a
                  href="#"
                  className="flex items-center w-full p-4 text-b1 hover:bg-[#FFFFFF10] rounded-b-2xl"
                  onClick={() => {
                    if (asset.type === 'native')
                      claimAndStake(asset.chainID);
                  }}
                >
                  <Tooltip
                    title={
                      asset.type === 'ibc'
                        ? 'IBC Withdraw feature is coming soon..'
                        : 'Claim & Stake'
                    }
                    placement="top-start"
                  >
                    <div>
                      {txRestakeStatus === TxStatus.PENDING &&
                        asset.type !== 'ibc' ? (
                        <>Claiming and staking...<CircularProgress size={16} /></>
                      ) : (
                        'Claim And Stake'
                      )}
                    </div>
                  </Tooltip>
                </a>
              </div>
            </div>
          )}
        </div>
      </th>
      {/* <td>
        <div className="flex gap-10 justify-center">
          <Tooltip
            title={asset.type === 'ibc' ? 'IBC Deposit feature is coming soon..' : 'Claim'}
	@@ -243,7 +370,7 @@ const Asset = ({
            </div>
          </Tooltip>
        </div>
      </td> */}
    </tr>
  );
};
export default Asset;
