const baseUrl = 'https://api.mercadolibre.com/sites/MLB';

export async function getCategories() {
  const endPoint = `${baseUrl}/categories`;
  const response = await fetch(endPoint);
  const categories = await response.json();
  return categories;
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  const endPoint = `${baseUrl}/search?category=${categoryId}&q=${query}`;
  const response = await fetch(endPoint);
  const products = await response.json();
  return products;
}

export async function getProductsFromQuery(query) {
  const endPoint = `${baseUrl}/search?q=${query}`;
  const response = await fetch(endPoint);
  const products = await response.json();
  return products.results;
}
