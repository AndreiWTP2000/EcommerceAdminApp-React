import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const NewItem = () => {
  const navigate = useNavigate();

  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    category: "",
    condition: "",
    price: "",
    photo: null,
  });
  const handleChange = (e) => {
    const { id, value } = e.target;
    setNewProduct({
      ...newProduct,
      [id]: value,
    });
  };

  const postData = async (e) => {
    //e.preventDefault();
    try {
      await fetch("http://localhost:8000/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
      });
    } catch (err) {
      console.error(err);
    }
  };
  const navigateTo = () => {
    navigate("/products");
  };
  return (
    <div className="my-5 form-container">
      <Link to="/products" className="go-back">
        <h5 className="text-white "> ← Go Back</h5>
      </Link>
      <h1 className="text-white">Add your product</h1>
      <form>
        <div className="form-group col-sm-12 col-md-6">
          <label className="text-white" htmlFor="name">
            Product name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            onChange={handleChange}
          />
        </div>
        <div className="form-group col-sm-12 col-md-6">
          <label htmlFor="description" className="text-white">
            Product Description
          </label>
          <textarea
            className="form-control"
            id="description"
            maxLength="200"
            onChange={handleChange}
          />
        </div>
        <div className="form-group  col-sm-12 col-md-6">
          <label className="text-white">Category</label>
          <select
            id="category"
            className="form-control"
            onChange={handleChange}
          >
            <option value="">Choose...</option>
            <option value="Electronics">Electronics</option>
            <option value="Clothing">Clothing</option>
            <option value="Home">Home</option>
          </select>
        </div>
        <div className="form-group col-sm-12 col-md-6">
          <label className="text-white">Condition</label>
          <select
            id="condition"
            className="form-control"
            onChange={handleChange}
          >
            <option value="">Choose...</option>
            <option value="New">New</option>
            <option value="Used">Used</option>
          </select>
        </div>
        <div className="form-group col-sm-12 col-md-6">
          <label className="text-white" htmlFor="price">
            Price
          </label>
          <input
            type="number"
            className="form-control"
            id="price"
            onChange={handleChange}
          />
        </div>
        <div className="form-group col-2">
          <label className="text-white" htmlFor="photo">
            Photo
          </label>
          <input
            type="file"
            className="form-control-file "
            id="photo"
            onChange={handleChange}
          />
        </div>
        <button
          type="submit"
          className="btn btn-light  mt-3"
          onClick={() => {
            postData();
            navigateTo();
          }}
        >
          <div className="mx-3">Add</div>
        </button>
      </form>
    </div>
  );
};

export default NewItem;
