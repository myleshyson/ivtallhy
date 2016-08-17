<?php

add_action( 'wp_ajax_mail', 'mail_callback' );
add_action( 'wp_ajax_nopriv_mail', 'mail_callback' );


function mail_callback () {

	$name = strip_tags(trim($_POST["name"]));
	$name = str_replace(array("\r","\n"),array(" "," "),$name);
	$email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
	$campus = $_POST['campus'];
	$number = $_POST['number'];
	$comments = strip_tags(trim($_POST["comments"]));
	$address = strip_tags(trim($_POST["address"]));

	// Check that data was sent to the mailer.
        if ( empty($name) OR !filter_var($email, FILTER_VALIDATE_EMAIL)) {
            // Set a 400 (bad request) response code and exit.
            http_response_code(400);
            echo "Oops! There was a problem with your submission. Please complete the form and try again.";
            exit;
        }

        if( !empty($address)) {
        	echo "Don't Spam Me Bro";
        	exit;
        }

        

        $recipient = '"'.get_option('admin_email').'"';
        $subject = "New contact from $name";
       	$body_template = file_get_contents(TEMPLATEPATH . '/email/new-student.php');
       	$body = str_ireplace('[name]',$name, $body_template);
    	$body = str_ireplace('[email]',$email, $body);
    	$body = str_ireplace('[number]',$number, $body);
    	$body = str_ireplace('[campus]',$campus, $body);
    	$body = str_ireplace('[comments]',$comments, $body);

       	$headers  = 'MIME-Version: 1.0' . "\r\n";
    	$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";


	 wp_mail($recipient, $subject, $body, $headers);

     echo 'email sent';
        die();


}

