import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Header from "../../components/Layouts/Header";
import qrcodeApi from "../../api/qrcodeApi";
import Link from "next/link";
import Loading2 from '../../components/Loading/Loading2'
import { useSession } from "next-auth/react";

interface GiftInfo {
    promotion_id: number,
    product_id: number,
    special_code: string
}

interface ProductInfo {
    name: string,
    image: string,
    // .... other
}

interface InfoExchange {
    status?: boolean,
    message?: string,
    point?: number,
    product?: ProductInfo
}


const Tichdiem = () => {
    const router = useRouter();
    const params = router.query.param;
    const [infoExchange, setInfoExchange] = useState<InfoExchange>({});
    const [isLoading, setIsLoading] = useState(true);
    const { data: session, status } = useSession({
        required: true,
        onUnauthenticated() {
            router.push(`/dangnhap?callbackUrl=${router.asPath}`)
        },
    });

    useEffect(() => {
        if (params && params.length === 3) {
            const promotion_id = params[0];
            const product_id = params[1];
            const special_code = params[2];
            const gift: GiftInfo = {
                promotion_id: parseInt(promotion_id),
                product_id: parseInt(product_id),
                special_code: special_code
            }
            qrcodeApi.getInfoExchangeGift(gift)
                .then((res) => {
                    if (res?.status === 200) {
                        setIsLoading(false);
                        setInfoExchange({
                            ...infoExchange,
                            ...res.data
                        });
                    }
                })
                .catch(err => {
                    setIsLoading(false);
                    setInfoExchange({ ...infoExchange });
                    throw err;
                })
        } else {
            setInfoExchange({
                ...infoExchange,
                status: false
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params]);

    if (status === 'loading') {
        return <Loading2 />;
    }

    return (
        <>
            <Header title="Thông báo" />
            {
                isLoading ? <Loading2 /> : (
                    <div className="mx-auto min-h-screen px-5 lg:px-14 pt-10 bg-gray-100">
                        <div className="w-full md:max-w-5xl m-auto mt-10">
                            <div className="flex justify-center items-center flex-col">
                                <Link href={'/'}>
                                    <a>
                                        <Image
                                            alt=""
                                            src='https://sukien.doppelherz.vn/src/dist/img/logo/logo.png'
                                            width='150px'
                                            height='150px'
                                            objectFit="contain"
                                        />
                                    </a>
                                </Link>
                                {
                                    infoExchange?.status ? <>
                                        <div className="my-8">
                                            <h1 className="text-center text-5xl text-red-600 font-medium my-4">
                                                {infoExchange?.message}
                                            </h1>
                                            <p className="text-center text-xl text-slate-700 my-4">
                                                Sản phẩm đã quét: <span className="text-red-600">{infoExchange?.product?.name}</span>
                                            </p>
                                            <p className="text-center text-sm text-slate-500 mt-4 mb-6">
                                                Bạn đã được tích <span className="text-red-600 text-xl font-semibold">{infoExchange?.point}</span> điểm vào tài khoản, Cảm ơn bạn đã tham gia chương trình!
                                            </p>
                                            <p className="m-auto w-full text-center">
                                                <Link href={`/lichsutichdiem`}>
                                                    <a className="bg-red-500 text-white font-sm px-6 rounded-md py-3">Xem lịch sử</a>
                                                </Link>
                                            </p>
                                        </div>
                                    </> : <>
                                        <div className="my-8">
                                            <h1 className="text-center text-5xl text-red-600 font-medium my-4">
                                                Tích điểm thất bại
                                            </h1>
                                            <p className="text-center text-xl text-slate-700 my-4">
                                                Sản phẩm đã quét: <span className="text-red-600">{infoExchange?.product?.name}</span>
                                            </p>
                                            <p className="m-auto text-center text-sm text-slate-500 leading-6 my-t-4 mb-6 w-full md:w-3/5">
                                                Mã số sản phẩm của bạn đã từng được kích hoạt. Yêu cầu tích điểm không thành công. Vui lòng liên hệ <span className="text-red-600">CSKH</span> của <Link href={'https://doppelherz.vn/'}>
                                                    <a className="text-red-600">Doppelherz Việt Nam</a>
                                                </Link> qua email <Link href={'mailto:info@mastertran.vn'}>
                                                    <a className="text-red-600">info@mastertran.vn</a>
                                                </Link> để được bồi thường và hỗ trợ tốt nhất.
                                            </p>
                                            <p className="m-auto w-full text-center">
                                                <Link href={`/lichsutichdiem`}>
                                                    <a className="bg-red-500 text-white font-sm px-6 rounded-md py-3">Xem lịch sử</a>
                                                </Link>
                                            </p>
                                        </div>
                                    </>
                                }
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    );
};

export default Tichdiem;
