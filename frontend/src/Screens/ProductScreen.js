import React, { useEffect, useState } from "react";
import { Col, Row, ListGroup, Card, Badge, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import { toast } from "react-toastify";

const getProdById = async (id) => {
  console.log(id);
  const apiURL = `http://localhost:8000/api/v1/products/${id}`;
  console.log("jjjjjjjjjjjjjjjjjjjjjjjj");
  const res = await axios.get(`${apiURL}`);
  console.log(res);
  const { data } = res;
  return data.prodata;
};

export const ProductScreen = ({ prodata }) => {
  const params = useParams();
  const [productData, setProductData] = useState(prodata);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const fetchProductData = async () => {
      const data = await getProdById(params?.id);
      setProductData(data);
    };

    fetchProductData();
    setIsLoading(false);
  }, [params]);

  if (isLoading) {
    return <p>Fetching product</p>;
  }

  if (!productData) {
    return <p>No Product found</p>;
  }
  const addToCart = () => {
    console.log("added to cart");
    toast.success("added to cart");
  };

  return (
    <div className="p-4">
      <Row>
        <Col md={6}>
          <img
            className="image_large"
            src={productData.imageURL}
            alt={productData}
          />
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <Helmet>
                <title>{productData.name}</title>
              </Helmet>
              <h2>{productData.name}</h2>
            </ListGroup.Item>
            <ListGroup.Item>
              <h5>
                Price: <strong>Rs.{productData.price}</strong>
              </h5>
            </ListGroup.Item>
            {/* <hr /> */}
            <ListGroup.Item>
              <b className="desc_style">Category: {productData.category}</b>
            </ListGroup.Item>
            <ListGroup.Item>
              <p className="desc_style">
                Description: {productData.description}
              </p>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <h5>
                        Price: <strong>Rs.{productData.price}</strong>
                      </h5>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col className="badge_text">
                      <h3>Status</h3>
                    </Col>
                    <Col>
                      {productData.availableItems > 0 ? (
                        <h3>
                          <Badge className="md" bg="success">
                            Available
                          </Badge>
                        </h3>
                      ) : (
                        <h3>
                          <Badge className="md" bg="danger">
                            Unavailbale
                          </Badge>
                        </h3>
                      )}
                    </Col>
                  </Row>
                </ListGroup.Item>
                {productData.availableItems > 0 && (
                  <ListGroup.Item>
                    <div className="d-grid gap-2">
                      <Button variant="primary" size="lg" onClick={() => addToCart()}>
                        Add to Cart
                      </Button>
                    </div>
                  </ListGroup.Item>
                )}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};