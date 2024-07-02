import React from 'react';
import { useParams } from 'react-router-dom';
import ProductDetail from '../components/ProductDetail';
import Container from '@mui/material/Container';

const ProductPage = () => {
  const { company, category, id } = useParams();
  return (
    <Container>
      <ProductDetail company={company} category={category} id={id} />
    </Container>
  );
};

export default ProductPage;
