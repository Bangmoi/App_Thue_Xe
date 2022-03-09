<?php
    require("connect.php");
    $json =file_get_contents("php://input");
	$obj = json_decode($json,TRUE);
	$id_product =$obj["id_product"];
    $id_username =$obj["id_username"];
    // $id_product ="8";$id_username ="6";
    $dbc=mysqli_connect($Hostname,$Username,$Password,$Database);
	if(!$dbc){
		echo "Kết Nối Không Thành Công!";
	}
	else{
	mysqli_set_charset($dbc,'UTF8');
    $CheckSQL="SELECT * FROM wait_rent WHERE id_product='$id_product' AND id_username='$id_username' ";
    $check = mysqli_fetch_array(mysqli_query($dbc,$CheckSQL));
    $result = mysqli_query($dbc,$CheckSQL);
    $status =array();
		if(isset($check)){
            $status['id']=$check['id'];
            $status['id_product']=$check['id_product'];
            $status['id_username']=$check['id_username'];
            $status['status']=$check['status'];
            echo json_encode($status);
		}
		else
		{
			$MSG='Not Rent';
			$MSGJson=json_encode($MSG);
			echo $MSGJson;
		}
		mysqli_close($dbc);
    }
?>