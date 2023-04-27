import React, {useRef, useState} from "react";
import { useTranslation } from "next-i18next";
import styles from './addEstateSection.module.scss';
import Link from "next/link";
import { AddEstate } from "../../../assets/info";
import Image from "next/image";


export default function AddEstateSection() {

    const { t } = useTranslation();

    return (
        <div className={styles.sliderAbout + " " + styles.add}
        >
            <div className={"wrapper"}>
                <h2>Esam Atvērti Iegādāties Jūsu Nekustamo Īpašumu!</h2>
            </div>
            <div style={{ margin: "auto", maxWidth: "1500px", position: "relative" }}>
                <div className={"wrapper"}>
                    <div className={styles.slide}>
                        <Image src={AddEstate} alt="Estate"/>
                        <div className={styles.info}>
                            <h3>Pievieno Jūsu objektu pardošānai</h3>
                            <div>
                                <p>Mēs esam ieinteresēti iegādāties jūsu nekustamo īpašumu! Neatkarīgi no tā, vai vēlaties pārdot dzīvojamo vai komerciālo īpašumu, mēs piedāvājam konkurētspējīgas cenas un bezproblēmu darījumu procesu.</p>
                                <p>Sazinieties ar mums jau šodien, lai ieplānotu konsultāciju un spertu pirmo soli ceļā uz sava īpašuma pārdošanu par lielisku cenu!</p>
                            </div>
                            <Link href={"/estate"} className={styles.button}>Vairāk informācijas</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
