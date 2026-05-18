import type { Metadata } from 'next'
import { OrdersContainer, Title } from '@/components'

export const metadata: Metadata = {
    title: 'My Orders',
    description: 'View and track all your orders at Tesla Threads.',
}
const OrdersPage = () => {
    return (
        <>
            <Title title='My Orders' />
            <OrdersContainer />
        </>
    )
}

export default OrdersPage


