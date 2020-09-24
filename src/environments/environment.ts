const baseURL = 'http://localhost:1337';

export const environment = {
  production: false,
  baseApiURL: baseURL,
  usersApiURL: `${baseURL}/users`,
  productsApiURL: `${baseURL}/products`,
  categoriesApiURL: `${baseURL}/categories`,
  cartsApiURL: `${baseURL}/carts`,
  addressApiURL: `${baseURL}/addresses`,
  orderApiURL: `${baseURL}/orders`,
  purcaseApiURL: `${baseURL}/purchases`,
  countryCityDataToken : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfZW1haWwiOiJzZWNyZXR0dW1AZ21haWwuY29tIiwiYXBpX3Rva2VuIjoiWU5UTGtqWm5oNUdCaHZNYWdwU21BclBBdGx6b1c4S2dqTjY3RkJVemFEaWRRV2FTS0dWMUViemR0d2NUdXlYcWRkQSJ9LCJleHAiOjE2MDA5NTU2NzJ9.goyLLxny_r1WBgL_-yN07dBRngJJ86wLUH3spM64Glg'
};
