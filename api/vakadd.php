<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Max-Age: 1000');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');

define ('INDEX', true);
// --- Step 0 : connect to db
require 'inc/dbcon.php';
require 'inc/base.php';

// PRODUCTENadd
// --- "add" een product  

if(!$stmt = $conn->prepare("insert into vak (naam, code, taal) values (?,?,?)")){
    die('{"error":"Prepared Statement failed on prepare","errNo":"' . json_encode($conn -> errno) .'","mysqlError":"' . json_encode($conn -> error) .'","status":"fail"}');
}

// bind parameters
// s staat voor string
// i staat voor integer
// d staat voor double
// b staat voor blob
// "sid" staat dus voor string, integer, double
if(!$stmt -> bind_param("sis", htmlentities($postvars['vak_naam']), $postvars['vak_code'], $postvars['vak_taal'])){
    die('{"error":"Prepared Statement bind failed on bind","errNo":"' . json_encode($conn -> errno) .'","mysqlError":"' . json_encode($conn -> error) .'","status":"fail"}');
}
$stmt -> execute();

if($conn->affected_rows == 0) {
    // add failed
    $stmt -> close();
    die('{"error":"Prepared Statement failed on execute : no rows affected","errNo":"' . json_encode($conn -> errno) .'","mysqlError":"' . json_encode($conn -> error) .'","status":"fail"}');
}
// added
$stmt -> close();
// antwoord met een ok -> kijk na wat je in de client ontvangt
die('{"data":"ok","message":"Record added successfully","status":"ok"}');
?>