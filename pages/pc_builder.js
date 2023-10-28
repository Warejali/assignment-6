import { XCircleIcon } from '@heroicons/react/outline';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import { toast } from 'react-toastify';
import Layout from '../components/Layout';
import Monitor from '../public/Monitor.png';
import Motherboard from '../public/Motherboard.png';
import cpu from '../public/cpu.png';
import ram from '../public/ram.png';
import ssd from '../public/ssd.png';
import { Store } from '../utils/Store';

const PcBuilder = () => {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;
  const removeItemHandler = (item) => {
    dispatch({ type: 'CART_REMOVE_ITEM', payload: item });
  };
  const updateCartHandler = async (item, qty) => {
    const quantity = Number(qty);
    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.countInStock < quantity) {
      return toast.error('Sorry. Product is out of stock');
    }
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...item, quantity } });
    toast.success('Product updated in the cart');
  };

  return (
    <Layout>
      <div className=' lg:px-20 mx-auto shadow-md border border-spacing-6'>
        <h2 className=' text-xl font-semibold my-5'>PC Builder - Build Your Own Computer</h2>
        <p className=' bg-slate-600 text-white px-2 rounded-md my-2' >Core Components</p>

        { cartItems.length === 0 ? "" :
          <div className="grid md:grid-cols-4 md:gap-5">
          <div className="overflow-x-auto md:col-span-3">
            <table className="min-w-full ">
              <thead className="border-b">
                <tr>
                  <th className="p-5 text-left">Item</th>
                  {/* <th className="p-5 text-right">Quantity</th> */}
                  <th className="p-5 text-right">Category</th>
                  <th className="p-5 text-right">Price</th>
                  <th className="p-5 text-right">Quantity</th>
                  <th className="p-5">Action</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.slug} className="border-b">
                    <td>
                      <Link href={`/product/${item.slug}`}>
                        <a className="flex items-center">
                          <img
                            src={item.image}
                            alt={item.name}
                            width={50}
                            height={50}
                          ></img>
                          &nbsp;
                          {item.name}
                        </a>
                      </Link>
                    </td>
                    <td className= "text-right ">
                    <span className=' btn btn-xs'>{item.category}</span>
                    </td>
                    <td className="p-5 text-right">${item.price}</td>
                    <td className="p-5 text-right">
                      <select
                        value={item.quantity}
                        onChange={(e) =>
                          updateCartHandler(item, e.target.value)
                        }
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="p-5 text-center">
                      <button onClick={() => removeItemHandler(item)}>
                        <XCircleIcon className="h-5 w-5"></XCircleIcon>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="card p-5">
            <div>
              {cartItems.length === 0 ? "" :
                <ul>
                  <li>
                    <div className="pb-3 font-semibold">
                      Total Price ({cartItems.reduce((a, c) => a + c.quantity, 0)}) : $
                      {cartItems.reduce((a, c) => a + c.quantity * c.price, 0)}
                    </div>
                  </li>
                  <li>
                  </li>
                </ul>
              }
            </div>

            <div>
              {
                cartItems.length > 4 ? (
                  <button
                    className="primary-button w-full"
                    onClick={() => router.push('login?redirect=/shipping')}
                  >
                    Complete Build 
                  </button>
                ) : (
                  <button className=" text-gray-400 font-semibold uppercase pointer-events-none disabled:opacity-50 disabled:pointer-events-none bg-gray-300 p-2 rounded-md">
                    Complete Build 
                  </button>
                )
              }
            </div>

          </div>
        </div>
        }

        <div className="grid grid-cols-1">
          <div className=" flex items-center justify-between">
            <div className='flex justify-between items-center gap-20 font-bold'>
              <div>
                <Image
                  src={cpu}
                  alt={cpu}
                  className="rounded shadow "
                  width={50} height={50}
                />
              </div>
              <div>
                <h2>CPU</h2>
                <small className=' bg-slate-500 text-white p-1'>Required</small>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center p-5">
              <Link href='/search?category=CPU/Processor'>
                <a
                  className=" font-bold border border-spacing-6 rounded-2xl p-4"

                >
                  Choose
                </a></Link>
            </div>
          </div>
        </div>
        <div className="divider"></div>
        <div className="grid grid-cols-1">
          <div className=" flex items-center justify-between">
            <div className='flex justify-between items-center gap-20 font-bold'>
              <div>
                <Image
                  src={Motherboard}
                  alt={Motherboard}
                  className="rounded shadow "
                  width={50} height={50}
                />
              </div>
              <div>
                <h2>Motherboard</h2>
                <small className=' bg-slate-500 text-white p-1'>Required</small>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center p-5">
              <Link href='/search?category=Motherboard'>
                <a
                  className=" font-bold border border-spacing-6 rounded-2xl p-4"

                >
                  Choose
                </a></Link>
            </div>
          </div>
        </div>
        <div className="divider"></div>
        <div className="grid grid-cols-1">
          <div className=" flex items-center justify-between">
            <div className='flex justify-between items-center gap-20 font-bold'>
              <div>
                <Image
                  src={ram}
                  alt={ram}
                  className="rounded shadow "
                  width={50} height={50}
                />
              </div>
              <div>
                <h2>RAM</h2>
                <small className=' bg-slate-500 text-white p-1'>Required</small>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center p-5">
              <Link href='/search?category=RAM'>
                <a
                  className=" font-bold border border-spacing-6 rounded-2xl p-4"

                >
                  Choose
                </a></Link>
            </div>
          </div>
        </div>
        <div className="divider"></div>
        <div className="grid grid-cols-1">
          <div className=" flex items-center justify-between">
            <div className='flex justify-between items-center gap-20 font-bold'>
              <div>
                <Image
                  src={ssd}
                  alt={ssd}
                  className="rounded shadow "
                  width={50} height={50}
                />
              </div>
              <div>
                <h2>Storage Device</h2>
                <small className=' bg-slate-500 text-white p-1'>Required</small>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center p-5">
              <Link href='/search?category=Storage+Device'>
                <a
                  className=" font-bold border border-spacing-6 rounded-2xl p-4"

                >
                  Choose
                </a></Link>
            </div>
          </div>
        </div>
        <div className="divider"></div>
        <div className="grid grid-cols-1">
          <div className=" flex items-center justify-between">
            <div className='flex justify-between items-center gap-20 font-bold'>
              <div>
                <Image
                  src={Monitor}
                  alt={Monitor}
                  className="rounded shadow "
                  width={50} height={50}
                />
              </div>
              <div>
                <h2>Monitor</h2>
                <small className=' bg-slate-500 text-white p-1'>Required</small>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center p-5">
              <Link href='/search?category=Monitor'>
                <a
                  className=" font-bold border border-spacing-6 rounded-2xl p-4"

                >
                  Choose
                </a></Link>
            </div>
          </div>
        </div>
        <div className="divider"></div>
        <div className="grid grid-cols-1">
          <div className=" flex items-center justify-between">
            <div className='flex justify-between items-center gap-20 font-bold'>
              <div>
                <Image
                  src={cpu}
                  alt={cpu}
                  className="rounded shadow "
                  width={50} height={50}
                />
              </div>
              <div>
                <h2>Power Supply Unit</h2>
                <small className=' bg-slate-500 text-white p-1'>Required</small>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center p-5">
              <Link href='/search?category=Power+Supply'>
                <a
                  className=" font-bold border border-spacing-6 rounded-2xl p-4"

                >
                  Choose
                </a></Link>
            </div>
          </div>
        </div>
        <div className="divider"></div>
      </div>
    </Layout>
  );
};

PcBuilder.auth = true;

export default PcBuilder;