import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Modal } from '../component/modal';
import { useAuthContext } from '../context/AuthContext';
import useCart from '../hooks/useCart';

export default function ProductDetail() {
    const {user, login} = useAuthContext();
    const { cartQuery: { data: products }, addOrUpdateItem } = useCart();
    const {
        state: {
            product: {id, price, albumName, image, artist, albumAccount, date, songList, title }
        }
    } = useLocation();

    const cartIncluded = Array.isArray(products) && products.some(
        (album) => album.albumName === albumName && album.artist === artist
    );

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedSong, setSelectedSong] = useState(null);

    const openPopup = (type, item) => {
        if(type === 'more'){
            let senditem = {
                artist : artist,
                date : date,
                image : image,
                song : albumName,
                songAccount : albumAccount,
                type : type
            }
            setSelectedSong(senditem);
        }
        else{
            item.artist = artist;
            item.date = date;
            item.image = image
            item.type = type
            setSelectedSong(item);
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleClick = (e) => {
        if(!user){
            login();
            return;
        }

        if(cartIncluded){
            alert("장바구니에 추가 되어 있습니다.");
            return;
        }

        if (window.confirm("장바구니에 추가 하시겠습니까?")) {
            const product = { id, image, albumName, price, quantity:1, artist };
            addOrUpdateItem.mutate( product );
            alert("추가 되었습니다.");
        }
    }

    return (
        <div className='p-8'>
            <div className='relative flex h-96 bg-zinc-200 p-4'>
                <img src={image} alt={albumName} />
                <div className='text-left p-6'>
                    <p className="text-4xl font-bold">{albumName}</p>
                    <p className="text-lg font-semibold">{artist}</p>
                    <p className="text-lg">{date}</p>
                    <p className={`text-sm mt-7 text-gray-700 
                        ${albumAccount.length > 300 ? 'max-h-24 overflow-hidden' : ''}`}
                    >
                        {albumAccount}
                    </p>

                    {albumAccount.length > 300 && (
                        <button onClick={() => openPopup('more')} className='mt-2'>
                            더보기...
                        </button>
                    )}
                    
                    <button onClick={handleClick} className='w-28 h-9 mt-10 bg-brand block text-white font-semibold'>구매하기</button>
                </div>
            </div>

            <div className="h-auto mt-10">
                {songList.map((songName, sindex) => (
                    <div onClick={() => openPopup('songList',songName)} key={sindex} className="flex justify-between h-14 bg-brand text-white p-4 mt-3 rounded">
                        <div className="flex items-center gap-2">
                            <p className="text-left font-semibold">{songName.song}</p>
                            {title.includes(songName.song) && <div className=" text-white bg-red-500 px-2 rounded">title</div>}
                        </div>

                        <p className="flex items-center text-right font-semibold">{artist}</p>
                    </div>
                ))}
            </div>

            {isModalOpen && <Modal song={selectedSong} onClose={handleCloseModal} />}
            
        </div>
    );
}