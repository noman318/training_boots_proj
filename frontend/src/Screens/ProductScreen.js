import React, { useEffect, useState } from "react";
import { Col, Row, ListGroup, Card, Badge, Button, Form } from "react-bootstrap";
import { useParams,useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {Link} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { listProductDetails } from "../actions/productActions";

export const ProductScreen = () => {

  const navigate = useNavigate()
  // console.log("navigate", navigate);
  
  const params = useParams();
  // console.log('params :>> ', params.id);
  const singleParams = params.id
  // console.log("singleParams", singleParams);
  
  const [qty, setQty] = useState(1);

  const dispatch = useDispatch()

  const productDetails = useSelector(state => state.productDetails)

  const {loading, error, product} = productDetails

  useEffect(() => {
    dispatch(listProductDetails(singleParams))
    // console.log("dispatch", dispatch);
  }, [dispatch,singleParams]);

  const addToCartHandler =()=>{
    console.log('add to cart handler')
    navigate(`/cart/${singleParams}?qty=${qty}`)
    toast.success("added to cart");
  }

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
                      Status
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
                {product.countInStock >0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Quantity</Col>
                      <Col>
                        <Form.Control
                            as='select'
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}
                <ListGroup.Item>
                  <div className="d-grid gap-2">
                    <Button
                      onClick={addToCartHandler}
                      className='btn-block'
                      type='button'
                      variant="warning"
                      size="lg"
                      disabled={product.countInStock === 0}
                    >
                      Add To Cart
                    </Button>
                  </div>
                  </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      )}
    </div>
  );
};