<?php
header('Content-Type:application/json');
header('Access-Control-Allow-Origin:*');

include 'connection/connection.php';

// $data = json_decode(file_get_contents("php://input"),true);
// $searchData = $data['search'];

// using get method data send in url
$searchData = isset($_GET['search']) ? $_GET['search'] : die();

$sql = "select * from student where student_name LIKE '%$searchData%'";
$result = mysqli_query($conn,$sql);
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