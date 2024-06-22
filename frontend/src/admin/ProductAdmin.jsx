import React from 'react';
import NavbarAdmin from './NavbarAdmin';
import Clock from './Clock';
import '../App.css'
import OrderTable from "./OrderTable";
import ProductTable from "./ProductTable";

function ProductAdmin() {
    return (
        <div className="App">

            <div className="container-fluid al">

                <Clock />
                <ProductTable />
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
