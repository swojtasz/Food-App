import OrderList from "../../components/courier/OrderList/OrderList";

const Orders: React.FC = () => {
    return (
        <div>
            <h1>Zlecenia możliwe do przyjęcia</h1>
            <OrderList />
        </div>
    );
};

export default Orders;
