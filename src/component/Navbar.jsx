import { Link } from 'react-router-dom';
import { BsFillPencilFill } from 'react-icons/bs';
import { IoMusicalNotes } from "react-icons/io5";
import User from './User';
import Button from './ui/Button';
import { useAuthContext } from '../context/AuthContext';
import CartStatus from './CartStatus';

export default function Navbar() {
    const {user, login, logout} = useAuthContext();

    return (
        <header className='sticky top-0 z-50 flex justify-between border-b border-gray-300 p-2 bg-white'>
            <Link to='/' className='flex items-center text-4xl text-brand'>
                <IoMusicalNotes/>
                <h1>Music Archive</h1>
            </Link>

            <nav className='flex items-center gap-4 font-semibold'>
                {user && <Link to='/carts'> 
                    <CartStatus/> 
                </Link>}

                {user && user.isAdmin && (
                    <Link to='/products/new' className='text-2xl'>
                        <BsFillPencilFill />
                    </Link>
                )}
                
                {user && <User user = {user} />}
                {!user && <Button text={'Login'} onClick={login}   />}
                {user && <Button text={'Logout'} onClick={logout}  />}
            </nav>
        </header>
    );
}

