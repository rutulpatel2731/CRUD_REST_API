<?php
header('Content-Type:application/json');
header('Access-Control-Allow-Origin:*');

include 'connection/connection.php';

$sql = "select * from student";
$result = mysqli_query($conn,$sql);
// print_r(mysqli_fetch_object($result));
if(mysqli_num_rows($result) > 0){
    $output = mysqli_fetch_all($result,MYSQLI_ASSOC);
    echo json_encode($output,JSON_PRETTY_PRINT);
}else{
   echo json_encode(
    array(
        "message" => "Record Not Found..",
        "status" => false
    ));
}
?>