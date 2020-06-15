CREATE TABLE `user_req_details` (
  `user_id` Integer NOT NULL AUTO_INCREMENT,
  `user_name` Varchar(50) NOT NULL,
  `age` Integer NOT NULL,
  `gender` Varchar(50) NOT NULL,
  `mobile_num` Long NOT NULL,
  `email` Varchar(50) NOT NULL,
  `address` Varchar(50) NOT NULL,
  `arrival_date` Varchar(50) NOT NULL,
  `id_proof_type` Varchar(50) NOT NULL,
  `id_proof_details` Varchar(50) NOT NULL,
  `status` Varchar(50) NOT NULL,
  `reason` Varchar(150) NOT NULL,
  PRIMARY KEY (`user_id`)
);