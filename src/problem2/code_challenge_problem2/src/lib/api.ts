import axios from 'axios';

export interface TokenPrice {
    [symbol: string]: number;
}

export const fetchAPI = async (): Promise<TokenPrice> => {
    const res = await axios.get('https://interview.switcheo.com/prices.json')
    return res.data
}
