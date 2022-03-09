<?php
    require("connect.php");
    $dbc=mysqli_connect($Hostname,$Username,$Password,$Database);
	if(!$dbc){
		echo "Kết Nối Không Thành Công!";
	}
	else{
	mysqli_set_charset($dbc,'UTF8');
    $qr="SELECT * FROM vehicles WHERE category='Xe Ô Tô Điện-Thường' ORDER BY RAND()";
    $result = mysqli_query($dbc,$qr);
    $json_array=array();
    $json_array_price=array();
    while($rows = mysqli_fetch_assoc($result)){
        $json_array[]=$rows;
    }
    echo json_encode($json_array);
	}
?>