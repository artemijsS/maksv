import React, { useState } from "react";
import style from './estates.module.scss'
import { useTranslation } from "next-i18next";
import { City, District, LandArea, Floor, LivingArea, Rooms } from '../../../assets/params';
import { IEstate } from '../../../types';


interface EstatesProps {
    estate: IEstate[],
    loading: boolean
}

const Estates = ({ estate, loading }: EstatesProps) => {

    const { t, i18n } = useTranslation();

    return (
        <div className={style.estates + " wrapper"}>
            {
                estate.map((estate: IEstate, i: number) => (
                    <div className={style.estate}>
                        <img src={estate.mainImage} alt={"Estate Image"} />
                        <p className={style.pSmall}>{estate.type[i18n.language]}</p>
                        <h3>{Number(estate.price.toFixed(2)).toLocaleString('lv', { style: 'currency', currency: 'EUR' })}</h3>
                        <p>{estate.name[i18n.language]}</p>
                        <div className={style.params}>
                            {estate.city && (<div className={style.param}><span><City /></span>{estate.city.name[i18n.language]}</div>)}
                            {estate.district && (<div className={style.param}><span><District /></span>{estate.district.name[i18n.language]}</div>)}
                            {estate.landArea && (<div className={style.param}><span><LandArea /></span>{estate.landArea} m²</div>)}
                            {estate.floor && (<div className={style.param}><span><Floor /></span>{estate.floor} {estate.type.en === "Houses" ? t("params:floors") : t("params:floor")}</div>)}
                            {estate.rooms && (<div className={style.param}><span><Rooms /></span>{estate.rooms} {t("params:rooms")}</div>)}
                            {estate.livingArea && (<div className={style.param}><span><LivingArea /></span>{estate.livingArea} m²</div>)}
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default Estates;
