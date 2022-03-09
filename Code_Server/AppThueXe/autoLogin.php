<?php
    require('jwt.php');
    require('connect.php');
    header("Content-type: text/html; charset=utf-8");
    $json =file_get_contents("php://input");
    $obj = json_decode($json,TRUE);
    $dbc=mysqli_connect($Hostname,$Username,$Password,$Database);
        if(!$dbc){
            echo "Kết Nối Không Thành Công!";
        }
        else{
            mysqli_set_charset($dbc,'UTF8');
            $sql = "SELECT * FROM user";
            $result = mysqli_query($dbc,$sql);
        }


    
    if($obj !=null)
    {
        $token =$obj["token"];
        $detoken = JWT::decode($token,"SECRET_KEY_OKMEN");
        $detoken = json_encode($detoken);
        $detoken = json_decode($detoken,TRUE);

        if ($result->num_rows > 0) {
            // output data of each row
            while($row = $result->fetch_assoc()) {
        
                if($row['id'] == $detoken['id'] && $row['username'] == $detoken['username']
                    && $row['fullname'] == $detoken['fullname']
                    && $row['phonenumber'] == $detoken['phonenumber']&& $row['email'] == $detoken['email']
                    && $row['address'] == $detoken['address']&& $row['birthday'] == $detoken['birthday'])
                {
                    echo true;
                    return;
                }
            }
            echo false;
        } 
    }

    mysqli_close($dbc);

?>