<?php
		$key = $_POST['key'];
		$email = $_POST['email'];
		$subject = "Confirm your account";

		$headers .= "Reply-To: Video Production <videoproduction@gmail.com>\r\n"; 
		$headers .= "Return-Path: Video Production <videoproduction@gmail.com>\r\n"; 
		$headers .= "From: Video Production <videoproduction@gmail.com>\r\n";  
		$headers .= "Organization: Sender Organization\r\n";
		$headers .= "MIME-Version: 1.0\r\n";
		$headers .= "Content-type: text/plain; charset=iso-8859-1\r\n";
		$headers .= "X-Priority: 3\r\n";
		$headers .= "X-Mailer: PHP". phpversion() ."\r\n" ;
	
	
		$body = @"Email sent from ".$_SERVER['REMOTE_ADDR']." at ".date("d/m/Y H:i",time())."

		$key";
	
		// Send me an Email!!!!
		if(mail($email, $subject, $body, $headers)) {
			die("true");
			echo "Mail send";
		} else {
			die("There was an error sending the email.");
			echo "Mail was not send";
		}
?> 