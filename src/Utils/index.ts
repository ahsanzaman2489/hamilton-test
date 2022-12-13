import queryString from "query-string";

export const createImageUrl = (path: string, ext: string, size: string = '') => {
    return path + (size ? '/' + size : '') + '.' + ext;
};

export const getAuthorizeUrl = (url: string) => {
    const CryptoJS = require("crypto-js");
    const ts = new Date().getTime();
    const API_PATH = process.env.REACT_APP_API_PATH;
    const PRI_KEY = process.env.REACT_APP_API_PRIVATE_KEY;
    const PUB_KEY = process.env.REACT_APP_API_PUBLIC_KEY;
    const hash = CryptoJS.MD5(ts + PRI_KEY! + PUB_KEY!).toString();
    const parseUrl = queryString.parseUrl(url);

    const newUrl = parseUrl.url;
    const newQuery = parseUrl.query;

    newQuery['ts'] = `${ts}`;
    newQuery['apikey'] = `${PUB_KEY}`;
    newQuery['hash'] = `${hash}`;

    return API_PATH + `${newUrl}` + '?' + queryString.stringify(newQuery)
};