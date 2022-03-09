<?php
    require("connect.php");
    $dbc=mysqli_connect($Hostname,$Username,$Password,$Database);
	if(!$dbc){
		echo "Kết Nối Không Thành Công!";
	}
	else{
	mysqli_set_charset($dbc,'UTF8');
    $qr="SELECT * FROM vehicles WHERE category='Xe Máy Điện-Thường' ORDER BY RAND()";
    $result = mysqli_query($dbc,$qr);
    $json_array=array();
    $json_array_price=array();
    while($rows = mysqli_fetch_assoc($result)){
        $json_array[]=$rows;
        // $json_array_price[]=(number_format($rows["price"]));
    }
    // $MSGarray=array("data"=>$json_array,"price_format"=>$json_array_price);
    // $MSGjson = json_encode($MSGarray);
    // echo $MSGjson;
    echo json_encode($json_array);
    // echo json_encode($json_array);
    // echo json_encode($json_array_price);
	}
?>