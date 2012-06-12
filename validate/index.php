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
  <br>
  <hr>
  <i>
     (v) = validate<br>
     (f) = filter<br>
     (g) = generate
  </i>
  <br><br>
  <form method="post" action="">
    <table>
	    
      <tr class="trhbg">
          <th>Input</th>
          <th>Clientside</th>
          <th>Serverside</th>
      </tr>
      
      <tr class="trbg">
          <td>Text (f)</td>
          <td><input name="Text" id="textfield1" type="text" value="<?php echo $_POST['Text'] ?>" onkeyup="fm_cleartext(this.value,'textfield1');"></td>
          <td><?php echo fm_converttxt($_POST['Text']) ?></td>
      </tr>
      
      <tr>
          <td>eMail (v)</td>
          <td><input name="eMail" id="textfield2" type="text"value="<?php echo $_POST['eMail'] ?>" onkeyup="fm_email(this.value,'textfield2');"></td>
          <td><?php echo fm_email($_POST['eMail'], 1) ?></td>
      </tr>
      
      <tr class="trbg">
          <td>Nummer (v)</td>
          <td><input name="Nummer" id="textfield3" type="text"value="<?php echo $_POST['Nummer'] ?>" onkeyup="fm_clearfloat(this.value,'textfield3');"></td>
          <td><?php echo fm_convertnumber($_POST['Nummer'], 1) ?></td>
      </tr>
      
      <tr>
          <td>No HTML</td>
          <td><input name="NoHTML" id="textfield4" type="text"value="<?php echo htmlentities($_POST['NoHTML'], ENT_QUOTES) ?>" onkeyup=""></td>
          <td><table><tr><td>htmlentities: </td><td style="width:80%;"><i style="font-size:smaller;"><?php echo htmlentities($_POST['NoHTML'], ENT_QUOTES) ?></i></td></tr><tr><td>strip_tags:  </td><td><?php echo fm_nohtml($_POST['NoHTML']) ?></td></tr></table></td>
      </tr>
      
      <tr class="trbg">
          <td>Hash (g)</td>
          <td><input name="Hash" id="textfield5" type="text"value="<?php echo $_POST['Hash'] ?>" onkeyup="javascript:document.getElementById('hashjs').innerHTML = hex_sha256(this.value);"></td>
          <td><table><tr><td>PHP: </td><td><?php echo hash("SHA256", $_POST['Hash']) ?></td></tr><tr><td>JS:  </td><td id="hashjs"></td></tr></table></td>
      </tr>
      
      <tr>
          <td>HashMix (g)</td>
          <td>see above</td>
          <td><i style="font-size:smaller;"><?php echo fm_hashmix($_POST['Hash']) ?></i></td>
      </tr>
      
      <tr class="trbg">
          <td>Password (v+)</td>
          <td><input name="Password" id="textfield6" type="password" value="<?php echo $_POST['Password'] ?>" onkeyup="fm_password(this.value,'textfield6');"></td>
          <td><?php echo fm_password($_POST['Password']) ?> <i style="font-size:smaller;">//BAD &lt; 200 &brvbar; MIN &gt; 600 &brvbar; OK &gt; 900 &brvbar; GOOD &gt; 2000 &brvbar; PERFECT &gt; 2600</i></td>
      </tr>
      
      <tr>
          <td>since 1970 (g)</td>
          <td></td>
          <td><?php echo fm_since() ?></td>
      </tr>
      
      <tr class="trbg">
          <td>since 1970 (days)</td>
          <td></td>
          <td><?php echo fm_since('now', 'days') ?> days</td>
      </tr>
      
      <tr>
          <td>since X</td>
          <td><input name="Date" id="textfield7" type="text"value="<?php echo $_POST['Date'] ?>" onkeyup=""></td>
          <td><?php echo fm_since('now', 'auto', strtotime($_POST['Date'])) ?></td>
      </tr>
      
      <tr class="trbg">
          <td>since X (days)</td>
          <td>see above</td>
          <td><?php echo fm_since('now', 'days', strtotime($_POST['Date'])) ?> days</td>
      </tr>
      
    </table>
    <br>
    <button type="submit">senden</button>
  </form>
  <hr>
  <script>
    function pageload()
      {
        fm_email(document.getElementById('textfield2').value,'textfield2');
        document.getElementById('hashjs').innerHTML = hex_sha256(document.getElementById('textfield5').value);
        fm_password(document.getElementById('textfield6').value,'textfield6');
      }
  </script>
</body>
</html>