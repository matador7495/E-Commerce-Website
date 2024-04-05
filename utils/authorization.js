import { getCookie } from "./cookie.js";
const authHandler = () => {
  // Get the cookie from the browser
  const cookie = getCookie();
  // Get the current URL
  const url = location.href;
  // If the user is authenticated and they are trying to access the login or signup page,
  // redirect them to the dashboard page
  if ((cookie && url.includes("auth")) || (!cookie && url.includes("dashboard"))) {
    location.assign("/index.html");
    return false;
  }
};
export default authHandler;
