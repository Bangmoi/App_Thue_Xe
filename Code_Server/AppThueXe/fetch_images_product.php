<?php
    require("connect.php");
    $json =file_get_contents("php://input");
	$obj = json_decode($json,TRUE);
	$id_product =$obj["id_product"];
    //$id_product ="1";
    $dbc=mysqli_connect($Hostname,$Username,$Password,$Database);
	if(!$dbc){
		echo "Kết Nối Không Thành Công!";
	}
	else{
	mysqli_set_charset($dbc,'UTF8');
    $qr="SELECT * FROM product_images WHERE id_product='$id_product' ORDER BY RAND()";
    $qr1="SELECT * FROM products WHERE id_product='$id_product'";
    $result = mysqli_query($dbc,$qr);
    $result1 = mysqli_query($dbc,$qr1);
    $json_array=array();
    $json_array1=array();
    while($rows = mysqli_fetch_assoc($result)){
        $json_array[]=$rows;
    }
    while($rows = mysqli_fetch_assoc($result1)){
        $json_array1[]=$rows;
    }
    $MSGarray=array("images"=>$json_array,"description"=>$json_array1);
    echo json_encode($MSGarray);
    mysqli_close($dbc);
	}

?>