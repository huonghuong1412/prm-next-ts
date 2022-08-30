import React from 'react';
import Image from 'next/image';
import { formatDate } from '../../utils/formatDate';

const HoadonItem = ({ item }: any) => {
    return (
        <tr key={item.id}>
            <td className='name'>
                <div className="product-item">
                    <Image src={`https://sukien.doppelherz.vn/storage/${item?.gift?.image}`} width={60} height={60} objectFit='contain' alt={item.gift.name} />
                    <div className="product-info">
                        <span className="product-name">
                            {item.gift.name}
                        </span>
                    </div>
                </div>
            </td>
            <td className="price">{item.address}</td>
            <td className="quantity">{formatDate(item.created_at)}</td>
            <td className="discount-amount">{item.status}</td>
        </tr>
    )
}

export default HoadonItem