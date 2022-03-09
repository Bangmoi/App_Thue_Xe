<?php
    require("connect.php");
    $json =file_get_contents("php://input");
    $obj = json_decode($json,TRUE);
	$search =$obj["search"];
     $dbc=mysqli_connect($Hostname,$Username,$Password,$Database);
    if(!$dbc){
        echo "Kết Nối Không Thành Công!";
    }
    else{
        mysqli_set_charset($dbc,'UTF8');
        $qr="SELECT * FROM vehicles WHERE name LIKE '%$search%'";
        $result = mysqli_query($dbc,$qr);
        $json_array=array();
        $json_array_price=array();
        if ($result->num_rows > 0) {
            while($rows = mysqli_fetch_assoc($result)){
                $json_array[]=$rows;
            }
            echo json_encode($json_array);
        }
        else{
                $MSG='Khongcodulieu';
                $MSGJson=json_encode($MSG);
                echo $MSGJson;
        }
    }
?>