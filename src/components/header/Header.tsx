import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from 'next-i18next';
import { useRouter } from "next/router";
import Cookies from 'js-cookie';
import Logo from '@/assets/logo/logo.png';
import { Ru, Lv, En } from '@/assets/languages';
import style from './header.module.scss'
import Link from "next/link";
import Image from "next/image";


const Header = () => {

    const router = useRouter()
    const { t, i18n } = useTranslation()
    const [background, setBackground] = useState<string>("")
    const [burgerStatus, setBurgerStatus] = useState<Boolean>(false)
    const burgerStatusRef = useRef<Boolean>(burgerStatus);


    useEffect(() => {
        window.addEventListener('resize', widthCheck)
        window.addEventListener('scroll', scrollCheck)
        return () => {
            window.removeEventListener('resize', widthCheck)
            window.removeEventListener('scroll', scrollCheck)
        };
    },[])

    const onBurgerClick = (close: Boolean = false) => {
        if (close) {
            burgerStatusRef.current = false;
            setBurgerStatus(false);
            return;
        }
        burgerStatusRef.current = !burgerStatus;
        setBurgerStatus(!burgerStatus);
    }

    const widthCheck = () => {
        if (burgerStatusRef.current && window.innerWidth > 750)
            onBurgerClick(true)
    }

    const scrollCheck = () => {
        if (window.scrollY === 0) {
            setBackground('')
        } else
            setBackground('#FFF')
    }

    return (
        <header className={style.headerContainer} style={{ backgroundColor: `${background ? background : 'transparent'}` }}>
            <div className={"wrapper " + style.header}>
                <Link href={"/"} className={style.logo}>
                    <Image src={Logo} alt={"logo"}/>
                </Link>
                <nav className={style.nav}>
                    <Link href={"/estate"} className={style.link + " " + (router.pathname === "/estate" ? style.active : "")}>{t("header:estate")}</Link>
                    <Link href={"/evaluation"} className={style.link + " " + (router.pathname === "/evaluation" ? style.active : "")}>{t("header:evaluation")}</Link>
                    <Link href={"/construction"} className={style.link + " " + (router.pathname === "/construction" ? style.active : "")}>{t("header:construction")}</Link>
                    <Link href={"tel:+37167818686"} className={style.link}>+371 67818686</Link>
                </nav>
                <div className={style.languages}>
                    <Link href={router.pathname} locale={"en"} style={{ display: i18n.language.includes("en") ? "none" : "block" }} onClick={() => Cookies.set('language', "en")}>
                        <Image src={En} alt={"EN"}/>
                    </Link>
                    <Link href={router.pathname} locale={"ru"} style={{ display: i18n.language.includes("ru") ? "none" : "block" }} onClick={() => Cookies.set('language', "ru")}>
                        <Image src={Ru} alt={"RU"}/>
                    </Link>
                    <Link href={router.pathname} locale={"lv"} style={{ display: i18n.language.includes("lv") ? "none" : "block" }} onClick={() => Cookies.set('language', "lv")}>
                        <Image src={Lv} alt={"LV"}/>
                    </Link>
                </div>
                <div className={style.burger + ` ${burgerStatus ? style.opened : ""}`} onClick={() => onBurgerClick()}>
                    <div className={style.line}/>
                    <div className={style.line}/>
                    <div className={style.line + ` ${burgerStatus ? style.del : ""}`}/>
                </div>
                {burgerStatus &&
                <div className={style.burgerOpen}>
                    <div className="wrapper">
                        <nav className={style.navMobile}>
                            <div className={style.languages}>
                                <Link href={router.pathname} locale={"en"} style={{ display: i18n.language.includes("en") ? "none" : "block" }} onClick={() => Cookies.set('language', "en")}>
                                    <Image src={En} alt={"EN"}/>
                                </Link>
                                <Link href={router.pathname} locale={"ru"} style={{ display: i18n.language.includes("ru") ? "none" : "block" }} onClick={() => Cookies.set('language', "ru")}>
                                    <Image src={Ru} alt={"RU"}/>
                                </Link>
                                <Link href={router.pathname} locale={"lv"} style={{ display: i18n.language.includes("lv") ? "none" : "block" }} onClick={() => Cookies.set('language', "lv")}>
                                    <Image src={Lv} alt={"LV"}/>
                                </Link>
                            </div>
                            <Link href={"/estate"} className={style.link + " " + (router.pathname === "/estate" ? style.active : "")}>{t("header:estate")}</Link>
                            <Link href={"/evaluation"} className={style.link + " " + (router.pathname === "/evaluation" ? style.active : "")}>{t("header:evaluation")}</Link>
                            <Link href={"/construction"} className={style.link + " " + (router.pathname === "/construction" ? style.active : "")}>{t("header:construction")}</Link>
                            {/*<Link href={"tel:+37167818686"} className={style.link}>+371 67818686</Link>*/}
                        </nav>
                    </div>
                </div>
                }
            </div>
        </header>
    )
}

export default Header;
