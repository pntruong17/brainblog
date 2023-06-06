import Cookies from "universal-cookie";

// const cookies = new Cookies();
// const secret = process.env.NEXT_PUBLIC_COOKIE_SECRET_KEY;

// const setCookies = (_cookieName, _data) => {
//   const token = jwt.sign({ data: _data }, secret, { expiresIn: "24h" });
//   cookies.set(_cookieName, token, {
//     httpOnly: true,
//     secure: process.env.NODE_ENV !== "development",
//     sameSite: "strict",
//     maxAge: 60 * 60 * 24,
//     path: "/",
//   });
// };

// const getCookies = (_cookieName) => {
//   const token = cookies.get(_cookieName);
//   try {
//     const decoded = verify(token, secret);
//     return decoded.data;
//   } catch (err) {
//     console.log(err);
//     return null;
//   }
// };

// const updateCookies = (_cookieName, _data) => {
//   const myData = getCookies(_cookieName);
//   const newData = myData ? [...myData, _data] : [_data];
//   setCookies(_cookieName, newData);
// };

// const updateSingleNumberCookies = (_cookieName, _data) => {
//   const token = sign({ data: _data }, secret, { expiresIn: "1h" });
//   cookies.set(_cookieName, token, {
//     path: "/",
//     maxAge: 3600, // Thời gian sống của cookie tính bằng giây
//     httpOnly: true,
//     secure: process.env.NODE_ENV === "production",
//     sameSite: "strict",
//   });
// };

// const checkCookies = (_cookieName) => {
//   const myData = getCookies(_cookieName);
//   if (myData) {
//     return true;
//   } else {
//     return false;
//   }
// };

const cookies = new Cookies();

const setCookies = (_cookieName, _dataArr) => {
  cookies.set(_cookieName, _dataArr, { path: "/", maxAge: 60 * 60 * 24 });
};
const getCookies = (_cookieName) => {
  const mycookies = cookies.get(_cookieName);
  return mycookies;
};
const checkCookies = (_cookieName) => {
  const mycookies = cookies.get(_cookieName);
  if (mycookies) {
    return true;
  } else {
    return false;
  }
};

export { setCookies, getCookies, checkCookies };
