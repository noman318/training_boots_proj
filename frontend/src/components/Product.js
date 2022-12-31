/* eslint-disable no-unused-vars */
import React from "react";
import { Button, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { isAdmin, deleteProducts } from "../services/MyData";
import { toast } from "react-toastify";

const Product = ({ prodata, filterProduct }) => {
  const navigate = useNavigate();

  const editProductClick = (_id) => {
    navigate(`/editproduct/${prodata._id}`);
  };

  const addToCart = () => {
    console.log("added to cart");
    toast.success("added to cart");
  };

  const deleteProduct = (id) => {
    console.log("delete Products");
    if (window.confirm("Do you want to delete ?")) {
      deleteProducts(id).then((res) => {
        if (res.data) {
          console.log("res.data", res.data);
          toast.error("Product Deleted");
          filterProduct(id);
        }
      });
    }
  };
  return (
    <Card>
      <Link to={`/product/${prodata._id}`}>
        <Card.Img
          className="card-img-top width"
          src={prodata.imageURL}
          alt={prodata.name}
        />
      </Link>
      <Card.Body>
        <Link to={`/product/${prodata._id}`}>
          <Card.Title>{prodata.name}</Card.Title>
        </Link>
      </Card.Body>
      <div className="product_info">
        <Card.Text>
          <strong>Rs. {prodata.price}</strong>
        </Card.Text>
        <div className="d-flex">
          <Button className="m-1 btn btn-dark" onClick={() => addToCart()}>
            Add to Cart
          </Button>
          {isAdmin() && (
            <>
              <Button className="m-1" onClick={() => editProductClick()}>
                Edit
              </Button>
              <Button
                className="m-1 btn btn-danger"
                onClick={() => deleteProduct(prodata._id)}
              >
                Delete
              </Button>
            </>
          )}
        </div>
      </div>
    </Card>
  );
};

export default Product;
