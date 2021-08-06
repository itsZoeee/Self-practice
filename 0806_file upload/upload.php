<?php
    // print_r($_POST);  
    // 初始狀態為Array ( )，按了submit後為Array ( [submit (// 對應submit按鈕的name)] => )

    if(isset($_POST['submit'])){ // 對應到button name="submit"
        $file = $_FILES['file']; // 對應到input name="file"
        // print_r($file); 
        // Array ( [name] => 20306386n.jpg [type] => image/jpeg [tmp_name] => C:\xampp\tmp\php4DD8.tmp [error] => 0 [size] => 76606 )
        
        $fileName = $_FILES['file']['name']; // 20306386n.jpg
        $fileTmpName = $_FILES['file']['tmp_name']; // C:\xampp\tmp\php4DD8.tmp
        $fileSize = $_FILES['file']['size']; 
        $fileError = $_FILES['file']['error']; 
        $fileType = $_FILES['file']['type']; // image/jpeg

        $fileExt = explode('.', $fileName); // 以.分割$fileName，回傳array
        $fileActuralExt = strtolower(end($fileExt)); // end()：挑出$fileExt分割出的array中的最後一個元素，即副檔名。然後轉換成小寫

        $allowed = array('jpg', 'jpeg', 'png', 'pdf');

        if(in_array($fileActuralExt, $allowed)){
            if($fileError === 0){
                if($fileSize < 100000){
                    $fileNameNew = uniqid('',true).".".$fileActuralExt; // 重新命名檔案
                    $fileDestination = "uploads/".$fileNameNew; // 上傳位址

                    move_uploaded_file($fileName, $fileDestination);
                    header("Location: upload.php?uploadsuccess");
                }else{
                    echo "Ur file is too big!";
                }
            }else{
                echo "there was an error while uploading, plz upload again";
            }
        }else{
            echo "u cannot upload files of this type";
        }
    }

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <!-- enctype = encodetype，編碼型別 
         multipart/form-data是指表單資料有多部分構成：既有文字資料，又有檔案等二進位制資料的意思-->
    <form action="upload.php" method="POST" enctype="multipart/form-data">
        <input type="file" name="file" id="">
        <button type="submit" name="submit">UPLOAD</button>
    </form>
    
</body>
</html>