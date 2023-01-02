import React,{ useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Row, Col, Button, ListGroup, Card,Image } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useLocation } from 'react-router-dom'
import { addToCart, removeFromCart } from "../actions/cartAction";
import Message from "../components/Message";

export const CartScreen = () => {
    // const navigate = useNavigate()
    const params = useParams()
    const location =  useLocation()
    const singleParams = params.id
    // const locationSearch = location.search
    
    // console.log('navigate :>> ', navigate);
    // console.log("singleParams", singleParams);
    // console.log('location :>> ', locationSearch);

    const productId = singleParams
    const qty = location.search ? Number(location.search.split('=')[1]):1

    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)

    const {cartItems} = cart
    // console.log('cartItems :>> ', cartItems);
    // console.log('cart :>> ', cart);
    
    useEffect(()=>{
      if(productId){
        dispatch(addToCart(productId,qty))
      }
    },[dispatch,productId,qty])
    
    const removeFromCartHandler=(id)=>{
      console.log('remove from cart')
      dispatch(removeFromCart(id))
    }

    const checkoutHandler =()=>{
      console.log('check out')
    }

  return (
  <Row>
    <Col md={8}>
    <h3>Shopping Cart</h3>
      {cartItems.length === 0 ? <Message>Your Cart is Empty <Link to={'/'}>Go Back</Link></Message>:(
        <ListGroup variant="flush">
          {cartItems.map(item => (
            <ListGroup.Item key={item.product}>
              <Row>
                <Col md={2}>
                  <Image src={item.image} alt={item.name} fluid rounded />
                </Col>
                <Col md={3}>
                  <Link to={`/product/${item.product}`}>{item.name}</Link>
                </Col>
                <Col md={2}>Rs. {item.price}</Col>
                <Col md={2}>
                <Form.Control
                            as='select'
                            value={item.qty}
                            onChange={(e) => dispatch(addToCart(item.product,Number(e.target.value)))}
                          >
                            {[...Array(item.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                </Col>
                <Col md={2}>
                  <Button variant="light" type="button" onClick={()=> removeFromCartHandler(item.product)}>
                    <i className="fas fa-trash"></i>
                  </Button>
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </Col>
    <Col md={4}>
      <Card>
        <ListGroup variant="flush">
          <h2>SubTotal ({cartItems.reduce((acc,item)=> acc+item.qty,0)}) Items</h2>
          Rs. {cartItems.reduce((acc,item)=>acc + item.qty * item.price,0).toFixed(2)}
        </ListGroup>
        <ListGroup.Item>
        <div className="d-grid gap-2 p-2">
              <Button
                type='button'
                className='btn-block'
                variant="dark"
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                Proceed To Checkout
              </Button>
              </div>
            </ListGroup.Item>
      </Card>
    </Col>
</Row>
);
};
