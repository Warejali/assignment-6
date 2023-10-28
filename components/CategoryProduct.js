/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import React from 'react';

export default function CategoryProduct({ product, addToCartHandler }) {
  return (
    <div className="flex justify-between items-center shadow-md p-5">
      <div>
        <Link href={`/product/${product.slug}`}>
          <a>
            <img
              src={product.image}
              alt={product.name}
              className="rounded shadow w-40 h-40"
            />
          </a>
        </Link>
      </div>
      <div className="flex flex-col items-center justify-center p-5">
        <Link href={`/product/${product.slug}`}>
          <a>
            <h2 className="text-lg">{product.name}</h2>
          </a>
        </Link>
        <p className="mb-2"> <pan span className=' font-semibold'>Category</pan>: {product.category}</p>
        <p className="mb-2"> <pan span className=' font-semibold'>Price:</pan>: ${product.price}</p>
        

      </div>
      <div className="flex flex-col items-center justify-center p-5">
      <p className=' font-semibold'>Status: <>{product.countInStock > 0 ? <span span className=' text-green-500'>In Stock</span> : <span span className=' text-red-500'>Out of stock</span>}</></p>
      <p className="mb-2"> <pan span className=' font-semibold'>Ratings:</pan>: {product.rating}</p>


      </div>
      <div>
        <button
          className="primary-button font-semibold"
          type="button"
          onClick={() => addToCartHandler(product)}
        >
          Add To Builder
        </button>
      </div>
    </div>
  );
}
