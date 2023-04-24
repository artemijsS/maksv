import React from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import MainContainer from "../components/MainContainer";


export default function Home() {

  const { t } = useTranslation();

  return (
      <MainContainer>
        <div className={"wrapper"}>
            <p>test</p>
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
