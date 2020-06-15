package com.theni.ecotourism.DAO;

import com.theni.ecotourism.pojo.UserReqDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository("UserReqDetailsDAO")
public class UserReqDetailsDAOImpl implements UserReqDetailsDAO {

    @Autowired
    private UserReqDetailsRepo userReqDetailsRepo;


    @Override
    public String saveUserDetails(List<UserReqDetails> userReqDetailsList) {

        userReqDetailsRepo.saveAll(userReqDetailsList);

        return "Saved";
    }
}
