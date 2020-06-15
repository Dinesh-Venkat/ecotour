package com.theni.ecotourism.service;


import com.theni.ecotourism.pojo.UserReqDetails;

import java.util.List;

public interface UserReqDetailsService {

    public String saveUserDetails(List<UserReqDetails> userReqDetailsList);
}
