package com.theni.ecotourism.pojo;

import javax.persistence.*;

@Entity
@Table(name="user_req_details")
public class UserReqDetails {

    @Id
    @GeneratedValue
    @Column(name = "user_id")
    private Integer user_id;
    @Column(name = "user_name", nullable = false)
    private String user_name;
    @Column(name = "age", nullable = false)
    private Integer age;
    @Column(name = "gender", nullable = false)
    private String gender;
    @Column(name = "mobile_num", nullable = false)
    private Long mobile_num;
    @Column(name = "email", nullable = false)
    private String email;
    @Column(name = "address", nullable = false)
    private String address;
    @Column(name = "arrival_date", nullable = false)
    private String arrival_date;
    @Column(name = "id_proof_type", nullable = false)
    private String id_proof_type;
    @Column(name = "id_proof_details", nullable = false)
    private String id_proof_details;
    @Column(name = "status", nullable = false)
    private String status;
    @Column(name = "reason", nullable = false)
    private String reason;


    public Integer getUser_id() {
        return user_id;
    }

    public void setUser_id(Integer user_id) {
        this.user_id = user_id;
    }

    public String getUser_name() {
        return user_name;
    }

    public void setUser_name(String user_name) {
        this.user_name = user_name;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public Long getMobile_num() {
        return mobile_num;
    }

    public void setMobile_num(Long mobile_num) {
        this.mobile_num = mobile_num;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getArrival_date() {
        return arrival_date;
    }

    public void setArrival_date(String arrival_date) {
        this.arrival_date = arrival_date;
    }

    public String getId_proof_type() {
        return id_proof_type;
    }

    public void setId_proof_type(String id_proof_type) {
        this.id_proof_type = id_proof_type;
    }

    public String getId_proof_details() {
        return id_proof_details;
    }

    public void setId_proof_details(String id_proof_details) {
        this.id_proof_details = id_proof_details;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }
}
