<?php

include_once('./formmate.php');

switch ($_GET['type'])
  {
    case "name":
        echo fm_converttxt($_GET['data']);
        break;
    case "password":
        if(fm_password($_GET['data'])>640)
          {
            echo md5(fm_hashmix($_GET['data'], $salt='!Sc&§5GalShQ9e!1', $rounds=5123));
          }
        else
          {
            echo 'insecure';
          }
        break;
    case "email":
        echo fm_email($_GET['data'], 1);
        break;
    case "number":
        echo fm_convertnumber($_GET['data'], 1);
        break;
    case "date":
        echo fm_since(strtotime($_GET['data']), 'sec');
        break;
  }

?>