import React from 'react';

const ProductEntry = (props) => {
  // const style = {display: 'inline-block'};
  console.log(props.entry.productpic)
  return (
    <div className="ProductEntry-Container">
  
      <div className="ProductEntry-Image">
        <img src={props.entry.productpic}></img>
      </div>

      <div className="ProductEntry-Name">{props.entry.productname}</div>
      <div className="ProductEntry-Price">${props.entry.productprice}</div> 
    </div>
  )
}

export default ProductEntry;