import { useEffect } from "react";
import '@/styles/globals.css'
import { useRouter } from "next/router";
import type { AppProps } from 'next/app'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { appWithTranslation } from 'next-i18next';
import Cookies from 'js-cookie';


const App = ({ Component, pageProps }: AppProps) => {
    const router = useRouter();

    useEffect(() => {
        const lang = Cookies.get('language');
        router.push(router.pathname, router.pathname, { locale: lang });
    }, []);

    return (
        <>
            <Component {...pageProps} />
            <ToastContainer />
        </>
    )
}

export default appWithTranslation(App);
