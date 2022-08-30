import React, { memo } from "react";
import Image from "next/image";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";
import { Tab } from "@headlessui/react";
import { formatCurrency } from "../../utils/formatCurrency";
import { formatDate } from "../../utils/formatDate";

function classNames(...classes : any) {
    return classes.filter(Boolean).join(' ')
}

const Mobile = ({ customerInfo, isLoading, historyExchanges, historyScans } : any) => {
    return (
        <>
            <div className="pt-32 p-2">
                <div className="p-3 mb-3 w-full bg-white border rounded-lg">
                    <div className="space-y-6 text-center text-black">
                        <p className="text-lg font-extrabold tracking-tight uppercase font-body">
                            THÔNG TIN TÍCH ĐIỂM
                        </p>
                    </div>
                    <h3 className="mt-2 uppercase font-semibold">Thông Tin Khách Hàng</h3>
                    <table>
                        <tbody>
                            {
                                isLoading ? <Skeleton count={7}></Skeleton> : (
                                    <>
                                        <tr>
                                            <td width={200} className="font-medium ">Họ và tên:</td>
                                            <td className="font-medium text-gray-700">{customerInfo?.name}</td>
                                        </tr>
                                        <tr>
                                            <td width={200} className="font-medium ">Số điện thoại:</td>
                                            <td className="font-medium text-gray-700">{customerInfo?.phone}</td>
                                        </tr>
                                        <tr>
                                            <td width={200} className="font-medium ">Email:</td>
                                            <td className="font-medium text-gray-700">{customerInfo?.email}</td>
                                        </tr>
                                        <tr>
                                            <td width={200} className="font-medium">Địa chỉ:</td>
                                            <td className="font-medium text-gray-700">{customerInfo?.address}</td>
                                        </tr>
                                        <tr>
                                            <td width={120} className="flex justify-start">
                                                <span className="font-medium">Ngày tham gia:</span>
                                            </td>
                                            <td>
                                                <span className="font-medium text-gray-700">{formatDate(customerInfo?.created_at)}</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td width={150} className="flex justify-start">
                                                <span className="font-medium">Tổng điểm tích luỹ:</span>
                                            </td>
                                            <td>
                                                <span className="font-medium text-red-700">{customerInfo?.summaryPoint}</span> điểm
                                            </td>
                                        </tr>
                                    </>
                                )
                            }
                        </tbody>
                    </table>
                    <div className="flex justify-between mt-3">
                        <h1 className="text-2xl font-bold">Điểm hiện tại:</h1>
                        <h1 className="text-2xl text-red-600 font-bold">{customerInfo?.currentPoint} điểm</h1>
                    </div>
                </div>
                <div className="mb-2 flex justify-end">
                    <Link href="/doiqua/">
                        <a className="bg-rose-600 mt-1 hover:bg-rose-700  py-2 px-3 cursor-pointer   text-white transition ease-in duration-200 text-center text-sm font-semibold shadow-sm  focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg">
                            Đổi quà ngay
                        </a>
                    </Link>
                </div>

                <div className="p-3 mb-3 w-full bg-white border rounded-lg">
                    <Tab.Group>
                        <Tab.List className="flex space-x-1 p-1 pt-6 pb-6">
                            <Tab className={({ selected }) => classNames('pt-4 pb-4 pl-4 pr-4 text-sm font-medium leading-5 ease-in', selected ? 'text-red-700 border-solid border-b-2 border-rose-600' : 'text-black-700 hover:text-red-700')}>
                                Lịch sử tích điểm
                            </Tab>
                            <Tab className={({ selected }) => classNames('pt-4 pb-4 pl-8 pr-8 text-sm font-medium leading-5 ease-in', selected ? 'text-red-700 border-solid border-b-2 border-rose-600' : 'text-black-700 hover:text-red-700')}>
                                Lịch sử đổi quà
                            </Tab>
                        </Tab.List>
                        <Tab.Panels>
                            <Tab.Panel>
                                <div className="product-list">
                                    <ul className="items">
                                        {
                                            historyScans?.length > 0 ? (
                                                <>
                                                    {
                                                        historyScans?.map((item : any) => {
                                                            return (
                                                                <li className="item" key={item.id}>
                                                                    <div className="inner relative">
                                                                        <div className="relative border border-slate-300 rounded-sm">
                                                                            <Image
                                                                                src='https://sukien.doppelherz.vn/storage/w99IJljGwRjecP4jOyac0IJsJSiOPFsiwp8WZpct.png'
                                                                                alt=""
                                                                                width={100}
                                                                                height={100}
                                                                                objectFit="contain"
                                                                            />
                                                                        </div>
                                                                        <div className="item__inner">
                                                                            <span className="name">{`Tên sản phẩm: ${item?.product_name}`}</span>
                                                                            <p className="seller">{item.qr_specialCode}</p>
                                                                            <p className="total">
                                                                                <span className="prices">{formatCurrency(item.price)}</span>
                                                                            </p>
                                                                            <p className="total">
                                                                                <span className="prices">{formatDate(item.created_at)}</span>
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                            )
                                                        })
                                                    }
                                                </>
                                            ) : (
                                                <div>
                                                    <div className="relative flex items-center justify-center">
                                                        <Image
                                                            src={"/empty-order.webp"}
                                                            width={100}
                                                            height={100}
                                                            className="w-full"
                                                            alt=""
                                                        />
                                                    </div>
                                                    <div className="flex items-center justify-center py-4">
                                                        <h2>Chưa tích điểm</h2>
                                                    </div>
                                                </div>
                                            )
                                        }
                                    </ul>
                                </div>
                            </Tab.Panel>
                            <Tab.Panel>
                                <div className="pb-12 product-list">
                                    <ul className="items">
                                        {
                                            historyExchanges?.length > 0 ? (
                                                <>
                                                    {
                                                        historyExchanges?.map((item : any) => {
                                                            return (
                                                                <li className="item" key={item.id}>
                                                                    <div className="inner relative">
                                                                        <div className="relative border border-slate-300 rounded-sm">
                                                                            <Image
                                                                                src={`https://sukien.doppelherz.vn/storage/${item?.gift?.image}`}
                                                                                alt=""
                                                                                width={100}
                                                                                height={100}
                                                                                objectFit="contain"
                                                                            />
                                                                        </div>
                                                                        <div className="item__inner">
                                                                            <span className="name">{item.gift.name}</span>
                                                                            <p className="seller">{item.address}</p>
                                                                            <p className="total">
                                                                                <span className="prices">{item.status}</span>
                                                                            </p>
                                                                            <p className="total">
                                                                                <span className="prices">{formatDate(item.created_at)}</span>
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                            )
                                                        })
                                                    }
                                                </>
                                            ) : (
                                                <div>
                                                    <div className="relative flex items-center justify-center">
                                                        <Image
                                                            src={"/empty-order.webp"}
                                                            width={100}
                                                            height={100}
                                                            className="w-full"
                                                            alt=""
                                                        />
                                                    </div>
                                                    <div className="flex items-center justify-center py-4">
                                                        <h2>Chưa đổi quà</h2>
                                                    </div>
                                                </div>
                                            )
                                        }
                                    </ul>
                                </div>
                            </Tab.Panel>
                        </Tab.Panels>
                    </Tab.Group>
                </div>
            </div>
        </>
    );
};

export default memo(Mobile);
