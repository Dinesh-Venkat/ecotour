package com.theni.ecotourism.service;

import com.theni.ecotourism.pojo.UserReqDetails;
import com.theni.ecotourism.DAO.UserReqDetailsDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class UserReqDetailsServiceImpl implements UserReqDetailsService {

    @Autowired
    private UserReqDetailsDAO userReqDetailsDAO;

    @Override
    @Transactional
    public String saveUserDetails(List<UserReqDetails> userReqDetailsList){
        return userReqDetailsDAO.saveUserDetails(userReqDetailsList);

    }
}
