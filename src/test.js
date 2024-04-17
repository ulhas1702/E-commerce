function getCategories(products) {
  const categories = [];
  for (let i = 0; i < products.length; i++) {
    const newitem = products[i].category;
    if (!categories.includes(newitem)) {
      categories.push(newitem);
    }
  }
  return categories;
}

export default getCategories;
