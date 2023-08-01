function packAwait(promise, errorObj) {
  return new Promise((resolve) => {
    promise
      .then((res) => {
        resolve([res, null]);
      })
      .catch((err) => {
        if (typeof err === "object") {
          resolve([null, Object.assign({}, err, errorObj)]);
        } else {
          resolve([null, err]);
        }
      });
  });
}

module.exports = {
  packAwait,
};
