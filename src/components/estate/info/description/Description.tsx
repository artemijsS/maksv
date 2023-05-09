import React from "react";
import styles from './description.module.scss';
import { IEstate } from "../../../../types";
import { useTranslation } from "next-i18next";
import Params from "../params/Params";
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';


interface DescriptionProps {
    estate: IEstate
}
const containerStyle = {
    width: '100%',
    height: '100%'
};

export default function Description({ estate }: DescriptionProps) {

    const { t, i18n } = useTranslation();
    const apiKey = '';

    return (
        <div className={styles.descriptionSection + " wrapper"}>
            <h2>{estate.name[i18n.language]}</h2>
            <Params estate={estate} dark={true} />
            <h3>Objekta apraksts</h3>
            <p dangerouslySetInnerHTML={{__html: estate.description[i18n.language]}}/>
            <h3>Objekta lokācija</h3>
            <div className={styles.map}>
                <LoadScript googleMapsApiKey={apiKey}>
                    <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={{ lat: estate.location.lat, lng: estate.location.lng }}
                        zoom={13}
                    >
                        <Marker position={{ lat: estate.location.lat, lng: estate.location.lng }} />
                    </GoogleMap>
                </LoadScript>
            </div>
        </div>
    )

}
