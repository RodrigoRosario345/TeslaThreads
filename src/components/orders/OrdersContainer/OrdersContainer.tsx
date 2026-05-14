import { OrdersTable } from "../OrdersTable/OrdersTable";

export function OrdersContainer() {

    return (
        <div>
            <p className="text-gray-600">You have no orders yet.</p>
            <OrdersTable  />
        </div>
    )
}