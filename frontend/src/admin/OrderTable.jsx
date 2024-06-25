import React, { useState, useEffect } from 'react';
import swal from 'sweetalert';

const OrderTable = () => {
    const [orders, setOrders] = useState([]);
    const [editing, setEditing] = useState(null);
    const [currentOrder, setCurrentOrder] = useState(null);
    const [newOrder, setNewOrder] = useState({ tenSanPham: '', email: '', soDienThoai: '', gia: '', diaChi: '', tinhTrangDonHang: 0 });
    const [search, setSearch] = useState('');
    const [reload, setReload] = useState(false); // State to trigger reloading

    const fetchOrders = () => {
        const accessToken = sessionStorage.getItem('accessToken');
        fetch('http://localhost:8080/api/orders/listOrder', {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            },
        })
            .then(response => response.json())
            .then(data => setOrders(data))
            .catch(error => console.error('Error fetching orders:', error));
    };

    useEffect(() => {
        fetchOrders();
    }, [reload]); // Reload when 'reload' state changes

    const handleEdit = (index) => {
        setEditing(index);
        setCurrentOrder(orders[index]);
        setNewOrder(orders[index]);
    };


    const handleSave = async (index) => {
        const orderToUpdate = orders[index];
        const updatedOrders = [...orders];

        try {
            await updateOrderStatus(orderToUpdate.id, newOrder.tinhTrangDonHang);
            updatedOrders[index] = newOrder;
            setOrders(updatedOrders);
            setEditing(null);
            setCurrentOrder(null);
            swal("Thành Công!", "Bạn Đã Cập Nhật Thành Công", "success");
            setReload(!reload); // Trigger reload to fetch the latest data
        } catch (error) {
            console.error('Error updating order status:', error);
            swal("Lỗi!", "Không Thể Cập Nhật Trạng Thái Đơn Hàng", "error");
        }
    };

    const handleAdd = () => {
        setOrders([...orders, newOrder]);
        setNewOrder({ tenSanPham: '', email: '', soDienThoai: '', gia: '', diaChi: '', tinhTrangDonHang: 0 });
        swal("Thành Công!", "Bạn Đã Thêm Thành Công", "success");
    };

    const handleCancelEdit = () => {
        setEditing(null);
        setNewOrder({ tenSanPham: '', email: '', soDienThoai: '', gia: '', diaChi: '', tinhTrangDonHang: 0 });
        setCurrentOrder(null);
    };

    const filteredOrders = orders.filter(order =>
        order.tenSanPham.toLowerCase().includes(search.toLowerCase())
    );

    const sortTable = () => {
        const sortedOrders = [...orders].sort((a, b) => a.tenSanPham.localeCompare(b.tenSanPham));
        setOrders(sortedOrders);
        swal("Thành Công!", "Bạn Đã Lọc Thành Công", "success");
    };
    const accessToken = sessionStorage.getItem('accessToken');
    const updateOrderStatus = (id, newStatus) => {
        return fetch(`http://localhost:8080/api/orders/${id}/status?newStatus=${newStatus}`, {
            method: 'PUT',
            'Authorization': `Bearer ${accessToken}`
        })
            .then(response => {
                if (response.ok) {
                    return response.text();
                } else {
                    throw new Error('Failed to update order status');
                }
            });
    };

    return (
        <div className="container mt-4">
            <div className="mb-3">
                <p className="h5">TÌM KIẾM SẢN PHẨM:</p>
                <div className="input-group">
                    <input type="text" className="form-control" onChange={(e) => setSearch(e.target.value)} placeholder="Nhập tên sản phẩm cần tìm..." />
                    <span className="input-group-text"><i className="fa fa-search"></i></span>
                </div>
            </div>
            <div className="mb-3">
                <p className="h5">CHỨC NĂNG CHÍNH:</p>
                <button className="btn btn-primary me-2" type="button" onClick={handleAdd}><i className="fas fa-user-plus"></i></button>
                <button className="btn btn-secondary me-2" type="button" onClick={sortTable}><i className="fa fa-filter"></i></button>
                <button className="btn btn-info me-2"><i className="fas fa-file-import"></i></button>
                <button className="btn btn-warning me-2"><i className="fas fa-cogs"></i></button>
            </div>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Tên sản phẩm</th>
                        <th>Email</th>
                        <th>Số điện thoại</th>
                        <th>Giá</th>
                        <th>Địa chỉ</th>
                        <th>Tình Trạng đơn hàng</th>
                        <th>Tính Năng</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredOrders.map((order, index) => (
                        <tr key={index}>
                            {editing === index ? (
                                <>
                                    <td><input type="text" className="form-control" value={newOrder.tenSanPham} onChange={(e) => setNewOrder({ ...newOrder, tenSanPham: e.target.value })} /></td>
                                    <td><input type="text" className="form-control" value={newOrder.email} onChange={(e) => setNewOrder({ ...newOrder, email: e.target.value })} /></td>
                                    <td><input type="text" className="form-control" value={newOrder.soDienThoai} onChange={(e) => setNewOrder({ ...newOrder, soDienThoai: e.target.value })} /></td>
                                    <td><input type="text" className="form-control" value={newOrder.gia} onChange={(e) => setNewOrder({ ...newOrder, gia: e.target.value })} /></td>
                                    <td><input type="text" className="form-control" value={newOrder.diaChi} onChange={(e) => setNewOrder({ ...newOrder, diaChi: e.target.value })} /></td>
                                    <td>
                                        <select className="form-select" value={newOrder.tinhTrangDonHang} onChange={(e) => {
                                            const status = e.target.value;
                                            setNewOrder({ ...newOrder, tinhTrangDonHang: status });
                                        }}>
                                            <option value="1">Đã xử lý</option>
                                            <option value="0">Chưa xử lý</option>
                                        </select>
                                    </td>
                                    <td>
                                        <button className="btn btn-success me-2" onClick={() => handleSave(index)}><i className="fas fa-save"></i></button>
                                    </td>
                                </>
                            ) : (
                                <>
                                    <td>{order.tenSanPham}</td>
                                    <td>{order.email}</td>
                                    <td>{order.soDienThoai}</td>
                                    <td>{order.gia}</td>
                                    <td>{order.diaChi}</td>
                                    <td style={{ textAlign: 'center', margin: '4px 50px', display: 'inline-block', padding: '0.25em 0.4em', fontSize: '75%', fontWeight: '700', lineHeight: '1', whiteSpace: 'nowrap', verticalAlign: 'baseline', borderRadius: '0.375rem', backgroundColor: order.tinhTrangDonHang === 1 ? '#198754' : '#ffc107', color: order.tinhTrangDonHang === 1 ? 'white' : 'black' }}>
                                        {order.tinhTrangDonHang === 1 ? 'Đã xử lý' : 'Chưa xử lý'}
                                    </td>
                                    <td>
                                        <button className="btn btn-secondary me-2" onClick={() => handleEdit(index)}><i className="fas fa-edit"></i></button>

                                    </td>
                                </>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default OrderTable;