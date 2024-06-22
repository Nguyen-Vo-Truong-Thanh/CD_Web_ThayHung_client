package vn.edu.hcmuaf.nvtt.backend.dto;

import java.math.BigDecimal;

public class OrderDto {
    private Long id;
    private String tenSanPham;
    private String email;
    private String soDienThoai;
    private BigDecimal gia;
    private String diaChi;
    private int tinhTrangDonHang;

    public OrderDto(Long id, String tenSanPham, String email, String soDienThoai, BigDecimal gia, String diaChi, int tinhTrangDonHang) {
        this.id = id;
        this.tenSanPham = tenSanPham;
        this.email = email;
        this.soDienThoai = soDienThoai;
        this.gia = gia;
        this.diaChi = diaChi;
        this.tinhTrangDonHang = tinhTrangDonHang;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTenSanPham() {
        return tenSanPham;
    }

    public void setTenSanPham(String tenSanPham) {
        this.tenSanPham = tenSanPham;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSoDienThoai() {
        return soDienThoai;
    }

    public void setSoDienThoai(String soDienThoai) {
        this.soDienThoai = soDienThoai;
    }

    public BigDecimal getGia() {
        return gia;
    }

    public void setGia(BigDecimal gia) {
        this.gia = gia;
    }

    public String getDiaChi() {
        return diaChi;
    }

    public void setDiaChi(String diaChi) {
        this.diaChi = diaChi;
    }

    public int getTinhTrangDonHang() {
        return tinhTrangDonHang;
    }

    public void setTinhTrangDonHang(int tinhTrangDonHang) {
        this.tinhTrangDonHang = tinhTrangDonHang;
    }
}
