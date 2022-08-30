import React, { memo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Tab } from "@headlessui/react";
import { formatDate } from "../../utils/formatDate";
import HoadonItem from "./HoadonItem";
import ScanItem from "./ScanItem";

function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
}

const Desktop = ({ customerInfo, isLoading, historyExchanges, historyScans }: any) => {
    return (
        <>
            <div className="py-32">
                <div className="max-w-5xl mx-auto">
                    <div className="flex justify-between items-center mx-4">
                        <h1 className="font-medium text-3xl text-slate-600 pb-8 pt-2">LỊCH SỬ TÍCH ĐIỂM</h1>
                        <div className="space-y-6 text-gray-500">
                            <Link className="mb-2" href="/doiqua/">
                                <a className="bg-rose-600 mt-1 hover:bg-rose-700  py-2 px-3 cursor-pointer text-white transition ease-in duration-200 text-center text-base font-semibold shadow-sm  focus:outline-none focus:ring-2 rounded-md">
                                    Đổi quà ngay
                                </a>
                            </Link>
                        </div>
                    </div>
                    <div className="overflow-hidden border shadow-3xl rounded-xl mx-4">
                        <div className="bg-[white]">
                            <div className="p-9">
                                <div className="flex justify-between">
                                    <div>
                                        <Image
                                            src={"/logo-nav.webp"}
                                            width={100}
                                            alt="Logo"
                                            height={"100%"}
                                        />
                                    </div>
                                    <div className="space-y-6 text-gray-500 text-right">
                                        <h3 className="text-3xl">Điểm thưởng:  <span className="text-red-500 font-semibold">{customerInfo?.currentPoint}</span></h3>
                                        <p className="text-xl text-slate-500">
                                            Ngày tham gia: <span className="font-normal text-slate-700">{formatDate(customerInfo?.created_at)}</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="px-9">
                                <h2 className="font-bold mb-2 text-2xl text-gray-700">
                                    Doppelherz Việt Nam
                                </h2>
                            </div>

                            <div className="px-9">
                                <div className=" mb-8 text-gray-700">
                                    <div>
                                        Tầng 06, tháp A, tòa Central Point số 219 Trung Kính
                                        <br />
                                        Phường Yên Hòa, Quận Cầu Giấy, Hà Nội
                                        <br />
                                        Email: info@mastertran.vn
                                        <br />
                                        SĐT: 18001770
                                    </div>

                                </div>
                                <div className="border-t border-gray-200 mb-8 " />
                            </div>

                            <div className="px-9">
                                <h2 className="text-xl font-medium">Thông tin tài khoản</h2>
                                <table className="w-full">
                                    <tbody>
                                        {
                                            isLoading ? <tr></tr> : <>
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
                                                    <td width={200} className='pt-6 font-medium'>TỔNG ĐIỂM TÍCH LŨY:
                                                    </td>
                                                    <td className='pt-5 font-medium text-red-700 text-2xl'>{customerInfo?.summaryPoint} Điểm</td>
                                                </tr>
                                            </>
                                        }
                                    </tbody>
                                </table>
                            </div>

                            <Tab.Group>
                                <Tab.List className="flex space-x-1 p-1 pt-9 pb-12 pl-8 pr-8">
                                    <Tab
                                        className={({ selected }) =>
                                            classNames(
                                                'pt-4 pb-4 pl-8 pr-8 text-lg font-medium leading-5 ease-in',
                                                selected
                                                    ? 'text-red-700 border-solid border-b-4 border-rose-600'
                                                    : 'text-black-700 hover:text-red-700'
                                            )
                                        }
                                    >
                                        Lịch sử tích điểm
                                    </Tab>
                                    <Tab
                                        className={({ selected }) =>
                                            classNames(
                                                'pt-4 pb-4 pl-8 pr-8 text-lg font-medium leading-5 ease-in',
                                                selected
                                                    ? 'text-red-700 border-solid border-b-4 border-rose-600'
                                                    : 'text-black-700 hover:text-red-700'
                                            )
                                        }
                                    >
                                        Lịch sử đổi quà
                                    </Tab>
                                </Tab.List>
                                <Tab.Panels>
                                    <Tab.Panel>
                                        <div className="pb-12 pl-8 pr-8">
                                            <div className="flex flex-col border rounded-lg mx-0 mt-2 overflow-auto p-2">
                                                {
                                                    historyScans?.length > 0 ? (
                                                        <table className="product-table">
                                                            <thead>
                                                                <tr>
                                                                    <th>Sản phẩm</th>
                                                                    <th>Mã sản phẩm</th>
                                                                    <th>Đơn giá</th>
                                                                    <th>Ngày quét mã</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {
                                                                    historyScans?.map((item: any) => {
                                                                        return (
                                                                            <ScanItem key={item.id} item={item} />
                                                                        )
                                                                    })
                                                                }
                                                            </tbody>
                                                        </table>
                                                    ) : (
                                                        <div>
                                                            <div className="relative flex items-center justify-center">
                                                                <Image
                                                                    src={"/empty-order.webp"}
                                                                    width={200}
                                                                    height={200}
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
                                            </div>
                                        </div>
                                    </Tab.Panel>
                                    <Tab.Panel>
                                        <div className="pb-12 pl-8 pr-8">
                                            <div className="flex flex-col border rounded-lg mx-0 mt-2 overflow-auto p-2">
                                                {
                                                    historyExchanges?.length > 0 ? (
                                                        <table className="product-table">
                                                            <thead>
                                                                <tr>
                                                                    <th>Tên phần quà</th>
                                                                    <th>Địa chỉ nhận quà</th>
                                                                    <th>Ngày đổi quà</th>
                                                                    <th>Trạng thái</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {
                                                                    historyExchanges?.map((item: any) => {
                                                                        return (
                                                                            <HoadonItem key={item.id} item={item} />
                                                                        )
                                                                    })
                                                                }
                                                            </tbody>
                                                        </table>
                                                    ) : (
                                                        <div>
                                                            <div className="relative flex items-center justify-center">
                                                                <Image
                                                                    src={"/empty-order.webp"}
                                                                    width={200}
                                                                    height={200}
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
                                            </div>
                                        </div>
                                    </Tab.Panel>
                                </Tab.Panels>
                            </Tab.Group>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default memo(Desktop);
