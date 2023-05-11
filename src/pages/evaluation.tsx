import React from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import MainContainer from "../components/MainContainer";
import HeaderSection from "../components/contacts/headerSection/HeaderSection";
import SliderEvaluation from "../components/evaluation/slider/SliderEvaluation";
import HeaderDown from "../components/evaluation/headerDown/HeaderDown";
import Services from "../components/evaluation/services/Services";
import Prices from "../components/evaluation/prices/Prices";
import HeaderImage from '../assets/contacts/headerSection.png';
import HeaderDownImage from '../assets/evaluation/headerDownImage.png';


export default function Evaluation() {

    const { t } = useTranslation();

    return (
        <MainContainer headerBackgroundDefault={true}>
            <div className={"minusHeader"}>
                <HeaderSection
                    title={t("evaluationPage:header.section.title")}
                    p={t("evaluationPage:header.section.p")}
                    image={HeaderImage}
                />
                <SliderEvaluation />
                <HeaderDown
                    title={t("evaluationPage:header.down.title")}
                    p={t("evaluationPage:header.down.p")}
                    image={HeaderDownImage}
                />
                <Services />
                <Prices />
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
