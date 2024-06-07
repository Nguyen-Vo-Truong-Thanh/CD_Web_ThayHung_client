import React, { useEffect } from "react";
import "./Header.css";
import Search from "./Search";
import Navbar from "./Navbar";

const Header = ({ CartItem }) => {
  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector(".header");
      if (header) {
        header.classList.toggle("active", window.scrollY > 100);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // Chỉ gắn sự kiện scroll một lần khi component được tạo

  return (
    <>
      <Search CartItem={CartItem} />
      <Navbar />
    </>
  );
};

export default Header;
