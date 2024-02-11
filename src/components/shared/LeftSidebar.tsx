
import { useEffect } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useSignOutAccount } from '@/lib/react-query/queriesAndMutations'
import { useUserContext } from '@/context/AuthContext';
import { sidebarLinks } from '@/constants';
import { Button } from '../ui/button';

const LeftSidebar = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const { mutate: signOut, isSuccess } = useSignOutAccount();

    const { user } = useUserContext();


    useEffect(() => {
        if (isSuccess) {
            navigate(0)
        }
    }, [isSuccess]);
    return (
        <nav className='leftsidebar'>
            <div className='flex flex-col gap-11'>
                <Link to='/' className='flex gap-3 items-center'>
                    <img
                        src='/assets/images/logo.svg'
                        alt='logo'
                        width={170}
                        height={36}
                    />
                </Link>

                <Link to={`/profile/${user.id}`} className='flex items-center gap-3'>
                    <img
                        src={user.imageUrl || '/assets/images/profile.png'}
                        alt='profile'
                        className='h-14 w-14 rounded-full'
                    />

                    <div className='flex flex-col'>
                        <p className='body-bold'>
                            {user.name}
                        </p>
                        <p className='small-regular text-light-3'>
                            @{user.username}
                        </p>
                    </div>
                </Link>

                <ul className='flex flex-col gap-6'>
                    {
                        sidebarLinks.map((link) => (
                            <li
                                key={link.label}
                                className={`leftsidebar-link group ${pathname === link.route ? 'bg-primary-500' : ''}`}
                            >
                                 <NavLink
                                    to={link.route}
                                    className='flex gap-4 items-center p-4'
                                 >
                                    <img
                                        src={link.imgURL}
                                        alt={link.label}
                                        className={`group-hover:invert-white ${pathname === link.route ? 'invert-white' : ''}`}
                                    />
                                    {link.label}
                                </NavLink>
                            </li>
                        ))
                    }
                </ul>
            </div>

            <Button
                variant='ghost'
                className='shad-button_ghost'
                onClick={() => signOut()}
            >
                <img
                    src='/assets/icons/logout.svg'
                    alt='logout'
                />
                <p className='small-medium lg:base-medium'>Logout</p>
            </Button>
        </nav>
    )
}

export default LeftSidebar