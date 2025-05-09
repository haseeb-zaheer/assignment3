import { ThemeProvider } from '@/context/ThemeContext';
import Layout from '@/components/Layout'; // if you're using one
import '../styles/globals.css';

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}
