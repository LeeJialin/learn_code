// 获取base_url
const getBaseURL = (url) => url.replace(/[?#].*$/, "");
console.log("=========>", getBaseURL("http://url.com/page?name=Adam&surname=Smith"));
