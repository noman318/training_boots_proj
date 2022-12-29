/* eslint-disable eqeqeq */
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { getProducts } from "../services/MyData";
import Product from "../components/Product";

export const HomeScreen = () => {
  const [proData, setProData] = useState([]);
  console.log(proData);
  useEffect(() => {
    getProducts()
      .then((res) => {
        if (res.data.err == 0) {
          console.log(res.data);
          setProData(res.data.prodata);
        }
      })
      .catch((err) => {});
  }, []);

  const filterProduct = (deletedId) => {
    let data = proData.filter((prodata) => prodata._id !== deletedId);
    setProData([...data]);
  };

  return (
    <div>
      <h2>Featured products</h2>
      <div className="products">
        <Row>
          {proData.map((pro) => (
            <Col key={pro._id} sm={6} md={4} lg={3} className="mb-3">
              <Product
                prodata={pro}
                setProData={setProData}
                filterProduct={filterProduct}
              />
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};
