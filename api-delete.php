<?php
include 'connection/connection.php';

header('Content-Type:application/json');
header('Allow-Access-Control-Origin:*');
header('Allow-Access-Control-Method:delete');
header('Access-Control-Allow-Headers:Content-Type,Allow-Access-Control-Method,X-Standard-Width,Authorization');

$jsonData = json_decode(file_get_contents("php://input"),true);
// print_r($jsonData['sid']);
$studentId = $jsonData['sid'];

$sql = "Delete from student where id = '$studentId'";
$result = mysqli_query($conn,$sql);
if($result){
   echo json_encode(array("message"=>"Record Deleted Successfully...","status"=>true));
}else{
    echo json_encode(array("message"=>"Record Not Deleted...","status"=>false));
}
?>