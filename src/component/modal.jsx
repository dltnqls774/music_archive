import React from 'react';
import '../modal.css';
import { IoClose } from "react-icons/io5";

export function Modal({ song, onClose }) {
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className='modal-top'>
                    <img className='modalImg' src={song.image} alt='' />
                    <div className='modal-title'>
                        <p className='songName'>{song.song}</p>
                        <p className='songArtist'>{song.artist}</p>
                        <p className='songDate'>{song.date}</p>
                    </div>
                    <button onClick={onClose} className="modal-close-button"><IoClose/></button>
                </div>
                {
                    song.type === 'more' ? <p className='songAccount'>{song.songAccount}</p> : <pre className='songAccount'>{song.songAccount}</pre>
                }
                
            </div>
        </div>
    );
}