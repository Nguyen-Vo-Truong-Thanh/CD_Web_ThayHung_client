package vn.edu.hcmuaf.nvtt.backend.services;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender  javaMailSender;

    public String generateRandomPassword() {

        return RandomStringUtils.randomAlphanumeric(8);
    }

    public void sendOtpEmail(String to, String newPassword) {
        String subject = "Lấy mật khẩu";
        String body = "Mật khẩu mới của bạn là: " + newPassword;
        sendEmail(to, subject, body);
    }

    private void sendEmail(String to, String subject, String body) {
        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);

        try {
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(body);
        } catch (MessagingException e) {
            e.printStackTrace();
        }

        javaMailSender.send(message);
    }
}
