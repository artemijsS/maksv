import React from "react";
import { GetServerSidePropsContext } from 'next'
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { IEstate } from '../../types';
import MainContainer from "../../components/MainContainer";
import HeaderSection from "../../components/estate/info/headerSection/HeaderSection";
import ObjectSection from "../../components/estate/info/objectSection/ObjectSection";
import Description from "../../components/estate/info/description/Description";
import SimilarObjects from "../../components/estate/info/similarObjects/SimilarObjects";
import axios from "axios";

interface EstatePageProps {
    estate: IEstate
}

export default function EstatePage({ estate }: EstatePageProps) {

    const { t, i18n } = useTranslation();


    return (
        <MainContainer headerBackgroundDefault={true}>
            <div className={"minusHeader"}>
                <HeaderSection estate={estate} />
                <ObjectSection estate={estate} />
                <Description estate={estate} />
                <SimilarObjects estate={estate} />
            </div>
        </MainContainer>
    );
}


export async function getServerSideProps({ locale, params }: GetServerSidePropsContext) {
    try {
        const { id }: any = params;

        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/estate/info?id=${id}`);
        const estate = data;

        return {
            props: {
                ...(await serverSideTranslations(locale as string)),
                estate,
            },
        };
    } catch (error) {
        return {
            notFound: true,
        };
    }
}
