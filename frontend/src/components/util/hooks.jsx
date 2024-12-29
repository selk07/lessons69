import axios from 'axios';
import { URL } from './constants'

 const getProducts = async () => {
  const response = await axios.get(`${URL}/products`);
  return response.data;
};

 const addProduct = async (product) => {
  const response = await axios.post(`${URL}/products`, product);
  return response.data;
};

 const deleteProduct = async (id) => {
  await axios.delete(`${URL}/products/${id}`);
};

const updateProduct = async (id, product) => {
   const response = await axios.put(`${URL}/products/${id}`, product);
   return response.data;
 };
 export {getProducts, addProduct, deleteProduct, updateProduct}
 


