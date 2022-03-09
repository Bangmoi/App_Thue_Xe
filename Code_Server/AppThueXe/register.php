<?php
	require('connect.php');
	header("Content-type: text/html; charset=utf-8");
	$json =file_get_contents("php://input");
	$obj = json_decode($json,TRUE);
	$username =$obj['username'];
	$password=md5($obj['password']); 
	$dbc=mysqli_connect($Hostname,$Username,$Password,$Database);
	if(!$dbc){
		echo "Kết Nối Không Thành Công!";
	}
	else{
		mysqli_set_charset($dbc,'UTF8');
		$qr="INSERT INTO user VALUES(null,'$username','$password','https://cashkaching.com/images/default-avatar.png','Anonymouse','09*******','Example@gmail.com','Việt Nam','************','1/1/1970')";
		$CheckSQL = "SELECT * FROM user WHERE username='$username'";
		$check = mysqli_fetch_array(mysqli_query($dbc,$CheckSQL));
		if(isset($check)==false){
			mysqli_query($dbc,$qr);
			$MSG='Register success';
			$MSGJson=json_encode($MSG);
			echo $MSGJson;
		}
		else
		{
			$MSG='Register false';
			$MSGJson=json_encode($MSG);
			echo $MSGJson;
		}
		mysqli_close($dbc);
	}
?>