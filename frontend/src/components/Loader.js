import React from "react";
import { Spinner } from 'react-bootstrap'

export default function Loader() {
  return (
  <div>
    <Spinner animation="border" role="status" style={{margin:'auto',display:'block'}} >
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  </div>
  );
}
