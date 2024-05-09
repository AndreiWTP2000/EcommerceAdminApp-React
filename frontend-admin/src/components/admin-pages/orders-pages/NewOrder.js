import { useEffect, useState } from "react";
import ProductIcon from "../../../img/prod-icon.jpg";
import { useNavigate, useParams } from "react-router-dom";
const EditModal = () => {
  const navigate = useNavigate();

  const [newOrder, setNewOrder] = useState({
    order_detail: "",
    address: "",
    order_value: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setNewOrder({
      ...newOrder,
      [id]: value,
    });
  };

  const postData = async (e) => {
    //e.preventDefault();
    try {
      await fetch("http://localhost:8000/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newOrder),
      });
    } catch (err) {
      console.error(err);
    }
  };

  const navigateTo = () => {
    navigate("/orders");
  };
  return (
    <div className="bg-dark edit-modal">
      <div className="card edit-modal-opacity" style={{ width: "18rem" }}>
        <div className="card-body">
          <div className="row">
            <div className="col">
              <h3>Add Order</h3>
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
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="name">Address</label>
              <input
                type="text"
                className="form-control"
                id="address"
                onChange={handleChange}
              />
            </div>

            <div className="row">
              <div className="form-group col-6">
                <label htmlFor="price">Value</label>
                <input
                  type="number"
                  className="form-control"
                  id="order_value"
                  onChange={handleChange}
                />
              </div>
              <div className="col-6 bc">
                <button
                  type="submit"
                  className="btn btn-success  modal-button"
                  onClick={(e) => {
                    postData();
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
