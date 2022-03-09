<?php
	require('connect.php');
	header("Content-type: text/html; charset=utf-8");
	$json =file_get_contents("php://input");
	$obj = json_decode($json,TRUE);
	$username =$obj['username'];
	$password=md5($obj['password']); 
	$passwordnew=md5($obj['passwordnew']); 
	$dbc=mysqli_connect($Hostname,$Username,$Password,$Database);
	if(!$dbc){
		echo "Kết Nối Không Thành Công!";
	}
	else{
		mysqli_set_charset($dbc,'UTF8');
		$qr="UPDATE user SET password='$passwordnew' WHERE username ='$username'" ;
		$CheckSQL = "SELECT username,password FROM user WHERE username='$username' AND password='$password'";
		$check = mysqli_fetch_array(mysqli_query($dbc,$CheckSQL));
		if(isset($check)){
			mysqli_query($dbc,$qr);
			$MSG='ChangePassword success';
			$MSGJson=json_encode($MSG);
			echo $MSGJson;
		}
		else
		{
			$MSG='ChangePassword false';
			$MSGJson=json_encode($MSG);
			echo $MSGJson;
		}
		mysqli_close($dbc);
	}
?>