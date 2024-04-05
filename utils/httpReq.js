const fetchData = async () => {
  // Fetch data from products.json file
  const res = await fetch("products.json");
  // Parse JSON from the response
  const json = await res.json();
  // Return the parsed JSON data
  return json;
};
/*
 * This is the base URL that we use for all HTTP requests to the
 * fake online shopping API.
 */
const BASE_URL = "https://fakestoreapi.com";
const postData = async (path, data) => {
  // Construct the URL for the API endpoint
  const url = `${BASE_URL}/${path}`;
  // Make a POST request to the API
  const response = await fetch(url, {
    method: "POST",
    // Set the request body to the stringified JSON data
    body: JSON.stringify(data),
    // Set the Content-Type header to application/json
    headers: { "Content-Type": "application/json" },
  });
  // Parse the JSON response from the API
  const json = await response.json();
  // Return the parsed JSON response
  return json;
  // If the request fails, show an alert with the error message
};
const getData = async (path) => {
  // Construct the URL for the API endpoint
  const url = `${BASE_URL}/${path}`;
  // Make a GET request to the API
  const response = await fetch(url);
  // Parse the JSON response from the API
  const json = await response.json();
  // Return the parsed JSON response
  return json;
  // If the request fails, show an alert with the error message
};
export { fetchData, postData, getData };
