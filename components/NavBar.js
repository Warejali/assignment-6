import { Menu } from '@headlessui/react';
import Cookies from 'js-cookie';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
// import React, { useContext, useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import logo from "../public/logo.jpg";
// import { Store } from '../utils/Store';
import DropdownLink from './DropdownLink';

const NavBar = () => {
    const router = useRouter()
    const { status, data: session } = useSession();
    // const { state, dispatch } = useContext(Store);
    // const { cart } = state;
    // const [cartItemsCount, setCartItemsCount] = useState(0);
    // useEffect(() => {
    //     setCartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0));
    // }, [cart.cartItems]);

    const logoutClickHandler = () => {
        Cookies.remove('cart');
        // dispatch({ type: 'CART_RESET' });
        signOut({ callbackUrl: '/login' });
    };

    const pc_builderHandler = () => {
        if (session?.user) {
            router.push("/pc_builder")
        }
        else {
            router.push("/login")
        }
    }

    return (
        <div>
            <div className="navbar bg-base-100 shadow-md lg:px-24 h-24">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            {/* <li><a>Accessories</a></li> */}
                            <li tabIndex={0}>
                                <details>
                                    <summary>Categories</summary>
                                    <ul className=" w-64 p-2 px-10 bg-slate-100 z-50">
                                        <li><a to="/search?category=Motherboard">CPU / Processor</a></li>
                                        <li><a to="/search?category=Motherboard">Motherboard</a></li>
                                        <li><a to="/search?category=Motherboard">RAM</a></li>
                                        <li><a to="/search?category=Motherboard">Power Supply Unit</a></li>
                                        <li><a to="/search?category=Motherboard">Storage Device</a></li>
                                        <li><a to="/search?category=Motherboard">Monitor</a></li>
                                        <li><a to="/search?category=Motherboard">Others</a></li>
                                    </ul>
                                </details>
                            </li>
                            {/* <li><a>Gadget</a></li> */}
                        </ul>
                    </div>
                    <div className="hidden lg:block">
                        <Link href="/">
                            <a>
                                <Image src={logo} alt="" width={91} height={70} />
                            </a>
                        </Link>
                    </div>
                    <div className="block lg:hidden">
                        <Link href="/">
                            <a>
                                <Image src={logo} alt="" width={40} height={30} />
                            </a>
                        </Link>
                    </div>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {/* <li><a>Accessories</a></li> */}
                        <li tabIndex={0}>
                            <details>
                                <summary>Categories</summary>
                                <ul className=" w-64 p-2 px-10 bg-slate-100 z-50">
                                    <li>
                                        <Link href="/search?category=CPU/Processor">
                                            <a><li>CPU / Processor</li></a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/search?category=Motherboard">
                                            <a><li>Motherboard</li></a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/search?category=RAM">
                                            <a><li>RAM</li></a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/search?category=Power+Supply">
                                            <a><li>Power Supply Unit</li></a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/search?category=Monitor">
                                            <a><li>Monitor</li></a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/search?category=Storage+Device">
                                            <a><li>Storage Device</li></a>
                                        </Link>
                                    </li>
                                </ul>
                            </details>
                        </li>
                        {/* <li><a>Gadget</a></li> */}
                    </ul>
                </div>
                <div className="navbar-end">
                    <button className='btn btn-primary' onClick={pc_builderHandler}>

                        PC Builder

                    </button>
                    {/* <Link href="/cart">
                        <a className="p-2">
                            Cart
                            {cartItemsCount > 0 && (
                                <span className="ml-1 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white">
                                    {cartItemsCount}
                                </span>
                            )}
                        </a>
                    </Link> */}
                    <div>
                        {status === 'loading' ? (
                            'Loading'
                        ) : session?.user ? (
                            <Menu as="div" className="relative inline-block">
                                <Menu.Button className="text-blue-600">
                                    <span className="mx-6 border p-3 hover:bg-slate-200 rounded-md font-bold uppercase">{session.user.name}</span>
                                </Menu.Button>
                                <Menu.Items className="absolute right-0 w-56 origin-top-right bg-white  shadow-lg z-50">
                                    <Menu.Item>
                                        <DropdownLink className="dropdown-link" href="/profile">
                                            Profile
                                        </DropdownLink>
                                    </Menu.Item>
                                    <Menu.Item>
                                        <DropdownLink
                                            className="dropdown-link"
                                            href="/order-history"
                                        >
                                            Order History
                                        </DropdownLink>
                                    </Menu.Item>
                                    {session.user.isAdmin && (
                                        <Menu.Item>
                                            <DropdownLink
                                                className="dropdown-link"
                                                href="/admin/dashboard"
                                            >
                                                Admin Dashboard
                                            </DropdownLink>
                                        </Menu.Item>
                                    )}
                                    <Menu.Item>
                                        <a
                                            className="dropdown-link"
                                            href="#"
                                            onClick={logoutClickHandler}
                                        >
                                            Logout
                                        </a>
                                    </Menu.Item>
                                </Menu.Items>
                            </Menu>
                        ) : (
                            <Link href="/login">
                                <a className="p-2">Login</a>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NavBar;