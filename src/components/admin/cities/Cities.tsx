import React, { useEffect, useState } from "react";
import styles from '../styles/admin.module.scss';
import { Pagination } from '../Pagination';
import CityAdd from './CityAdd';
import CityUpdate from './CityUpdate';
import { toast } from "react-toastify";
import axios from "axios";

export default function Cities() {

    const [cities, setCities] = useState([]);
    const [search, setSearch] = useState('');
    const [forceUpdate, setForceUpdate] = useState(0);
    const [pagination, setPagination] = useState({
        pages: 0,
        page: 0,
        size: 4
    });

    const [isOpenUp, setIsOpenUp] = useState('');
    const [isOpenAdd, setIsOpenAdd] = useState(false);


    useEffect(() => {
        axios.get(`city?size=${pagination.size}&page=${pagination.page}&search=${search}`).then(res => {
            setPagination({ ...pagination, pages: res.data.pages })
            setCities(res.data.data)
        }, _err => {
            toast.error("Error occurred with loading cities")
        })
    }, [pagination.page, search, forceUpdate])

    return (
        <section className="bg-white rounded-lg w-full container mx-auto px-8">
            <h1 className="w-full text-center text-2xl font-bold pt-8 pb-3">Cities & Districts</h1>
            <div className="relative mb-6">
                <input
                    type="text"
                    className="block w-full h-full py-2 pr-4 pl-8 text-sm leading-5 rounded-full text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:shadow-outline-blue focus:border-blue-300 focus:text-gray-900 sm:text-sm sm:leading-5 opacity-100"
                    placeholder="Search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <div className="absolute inset-y-0 left-0 flex items-center">
                    <svg
                        className="h-5 w-5 text-gray-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path
                            fillRule="evenodd"
                            d="M13.447 11.105a7 7 0 10-1.342 1.342l4.243 4.243a1 1 0 11-1.414 1.414l-4.243-4.243zM7 12a5 5 0 1110 0 5 5 0 01-10 0z"
                            clipRule="evenodd"
                        />
                    </svg>
                </div>
            </div>

            <div className={styles.table}>
                {cities.length > 0 ?
                    cities.map((city, i) =>
                        <div className={styles.row + " " + styles.half} key={i} onClick={() => setIsOpenUp(city._id)}>
                            <div className={"text-black font-bold text-1xl"}>{city.name.lv}</div>
                        </div>
                    )
                    :
                    <div className={styles.empty}>Empty</div>
                }
            </div>
            <div className={styles.bottom}>
                <button onClick={() => setIsOpenAdd(true)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Add
                </button>
                <Pagination
                    totalPages={pagination.pages}
                    itemsPerPage={pagination.size}
                    currentPage={pagination.page + 1}
                    onPageChange={(page) => setPagination({ ...pagination, page: page - 1 })}
                />
            </div>
            {isOpenAdd && <CityAdd onCloseClick={() => setIsOpenAdd(false)} onSave={() => {setForceUpdate(forceUpdate+1)}}/>}
            {isOpenUp && <CityUpdate onCloseClick={() => setIsOpenUp('')} cityId={isOpenUp} onUpdate={() => {setForceUpdate(forceUpdate+1)}}/>}

        </section>

    )
}

