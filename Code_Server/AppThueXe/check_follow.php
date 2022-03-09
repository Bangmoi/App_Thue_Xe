<?php
    require("connect.php");
    $json =file_get_contents("php://input");
	$obj = json_decode($json,TRUE);
	$id_product =$obj["id_product"];
    $id_username =$obj["id_username"];
    //$id_product ="1";
    $dbc=mysqli_connect($Hostname,$Username,$Password,$Database);
	if(!$dbc){
		echo "Kết Nối Không Thành Công!";
	}
	else{
	mysqli_set_charset($dbc,'UTF8');
    $CheckSQL="SELECT * FROM follow WHERE id_username='$id_username' AND id_product='$id_product' ";
    $check = mysqli_fetch_array(mysqli_query($dbc,$CheckSQL));
		if(isset($check)){
			$MSG='Followed';
			$MSGJson=json_encode($MSG);
			echo $MSGJson;
		}
		else
		{
			$MSG='Not Follow';
			$MSGJson=json_encode($MSG);
			echo $MSGJson;
		}
		mysqli_close($dbc);
    }

?>