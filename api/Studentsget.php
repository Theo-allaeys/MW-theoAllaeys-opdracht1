<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Max-Age: 1000');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');

define ('INDEX', true);
// --- Step 0 : connect to db
require 'inc/dbcon.php';
require 'inc/base.php';

// PRODUCTENget
// --- "Get" alle producten  

$sql="SELECT
    student.id, student.voornaam, student.achternaam, student.studentennummer, vak.naam
FROM
    vakstudent 
INNER JOIN
    student
  ON vakstudent.studentennummer = student.studentennummer
INNER JOIN
    vak
  ON vakstudent.vakcode = vak.code";

// geen prepared statement nodig, aangezien we geen parameters
// van de gebruiker verwerken.

$result = $conn -> query($sql);

if (!$result) {
    $response['code'] = 7;
    $response['status'] = $api_response_code[$response['code']]['HTTP Response'];
    $response['data'] = $conn->error;
    deliver_response($response);
}

// Vorm de resultset om naar een structuur die we makkelijk kunnen 
// doorgeven en stop deze in $response['data']
$response['data'] = getJsonObjFromResult($result); // -> fetch_all(MYSQLI_ASSOC)
// maak geheugen vrij op de server door de resultset te verwijderen
$result->free();
// sluit de connectie met de databank
$conn->close();
// Return Response to browser
deliver_JSONresponse($response);
?>