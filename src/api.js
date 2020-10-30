const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://serene-castle-33359.herokuapp.com"
    : "http://localhost:8080";

export default BASE_URL;
