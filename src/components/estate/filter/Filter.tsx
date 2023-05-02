import React, { useEffect, useState } from "react";
import { useTranslation } from 'next-i18next';
import style from './filter.module.scss'
import Select from './Select'
import axios from "axios";
import { series } from "../../admin/estate/FLatInputs";


interface City {
    _id: string,
    name: {
        [key: string]: string
        lv: string,
        ru: string,
        en: string,
    }
}

const FilterSection = () => {

    const { t, i18n } = useTranslation()

    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [cities, setCities] = useState<City[]>([])
    const [districts, setDistricts] = useState<City[]>([])

    const [city, setCity] = useState<string>('')
    const [type, setType] = useState<string>('')

    const onSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
    }

    const onPlus = () => {
        setIsOpen(!isOpen);
    }

    useEffect(() => {
        axios.get("city?size=1000").then(res => {
            setCities(res.data.data)
        })
    }, [])

    const cityChange = (id: string) => {
        setCity(id)
        axios.get(`city/district?city=${id}`).then(res => {
            setDistricts(res.data)
        })
    }

    return (
        <div className={style.filterSection + " wrapper"}>
            <div className={style.title}>
                <h2>Īpašuma meklēšana</h2>
                <p>Šeit ir apkopoti visi mūsu piedāvājumi katrai gaumei un vēlmēm.</p>
            </div>
            <form onSubmit={onSubmit} className={style.filter}>
                <div className={style.row}>
                    <div className={style.input + " " + style.long}>
                        <label htmlFor="search">Meklēt</label>
                        <svg className={style.searchSVG} width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18.7285 15.8818L14.5879 11.6875C15.2617 10.5107 15.6133 9.20215 15.6133 7.88379C15.6133 3.60645 12.1367 0.125 7.86914 0.125C3.60156 0.125 0.125 3.60645 0.125 7.88379C0.125 12.1611 3.60156 15.6426 7.86914 15.6426C9.23145 15.6426 10.5791 15.2666 11.7803 14.5488L15.9014 18.7285C15.9941 18.8213 16.126 18.8799 16.2578 18.8799C16.3896 18.8799 16.5215 18.8262 16.6143 18.7285L18.7285 16.5898C18.9238 16.3896 18.9238 16.0771 18.7285 15.8818ZM7.86914 3.14746C10.4766 3.14746 12.5957 5.27148 12.5957 7.88379C12.5957 10.4961 10.4766 12.6201 7.86914 12.6201C5.26172 12.6201 3.14258 10.4961 3.14258 7.88379C3.14258 5.27148 5.26172 3.14746 7.86914 3.14746Z" fill="#7B7B7B"/>
                        </svg>
                        <input type="text" id={"search"} placeholder={"Meklējamais vārds vai frāze"}/>
                    </div>
                    <div className={style.input}>
                        <label htmlFor="oprtation">Operācija</label>
                        <Select
                            options={[{option: "Pirkt uzreiz", value: "Pirkt uzreiz"}, {option: "Iziret", value: "Iziret"}]}
                            placeHolder={"-"}
                            onSelect={(value: string) => console.log(value)}
                        />
                    </div>
                    <div className={style.input}>
                        <label htmlFor="type">Tips</label>
                        <Select
                            options={Object.keys(types).map((key: string) => ({option: types[key][i18n.language], value: key}))}
                            placeHolder={"-"}
                            onSelect={(value: string) => setType(value)}
                        />
                    </div>
                    <button type={"submit"}>Meklēt</button>
                </div>
                <div className={style.hr}/>
                <div className={style.row + " " + style.open} onClick={() => onPlus()}>
                    Paplašināta meklēšana
                    <svg className={style.selectSVG + " " + (isOpen ? style.rotate : "")} width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.50781 0.25L0.75 1.05859L7 7.75L13.25 1.05859L12.4961 0.25L7 6.12891L1.50781 0.25Z" fill="#3C3C3C"/>
                    </svg>
                </div>
                {isOpen &&
                    <>
                        <div className={style.row} style={{ marginTop: '20px' }}>
                            <div className={style.input}>
                                <label htmlFor="city">Pilsēta</label>
                                <Select options={cities.map((city => ({ option: city.name[i18n.language], value: city._id })))} disabled={cities.length < 1} placeHolder={"-"} onSelect={(id: string) => cityChange(id)} />
                            </div>
                            <div className={style.input}>
                                <label htmlFor="district">Rajons</label>
                                <Select options={districts.map((district => ({ option: district.name[i18n.language], value: district._id })))} disabled={!city} placeHolder={"-"} onSelect={(value: string) => console.log(value)} />
                            </div>
                            <div className={style.input + " " + style.small}>
                                <label htmlFor="price">Cena €</label>
                                <input type="number" placeholder={"Cena no"}/>
                            </div>
                            <div className={style.input + " " + style.small}>
                                <input type="number" placeholder={"Cena līdz"}/>
                            </div>

                        </div>
                        {type &&
                            <div className={style.row} style={{ marginTop: '20px' }}>
                                {type === '1' &&
                                    <>
                                        <div className={style.input + " " + style.small}>
                                            <label htmlFor="floor">Stāvi</label>
                                            <input type="number" id={"floor"} placeholder={"No"}/>
                                        </div>
                                        <div className={style.input + " " + style.small}>
                                            <input type="number" placeholder={"Līdz"}/>
                                        </div>
                                    </>
                                }
                                {type === '2' || type === '10' &&
                                <>
                                    <div className={style.input + " " + style.small}>
                                        <label htmlFor="floor">Stāvs</label>
                                        <input type="number" id={"floor"} placeholder={"No"}/>
                                    </div>
                                    <div className={style.input + " " + style.small}>
                                        <input type="number" placeholder={"Līdz"}/>
                                    </div>
                                </>
                                }
                                {type === '1' || type === '2'  &&
                                <>
                                    <div className={style.input + " " + style.small}>
                                        <label htmlFor="livingArea">Dzīvojamā platība</label>
                                        <input type="number" id={"livingArea"} placeholder={"No"}/>
                                    </div>
                                    <div className={style.input + " " + style.small}>
                                        <input type="number" placeholder={"Līdz"}/>
                                    </div>
                                </>
                                }
                                {(type === '1' || type === '3' || type === '4' || type === '5' || type === '6' || type === '7' || type === '9' || type === '10') &&
                                <>
                                    <div className={style.input + " " + style.small}>
                                        <label htmlFor="landArea">Zemes platība</label>
                                        <input type="number" id={"landArea"} placeholder={"No"}/>
                                    </div>
                                    <div className={style.input + " " + style.small}>
                                        <input type="number" placeholder={"Līdz"}/>
                                    </div>
                                </>
                                }
                                {type === '2' &&
                                <>
                                    <div className={style.input + " " + style.small}>
                                        <label htmlFor="landArea">Sērija</label>
                                        <Select options={Object.keys(series).map((key: string) => ({ option: series[key][i18n.language], value: key }))} placeHolder={"-"} onSelect={(value: string) => console.log(value)} />
                                    </div>
                                </>
                                }
                                {type === '8' &&
                                <>
                                    <div className={style.input + " " + style.small}>
                                        <label htmlFor="gateHeight">Vārtu augstums</label>
                                        <input type="number" id={"gateHeight"} placeholder={"No"}/>
                                    </div>
                                    <div className={style.input + " " + style.small}>
                                        <input type="number" placeholder={"Līdz"}/>
                                    </div>
                                </>
                                }
                            </div>
                        }

                    </>
                }
            </form>
        </div>
    )
}

export default FilterSection;


interface ITypes {
    [key: string]: {
        [key: string]: string,
        lv: string,
        ru: string,
        en: string,
    }
}

const types: ITypes = {
    '1': {
        lv: "Mājas",
        ru: "Дома",
        en: "Houses"
    },
    '2': {
        lv: "Dzīvokļi",
        ru: "Квартиры",
        en: "Flats"
    },
    '3': {
        lv: "Zeme",
        ru: "Земля",
        en: "Land"
    },
    '4': {
        lv: "Rūpnīca",
        ru: "Завод",
        en: "Factory"
    },
    '5': {
        lv: "Komerciālais īpašums",
        ru: "Коммерческий обьект",
        en: "Commercial object"
    },
    '6': {
        lv: "Bēniņi, pagrabi",
        ru: "Чердак, подвал",
        en: "Attic, basement"
    },
    '7': {
        lv: "Darbnīcas, noliktavas, ražošanas telpas",
        ru: "Цеха, склады, производственные помещения",
        en: "Workshops, warehouses, production facilities"
    },
    '8': {
        lv: "Garāžas",
        ru: "Гаражи",
        en: "Garages"
    },
    '9': {
        lv: "Autostāvvietas",
        ru: "Стоянки",
        en: "Parking"
    },
    '10': {
        lv: "Restorāni, kafejnīcas, biroji",
        ru: "Рестораны, кафе, офисы",
        en: "Restaurants, cafes, offices"
    }
}
