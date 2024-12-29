import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Container } from '@mui/material';
import Header from './components/Header';
import ProductForm from './components/ProductForm'
import ProductList from './components/ProductList';
import ProductEdit from './components/ProductEdit';
import './App.css'


function App() { 
  return (
    <>
      <BrowserRouter>
        <Header/>
        <Container sx={{mt: '1rem', display: 'flex', gap:'30px' }}>
          <Routes>
            <Route path="/" element={<ProductForm/>}/>
            <Route path="/products" element={<ProductList/>}/>
            <Route path="/products/:id" element={<ProductEdit />} />
          </Routes>
        </Container>
      </BrowserRouter>
   </>
  );
}

export default App;
