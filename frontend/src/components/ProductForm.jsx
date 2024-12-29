import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useFormik } from 'formik';
import { TextField, Button, Snackbar} from '@mui/material';

import { addProduct } from './util/hooks';
import {schema} from './util/constants'


const ProductForm = () => {
  const [snackbar, setSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      price: '',
    },
    validationSchema:schema,
    onSubmit: async (values) => {
      try {
        const isCreate= window.confirm('Add this product?')
        if (isCreate){
        await addProduct(values);
          setSnackbarMessage('Product added successfully!');
          setSnackbar(true);
          setTimeout(() => {navigate('/products');}, 2000);}
      }
        
      catch (error) {
        console.error(error);
        setSnackbarMessage('Product added error');
        setSnackbar(true);
      }
    },
  });

  return (
    <div>
        <h2>Додати товар</h2>
 
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
            <Button sx={{marginTop:"20px"}} type="submit" variant="contained" color="success"> Додати товар </Button>
          </form>
          <Snackbar
            open={snackbar}
            autoHideDuration={3000}
            message={snackbarMessage} 
           
          />
          
    </div>
  );
};

export default ProductForm;
