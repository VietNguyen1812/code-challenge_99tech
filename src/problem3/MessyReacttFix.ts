import React, { useMemo } from 'react';
import { BoxProps } from '@material-ui/core'; // Giả sử dùng Material-UI

interface WalletBalance {
    currency: string;
    amount: number;
    blockchain: string;
}

// Props of WalletRow
interface WalletRowProps {
    className: string;
    amount: number;
    usdValue: number;
    formattedAmount: string;
}


const WalletRow: React.FC<WalletRowProps> = () => null;
const useWalletBalances = (): WalletBalance[] => [];
const usePrices = (): Record<string, number> => ({});
const classes = { row: 'wallet-row' };


const getPriority = (blockchain: string): number => {
    switch (blockchain) {
        case 'Osmosis':
            return 100;
        case 'Ethereum':
            return 50;
        case 'Arbitrum':
            return 30;
        case 'Zilliqa':
            return 20;
        case 'Neo':
            return 20;
        default:
            return -99;
    }
};

const WalletPage: React.FC<BoxProps> = (props) => {
    const { ...rest } = props;
    const balances = useWalletBalances();
    const prices = usePrices();

    // Sắp xếp số dư theo độ ưu tiên
    const sortedBalances = useMemo(() => {
        return balances
            .filter((balance) => {
                const priority = getPriority(balance.blockchain);
                return priority > -99 && balance.amount > 0;
            })
            .sort((a, b) => {
                const priorityA = getPriority(a.blockchain);
                const priorityB = getPriority(b.blockchain);
                return priorityB - priorityA;
            });
    }, [balances]);


    const rows = sortedBalances.map((balance) => {

        const usdValue = (prices[balance.currency] || 0) * balance.amount;

        const formattedAmount = balance.amount
            ? new Intl.NumberFormat('en-US').format(balance.amount)
            : '0';

        return (
            <WalletRow
        className= { classes.row }
        key = { balance.currency }
        amount = { balance.amount }
        usdValue = { usdValue }
        formattedAmount = { formattedAmount }
            />
    );
});


return <div { ...rest } > { rows } </div>;
};

export default WalletPage;