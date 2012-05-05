function fm_number(number,rule,output)
  {
    var number = parseInt(number);
    var rulenumbers = rule.split("-");
    var checkf = 0;
    var checks = 0;
    
    if((number>=rulenumbers[0])||(rulenumbers[0]=='x'))
      {
        checkf = 1;
      }
    if((number<=rulenumbers[1])||(rulenumbers[1]=='x'))
      {
        checks = 1;
      }
    if((checkf == 1)&&(checks == 1))
      {
        document.getElementById(output).style.background = 'rgb(145,243,63)';
        return false;
      }
    else
      {
        document.getElementById(output).style.background = 'rgb(255,153,153)';
        return false;
      }
      
  }