<?php
include ('./formmate.php');
?>
<html>
<head>
	<meta charset="utf-8">
	<title>FormMate</title>

	<script src="./libs/jshash/sha256-min.js"></script>
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
		.fmclass{
			margin: 30px auto 30px auto;
			padding: 25px;
			font-size: x-large;
			border: 1px #AAA solid;
			border-radius: 15px;
			background: #CCC;
			-webkit-box-shadow: inset 0 1px 0 #fff;
			-moz-box-shadow: inset 0 1px 0 #fff;
			box-shadow: inset 0 1px 0 #fff;
		}
		.fmspan{
			position: relative;
			width: 340px;
		}
		input{
			position: relative;
			height: 30px;
			width: 300px;
			left: 140px;
			font-size: large;
			font-family: Courier;
			margin: 25px;
		}
		span{
			position: relative;
			display: block;
			width: 200px;
		}
		</style>
</head>
<body>
<form method="post" action="">
<span class=""><label for="textfield1">Text</label></span>
<input name="Text" id="textfield1" type="text" value="<?php echo $_POST['Text'] ?>" onkeyup="fm_cleartext(this.value,'textfield1');"><br>

<span class=""><label for="textfield2">eMail</label></span>
<input name="eMail" id="textfield2" type="text"value="<?php echo $_POST['eMail'] ?>" onkeyup="fm_email(this.value,'textfield2');"><br>

<span class=""><label for="textfield3">Nummer</label></span>
<input name="Nummer" id="textfield3" type="text"value="<?php echo $_POST['Nummer'] ?>" onkeyup="fm_clearfloat(this.value,'textfield3');"><br>

<span class=""><label for="textfield4">No HTML</label></span>
<input name="NoHTML" id="textfield4" type="text"value="<?php echo $_POST['NoHTML'] ?>" onkeyup=""><br>

<span class=""><label for="textfield5">Hash</label></span>
<input name="Hash" id="textfield5" type="text"value="<?php echo $_POST['Hash'] ?>" onkeyup="javascript:document.getElementById('hashjs').innerHTML = hex_sha256(this.value);"><br>

<span class=""><label for="textfield6">Password</label></span>
<input name="Password" id="textfield6" type="password" value="<?php echo $_POST['Password'] ?>" onkeyup="fm_password(this.value,'textfield6');"><br>
<button type="submit">senden</button>
</form>

<hr>

<table>
	<tr><td>SHA256 PHP</td><td><?php echo hash("SHA256", $_POST['Hash']) ?></td></tr>
	<tr><td>SHA256 JS</td><td id="hashjs"></td></tr>
</table>

<hr>

<table>
	<tr><th>Input</th><th>Content</th></tr>
	<tr><td>Text   </td><td><?php echo fm_converttxt($_POST['Text']) ?></td></tr>
	<tr><td>eMail  </td><td><?php echo fm_email($_POST['eMail'], 1) ?></td></tr>
	<tr><td>Nummer </td><td><?php echo fm_convertnumber($_POST['Nummer'], 1) ?></td></tr>
	<tr><td>No HTML</td><td><?php echo fm_nohtml($_POST['NoHTML']) ?></td></tr>
	<tr><td>HashMix</td><td><?php echo fm_hashmix($_POST['Hash']) ?></td></tr>
</table>
</body>
</html>