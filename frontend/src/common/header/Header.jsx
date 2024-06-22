import React, {useEffect, useState} from "react";
import "./Header.css";
import Search from "./Search";
import Navbar from "./Navbar";
import NavbarAdmin from "../../admin/NavbarAdmin";

const Header = ({ CartItem }) => {

  const [roleData, setRoleData] = useState(null);
  useEffect(() => {
    const roleData = sessionStorage.getItem('roleData');
    if (roleData) {
      setRoleData(JSON.parse(roleData));
    }
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
      {roleData === 1 ? <Navbar /> : roleData === 2 ? <NavbarAdmin /> : <Navbar />}

    </>
  );
};

export default Header;
