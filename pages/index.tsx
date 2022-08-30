import React, { useState, useEffect } from "react";
import { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { Modal } from "react-responsive-modal";
import { XIcon } from "@heroicons/react/outline";
import useTimeout from "../hooks/useTimeOut";
import Products from "../components/Layouts/Products";
import Layout from "../components/Layouts/Layout";
import Header from "../components/Layouts/Header";
import Loading2 from "../components/Loading/Loading2";
import giftApi from "../api/giftApi";

const closeIcon = (
  <span className="p-1 outline-none rounded-[50%] shadow-xl bg-white absolute -top-6 text-rose-600 hover:text-rose-400 -right-6 z-10">
    <XIcon className="h-6 w-6" />
  </span>
);

interface Gift {
  id: number,
  name: string,
  image: string
}

const Home: NextPage = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [gifts, setGifts] = React.useState([]);
  const [loading, setLoading] = useState(true);
  useTimeout(() => setLoading(false), loading ? 1000 : null);

  useEffect(() => {
    const fetch = async () => {
      await giftApi.getAll().then((res) => {
        setGifts(res.data.sort((a: any, b: any) => b.id - a.id));
      })
    }
    fetch();
  }, []);

  useEffect(() => {
    // Prefetch the home page
    router.prefetch('/lichsutichdiem')
  }, [router])

  useEffect(() => {
    router.beforePopState(({ url, as, options }) => {
      if (as !== '/' && as !== '/other') {
        window.location.href = as
        return false
      }

      return true
    })
  }, [router])

  const handleOpen = () => {
    setIsOpen(true);
  }
  const handleClose = () => {
    setIsOpen(false);
  }

  return (
    <>
      <Header title="Tích Điểm" />
      {
        loading ? <Loading2 /> : (
          <Layout>
            <div className="bg-[#F2F2F2] from-gray-100 to-gray-50 pt-10 pb-20 px-3 md:px-6 overflow-x-hidden">
              <div className="max-w-7xl w-full m-auto mt-20">
                <div className="mb-0 pb-6 rounded-2xl overflow-hidden flex flex-col items-center justify-center sm:flex-col md:flex-col lg:flex-row h-100">
                  <div className="w-full sm:w-full md:w-full lg:w-[65%] mr-0 mb-4 sm:mr-0 sm:mb-4 md:mr-0 md:mb-4 lg:mb-0 lg:mr-[22px]">
                    <div className="h-[190px] sm:h-[190px] md:h-[400px] lg:h-[400px] shadow-3xl rounded-[15px] relative overflow-hidden">
                      <Image
                        src={"/Banner-home.webp"}
                        layout="fill"
                        priority={true}
                        className="w-full object-cover overflow-hidden h-full"
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="w-full sm:w-full md:w-full lg:w-[35%] flex flex-row sm:flex-row md:flex-row lg:flex-col justify-between">
                    <div className="h-[120px] sm:h-[120px] md:h-[190px] lg:h-[190px] w-1/2 sm:w-1/2 md:w-1/2 lg:w-full mr-2 sm:mr-2 md:mr-2 lg:mr-0 rounded-[15px] mb-4 relative shadow-3xl overflow-hidden">
                      <Image
                        src={"/Banner-home.webp"}
                        className="w-full h-full overflow-hidden shadow-3xl"
                        layout="fill"
                        objectFit='cover'
                        alt=""
                      />
                    </div>
                    <div className="h-[120px] sm:h-[120px] md:h-[190px] lg:h-[190px] w-1/2 sm:w-1/2 md:w-1/2 lg:w-full ml-2 sm:ml-2 md:ml-2 lg:ml-0 rounded-[15px] shadow-3xl relative overflow-hidden">
                      <Image
                        src={"/Banner-home.webp"}
                        className="w-full h-full overflow-hidden mt-[14px]"
                        layout="fill"
                        objectFit='cover'
                        alt=""
                      />
                    </div>
                  </div>
                </div>
                <div id="thele" className="flex items-center justify-between w-full mb-5">
                  <div className="flex flex-col lg:flex-row w-full items-start lg:items-center rounded">
                    <div className="w-full mr-2  mb-3 md:mb-3 lg:mb-0 rounded-2xl flex justify-center items-center border shadow-2xl lg:w-1/4 text-base md:h-28 h-20  bg-gradient-to-r from-red-500 to-red-700">
                      <div className="text-center text-white">
                        <h1 className="text-lg md:text-2xl font-bold">
                          ÁP DỤNG TOÀN QUỐC
                        </h1>
                        khi mua sản phẩm của Doppelherz
                      </div>
                    </div>
                    <div className="w-full mr-2 mb-3 md:mb-3 lg:mb-0 rounded-2xl flex justify-center items-center border shadow-md lg:w-1/4 text-base md:h-28 h-20  bg-gradient-to-r from-red-500 to-red-700">
                      <div className="text-center text-white">
                        <h1 className=" text-lg md:text-2xl  font-bold">
                          NHẬN QUÀ HẤP DẪN
                        </h1>
                        khi tích đủ điểm
                      </div>
                    </div>
                    <div className="w-full mr-2 mb-3 md:mb-3 lg:mb-0 rounded-2xl flex justify-center items-center border shadow-md lg:w-1/4 text-base md:h-28 h-20  bg-gradient-to-r from-red-500 to-red-700">
                      <div className="text-center text-white">
                        <h1 className="text-lg md:text-2xl font-bold">
                          DỄ DÀNG THAO TÁC
                        </h1>
                        chỉ với 01 lần quét mã
                      </div>
                    </div>
                    <div className="w-full flex rounded-2xl lg:mb-0 justify-center items-center border shadow-md lg:w-1/4 text-base md:h-28 h-20 bg-gradient-to-r from-red-500 to-red-700">
                      <div className="text-center text-white">
                        <h1 className="text-lg md:text-2xl font-bold">
                          QUÀ TẶNG CHÍNH HÃNG
                        </h1>
                        từ CHLB. Đức
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white shadow-3xl max-w-7xl m-auto p-1 text-lg rounded-lg md:rounded-b-none md:rounded-t-2xl" >
                <div className="text-xl md:text-2xl lg:text-4xl my-4 sm:my-4 md:my-8 font-bold uppercase text-center text-primary-red">
                  CHƯƠNG TRÌNH TÍCH ĐIỂM ĐỔI QUÀ
                </div>
                <div className="w-full flex justify-center mb-0 sm:mb-0 md:mb-10">
                  <div className="w-full sm:w-full md:w-full lg:w-[55%] border-0 sm:border-0 md:border-0 rounded-[15px] px-3 sm:px-3 md:px-10 py-2 sm:py-2 md:py-6 border-slate-300">
                    <p className="mb-2 text-justify text-sm sm:text-sm md:text-lg lg:text-lg">
                      Cùng tham gia chương trình{" "}
                      <span className=" font-bold">
                        Tích điểm đổi quà cùng Doppelherz Việt Nam
                      </span>{" "}
                      để tận hưởng những đặc quyền cho riêng mình. Tích điểm tại bất cứ
                      nơi đâu để nhận những phần quà hấp dẫn từ thương hiệu số 1 tại
                      Đức. Hơn thế nữa, Doppelherz Việt Nam ra mắt &ldquo;Tem tích điểm&ldquo; trên
                      mỗi hộp sản phẩm giúp khách hàng tích điểm dễ dàng hơn chỉ với 01
                      lần quét mã.
                    </p>
                    <p className="mb-2 text-justify text-sm sm:text-sm md:text-lg lg:text-lg">
                      <span className="font-bold">1. Thời gian áp dụng:</span> Từ ngày
                      01/08/2022 đến khi có thông báo mới nhất
                    </p>
                    <p className="mb-2 text-justify text-sm sm:text-sm md:text-lg lg:text-lg">
                      <span className="font-bold">2. Đối tượng áp dụng:</span> Khách hàng là người tiêu dùng mua sản phẩm của Doppelherz Việt Nam tại các hiệu thuốc, nhà thuốc, chuỗi cửa hàng, sàn thương mại điện tử, website, kênh online.. là đại lý bán hàng, nhà phân phối chính thức của Doppelherz Việt Nam.
                    </p>
                    <p className="mb-2 text-justify text-sm sm:text-sm md:text-lg lg:text-lg">
                      <span className="font-bold">3. Nội dung chương trình:</span> Khách hàng quét mã QR tại “Tem tích điểm“ dán trên mỗi hộp sản phẩm Doppelherz sẽ được tích điểm vào hệ thống và quy đổi ra quà tặng tương ứng với số điểm tích được.
                    </p>
                    <div className="block m-auto text-center sm:block sm:m-auto md:block lg:hidden">
                      <div onClick={handleOpen} className='relative m-auto w-[200px] h-[200px] sm:w-[200px] sm:h-[200px] md:w-[300px] md:h-[300px]'>
                        <Image
                          src={"/gift-image.webp"}
                          // width={200}
                          // height={200}
                          layout='fill'
                          objectFit='contain'
                          className="w-full h-full cursor-pointer gift block m-auto"
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                  <div className="hidden sm:hidden md:hidden lg:block">
                    <div onClick={handleOpen}>
                      <Image
                        src={"/gift-image.webp"}
                        width={400}
                        height={400}
                        className="w-full cursor-pointer gift"
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="max-w-7xl mx-auto mb-10 shadow-3xl" >
                <div className="bg-yellow p-3 md:p-6 mt-5 md:mt-0 rounded-[15px] shadow md:rounded-t-none md:rounded-b-2xl">
                  <div className="flex mx-auto flex-col xl:flex-row">
                    <div className=" md:mr-6 mb-3 w-full rounded-xl shadow-3xl bg-white dark:bg-gray-800 p-3">
                      <div className="flex gap-4 justify-start md:justify-center items-center">
                        <div className="flex-shrink-0 py-3">
                          <Image
                            alt="profil"
                            src="/800sanpham.webp"
                            className="mx-auto object-cover rounded-full h-20 w-20"
                            width={80}
                            height={80}
                          />
                        </div>
                        <div className=" flex text-center flex-col ">
                          <span className="text-gray-600 dark:text-white text-lg w-44  font-medium">
                            Sản Phẩm
                          </span>
                          <span className="text-gray-600 font-bold dark:text-white  text-lg">
                            Chính Hãng 100%
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className=" md:mr-6 mb-3 w-full rounded-xl shadow-3xl bg-white dark:bg-gray-800 p-3">
                      <div className="flex  gap-4 justify-start md:justify-center items-center">
                        <div className="flex-shrink-0 py-3">
                          <Image
                            alt="profil"
                            src="/so1taiduc.webp"
                            className="mx-auto object-cover rounded-full h-20 w-20"
                            width={80}
                            height={80}
                          />
                        </div>
                        <div className=" flex text-center flex-col ">
                          <span className="text-gray-600 dark:text-white text-lg w-44  font-medium">
                            Thương Hiệu
                          </span>
                          <span className="text-gray-600 font-bold dark:text-white  text-lg">
                            Số 1 Tại Đức
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className=" mb-3 w-full rounded-xl shadow-3xl bg-white dark:bg-gray-800 p-3">
                      <div className="flex  gap-4 justify-start md:justify-center items-center ">
                        <div className="flex-shrink-0 py-3">
                          <Image
                            alt="profil"
                            src={"/freeship.webp"}
                            className="mx-auto object-cover rounded-full h-20 w-20"
                            width={80}
                            height={80}
                          />
                        </div>
                        <div className=" flex text-center flex-col ">
                          <span className="text-gray-600 dark:text-white text-lg w-44  font-medium">
                            Miễn Phí Giao Hàng
                          </span>
                          <span className="text-gray-600 font-bold dark:text-white  text-lg">
                            Toàn Quốc
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="max-w-7xl m-auto">
                <Products />
              </div>
            </div>
            <Modal
              open={isOpen}
              onClose={handleClose}
              closeIcon={closeIcon}
              center
              classNames={{ modal: 'customModal' }}>
              <div className='gift-modal-content p-4'>
                <h2 className="pt-6 text-center text-white text-2xl font-bold mb-10">
                  DANH SÁCH PHẦN QUÀ
                </h2>
                <div className="w-full flex flex-wrap">
                  {gifts && gifts.map((item: Gift) => {
                    return (
                      <div key={item.id} className='w-1/3 sm:w-1/3 md:w-1/6 lg:w-1/6 text-center mb-6'>
                        <div className="w-[80px] h-[80px] relative m-auto mb-4 rounded-[20px] overflow-hidden">
                          <Image src={`https://sukien.doppelherz.vn/storage/${item.image}`} objectFit='contain' layout="fill" alt="" />
                        </div>
                        <div className="text-mute text-white text-center text-sm px-2">
                          {item.name}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </Modal>
          </Layout>
        )
      }
    </>
  );
};

export default Home;
