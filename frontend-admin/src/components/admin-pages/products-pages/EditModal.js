import { useEffect, useState } from "react";
import ProductIcon from "../../../img/prod-icon.jpg";
import { useNavigate, useParams } from "react-router-dom";
const EditModal = () => {
  const navigate = useNavigate();
  const [productById, setProductById] = useState({
    name: "",
    description: "",
    category: "",
    condition: "",
    price: "",
    photo: null,
  });
  const params = useParams();
  const id = params.id;
  const getProduct = async () => {
    try {
      const data = await fetch(`http://localhost:8000/product/${id}`);
      const product = await data.json();
      setProductById(product);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setProductById({
      ...productById,
      [id]: value,
    });
  };

  const handleSubmit = async (e) => {
    await fetch(`http://localhost:8000/product/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productById),
    });
  };

  const navigateTo = () => {
    navigate("/products");
  };

  const { name, description, category, condition, price } = productById;

  return (
    <div className="bg-dark edit-modal">
      <div className="card edit-modal-opacity" style={{ width: "18rem" }}>
        <img className="card-img-top" src={ProductIcon} alt="" />
        <div className="card-body">
          <div className="row">
            <div className="col">
              <h3>Edit product</h3>
            </div>
            <div className="col close-btn">
              <button
                type="button"
                className="close "
                aria-label="Close"
                onClick={() => navigate("/products")}
              >
                <span aria-hidden="true" className="btn-x">
                  &times;
                </span>
              </button>
            </div>
          </div>

          <form>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                value={name}
                onChange={handleChange}
              />
            </div>
            <div className="form-group ">
              <label htmlFor="description">Product Description</label>
              <textarea
                className="form-control"
                id="description"
                maxLength="200"
                value={description}
                onChange={handleChange}
              />
            </div>
            <div className="row">
              <div className="form-group col-6 ">
                <label>Category</label>
                <select
                  id="category"
                  className="form-control"
                  value={category}
                  onChange={handleChange}
                >
                  <option value="">Choose...</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Clothing">Clothing</option>
                  <option value="Home">Home</option>
                </select>
              </div>
              <div className="form-group  col-6">
                <label>Condition</label>
                <select
                  id="condition"
                  className="form-control"
                  value={condition}
                  onChange={handleChange}
                >
                  <option value="">Choose...</option>
                  <option value="New">New</option>
                  <option value="Used">Used</option>
                </select>
              </div>
            </div>
            <div className="row">
              <div className="form-group col-6">
                <label htmlFor="price">Price</label>
                <input
                  type="number"
                  className="form-control"
                  id="price"
                  value={price}
                  onChange={handleChange}
                />
              </div>
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
