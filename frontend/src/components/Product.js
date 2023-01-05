/* eslint-disable no-unused-vars */
import React from "react";
import { Button, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { isAdmin, deleteProducts } from "../services/MyData";
import { toast } from "react-toastify";

const Product = ({ product }) => {
  const navigate = useNavigate();

  const editProductClick = (_id) => {
    navigate(`/editproduct/${product._id}`);
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
        }
      });
    }
  };
  return (
    <Card className="m-2 p-2 height">
      <Link className="link" to={`/product/${product._id}`}>
        <Card.Img
          className="card-img-top width height_Img"
          src={product.image}
          alt={product.name}
        />
      </Link>
      <Card.Body>
        <Link className="link" to={`/product/${product._id}`}>
          <Card.Title>{product.name}</Card.Title>
        </Link>
      </Card.Body>
      <div className="product_info">
        <Card.Text>
          <h4> {product.brand}</h4>
        </Card.Text>
        <Card.Text>
          <h3>₹ {product.price}</h3>
        </Card.Text>
      </div>
    </Card>
  );
};

export default Product;
