<?php
$name = $_POST["name"];
$mob = $_POST["mob"];
$dat = $_POST["dat"];

$host = "localhost";

$username = "root";
$pwd = "";
$db = "book";
$table = "book_t";

$connect = mysql_connect($host,$username,$pwd) or die('Could not Connect');
$database = mysql_select_db($db);


$sql = "INSERT INTO book_t (name,mob,dat) VALUES('$name','$mob','$dat')";
 
$result = mysql_query($sql) ;  

if($result){

    echo("<br>Input data is succeed");
    echo"<a href='add.php'>Back to main page</a>";    
} else{

    echo("<br>Input data is fail");
    echo"<a href='login.html'>Back to main page</a>";
}



?>