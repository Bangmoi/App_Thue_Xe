<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
    <link rel="stylesheet" href="assets/css/mystyle.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta2/css/all.min.css" integrity="sha512-YWzhKL2whUzgiheMoBFwW8CKV4qpHQAEuvilg9FAn5VJUDwKZZxkJNuGM4XkWuk94WCrrwslk8yWNGmY1EduTA==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <link rel="shortcut icon" href="logo.png">
    <title>Thêm sản phẩm</title>
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
            <div class="form__content">
                <form class="row g-3" method="post" enctype="multipart/form-data" action="add_product.php">
                    <div class="col-md-12">
                      <label for="inputNameProduct" class="form-label">Tên sản phẩm</label>
                      <input type="name" class="form-control" id="inputNameProduct" name="productname">
                    </div>
                    <div class="mb-3">
                        <label for="description" class="form-label">Mô tả</label>
                        <textarea class="form-control" id="description" name="description" rows="3"></textarea>
                      </div>
                          <label class="form-label">Hình ảnh chính</label>
                          <select id="image__main" onchange="imageMain(this)" class="form-select" name="category" aria-label="Default select category">
                            <option value="">-----------Lựa chọn-----------</option>
                            <option value="Thêm bằng đường dẫn">Thêm bằng đường dẫn</option>
                            <option value="Thêm bằng hình ảnh">Thêm bằng hình ảnh</option>
                          </select>
                          <div id="image_link"></div>
                          
                          <label for="inputGroupFile02" class="form-label">Hình ảnh chi tiết</label>
                          <select id="image__detail" onchange="imageDetail(this)" class="form-select" name="category" aria-label="Default select category">
                            <option value="">-----------Lựa chọn-----------</option>
                            <option value="Thêm bằng đường dẫn">Thêm bằng đường dẫn</option>
                            <option value="Thêm bằng hình ảnh">Thêm bằng hình ảnh</option>
                          </select>
                          <div id="image_link-detail"></div>

                    <div class="col-md-4">
                      <label for="inputState" class="form-label">Loại xe</label>
                      <select class="form-select" name="category" aria-label="Default select category">
                        <option value="Xe Ô Tô Điện-Thường">Xe Ô Tô Điện-Thường</option>
                        <option value="Xe Máy Điện-Thường">Xe Máy Điện-Thường</option>
                        <option value="Xe Đạp Điện-Thường">Xe Đạp Điện-Thường</option>
                      </select>
                    </div>
                    <div class="col-md-3">
                      <label for="inputPrice" class="form-label">Giá (VND)/Ngày</label>
                      <input type="number" name="price" class="form-control" id="inputPrice">
                    </div>
                    <div class="col-12 btn__upload">
                      <button type="submit" name="submit" class="btn btn-primary">Tải lên</button>
                    </div>
                  </form>
            </div>
        </div>
    </div>










    <div class="footer">

    </div>


    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.10.2/dist/umd/popper.min.js" integrity="sha384-7+zCNj/IqJ95wo16oMtfsKbZ9ccEh31eOz1HGyDuCQ6wgnyJNSYdrPa03rtR1zdB" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.min.js" integrity="sha384-QJHtvGhmr9XOIpI6YVutG+2QOK9T+ZnN4kzFN1RtK3zEFEIsxhlmWl5/YESvpZ13" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
    <script src="./assets/js/main.js"></script>
  </body>
</html>