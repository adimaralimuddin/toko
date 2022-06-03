


import { useEffect, useState } from 'react';

import useTransaction from '../../controls/transactionControl';
import TransactionItem from '../transaction/TransactionItem';


export default function AccountPurchase() {
    const [curTab, setTab] = useState('All')
    const { getTransactions, selectedTransactions, cancelOrder, removeItem, setDisplay } = useTransaction()

    useEffect(() => {
        getTransactions()
    }, [])

    const handleChange = ({ target }) => {
        setTab(target.textContent)
        setDisplay(target.textContent)
    };

    const TabButton = (props) => <button {...props} className={` py-2 min-w-[100px] px-2 flex-1 whitespace-nowrap ` + (props?.active == props?.children ? ' bg-[#FF6363] text-white ' : ' hover:bg-orange-50 ')}>{props?.children}</button>

    return (
        <div className=' flex flex-col max-w-3xl mx-auto p-3 w-full'>
            <div className='bg-white shadow-sm sticky top-[90px] flex flex-wrap justify-between '>
                {
                    ['All', 'To Ship', 'To Receive', 'Completed', 'Canceled']?.map(
                        tab => <TabButton active={curTab} onClick={handleChange}>{tab}</TabButton>
                    )
                }
            </div>
            <div className=''>
                {
                    selectedTransactions?.map(transaction => (
                        <TransactionItem
                            data={transaction}
                            cancelOrder={cancelOrder}
                            removeItem={removeItem}
                            key={transaction?._id}
                        />
                    ))
                }
            </div>
        </div>
    );
}

