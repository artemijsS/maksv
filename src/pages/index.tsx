import React from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

export default function Home() {

  const { t } = useTranslation();

  return (
      <div>{t("translation:hello")}</div>
  )
}

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale)),
    },
  };
}
