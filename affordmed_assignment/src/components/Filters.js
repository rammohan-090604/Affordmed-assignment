import React, { useState } from 'react';
import { TextField, MenuItem, Button } from '@mui/material';
import axios from 'axios';

const Filters = () => {
  const API_URL = 'http://20.244.56.144/test/companies';

  const [company, setCompany] = useState('');
  const [category, setCategory] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [accessToken, setAccessToken] = useState('');

  const handleApplyFilters = async () => {
    try {
      const response = await axios.get(`${API_URL}/${company}/categories/${category}/products`, {
        params: { top: 10, minPrice, maxPrice },
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      console.log('Filtered products:', response.data);
      // Handle the fetched data (response.data) as needed
    } catch (error) {
      console.error('Error fetching filtered products:', error);
    }
  };

  const handleAuthRequest = async () => {
    try {
      const authUrl = 'http://20.244.56.144/test/auth'; // Replace with your authentication URL
      const requestBody = {
        companyName: "Seshadri rao Gudlavalleru Engineering College",
        clientID: "9c073cba-965d-4196-a97d-7843d7f21560",
        clientSecret: "blbqeoeaBneWyqbP",
        ownerName: "Nune Ram Mohan",
        ownerEmail: "nunerammohan@gmail.com",
        rollNo: "21481A05F5"
      };

      const response = await axios.post(authUrl, requestBody);
      console.log('Authentication response:', response.data);

      // Assuming the response.data includes the access token
      const token = response.data.access_token;
      setAccessToken(token);

      // Now you can use the accessToken for subsequent API calls

    } catch (error) {
      console.error('Error in authentication request:', error);
    }
  };

  return (
    <div className="filters">
      <TextField
        select
        label="Company"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        fullWidth
      >
        <MenuItem value="AMZ">Amazon (AMZ)</MenuItem>
        <MenuItem value="FLP">Flipkart (FLP)</MenuItem>
        <MenuItem value="SNP">Snapdeal (SNP)</MenuItem>
        <MenuItem value="PYN">Paytm (PYN)</MenuItem>
        <MenuItem value="AZO">Alibaba (AZO)</MenuItem>
      </TextField>
      <TextField
        select
        label="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        fullWidth
      >
        <MenuItem value="Phone">Phone</MenuItem>
        <MenuItem value="Computer">Computer</MenuItem>
        <MenuItem value="TV">TV</MenuItem>
        <MenuItem value="Earphone">Earphone</MenuItem>
        <MenuItem value="Pendrive">Pendrive</MenuItem>
        <MenuItem value="Remote">Remote</MenuItem>
        <MenuItem value="Speaker">Speaker</MenuItem>
        <MenuItem value="Headset">Headset</MenuItem>
        <MenuItem value="Laptop">Laptop</MenuItem>
        <MenuItem value="Tablet">Tablet</MenuItem>
        <MenuItem value="Charger">Charger</MenuItem>
        <MenuItem value="Mouse">Mouse</MenuItem>
        <MenuItem value="Keypad">Keypad</MenuItem>
        <MenuItem value="Bluetooth">Bluetooth</MenuItem>
        <MenuItem value="PCI">PCI</MenuItem>
      </TextField>
      <TextField
        label="Min Price"
        type="number"
        value={minPrice}
        onChange={(e) => setMinPrice(e.target.value)}
        fullWidth
      />
      <TextField
        label="Max Price"
        type="number"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
        fullWidth
      />
      <Button variant="contained" color="primary" onClick={handleApplyFilters}>
        Apply Filters
      </Button>
      <Button variant="contained" color="secondary" onClick={handleAuthRequest}>
        Authenticate
      </Button>
    </div>
  );
};

export default Filters;
