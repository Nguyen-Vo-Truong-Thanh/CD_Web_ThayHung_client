import React, { useState } from 'react';
import NavbarAdmin from './NavbarAdmin';
import Clock from './Clock';
import '../App.css';
import OrderTable from "./OrderTable";
import ProductTable from "./ProductTable";
import axios from 'axios';

function ProductAdmin() {
    const [error, setError] = useState(null);

    const handleUpdateProduct = async (productId, updatedProductData) => {
        try {
            const response = await axios.put(`http://localhost:8080/api/products/update/${productId}`, updatedProductData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log('Product updated successfully:', response.data);
        } catch (error) {
            setError(error.message || 'Cập nhật sản phẩm thất bại');
            console.error('Error updating product:', error);
        }
    };

    return (
        <div className="App">
            <div className="container-fluid al">
                <Clock />
                <ProductTable onUpdateProduct={handleUpdateProduct} />
            </div>
            <hr className="hr1" />
            <div className="container-fluid end">
                <div className="row text-center">
                    <div className="col-lg-12 link">
                        <i className="fab fa-facebook-f me-3"></i>
                        <i className="fab fa-instagram me-3"></i>
                        <i className="fab fa-youtube me-3"></i>
                        <i className="fab fa-google me-3"></i>
                    </div>
                    <div className="col-lg-12 mt-2">
                        2019 CopyRight Phan mem quan ly | Design by <a href="#">TruongBinIT</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductAdmin;
