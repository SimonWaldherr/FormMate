      <div class="input-prepend">
      <span id="inpre-pw" class="add-on">password</span><input class="span2" name="pw" id="prependedInputPW" size="16" type="password" onkeyup="securepassword(document.getElementById('prependedInputPW').value)" onfocus="emailvalidate(document.getElementById('prependedInputEMAIL').value)">
      </div>
      <div id="pwsec"><div id="pwsecbg"></div></div>
      <input class="span2" name="type" id="submittype" size="16" type="hidden">
      <input class="span2" name="starttime" id="starttime" size="16" value="<?php echo time(); ?>" type="hidden">

      <script src="js/jpics.js" type="text/javascript"></script>