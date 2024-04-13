import React from "react";
import "./Header.css";
import Search from "./Search";
import Navbar from "./Navbar";

const Header = ({ CartItem }) => {
  window.addEventListener("scroll", function () {
    const header = document.querySelector(".header");
    header.classList.toggle("active", window.scrollY > 100);
  });
  return (
    <>
      <Search CartItem={CartItem} />
      <Navbar />
    </>
  );
};

export default Header;
