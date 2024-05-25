import { useHistory } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import logo from "../../components/assets/images/logo.webp";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import './Header.css';
import axios from "axios";

const Search = ({ CartItem }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [shopItems, setShopItems] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (searchTerm.trim() !== "") {
        try {
          const response = await axios.get(`http://localhost:8080/api/products/search?keyword=${searchTerm}`);
          const items = response.data;

          setShopItems(items);
          
          // Extract names for suggestions
          const itemNames = items.map(item => item.name);

          setSuggestions(itemNames.filter(name =>
            name.toLowerCase().includes(searchTerm.toLowerCase())
          ));
        } catch (error) {
          console.error("Error fetching search results:", error);
        }
      } else {
        setSuggestions([]);
      }
    };

    fetchSearchResults();
  }, [searchTerm]);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    if (value.trim() === "") {
      history.push("/");
    }
  };

  

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    history.push(`/search-results?keyword=${encodeURIComponent(suggestion)}`);
    setSearchTerm("");
  };

  return (
    <>
      <section className="search">
        <div className="container">
          <div className="row">
            <div className="col-md-2">
              <div className="logo width">
                <img src={logo} alt="" />
              </div>
            </div>
            <div className="col-md-8">
              <form >
                <div className="search-box f_flex">
                  <i className="fa fa-search"></i>
                  <input
                    name="keyword"
                    type="text"
                    placeholder="Search here..."
                    value={searchTerm}
                    onChange={handleInputChange}
                  />
                  <button className="me-3" type="submit">Search</button>
                </div>
                {suggestions.length > 0 && (
                  <div className="suggestions">
                    {suggestions.map((suggestion, index) => (
                      <div
                        key={index}
                        className="suggestion-item"
                        onClick={() => handleSuggestionClick(suggestion)}
                      >
                        {suggestion}
                      </div>
                    ))}
                  </div>
                )}
              </form>
            </div>
            <div className="col-md-2">
              <div className="icon f_flex width user-shop">
                <div className="account">
                  <Link to="/account">
                    <i className="fa fa-user icon-circle"></i>
                  </Link>
                </div>
                <div className="cart">
                  <Link to="/cart">
                    <i className="fa fa-shopping-bag icon-circle"></i>
                    <span>{CartItem.length === 0 ? "" : CartItem.length}</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Search;
