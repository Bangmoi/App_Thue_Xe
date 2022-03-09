<?php
    require('connect.php');
    $dbc=mysqli_connect($Hostname,$Username,$Password,$Database);
    header('Content-Type: text/html; charset=utf-8');
    error_reporting(0);
    if(!$dbc){
		echo "Kết Nối Không Thành Công!";
	}
	else{
        mysqli_set_charset($dbc,'UTF8'); 
        if (isset($_POST["submit"]))
        {
           if($_POST["productname"]!=null&&$_POST["description"]!=null&&$_POST['category']!=null&&$_POST["price"]!=null&&$_FILES['image']!=null&&$_FILES['images']!=null){
            $productname = $_POST["productname"];
            $description = $_POST["description"];
            $category = isset($_POST['category']) ? $_POST['category'] : false;
            $price = $_POST["price"];
            if(isset($_FILES['image'])){
                $file=$_FILES['image'];
                $file_name=$file['name'];
                if($file['type']=="image/jpeg"||$file['type']=="image/jpg"||$file['type']=="image/png"){
                    move_uploaded_file($file['tmp_name'],'uploads/' .$file_name);
                }
                else{
                    echo "Không đúng định dạng!";
                    $file_name="";
                }
            }

            if(isset($_FILES['images'])){
                // $files=$_FILES['images'];
                // $file_names=$files['name'];
                // echo '<pre>';
                // print_r($_FILES);  
                // die();
                // if($files['type']=="image/jpeg"||$files['type']=="image/jpg"||$files['type']=="image/png"){
                //     foreach($file_names as $key =>$value){
                //         move_uploaded_file($files['tmp_name'][$key],'uploads/' .$value);
                //     }
                // }
                //  else{
                //      echo "Không đúng định dạng!";
                //      $file_names="";
                //  }
                $allowTypes = array('jpg','png','jpeg','gif'); 
                foreach($_FILES['images']['name'] as $key=>$val){ 
                    // File upload path 
                    $fileName = $_FILES['images']['name'][$key]; 
                    $fileTmpName = $_FILES['images']['tmp_name'][$key]; 
                    $targetFilePath = "uploads/" . $fileName; 
                    $result = move_uploaded_file($fileTmpName,$targetFilePath);
                } 
                if(!$result){
                    echo"Định dạng ảnh không chính xác vui lòng kiểm tra lại!";
                }
            }
           
//             echo '<pre>';
//             print_r($_FILES); 
// die();
            $CheckSQL = "SELECT * FROM vehicles WHERE category='$category' AND name='$productname' AND price='$price'";
            $check = mysqli_fetch_array(mysqli_query($dbc,$CheckSQL));
            

            if(isset($check)==false){
                $max=mysqli_query($dbc,"SELECT MAX(id_product) AS max_id_product FROM vehicles");
                $row = mysqli_fetch_array($max);
                // echo $row["max_id_product"];
                $max_id_product=$row["max_id_product"]+1;
                $sql = "INSERT INTO vehicles(id,category,image,name,id_product,price) VALUES(NULL,'$category','http://kvpya1102.x10host.com/uploads/$file_name','$productname','$max_id_product','$price')";
                mysqli_query($dbc,$sql);
                $sql1 = "INSERT INTO products(id,id_product,description) VALUES(NULL,'$max_id_product','$description')";
                mysqli_query($dbc,$sql1);
                foreach($_FILES['images']['name'] as $key=>$val){
                    mysqli_query($dbc,"INSERT INTO product_images(id,id_product,image_path) VALUES(NULL,'$max_id_product','http://kvpya1102.x10host.com/uploads/$val')");
                  echo 'Tải lên thành công!';
                }
            }
            else
            {
                echo 'Thất bại sản phẩm đã tồn tại!';
            }
           }
        else if($_POST["productname"]!=null&&$_POST["description"]!=null&&$_POST['category']!=null
        &&$_POST["price"]!=null&&$_POST['image__link-main']!=null&&$_POST['image1']!=null&&$_POST['image2']!=null
        &&$_POST['image3']!=null&&$_POST['image4']!=null&&$_POST['image5']!=null){
            $productname = $_POST["productname"];
            $description = $_POST["description"];
            $category = isset($_POST['category']) ? $_POST['category'] : false;
            $price = $_POST["price"];
            $image_main=$_POST['image__link-main'];
            $image1 = $_POST["image1"];
            $image2 = $_POST["image2"];
            $image3 = $_POST["image3"];
            $image4 = $_POST["image4"];
            $image5 = $_POST["image5"];

            $CheckSQL = "SELECT * FROM vehicles WHERE category='$category' AND name='$productname' AND price='$price'";
            $check = mysqli_fetch_array(mysqli_query($dbc,$CheckSQL));
            if(isset($check)==false){
                $max=mysqli_query($dbc,"SELECT MAX(id_product) AS max_id_product FROM vehicles");
                $row = mysqli_fetch_array($max);
                // echo $row["max_id_product"];
                $max_id_product=$row["max_id_product"]+1;
                $sql = "INSERT INTO vehicles(id,category,image,name,id_product,price) VALUES(NULL,'$category','$image_main','$productname','$max_id_product','$price')";
                mysqli_query($dbc,$sql);
                $sql1 = "INSERT INTO products(id,id_product,description) VALUES(NULL,'$max_id_product','$description')";
                mysqli_query($dbc,$sql1);
                mysqli_query($dbc,"INSERT INTO product_images(id,id_product,image_path) VALUES(NULL,'$max_id_product','$image1')");
                mysqli_query($dbc,"INSERT INTO product_images(id,id_product,image_path) VALUES(NULL,'$max_id_product','$image2')");
                mysqli_query($dbc,"INSERT INTO product_images(id,id_product,image_path) VALUES(NULL,'$max_id_product','$image3')");
                mysqli_query($dbc,"INSERT INTO product_images(id,id_product,image_path) VALUES(NULL,'$max_id_product','$image4')");
                mysqli_query($dbc,"INSERT INTO product_images(id,id_product,image_path) VALUES(NULL,'$max_id_product','$image5')");
                echo 'Tải lên thành công!';
            }
            else
            {
                echo 'Thất bại sản phẩm đã tồn tại!';
            }
        }
        else{
            echo 'Vui lòng nhập đầy đủ thông tin!';
            echo 'Hoặc hình ảnh chính và hình ảnh chi tiết là cùng loại!';
        }
        }
		mysqli_close($dbc);
    }

?>