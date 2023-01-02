/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Col, Row, ListGroup, Card, Badge, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {Link} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { listProductDetails } from "../actions/productActions";

export const ProductScreen = () => {

  const params = useParams();
  console.log('params :>> ', params.id);
  const singleParams = params.id
  console.log("singleParams", singleParams);
  

  const dispatch = useDispatch()

  const productDetails = useSelector(state => state.productDetails)
  console.log('productDetails :>> ', productDetails);

  const {loading, error, product} = productDetails

  useEffect(() => {
    dispatch(listProductDetails(singleParams))
    console.log("dispatch", dispatch);
  }, [dispatch,singleParams]);

  const addToCart = () => {
    console.log("added to cart");
    toast.success("added to cart");
  };

  return (
    <div className="p-4">
      <Link className='btn btn-light my-3' to='/'>
        Go Back
      </Link> 
      {loading ? <Loader />: error ? <Message variant={'danger'}>{error}</Message> : (
      <Row>
        <Col md={6}>
          <img
            className="image_large"
            src={product.image}
            alt={product.product}
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
              <h5>
                Price: <strong>Rs.{product.price}</strong>
              </h5>
            </ListGroup.Item>
            <ListGroup.Item>
              <b className="desc_style">Category: {product.category}</b>
            </ListGroup.Item>
            <ListGroup.Item>
              <p className="desc_style">
                Description: {product.description}
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
                {product.countInStock > 0 ? (
                  <ListGroup.Item>
                    <div className="d-grid gap-2">
                      <Button variant="warning" size="lg" onClick={() => addToCart()}>
                        Add to Cart
                      </Button>
                    </div>
                  </ListGroup.Item>
                ):<ListGroup.Item>
                <div className="d-grid gap-2">
                  <Button variant="warning" size="lg" onClick={() => addToCart()} disabled>
                    Add to Cart
                  </Button>
                </div>
              </ListGroup.Item>}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      )}
    </div>
  );
};