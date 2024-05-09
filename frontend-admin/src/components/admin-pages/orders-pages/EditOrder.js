import { useEffect, useState } from "react";
import PendingIcon from "../../../img/pending.jpg";
import ShippedIcon from "../../../img/shipped.jpg";
import CompleteIcon from "../../../img/complete.jpg";
import { useNavigate, useParams } from "react-router-dom";
const EditModal = () => {
  const navigate = useNavigate();

  const [orderById, setOrderById] = useState({
    id: "",
    order_detail: "",
    address: "",
    status: "",
    order_date: "",
    order_value: "",
  });
  const params = useParams();
  const idOrder = params.id;
  const getOrder = async () => {
    try {
      const data = await fetch(`http://localhost:8000/order/${idOrder}`);
      const order = await data.json();
      setOrderById(order);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getOrder();
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setOrderById({
      ...orderById,
      [id]: value,
    });
  };

  const handleSubmit = async (e) => {
    await fetch(`http://localhost:8000/product/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderById),
    });
  };

  const navigateTo = () => {
    navigate("/orders");
  };

  const { id, order_details, address, status, order_date, order_value } =
    orderById;

  return (
    <div className="bg-dark edit-modal">
      <div className="card edit-modal-opacity" style={{ width: "18rem" }}>
        {status === "1" && (
          <img src={PendingIcon} className="card-img-top" alt="" />
        )}
        {status === "2" && (
          <img src={ShippedIcon} className="card-img-top" alt="" />
        )}
        {status === "3" && (
          <img src={CompleteIcon} className="card-img-top" alt="" />
        )}
        <div className="card-body">
          <div className="row">
            <div className="col">
              <h3>
                Edit order: <b>#{id}</b>
              </h3>
            </div>
            <div className="col close-btn">
              <button
                type="button"
                className="close "
                aria-label="Close"
                onClick={() => navigate("/orders")}
              >
                <span aria-hidden="true" className="btn-x">
                  &times;
                </span>
              </button>
            </div>
          </div>

          <form>
            <div className="form-group ">
              <label htmlFor="description">Order Details</label>
              <textarea
                className="form-control"
                id="order_detail"
                maxLength="500"
                value={order_details}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="name">Address</label>
              <input
                type="text"
                className="form-control"
                id="address"
                value={address}
                onChange={handleChange}
              />
            </div>
            <div className="row">
              <div className="form-group col-6 ">
                <div className="radio-selector line-status">
                  {status === "1" && (
                    <button className="btn btn-secondary ">Pending</button>
                  )}

                  {status === "2" && (
                    <button className="btn btn-warning ">Shipped</button>
                  )}

                  {status === "3" && (
                    <button className="btn btn-success">Completed</button>
                  )}
                </div>
              </div>
              <div className="form-group  col-6">
                <label htmlFor="price">Value</label>
                <input
                  type="number"
                  className="form-control"
                  id="order_value"
                  value={order_value}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="row">
              <div className="form-group col-6"></div>
              <div className="col-6 bc">
                <button
                  type="submit"
                  className="btn btn-success  modal-button"
                  onClick={(e) => {
                    handleSubmit();
                    navigateTo();
                  }}
                >
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
