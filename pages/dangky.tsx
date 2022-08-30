import React, { useState } from "react";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { getSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import useTimeout from "../hooks/useTimeOut";
import Header from "../components/Layouts/Header";
import Loading2 from "../components/Loading/Loading2";
import authApi from "../api/authApi";

function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
}

type FormValues = {
    name: string,
    phone: string,
    email: string,
    password: string,
    confirmPassword: string,
    acceptTerms: boolean
};


const Register: NextPage = () => {
    const router = useRouter();
    const [buttonDisable, setButtonDisable] = useState<boolean>(false);
    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required('Vui lòng nhập họ và tên.'),
        phone: Yup.string()
            .required('Vui lòng nhập số điện thoại.')
            .matches(/(84|0[3|5|7|8|9])+([0-9]{8})\b/, 'Số điện thoại không đúng định dạng.'),
        email: Yup.string()
            .required('Vui lòng nhập địa chỉ email.')
            .email('Địa chỉ email không đúng định dạng.'),
        password: Yup.string()
            .min(6, 'Mật khẩu tối thiểu 6 ký tự.')
            .required('Vui lòng nhập mật khẩu.'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Mật khẩu xác nhận không khớp.')
            .required('Vui lòng nhập mật khẩu xác nhận'),
        acceptTerms: Yup.bool()
            .oneOf([true], 'Vui lòng đồng ý với điều khoản và chính sách bảo mật')
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    const { register, handleSubmit, formState } = useForm<FormValues>(formOptions);
    const { errors }: any = formState;
    const [errMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(true);
    useTimeout(() => setLoading(false), loading ? 1000 : null);

    const onSubmit = (data: FormValues) => {
        setButtonDisable(true);
        authApi.registerAccount(data)
            .then((res) => {
                if (res.data.status_code === 200) {
                    setButtonDisable(false);
                    setErrorMessage('');
                    router.push('/dangnhap/')
                }
            })
            .catch(err => {
                setButtonDisable(false);
                if (err?.response?.status === 422) {
                    setErrorMessage('Số điện thoại hoặc email đã được đăng ký, vui lòng thử lại!');
                } else {
                    setErrorMessage('Có lỗi xảy ra, vui lòng thử lại!');
                }
                throw err;
            });
    };

    return (
        <>
            <Header title="Đăng Ký" />
            {
                loading ? <Loading2 /> : (
                    <div className="min-h-screen flex justify-center items-center mt-0 sm:mt-0 md:mt-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="/wave.webp" alt="" className="fixed hidden lg:block inset-0 h-full" style={{ zIndex: -1 }} />
                        <div className="w-screen h-screen mt-10 sm:mt-10 md:mt-10 lg:mt-0 flex flex-col justify-center items-center lg:grid lg:grid-cols-2">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src="/login.svg" alt="" className="hidden lg:block w-1/2 hover:scale-150 transition-all duration-500 transform mx-auto" />
                            <div className="flex flex-col justify-center items-center w-1/2">
                                <Link href={"/"}>
                                    <a className="text-blue-600 hover:underline dark:text-blue-500">
                                        <Image
                                            src={"/logo-nav.webp"}
                                            width={80}
                                            height={80}
                                            alt="Logo"
                                        />
                                    </a>
                                </Link>
                                <h2 className="my-2 font-display font-bold text-3xl text-gray-700 text-center w-screen sm:w-screen md:w-full">
                                    Đăng ký tài khoản
                                </h2>
                                <div className="flex-auto min-w-[360px] sm:min-w-[360px] md:min-w-[450px] px-2 lg:px-0 py-3 bg-transparent">
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <div className="grid lg:gap-6 md:grid-cols-2">
                                            <div className="mb-1.5 sm:mb-1.5 md:mb-2 relative">
                                                <div className="relative">
                                                    <input type="text" id="name" {...register('name')} className="block w-full px-3 py-2.5 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 peer" placeholder=" " />
                                                    <label htmlFor="name" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Họ và tên</label>
                                                </div>
                                                <div className="mt-2 text-sm text-red-600">{errors.name?.message}</div>
                                            </div>
                                            <div className="mb-1.5 sm:mb-1.5 md:mb-2 relative">
                                                <div className="relative">
                                                    <input type="text" id="phone" {...register('phone')} className="block w-full px-3 py-2.5 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 peer" placeholder=" " />
                                                    <label htmlFor="phone" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Số điện thoại</label>
                                                </div>
                                                <div className="mt-2 text-sm text-red-600">{errors.phone?.message}</div>
                                            </div>
                                        </div>
                                        <div className="mb-3 sm:mb-3 md:mb-4 relative">
                                            <div className="relative">
                                                <input type="text" id="email" {...register('email')} className="block w-full px-3 py-2.5 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 peer" placeholder=" " />
                                                <label htmlFor="email" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Email</label>
                                            </div>
                                            <div className="mt-2 text-sm text-red-600">{errors.email?.message}</div>
                                        </div>
                                        <div className="mb-3 sm:mb-3 md:mb-4 relative">
                                            <div className="relative">
                                                <input type="password" id="password" {...register('password')} className="block w-full px-3 py-2.5 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 peer" placeholder=" " />
                                                <label htmlFor="password" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Mật khẩu</label>
                                            </div>
                                            <div className="mt-2 text-sm text-red-600">{errors.password?.message}</div>
                                        </div>
                                        <div className="mb-3 sm:mb-3 md:mb-4 relative">
                                            <div className="relative">
                                                <input type="password" id="confirmPassword" {...register('confirmPassword')} className="block w-full px-3 py-2.5 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 peer" placeholder=" " />
                                                <label htmlFor="confirmPassword" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Mật khẩu xác nhận</label>
                                            </div>
                                            <div className="mt-2 text-sm text-red-600">{errors.confirmPassword?.message}</div>
                                        </div>
                                        <div className="mb-3 sm:mb-3 md:mb-4">
                                            <div className="flex items-center">
                                                <input defaultChecked type="checkbox" {...register('acceptTerms')} id="acceptTerms" className={`w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-blue-300`} />
                                                <label htmlFor="acceptTerms" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-400">Tôi đồng ý với <Link href={"/dieukhoan"}><a className="text-red-600 hover:underline">điều khoản</a></Link> & <Link href={"/baomat"}><a className="text-red-600 hover:underline"> chính sách bảo mật.</a></Link></label>
                                            </div>
                                            <div className="mt-2 text-sm text-red-600">{errors.acceptTerms?.message}</div>
                                        </div>
                                        {errMessage && <div className="mb-6 relative py-3 px-2 flex items-center bg-[#FFF9FA] border border-red-100">
                                            <div className="text-sm text-red-600">{errMessage}</div>
                                        </div>}
                                        <div className="text-center">
                                            <button type="submit" className={classNames("bg-red-600", "px-4 py-2 rounded-md text-base w-full text-white")}>
                                                {
                                                    buttonDisable ? (
                                                        <>
                                                            <svg role="status" className="inline mr-3 w-4 h-4 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                                                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                                                            </svg>
                                                            Loading...
                                                        </>
                                                    ) : 'Đăng ký'
                                                }
                                            </button>
                                        </div>
                                    </form>
                                </div>
                                <div className="min-w-[360px] sm:min-w-[360px] md:min-w-[450px] w-full px-2 lg:px-0 flex items-center mt-1 mb-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
                                    <p className="text-center font-normal text-sm text-gray-400 mx-4 mb-0">HOẶC</p>
                                </div>
                                <div className="flex items-center flex-col sm:flex-col md:flex-row min-w-[360px] sm:min-w-[360px] md:min-w-[450px] px-2 lg:px-0">
                                    <button onClick={() => signIn('google', { callbackUrl: router.query.callbackUrl?.toString() })} className="focus:outline-none w-full sm:w-full md:w-1/2 mr-0 sm:mr-0 md:mr-2 mb-2 sm:mb-2 md:mb-0 py-2 px-4 border rounded-lg border-gray-400 flex items-center justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="20px" height="20px"><path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" /><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" /><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" /><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" /></svg>
                                        <p className="text-base font-medium ml-4 text-gray-700 hidden sm:hidden md:block">Google</p>
                                        <p className="text-base font-medium ml-4 text-gray-700 block sm:block md:hidden">Tiếp tục với Google</p>
                                    </button>
                                    <button onClick={() => signIn('facebook', { callbackUrl: router.query.callbackUrl?.toString() })} className="focus:outline-none w-full sm:w-full md:w-1/2 ml-0 sm:ml-0 md:ml-2 mb-2 sm:mb-2 md:mb-0 py-2 px-4 border rounded-lg border-gray-400 flex items-center justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="20px" height="20px"><linearGradient id="Ld6sqrtcxMyckEl6xeDdMa" x1="9.993" x2="40.615" y1="9.993" y2="40.615" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#2aa4f4" /><stop offset="1" stopColor="#007ad9" /></linearGradient><path fill="url(#Ld6sqrtcxMyckEl6xeDdMa)" d="M24,4C12.954,4,4,12.954,4,24s8.954,20,20,20s20-8.954,20-20S35.046,4,24,4z" /><path fill="#fff" d="M26.707,29.301h5.176l0.813-5.258h-5.989v-2.874c0-2.184,0.714-4.121,2.757-4.121h3.283V12.46 c-0.577-0.078-1.797-0.248-4.102-0.248c-4.814,0-7.636,2.542-7.636,8.334v3.498H16.06v5.258h4.948v14.452 C21.988,43.9,22.981,44,24,44c0.921,0,1.82-0.084,2.707-0.204V29.301z" /></svg>
                                        <p className="text-base font-medium ml-4 text-gray-700 hidden sm:hidden md:block">Facebook</p>
                                        <p className="text-base font-medium ml-4 text-gray-700 block sm:block md:hidden">Tiếp tục với Facebook</p>
                                    </button>
                                </div>
                                <div className="px-6 pt-4 pb-6 w-screen sm:w-screen md:w-full">
                                    <div className="w-full text-center text-gray-600">Bạn đã có tài khoản? <Link href={"/dangnhap"}><a className="font-medium text-red-500 hover:underline">Đăng nhập</a></Link></div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    );
};

export const getServerSideProps = async (context: any) => {
    const session = await getSession(context);
    if (session) {
        return {
            redirect: {
                destination: '/'
            }
        }
    }
    return {
        props: { session }
    }
}

export default Register;