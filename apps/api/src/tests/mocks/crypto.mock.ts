import {Crypto} from '.prisma/client';

export const mockedCrypto = (crypto?: Partial<Crypto>): Crypto => ({
  id: crypto?.id ?? 'randomuuid',
  enable: crypto?.enable ?? true,
  symbol: crypto?.symbol ?? 'btc',
  link: crypto?.link ?? 'https://bitcoin.com/',
  image: crypto?.image ?? 'https://bitcoin.com/icon.png',
  apiId: crypto?.apiId ?? 'bitcoin',
  name: crypto?.name ?? 'Bitcoin',
  localization: crypto?.localization ?? '',
  market_data: crypto?.market_data ?? '',
  updatedAt: new Date(),
  createdAt: new Date(),
})