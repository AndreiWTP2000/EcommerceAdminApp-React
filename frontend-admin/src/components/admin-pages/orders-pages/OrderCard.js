import PendingIcon from "../../../img/pending.jpg";
import ShippedIcon from "../../../img/shipped.jpg";
import CompleteIcon from "../../../img/complete.jpg";
import { Link } from "react-router-dom";
import { useState } from "react";
import ProductIcon from "../../../img/prod-icon.jpg";

const OrderCard = (order) => {
  const { id, order_detail, address, status, order_date, order_value } =
    order.order;
  const [orderStatus, setOrderStatus] = useState(status);
  const handleDelete = async () => {
    await fetch(`http://localhost:8000/orders/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
  };

  const changeStatus = () => {
    if (orderStatus === "1") setOrderStatus("2");
    else if (orderStatus === "2") setOrderStatus("3");
    else if (orderStatus === "3") setOrderStatus("1");
  };

  return (
    <div className="card mt-3" style={{ width: "18rem" }}>
      {orderStatus === "1" && (
        <img src={PendingIcon} className="card-img-top" alt="" />
      )}
      {orderStatus === "2" && (
        <img src={ShippedIcon} className="card-img-top" alt="" />
      )}
      {orderStatus === "3" && (
        <img src={CompleteIcon} className="card-img-top" alt="" />
      )}
      <div className="card-body container">
        <h5 className="card-title">
          ID: <b>{id}</b>
        </h5>
        <div className="text-section row">
          <div className="col-6">
            <p className="card-text ">
              Order details: <b>{order_detail}</b>
            </p>

            <p className="card-text ">
              Address: <b>{address}</b>
            </p>
          </div>
          <div className="col-6">
            <p className="card-text date-order">
              Date: <b>{order_date} </b>
            </p>
            <p className="card-text ">
              Value: <b>{order_value} £</b>
            </p>
          </div>
        </div>
        <div className="cta-section">
          <div className="mt-2 ">
            <p className="line-status">Status: </p>
            <div className="radio-selector line-status">
              {orderStatus === "1" && (
                <button
                  className="btn btn-secondary "
                  onClick={() => {
                    changeStatus();
                  }}
                >
                  Pending
                </button>
              )}

              {orderStatus === "2" && (
                <button
                  className="btn btn-warning "
                  onClick={() => {
                    changeStatus();
                  }}
                >
                  Shipped
                </button>
              )}

              {orderStatus === "3" && (
                <button
                  className="btn btn-success"
                  onClick={() => {
                    changeStatus();
                  }}
                >
                  Completed
                </button>
              )}
            </div>
          </div>
          <div className="mt-2">
            <div className=" "></div>
            <div className="button-container">
              {/* <Link to={`/orders/edit/${id}`}>
                <button className="btn btn-dark edit-button">
                  <div className="edit-text">Edit</div>
                </button>
              </Link> */}
              <button className="btn btn-danger  " onClick={handleDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
