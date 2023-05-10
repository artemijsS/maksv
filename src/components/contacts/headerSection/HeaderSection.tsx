import React from "react";
import styles from './headerSection.module.scss';
import Image from "next/image";
import HeaderImage from '../../../assets/contacts/headerSection.png';
import {useTranslation} from "next-i18next";

export default function HeaderSection() {

    const { t } = useTranslation();

    return (
        <div className={styles.headerSection}>
            <Image src={HeaderImage} alt={"Contacts"}/>
            <div className={styles.info + " wrapper"}>
                <h1>{t("contactsPage:header.title")}</h1>
                <p dangerouslySetInnerHTML={{ __html: t("contactsPage:header.p") || "" }}/>
            </div>
        </div>
    );
}
