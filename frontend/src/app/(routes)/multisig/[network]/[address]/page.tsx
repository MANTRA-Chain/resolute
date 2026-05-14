import React from 'react';
import '../../multisig.css';
import PageMultisigInfo from '../../components/multisig-account/PageMultisigInfo';

const page = async ({
  params,
}: {
  params: Promise<{ network: string; address: string }>;
}) => {
  const { network, address } = await params;
  return (
    <div>
      <PageMultisigInfo
        paramChain={network.toLowerCase()}
        paramAddress={address}
      />
    </div>
  );
};

export default page;
