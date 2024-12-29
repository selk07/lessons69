import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { useFormik } from 'formik';
import { TextField, Button, Snackbar } from '@mui/material';

import { getProducts, updateProduct } from './util/hooks';
import {schema} from './util/constants'

const ProductEdit = () => {
  const [product, setProduct] = useState();
  const [snackbar, setSnackbar] = useState(false);
  const navigate = useNavigate();  
  const {id} = useParams();

  const fetchProduct = async () => {
    const data = await getProducts();
    const currentProduct = data.find((products) => products._id === id);
    setProduct(currentProduct);
  };
  useEffect(() => {fetchProduct();}, [id]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: product?.name || '',
      description: product?.description || '',
      price: product?.price || '',
    },
    validationSchema:schema,
    onSubmit: async (values) => {
      try {
        if (product?._id) {
          await updateProduct(product?._id, values);
          setSnackbar(true);
          setTimeout(() => {navigate('/products');}, 1000);
        }
      } catch (error) {
        console.error(error);
        setSnackbar(false);
      }
    },
  });

  return (
    <div>
      <h1>Змінити товар</h1>
      <form onSubmit={formik.handleSubmit}>
            <TextField
              fullWidth
              id="name"
              name="name"
              label="Name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
              margin='normal'
            />
            <TextField          
              fullWidth
              id="description"
              name="description"
              label="Description"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.description && Boolean(formik.errors.description)}
              helperText={formik.touched.description && formik.errors.description}
              margin='normal'
            />
            <TextField
              fullWidth
              type='number'
              id="price"
              name="price"
              label="Price"
              value={formik.values.price}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.price && Boolean(formik.errors.price)}
              helperText={formik.touched.price && formik.errors.price}
              margin='normal'
            />
     
            <Button sx={{marginTop:"20px"}} type="submit" variant="contained" color="success"> Зберегти товар </Button>
          
          
          </form>
      <Snackbar
        open={snackbar}
        autoHideDuration={4000}
        message="Продукт змінено!"
      />
    </div>
  );
};

export default ProductEdit;
