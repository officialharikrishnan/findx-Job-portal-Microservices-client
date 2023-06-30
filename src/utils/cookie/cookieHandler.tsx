import Cookies from "universal-cookie";
const cookies = new Cookies();

export const cookieHandler = () => {
  const setCookie = (key: string, value: string) => {
    cookies.set(key, value, { path: "/" });
  };

  const getCookie = (key: string) => {
    return cookies.get(key);
  };

  const removeCookie = (key: string) => {
    return cookies.remove(key);
  };
  return {
    setCookie,
    getCookie,
    removeCookie
  }
};
