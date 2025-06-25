import axios from 'axios'

export interface Token {
    symbol: string,
    price?: number;
    icon: string;
}

export const fetchTokens = async (): Promise<Token[]> => {
    try {
        const response = await axios.get('https://interview.switcheo.com/prices.json')
        const prices: { currency: string, price: number }[] = response.data; //// Get api from axios

        const dataResponse = prices.filter((item) => item.price > 0)
            .map((item) => ({
                symbol: item.currency,
                price: item.price,
                icon: `https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/${item.currency}.svg`
            }))

        return dataResponse;
    }
    catch (error) {
        console.error('Error fetching token prices', error)
        return [];
    }
}
