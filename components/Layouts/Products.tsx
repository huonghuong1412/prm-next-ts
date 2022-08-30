import React from "react";
import ProductListComponent from "../ProductListComponent";
import giftApi from "../../api/giftApi";
import SlideLogo from "../SlideLogo";

const Products = () => {
    const [products, setProducts] = React.useState([]);
    const fetchProducts = async () => {
        await giftApi.getAllProduct().then((res) => {
            if (res.status === 200) {
                setProducts(res.data);
            }
        });
    };
    React.useEffect(() => {
        fetchProducts();
    }, []);
    return (
        <>
            <div className="mb-8 sm:mt-8 md:mt-20">
                <ProductListComponent products={products} title='Dòng sản phẩm dành cho phụ nữ' />
            </div>
            <div className="mb-8 sm:mt-8 md:mt-20">
                <ProductListComponent products={products} title='Dòng sản phẩm dành cho nam giới' isReverse />
            </div>
            <div className="mb-8 sm:mt-8 md:mt-20">
                <ProductListComponent products={products} title='Dòng sản phẩm dành cho trẻ em' />
            </div>
            <div className="mb-8 sm:mt-8 md:mt-20">
                <SlideLogo />
            </div>
        </>
    );
};

export default Products;
