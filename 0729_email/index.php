<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="style.css">
  <link rel="stylesheet" href="fontawesome.css">
  <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossorigin="anonymous"/>

  <script src="https://kit.fontawesome.com/a076d05399.js"></script>
  <title>Document</title>
</head>
<body>
  <input type="checkbox" name="" id="toggle">
  <label for="toggle" class="show-btn">想訂閱嗎 ?</label>
  <div class="wrapper">
    <label for="toggle" class="cancel-btn"><i class="fas fa-times"></i></label>
    <div class="icon">
      <i class="far fa-envelope"></i>
    </div>
    <div class="content">
      <header>訂閱我們吧！</header>
      <p>獲得所有的資訊，就趁現在</p>
    </div>
    <form action="index.php" method="POST">
      <?php
        $userEmail = ""; // 為了讓再次輸入時，輸入框不會顯示undefined
        if(isset($_POST['subscribe'])){ //if subscribe btn clicked
          $userEmail = $_POST['email']; // ['']中的都是以name對應
          if(filter_var($userEmail, FILTER_VALIDATE_EMAIL)){ //validating user email
            // echo "correct";
            $subject = "Thanks for Subscribing";
            $message = "Thanks for subscribing to our blog. You'll always receive updates from us. And we won't share and sell your information.";
            $sender = "From: is6230c@gmail.com";
            if(mail($userEmail, $subject, $message, $sender)){
              ?>
              <!-- show sucess message once email send successfully -->
              <div class="alert success">感謝訂閱 !</div>
              <?php 
              $userEmail = "";
            }else{
              ?>
              <!-- show error message if somehow mail can't be sent -->
              <div class="alert error">抱歉...送email時出錯了</div>
              <?php
            }
          }else{ // 若email錯誤
            // echo "WRONG";
            ?>
            <!-- show error message if somehow mail can't be sent -->
            <div class="alert error"><?php echo $userEmail ?> 不是有效的email<br/>請再輸入一次</div>
            <?php
          }
        }
      ?>
      <div class="field">
        <input type="text" name="email" id="" placeholder="Email address" required value="<?php echo $userEmail ?>">
      </div>
      <div class="field btn">
        <input type="submit" value="我要訂閱" name="subscribe">
      </div>
    </form>
    <div class="text">We do not share your information.</div>
  </div>
</body>
</html>