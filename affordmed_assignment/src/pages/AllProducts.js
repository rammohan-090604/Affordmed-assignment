import React, { useState, useEffect } from 'react';
import ProductList from '../components/ProductList';
import Filters from '../components/Filters';
import { fetchProducts } from '../services/api';
import Container from '@mui/material/Container';

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [company, setCompany] = useState('');
  const [category, setCategory] = useState('');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000);

  useEffect(() => {
    const getProducts = async () => {
      const data = await fetchProducts(company, category, minPrice, maxPrice);
      setProducts(data);
    };
    getProducts();
  }, [company, category, minPrice, maxPrice]);

  return (
    <Container>
      <Filters
        setCompany={setCompany}
        setCategory={setCategory}
        setMinPrice={setMinPrice}
        setMaxPrice={setMaxPrice}
      />
      <ProductList products={products} />
    </Container>
  );
};

export default AllProducts;
