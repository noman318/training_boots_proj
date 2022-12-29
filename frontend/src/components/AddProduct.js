/* eslint-disable eqeqeq */
import React,{useState} from "react";
import {Form,Button} from 'react-bootstrap'
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { addProduct } from "../services/MyData";

export default function AddProduct() {
    const navigate = useNavigate();
    const [state, setState] = useState({
      errMsg: "",
      succMsg: "",
      imagePath: "",
    });
    const uploadImage = (event) => {
      if (event.target.files.length > 0) {
        setState({ ...state, imagePath: event.target.files[0] });
      }
    };
    const  handleSubmit= (event) => {
        console.log('handlesubmit :>> ');
      event.preventDefault();
      if (state.imagePath != "") {
        if (
          state.imagePath.type == "image/jpg" ||
          state.imagePath.type == "image/jpeg" ||
          state.imagePath.type == "image/png"
        ) {
          // when we upload any attachment we can send the data with FormData
          const data = new FormData(event.currentTarget);
          console.log('data :>> ', data);
          const senddata = new FormData();
          console.log("senddata", senddata);
          senddata.append("name", data.get("name"));
          senddata.append("category", data.get("category"));
          senddata.append("price", data.get("price"));
          senddata.append("description", data.get("description"));
          senddata.append("manufacturer", data.get("manufacturer"));
          senddata.append("availableItems", data.get("availableItems"));
          senddata.append("attach", state.imagePath);
          addProduct(senddata).then((res) => {
            if (res?.data.err == 0) {
                console.log("res.data", res.data);
                
              setState({ ...state, succMsg: res.data.msg });
              setTimeout(() => {
                navigate("/");
              }, 2000);
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
        <h1>AddProduct</h1> 
        <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Product Name: </Form.Label>
        <Form.Control type="text" placeholder="Product name" name="name" required />
        <Form.Text className="text-muted">
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Product category: </Form.Label>
        <Form.Control type="text" placeholder="Product category" name="category" required />
        <Form.Text className="text-muted">
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Product Price: </Form.Label>
        <Form.Control type="text" placeholder="Product Price" name="price" required />
        <Form.Text className="text-muted">
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Product Description: </Form.Label>
        <Form.Control type="text" placeholder="Product Description" name="description" required />
        <Form.Text className="text-muted">
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Product Manufacturer: </Form.Label>
        <Form.Control type="text" placeholder="Product Manufacturer" name="manufacturer" required />
        <Form.Text className="text-muted">
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Product Available Items: </Form.Label>
        <Form.Control type="text" placeholder="Product Available Items" name="availableItems" required />
        <Form.Text className="text-muted">
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Product Available Items: </Form.Label>
        <Form.Control type="file" placeholder="Upload Image" name="image" onChange={uploadImage} required />
        <Form.Text className="text-muted">
        </Form.Text>
      </Form.Group>

      <Button variant="primary" type="submit" >
        Submit
      </Button>
    </Form>
    </div>
    );
}
