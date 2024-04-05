const setCookie = (data) => {
  // Set the cookie with the following properties:
  // - name: token
  // - value: data
  // - maxAge: 1 day (60 seconds * 60 minutes * 24 hours)
  // - path: / (so the cookie is accessible from all pages on the site)
  document.cookie = `token=${data};max-age=${60 * 60 * 24};path=/; SameSite=Lax`;
};
const getCookie = () => {
  // Get the cookie from the browser
  const cookie = document.cookie;
  // If the cookie exists, return an object with the cookie name as the key
  // and the cookie value as the value
  if (cookie) {
    // Split the cookie string into an array with the "=" separator
    const cookieArray = cookie.split("=");
    // Return an object with the cookie name as the key and the cookie value as the value
    return {
      [cookieArray[0]]: cookieArray[1],
    };
  }
  // If the cookie doesn't exist, return false
  else {
    return false;
  }
};
// Export the setCookie and getCookie functions for use in other modules
export { setCookie, getCookie };
