import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Card, CardContent, Typography, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit'

import { getProducts, deleteProduct } from './util/hooks';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProducts();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  const handleDeleteClick = (postId) => {
    const isDelete= window.confirm('Видалити цей пост?')
    if (isDelete) {
    deleteProduct(postId)
    setProducts(products.filter(product => product._id !== postId));
  }
  };
  
  const handleEditClick = (postId) => {
    navigate(`/products/${postId}`);
  };

  return (
    <div>
      {products.map((product) => (
        <Card key={product._id} style={{ marginBottom: '5px' }}>
          <CardContent sx={{display:"flex",flexDirection:"column", justifyContent:"center", gap:"10px"}}>
            <Typography variant="h5">{product.name}</Typography>
            <Typography variant="body3">{product.description}</Typography>
            <Typography variant="h6">{product.price}₴</Typography>
            <div className='btn-wrap'>
            <IconButton onClick={() => handleEditClick(product._id)} color='action'>
              <EditIcon/>
            </IconButton>
            <IconButton onClick={() => handleDeleteClick(product._id)} color='error' aria-label="delete">
              <DeleteIcon />
            </IconButton>
          </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ProductList;
