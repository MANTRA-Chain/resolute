export const networks: Network[] = [
  {
    enableModules: {
      authz: true,
      feegrant: true,
      group: false,
    },
    aminoConfig: {
      authz: false,
      feegrant: false,
      group: false,
    },
    showAirdrop: false,
    logos: {
      menu: 'https://staging-app.mantra.finance/assets/mantra-logo.c2e024c1.svg',
      toolbar:
        'https://staging-app.mantra.finance/assets/mantra-logo.c2e024c1.svg',
    },
    keplrExperimental: false,
    leapExperimental: false,
    isTestnet: false,
    govV1: false,
    explorerTxHashEndpoint: 'https://explorer.mantrachain.io/MANTRA-Dukong/tx/',
    config: {
      chainId: 'mantra-dukong-1',
      chainName: 'MANTRA-DuKong',
      rest: 'https://api.dukong.mantrachain.dev',
      rpc: 'wss://rpc.dukong.mantrachain.dev',
      restURIs: ['https://api.dukong.mantrachain.dev'],
      rpcURIs: ['wss://rpc.dukong.mantrachain.dev'],
      bech32Config: {
        bech32PrefixAccAddr: 'mantra',
        bech32PrefixAccPub: `mantrapub`,
        bech32PrefixValAddr: `mantravaloper`,
        bech32PrefixValPub: `mantravaloperpub`,
        bech32PrefixConsAddr: `mantravalcons`,
        bech32PrefixConsPub: `mantravalconspub`,
      },
      currencies: [
        {
          coinDenom: 'OM',
          coinMinimalDenom: 'uom',
          coinDecimals: 6,
        },
        {
          coinDenom: 'ATOM',
          coinMinimalDenom: `factory/mantra1axznhnm82lah8qqvp9hxdad49yx3s5dcj66qka/atom`,
          coinDecimals: 6,
        },
        {
          coinDenom: 'USDC',
          coinMinimalDenom: `factory/mantra1axznhnm82lah8qqvp9hxdad49yx3s5dcj66qka/usdc`,
          coinDecimals: 6,
        },
        {
          coinDenom: 'MANTRA',
          coinMinimalDenom: `factory/mantra1axznhnm82lah8qqvp9hxdad49yx3s5dcj66qka/mantra`,
          coinDecimals: 6,
        },
        {
          coinDenom: 'AKT',
          coinMinimalDenom: `factory/mantra1axznhnm82lah8qqvp9hxdad49yx3s5dcj66qka/akt`,
          coinDecimals: 6,
        },
        {
          coinDenom: 'WETH',
          coinMinimalDenom: `factory/mantra1axznhnm82lah8qqvp9hxdad49yx3s5dcj66qka/weth`,
          coinDecimals: 6,
        },
        {
          coinDenom: 'MATIC',
          coinMinimalDenom: `factory/mantra1axznhnm82lah8qqvp9hxdad49yx3s5dcj66qka/matic`,
          coinDecimals: 6,
        },
        {
          coinDenom: 'ALT',
          coinMinimalDenom: `factory/mantra1axznhnm82lah8qqvp9hxdad49yx3s5dcj66qka/alt`,
          coinDecimals: 6,
        },
        {
          coinDenom: 'DOT',
          coinMinimalDenom: `factory/mantra1axznhnm82lah8qqvp9hxdad49yx3s5dcj66qka/dot`,
          coinDecimals: 6,
        },
        {
          coinDenom: 'DOGE',
          coinMinimalDenom: `factory/mantra1axznhnm82lah8qqvp9hxdad49yx3s5dcj66qka/dogecoin`,
          coinDecimals: 6,
        },
        {
          coinDenom: 'ZXC',
          coinMinimalDenom: `factory/mantra1axznhnm82lah8qqvp9hxdad49yx3s5dcj66qka/zxc`,
          coinDecimals: 6,
        },
        {
          coinDenom: 'KUS',
          coinMinimalDenom: `factory/mantra1axznhnm82lah8qqvp9hxdad49yx3s5dcj66qka/kusama`,
          coinDecimals: 6,
        },
        {
          coinDenom: 'VBN',
          coinMinimalDenom: `factory/mantra1axznhnm82lah8qqvp9hxdad49yx3s5dcj66qka/vbn`,
          coinDecimals: 6,
        },
        {
          coinDenom: 'USDT',
          coinMinimalDenom: `factory/mantra1axznhnm82lah8qqvp9hxdad49yx3s5dcj66qka/usdt`,
          coinDecimals: 6,
        },
        {
          coinDenom: 'PEPE',
          coinMinimalDenom: `factory/mantra1axznhnm82lah8qqvp9hxdad49yx3s5dcj66qka/pepe`,
          coinDecimals: 6,
        },
        {
          coinDenom: 'JUNO',
          coinMinimalDenom: `factory/mantra1axznhnm82lah8qqvp9hxdad49yx3s5dcj66qka/juno`,
          coinDecimals: 6,
        },
        {
          coinDenom: 'mTesla',
          coinMinimalDenom: `factory/mantra1axznhnm82lah8qqvp9hxdad49yx3s5dcj66qka/mtesla`,
          coinDecimals: 6,
        },
        {
          coinDenom: 'mApple',
          coinMinimalDenom: `factory/mantra1axznhnm82lah8qqvp9hxdad49yx3s5dcj66qka/mapple`,
          coinDecimals: 6,
        },
        {
          coinDenom: 'mpalmjumeirah',
          coinMinimalDenom: `factory/mantra1axznhnm82lah8qqvp9hxdad49yx3s5dcj66qka/mpalmjumeirah`,
          coinDecimals: 6,
        },
        {
          coinDenom: 'mgoldetf',
          coinMinimalDenom: `factory/mantra1axznhnm82lah8qqvp9hxdad49yx3s5dcj66qka/mgoldetf`,
          coinDecimals: 6,
        },
        {
          coinDenom: 'mBF2',
          coinMinimalDenom: `factory/mantra1axznhnm82lah8qqvp9hxdad49yx3s5dcj66qka/mbf2`,
          coinDecimals: 6,
        },
        {
          coinDenom: 'mblackstone',
          coinMinimalDenom: `factory/mantra1axznhnm82lah8qqvp9hxdad49yx3s5dcj66qka/mblackstone`,
          coinDecimals: 6,
        },
      ],
      feeCurrencies: [
        {
          coinDenom: 'OM',
          coinMinimalDenom: 'uom',
          coinDecimals: 6,
          gasPriceStep: {
            low: 0.0002,
            average: 0.0006,
            high: 0.0008,
          },
        },
      ],
      bip44: {
        coinType: 118,
      },
      stakeCurrency: {
        coinDenom: 'OM',
        coinMinimalDenom: 'uom',
        coinDecimals: 6,
      },
      image:
        'https://staging-app.mantra.finance/assets/mantra-logo.c2e024c1.svg',
      theme: {
        primaryColor: '#fff',
        gradient:
          'linear-gradient(180deg, rgba(255,255,255,0.32) 0%, rgba(255,255,255,0) 100%)',
      },
    },
  },
];
