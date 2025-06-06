import React from 'react';
import { AiOutlineMinusSquare } from "react-icons/ai";
import { AiOutlinePlusSquare } from "react-icons/ai";
import { RiDeleteBin6Fill } from "react-icons/ri";
import useCart from '../hooks/useCart';

const ICON_CLASS = 'transition-all cursor-pointer hover:text-brand hover:scale-105 mx-1';

export default function CartItem({product, product: {id, image, albumName, quantity, price, artist}}) {
    const { addOrUpdateItem, removeItem } = useCart();

    const handleMinus = () => {
        if (quantity <= 1) return;
        addOrUpdateItem.mutate({ ...product, quantity: quantity - 1 });
    };
    
    const handlePlus = () => {
        addOrUpdateItem.mutate({ ...product, quantity: quantity + 1 });
    };

    const handleDelete = () => {
        removeItem.mutate(id);
    }

    return <li className='flex justify-between my-2 items-center'>
        <img className='w-24 md:w-48' src={image} alt={albumName} />
        <div className='flex-1 flex justify-between ml-4'>
            <div className='basis-3/5'>
                <p className='text-xl font-bold'>{albumName}</p>
                <p className='text-sm'>{artist}</p>
                <p>￦{price}</p>
            </div>
            
            <div className='text-2xl flex items-center'>
                <AiOutlineMinusSquare className={ICON_CLASS} onClick={handleMinus}/>
                <span>{quantity}</span>
                <AiOutlinePlusSquare className={ICON_CLASS} onClick={handlePlus}/>
                <RiDeleteBin6Fill className={ICON_CLASS} onClick={handleDelete}/>
            </div>
        </div>
    </li>
}

