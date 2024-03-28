import '../styles/globals.css';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { MantineProvider } from '@mantine/core';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import { CartContextProvider } from '../context/CartContext';
import { ApplicationShell } from '../components/ApplicationShell';

type DB = {
  isConnected:Boolean
};

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    <UserProvider>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          /** Put your mantine theme override here */
          fontFamily: 'Roboto, sans-serif',
          colorScheme: 'light',
          white: '#FFFAF0',
          black: '#0f1108',
          colors: {
            // Add your color
            deepBlue: ['#E9EDFC', '#C1CCF6', '#99ABF0', '#6680e3', '#3959d4', '#1a3dc4', '#0026b8'],
            brown: ['#3d3932', '#383227', '#2b2418', '#261d0f', '#241909', '#1f1404', '#170e00'],
            orange: ['#ffdfc4', '#facaa2', '#fab882', '#FCAA67', '#f7984a', '#f78528', '#f56e00'],
            merriGold: ['#FFFAF0', '#fff1d4', '#fce4b1', '#ffdc91', '#ffd270', '#fcc64e', '#fcbc2d', '#ffb50f'],
            machineGreen: ['#b0bdaa', '#87a37a', '#7ba368', '#6b9e52', '#5b9c3b', '#4c9627', '#3d9113', '#329401'],
            smokeyBlack: ['#0f0f0c', '#11120c', '#0c0d07', '#0F1108', '#0b0d05', '#0a0d03', '#090d01', '#080d00']
          },
          primaryColor: 'machineGreen',
          primaryShade: 3,
          defaultGradient: {
            from: 'orange',
            to: 'merriGold',
            deg: 45,
          },
          components: {
            Container: {
              defaultProps: {
                sizes: {
                  xs: 540,
                  sm: 720,
                  md: 960,
                  lg: 1140,
                  xl: 1320,
                },
              },
            },
          },
        }}
      >
        <CartContextProvider>
          <ApplicationShell>
            <Component {...pageProps} />
          </ApplicationShell>
        </CartContextProvider>
      </MantineProvider>
    </UserProvider>
  );
}