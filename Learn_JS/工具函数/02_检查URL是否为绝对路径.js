const isAbsoluteURL = (str) => /^[a-z][a-z0-9+.-]*:/.test(str);

console.log("=========>", isAbsoluteURL("https://google.com"));
console.log("=========>", isAbsoluteURL("ftp://www.myserver.net"));
console.log("=========>", isAbsoluteURL("/foo/bar"));
