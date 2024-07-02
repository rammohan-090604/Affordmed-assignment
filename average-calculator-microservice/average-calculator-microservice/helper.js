// helpers.js

// Function to check if a number is prime
const isPrime = (num) => {
    if (num <= 1) return false;
    if (num <= 3) return true;
    if (num % 2 === 0 || num % 3 === 0) return false;
    let i = 5;
    while (i * i <= num) {
      if (num % i === 0 || num % (i + 2) === 0) return false;
      i += 6;
    }
    return true;
  };
  
  // Function to generate Fibonacci sequence up to a given count
  const fibonacci = (count) => {
    let fib = [0, 1];
    for (let i = 2; i < count; i++) {
      fib[i] = fib[i - 1] + fib[i - 2];
    }
    return fib;
  };
  
  // Function to generate random numbers
  const getRandomNumbers = (count) => {
    const numbers = [];
    for (let i = 0; i < count; i++) {
      numbers.push(Math.floor(Math.random() * 100) + 1); // Generate random number between 1 and 100
    }
    return numbers;
  };
  
  // Function to filter even numbers
  const filterEvenNumbers = (numbers) => {
    return numbers.filter(num => num % 2 === 0);
  };
  
  module.exports = { isPrime, fibonacci, getRandomNumbers, filterEvenNumbers };
  