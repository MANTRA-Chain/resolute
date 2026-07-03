import React from 'react';
import ChainMultisig from './ChainMultisig';
import '../multisig.css';

const page = async ({
  params,
}: {
  params: Promise<{ network: string }>;
}) => {
  const { network } = await params;
  return <ChainMultisig network={network} />;
};

export default page;
