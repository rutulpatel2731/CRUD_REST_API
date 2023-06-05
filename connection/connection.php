<?php
$servername = "localhost";
$username = "rutul";
$password = "Rutul@1234";
$dbname ="restapi";

$conn = mysqli_connect($servername,$username,$password,$dbname);
if(!$conn){
    die ("Connection Failed".mysqli_connect_error());
}
?>