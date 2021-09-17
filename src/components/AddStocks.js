import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { add, setId } from "../features/counter/productsSlice";

const AddStocks = () => {
  const products = useSelector((state) => state.products.products);
  const [selectedProduct, setSelectedProduct] = useState(0);
  const [numItems, setNumItems] = useState(1);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    if (e.target.value > 0) {
      setNumItems(e.target.value);
    } else return;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setId({ id: selectedProduct }));
    dispatch(add({ amount: numItems }));
    alert(
      `${
        numItems === 1
          ? ` 1 item of ${products[selectedProduct].title} added successfully`
          : ` ${numItems} items of ${products[selectedProduct].title} added successfully`
      }`
    );
  };

  return (
    <div className="card">
      <h1 className="title">ADD STOCK</h1>
      <form className="form">
        <p className="label">Select a Product Code</p>

        <select
          name="product"
          onChange={(e) => setSelectedProduct(e.target.value)}
        >
          {products.map((product) => (
            <option key={product.id} value={product.id}>
              {product.title}
            </option>
          ))}
        </select>

        <p className="label">Items Received</p>
        <input
          className="input"
          type="number"
          value={numItems}
          onChange={handleChange}
        />

        <p className="label">Price Per Item Received</p>
        <input
          className="input"
          type="text"
          placeholder={products[selectedProduct].avgPrice.toFixed(2)}
          disabled
        />

        <button className="btn btn-add" type="submit" onClick={handleSubmit}>
          Add Stock
        </button>
      </form>
    </div>
  );
};

export default AddStocks;
