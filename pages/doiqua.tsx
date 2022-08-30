import React, { useState, useEffect, useMemo } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Image from "next/image";
import { useSession } from "next-auth/react";
import toast, { Toaster } from "react-hot-toast";
import Zoom from "react-medium-image-zoom";
import _ from "lodash";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { ArrowLeftIcon } from "@heroicons/react/outline";
import Layout from "../components/Layouts/Layout";
import ModalComponent from "../components/ModalComponent";
import customerApi from "../api/customerApi";
import giftApi from "../api/giftApi";
import Header from "../components/Layouts/Header";
import Loading2 from "../components/Loading/Loading2";

function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
}

interface Customer {
    id: number,
    name: string | '',
    phone: string | '',
    email: string | '',
    address: string | '',
    currentPoint: number
}

type FormValues = {
    id?: number,
    name: string | '',
    phone: string | '',
    email: string | '',
    address: string | '',
};

type ItemSelect = {
    id: number,
    name: string,
    valuePromotion: number,
    image?: string
}

type Gift = {
    customer_id: number,
    gift_id: number
}


const Doiqua: NextPage = ({ gifts }: any) => {
    const router = useRouter();
    const [open, setOpen] = useState<boolean>(false);
    const [itemSelect, setItemSelect] = useState<ItemSelect>({ id: 0, name: '', valuePromotion: 0 });
    const [checkInfo, setCheckInfo] = useState<boolean>(false);
    const [validateInfo, setValidateInfo] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [buttonDisable, setButtonDisable] = useState<boolean>(false);
    const [errMessage, setErrorMessage] = useState<string>('');
    const [customerInfo, setCustomerInfo] = useState<Customer>({
        id: 0,
        name: '',
        email: '',
        phone: '',
        address: '',
        currentPoint: 0
    })

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required('Vui lòng nhập họ và tên.'),
        address: Yup.string()
            .required('Vui lòng nhập địa chỉ.'),
        phone: Yup.string()
            .required('Vui lòng nhập số điện thoại.')
            .matches(/(84|0[3|5|7|8|9])+([0-9]{8})\b/, 'Số điện thoại không đúng định dạng.'),
        email: Yup.string()
            .required('Vui lòng nhập địa chỉ email.')
            .email('Địa chỉ email không đúng định dạng.')
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    const { register, handleSubmit, formState, getValues } = useForm<FormValues>(formOptions);
    const { errors } = formState;
    const onSubmit = (data: FormValues) => {    // change value customer
        setButtonDisable(true);
        const change = customerApi.updateCustomet(customerInfo.id, data);
        change.then((res) => {
            if (res.status == 200) {
                setCheckInfo(false);
                setValidateInfo(false);
                setButtonDisable(false);
                setErrorMessage('');
                return true;
            }
        })
            .catch((err) => {
                setButtonDisable(false);
                if (err?.response?.status === 422) {
                    setErrorMessage('Email đã được sử dụng, vui lòng thử lại!');
                } else {
                    setErrorMessage('Có lỗi xảy ra, vui lòng thử lại!');
                }
                throw err;
            });
        toast.promise(change, {
            loading: "Đang thay đổi thông tin...",
            success: <b>Đổi thông tin thành công</b>,
            error: <b>Đổi thông tin không thành công</b>,
        });
    };

    const { data, status } = useSession({
        required: true,
        onUnauthenticated() {
            router.push(`/dangnhap?callbackUrl=${router.asPath}`)
        },
    });

    useEffect(() => {
        async function getInfoCustomer() {
            try {
                const res = await customerApi.getInfoCustomer();
                const result = await res?.data;
                setCustomerInfo({
                    ...result?.user,
                    currentPoint: result?.user?.currentPoint || 0
                })
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
                setCustomerInfo(customerInfo);
                throw error;
            }
        }
        getInfoCustomer();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (!customerInfo?.address || !customerInfo?.phone) {
            setValidateInfo(true);
        } else {
            setValidateInfo(false);
        }
    }, [customerInfo?.address, customerInfo?.phone])

    //hàm mở modal chọn quà
    const handleOpen = (item: ItemSelect) => {
        setOpen(true);
        setItemSelect(item);
    };

    //hàm close modal chọn quà
    const handleClose = () => {
        setOpen(false);
        setItemSelect({ id: 0, name: '', valuePromotion: 0 });
    };

    //hàm nhận quà.
    const claimGift = async () => {
        setButtonDisable(true);
        const giftSubmit: Gift = {
            gift_id: itemSelect.id,
            customer_id: customerInfo?.id,
        };
        try {
            await giftApi
                .claimGift(giftSubmit)
                .then((res) => {
                    if (res.status === 200) {
                        setOpen(false);
                        setCheckInfo(false);
                        setButtonDisable(false);
                        Swal.fire({
                            title: "Chúc Mừng",
                            imageUrl: "/gift-image.webp",
                            imageWidth: 200,
                            html:
                                '<p>Bạn đã đổi <b class="text-red-600"> "' + itemSelect.name + '"</b> thành công!</p><p class="text-xs mt-4 ">*Nhân viên CSKH sẽ gọi điện liên hệ xác nhận sau khi bạn đổi quà.</p>',
                            confirmButtonText: "Xác nhận",
                        });
                    }
                })
                .catch((err) => { setButtonDisable(false) });
        } catch (err) { }
    };

    //  hàm render phần quà trên thanh tiến trình
    const renderGiftProcess = useMemo(() => {
        return gifts && gifts.map((item: any, index: number) => {
            // const point = _.get(gifts, [[index - 1], "valuePromotion"]) || 0;
            const point = gifts[index - 1].valuePromotion || 0;
            const checkPoint = () => {
                if (customerInfo?.currentPoint < point && customerInfo?.currentPoint < item.valuePromotion) {
                    return (
                        <div key={item.id} style={{ width: `100px` }} className="w-full bg-gray-200 rounded items-center align-middle align-center flex-1">
                            <div className="bg-rose-600 text-xs leading-none py-1 text-center text-grey-darkest rounded"
                                style={{ width: `0%` }}></div>
                        </div>
                    );
                } else if (customerInfo?.currentPoint > point || customerInfo?.currentPoint < item.valuePromotion) {
                    return (
                        <div key={item.id} style={{ width: `100px` }} className="w-full  bg-gray-200 rounded items-center align-middle align-center flex-1">
                            <div className="bg-rose-600 text-xs leading-none py-1 text-center text-grey-darkest rounded "
                                style={(customerInfo?.currentPoint * 100) / item.valuePromotion >= 100
                                    ? { width: `100%` }
                                    : { width: `${((customerInfo?.currentPoint - point) * 100) / (item.valuePromotion - point)}%`, }
                                }
                            ></div>
                        </div>
                    );
                }
            };
            return (
                <>
                    <div className="align-center items-center mr-2 align-middle content-center flex">
                        {checkPoint()}
                    </div>
                    <div className="flex-1 w-16 relative mr-2">
                        <div title={item.name} className="absolute top-12">
                            <Zoom>
                                <Image
                                    key={item.id}
                                    width={300}
                                    height={300}
                                    src={"https://sukien.doppelherz.vn/storage/" + item?.image}
                                    alt={item.name}
                                    objectFit={"contain"}
                                />
                            </Zoom>
                        </div>

                        <div title={item.name} className={classNames(item.valuePromotion <= customerInfo?.currentPoint ? "bg-rose-600 hover:bg-rose-700 text-white" : "bg-rose-400 text-white", "w-12 h-12  mx-auto rounded-full text-lg flex items-center ")}>
                            <span className="text-center w-full">{item.valuePromotion}</span>
                        </div>
                    </div>
                </>
            );
        });
    }, [customerInfo?.currentPoint, gifts]);


    // hàm render tất cả phần quà
    const renderGift = useMemo(() => {
        return gifts.map((item: any) => {
            return (
                <div key={item.id} className="bg-white dark:bg-gray-800 w-full shadow mx-auto rounded-xl p-2 transition duration-500 ease-in-out transform hover:shadow-lg">
                    <div className="relative">
                        <div className="md:block hidden w-full object-contain">
                            <Image
                                key={item.id}
                                width={200}
                                height={200}
                                src={"https://sukien.doppelherz.vn/storage/" + item?.image}
                                layout="responsive"
                                objectFit={"contain"}
                                alt={item.name}
                            />
                        </div>
                        <h3 className="text-center hidden sm:block md:block h-full md:h-10 lg:h-16">{item.name}</h3>

                        <div className="md:block hidden h-full p-2 text-center">
                            <span>
                                {" "}
                                {customerInfo?.currentPoint} /{" "}
                                <span className=" font-medium">{item.valuePromotion}</span>
                            </span>

                            <div className="w-full bg-gray-100 rounded items-center align-middle align-center flex-1">
                                <div
                                    className=" bg-rose-600 text-xs leading-none py-1 text-center text-grey-darkest rounded "
                                    style={(customerInfo?.currentPoint * 100) / item.valuePromotion >= 100
                                        ? { width: `100%` }
                                        : {
                                            width: `${(customerInfo?.currentPoint * 100) / item.valuePromotion}%`,
                                        }}
                                />
                            </div>
                            <div className="text-center">
                                {
                                    (customerInfo?.currentPoint * 100) / item.valuePromotion >= 100 && (
                                        <button onClick={() => handleOpen(item)} type="button" className="border px-3 py-1 text-sm mt-2 bg-rose-600 hover:bg-red-700 text-white rounded-md">
                                            Đổi quà
                                        </button>
                                    )
                                }
                            </div>
                        </div>
                    </div>

                    <div className="select-none md:hidden cursor-pointer bg-white rounded-md p-4">
                        <div className="flex flex-1 items-center">
                            <div className="w-2/6">
                                <Image
                                    key={item.id}
                                    width={200}
                                    height={200}
                                    src={"https://sukien.doppelherz.vn/storage/" + item?.image}
                                    layout="responsive"
                                    alt={item.name}
                                    objectFit={"contain"}
                                />
                            </div>

                            <div className="flex-1 w-3/6 mr-2 ">
                                <h1 className="text-sm font-medium mb-1">{item.name}</h1>
                                <span className="text-sm text-gray-500">
                                    {customerInfo?.currentPoint}/{item.valuePromotion}
                                </span>
                                <div className="text-gray-600 text-sm">
                                    <div className="w-full bg-gray-300 rounded items-center align-middle align-center flex-1">
                                        <div className=" bg-rose-600 text-xs leading-none py-1 text-center text-grey-darkest rounded"
                                            style={(customerInfo?.currentPoint * 100) / item.valuePromotion >= 100
                                                ? { width: "100%" }
                                                : { width: `${(customerInfo?.currentPoint * 100) / item.valuePromotion}%` }
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="text-gray-600 w-14 text-xs m-auto mt-4">
                            <div className="text-center">
                                {(customerInfo?.currentPoint * 100) / item.valuePromotion >= 100 ? (
                                    <button onClick={() => handleOpen(item)} type="button" className={classNames((customerInfo?.currentPoint * 100) / item.valuePromotion >= 100 ? "bg-rose-600 hover:bg-rose-700 text-white" : "bg-rose-300", "py-1 px-2 min-w-[100px] cursor-pointer   text-white w-full transition ease-in duration-200 text-center text-sm font-semibold shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg")}>
                                        Đổi quà
                                    </button>
                                ) : (
                                    <button
                                        type="button"
                                        className={classNames((customerInfo?.currentPoint * 100) / item.valuePromotion >= 100
                                            ? "bg-rose-600 hover:bg-rose-700 text-white"
                                            : "bg-rose-300",
                                            "py-1 px-2 min-w-[100px] cursor-pointer text-white transition ease-in duration-200 text-center text-sm font-semibold shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                                        )}>
                                        Đổi quà
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            );
        });
    }, [customerInfo?.currentPoint, gifts]);

    if (status === 'loading') {
        return <Loading2 />;
    }

    return (
        <>
            <Header title="Nhận Thưởng" />
            {
                isLoading ? <Loading2 /> : (
                    <Layout>
                        <Toaster />
                        <div className="mx-auto px-5 lg:px-14 pt-10">
                            <div className="lg:text-center mt-24">
                                <p className=" text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                                    ĐỔI QUÀ
                                </p>
                            </div>
                            <div className="w-full md:max-w-5xl m-auto mt-10">
                                <div className="flex justify-between">
                                    <div className="text-lg font-bold border-l-4 border-rose-600 px-3 py-1 mb-2">
                                        Điểm Của Bạn: <span className="text-red-600">{customerInfo?.currentPoint}</span>
                                    </div>
                                </div>
                                <div className="border  relative bg-white p-3 rounded-md">
                                    <div id="container-scroll" className="w-full overflow-x-scroll pb-20 scroll-style-x">
                                        <div className="flex pb-3 ">
                                            <div className="flex-1"></div>
                                            {renderGiftProcess}
                                            <div className="flex-1"></div>
                                        </div>
                                    </div>
                                </div>
                                <i className="text-xs block lg:hidden text-gray-500 mt-2">* Vuốt sang phải để xem thêm.</i>
                                <i className="text-xs hidden lg:block text-gray-500 mt-2">* Kéo sang phải để xem thêm.</i>
                            </div>
                            <div className="mb-10 mt-5 md:max-w-5xl w-full border bg-white rounded-md p-3 m-auto ">
                                <div className="grid grid-cols-1  max-h-screen scroll-style-y overflow-y-auto gap-y-5 gap-x-6 md:grid-cols-3 lg:grid-cols-5 xl:gap-x-8 p-2 md:p-5">
                                    {renderGift}
                                </div>
                            </div>
                        </div>
                        <ModalComponent open={open} closeModal={handleClose}>
                            <div className="p-6 relative transition duration-700 ease-in-out border-rose-600 w-full sm:w-full md:w-full lg:w-[500px]">
                                {checkInfo ? (
                                    <>
                                        <button onClick={() => setCheckInfo(false)} className="flex items-center text-gray-700 hover:text-gray-600">
                                            <ArrowLeftIcon className="h-6 w-6 mr-2" />
                                            <span>Quay lại</span>
                                        </button>
                                        <div className="text-center">
                                            <h2 className="text-lg font-semibold my-4">
                                                Kiểm tra thông tin
                                            </h2>
                                        </div>
                                        <form onSubmit={handleSubmit(onSubmit)}>
                                            <div className="mb-4 relative">
                                                <div className="relative">
                                                    <input type="text" id="name" {...register('name')} defaultValue={customerInfo?.name} className="block w-full px-3 py-2.5 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 peer" placeholder=" " />
                                                    <label htmlFor="name" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Họ và tên</label>
                                                </div>
                                                <div className="mt-2 text-sm text-red-600">{errors.name?.message}</div>
                                            </div>
                                            <div className="mb-4 relative">
                                                <div className="relative">
                                                    <input type="text" id="email" {...register('email')} defaultValue={customerInfo?.email} className="block w-full px-3 py-2.5 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 peer" placeholder=" " />
                                                    <label htmlFor="email" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Email</label>
                                                </div>
                                                <div className="mt-2 text-sm text-red-600">{errors.email?.message}</div>
                                            </div>
                                            <div className="mb-4 relative">
                                                <input type="text" id="phone" disabled {...register('phone')} defaultValue={customerInfo?.phone} className="block w-full px-3 py-2.5 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 peer" placeholder=" " />
                                                <label htmlFor="phone" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Số điện thoại</label>
                                            </div>
                                            <div className="mb-4 relative">
                                                <div className="relative">
                                                    <input type="text" id="address" {...register('address')} defaultValue={customerInfo?.address || ''} className="block w-full px-3 py-2.5 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 peer" placeholder=" " />
                                                    <label htmlFor="address" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Địa chỉ</label>
                                                </div>
                                                <div className="mt-2 text-sm text-red-600">{errors.address?.message}</div>
                                            </div>
                                            {errMessage && <div className="mb-6 relative py- px-2 flex items-center bg-[#FFF9FA] border border-red-100">
                                                <div className="text-sm text-red-600">{errMessage}</div>
                                            </div>}
                                            <div className="text-center text-[14px] mb-3 text-gray-900">
                                                <span> Quý khách muốn thay đổi số điện thoại vui lòng liên hệ đến</span><br />email: <a href="mailto:info@mastertran.com" className="text-red-500">info@mastertran.com</a>
                                            </div>
                                            <div className="text-center">
                                                <button type="submit" disabled={buttonDisable} onClick={() => onSubmit(getValues())} className={classNames("bg-red-600 hover:bg-red-700", "px-4 py-2 rounded-md text-xs text-white")}>
                                                    {
                                                        buttonDisable ? (
                                                            <>
                                                                <svg role="status" className="inline mr-3 w-4 h-4 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                                                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                                                                </svg>
                                                                Loading...
                                                            </>
                                                        ) : 'Xác Nhận Đổi Thông Tin'
                                                    }
                                                </button>
                                            </div>
                                        </form>
                                    </>
                                ) : (
                                    <>
                                        <div className="text-center">
                                            <h2 className="text-lg font-semibold">
                                                Bạn muốn đổi phần quà này?
                                            </h2>
                                            <h3 className=" text-base font-semibold text-rose-600">
                                                {itemSelect && itemSelect.name}
                                            </h3>
                                            <h3 className=" text-bold font-semibold text-lg mb-2 text-rose-600">
                                                {itemSelect && itemSelect.valuePromotion} Điểm
                                            </h3>
                                        </div>
                                        <div className="flex justify-center">
                                            <Image
                                                src={`https://sukien.doppelherz.vn/storage/${itemSelect?.image}`}
                                                width={300}
                                                height={300}
                                                objectFit="contain"
                                                alt=""
                                            />
                                        </div>
                                        <div>
                                            {validateInfo ? (
                                                <h3 className=" text-[14px] text-center text-red-700 mt-1 mb-2">
                                                    Có một số thông tin bạn chưa điền đủ hoặc chưa hợp lệ, vui lòng kiểm tra lại.
                                                </h3>
                                            ) : (
                                                <h3 className=" text-[14px] text-center text-red-700 mt-1 mb-2">
                                                    Vui lòng kiểm tra lại thông tin trước khi đổi quà.
                                                </h3>
                                            )}
                                        </div>

                                        <div className="text-center">
                                            {validateInfo ? (
                                                <>
                                                    <button onClick={() => setCheckInfo(true)} type="button" className="bg-orange-500 mt-1 hover:bg-orange-700  py-2 px-3 cursor-pointer text-white transition ease-in duration-200 text-center text-sm font-semibold shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg">
                                                        Cập Nhật Thông Tin
                                                    </button>
                                                </>
                                            ) : (
                                                <>
                                                    <div className="flex justify-end">
                                                        <button onClick={() => setCheckInfo(true)} type="button" className="bg-orange-500 mt-1 hover:bg-orange-700 mr-3  py-2 px-3 cursor-pointer   text-white transition ease-in duration-200 text-center text-sm font-semibold shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg">
                                                            Kiểm tra thông tin
                                                        </button>
                                                        <button onClick={claimGift} type="button" disabled={buttonDisable} className="py-2 px-3 rounded-md text-sm mt-1 text-white font-semibold bg-red-600 hover:bg-red-700">
                                                            {
                                                                buttonDisable ? (
                                                                    <>
                                                                        <svg role="status" className="inline mr-3 w-4 h-4 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                                                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                                                                        </svg>
                                                                        Loading...
                                                                    </>
                                                                ) : ' Đổi Quà'
                                                            }
                                                        </button>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    </>
                                )}
                            </div>
                        </ModalComponent>
                    </Layout>
                )
            }
        </>
    );
};

export async function getServerSideProps() {
    const response = await giftApi.getAll();
    const result = await response.data;
    return { props: { gifts: result?.sort((a: any, b: any) => a.valuePromotion - b.valuePromotion) } }
}

export default Doiqua;
