import React from 'react';
import '@/app/(routes)/multiops/multiops.css';
import PageMultiops from './PageMultiops';

const page = async ({
  params,
}: {
  params: Promise<{ network: string }>;
}) => {
  const { network } = await params;
  return <PageMultiops paramChain={network} />;
};

export default page;
