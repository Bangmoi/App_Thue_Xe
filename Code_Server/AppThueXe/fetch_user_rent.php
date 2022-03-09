<?php
    require("connect.php");
    $json =file_get_contents("php://input");
	$obj = json_decode($json,TRUE);
	//$id_product =$obj["id_product"];
    $id_username =$obj["id_username"];
    // $id_product =$obj["id_product"];
    // $id_username ="0";
    $dbc=mysqli_connect($Hostname,$Username,$Password,$Database);
	if(!$dbc){
		echo "Kết Nối Không Thành Công!";
	}
	else{
	mysqli_set_charset($dbc,'UTF8');
    $CheckSQL="SELECT * FROM wait_rent WHERE id_username='$id_username'";
    $result = mysqli_query($dbc,$CheckSQL);
    if ($result->num_rows > 0) {
        // output data of each row
        while($row = $result->fetch_assoc()) {
            $id_product = $row['id_product'];
            $qr = "SELECT * FROM vehicles WHERE  id_product=$id_product";
            $vehicle = mysqli_query($dbc,$qr);
            $vehicle = $vehicle->fetch_assoc();

            $arrCart[] = array(
                'id' => $row['id'],
                'name' => $vehicle['name'],
                'category' => $vehicle['category'],
                'image'=>$vehicle['image'],
                'price'=>$vehicle['price'],
                'id_product' =>$vehicle['id_product'],  
                'status' => $row['status'],          
            );
        }
        echo json_encode($arrCart);
    }
    else{
        $MSG='Not Rent';
		$MSGJson=json_encode($MSG);
		echo $MSGJson;
    }
		mysqli_close($dbc);
    }

?>