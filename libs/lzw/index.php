<?php

include ('./lzw.php');

if($_GET['lzw']!="")
  {
	  $compresset = $_GET['lzw'];
	  $lzw = new LZW();
	  //$cmp = $lzw->compress("http://webdevwonders.com");
	  $uncompresset = $lzw->decompress($compresset);
	  
    
    //$uncompresset = decompress($compresset);
  }

?>
<html>
<head>
  <meta charset="utf-8">
  <title>FormMate</title>

  <script src="./lzw.js"></script>
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
		width: 300px;
		font-size: large;
		font-family: Courier;
		margin: 15px;
	}
	.trbg{
		background-color: #ccc;
	}
	.trhbg{
		background-color: 
		#555;
		color: 
		#EEE;
		font-size: larger;
	}
  </style>
</head>
<body onload="javascript:pageload();">
  <h1>FormMate</h1>
  <h2>validate and filter examples</h2>
  <hr>
  <form action="" method="post">
	
	<p><input type="submit" value="Next"></p>
  </form>
  <input name="content2" id="content2" type="text">
  <textarea name="content" cols="50" rows="10" id="content" onkeyup="javascript:document.getElementById('content2').value = LZW.compress(document.getElementById('content').value)">lorem ipsum</textarea>
  <button onclick="javascript:compress();"></button>
</form>
<?php 
echo '<p>compressed = '.strlen($compresset).'  '.$compresset.'</p>';
echo '<p>uncompressed = '.strlen($uncompresset).' '.$uncompresset.'</p>'; 



?>
<hr>
    <script>
  	function compress()
  	  {
  		window.location = './?lzw='+LZW.compress(document.getElementById('content').value);
  	  }
    </script>
  </body>
  </html>