import React, { useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useLocation, useHistory } from "react-router-dom";
import './style/Checkout.css';

const Checkout = () => {
  const location = useLocation();
  const history = useHistory();
  const userInfo = JSON.parse(sessionStorage.getItem("User"));

  const userId = userInfo?.id;

  const { selectedItems } = location.state || { selectedItems: [] };
  useEffect(() => {
    window.scrollTo(0, 0);
    (function () {
      'use strict';
      window.addEventListener('load', function () {
        const forms = document.getElementsByClassName('needs-validation');
        const validation = Array.prototype.filter.call(forms, function (form) {
          form.addEventListener('submit', function (event) {
            if (form.checkValidity() === false) {
              event.preventDefault();
              event.stopPropagation();
            }
            form.classList.add('was-validated');
          }, false);
        });
      }, false);
    })();
  }, []);


  const handlePayment = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    // Giả sử chỉ có một sản phẩm trong đơn hàng để đơn giản hóa
    const selectedItem = selectedItems[0];

    const orderData = {
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      email: formData.get('email'),
      phoneNumber: formData.get('phoneNumber'),
      address: formData.get('address'),
      paymentMethod: formData.get('paymentMethod'),
      price: selectedItem.discount ? calculateDiscountedPrice(selectedItem.price, selectedItem.discount) : selectedItem.price,
      productId: selectedItem?.id,
      userId: 37,

    };

    console.log("userInfo", userInfo);
    console.log("userId", userId);
    try {
      const accessToken = sessionStorage.getItem('accessToken');
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify(orderData)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      console.log('Order successful', result);
      alert('Thanh toán thành công');
      // sessionStorage.removeItem('cartItems');

      history.push('/');
    } catch (error) {
      console.error('There was a problem with the payment request:', error);
      alert('Thanh toán thất bại. Vui lòng thử lại.');
    }
  };

  const calculateDiscountedPrice = (price, discount) => {
    return price - (price * discount / 100);
  };

  //sản phẩm
  return (
    <div style={{ maxWidth: "85%", margin: "0 auto", marginTop: "80px", marginBottom: "80px" }}>
      <div className="row">
        <div className="col-md-8 order-md-1">
          <h4 className="mb-3">Thông tin thanh toán</h4>
          <form className="needs-validation" noValidate onSubmit={handlePayment}>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="firstName">Họ</label>
                <input type="text" className="form-control" id="firstName" name="firstName" placeholder="" required />
                <div className="invalid-feedback">
                  Valid first name is required.
                </div>
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="lastName">Tên</label>
                <input type="text" className="form-control" id="lastName" name="lastName" placeholder="" required />
                <div className="invalid-feedback">
                  Valid last name is required.
                </div>
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="email">Email <span className="text-muted">(Optional)</span></label>
              <input type="email" className="form-control" id="email" name="email" placeholder="you@example.com" />
              <div className="invalid-feedback">
                Please enter a valid email address for shipping updates.
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="phoneNumber">Số điện thoại</label>
              <input type="text" className="form-control" id="phoneNumber" name="phoneNumber" placeholder="" required />
              <div className="invalid-feedback">
                Valid address is required.
              </div>
            </div>

            <div className="col-md-6 mb-3">
              <label htmlFor="address">Địa chỉ</label>
              <input type="text" className="form-control" id="address" name="address" placeholder="" required />
              <div className="invalid-feedback">
                Valid address is required.
              </div>
            </div>

            <div className="custom-control custom-checkbox">
              <input type="checkbox" className="custom-control-input" id="save-info" />
              <label className="custom-control-label" htmlFor="save-info">Lưu địa chỉ giao hàng</label>
            </div>
            <hr className="mb-4" />

            <h4 className="mb-3">Hình thức thanh toán</h4>

            <div className="d-block my-3">
              <div className="custom-control custom-radio">
                <input id="credit" name="paymentMethod" type="radio" className="custom-control-input" value="credit" defaultChecked required />
                <label className="custom-control-label" htmlFor="credit">Thanh toán trực tiếp</label>
              </div>
              <div className="custom-control custom-radio">
                <input id="debit" name="paymentMethod" type="radio" className="custom-control-input" value="debit" required />
                <label className="custom-control-label" htmlFor="debit">Thẻ ngân hàng</label>
              </div>
              <div className="custom-control custom-radio">
                <input id="paypal" name="paymentMethod" type="radio" className="custom-control-input" value="paypal" required />
                <label className="custom-control-label" htmlFor="paypal">Momo</label>
              </div>
            </div>

            <button className="btn btn-primary btn-lg btn-block" type="submit">Continue to checkout</button>
            <div className="back-shop">
              <Link to="/shop">Quay trở lại trang cửa hàng</Link>
            </div>
          </form>
        </div>

        <div className="col-md-4 order-md-2">
          <h4 className="mb-3">Đơn hàng của bạn</h4>
          <ul className="list-group mb-3">
            {selectedItems.map((item, index) => (
              <li key={index} className="list-group-item d-flex justify-content-between lh-condensed">
                <div>
                  <div >
                    <h6 id="nameProduct" name="nameProduct" type="" className="custom-control-input" value="nameProduct" required>{item.name}</h6>
                  </div>
                  <p>
                    <span style={{ color: '#e94560', fontSize: 17, fontWeight: 600, marginBottom: 10 }}>
                      Tổng giá: {item.discount ? (calculateDiscountedPrice(item.price, item.discount) * item.qty).toLocaleString() : (item.price * item.qty).toLocaleString()} VNĐ
                    </span>
                  </p>
                  <div className='img small-img' style={{ width: '100px', height: 'auto', objectFit: 'cover' }}>
                    <img src={item.imageUrl} alt={item.name} style={{ width: '200%', height: '200%', objectFit: 'cover' }} />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
