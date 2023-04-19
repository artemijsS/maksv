import React, { useEffect, useState } from "react";
import Loader from "@/components/admin/Loader"
import Cities from "@/components/admin/cities/Cities"
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-toastify";


export default function Index() {

    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        if (router.locale !== "lv") {
            router.push("/admin", "/admin", {locale: "lv"})
            return;
        }

        const token = localStorage.getItem('token');

        if (!token) {
            router.push('/admin/login', '/admin/login', { locale: 'lv' });
        } else {
            axios.post("auth/adminCheck", { token }).then(_res => {
                setLoading(false);
            }).catch(_err => {
                toast.error("Please renew session!")
                localStorage.removeItem('token');
                router.push('/admin/login', '/admin/login', { locale: 'lv' });
            })
        }
    }, []);


    if (loading) {
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-900">
                <Loader />
            </div>
        );
    }

    return (
        <div className="bg-gray-100 min-h-screen">
            <div className="container mx-auto px-4 pt-12">
                <h1 className="text-3xl font-bold mb-8">Maksv Admin Panel</h1>

                <Cities />


            </div>
        </div>
    )
}

export async function getServerSideProps({ locale = '' }) {
    return {
        props: {
            // set empty locale to disable localization
            locale: '',
        },
    };
}
