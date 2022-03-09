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
		$username =$obj["username"];
// 		$username ="admin";
		//$token="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjI1IiwidXNlcm5hbWUiOiJhZG1pbjEiLCJmdWxsbmFtZSI6Ikt2cHlhMTEwMiJ9.tpkjmrsEx8l5btikX8XIZxYFn2Fxh4Z4LsYwGExt3hE";
// 		$detoken = JWT::decode($token,"SECRET_KEY_OKMEN",true);
        $CheckSQL = "SELECT * FROM user WHERE username = '$username'";
        $check = mysqli_fetch_array(mysqli_query($dbc,$CheckSQL));
        if(isset($check)){
           $info=array();
           $info['id'] = $check['id'];
           $info['username'] = $check['username'];
           $info['fullname'] = $check['fullname'];
           $info['avatar'] = $check['avatar'];
           $info['birthday'] = $check['birthday'];
           $info['email'] = $check['email'];
           $info['address'] = $check['address'];
           $info['phonenumber'] = $check['phonenumber'];
           $info['CMND'] = $check['CMND'];
           $MSGjson = json_encode($info);
           echo $MSGjson;
        }
        else{
            $MSGfalse="error";
            $MSGjson = json_encode($MSGfalse);
            echo $MSGjson;
        }
        mysqli_close($dbc);
		//$detoken = json_encode($detoken);
		//$detoken = json_decode($detoken,TRUE);
		//echo $detoken;
		mysqli_close($dbc);
		}
   

?>