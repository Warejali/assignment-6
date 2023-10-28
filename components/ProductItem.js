/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import React from 'react';

export default function ProductItem({ product }) {
  return (
    <div className="card">
      <Link href={`/product/${product.slug}`}>
        <a>
          <img
            src={product.image}
            alt={product.name}
            className="rounded shadow object-cover h-64 w-full"
          />
        </a>
      </Link>
      <div className="flex flex-col items-center justify-center p-5">
        <Link href={`/product/${product.slug}`}>
          <a>
            <h2 className="text-lg">{product.name}</h2>
          </a>
        </Link>
        <p className="mb-2"> <pan span className=' font-semibold'>Category</pan>: {product.category}</p>
        <div className='flex gap-5'>
          <p> <span className=' font-bold'>Price:</span> ${product.price}</p>
          <p>Status: <>{product.countInStock > 0 ? <span span className=' text-green-500'>In Stock</span> : <span span className=' text-red-500'>Out of stock</span>}</></p>
        </div>

      </div>
    </div>
  );
}
