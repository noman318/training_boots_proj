import React, { useEffect, useReducer } from "react";
import { Col, Row, ListGroup, Card, Badge, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios from "axios";
import Rating from "../components/Rating";
import { Helmet } from "react-helmet-async";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, product: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const ProductScreen = () => {
  const params = useParams();
  const { id } = params;

  const [{ loading, error, product }, dispatch] = useReducer(reducer, {
    product: [],
    loading: true,
    error: "",
  });

  useEffect(() => {
    console.log("Effect running");
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get(`/api/product/${id}`);
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: err.message });
      }
    };
    fetchData();
  }, [id]);
  return loading ? (
    <div>Loading...</div>
  ) : error ? (
    <div>{error}</div>
  ) : (
    <div className="p-4">
      <Row>
        <Col md={6}>
          <img
            className="image_large"
            src={product.image}
            alt={product.image}
          />
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <Helmet>
                <title>{product.name}</title>
              </Helmet>
              <h2>{product.name}</h2>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating rating={product.rating} numReviews={product.numReviews} />
            </ListGroup.Item>
            {/* <hr /> */}
            <ListGroup.Item>
              <h5>
                Price: <strong>Rs.{product.price}</strong>
              </h5>
            </ListGroup.Item>
            {/* <hr /> */}
            <ListGroup.Item>
              <p className="desc_style">Description: {product.description}</p>
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
                        Price: <strong>Rs.{product.price}</strong>
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
                      {product.countInStock > 0 ? (
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
                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <div className="d-grid gap-2">
                      <Button variant="primary" size="lg">
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
