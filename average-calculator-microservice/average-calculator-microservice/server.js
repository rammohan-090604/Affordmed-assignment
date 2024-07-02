// server.js

const express = require('express');
const axios = require('axios');
const { isPrime, fibonacci, getRandomNumbers, filterEvenNumbers } = require('./helpers');

const app = express();
const port = 9876;
const windowSize = 10;

let storedNumbers = [];
let prevStoredNumbers = [];

// Middleware to limit responses to 500ms
app.use((req, res, next) => {
  let timeout = setTimeout(() => {
    timeout = null;
    next();
  }, 500);

  res.on('finish', () => {
    if (timeout) clearTimeout(timeout);
  });

  next();
});

// Endpoint to fetch numbers based on numberid
app.get('/numbers/:numberid', async (req, res) => {
  const { numberid } = req.params;

  let fetchedNumbers = [];

  try {
    // Fetch numbers based on numberid
    switch (numberid) {
      case 'p': // Prime numbers
        const primesResponse = await axios.get('https://20.244.56.144/test/primes');
        fetchedNumbers = primesResponse.data.filter(num => isPrime(num));
        break;
      case 'f': // Fibonacci numbers
        fetchedNumbers = fibonacci(10); // Generate Fibonacci sequence of 10 numbers
        break;
      case 'e': // Even numbers
        const numbersResponse = await axios.get('https://20.244.56.144/test/numbers');
        fetchedNumbers = filterEvenNumbers(numbersResponse.data); // Filter even numbers from third-party API response
        break;
      case 'r': // Random numbers
        fetchedNumbers = getRandomNumbers(10); // Generate 10 random numbers
        break;
      default:
        return res.status(400).json({ error: 'Invalid numberid' });
    }

    // Filter out duplicates and update stored numbers
    const uniqueNumbers = fetchedNumbers.filter(num => !storedNumbers.includes(num));

    // Update previous state
    prevStoredNumbers = [...storedNumbers];

    // Update current state with unique numbers and limit to windowSize
    storedNumbers = [...storedNumbers, ...uniqueNumbers].slice(-windowSize);

    // Calculate average if numbers reach window size
    let average = 0;
    if (storedNumbers.length >= windowSize) {
      average = storedNumbers.reduce((acc, num) => acc + num, 0) / windowSize;
    }

    // Prepare response
    const response = {
      windowPrevState: prevStoredNumbers,
      windowCurrState: storedNumbers,
      numbers: storedNumbers,
      avg: average.toFixed(2)
    };

    res.json(response);

  } catch (error) {
    console.error('Error fetching numbers:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
