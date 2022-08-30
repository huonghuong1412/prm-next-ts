import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import _ from "lodash";
import Layout from "../components/Layouts/Layout";
import Desktop from "../components/HoadonComponent/Desktop";
import Mobile from "../components/HoadonComponent/Mobile";
import Header from "../components/Layouts/Header";
import Loading2 from "../components/Loading/Loading2";
import customerApi from "../api/customerApi";

const Hoadon: NextPage = () => {
    const router = useRouter();
    const { data: session, status } = useSession({
        required: true,
        onUnauthenticated() {
            router.push(`/dangnhap?callbackUrl=${router.asPath}`)
        },
    });

    const [customerInfo, setCustomerInfo] = useState({})
    const [historyExchanges, setHistoryExchanges] = useState([])
    const [historyScans, setHistoryScans] = useState([])
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        router.prefetch('/doiqua')
    }, [router])

    useEffect(() => {
        async function getInfoCustomer() {
            try {
                const res = await customerApi.getInfoCustomer();
                const result = await res?.data;
                setCustomerInfo({
                    ...result?.user,
                    currentPoint: result?.user?.currentPoint || 0,
                    summaryPoint: result?.user?.summaryPoint || 0
                })
            } catch (error) {
                setCustomerInfo({})
                throw error;
            }
        }
        getInfoCustomer();
    }, [])


    useEffect(() => {
        const historyScans = customerApi.getHistoryScans();
        const historyExchanges = customerApi.getHistoryExchanges();
        Promise.all([historyScans, historyExchanges])
            .then((res) => {
                setIsLoading(false);
                setHistoryScans(res[0]?.data?.history.sort((a: any, b: any) => b.created_at.localeCompare(a.created_at)));
                setHistoryExchanges(res[1]?.data?.order.sort((a: any, b: any) => b.created_at.localeCompare(a.created_at)));
            })
            .catch(err => {
                setIsLoading(false);
                throw err;
            })
    }, [])

    if (status === 'loading') {
        return <Loading2 />;
    }

    return (
        <>
            <Header title="Lịch sử tích điểm" />
            {
                isLoading ? <Loading2 /> : (
                    <Layout>
                        <div className="hidden md:block">
                            <Desktop customerInfo={session.user?.login_type === 'credentials' ? customerInfo : { name: session?.user?.name, email: session?.user?.email }} isLoading={isLoading} historyExchanges={historyExchanges} historyScans={historyScans} />
                        </div>
                        <div className="block md:hidden">
                            <Mobile customerInfo={session.user?.login_type === 'credentials' ? customerInfo : { name: session?.user?.name, email: session?.user?.email }} isLoading={isLoading} historyExchanges={historyExchanges} historyScans={historyScans} />
                        </div>
                    </Layout >
                )
            }
        </>
    );
};

export default Hoadon;
