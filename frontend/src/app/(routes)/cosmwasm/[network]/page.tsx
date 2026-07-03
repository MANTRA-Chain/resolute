import React from 'react';
import '../cosmwasm.css';
import ChainContracts from './ChainContracts';

const page = async ({
  params,
}: {
  params: Promise<{ network: string }>;
}) => {
  const { network } = await params;
  return <ChainContracts network={network} />;
};

export default page;
