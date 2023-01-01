/* eslint-disable no-unused-vars */
/* eslint-disable eqeqeq */
import React, { useEffect, useState } from "react";
import {useDispatch, useSelector} from 'react-redux'
import { Col, Row } from "react-bootstrap";
import { getProducts } from "../services/MyData";
import Product from "../components/Product";
import { listProducts } from "../actions/productActions";

export const HomeScreen = () => {
  // const [proData, setProData] = useState([]);
  // console.log(proData);
  // useEffect(() => {
  //   getProducts()
  //     .then((res) => {
  //       if (res.data.err == 0) {
  //         console.log(res.data);
  //         setProData(res.data.prodata);
  //       }
  //     })
  //     .catch((err) => {});
  // }, []);
  
  const filterProduct = (deletedId) => {
    let data = prodata?.prodata?.filter((prodata) => prodata._id !== deletedId);
    prodata([...data]);
  };
  const dispatch = useDispatch()
  const productList = useSelector(state => state.productList)
  const {loading, error, prodata} = productList
  useEffect(() => {
    dispatch(listProducts())
  }, [dispatch]);

  console.log("prodata =>", prodata);

  return (
    <div>
      <h2>Featured products</h2>
      <div>
        <Row>
          {prodata?.prodata?.map((pro) => (
            <Col key={pro._id} sm={6} md={4} lg={3} className="mb-3">
              <Product
                prodata={pro}
                // setProData={setProData}
                filterProduct={filterProduct}
              />
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};
