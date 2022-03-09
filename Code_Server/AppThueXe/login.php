<?php
    require('jwt.php');
    require('connect.php');
    header("Content-type: text/html; charset=utf-8");
	$json =file_get_contents("php://input");
	$obj = json_decode($json,TRUE);
	$username =$obj["username"];
	$password=md5($obj["password"]); 
//     $username ="admin";
// 	$password=md5("2106200110026012"); 
	$dbc=mysqli_connect($Hostname,$Username,$Password,$Database);
	if(!$dbc){
		echo "Kết Nối Không Thành Công!";
	}
	else{
		mysqli_set_charset($dbc,'UTF8');

        $CheckSQL = "SELECT * FROM user WHERE username = '$username' AND password = '$password'";
        $check = mysqli_fetch_array(mysqli_query($dbc,$CheckSQL));
        if(isset($check)){
           $MSGsuccessfully='Login success';
           //create json web token
           $token=array();
           $token['id'] = $check['id'];
           $token['username'] = $check['username'];
        //   $token['avatar'] = $check['avatar'];
           $token['fullname'] = $check['fullname'];
           $token['phonenumber'] = $check['phonenumber'];
           $token['email'] = $check['email'];
           $token['address'] = $check['address'];
           $token['birthday'] = $check['birthday'];
           $JsonWebToken = JWT::encode($token,'SECRET_KEY_OKMEN');
           $JsonWebTokendecode = JWT::decode($JsonWebToken,'SECRET_KEY_OKMEN',true);
           $MSGarray=array("message"=>$MSGsuccessfully,"token"=>$JsonWebToken,"info"=>$JsonWebTokendecode);
           $MSGjson = json_encode($MSGarray);
           echo $MSGjson;
        }
        else{
            $MSGfalse="Login false";
            $MSGarray=array("message"=>$MSGfalse,"token"=>"Error!");
            $MSGjson = json_encode($MSGarray);
            echo $MSGjson;
        }
        mysqli_close($dbc);
	}

?>