using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Net.Mail;
using System.Net;

namespace Sample_BugTracker.API.Services
{
    public class MailService
    {
        private const string smtpHost = "smtp.gmail.com";
        private const int smtpPort = 587;  // 587 465 25
        private const string senderEmail = "kvisland20@gmail.com";
        private const string senderDisplayName = "Andrew";
        private const string senderPassword = "praia_dodoma";


        public void Send(string recipientAdress, string subjectMsg, string bodyMsg, bool isBodyHtml = false)
        {
            MailAddress sender = new MailAddress(senderEmail, senderDisplayName);
            MailAddress recipient = new MailAddress(recipientAdress);
            MailMessage message = new MailMessage(sender, recipient)
            {
                Subject = subjectMsg,
                IsBodyHtml = isBodyHtml,
                Body = bodyMsg,
            };
            SmtpClient smtp = new SmtpClient(smtpHost, smtpPort)
            {
                UseDefaultCredentials = false,
                DeliveryMethod = SmtpDeliveryMethod.Network,
                Credentials = new NetworkCredential(senderEmail, senderPassword),
                EnableSsl = true
            };
            smtp.Send(message);
        }
    }
}