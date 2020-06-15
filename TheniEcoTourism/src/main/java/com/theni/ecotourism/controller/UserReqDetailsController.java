package com.theni.ecotourism.controller;

import com.theni.ecotourism.pojo.UserReqDetails;
import com.theni.ecotourism.service.UserReqDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import javax.mail.*;
import javax.mail.internet.*;
import java.io.IOException;
import java.util.Date;
import java.util.List;
import java.util.Properties;

@RestController
public class UserReqDetailsController {


    @Autowired
    private UserReqDetailsService userReqDetailsService;

    @PostMapping("/userreq")
    public @ResponseBody
    String homePage(@RequestBody List<UserReqDetails> userReqDetailsList){

        try {
            sendmail(userReqDetailsList);
        } catch (MessagingException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }

        return userReqDetailsService.saveUserDetails(userReqDetailsList);


    }
    private void sendmail(List<UserReqDetails> userReqDetailsList ) throws AddressException, MessagingException, IOException {
        Properties props = new Properties();
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.smtp.host", "smtp.gmail.com");
        props.put("mail.smtp.port", "587");

        Session session = Session.getInstance(props, new javax.mail.Authenticator() {
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication("", "");
            }
        });
        Message msg = new MimeMessage(session);
        msg.setFrom(new InternetAddress("mysterys1989@gmail.com", false));

        msg.setRecipients(Message.RecipientType.TO, InternetAddress.parse("er.dinesh26@gmail.com,manisvasan18@gmail.com,hunnyaruvi@yahoo.com,venkat.dinesh91@gmail.com"));
        msg.setSubject("Approval Required for EcoTourism");



        //msg.setContent(emailBodyConstruction(userReqDetailsList), "text/html");
        msg.setSentDate(new Date());

        MimeBodyPart messageBodyPart = new MimeBodyPart();
        messageBodyPart.setContent(emailBodyConstruction(userReqDetailsList), "text/html");

        MimeBodyPart messageBodyPart2 = new MimeBodyPart();
        messageBodyPart2.setContent("<br><br>Thanks,<br>Theni Forest Department","text/html");
        Multipart multipart = new MimeMultipart();
        multipart.addBodyPart(messageBodyPart);
        multipart.addBodyPart(messageBodyPart2);
        msg.setContent(multipart);
        Transport.send(msg);
    }


    private String emailBodyConstruction(List<UserReqDetails> userReqDetailsList){

        StringBuilder emailContent = new StringBuilder();

        emailContent.append("<html><body><table border=1>");
        emailContent.append("<tr><th>USER NAME</th><th>AGE</th><th>GENEDER</th><th>MOBILE NUMBER</th><th>EMAIL</th><th>ADDRESS</th><th>ARRIVAL DATE</th><th>ID PROOF TYPE</th><th>ID PROOF DETAILS</th><th>STATUS</th></tr>");


for(UserReqDetails user : userReqDetailsList ) {

    emailContent.append("<tr><td>" + user.getUser_name() + "</td><td>" + user.getAge() + "</td><td>" + user.getGender() + "</td><td>" + user.getMobile_num() +"</td><td>" + user.getEmail() +"</td><td>"+ user.getAddress() +"</td><td>" + user.getArrival_date() +"</td><td>" + user.getId_proof_type() +"</td><td>" + user.getId_proof_details() +"</td><td>" + user.getStatus() +"</td></tr> ");
}
        emailContent.append("</table></body></html>");

        return emailContent.toString();
    }
}
