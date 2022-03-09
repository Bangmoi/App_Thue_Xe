<?php
	require('connect.php');
	header("Content-type: text/html; charset=utf-8");
	$json =file_get_contents("php://input");
	$obj = json_decode($json,TRUE);
	$identity =$obj['CMND'];
    $username=$obj['username'];

	$dbc=mysqli_connect($Hostname,$Username,$Password,$Database);
	if(!$dbc){
		echo "Kết Nối Không Thành Công!";
	}
	else{
		mysqli_set_charset($dbc,'UTF8');
		$update="UPDATE `user` SET `CMND`='$identity' WHERE username='$username'";
		$CheckSQL = "SELECT * FROM user WHERE username='$username'";
		$check = mysqli_fetch_array(mysqli_query($dbc,$CheckSQL));
		if(isset($check)){
			mysqli_query($dbc,$update);
			$MSG='Update success';
			$MSGJson=json_encode($MSG);
			echo $MSGJson;
		}
		else
		{
			$MSG='Update false';
			$MSGJson=json_encode($MSG);
			echo $MSGJson;
		}
		mysqli_close($dbc);
	}
?>