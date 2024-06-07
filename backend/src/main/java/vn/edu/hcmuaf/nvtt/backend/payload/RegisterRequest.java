package vn.edu.hcmuaf.nvtt.backend.payload;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import vn.edu.hcmuaf.nvtt.backend.entity.UserRole;

@Data
public class RegisterRequest {

    private String fullName;
    private String email;
    private String phoneNumber;
    private String password;
    private String address;



    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

}