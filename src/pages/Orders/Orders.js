import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ErrorBox from "../../components/ErrorBox/ErrorBox";
import LoadingBox from "../../components/LoadingBox/LoadingBox";
import { userOrderDetails } from "../../store/actions/actionCreators/orderAction";

import "./Orders.css";

const Orders = () => {
  const order = useSelector((state) => state.orderDetails);

  const { loading, error, orderHistory } = order;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userOrderDetails());
  }, [dispatch]);

  return (
    <div>
      <h1 style={{ textAlign: "center", fontSize: "24px" }}>Your Orders</h1>
      {loading && <LoadingBox></LoadingBox>}
      {error && <ErrorBox varient="error">{error}</ErrorBox>}
      {orderHistory?.length === 0 ? (
        <h2 className="wishlistempty">You don't have any orders yet.</h2>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Billing Cost</th>
              <th>Tax</th>
              <th>Shipping Cost</th>
              <th>Total Cost</th>
              <th>Paid</th>
              <th>Delivered</th>
            </tr>
          </thead>
          <tbody>
            {orderHistory &&
              orderHistory.map((order) => (
                <tr key={order._id}>
                  <td>{order._id.toUpperCase()}</td>
                  <td>&#8377;{order.itemsPrice}</td>
                  <td>&#8377;{order.taxPrice}</td>
                  <td>
                    {order.shippingPrice === 0 ? "Free" : order.shippingPrice}
                  </td>
                  <td>&#8377;{order.totalPrice}</td>
                  <td>{order.isPaid ? "Paid" : "Not Paid"}</td>
                  <td>{order.isDelivered ? "Delivered" : "On the Way"}</td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Orders;
