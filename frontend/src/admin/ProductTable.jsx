import React, { useState, useEffect } from 'react';
import swal from 'sweetalert';
import 'bootstrap/dist/css/bootstrap.min.css';

const ProductTable = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [editing, setEditing] = useState(null);
    const [newProduct, setNewProduct] = useState({ name: '', imageUrl: '', description: '', quantity: 0, price: 0, category: '' });
    const [search, setSearch] = useState('');

    const fetchProducts = () => {
        const accessToken = sessionStorage.getItem('accessToken');
        fetch('http://localhost:8080/api/orders/listProduct', {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            },
        })
            .then(response => response.json())
            .then(data => setProducts(data))
            .catch(error => console.error('Error fetching products:', error));
    };

    useEffect(() => {
        fetchProducts();
        const accessToken = sessionStorage.getItem('accessToken');
        fetch('http://localhost:8080/api/product-category', {
            headers: {

                'Authorization': `Bearer ${accessToken}`
            },
        })
            .then(response => response.json())
            .then(data => setCategories(data))
            .catch(error => console.error('Error fetching categories:', error));
    }, []);

    const handleEdit = (index) => {
        setEditing(index);
        setNewProduct(products[index]);
    };

    const handleDelete = async (index, productId) => {
        try {
            const accessToken = sessionStorage.getItem('accessToken');

            const response = await fetch(`http://localhost:8080/api/products/id/${productId}`, {
                headers: {
                    method: 'DELETE',
                    'Authorization': `Bearer ${accessToken}`
                },
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const updatedProducts = [...products];
            updatedProducts.splice(index, 1);
            setProducts(updatedProducts);
            swal("Thành Công!", "Bạn Đã Xóa Thành Công", "success");
        } catch (error) {
            console.error('Error deleting product:', error);
            swal("Lỗi!", "Không thể xóa sản phẩm", "error");
        }
    };

    const handleSave = async (index, productId) => {
        try {
            const accessToken = sessionStorage.getItem('accessToken');
            const response = await fetch(`http://localhost:8080/api/products/update/${productId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                body: JSON.stringify(newProduct)
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            const updatedProducts = [...products];
            updatedProducts[index] = data;
            setProducts(updatedProducts);
            setEditing(null);
            swal("Thành Công!", "Bạn Đã Cập Nhật Thành Công", "success");
        } catch (error) {
            console.error('Error updating product:', error);
            swal("Lỗi!", "Không thể cập nhật sản phẩm", "error");
        }
    };

    const handleAdd = async () => {
        try {
            const accessToken = sessionStorage.getItem('accessToken');
            const response = await fetch('http://localhost:8080/api/products/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                body: JSON.stringify({
                    name: newProduct.name,
                    imageUrl: newProduct.imageUrl,
                    description: newProduct.description,
                    quantity: newProduct.quantity,
                    price: newProduct.price,
                    category: { id: newProduct.category }  // Ensure category is sent as an object with an id
                }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setProducts([...products, data]);
            setNewProduct({ name: '', imageUrl: '', description: '', quantity: 0, price: 0, category: '' });
            swal("Thành Công!", "Bạn Đã Thêm Thành Công", "success");
        } catch (error) {
            console.error('Error adding product:', error);
            swal("Lỗi!", "Không thể thêm sản phẩm", "error");
        }
    };

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(search.toLowerCase())
    );

    const sortTable = () => {
        const sortedProducts = [...products].sort((a, b) => a.name.localeCompare(b.name));
        setProducts(sortedProducts);
        swal("Thành Công!", "Bạn Đã Lọc Thành Công", "success");
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
                <button className="btn btn-primary me-2" data-bs-toggle="modal" data-bs-target="#addProductModal"><i className="fas fa-user-plus"></i></button>
                <button className="btn btn-secondary me-2" onClick={sortTable}><i className="fa fa-filter"></i></button>
                <button className="btn btn-info me-2"><i className="fas fa-file-import"></i></button>
                <button className="btn btn-warning me-2"><i className="fas fa-cogs"></i></button>
            </div>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Tên sản phẩm</th>
                        <th>Ảnh</th>
                        <th>Mô tả</th>
                        <th>Số lượng</th>
                        <th>Giá</th>
                        <th>Loại</th>
                        <th>Tính Năng</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredProducts.map((product, index) => (
                        <tr key={index}>
                            {editing === index ? (
                                <>
                                    <td><input type="text" className="form-control" value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} /></td>
                                    <td><input type="text" className="form-control" value={newProduct.imageUrl} onChange={(e) => setNewProduct({ ...newProduct, imageUrl: e.target.value })} /></td>
                                    <td><input type="text" className="form-control" value={newProduct.description} onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })} /></td>
                                    <td><input type="number" className="form-control" value={newProduct.quantity} onChange={(e) => setNewProduct({ ...newProduct, quantity: e.target.value })} /></td>
                                    <td><input type="number" className="form-control" value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} /></td>
                                    <td>
                                        <select className="form-select" value={newProduct.category} onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}>
                                            {categories.map((category) => (
                                                <option key={category.id} value={category.id}>{category.name}</option>
                                            ))}
                                        </select>
                                    </td>
                                    <td>
                                        <button className="btn btn-success me-2" onClick={() => handleSave(index, product.id)}><i className="fas fa-save"></i></button>
                                        <button className="btn btn-secondary me-2" onClick={() => handleEdit(index)}><i className="fas fa-times"></i></button>
                                        <button className="btn btn-danger" onClick={() => handleDelete(index, product.id)}><i className="fas fa-trash"></i></button>
                                    </td>
                                </>
                            ) : (
                                <>
                                    <td>{product.name}</td>
                                    <td>
                                        <img src={product.imageUrl} alt={product.name} style={{ width: '100px', height: 'auto' }} />
                                    </td>
                                    <td>{product.description}</td>
                                    <td>{product.quantity}</td>
                                    <td>{product.price}</td>
                                    <td>{product.category.name}</td>
                                    <td>
                                        <button className="btn btn-secondary me-2" onClick={() => handleEdit(index)}><i className="fas fa-pencil-alt"></i></button>
                                    </td>
                                </>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Add Product Modal */}
            <div className="modal fade" id="addProductModal" tabIndex="-1" aria-labelledby="addProductModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="addProductModalLabel">Thêm Sản Phẩm</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label className="form-label">Tên Sản Phẩm</label>
                                    <input type="text" className="form-control" value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Ảnh</label>
                                    <input type="text" className="form-control" value={newProduct.imageUrl} onChange={(e) => setNewProduct({ ...newProduct, imageUrl: e.target.value })} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Mô Tả</label>
                                    <input type="text" className="form-control" value={newProduct.description} onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Số Lượng</label>
                                    <input type="number" className="form-control" value={newProduct.quantity} onChange={(e) => setNewProduct({ ...newProduct, quantity: e.target.value })} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Giá</label>
                                    <input type="number" className="form-control" value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Loại</label>
                                    <select className="form-select" value={newProduct.category} onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}>
                                        {categories.map((category) => (
                                            <option key={category.id} value={category.id}>{category.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <button type="button" className="btn btn-primary" onClick={handleAdd} data-bs-dismiss="modal">Thêm Sản Phẩm</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductTable;