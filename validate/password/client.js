function fm_password(password,output)
  {
    var valunicode;
    var keys = password.split("");
    var numbers = 1;
    var uletter = 1;
    var lletter = 1;
    var special = 1;
    var complex = 0;
    var boxcolor = '';
    for(var i = 0; i < keys.length; i++)
      {
        valunicode = keys[i].charCodeAt(0);
        if((valunicode > 0x40)&&(valunicode < 0x5B)) //Großbuchstaben A-Z
          {
            ++uletter
          }
        else if((valunicode > 0x60)&&(valunicode < 0x7B)) //Kleinbuchstaben a-z
          {
            ++lletter
          }
        else if((valunicode > 0x2F)&&(valunicode < 0x3A)) //Zahlen 0-9
          {
            ++numbers
          }
        else if((valunicode > 0x20)&&(valunicode < 0x7F)) // Sonderzeichen
          {
            ++special
          }
        else if((valunicode < 0x21)||(valunicode > 0x7E))
          {
            
          }
      }
    complex = ((uletter*lletter*numbers*special)+Math.round(uletter*1.8+lletter*1.5+numbers+special*2))-6;
    fm_colorize(complex,output);
    
    //document.getElementById('pwsec').innerHTML = complex;
    /*
    if((complex < 115)&&(complex > 1))
      {
        boxcolor = 'rgb(255,'+(153+complex)+','+(153-complex)+')';
        fm_dgeb(output, 'id').style.background = boxcolor;
      }
    if((complex > 115)&&(complex < 230))
      {
        complex = complex - 115;
        boxcolor = 'rgb('+(255-complex)+',243,63)';
        fm_dgeb(output, 'id').style.background = boxcolor;
      }
    if(complex > 230)
      {
        boxcolor = 'rgb(145,243,63)';
        fm_dgeb(output, 'id').style.background = boxcolor;
      }
    return 1;
    */
  }