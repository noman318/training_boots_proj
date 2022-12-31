/* eslint-disable no-unused-vars */
/* eslint-disable eqeqeq */
import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { editProduct } from "../services/MyData";

export default function EditProduct() {
  const getProdById = async (id) => {
    console.log(id);
    const apiURL = `http://localhost:8000/api/v1/products/${id}`;
    console.log("jjjjjjjjjjjjjjjjjjjjjjjj");
    const res = await axios.get(`${apiURL}`);
    console.log(res);
    const { data } = res;
    return data.prodata;
  };
  const params = useParams();
  const [productData, setProductData] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [manufacturer, setManufacturer] = useState("");
  const [category, setCategory] = useState("");
  const [availableItems, setAvailableItems] = useState(0);
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const [state, setState] = useState({
    errMsg: "",
    succMsg: "",
    imagePath: "",
  });

  useEffect(() => {
    setIsLoading(true);
    const fetchProductData = async () => {
      const data = await getProdById(params?.id);
      setProductData(data);
      const {
        name,
        price,
        description,
        category,
        availableItems,
        manufacturer,
      } = data;
      setName(name);
      setPrice(price);
      setCategory(category);
      setAvailableItems(availableItems);
      setManufacturer(manufacturer);
      setDescription(description);
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

  const uploadImage = (event) => {
    if (event.target.files.length > 0) {
      setState({ ...state, imagePath: event.target.files[0] });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("state", state);
    if (state.imagePath != "") {
      if (
        state.imagePath.type == "image/jpg" ||
        state.imagePath.type == "image/jpeg" ||
        state.imagePath.type == "image/png"
      ) {
        // when we upload any attachment we can send the data with FormData
        const data = new FormData(event.currentTarget);
        const senddata = new FormData();
        senddata.append("name", data.get("name"));
        senddata.append("category", data.get("category"));
        senddata.append("price", data.get("price"));
        senddata.append("description", data.get("description"));
        senddata.append("manufacturer", data.get("manufacturer"));
        senddata.append("availableItems", data.get("availableItems"));
        senddata.append("attach", state.imagePath);
        console.log("moin");
        editProduct(params?.id, senddata).then((res) => {
          console.log("res", res);
          if (res.status == 200) {
            setState({ ...state, succMsg: res.data.msg });
            navigate("/");
          }
          if (res.data.err == 1) {
            setState({ ...state, errMsg: res.data.msg });
          }
        });
      } else {
        toast.error(
          setState({ ...state, errMsg: "Only support Jpg and Png Image" })
        );
      }
    } else {
      toast.error(setState({ ...state, errMsg: "Please select a image" }));
    }
  };
  return (
    <div className="w-50">
      <h1>Edit Product</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Product Name: </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Product name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Product category: </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Product category"
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Product Price: </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Product Price"
            name="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Product Description: </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Product Description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Product Manufacturer: </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Product Manufacturer"
            name="manufacturer"
            value={manufacturer}
            onChange={(e) => setManufacturer(e.target.value)}
            required
          />
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Product Available Items: </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Product Available Items"
            name="availableItems"
            required
            value={availableItems}
            onChange={(e) => setAvailableItems(e.target.value)}
          />
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Product Available Items: </Form.Label>
          <Form.Control
            type="file"
            placeholder="Upload Image"
            name="image"
            onChange={uploadImage}
            // required
          />
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>

        <Button variant="primary" type="submit">
          Edit Product
        </Button>
      </Form>
    </div>
  );
}
