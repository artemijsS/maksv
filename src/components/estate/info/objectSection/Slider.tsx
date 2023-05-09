import React, { useState } from "react";
import styles from './slider.module.scss';
import ImageGallery from "react-image-gallery";

interface SliderSectionProps {
    images: string[]
}

interface IImg {
    original: string,
    thumbnail: string,
}


export default function SliderSection({ images }: SliderSectionProps) {

    const [img, setImg] = useState<IImg[]>(images.map((img: string) => ({ original: img, thumbnail: img })));

    return (
        <div className={styles.sliderSection}>
            <ImageGallery
                items={img}
                swipeThreshold={50}
                showPlayButton={false}
                renderLeftNav={(onClick) => <CustomLeftNav onClick={onClick} />}
                renderRightNav={(onClick) => <CustomRightNav onClick={onClick} />}
            />
        </div>
    )

}

const CustomLeftNav = ({ onClick }: any) => (
    <button className={styles.left} onClick={onClick}>
        <svg width="53" height="41" viewBox="0 0 53 41" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 20L10 14.2265V25.7735L0 20ZM33 21L9 21V19L33 19V21Z" fill="white"/>
            <path d="M14 20.5C14 31.293 22.5297 40 33 40C43.4703 40 52 31.293 52 20.5C52 9.70703 43.4703 1 33 1C22.5297 1 14 9.70703 14 20.5Z" stroke="white" strokeWidth="2"/>
        </svg>
    </button>
);

const CustomRightNav = ({ onClick }: any) => (
    <button className={styles.right} onClick={onClick}>
        <svg width="53" height="41" viewBox="0 0 53 41" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M53 20L43 14.2265V25.7735L53 20ZM20 21L44 21V19L20 19V21Z" fill="white"/>
            <path d="M39 20.5C39 31.293 30.4703 40 20 40C9.52972 40 1 31.293 1 20.5C1 9.70703 9.52972 1 20 1C30.4703 1 39 9.70703 39 20.5Z" stroke="white" strokeWidth="2"/>
        </svg>
    </button>
);
