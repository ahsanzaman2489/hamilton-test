import axios from 'axios';
import queryString from 'query-string';

interface Params {
    headers: any
    method: string
}

const config: Params = {
    headers: {},
    method: 'GET'
};

const getAuthorizeUrl = (url: string) => {
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

export const API = async (url: any): Promise<any> => {

    const authorizeUrl = getAuthorizeUrl(url);
    return await axios({
        ...config,
        url: `${authorizeUrl}`,
    }).then((response: any) => {
        // console.log(response);
        return {
            status: response.status,
            data: response.data
        }
    }).catch((error: any) => {
        // console.log(error)
        return {
            status: error.status,
            data: error.response
        }
    })
};