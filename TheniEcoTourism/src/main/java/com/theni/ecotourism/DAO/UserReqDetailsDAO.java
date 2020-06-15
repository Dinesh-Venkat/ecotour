package com.theni.ecotourism.DAO;

import com.theni.ecotourism.pojo.UserReqDetails;
import org.springframework.stereotype.Component;

import java.util.List;


public interface UserReqDetailsDAO {

    String saveUserDetails(List<UserReqDetails> userReqDetailsList);
}
