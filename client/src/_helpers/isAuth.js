export const isAuth = () => {
  const itemStr = localStorage.getItem("we_sell_houses_auth");

  if (!itemStr) {
    return false;
  }

  const item = JSON.parse(itemStr);
  const now = new Date();

  // console.log(new Date(now.getTime()) + "now");
  // console.log(new Date(item.expiry) + "expire time");

  if (now.getTime() > item.expiry) {
    // console.log(new Date(now.getTime()));
    // console.log(new Date(item.expiry));
    // console.log("expiring");
    localStorage.removeItem("we_sell_houses_auth");
    return false;
  }
  return true;
};

export const setAuthToken = (key, value, ttl) => {
  const now = new Date();

  // `item` is an object which contains the original value
  // as well as the time when it's supposed to expire
  const item = {
    value: value,
    expiry: now.getTime() + ttl,
  };
  localStorage.setItem(key, JSON.stringify(item));
};

export const getAuthToken = () => {
  const itemStr = localStorage.getItem("we_sell_houses_auth");
  const item = JSON.parse(itemStr);
  if (isAuth()) return item.value;
  else return false;
};
