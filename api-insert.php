<?php
include 'connection/connection.php';

header('Content-Type:application/json');
header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Method:POST');
header('Access-Control-Allow-Header:Content-Type,Access-Control-Allow-Method,Authorization,X-Requested-With');

$jsonData = json_decode(file_get_contents("php://input"), true);  // convert json object to php array post man mathi je value avse ae JSON mthi avse so aene php array ma convert karse.
$name = $jsonData['sname'];
$age = $jsonData['sage'];
$city = $jsonData['scity'];

$sql = "INSERT INTO `student`(`student_name`, `age`, `city`) VALUES ('$name',$age,'$city')";
$result = mysqli_query($conn, $sql);
if ($result) {
    echo json_encode(array("message" => "Record Inserted Successfully.", "status" => true));
} else {
    echo json_encode( array("message" => "Record Not Inserted.", "status" => false));
}
