import React from "react";
import { Disclosure } from "@headlessui/react";
import Image from "next/image";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import Link from "next/link";
import { useRouter } from "next/router";
import { isEmpty } from "lodash";
import { signOut, useSession } from "next-auth/react";

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

const Navbar = () => {
    const router = useRouter();
    const { asPath } = router;
    const { data } = useSession();

    const navigation = [
        { name: "Trang Chủ", href: "/", current: asPath === "/" ? true : false },
        { name: "Thể Lệ", href: "/thele", current: false },
        {
            name: "ĐIỀU KHOẢN VÀ CHÍNH SÁCH",
            href: "/dieukhoanvachinhsach",
            current: false,
            submenu: [
                {
                    name: "Điều Khoản Sử Dụng",
                    href: "/dieukhoan/",
                    current: asPath === "/dieukhoan/" ? true : false,
                },
                {
                    name: "Chính Sách Bảo Mật",
                    href: "/baomat/",
                    current: asPath === "/baomat/" ? true : false,
                },
            ]
        },
        {
            name: "Lịch Sử Tích Điểm",
            href: "/lichsutichdiem",
            current: false,
        }
    ];

    const navigationMobile = [
        { name: "Trang Chủ", href: "/", current: asPath === "/" ? true : false },
        { name: "Thể Lệ", href: "/thele", current: false },
        {
            name: "Điều Khoản Sử Dụng",
            href: "/dieukhoan/",
            current: asPath === "/dieukhoan/" ? true : false,
        },
        {
            name: "Chính Sách Bảo Mật",
            href: "/baomat/",
            current: asPath === "/baomat/" ? true : false,
        },
        {
            name: "Lịch Sử Tích Điểm",
            href: "/lichsutichdiem",
            current: false,
        }
    ];

    const handleLogout = (e) => {
        e.preventDefault();
        signOut({ redirect: true, callbackUrl: '/' })
        // signOut({ redirect: false })
        // router.replace('/')
    };

    return (
        <>
            <Disclosure as="nav" className="  shadow-md fixed z-50 w-full py-2 top-0 bg-[#F8F9FA]">
                {({ open }) => (
                    <>
                        <div className="max-w-7xl mx-auto px-3 md:p-0 ">
                            <div className="relative flex items-center justify-between h-20">
                                <div className="absolute inset-y-0 left-0 flex items-center lg:hidden">
                                    {/* Mobile menu button*/}
                                    <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-primary-red hover:text-red-600 hover:bg-gray-100 focus:outline-none ">
                                        <span className="sr-only">Open main menu</span>
                                        {open ? (
                                            <XIcon className="block h-6 w-6" aria-hidden="true" />
                                        ) : (
                                            <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                                        )}
                                    </Disclosure.Button>
                                </div>
                                <div className="flex-1 flex items-center justify-center sm:items-stretch lg:justify-start">
                                    <Link href={"/"}>
                                        <a className="mt-1 relative">
                                            <Image
                                                width={"100%"}
                                                height={"85px"}
                                                src={"/logo-nav.webp"}
                                                objectFit="contain"
                                                className="py-4"
                                                alt=""
                                            />
                                        </a>
                                    </Link>
                                </div>
                                <div className="hidden lg:block sm:ml-6">
                                    <div className="flex space-x-6">
                                        {navigation.map((item) => (
                                            item.submenu ? (
                                                <React.Fragment key={item.name}>
                                                    <div className="dropdown inline-block relative">
                                                        <button className="py-2 text-lg uppercase font-medium text-primary-red  hover:text-red-600 inline-flex items-center">
                                                            <span className="mr-1">{item.name}</span>
                                                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /> </svg>
                                                        </button>
                                                        <ul className="dropdown-menu absolute hidden bg-[#F8F9FA] w-full shadow-lg rounded-lg">
                                                            {item.submenu?.map((sub) => {
                                                                return (
                                                                    <li className="py-3 border-b-2" key={sub.name}>
                                                                        <Link href={sub.href}>
                                                                            <a className={classNames(
                                                                                item.current
                                                                                    ? " text-primary-red font-medium" : "text-primary-red  hover:text-red-600",
                                                                                "py-2 ml-5 text-lg uppercase font-medium w-full block"
                                                                            )}>{sub.name}</a>
                                                                        </Link>
                                                                    </li>
                                                                )
                                                            })}
                                                        </ul>
                                                    </div>
                                                </React.Fragment>
                                            ) : (
                                                <Link key={item.name} href={item.href}>
                                                    <a className={classNames(
                                                        item.current
                                                            ? "text-primary-red font-medium" : "text-primary-red  hover:text-red-600",
                                                        "py-2 ml-5 text-lg uppercase font-medium"
                                                    )}
                                                        aria-current={item.current ? "page" : undefined}
                                                    >
                                                        {item.name}
                                                    </a>
                                                </Link>
                                            )
                                        ))}
                                        {
                                            isEmpty(data) ? <Link href='/dangky'>
                                                <a className={classNames("text-primary-red  hover:text-red-600", " py-2 text-lg uppercase font-medium")} aria-current={undefined}>
                                                    Đăng ký
                                                </a>
                                            </Link> : <div className="flex ml-0 overflow-hidden" onClick={handleLogout}>
                                                {/* <Link href='/#'> */}
                                                <button className={classNames("text-primary-red  hover:text-red-600", " py-2 text-lg uppercase font-medium")} aria-current={undefined}>
                                                    Đăng xuất
                                                </button>
                                                {/* </Link> */}
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Disclosure.Panel className="block border-t lg:hidden bg-white">
                            <div className="px-2 pt-2 pb-3 space-y-1">
                                {navigationMobile.map((item) => (
                                    <Disclosure.Panel
                                        key={item.name}
                                        // as="a"
                                        // href={item.href}
                                        className={classNames(
                                            item.current
                                                ? "bg-red-500 text-white"
                                                : "text-primary-red  hover:text-red-600",
                                        )}
                                        aria-current={item.current ? "page" : undefined}
                                    >
                                        <Link href={item.href}>
                                            <a className={classNames(
                                                item.current
                                                    ? "bg-red-500 text-white" : "text-primary-red  hover:text-red-600",
                                                "block px-3 py-2 rounded-md text-base font-medium"
                                            )}
                                                aria-current={item.current ? "page" : undefined}
                                            >
                                                {item.name}
                                            </a>
                                        </Link>
                                    </Disclosure.Panel>
                                ))}
                                {
                                    isEmpty(data) ? <Link href='/dangky'>
                                        <a className={classNames("text-primary-red  hover:text-red-600", "block px-3 py-2 rounded-md text-base font-medium")} aria-current={undefined}>
                                            Đăng ký
                                        </a>
                                    </Link> : <div className="flex ml-0 overflow-hidden" onClick={handleLogout}>
                                        {/* <Link href='/#'> */}
                                        <button className={classNames("text-primary-red  hover:text-red-600", "block px-3 py-2 rounded-md text-base font-medium")} aria-current={undefined}>
                                            Đăng xuất
                                        </button>
                                        {/* </Link> */}
                                    </div>
                                }
                            </div>
                        </Disclosure.Panel>
                    </>
                )}
            </Disclosure>
        </>
    );
};

export default Navbar;
