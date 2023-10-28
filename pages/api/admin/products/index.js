import { getSession } from 'next-auth/react';
import Product from '../../../../models/Product';
import db from '../../../../utils/db';

const handler = async (req, res) => {
  const session = await getSession({ req });
  if (!session || !session.user.isAdmin) {
    return res.status(401).send('admin signin required');
  }
  // const { user } = session;
  if (req.method === 'GET') {
    return getHandler(req, res);
  } else if (req.method === 'POST') {
    return postHandler(req, res);
  } else {
    return res.status(400).send({ message: 'Method not allowed' });
  }
};
const postHandler = async (req, res) => {
  await db.connect();
  const newProduct = new Product({
    name: 'Intel 14th Gen Raptor Lake Refresh Core i5 14600K',
    slug: 'Intel-14th-Gen-' + Math.random(),
    image: '/images/shirt1.jpg',
    price: 200,
    category: 'CPU/Processor',
    brand: 'Intel',
    countInStock: 3,
    description: 'Processor Type. - Core i5 Generation - 14th Base Frequency - Not Applicable Turbo Frequency Max. - 5.30GHzCore - 14 CPU Cache - 24MB',
    rating: 5,
    numReviews: 5,
  });

  const product = await newProduct.save();
  await db.disconnect();
  res.send({ message: 'Product created successfully', product });
};
const getHandler = async (req, res) => {
  await db.connect();
  const products = await Product.find({});
  await db.disconnect();
  res.send(products);
};
export default handler;
