import axios from "axios";

export const SERVER_HOST = process.env['NX_API_URL'];

export default axios.create({
  baseURL: `${SERVER_HOST}`,
});

export const authorize = (accessToken: string) => {
  return {
    headers: {Authorization: `Bearer ${accessToken}`}
  };
}
