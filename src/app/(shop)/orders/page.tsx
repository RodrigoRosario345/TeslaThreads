import { NextPage } from 'next'


const OrdersPage: NextPage = () => {
    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Your Orders</h1>
            <p className="text-gray-600">You have no orders yet.</p>
        </div>
    )
}

export default OrdersPage