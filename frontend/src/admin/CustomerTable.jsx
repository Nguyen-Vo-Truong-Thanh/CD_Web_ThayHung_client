import React, { useState, useEffect } from 'react';
import swal from 'sweetalert';
import 'bootstrap/dist/css/bootstrap.min.css';

const Table = () => {
    const [employees, setEmployees] = useState([]);
    const [editing, setEditing] = useState(null);
    const [newEmployee, setNewEmployee] = useState({ tenKhachHang: '', soDienThoai: '', email: '', diaChi: '' });
    const [search, setSearch] = useState('');

    useEffect(() => {
        fetch('http://localhost:8080/getAllUser')
            .then(response => response.json())
            .then(data => {
                setEmployees(data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const handleEdit = (index) => {
        setEditing(index);
        setNewEmployee(employees[index]);
    };
    const handleDelete = (index) => {
        const updatedEmployees = [...employees];
        updatedEmployees.splice(index, 1);
        setEmployees(updatedEmployees);
        swal("Thành Công!", "Bạn Đã Xóa Thành Công", "success");
    };
    const handleSave = (index) => {
        const updatedEmployees = [...employees];
        updatedEmployees[index] = newEmployee;
        setEmployees(updatedEmployees);
        setEditing(null);
        swal("Thành Công!", "Bạn Đã Cập Nhật Thành Công", "success");
    };
    const handleAdd = () => {
        setEmployees([...employees, newEmployee]);
        setNewEmployee({ tenKhachHang: '', soDienThoai: '', email: '', diaChi: '' });
        swal("Thành Công!", "Bạn Đã Thêm Thành Công", "success");
    };

    const filteredEmployees = employees.filter(employee =>
        employee.tenKhachHang.toLowerCase().includes(search.toLowerCase())
    );

    const sortTable = () => {
        const sortedEmployees = [...employees].sort((a, b) => a.tenKhachHang.localeCompare(b.tenKhachHang));
        setEmployees(sortedEmployees);
        swal("Thành Công!", "Bạn Đã Lọc Thành Công", "success");
    };

    return (
        <div className="container mt-4">
            <div className="mb-3">
                <p className="h5">TÌM KIẾM KHÁCH HÀNG:</p>
                <div className="input-group">
                    <input type="text" className="form-control" onChange={(e) => setSearch(e.target.value)} placeholder="Nhập tên Khách hàng cần tìm..." />
                    <span className="input-group-text"><i className="fa fa-search"></i></span>
                </div>
            </div>
            <div className="mb-3">
                <p className="h5">CHỨC NĂNG CHÍNH:</p>
                <button className="btn btn-primary me-2" onClick={handleAdd}><i className="fas fa-user-plus"></i></button>
                <button className="btn btn-secondary me-2" onClick={sortTable}><i className="fa fa-filter"></i></button>
                <button className="btn btn-info me-2"><i className="fas fa-file-import"></i></button>
                <button className="btn btn-warning me-2"><i className="fas fa-cogs"></i></button>
            </div>
            <table className="table table-bordered">
                <thead>
                <tr>
                    <th>Tên Khách hàng</th>
                    <th>Số Điện Thoại</th>
                    <th>Email</th>
                    <th>Địa Chỉ</th>
                    <th>Tính Năng</th>
                </tr>
                </thead>
                <tbody>
                {filteredEmployees.map((employee, index) => (
                    <tr key={index}>
                        {editing === index ? (
                            <>
                                <td><input type="text" className="form-control" value={newEmployee.tenKhachHang} onChange={(e) => setNewEmployee({ ...newEmployee, tenKhachHang: e.target.value })} /></td>
                                <td><input type="text" className="form-control" value={newEmployee.soDienThoai} onChange={(e) => setNewEmployee({ ...newEmployee, soDienThoai: e.target.value })} /></td>
                                <td><input type="text" className="form-control" value={newEmployee.email} onChange={(e) => setNewEmployee({ ...newEmployee, email: e.target.value })} /></td>
                                <td><input type="text" className="form-control" value={newEmployee.diaChi} onChange={(e) => setNewEmployee({ ...newEmployee, diaChi: e.target.value })} /></td>
                                <td>
                                    <button className="btn btn-success me-2" onClick={() => handleSave(index)}><i className="fas fa-save"></i></button>
                                    <button className="btn btn-secondary me-2" onClick={() => setEditing(null)}><i className="fas fa-times"></i></button>
                                    <button className="btn btn-danger" onClick={() => handleDelete(index)}><i className="fas fa-trash"></i></button>
                                </td>
                            </>
                        ) : (
                            <>
                                <td>{employee.tenKhachHang}</td>
                                <td>{employee.soDienThoai}</td>
                                <td>{employee.email}</td>
                                <td>{employee.diaChi}</td>
                                <td>
                                    <button className="btn btn-secondary me-2" onClick={() => handleEdit(index)}><i className="fas fa-pencil-alt"></i></button>
                                    <button className="btn btn-danger" onClick={() => handleDelete(index)}><i className="fas fa-trash"></i></button>
                                </td>
                            </>
                        )}
                    </tr>
                ))}
                </tbody>
            </table>
            <div id="pageNavPosition" className="text-right"></div>
        </div>
    );
};

export default Table;
