import React, { useState } from "react";
import { NextPage } from "next";
import Layout from "../components/Layouts/Layout";
import Header from "../components/Layouts/Header";
import useTimeout from "../hooks/useTimeOut";
import Loading2 from "../components/Loading/Loading2";

const Baomat: NextPage = () => {
    const [loading, setLoading] = useState<boolean>(true);
    useTimeout(() => setLoading(false), loading ? 1000 : null);
    
    return (
        <>
            <Header title="Chính Sách Bảo Mật" />
            {
                loading ? <Loading2 /> : (
                    <Layout>
                        <div className="pt-20 lg:py-32">
                            <div className="max-w-5xl shadow-3xl bg-white p-6 m-auto border rounded-none md:rounded-xl">
                                <h1 className="text-xl md:text-3xl mt-6 sm:mt-6 md:mt-6 lg:mt-0 mb-4 font-bold uppercase">
                                    CHÍNH SÁCH BẢO MẬT
                                </h1>
                                <h2 className="text-lg font-bold mt-2 mb-3">1. Giới thiệu</h2>
                                <div className="ml-0 sm:ml-0 md:ml-5 lg:ml-5">
                                    <p className="text-justify">
                                        Trang thương mại điện tử Doppelherz Việt Nam (sau đây gọi là
                                        &ldquo;Doppelherz Việt Nam&ldquo;) chúng tôi hiểu rõ tầm quan
                                        trọng của các thông tin mà bạn đã tin tưởng giao cho chúng tôi
                                        thông qua việc đăng ký tài khoản và sử dụng Doppelherz Việt Nam,
                                        bao gồm nhưng không giới hạn các thông tin của bạn trên
                                        Doppelherz Việt Nam như: tên, tuổi, địa chỉ, email, số điện
                                        thoại, vị trí, câu hỏi, bình luận chia sẻ, tìm kiếm, hoạt động
                                        mua hàng... (sau đây gọi là &ldquo;Thông Tin Khách Hàng&ldquo;).
                                        Chúng tôi cam kết sử dụng, chia sẻ và bảo mật Thông Tin Khách
                                        Hàng theo đúng quy định pháp luật và quy định tại Chính sách bảo
                                        mật thông tin này.
                                    </p>
                                </div>
                                <h2 className="text-lg font-bold mt-2 mb-3">
                                    2. Mục đích và phạm vi sử dụng Thông Tin Khách Hàng
                                </h2>
                                <div className="ml-[9px]">
                                    <ul className="list-disc ml-3">
                                        <li className="mb-2 text-justify">
                                            Xử lý, thực hiện đơn hàng và các giao dịch của bạn trên
                                            Doppelherz Việt Nam.
                                        </li>
                                        <li className="mb-2 text-justify">
                                            Giới thiệu các hàng hóa, dịch vụ có thể phù hợp với bạn;
                                        </li>
                                        <li className="mb-2 text-justify">
                                            Quảng cáo, cập nhật những thông tin mới nhất về hàng hóa dịch
                                            vụ, về các chương trình khuyến mại và về các quy định liên
                                            quan đến Doppelherz Việt Nam.
                                        </li>
                                        <li className="mb-2 text-justify">
                                            Thực hiện các hoạt động khảo sát, lấy ý kiến khách hàng;
                                        </li>
                                        <li className="mb-2 text-justify">
                                            Thống kê, phân tích nhằm cải thiện dịch vụ và cải thiện trải
                                            nghiệm người dùng.
                                        </li>
                                        <li className="mb-2 text-justify">
                                            Giải quyết các vấn đề, tranh chấp (nếu có) liên quan đến việc
                                            sử dụng Doppelherz Việt Nam.
                                        </li>
                                        <li className="mb-2 text-justify">
                                            Các mục đích khác sau khi được cập nhật và thông báo tới bạn
                                            trước khi áp dụng.
                                        </li>
                                    </ul>
                                </div>
                                <h2 className="text-lg font-bold mt-2 mb-3">
                                    3. Cam kết bảo mật Thông Tin Khách Hàng
                                </h2>
                                <div className="ml-[9px]">
                                    <ul className="list-disc ml-3">
                                        <li className="mb-2 text-justify">
                                            Doppelherz Việt Nam cam kết chỉ thu thập, chia sẻ và sử dụng
                                            Thông Tin Khách Hàng phù hợp Chính sách bảo mật thông tin này
                                            và phù hợp quy định pháp luật.
                                        </li>
                                        <li className="mb-2 text-justify">
                                            Doppelherz Việt Nam cam kết bảo mật Thông Tin Khách Hàng,
                                            không chia sẻ, tiết lộ cho bất kỳ bên thứ ba nào khác ngoài
                                            các Công Ty Liên Kết.
                                        </li>
                                        <li className="mb-2 text-justify">
                                            Bất kỳ thay đổi nào về Chính sách bảo mật sẽ được thông báo và
                                            cập nhật trên Doppelherz Việt Nam.
                                        </li>
                                        <li className="mb-2 text-justify">
                                            Các bình luận, chia sẻ và thông tin công khai của bạn trên
                                            Doppelherz Việt Nam như tên tài khoản, các bình luận, chia
                                            sẻ... có thể được tìm thấy, dẫn chiếu và/hoặc lưu giữ tại các
                                            các bộ máy tìm kiếm của bên thứ ba như Google, Bing, Yahoo...
                                            Việc sử dụng các thông tin công khai của bạn từ các bên thứ ba
                                            này không thuộc phạm vi điều chỉnh của Chính sách bảo mật này.
                                        </li>
                                        <li className="mb-2 text-justify">
                                            Trường hợp bạn không muốn Doppelherz Việt Nam tiếp tục lưu trữ
                                            Thông Tin Khách Hàng, bạn vui lòng gửi email yêu cầu đến chúng
                                            tôi theo địa chỉ: <a href="mailto:info@mastertran.vn" className="text-red-500">info@mastertran.vn</a>. Chúng tôi cam kết xóa
                                            toàn bộ thông tin có liên quan ngay sau khi nhận được email
                                            yêu cầu xóa thông tin từ bạn.
                                        </li>
                                    </ul>
                                </div>
                                <h2 className="text-lg font-bold mt-2 mb-3">
                                    4. Thời gian và địa điểm lưu trữ Thông Tin Khách Hàng
                                </h2>
                                <div className="ml-[9px]">
                                    <ul className="list-disc ml-3">
                                        <li className="mb-2 text-justify">
                                            Thông Tin Khách Hàng có thể được lưu trữ lâu dài trên
                                            Doppelherz Việt Nam trừ khi bạn gửi email yêu cầu xóa bỏ toàn
                                            bộ Thông Tin Khách Hàng trên Doppelherz Việt Nam.
                                        </li>
                                        <li className="mb-2 text-justify">
                                            Thông Tin Khách Hàng sẽ được lưu giữ tại các máy chủ, trung
                                            tâm dữ liệu do Doppelherz Việt Nam sở hữu hoặc thuê lại từ bên
                                            thứ ba.
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </Layout>
                )
            }
        </>
    );
};

export default Baomat;
