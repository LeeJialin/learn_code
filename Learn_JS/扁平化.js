let data = {
  name: "John",
  age: 20,
  address: {
    city: "New York",
    country: "USA",
  },
  hobbies: ["sports", "reading"],
};

function flattenObject(obj) {
  let result = {};
  function recurse(cur, prop) {
    if (Object(cur) !== cur) {
      result[prop] = cur;
    } else if (Array.isArray(cur)) {
      for (let i = 0, l = cur.length; i < l; i++)
        recurse(cur[i], prop + "[" + i + "]");
      if (l == 0) result[prop] = [];
    } else {
      let isEmpty = true;
      for (let p in cur) {
        isEmpty = false;
        recurse(cur[p], prop ? prop + "." + p : p);
      }
      if (isEmpty && prop) result[prop] = {};
    }
  }
  recurse(obj, "");
  return result;
}

let flattenedData = flattenObject(data);
console.log(flattenedData);
// {
//   name: 'John',
//   age: 20,
//   'address.city': 'New York',
//   'address.country': 'USA',
//   'hobbies[0]': 'sports',
//   'hobbies[1]': 'reading'
// }
