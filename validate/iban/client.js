//IBAN UNFERTIG
function fm_iban(iban,output)
  {
    switch(iban.substr(0,2))
      {
        case "AL":
          alert("xyz");
          break;
        case "AD":
          alert("xyz");
          break;
        default:
          alert("ERROR");
          break;
      }
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