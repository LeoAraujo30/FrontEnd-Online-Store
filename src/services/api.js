const baseUrl = 'https://api.mercadolibre.com/sites/MLB';

export async function getCategories() {
  const endPoint = `${baseUrl}/categories`;
  const response = await fetch(endPoint);
  const result = await response.json();
  return result;
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  const endPoint = `${baseUrl}/search?category=${categoryId}&q=${query}`;
  const response = await fetch(endPoint);
  const result = await response.json();
  return result;
}
