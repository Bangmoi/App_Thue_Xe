const imageMain=(text)=>{
    var luachon = document.getElementById("image_link");
    var result = text.value;
    if(result==="Thêm bằng đường dẫn"){
        luachon.innerHTML=`
        <label for="inputGroupFilelink" class="form-label">Thêm bằng đường dẫn</label>
        <div class="input-group mb-3">
          <input type="link" name="image__link-main" class="form-control" id="inputGroupFilelink">
        </div>`;
    }
    else if(result==="Thêm bằng hình ảnh"){
        luachon.innerHTML=`
        <label for="inputGroupFile01" class="form-label">Thêm bằng hình ảnh</label>
        <div class="input-group mb-3">
        <input type="file" name="image" class="form-control" id="inputGroupFile01">
        </div>`;
    }
    else{
        luachon.innerHTML=``;
    }
}
const imageDetail=(text)=>{
    var luachon = document.getElementById("image_link-detail");
    var result = text.value;
    if(result==="Thêm bằng đường dẫn"){
        luachon.innerHTML=`
        <label for="inputGroupFilelink" class="form-label">Thêm bằng đường dẫn</label>  
        <div class="input-group mb-3">
            <label class="form-label">Ảnh 1</label>  
            <input type="link" name="image1" class="form-control">
        </div>
        <div class="input-group mb-3">
            <label class="form-label">Ảnh 2</label>  
            <input type="link" name="image2" class="form-control">
        </div>
        <div class="input-group mb-3">
            <label class="form-label">Ảnh 3</label>  
            <input type="link" name="image3" class="form-control">
        </div>
        <div class="input-group mb-3">
            <label class="form-label">Ảnh 4</label>  
            <input type="link" name="image4" class="form-control">
        </div>
        <div class="input-group mb-3">
            <label class="form-label">Ảnh 5</label>  
            <input type="link" name="image5" class="form-control">
        </div>`;
    }
    else if(result==="Thêm bằng hình ảnh"){
        luachon.innerHTML=`
        <label for="inputGroupFile01" class="form-label">Thêm bằng nhiều hình ảnh <10 ảnh</label>
        <div class="input-group mb-3">
            <input type="file" name="images[]" class="form-control" multiple >
        </div>`;
    }
    else{
        luachon.innerHTML=``;
    }
}