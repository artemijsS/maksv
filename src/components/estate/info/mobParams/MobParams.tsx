import React from "react";
import { City, District, Floor, GateHeight, LandArea, LivingArea, Rooms, Series, Size } from "../../../../assets/params";
import { useTranslation } from "next-i18next";
import { IEstate } from "../../../../types";
import style from "./mobParams.module.scss";


interface MobParamsProps {
    estate: IEstate
}

export default function MobParams ({ estate }: MobParamsProps) {

    const { t, i18n } = useTranslation()

    return (
        <div className={style.mobParams}>
            {estate.city && (
                <div className={style.param}>
                    <div className={style.label}>{t("estatePage:filter.city")}:</div>
                    <div className={style.value}>
                        <span><City /></span>{estate.city.name[i18n.language]}
                    </div>
                </div>
            )}
            {estate.district && (
                <div className={style.param}>
                    <div className={style.label}>{t("estatePage:filter.district")}:</div>
                    <div className={style.value}>
                        <span><District /></span>{estate.district.name[i18n.language]}
                    </div>
                </div>
            )}
            {estate.landArea && (
                <div className={style.param}>
                    <div className={style.label}>{t("estatePage:filter.landArea")}:</div>
                    <div className={style.value}>
                        <span><LandArea /></span>{estate.landArea} m²
                    </div>
                </div>
            )}
            {estate.floor && (
                <div className={style.param}>
                    <div className={style.label}>{estate.type.en === "Houses" ? t("params:floors") : t("params:floor")}:</div>
                    <div className={style.value}>
                        <span><Floor /></span>{estate.floor}
                    </div>
                </div>
            )}
            {estate.rooms && (
                <div className={style.param}>
                    <div className={style.label}>{t("estatePage:filter.rooms")}:</div>
                    <div className={style.value}>
                        <span><Rooms /></span>{estate.rooms}
                    </div>
                </div>
            )}
            {estate.livingArea && (
                <div className={style.param}>
                    <div className={style.label}>{t("estatePage:filter.livingArea")}:</div>
                    <div className={style.value}>
                        <span><LivingArea /></span>{estate.livingArea} m²
                    </div>
                </div>
            )}
            {estate.series && (
                <div className={style.param}>
                    <div className={style.label}>{t("estatePage:filter.series")}:</div>
                    <div className={style.value}>
                        <span><Series /></span>{estate.series[i18n.language]}
                    </div>
                </div>
            )}
            {estate.gateHeight && (
                <div className={style.param}>
                    <div className={style.label}>{t("estatePage:filter.gateHeight")}:</div>
                    <div className={style.value}>
                        <span><GateHeight /></span>{estate.gateHeight} m
                    </div>
                </div>
            )}
            {estate.size && (
                <div className={style.param}>
                    <div className={style.label}>{t("estatePage:filter.size")}:</div>
                    <div className={style.value}>
                        <span><Size /></span>{estate.size}
                    </div>
                </div>
            )}
            <div className={style.param}>
                <div className={style.label}>{t("estatePage:filter.price")}:</div>
                <div className={style.value + " " + style.bold}>
                    {Number(estate.price.toFixed(2)).toLocaleString('lv', { style: 'currency', currency: 'EUR' })} {estate.rent ? t("params:month") : ''}
                </div>
            </div>
        </div>
    )
}
