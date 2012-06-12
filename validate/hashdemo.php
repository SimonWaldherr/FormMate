<?php
include ('./formmate.php');



if($_GET['q'] != '')
  {
    $str = htmlentities($_GET['q'], ENT_QUOTES);
  }
else
  {
    $str = md5(md5(hash("whirlpool", crc32(rand(111,9999999)).rand(1111111,9999999999999).md5(rand(111,99999999999))).rand(11111,999999)).crc32(rand(1111,99999)));
  }



?>
<html>
<head>
  <meta charset="utf-8">
  <title>FormMate</title>

  <script src="./libs/jshash/sha1-min.js"></script>
  <script src="./libs/jshash/sha256-min.js"></script>
  <script src="./libs/jshash/sha512-min.js"></script>
  <script src="./libs/jshash/md5-min.js"></script>
  <script src="./libs/jshash/ripemd160-min.js"></script>
  
  <script src="./formmate.js"></script>
  <style>
    *{
        font-family: "Lucida Grande", "Lucida Sans Unicode", "Helvetica Neue", Helvetica, Arial, sans-serif;
    }
    h1{
        position: relative;
        left: 15px;
        margin: 25px;
    }
    input{
        height: 30px;
        width: 300px;
        font-size: large;
        font-family: Courier;
    }
    span{
        position: relative;
        display: block;
        width: 200px;
    }
    tr {
        height: 35px;
    }
    td {
        height: 30px;
        max-width: 600px;
        font-size: large;
        font-family: Courier;
        margin: 15px;
        overflow-x:hidden;
        
    }
    .trbg{
        background-color: #ccc;
    }
    .trhbg{
        background-color: #555;
        color: #EEE;
        font-size: larger;
    }
  </style>
</head>
<body onload="javascript:pageload();">
  <h1>FormMate</h1>
  <h2>validate and filter examples</h2>
  <br>
  <hr>
  <h3>Hashing <form action="" method="GET"><input type="submit" value="Hash it ...">
  <input name="q" type="text" value="<?php echo $str; ?>"></form></h3>
  <hr>
  <table>
 
    <tr class="trhbg">
        <th>Algorithm</th>
        <th>Clientside</th>
        <th>Serverside</th>
    </tr>
    
    <tr class="trbg">
        <td>md5</td>
        <td id="md5"></td>
        <td><?php echo hash("md5", $str); ?></td>
    </tr>
    
    <tr>
        <td>sha1</td>
        <td id="sha1"></td>
        <td><?php echo hash("sha1", $str); ?></td>
    </tr>
    
    <tr class="trbg">
        <td>sha256</td>
        <td id="sha256"></td>
        <td><?php echo hash("sha256", $str); ?></td>
    </tr>
    
    <tr>
        <td>sha512</td>
        <td id="sha512"></td>
        <td><?php echo hash("sha512", $str); ?></td>
    </tr>
    
    <tr class="trbg">
        <td>ripemd160</td>
        <td id="rmd160"></td>
        <td><?php echo hash("ripemd160", $str); ?></td>
    </tr>
    
    <tr>
        <td>Mix1</td>
        <td id="mix1"></td>
        <td><?php echo hash("sha256", hash("md5", $str).$str); ?></td>
    </tr>
    
    <tr class="trbg">
        <td>Mix2</td>
        <td id="mix2"></td>
        <td><?php echo hash("sha256",hash("md5",hash("sha512", hash("sha512", $str)))); ?></td>
    </tr>
    
  </table>
  <hr>
  <i style="font-size:smaller;"><?php echo 'fm_hashmix("'.$str.'") =&gt; '.fm_hashmix($str); ?></i>
  <script>
    function pageload()
      {
        document.getElementById('md5').innerHTML = hex_md5('<?php echo $str; ?>');
        document.getElementById('sha1').innerHTML = hex_sha1('<?php echo $str; ?>');
        document.getElementById('sha256').innerHTML = hex_sha256('<?php echo $str; ?>');
        document.getElementById('sha512').innerHTML = hex_sha512('<?php echo $str; ?>');
        document.getElementById('rmd160').innerHTML = hex_rmd160('<?php echo $str; ?>');
        document.getElementById('mix1').innerHTML = hex_sha256(hex_md5('<?php echo $str; ?>')+'<?php echo $str; ?>');
        document.getElementById('mix2').innerHTML = hex_sha256(hex_md5(hex_sha512(hex_sha512('<?php echo $str; ?>'))));
      }
  </script>
</body>
</html>