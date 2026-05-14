import React from 'react';
import '../staking.css';
import SingleChain from './SingleChain';
// import ChainStaking from './ChainStaking';

const page = async ({
  params,
  // searchParams,
}: {
  params: Promise<{ network: string }>;
  // searchParams?: { [key: string]: string | undefined };
}) => {
  const resolvedParams = await params;
  const { network: paramChain } = resolvedParams;

  return <SingleChain paramChain={paramChain} />;
  // return <ChainStaking paramChain={paramChain} queryParams={searchParams} />;
};

export default page;
