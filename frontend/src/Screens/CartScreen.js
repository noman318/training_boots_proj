import React from "react";
import  {useNavigate, useParams, useLocation} from 'react-router-dom'

export const CartScreen = () => {
    const navigate = useNavigate()
    const params = useParams()
    const location =  useLocation()
    
    console.log('navigate :>> ', navigate);
    console.log("params", params);
    console.log('location :>> ', location);
    
  return (
  <div>
    <h2>CartScreen</h2>
</div>
);
};
