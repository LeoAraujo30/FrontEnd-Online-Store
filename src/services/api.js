const baseUrl = 'https://api.mercadolibre.com';

export async function getCategories() {
  const endPoint = `${baseUrl}/sites/MLB/categories`;
  const response = await fetch(endPoint);
  const categories = await response.json();
  return categories;
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  const endPoint = `${baseUrl}/sites/MLB/search?category=${categoryId}&q=${query}`;
  const response = await fetch(endPoint);
  const products = await response.json();
  return products;
}

export async function getProductsFromQuery(query) {
  const endPoint = `${baseUrl}/sites/MLB/search?q=${query}`;
  const response = await fetch(endPoint);
  const products = await response.json();
  return products.results;
}

export async function getProductsFromCategoty(categoryId) {
  const endPoint = `${baseUrl}/sites/MLB/search?category=${categoryId}`;
  const response = await fetch(endPoint);
  const products = await response.json();
  return products.results;
}

export async function getProductInfo(id) {
  const endPoint = `${baseUrl}/items/${id}`;
  const response = await fetch(endPoint);
  const product = await response.json();
  return product;
}
