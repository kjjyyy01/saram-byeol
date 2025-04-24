import localFont from 'next/font/local';

export const gmarket = localFont({
  src: [
    { path: '../../public/fonts/gmarket/GmarketSansLight.woff2', weight: '300' },
    { path: '../../public/fonts/gmarket/GmarketSansMedium.woff2', weight: '500' },
    { path: '../../public/fonts/gmarket/GmarketSansBold.woff2', weight: '700' },
  ],
  variable: '--font-gmarket',
  display: 'swap',
});
