import React, { useState, useEffect } from "react";
import { useTranslation } from "next-i18next";
import { IEstate } from '../../../types';
import Slider from 'react-slick';
import styles from './slider.module.scss';
import Link from "next/link";


const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
};

interface SliderSectionProps {
    data: IEstate[]
}

export default function SliderSection({ data }: SliderSectionProps) {

    const { t, i18n } = useTranslation();

    const [isHovered, setIsHovered] = useState(false);
    const [time, setTime] = useState<number>(0);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    useEffect(() => {
        let intervalId: any;

        if (isHovered) {
            setTime(0);
        }

        if (!isHovered) {
            intervalId = setInterval(() => {
                setTime(prevState => prevState + 20);
            }, 20);
        }

        return () => clearInterval(intervalId);
    }, [isHovered]);

    const beforeChangeHandler = () => {
        setTime(0);
    };

    return (
        <div className={styles.slider}
             onMouseEnter={handleMouseEnter}
             onMouseLeave={handleMouseLeave}
        >
            <Slider
                {...settings}
                // autoplay={!isHovered}
                beforeChange={beforeChangeHandler}
            >
                {data.map((estate, i) =>
                    <div className={styles.slide} key={i}>
                        <img src={estate.mainImage} alt={"estate"}/>
                        <div className={styles.buttonBlock + " wrapper"}>
                            <h1>Jūsu Sapņu Māja Vienmēr ir Pieejama Pie Mums</h1>
                            <Link href={"/estate"} className={styles.button}>Vairāk informācijas</Link>
                        </div>
                        <div className={styles.info}>
                            <div className={styles.name}>
                                <p>{estate.name[i18n.language]}</p>
                            </div>
                            <div className={styles.price}>
                                <p>{Number(estate.price.toFixed(2)).toLocaleString('lv', { style: 'currency', currency: 'EUR' })}</p>
                            </div>
                            <div className={styles.params}>
                                {estate.livingArea && estate.livingArea + " m²"}
                            </div>
                            <div className={styles.progress}>
                                <progress value={time} max={settings.autoplaySpeed}/>
                            </div>
                        </div>
                    </div>
                )}
            </Slider>
        </div>
    )
}
