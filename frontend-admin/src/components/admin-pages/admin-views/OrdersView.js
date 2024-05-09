import { Link, Outlet } from "react-router-dom";
import OrderCard from "../orders-pages/OrderCard";
import { useEffect, useState } from "react";

const OrdersView = () => {
  const [orders, setOrders] = useState(null);
  const getData = async () => {
    try {
      const data = await fetch("http://localhost:8000/orders");
      const orders = await data.json();
      setOrders(orders);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getData();
  }, [orders]);
  return (
    <div className="my-5">
      <Link to="/orders/new-order">
        <button type="button" className="btn btn-light btn-lg">
          Add Order
        </button>
      </Link>
      {orders &&
        orders
          .sort((a, b) => b.id - a.id)
          .map((order) => <OrderCard key={order.id} order={order} />)}
      <Outlet />
    </div>
  );
};

export default OrdersView;
