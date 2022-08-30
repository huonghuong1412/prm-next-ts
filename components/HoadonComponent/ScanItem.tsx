import React from 'react';
import Image from 'next/image';
import { formatCurrency } from '../../utils/formatCurrency';
import { formatDate } from '../../utils/formatDate';

const ScanItem = ({ item }: any) => {
    return (
        <tr key={item.id}>
            <td className='name'>
                <div className="product-item">
                    {/* <Image src={`https://sukien.doppelherz.vn/storage/${item?.image}`} width={60} height={60} objectFit='contain' layout='fill' alt={item?.product_name} /> */}
                    {/* <Image src={`https://sukien.doppelherz.vn/storage/w99IJljGwRjecP4jOyac0IJsJSiOPFsiwp8WZpct.png`} width={60} height={60} objectFit='contain' alt={item?.product_name} /> */}
                    <div className="product-info">
                        <span className="product-name">
                            {item?.product_name}
                        </span>
                    </div>
                </div>
            </td>
            <td className="price">{item.qr_specialCode}</td>
            <td className="quantity">{formatCurrency(item.price)}</td>
            <td className="discount-amount">{formatDate(item.created_at)}</td>
        </tr>
    )
}

export default ScanItem