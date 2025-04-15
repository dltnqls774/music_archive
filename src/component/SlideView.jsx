import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getProducts } from '../api/firebase';

export default function SlideView() {
    const navigate = useNavigate();

    const { isLoading, error, data: products } = useQuery({
        queryKey: ['products'],
        queryFn: getProducts,
    });

    const [trainCompartment, setTrainCompartment] = useState([]);

    const [currentIndex, setCurrentIndex] = useState(0);

    const changePage = (item) => {
        navigate(`/products`, { state: { product: item } });
    };

    useEffect(() => {
        if (products && products.length > 0) {
            setTrainCompartment(products.slice(0, 3));
        }
    }, [products]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % trainCompartment.length);
        }, 2000);

        return () => clearInterval(interval);
    }, [trainCompartment.length]);

    return (
        <div className="train sticky top-16 z-40 flex justify-center mx-4 bg-white">
            {isLoading && <p>Loading...</p>}
            {error && <p>{error.message}</p>}

            <div className="relative w-full h-96 text-center flex-shrink-0 overflow-hidden mb-4">
                <div
                    className="flex transition-transform duration-400 ease-in-out"
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                    {trainCompartment.map((item, index) => (
                        <div
                            onClick={() => changePage(item)}
                            key={index}
                            className="w-full  h-96 flex-shrink-0 bg-zinc-200"
                        >
                            <div className="flex m-16 h-4/6">
                                <img src={item.image} alt="" />
                                <div className="text-left px-6">
                                    <p className="text-4xl font-bold">{item.albumName}</p>
                                    <p className="text-lg font-semibold">{item.artist}</p>
                                    <p className={`text-sm mt-7 text-gray-700 
                                        ${item.albumAccount?.length > 500 ? 'max-h-24 overflow-hidden' : ''}`}
                                    >
                                        {item.albumAccount}
                                    </p>
                                    {item.albumAccount?.length > 500 && (
                                        <button className='mt-2'>
                                            더보기...
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}