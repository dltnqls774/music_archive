import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ProductCard({product,product:{id,image,title,price,albumName,artist}}) {

    const senddata = product;
    const navigate = useNavigate();
    const changePage = (item) => {
        navigate(`/products`, { state: { product: item } });
    };

    return (
        <li onClick={() => changePage(senddata)}>
            <div className='ml-10'>
                <img className='w-4/5 h-4/5' src={image} alt={title}/>
                <div>
                    <h3 className="text-xl font-bold">{albumName}</h3>
                    <p>{artist}</p>
                    <p>{`￦${price}`}</p>
                </div>
            </div>
        </li>
    );
}

