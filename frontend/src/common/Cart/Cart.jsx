import React, { useState, useEffect } from "react";
import "./style.css";
import { Button } from 'antd';
import { useHistory } from "react-router-dom";

const Cart = ({ CartItem, setCartItems, addToCart, decreaseQty, updateQty, removeFromCart }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const history = useHistory();

  const calculateDiscountedPrice = (price, discount) => {
    return price - (price * discount / 100);
  };

  useEffect(() => {
    const storedSelectedItems = JSON.parse(sessionStorage.getItem("selectedItems"));
    if (storedSelectedItems && storedSelectedItems.length > 0) {
      setSelectedItems(storedSelectedItems);
    }
  }, []);

  useEffect(() => {
    const selectedPrice = selectedItems.reduce((total, item) => {
      const productPrice = item.discount ? calculateDiscountedPrice(item.price, item.discount) : item.price;
      return total + productPrice * item.qty;
    }, 0);
    setTotalPrice(selectedPrice);

    if (selectedItems.length > 0) {
      sessionStorage.setItem("selectedItems", JSON.stringify(selectedItems));
    }
  }, [selectedItems]);

  useEffect(() => {
    if (CartItem.length > 0) {
      sessionStorage.setItem("CartItem", JSON.stringify(CartItem));
    }
  }, [CartItem]);

  const handleToggleItem = (event, item) => {
    const isChecked = event.target.checked;
    let updatedItems;
    if (isChecked) {
      updatedItems = [...selectedItems, item];
    } else {
      updatedItems = selectedItems.filter(selectedItem => selectedItem.id !== item.id);
    }
    setSelectedItems(updatedItems);
  };

  const handleUpdateCart = (updatedItems) => {
    setSelectedItems(updatedItems);
    sessionStorage.setItem("selectedItems", JSON.stringify(updatedItems));
  };

  const handleRemoveFromCart = (item) => {
    removeFromCart(item);
    const updatedCartItems = CartItem.filter(cartItem => cartItem.id !== item.id);
    const updatedSelectedItems = selectedItems.filter(selectedItem => selectedItem.id !== item.id);
    setCartItems(updatedCartItems);  // Update CartItem after removal
    setSelectedItems(updatedSelectedItems);  // Update selectedItems after removal
    sessionStorage.setItem("CartItem", JSON.stringify(updatedCartItems));
    sessionStorage.setItem("selectedItems", JSON.stringify(updatedSelectedItems));
  };

  const handleCheckout = () => {
    history.push({
      pathname: "/checkout",
      state: { selectedItems: selectedItems }
    });
    sessionStorage.removeItem("CartItem");
    sessionStorage.removeItem("selectedItems");
  };

  return (
    <>
      <section className='cart-items'>
        <div className='container d_flex'>
          <div className='cart-details'>
            {CartItem.length === 0 && <h1 className='no-items product'>Không có sản phẩm nào được thêm vào giỏ hàng</h1>}

            {CartItem.map((item) => {
              const productPrice = item.discount ? calculateDiscountedPrice(item.price, item.discount) : item.price;
              const productQty = productPrice * item.qty;
              const isSelected = selectedItems.some(selectedItem => selectedItem.id === item.id);

              return (
                <div className='cart-list product d_flex' key={item.id}>
                  <input
                    type="checkbox"
                    onChange={(event) => handleToggleItem(event, item)}
                    checked={isSelected}
                  />
                  <div className='img'>
                    <img src={item.imageUrl} alt={item.name} />
                  </div>
                  <div className='cart-details'>
                    <h3>{item.name}</h3>
                    <h4>
                      {item.discount > 0 ? (
                        <div>
                          <h4 style={{ textDecoration: 'line-through', color: 'gray', marginLeft: 20, fontSize: 17 }}>
                            {(item.price * item.qty).toLocaleString()} VNĐ
                          </h4>
                          <h4 style={{ fontWeight: 'bold', marginLeft: 20, color: '#e94560', fontSize: 17 }}>
                            {calculateDiscountedPrice((item.price * item.qty), item.discount).toLocaleString()} VNĐ
                          </h4>
                        </div>
                      ) : (
                        <h4 style={{ fontWeight: 'bold', marginLeft: 20, color: '#e94560', fontSize: 17 }}>
                          {(item.price * item.qty).toLocaleString()} VNĐ
                        </h4>
                      )}
                    </h4>
                  </div>
                  <div className='cart-items-function'>
                    <div className='removeCart'>
                      <button className='removeCart' onClick={() => handleRemoveFromCart(item)}>
                        <i className='fa-solid fa-xmark'></i>
                      </button>
                    </div>
                    <div className='cartControl d_flex'>
                      <button className='incCart' onClick={() => {
                        addToCart(item);
                        const updatedItems = CartItem.map(cartItem => cartItem.id === item.id ? { ...cartItem, qty: cartItem.qty + 1 } : cartItem);
                        handleUpdateCart(updatedItems);
                      }}>
                        <i className='fa-solid fa-plus'></i>
                      </button>
                      <input
                        className='inputQty'
                        value={item.qty}
                        min="1"
                        onChange={(event) => {
                          const newQty = parseInt(event.target.value);
                          updateQty(item, newQty);
                          const updatedItems = CartItem.map(cartItem => cartItem.id === item.id ? { ...cartItem, qty: newQty } : cartItem);
                          handleUpdateCart(updatedItems);
                        }}
                      />
                      <button className='desCart' onClick={() => {
                        decreaseQty(item);
                        const updatedItems = CartItem.map(cartItem => cartItem.id === item.id ? { ...cartItem, qty: cartItem.qty - 1 } : cartItem);
                        handleUpdateCart(updatedItems);
                      }}>
                        <i className='fa-solid fa-minus'></i>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          {selectedItems.length > 0 && (
            <div className='cart-total product'>
              <h2>Sản phẩm của bạn</h2>
              {selectedItems.map((item) => (
                <div key={item.id}>
                  <span>{item.name}</span>
                  <span style={{ color: '#e94560', fontSize: 17, fontWeight: 600, marginBottom: 10 }}>
                    {item.discount
                      ? (calculateDiscountedPrice(item.price, item.discount) * item.qty).toLocaleString()
                      : (item.price * item.qty).toLocaleString()} VNĐ
                  </span>
                </div>
              ))}
              <div className='d_flex mt-3'>
                <h4>Total Price :</h4>
                <h3>{totalPrice.toLocaleString()} VNĐ</h3>
              </div>
              <div className="btn btn-danger mt-3" style={{ display: 'flex', justifyContent: "center" }}>
                <Button type="danger" onClick={handleCheckout}>
                  Thanh toán
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Cart;
