import React from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const Product = (props) => {
  const { product } = props;
  return (
    <Card>
      <Link to={`/product/${product._id}`}>
        <Card.Img
          className="card-img-top"
          src={product.image}
          alt={product.name}
        />
      </Link>
      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title>{product.name}</Card.Title>
        </Link>
      </Card.Body>
      <div className="product_info">
        <Card.Text>
          <strong>Rs. {product.price}</strong>
        </Card.Text>
        <Button>Add to Cart</Button>
      </div>
    </Card>
  );
};

export default Product;
