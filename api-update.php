<?php
include 'connection/connection.php';
header('Content-Type:application/json');
header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Method:PUT');
header('Access-Control-Allow-Header:Content-Type,Access-Control-Allow-Method,Authorization,X-Requested-With');

$jsonData = json_decode(file_get_contents("php://input"),true);

$id = $jsonData['sid'];
$name = $jsonData['sname'];
$age = $jsonData['sage'];
$city = $jsonData['scity'];

$sql = "UPDATE `student` SET `student_name`='$name',`age`=$age,`city`='$city' WHERE id = '$id'";
$result = mysqli_query($conn,$sql);
if($result){
    echo json_encode(
        array(
            "message" => "Record Updated Successfully...",
            "status" => true
        ));
}else{
    echo json_encode(
        array(
            "message" => "Record Not Updated..",
            "status" => false
        ));
}

?>