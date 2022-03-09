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
        $qr="DELETE FROM `wait_rent` WHERE id_product='$id_product' AND id_username='$id_username'";
        mysqli_query($dbc,$qr);
        $MSG='Unrent success';
        $MSGJson=json_encode($MSG);
        echo $MSGJson;
        mysqli_close($dbc);
    }

?>