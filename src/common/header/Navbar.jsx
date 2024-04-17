import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  // Toggle Menu
  const [MobileMenu, setMobileMenu] = useState(false);

  // Xử lý sự kiện khi click vào link
  const handleClick = () => {
    // Nếu đang ở giữa trang, chuyển đến đầu trang
    window.scrollTo({ top: 0, behavior: "smooth" });
    // Đóng mobile menu (nếu đang mở)
    setMobileMenu(false);
  };

  return (
    <>
      <header className="header">
        <div className="container d_flex">
          <div className="navlink">
            <ul
              className={
                MobileMenu ? "nav-links-MobileMenu" : "link f_flex capitalize"
              }
              onClick={() => setMobileMenu(false)}
            >
              <li>
                <Link to="/" onClick={handleClick}>
                  TRANG CHỦ
                </Link>
              </li>
              <li>
                <Link to="/shop" onClick={handleClick}>
                  CỬA HÀNG
                </Link>
              </li>
              <li>
                <Link to="/cart" onClick={handleClick}>
                  CART
                </Link>
              </li>
              <li>
                <Link to="/contact" onClick={handleClick}>
                  CONTACT
                </Link>
              </li>
            </ul>

            <button
              className="toggle"
              onClick={() => setMobileMenu(!MobileMenu)}
            >
              {MobileMenu ? (
                <i className="fas fa-times close home-btn"></i>
              ) : (
                <i className="fas fa-bars open"></i>
              )}
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
