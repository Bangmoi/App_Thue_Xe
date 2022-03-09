<?php
    require('connect.php');
    define('UPLOAD_DIR', 'Avatar/');
    $encodedData = file_get_contents('php://input');
    $decodedData = json_decode($encodedData,true);
    
    $url=$decodedData['img'];
    $username=$decodedData['username'];
        $image_parts = explode(";base64,", $decodedData['img']);
        $image_type_aux = explode("image/", $image_parts[0]);
        $image_type = $image_type_aux[1];
        $image_base64 = base64_decode($image_parts[1]);
        if($username==''){
          $file = UPLOAD_DIR . uniqid() . '.png';
        }
        else {
             $file = UPLOAD_DIR . uniqid() . '.png';
        //   $file = UPLOAD_DIR . $username . '.png';
        }
        
        if (file_put_contents($file, $image_base64)) {
          echo json_encode(1);
        }
        
        $dbc=mysqli_connect($Hostname,$Username,$Password,$Database);
        if(!$dbc){
          echo "Kết Nối Không Thành Công!";
        }
        else{
            $sql = "UPDATE user SET avatar ='http://kvpya1102.x10host.com/AppThueXe/$file' WHERE username = '$username' ";
            $result = mysqli_query($dbc,$sql);
        }
?>