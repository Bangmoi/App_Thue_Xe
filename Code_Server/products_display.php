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
        $CheckSQL = "SELECT * FROM vehicles";
        $result = mysqli_query($dbc,$CheckSQL);
    }
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
    <link rel="stylesheet" href="assets/css/mystyle.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta2/css/all.min.css" integrity="sha512-YWzhKL2whUzgiheMoBFwW8CKV4qpHQAEuvilg9FAn5VJUDwKZZxkJNuGM4XkWuk94WCrrwslk8yWNGmY1EduTA==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <link rel="shortcut  icon" href="logo.png">
    <title>Danh sách sản phẩm</title>
</head>
<body>

    <div class="container">
        <div class="formProduct">
        <div class="form__header">
                <nav class="navbar navbar-light bg-light">
                    <div class="container-fluid">
                        <button type="button" class="btn btn-success">Sản phẩm</button>
                        <button type="button" class="btn btn-success">Danh sách chờ</button>
                        <button type="button" href="" class="btn btn-success">Thêm mới</button>
                      <form class="d-flex">
                        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                        <button class="btn btn-outline-success" type="submit">Search</button>
                      </form>
                    </div>
                  </nav>
            </div>
            </div>


            <div class="form__content">
            <table class="table">
                    <thead>
                        <tr>
                        <th scope="col">Mã sản phẩm</th>
                        <th scope="col">Loại Xe</th>
                        <th scope="col">Tên</th>
                        <th scope="col">Hình ảnh</th>
                        <th scope="col">Giá</th>
                        <th scope="col">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php
                            while($rows =mysqli_fetch_assoc($result)){
                        ?>
                        <tr>
                        <th scope="row"><?php echo $rows['id_product'];?></th>
                        <td><?php echo $rows['category'];?></td>
                        <td><?php echo $rows['name'];?></td>
                        <td><div class="image">
                            <img style="height:40vh;width:30vh" id="image_product" src="<?php echo $rows['image'];?>" alt="">
                        </div></td>
                        <td><?php echo $rows['price'];?></td>
                        <td><div class="btn__process">
                            <div class="btn_edit">
                                <a href=""><i class="fas fa-edit"></i>Chỉnh sửa</a>
                            </div>
                            <div class="btn_delete">
                                <a href=""><i class="fas fa-trash-alt"></i>Xoá</a>
                            </div>
                            <?php }?>
                        </div></td>
                        </tr>




                    </tbody>
                    </table>
            </div>
        </div>
    </div>










    <div class="footer">

    </div>


    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.10.2/dist/umd/popper.min.js" integrity="sha384-7+zCNj/IqJ95wo16oMtfsKbZ9ccEh31eOz1HGyDuCQ6wgnyJNSYdrPa03rtR1zdB" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.min.js" integrity="sha384-QJHtvGhmr9XOIpI6YVutG+2QOK9T+ZnN4kzFN1RtK3zEFEIsxhlmWl5/YESvpZ13" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
</body>
</html>