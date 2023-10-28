import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Layout from '../../components/Layout';
import Product from '../../models/Product';
import db from '../../utils/db';

export default function ProductScreen(props) {
  const { product } = props;
  if (!product) {
    return <Layout title="Produt Not Found">Produt Not Found</Layout>;
  }



  return (
    <Layout title={product.name}>
      <div className="py-2">
        <Link href="/">back to products</Link>
      </div>
      <div className="grid md:grid-cols-10 md:gap-3">
        <div className="md:col-span-4">
          <Image
            src={product.image}
            alt={product.name}
            width={300}
            height={300}
            layout="responsive"
          ></Image>
        </div>
        <div className="md:col-span-6">
          {/* <ul>
            <li>
              <h1 className="text-lg">{product.name}</h1>
            </li>
            <li>Category: {product.category}</li>
            <li>Brand: {product.brand}</li>
            <li>
              {product.rating} of {product.numReviews} reviews
            </li>
            <li>Description: {product.description}</li>
          </ul> */}

          <div className="overflow-x-auto">
            <table className="table">

              <tbody>

                <tr>
                  <td className="bg-base-200">
                    <th>Product Name</th>
                    <td>{product.name}</td>
                  </td>
                </tr>
                <tr>
                  <td className="bg-base-200">
                    <th>Category</th>
                    <td>{product.category}</td>
                  </td>
                </tr>
                <tr>
                  <td className="bg-base-200">
                    <th>Status:</th>
                    <td>{product.countInStock > 0 ? "In Stock" : "Out of stock"}</td>
                    <th>Price:</th>
                    <td>${product.price}</td>
                  </td>
                </tr>
                <tr>
                  <td className="bg-base-200">
                    <th>Description</th>
                    <td>{product.description}</td>
                  </td>
                </tr>
                <tr>
                  <td className="bg-base-200">
                    <th>Individual Rating:</th>
                    <td>{product.rating} Out of 5 Stars</td>
                    <th>Average Rating:</th>
                    <td>{product.rating} Out of 5 Stars</td>
                  </td>
                </tr>
                <tr>
                  <td className="bg-base-200">
                    <th>Key Features</th>
                    <td>{product.description}</td>
                  </td>
                </tr>
                <tr>
                  <td className="bg-base-200">
                    <th>Reviews (0)</th>
                    <td><p>Get specific details about this product from customers who own it.

                    </p></td>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;
  const { slug } = params;

  await db.connect();
  const product = await Product.findOne({ slug }).lean();
  await db.disconnect();
  return {
    props: {
      product: product ? db.convertDocToObj(product) : null,
    },
  };
}
