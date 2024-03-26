const fetchData = async () => {
  const res = await fetch("products.json");
  const json = await res.json();
  return json;
};

export { fetchData };
