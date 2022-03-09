<?php
	require('connect.php');
	$json =file_get_contents("php://input");
	$obj = json_decode($json,TRUE);
	$id_username =$obj['id_username'];
	$id_product=$obj['id_product']; 
	// $id_username ="6";
	// $id_product="7"; 
	$dbc=mysqli_connect($Hostname,$Username,$Password,$Database);
	if(!$dbc){
		echo "Kết Nối Không Thành Công!";
	}
	else{
		mysqli_set_charset($dbc,'UTF8');
		$qr="INSERT INTO wait_rent VALUES(NULL,'$id_product','$id_username','Chờ Xác Nhận')";
		$CheckSQL = "SELECT * FROM wait_rent WHERE id_product='$id_product' AND id_username='$id_username'";
		$check = mysqli_fetch_array(mysqli_query($dbc,$CheckSQL));
    	if(isset($check)==false){
			mysqli_query($dbc,$qr);
			$MSG='Rent success';
			$MSGJson=json_encode($MSG);
			echo $MSGJson;
		}
		else
		{
			$MSG='Rent false';
			$MSGJson=json_encode($MSG);
			echo $MSGJson;
		}
		mysqli_close($dbc);
	}
?>