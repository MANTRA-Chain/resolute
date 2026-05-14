import React from 'react';
import ChainMultiops from './ChainMultiops';
import '../multiops.css';

const page = async ({
  params,
}: {
  params: Promise<{ network: string }>;
}) => {
  const { network } = await params;
  return <ChainMultiops network={network} />;
};

export default page;
