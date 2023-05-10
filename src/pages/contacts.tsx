import React from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import MainContainer from "../components/MainContainer";
import HeaderSection from "../components/contacts/headerSection/HeaderSection";
import ContactsSection from "../components/contacts/contacts/Contacts";
import Form from "../components/contacts/form/Form";


interface ContactsProps {
    emailJSPublic: string
}

export default function Contacts({ emailJSPublic }: ContactsProps) {

    const { t } = useTranslation();

    return (
        <MainContainer headerBackgroundDefault={true}>
            <div className={"minusHeader"}>
                <HeaderSection />
                <ContactsSection />
                <Form emailJSPublic={emailJSPublic} />
            </div>
        </MainContainer>
    )
}

export async function getStaticProps({ locale }: any) {
    return {
        props: {
            ...(await serverSideTranslations(locale)),
            emailJSPublic: process.env.EMAIL_JS_PUBLIC
        },
    };
}