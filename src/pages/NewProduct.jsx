import React, { useState, useRef } from 'react';
import { uploadImage } from '../api/uploader';
import useProducts from '../hooks/useProducts';
import { VscChromeClose } from "react-icons/vsc";


export default function NewProduct() {
    const [product, setProduct] = useState({});
    const [file, setFile] = useState();
    const [isUploading, setIsUploading] = useState(false);
    const [inputFields, setInputFields] = useState([{ id: 1 }]);
    const fileInputRef = useRef();
    const { addProduct } = useProducts();
    const input_css = 'p-4 outline-none border border-gray-300 my-1';

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'file') {
            setFile(files && files[0]);
            return;
        }
        setProduct((prev) => ({ ...prev, [name]: value }));
    };

    const handleChange2 = (e) => {
        let { name, value } = e.target;
        const songVal = name.includes("songName") ? value : "";
        const songAccountVal = name.includes("songAccount") ? value : "";
        const cleanedName = name.replace(/songName/g, "").replace(/songAccount/g, "").trim();

        setProduct((prev) => {
            const updatedSongList = (prev.songList || []).map((songobj) => {
                if (songobj.songName === cleanedName) {
                    return songVal ? { ...songobj, song: value } : { ...songobj, songAccount: value };
                }
                return songobj;
            });

            const isExisting = updatedSongList.some((song) => song.songName === cleanedName);

            return {
                ...prev,
                songList: isExisting
                    ? updatedSongList
                    : [...updatedSongList, { songName: cleanedName, song: songVal, songAccount: songAccountVal }]
            };
        });
    };

    const addInputBox = () => {
        setInputFields([...inputFields, { id: inputFields.length + 1 }]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsUploading(true);
        uploadImage(file)
            .then((url) => {
                addProduct.mutate(
                    { product, url },
                    {
                        onSuccess: () => {
                            window.confirm("앨범 등록이 완료되었습니다.");
                            setProduct({});
                            setFile(null);
                            setInputFields([{ id: 1 }]);

                            if (fileInputRef.current) {
                                fileInputRef.current.value = '';
                            }
                        }
                    }
                );
            })
            .finally(() => setIsUploading(false));
    };

    const handleRemoveInputBox = (id) => {
        if(inputFields.length === 1){
            alert("1개 이상 입력해야 등록이 가능합니다.");
            return;
        }

        setInputFields((prevFields) => prevFields.filter((field) => field.id !== id));
        setProduct((prevProduct) => ({
            ...prevProduct,
            songList: (prevProduct.songList || []).filter((song) => song.songName !== String(id)),
        }));
    };

    return (
        <section className='w-full text-center mb-10'>
            <h2 className='text-2xl font-bold my-4'>앨범 등록</h2>
            <form className='flex flex-col px-12' onSubmit={handleSubmit}>
                {file && (
                    <img className='w-96 mx-auto mb-2' src={URL.createObjectURL(file)} alt='local file' />
                )}
                <input
                    className={input_css}
                    type='file'
                    accept='image/*'
                    name='file'
                    required
                    onChange={handleChange}
                    ref={fileInputRef}
                />
                <input className={input_css} type='text' name='albumName' value={product.albumName ?? ''} placeholder='앨범명' required onBlur={handleChange} onChange={handleChange} />
                <input className={input_css} type='text' name='artist' value={product.artist ?? ''} placeholder='가수명' required onBlur={handleChange} onChange={handleChange} />
                <input className={input_css} type='text' name='date' value={product.date ?? ''} placeholder='발매일' required onBlur={handleChange} onChange={handleChange} />
                <input className={input_css} type='text' name='title' value={product.title ?? ''} placeholder='타이틀 곡 (여러 개는 콤마 - 로 구분)' required onBlur={handleChange} onChange={handleChange} />
                <input className={input_css} type='number' name='price' value={product.price ?? ''} placeholder='가격' required onBlur={handleChange} onChange={handleChange} />
                <textarea className={input_css} type='text' name='albumAccount' value={product.albumAccount ?? ''} placeholder='앨범소개' required onBlur={handleChange} onChange={handleChange} />

                <p className='font-semibold text-lg mb-2 mt-10'>앨범 리스트</p>
                <div className='mt-6 border-solid border-red-500'>
                    {inputFields.map((field) => {
                        const songItem = (product.songList || []).find((s) => s.songName === String(field.id)) || {};

                        return (
                            <div key={field.id} className='flex flex-col relative bg-zinc-200 rounded px-4 pt-10 pb-4 my-2'>
                                <button
                                    type="button"
                                    className="absolute top-2 right-2 text-red-500 font-bold text-sm"
                                    onClick={() => handleRemoveInputBox(field.id)}
                                >
                                    <VscChromeClose className='text-2xl'/>
                                </button>
                                <input
                                    className={input_css}
                                    type='text'
                                    name={`songName${field.id}`}
                                    placeholder='곡명'
                                    required
                                    value={songItem.song || ''}
                                    onChange={handleChange2}
                                    onBlur={handleChange2}
                                />
                                <textarea
                                    className={input_css}
                                    name={`songAccount${field.id}`}
                                    placeholder='가사'
                                    required
                                    value={songItem.songAccount || ''}
                                    onChange={handleChange2}
                                    onBlur={handleChange2}
                                />
                                </div>
                        );
                    })}
                    <button type='button' onClick={addInputBox} className='bg-slate-600 text-white p-2 mt-2 rounded'>
                        + 곡 추가
                    </button>
                </div>

                <button className='bg-slate-600 text-white p-4 mt-6 rounded' disabled={isUploading}>
                    {isUploading ? '업로드 중...' : '앨범 등록하기'}
                </button>
            </form>
        </section>
    );
}