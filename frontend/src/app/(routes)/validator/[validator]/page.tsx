import React from 'react';
import '../validator-profile.css';
import '../../staking/staking.css';
import { VITWIT_NEW_MONIKER, VITWIT_VALIDATOR_NAMES } from '@/utils/constants';
import ValidatorProfile from './ValidatorProfile';

const page = async ({
  params,
}: {
  params: Promise<{ validator: string }>;
}) => {
  const { validator } = await params;
  const decodedMonikerName = decodeURIComponent(validator);
  // If the moniker name is vitwit or vitwit (previously witval) or witval use new moniker name
  const isVitwitValidator = VITWIT_VALIDATOR_NAMES.includes(
    decodedMonikerName.toLowerCase()
  );
  const monikerName = isVitwitValidator
    ? decodeURIComponent(VITWIT_NEW_MONIKER)
    : decodedMonikerName.toLocaleLowerCase();
  return <ValidatorProfile moniker={monikerName} />;
};

export default page;
