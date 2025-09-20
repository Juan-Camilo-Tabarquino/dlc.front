import '@/styles/globals.css';
import { Poppins } from 'next/font/google';
import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store } from '@/store/store';
import { ConfigProvider, App as AntdApp } from 'antd';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '700'],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ConfigProvider>
      <AntdApp>
        <Provider store={store}>
          <main className={poppins.className}>
            <Component {...pageProps} />
          </main>
        </Provider>
      </AntdApp>
    </ConfigProvider>
  );
}
