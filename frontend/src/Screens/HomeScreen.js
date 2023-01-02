/* eslint-disable no-unused-vars */
/* eslint-disable eqeqeq */
import React, { useEffect, useState } from "react";
import {useDispatch, useSelector} from 'react-redux'
import { Col, Row } from "react-bootstrap";
import { getProducts } from "../services/MyData";
import Product from "../components/Product";
import { listProducts } from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";

export const HomeScreen = () => {
  
  const filterProduct = (deletedId) => {
    let data = products?.products?.filter((products) => products._id !== deletedId);
    products([...data]);
  };
  const dispatch = useDispatch()
  const productList = useSelector(state => state.productList)
  const {loading, error, products} = productList
  useEffect(() => {
    dispatch(listProducts())
  }, [dispatch]);

  console.log("products =>", products);

  return (
    <div>
      <h2>Featured products</h2>
      {loading ? <Loader /> : error? <Message>{error}</Message> :
      
      <div>
      <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
      </div>
      }
    </div>
  );
};
