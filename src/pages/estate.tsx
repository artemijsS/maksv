import React from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import MainContainer from "../components/MainContainer";


export default function Estate() {

    const { t } = useTranslation();

    return (
        <MainContainer>
            <div className={"wrapper"}>
                <p>Estate</p>
            </div>

        </MainContainer>
    )
}

export async function getStaticProps({ locale }: any) {
    return {
        props: {
            ...(await serverSideTranslations(locale)),
        },
    };
}
