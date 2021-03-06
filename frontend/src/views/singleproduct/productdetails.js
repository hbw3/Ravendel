import React, { Fragment, useState } from "react";
import {
  Button,
  Typography,
  Box,
  InputLabel,
  Select,
  FormControl,
  MenuItem,
  TextField,
  Icon
} from "@material-ui/core";
import { connect } from "react-redux";

const ProductDetail = props => {
  const [product, setProduct] = useState(props.details);
  const [qty, setQty] = useState(1);

  const addToCart = singleProduct => {
    if (
      props.cart.products.some(
        cartproduct => cartproduct.title === singleProduct.title
      )
    ) {
      props.productDetail.cart = true;
      alert("Item already in a Cart");
    } else {
      props.dispatch({
        type: "ADD_VALUE",
        payload: singleProduct
      });
    }
  };

  const handlechange = e => {
    setQty(e.target.value);
  };

  return (
    <Fragment>
      {props.details && (
        <Box component="div" display="flex" className="singleproduct-wrapper">
          <Box component="div" className="singleproduct-details">
            {/* ==========Product Availablity ===========*/}
            {product.availablity && (
              <Typography variant="subtitle1" className="product-availablity">
                {product.availablity}
              </Typography>
            )}

            {/* ==========Product Title ===========*/}
            <Typography variant="h1" className="product-title">
              {product.title}
            </Typography>

            {/* ==========Product Price ===========*/}
            <Typography variant="h3" className="product-price">
              <span className={product.sale_price && "has-sale-price"}>
                ${product.price.toFixed(2)}
              </span>
              {product.sale_price && (
                <span className="sale-price">
                  ${product.sale_price.toFixed(2)}
                </span>
              )}
            </Typography>

            {/* ==========Product Category ===========*/}
            {product.categories &&
              product.categories.map((cat, index) => (
                <Typography
                  variant="button"
                  className="product-category"
                  key={index}
                >
                  {cat.name}
                  {product.categories.length - 1 === index ? "" : ","}
                </Typography>
              ))}

            <div className="custom-divider">
              <hr />
            </div>

            {/* ==========Product Short Desciprtion ===========*/}
            {product.short_desc && (
              <Typography variant="body1" className="product-description">
                {product.short_desc}
              </Typography>
            )}

            <Box component="div" className="qty-wrapper">
              <Typography variant="body1" className="qty-label">
                Qty
              </Typography>
              <Box
                component="div"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                className="qtyIncDecbtn"
              >
                <Button onClick={() => setQty(qty - 1)} size="small">
                  <Icon>remove</Icon>
                </Button>
                <TextField
                  value={qty}
                  size="small"
                  onChange={handlechange}
                  type="number"
                />
                <Button onClick={() => setQty(qty + 1)} size="small">
                  <Icon>add</Icon>
                </Button>
              </Box>
            </Box>

            {/* ==========Product Attributes ===========*/}
            {product && (
              <Box component="div" className="select-attributed-wrapper">
                <FormControl variant="filled" className="select-attributed">
                  <InputLabel htmlFor="size-option">Size</InputLabel>
                  <Select
                    onChange={e => console.log(e)}
                    inputProps={{
                      name: "size",
                      id: "size-option"
                    }}
                  >
                    <MenuItem value={10}>Small</MenuItem>
                    <MenuItem value={20}>Medium</MenuItem>
                    <MenuItem value={30}>Large</MenuItem>
                  </Select>
                </FormControl>
                <FormControl variant="filled" className="select-attributed">
                  <InputLabel htmlFor="color-option">Color</InputLabel>
                  <Select
                    onChange={e => console.log(e)}
                    inputProps={{
                      name: "color",
                      id: "color-option"
                    }}
                  >
                    <MenuItem value={10}>Black</MenuItem>
                    <MenuItem value={20}>Red</MenuItem>
                    <MenuItem value={30}>Orange</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            )}

            <Button
              variant="contained"
              color="primary"
              onClick={() => addToCart(product)}
            >
              Add To Cart
            </Button>
          </Box>
        </Box>
      )}
    </Fragment>
  );
};

const mapStateToProps = state => ({
  cart: state.cart
});

export default connect(mapStateToProps)(ProductDetail);
