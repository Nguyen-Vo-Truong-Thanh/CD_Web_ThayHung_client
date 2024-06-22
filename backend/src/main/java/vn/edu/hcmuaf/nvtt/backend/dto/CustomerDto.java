package vn.edu.hcmuaf.nvtt.backend.dto;




public class CustomerDto {
    private  Long id;
    private String tenKhachHang;
    private String soDienThoai;
    private String email;
    private String diaChi;

    public CustomerDto(Long id, String tenKhachHang, String soDienThoai, String email, String diaChi) {
        this.id = id;
        this.tenKhachHang = tenKhachHang;
        this.soDienThoai = soDienThoai;
        this.email = email;
        this.diaChi = diaChi;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTenKhachHang() {
        return tenKhachHang;
    }

    public void setTenKhachHang(String tenKhachHang) {
        this.tenKhachHang = tenKhachHang;
    }

    public String getSoDienThoai() {
        return soDienThoai;
    }

    public void setSoDienThoai(String soDienThoai) {
        this.soDienThoai = soDienThoai;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getDiaChi() {
        return diaChi;
    }

    public void setDiaChi(String diaChi) {
        this.diaChi = diaChi;
    }
}
