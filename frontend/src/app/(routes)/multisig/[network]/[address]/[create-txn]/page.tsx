import React from 'react';
import PageTxnBuilder from './PageTxnBuilder';
import '../../../multisig.css';

const page = async ({
  params,
}: {
  params: Promise<{ network: string; address: string }>;
}) => {
  const { network, address } = await params;
  return (
    <PageTxnBuilder
      paramChain={network.toLowerCase()}
      multisigAddress={address}
    />
  );
};

export default page;
