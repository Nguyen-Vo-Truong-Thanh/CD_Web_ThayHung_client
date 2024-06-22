import React from 'react';

const NavbarAdmin = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">
                    <i className="fa fa-user-circle" aria-hidden="true"></i> QUẢN LÝ NHÂN VIÊN
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <a className="nav-link" href="/customerAdmin" data-bs-toggle="tooltip" data-bs-placement="bottom" title="NHÂN VIÊN">NHÂN VIÊN</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/productAdmin" data-bs-placement="bottom" title="Sản phẩm">Sản phẩm</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/orderAdmin" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Đơn Hàng">ĐƠN HÀNG</a>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false" title="TÀI KHOẢN">
                                <b>Tài Khoản</b>
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><a className="dropdown-item" href="/index.html" data-bs-toggle="tooltip" data-bs-placement="bottom" title="ĐĂNG XUẤT"><b>Đăng xuất <i className="fas fa-sign-out-alt"></i></b></a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default NavbarAdmin;