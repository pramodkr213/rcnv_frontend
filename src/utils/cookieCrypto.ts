// import Cookies from "js-cookie";
// import CryptoJS from "crypto-js";

// const SECRET_KEY = import.meta.env.VITE_SECRET_KEY;

// export function encryptToCookie(
//   key: string,
//   value: object,
//   options?: Cookies.CookieAttributes
// ) {
//   const encrypted = CryptoJS.AES.encrypt(
//     JSON.stringify(value),
//     SECRET_KEY
//   ).toString();
//   Cookies.set(key, encrypted, {
//     expires: 7,
//     secure: true,
//     sameSite: "strict",
//     ...options,
//   });
// }

// export function decryptFromCookie<T = unknown>(key: string): T | null {
//   const encrypted = Cookies.get(key);
//   if (!encrypted) return null;
//   try {
//     const bytes = CryptoJS.AES.decrypt(encrypted, SECRET_KEY);
//     const decrypted = bytes.toString(CryptoJS.enc.Utf8);
//     if (decrypted) {
//       return JSON.parse(decrypted) as T;
//     }
//     return null;
//   } catch {
//     return null;
//   }
// }

// export function removeCookie(key: string) {
//   Cookies.remove(key);
// }

import Cookies from "js-cookie";
import CryptoJS from "crypto-js";
import type { UserState } from "../AuthContext";

type CookieAttributes = Cookies.CookieAttributes;

const COOKIE_KEY = import.meta.env.VITE_COOKIE_KEY;
const SECRET_KEY = import.meta.env.VITE_SECRET_KEY;

export const setEncryptedAuthCookie = (
  userData: UserState,
  options: CookieAttributes = {}
): void => {
  const encrypted = CryptoJS.AES.encrypt(
    JSON.stringify(userData),
    SECRET_KEY
  ).toString();

  Cookies.set(COOKIE_KEY, encrypted, { expires: 7, ...options });
};

export const getDecryptedAuthCookie = () => {
  const encrypted = Cookies.get(COOKIE_KEY);
  if (!encrypted) return null;

  try {
    const bytes = CryptoJS.AES.decrypt(encrypted, SECRET_KEY);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    return JSON.parse(decrypted);
  } catch (error) {
    console.error("Failed to decrypt auth cookie", error);
    return null;
  }
};

// Remove auth cookie
export const removeAuthCookie = () => {
  Cookies.remove(COOKIE_KEY);
};
