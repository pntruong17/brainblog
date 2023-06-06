const createLayer = (_name, _c, _slot) => {
  // Tạo ra tổng _slot phần tử, _name là phần tử, _c là số phần tử _name là giống nhau (_name lập lại)
  let arr = [];
  for (let i = 0; i < _slot; i++) {
    arr.push(_name + Math.floor(i / _c));
  }
  return arr;
};

export default createLayer;
