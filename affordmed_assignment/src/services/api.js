import axios from 'axios';

const API_BASE_URL = 'http://20.244.56.144/test/companies';

export const fetchProducts = async (company, category, minPrice, maxPrice) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/${company}/categories/${category}/products`,
      { params: { top: 10, minPrice, maxPrice } }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

export const fetchProductById = async (company, category, id) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/${company}/categories/${category}/products/${id}`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
};
