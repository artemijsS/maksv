import React, { useState, useEffect } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import MainContainer from "../components/MainContainer";
import HeaderSection from "../components/estate/headerSection/HeaderSection";
import FilterSection from "../components/estate/filter/Filter";
import Estates from "../components/estate/estates/Estates";
import { IEstate } from '../types';
import axios from "axios";
import { toast } from "react-toastify";


export default function Estate() {

    const { t } = useTranslation();

    const [estates, setEstates] = useState<IEstate[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [pagination, setPagination] = useState({
        pages: 0,
        page: 0,
        size: 6
    });

    useEffect(() => {
        setLoading(true);
        axios.get(`estate?size=${pagination.size}&page=${pagination.page}`).then(res => {
            setEstates(res.data.data);
            setPagination({...pagination, pages: res.data.pages});
        }, _err => {
            toast.error("Error occurred with loading estates")
        }).finally(() => setLoading(false))
    }, [])

    return (
        <MainContainer>
            <HeaderSection />
            <FilterSection />
            <Estates estate={estates} loading={loading}/>
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
