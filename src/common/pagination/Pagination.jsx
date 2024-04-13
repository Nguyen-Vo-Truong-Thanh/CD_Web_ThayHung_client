import React from "react";
import "./Pagination.css";
import { Link } from "react-router-dom";

const Pagination = () => {
  return (
    <div className="pagination">
      <div className="container">
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            <li className="page-item">
              <Link to="/" className="page-link">
                Previous
              </Link>
            </li>
            <li className="page-item">
              <Link to="/" className="page-link">
                1
              </Link>
            </li>
            <li className="page-item">
              <Link to="/" className="page-link">
                2
              </Link>
            </li>
            <li className="page-item">
              <Link to="/" className="page-link">
                3
              </Link>
            </li>
            <li className="page-item">
              <Link to="/" className="page-link">
                4
              </Link>
            </li>
            <li className="page-item">
              <Link to="/" className="page-link">
                5
              </Link>
            </li>
            <li className="page-item">
              <Link to="/" className="page-link">
                6
              </Link>
            </li>
            <li className="page-item">
              <Link to="/" className="page-link">
                Next
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};
export default Pagination;
