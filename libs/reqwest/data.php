<?php

if($_GET['validate'] == 'true')
  {
    ob_start();
    
    echo 'Hello ';
    readfile('http://cdn.simon.waldherr.eu/projects/validate/?type=name&data='.$_POST['username']);
    echo "\n".'your password is ';
    readfile('http://cdn.simon.waldherr.eu/projects/validate/?type=password&data='.$_POST['password']);
    echo "\n".'this is your eMail-adress:  ';
    readfile('http://cdn.simon.waldherr.eu/projects/validate/?type=email&data='.$_POST['emailadr']);
    echo "\n".'the timestamp of your birthday is ';
    readfile('http://cdn.simon.waldherr.eu/projects/validate/?type=date&data='.$_POST['birthday']);
    
    echo nl2br(ob_get_clean());
    die();
  }

$textvar  = 'Neque porro quisquam est, qui dolorem ipsum, quia dolor sit, amet, consectetur, adipisci velit ...';
$textvar .= rand(100, 900000);

ob_start();

echo "SERVER TIME: ".time()."\n";
echo "\n RANDOM SHA256 HASH: ".hash("SHA256", $textvar)."\n";
echo "RANDOM MD5 HASH: ".hash("MD5", $textvar)."\n";
echo "RANDOM CRC32 HASH: ".hash("CRC32", $textvar)."\n";
echo "\n GET: \n";
var_dump($_GET);
echo "\n \n POST: \n";
var_dump($_POST);

echo nl2br(ob_get_clean());

?>