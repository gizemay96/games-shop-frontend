const baseURL = 'https://gameshopv2.herokuapp.com';

export const environment = {
  production: true,
  baseApiURL: baseURL,
  usersApiURL: `${baseURL}/users`,
  productsApiURL: `${baseURL}/products`,
  categoriesApiURL: `${baseURL}/categories`,
  cartsApiURL: `${baseURL}/carts`,
  addressApiURL: `${baseURL}/addresses`,
  orderApiURL: `${baseURL}/orders`,
  purcaseApiURL: `${baseURL}/purchases`,
  countryCityDataToken:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfZW1haWwiOiJzZWNyZXR0dW1tKzEyM0BnbWFpbC5jb20iLCJhcGlfdG9rZW4iOiJBdVhuRmpFUzQzTnFiZE9EWm9jMWFuTHRwTzlvcF85SHNBN2hxVTU2SEpveGxiYk5yTXNVQXptc3A2Y3FvWjBIaFdRIn0sImV4cCI6MTYwMTIyNjY2NH0.MCBnxKi-qtochOkAQTyO03-pJOjBhxiMex3P04UwrzE',
};
