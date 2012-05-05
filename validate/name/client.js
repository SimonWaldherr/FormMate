function fm_$$FUNCTIONNAME($$FUNCTIONINPUT,output)
  {
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if(reg.test(email) == false)
      {
        document.getElementById(output).style.background = 'rgb(255,153,153)';
        return false;
      }
    else
      {
        document.getElementById(output).style.background = 'rgb(145,243,63)';
        return false;
      }
  }