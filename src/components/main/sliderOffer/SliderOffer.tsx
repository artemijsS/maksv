import React, {useRef, useState} from "react";
import { useTranslation } from "next-i18next";
import Slider from 'react-slick';
import styles from './sliderOffer.module.scss';
import Link from "next/link";
import Estate from "../../../assets/aboutUs/estate.png";
import Image from "next/image";


const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    // autoplay: true,
    autoplaySpeed: 3000,
    arrows: false
};


export default function SliderOffer() {

    const { t } = useTranslation();
    const sliderRef = useRef();
    const [activeSlide, setActiveSlide] = useState<number>(0);

    const beforeChangeHandler = (cur: number, next: number) => {
        setActiveSlide(next);
    };

    const handleSliderButtonClick = (index: number) => {
        sliderRef.current.slickGoTo(index);
    };

    return (
        <div className={styles.sliderAbout}
        >
            <div className={"wrapper"}>
                <h2>Ko Mēs Piedavājām?</h2>
                <div className={styles.slideChange}>
                    <button onClick={() => handleSliderButtonClick(0)} className={activeSlide === 0 ? styles.active : ""}>{t("header:estate")}</button>
                    <button onClick={() => handleSliderButtonClick(1)} className={activeSlide === 1 ? styles.active : ""}>{t("header:evaluation")}</button>
                    <button onClick={() => handleSliderButtonClick(2)} className={activeSlide === 2 ? styles.active : ""}>{t("header:construction")}</button>
                </div>
            </div>
            <div style={{ margin: "auto", maxWidth: "1500px", position: "relative" }}>
                <Slider
                    {...settings}
                    beforeChange={beforeChangeHandler}
                    ref={sliderRef}
                >
                    <div className={"wrapper"}>
                        <div className={styles.slide}>
                            <Image src={Estate} alt="Estate"/>
                            <div className={styles.info}>
                                <h3>Nekustamā īpašuma pirkšanas-pārdošanas risinājumi</h3>
                                <p>Mēs piedāvājam visaptverošus risinājumus nekustamā īpašuma pirkšanai un pārdošanai. Mūsu pieredzējušo profesionāļu komanda sniedz ekspertu norādījumus un atbalstu, lai nodrošinātu netraucētu un bez problēmām darījumu procesu.</p>
                                <Link href={"/estate"} className={styles.button}>Vairāk informācijas</Link>
                            </div>
                        </div>
                    </div>
                    <div className={"wrapper"}>
                        <div className={styles.slide}>
                            <Image src={Estate} alt="Estate"/>
                            <div className={styles.info}>
                                <h3>Nekustamā īpašuma pirkšanas-pārdošanas risinājumi</h3>
                                <p>Mēs piedāvājam visaptverošus risinājumus nekustamā īpašuma pirkšanai un pārdošanai. Mūsu pieredzējušo profesionāļu komanda sniedz ekspertu norādījumus un atbalstu, lai nodrošinātu netraucētu un bez problēmām darījumu procesu.</p>
                                <Link href={"/estate"} className={styles.button}>Vairāk informācijas</Link>
                            </div>
                        </div>
                    </div>
                    <div className={"wrapper"}>
                        <div className={styles.slide}>
                            <Image src={Estate} alt="Estate"/>
                            <div className={styles.info}>
                                <h3>Nekustamā īpašuma pirkšanas-pārdošanas risinājumi</h3>
                                <p>Mēs piedāvājam visaptverošus risinājumus nekustamā īpašuma pirkšanai un pārdošanai. Mūsu pieredzējušo profesionāļu komanda sniedz ekspertu norādījumus un atbalstu, lai nodrošinātu netraucētu un bez problēmām darījumu procesu.</p>
                                <Link href={"/estate"} className={styles.button}>Vairāk informācijas</Link>
                            </div>
                        </div>
                    </div>
                </Slider>
                <div className={styles.progress + " wrapper"}>
                    {activeSlide === 0 && <p>{t("header:estate")}</p>}
                    {activeSlide === 1 && <p>{t("header:evaluation")}</p>}
                    {activeSlide === 2 && <p>{t("header:construction")}</p>}
                    <progress value={activeSlide + 1} max={3}/>
                </div>
            </div>
        </div>
    )
}
