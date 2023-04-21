import React, { useEffect, useState } from "react";
import styles from '../styles/admin.module.scss';
import { toast } from "react-toastify";
import { Estate } from './EstateAdd';
import axios from "axios";
import GoogleMapReact from "google-map-react";
import Upload from "../../service/Upload";
import { series } from "./FLatInputs";


export default function EstateUpdate({ estateOld, onCloseClick, onUpdate }) {

    const [loading, setLoading] = useState(true);
    const [estate, setEstate] = useState<IEstate>(estateOld);
    const [districts, setDistricts] = useState<IDistrict[]>([]);
    const [cities, setCities] = useState<ICity[]>([{ _id: '', name: { lv: '', ru: '', en: '' } }]);


    useEffect(() => {
        axios.get(`estate/info?id=${estateOld._id}`).then(res => {
            setEstate(res.data)
            setLoading(false);
            console.log(res.data)
        }, err => {
            toast.error(err.response.data.message || "Error occurred")
            onCloseClick();
        })
        axios.get('city?size=10000').then(res => {
            setCities(res.data.data);
        }, _err => {
            toast.error("Error with loading cities, try again");
            onCloseClick();
        })
        getDistricts(estate.city._id);
    }, [])

    const deleteEstate = () => {

    }
    const handleNameSubmit = (e) => {
        e.preventDefault();
    }

    const getDistricts = (cityId: string) => {
        axios.get(`city/district?city=${cityId}`).then(res => {
            setDistricts(res.data);
        }, _err => {
            toast.error("Error with loading districts, try again");
            onCloseClick();
        })
    }

    const imagesChange = (files) => {
        setEstate({ ...estate, images: files })
    }

    const changeSeries = (e) => {
        setEstate({...estate, series: series[e.target.value]})
    }

    if (loading)
        return (
            <>
                <div className="fixed inset-0 bg-gray-900 opacity-50" style={{ zIndex: 1 }}/>
                <div className="fixed inset-0 flex items-center justify-center">
                    <div className={styles.spinner} />
                </div>
            </>
        )


    return (
        <>
            <div className="fixed inset-0 bg-gray-900 opacity-50" style={{ zIndex: 1 }}/>
            <div className="fixed inset-0 flex items-center justify-center z-10">
                <div className="bg-white rounded-lg shadow-lg p-8 w-full relative" style={{maxHeight: "90vh", maxWidth: "800px", overflow: "auto"}}>
                    <svg onClick={deleteEstate} className={styles.delete} xmlns="http://www.w3.org/2000/svg" fill={"none"} width="24" height="24" viewBox="0 0 24 24">
                        <path d="M3 6v18h18v-18h-18zm5 14c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712z"/>
                    </svg>
                    <div className="text-lg font-medium mb-4">Update estate</div>
                    <div className="mb-6">
                        <form onSubmit={handleNameSubmit}>
                            <div className="block text-gray-700 font-bold mb-2">Name:</div>
                            <div className="mb-4 flex justify-between gap-3">
                                <div className={"flex-1"}>
                                    <input
                                        required={true}
                                        type="text"
                                        name="estateName-lv"
                                        id="estateName-lv"
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        placeholder="Enter estate name LV"
                                        value={estate.name.lv}
                                        onChange={(e) => setEstate({...estate, name: { ...estate.name, lv: e.target.value }})}
                                    />
                                </div>
                                <div className={"flex-1"}>
                                    <input
                                        required={true}
                                        type="text"
                                        name="estateName-ru"
                                        id="estateName-ru"
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        placeholder="Enter estate name RU"
                                        value={estate.name.ru}
                                        onChange={(e) => setEstate({...estate, name: { ...estate.name, ru: e.target.value }})}
                                    />
                                </div>
                                <div className={"flex-1"}>
                                    <input
                                        required={true}
                                        type="text"
                                        name="estateName-en"
                                        id="estateName-en"
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        placeholder="Enter estate name EN"
                                        value={estate.name.en}
                                        onChange={(e) => setEstate({...estate, name: { ...estate.name, en: e.target.value }})}
                                    />
                                </div>
                                <div className="flex justify-end relative">
                                    <button
                                        type="submit"
                                        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded disabled:cursor-not-allowed"
                                        disabled={loading}
                                    >
                                        Save
                                    </button>
                                </div>
                            </div>
                        </form>
                        <hr className={"mt-6 mb-6"}/>
                        <form onSubmit={handleNameSubmit}>
                            <div className="block text-gray-700 font-bold mb-2">Description:</div>
                            <div className="mb-4 flex flex-col justify-between gap-3">
                                <div className={"flex-1"}>
                                    <textarea
                                        required={true}
                                        name="estateDescription-lv"
                                        id="estateDescription-lv"
                                        className="flex-1 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        style={{ minHeight: "100px" }}
                                        placeholder="Enter estate description LV"
                                        value={estate.description.lv}
                                        onChange={(e) => setEstate({...estate, description: { ...estate.description, lv: e.target.value }})}
                                    />
                                </div>
                                <div className={"flex-1"}>
                                    <textarea
                                        required={true}
                                        name="estateDescription-ru"
                                        id="estateDescription-ru"
                                        className="flex-1 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        style={{ minHeight: "100px" }}
                                        placeholder="Enter estate description RU"
                                        value={estate.description.ru}
                                        onChange={(e) => setEstate({...estate, description: { ...estate.description, ru: e.target.value }})}
                                    />
                                </div>
                                <div className={"flex-1"}>
                                    <textarea
                                        required={true}
                                        name="estateDescription-en"
                                        id="estateDescription-en"
                                        className="flex-1 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        style={{ minHeight: "100px" }}
                                        placeholder="Enter estate description EN"
                                        value={estate.description.en}
                                        onChange={(e) => setEstate({...estate, description: { ...estate.description, en: e.target.value }})}
                                    />
                                </div>
                                <div className="flex justify-end relative">
                                    <button
                                        type="submit"
                                        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded disabled:cursor-not-allowed"
                                        disabled={loading}
                                    >
                                        Save
                                    </button>
                                </div>
                            </div>
                        </form>
                        <hr className={"mt-6 mb-6"}/>
                        <form onSubmit={handleNameSubmit}>
                            <div className="block text-gray-700 font-bold mb-2">Price:</div>
                            <div className="mb-4 flex justify-between gap-3">
                                <input
                                    required={true}
                                    type={"number"}
                                    min={0}
                                    name="estatePrice"
                                    id="estatePrice"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="Enter estate price"
                                    value={estate.price}
                                    onChange={(e) => setEstate({...estate, price: e.target.value })}
                                />
                                <div className="flex justify-end relative">
                                    <button
                                        type="submit"
                                        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded disabled:cursor-not-allowed"
                                        disabled={loading}
                                    >
                                        Save
                                    </button>
                                </div>
                            </div>
                        </form>
                        <hr className={"mt-6 mb-6"}/>
                        <form onSubmit={handleNameSubmit}>
                            <div className="block text-gray-700 font-bold mb-2">Rent?</div>
                            <div className="mb-4 flex justify-between gap-3">
                                <label className={styles.switch}>
                                    <input type="checkbox" defaultChecked={estate.rent} onChange={() => setEstate({...estate, rent: !estate.rent})}/>
                                    <span className={styles.slider + " " + styles.round}/>
                                </label>
                                <div className="flex justify-end relative">
                                    <button
                                        type="submit"
                                        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded disabled:cursor-not-allowed"
                                        disabled={loading}
                                    >
                                        Save
                                    </button>
                                </div>
                            </div>
                        </form>
                        <hr className={"mt-6 mb-6"}/>
                        <form onSubmit={handleNameSubmit}>
                            <div className="mt-4 block text-gray-700 font-bold mb-2">City:</div>
                            <div className="relative inline-block w-full">
                                <select
                                    required={true}
                                    name="estateCity"
                                    id="estateCity"
                                    className="block appearance-none w-full bg-white border focus:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                                    value={estate.city}
                                    onChange={(e) => {setEstate({...estate, city: e.target.value}); getDistricts(e.target.value)}}
                                >
                                    <option value="" disabled>Select estate city</option>
                                    {
                                        cities.map((city, i) => (
                                            <option value={city._id} key={i}>{city.name.lv}</option>
                                        ))
                                    }
                                </select>
                                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                    <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                                        <path
                                            d="M14.14 7.88l-4.95 4.95a1.5 1.5 0 01-2.12 0l-4.95-4.95a1.5 1.5 0 012.12-2.12L10 9.77l3.05-3.05a1.5 1.5 0 012.12 2.12z"/>
                                    </svg>
                                </div>
                            </div>

                            <div className="mt-4 block text-gray-700 font-bold mb-2">District:</div>
                            <div className="relative inline-block w-full mb-4">
                                <select
                                    required={true}
                                    name="estateDistrict"
                                    id="estateDistrict"
                                    className="block disabled:cursor-not-allowed appearance-none w-full bg-white border focus:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                                    value={estate.district}
                                    onChange={(e) => setEstate({...estate, district: e.target.value})}
                                >
                                    <option value="" disabled>Select estate district</option>
                                    {
                                        districts.map((district, i) => (
                                            <option value={district._id} key={i}>{district.name.lv}</option>
                                        ))
                                    }
                                </select>
                                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                    <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                                        <path
                                            d="M14.14 7.88l-4.95 4.95a1.5 1.5 0 01-2.12 0l-4.95-4.95a1.5 1.5 0 012.12-2.12L10 9.77l3.05-3.05a1.5 1.5 0 012.12 2.12z"/>
                                    </svg>
                                </div>
                            </div>

                            <div className="block text-gray-700 font-bold mb-2">Street:</div>
                            <input
                                required={true}
                                type="text"
                                name="estateStreet"
                                id="estateStreet"
                                className="mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Enter estate street"
                                value={estate.street}
                                onChange={(e) => setEstate({...estate, street: e.target.value })}
                            />
                            <div style={{ height: '400px', width: '100%' }} className={"mt-4 mb-6"}>
                                <GoogleMapReact
                                    bootstrapURLKeys={{ key: "" }}
                                    defaultCenter={{
                                        lat: estate.location.lat,
                                        lng: estate.location.lng
                                    }}
                                    defaultZoom={10}
                                    onClick={({ lat, lng }) => {setEstate({...estate, location: { lat, lng }})}}
                                    options={{fullscreenControl: false}}
                                >
                                    {estate.location.lat && estate.location.lng &&
                                    (<Marker lng={estate.location.lng} lat={estate.location.lat} text="My Marker"/>)
                                    }
                                </GoogleMapReact>
                            </div>
                            <div className="flex justify-end relative">
                                <button
                                    type="submit"
                                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded disabled:cursor-not-allowed"
                                    disabled={loading}
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                        <hr className={"mt-6 mb-6"}/>
                        <form onSubmit={handleNameSubmit}>
                            <div className="block text-gray-700 font-bold mt-6">Main image:</div>
                            <Upload one={true} onFileChange={(file) => setEstate({...estate, mainImage: file[0]})} filesOld={[estate.mainImage]} />

                            <div className="block text-gray-700 font-bold mt-6">Images:</div>
                            <Upload onFileChange={(files) => imagesChange(files)} filesOld={estate.images} />
                            <div className="flex justify-end relative">
                                <button
                                    type="submit"
                                    className="mt-5 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded disabled:cursor-not-allowed"
                                    disabled={loading}
                                >
                                    Save
                                </button>
                            </div>
                        </form>

                        {estate.type.lv === "Mājas" &&
                        <form onSubmit={handleNameSubmit}>
                            <div className={"flex flex-col"}>
                                <div className="block text-gray-700 font-bold mb-4 text-center">HOUSE</div>
                                <div className="block text-gray-700 font-bold mb-2">Rooms:</div>
                                <input
                                    required={true}
                                    type={"number"}
                                    min={0}
                                    name="houseRooms"
                                    id="houseRooms"
                                    className="mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="Enter house rooms"
                                    value={estate.rooms}
                                    onChange={(e) => setEstate({...estate, rooms: e.target.value })}
                                />
                                <div className="block text-gray-700 font-bold mb-2">Floors:</div>
                                <input
                                    required={true}
                                    type={"number"}
                                    min={0}
                                    name="houseFloors"
                                    id="houseFloors"
                                    className="mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="Enter house floors"
                                    value={estate.floor}
                                    onChange={(e) => setEstate({...estate, floor: e.target.value })}
                                />
                                <div className="block text-gray-700 font-bold mb-2">Living area:</div>
                                <input
                                    required={true}
                                    type={"number"}
                                    min={0}
                                    name="houseLivingArea"
                                    id="houseLivingArea"
                                    className="mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="Enter house living area"
                                    value={estate.livingArea}
                                    onChange={(e) => setEstate({...estate, livingArea: e.target.value })}
                                />
                                <div className="block text-gray-700 font-bold mb-2">Land area:</div>
                                <input
                                    required={true}
                                    type={"number"}
                                    min={0}
                                    name="houseLandArea"
                                    id="houseLandArea"
                                    className="mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="Enter house land area"
                                    value={estate.landArea}
                                    onChange={(e) => setEstate({...estate, landArea: e.target.value })}
                                />
                            </div>
                            <div className="flex justify-end relative">
                                <button
                                    type="submit"
                                    className="mt-5 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded disabled:cursor-not-allowed"
                                    disabled={loading}
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                        }
                        {estate.type.lv === "Dzīvokļi" &&
                        <form onSubmit={handleNameSubmit}>
                            <div className={"flex flex-col"}>
                                <div className="block text-gray-700 font-bold mb-4 text-center">FLAT</div>
                                <div className="block text-gray-700 font-bold mb-2">Rooms:</div>
                                <input
                                    required={true}
                                    type={"number"}
                                    min={0}
                                    name="flatRooms"
                                    id="flatRooms"
                                    className="mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="Enter flat rooms"
                                    value={estate.rooms}
                                    onChange={(e) => setEstate({...estate, rooms: e.target.value })}
                                />
                                <div className="block text-gray-700 font-bold mb-2">Floor:</div>
                                <input
                                    required={true}
                                    type={"number"}
                                    min={0}
                                    name="flatFloor"
                                    id="flatFloor"
                                    className="mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="Enter house floors"
                                    value={estate.floor}
                                    onChange={(e) => setEstate({...estate, floor: e.target.value })}
                                />
                                <div className="block text-gray-700 font-bold mb-2">Living area:</div>
                                <input
                                    required={true}
                                    type={"number"}
                                    min={0}
                                    name="flatLivingArea"
                                    id="flatLivingArea"
                                    className="mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="Enter house living area"
                                    value={estate.livingArea}
                                    onChange={(e) => setEstate({...estate, livingArea: e.target.value })}
                                />
                                <div className="block text-gray-700 font-bold mb-2">Series: </div>
                                <div className="relative inline-block w-full mb-4">
                                    <select
                                        required={true}
                                        name="estateType"
                                        id="estateType"
                                        className="block disabled:cursor-not-allowed appearance-none w-full bg-white border focus:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                                        onChange={(e) => changeSeries(e)}
                                        defaultValue={""}
                                    >
                                        <option value="" disabled>Select flat series</option>
                                        <option value="1">103</option>
                                        <option value="2">104</option>
                                        <option value="3">119</option>
                                        <option value="4">467</option>
                                        <option value="5">602</option>
                                        <option value="6">Pre-war house</option>
                                        <option value="7">Lithuanian project</option>
                                        <option value="8">Small apartment</option>
                                        <option value="9">Reconstructed</option>
                                        <option value="10">Special project</option>
                                        <option value="11">Stalin project</option>
                                        <option value="12">Khrushchyovka</option>
                                        <option value="13">Private house</option>
                                        <option value="14">Czech project</option>
                                        <option value="15">New</option>
                                    </select>
                                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                                            <path
                                                d="M14.14 7.88l-4.95 4.95a1.5 1.5 0 01-2.12 0l-4.95-4.95a1.5 1.5 0 012.12-2.12L10 9.77l3.05-3.05a1.5 1.5 0 012.12 2.12z"/>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-end relative">
                                <button
                                    type="submit"
                                    className="mt-5 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded disabled:cursor-not-allowed"
                                    disabled={loading}
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                        }
                        {(estate.type.lv === "Rūpnīca" || estate.type.lv === "Zeme" || estate.type.lv === "Komerciālais īpašums") &&
                        <form onSubmit={handleNameSubmit}>
                            <div className={"flex flex-col"}>
                                <div className="block text-gray-700 font-bold mb-4 text-center" style={{ textTransform: "uppercase" }}>{ estate.type.en }</div>
                                <div className="block text-gray-700 font-bold mb-2">Land Area:</div>
                                <input
                                    required={true}
                                    type={"number"}
                                    min={0}
                                    name="landArea"
                                    id="landArea"
                                    className="mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="Enter land area"
                                    value={estate.landArea}
                                    onChange={(e) => setEstate({...estate, landArea: e.target.value })}
                                />
                                <div className="block text-gray-700 font-bold mb-2">Cadastral number:</div>
                                <input
                                    required={true}
                                    type={"number"}
                                    min={0}
                                    name="landCadastralNumber"
                                    id="landCadastralNumber"
                                    className="mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="Enter land cadastral number"
                                    value={estate.cadastralNumber}
                                    onChange={(e) => setEstate({...estate, cadastralNumber: e.target.value })}
                                />
                            </div>
                            <div className="flex justify-end relative">
                                <button
                                    type="submit"
                                    className="mt-5 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded disabled:cursor-not-allowed"
                                    disabled={loading}
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                        }

                    </div>
                    <div className="flex justify-end relative">
                        <button
                            type="button"
                            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded ml-4 disabled:cursor-not-allowed"
                            onClick={() => onCloseClick()}
                            disabled={loading}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

interface IEstate extends Estate {
    _id: string,
    city: {
        name: {
            lv: string,
            ru: string,
            en: string,
        },
        _id: string,
    }
}

interface ICity {
    _id: string,
    name: {
        lv: string,
        ru: string,
        en: string
    },
}

interface IDistrict {
    _id: string,
    name: {
        lv: string,
        ru: string,
        en: string
    }
}

const Marker = () => (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "20px", height: "20px", color: "pink", position: "absolute", top: "-10px", left: "-10px" }}>
        <svg width="20" height="20" fill={"red"}>
            <circle cx="10" cy="10" r="10" />
        </svg>
    </div>
);
