import { Link } from "react-router-dom";
import ProductIcon from "../../../img/prod-icon.jpg";

const ProductCard = (product) => {
  const { id, name, description, category, condition, price } = product.product;
  const handleDelete = async () => {
    await fetch(`http://localhost:8000/product/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
  };
  return (
    <div className="card mt-3" style={{ width: "18rem" }}>
      <img src={ProductIcon} className="card-img-top" alt="" />
      <div className="card-body">
        <div className="text-section">
          <h5 className="card-title">{name}</h5>
          <p className="card-text ">{description}</p>
        </div>
        <div className="cta-section">
          <p>
            Category: <b>{category}</b>
          </p>
          <p>
            Condition: <b>{condition}</b>
          </p>
          <div>
            Price:
            <b>{price} £</b>
            <div className="button-container">
              <Link to={`/products/edit/${id}`}>
                <button className="btn btn-dark edit-button">
                  <div className="edit-text">Edit</div>
                </button>
              </Link>
              <button className="btn btn-danger " onClick={handleDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
