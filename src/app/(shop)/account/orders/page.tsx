import { OrdersContainer, Title } from '@/components'
import { NextPage } from 'next'


const OrdersPage: NextPage = () => {
    return (
        <>
            <Title title='My Orders' />
            <OrdersContainer />
        </>
    )
}

export default OrdersPage


