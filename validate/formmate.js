function fm_dgeb(name, type)
  {
    if (type == 'name')
      {
        if (!document.getElementsByTagName(name))
          {
            return false;
          }
        return document.getElementsByTagName(name);
      }
    else
    {
      if (!document.getElementById(name))
        {
          return false;
        }
      return document.getElementById(name);
    }
  }
function fm_colorize(data,output)
  {
    if (typeof(data)=='number')
      {
        if ((data < 115)&&(data > 1))
          {
            boxcolor = 'rgb(255,'+(153+data)+','+(153-data)+')';
            fm_dgeb(output, 'id').style.background = boxcolor;
          }
        if ((data > 115)&&(data < 230))
          {
            data = data - 115;
            boxcolor = 'rgb('+(255-data)+',243,63)';
            fm_dgeb(output, 'id').style.background = boxcolor;
          }
        if (data > 230)
          {
            boxcolor = 'rgb(145,243,63)';
            fm_dgeb(output, 'id').style.background = boxcolor;
          }
      }
    else if (data == 'none')
      {
        fm_dgeb(output, 'id').style.background = 'rgb(204,204,204)';
      }
    else if (data == true)
      {
        if (fm_dgeb(output, 'id').style.background = 'rgb(145,243,63)')
          {
            return true;
          }
        return false;
      }
    else
      {
        if (fm_dgeb(output, 'id').style.background = 'rgb(255,153,153)')
          {
            return true;
          }
        return false;
      }
  }
function fm_converttxt(text)
  {
    var textarray = text.split("");
    var textoutput = "";
    for(var i in textarray)
      {
        //alert(textarray[i].charCodeAt(0));
        if((textarray[i].charCodeAt(0)>47)&&(textarray[i].charCodeAt(0)<59))
          {
            textoutput = textoutput+textarray[i]; //0-9, :
          }
        if((textarray[i].charCodeAt(0)>62)&&(textarray[i].charCodeAt(0)<91))
          {
            textoutput = textoutput+textarray[i]; //A-Z
          }
        if((textarray[i].charCodeAt(0)>96)&&(textarray[i].charCodeAt(0)<123))
          {
            textoutput = textoutput+textarray[i]; //a-z
          }
        if((((textarray[i].charCodeAt(0)>34)&&(textarray[i].charCodeAt(0)<47))||(textarray[i].charCodeAt(0)==61)||(textarray[i].charCodeAt(0)==33))&&(textarray[i].charCodeAt(0)!=39))
          {
            textoutput = textoutput+textarray[i]; //#$%&()*+,-.=!
          }
      }
    return textoutput;
  }
function fm_convertnumber(text)
  {
    var textarray = text.split("");
    var textoutput = "";
    for(var i in textarray)
      {
        //alert(textarray[i].charCodeAt(0));
        if((textarray[i].charCodeAt(0)>47)&&(textarray[i].charCodeAt(0)<59))
          {
            textoutput = textoutput+textarray[i]; //0-9, :
          }
        if(textarray[i].charCodeAt(0)==47)
          {
            textoutput = textoutput+textarray[i]; //#$%&()*+,-.=!
          }
      }
    return textoutput;
  }
function fm_age(dateid,notation,rule,output)
  {
    var date = fm_dgeb(dateid, 'id').value;
    var splited = "";
    var day = 0;
    var month = 0;
    var year = 0;
    
    
    switch(notation)
      {
        case "dd.mm.yyyy":
          splited = date.split(".");
          day = splited[0];
          month = splited[1];
          year = splited[2];
          break;
        case "yyyy.mm.dd":
          splited = date.split(".");
          day = splited[2];
          month = splited[1];
          year = splited[0];
          break;
        case "mm/dd/yyyy":
          splited = date.split("/");
          day = splited[1];
          month = splited[0];
          year = splited[2];
          break;
        default:
          break;
      }
    
    var schaltjahr = 0;
    if(((year % 4 == 0) && ((year % 100!= 0) || (year % 400 == 0))))
      {
        schaltjahr = 1;
      }
    
    var error = 0;
    if((day<1)||(day>31)||(month<1)||(month>12))
      {
        error = 1;
      }
    if(((month==4)||(month==6)||(month==9)||(month==11))&&(day>30))
      {
        error = 1;
      }
    if(month==2)
      {
        if((schaltjahr==1)&&(day>29))
          {
            error = 1;
          }
        else if((schaltjahr==0)&&(day>28))
          {
            error = 1;
          }
      }
      
    var now = new Date();
    var nowts = now.getTime()/31556952000;  
    var indate = new Date(year, month, day, 1,0,0);
    var timestamp = indate.getTime()/31556952000;
    
    if((year<1000)||(year>now.getFullYear()))
      {
        error = 1;
      }

    if((isNaN(timestamp))||(error == 1))
      {
        fm_colorize(false,output);
        return false;
      }
    else
      {
        
        fm_number(nowts-timestamp,rule,output);
        return true;
      }
  }
function fm_date(dateid,notation,output)
  {
    var date = fm_dgeb(dateid, 'id').value;
    var splited = "";
    var day = 0;
    var month = 0;
    var year = 0;
    
    switch(notation)
      {
        case "dd.mm.yyyy":
          splited = date.split(".");
          day = splited[0];
          month = splited[1];
          year = splited[2];
          break;
        case "yyyy.mm.dd":
          splited = date.split(".");
          day = splited[2];
          month = splited[1];
          year = splited[0];
          break;
        case "mm/dd/yyyy":
          splited = date.split("/");
          day = splited[1];
          month = splited[0];
          year = splited[2];
          break;
        default:
          break;
      }
    
    var schaltjahr = 0;
    if(((year % 4 == 0) && ((year % 100!= 0) || (year % 400 == 0))))
      {
        schaltjahr = 1;
      }
    
    var error = 0;
    if((day<1)||(day>31)||(month<1)||(month>12))
      {
        error = 1;
      }
    if(((month==4)||(month==6)||(month==9)||(month==11))&&(day>30))
      {
        error = 1;
      }
    if(month==2)
      {
        if((schaltjahr==1)&&(day>29))
          {
            error = 1;
          }
        else if((schaltjahr==0)&&(day>28))
          {
            error = 1;
          }
      }
    
    var indate = new Date(year, month, day, 1,0,0);
    var timestamp = indate.getTime()/1000;
    
    
    if((isNaN(timestamp))||(error == 1))
      {
        fm_colorize(false,output);
        return false;
      }
    else
      {
        fm_colorize(true,output);
        return true;
      }
  }
function fm_email(email,output)
  {
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,7})$/;
    if(reg.test(email) == false)
      {
        fm_colorize(false,output);
        return false;
      }
    else
      {
        fm_colorize(true,output);
        return true;
      }
  }
function fm_number(innumber,rule,output)
  {
    var number = parseInt(innumber);
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
        fm_colorize(true,output);
        return false;
      }
    else
      {
        fm_colorize(false,output);
        return false;
      }
      
  }
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
            ++uletter;
          }
        else if((valunicode > 0x60)&&(valunicode < 0x7B)) //Kleinbuchstaben a-z
          {
            ++lletter;
          }
        else if((valunicode > 0x2F)&&(valunicode < 0x3A)) //Zahlen 0-9
          {
            ++numbers;
          }
        else if((valunicode > 0x20)&&(valunicode < 0x7F)) // Sonderzeichen
          {
            ++special;
          }
        else if((valunicode < 0x21)||(valunicode > 0x7E))
          {
            
          }
      }
    complex = ((uletter*lletter*numbers*special)+Math.round(uletter*1.8+lletter*1.5+numbers+special*2))-6;
    fm_colorize(complex,output);
  }
function fm_repeat(idone,idtwo,output)
  {
    if(fm_dgeb(idone, 'id').value != fm_dgeb(idtwo, 'id').value)
      {
        fm_colorize(false,output);
        return false;
      }
    else
      {
        fm_colorize(true,output);
        return true;
      }
  }
function fm_cleartext(text,output)
  {
    var textarray = text.split("");
    var textoutput = "";
    for(var i in textarray)
      {
        //alert(textarray[i].charCodeAt(0));
        if((textarray[i].charCodeAt(0)>47)&&(textarray[i].charCodeAt(0)<59))
          {
            textoutput = textoutput+textarray[i]; //0-9, :
          }
        if((textarray[i].charCodeAt(0)>62)&&(textarray[i].charCodeAt(0)<91))
          {
            textoutput = textoutput+textarray[i]; //A-Z
          }
        if((textarray[i].charCodeAt(0)>96)&&(textarray[i].charCodeAt(0)<123))
          {
            textoutput = textoutput+textarray[i]; //a-z
          }
        if((((textarray[i].charCodeAt(0)>34)&&(textarray[i].charCodeAt(0)<47))||(textarray[i].charCodeAt(0)==61)||(textarray[i].charCodeAt(0)==33))&&(textarray[i].charCodeAt(0)!=39))
          {
            textoutput = textoutput+textarray[i]; //#$%&()*+,-.=!
          }
      }
    //alert(textoutput);
    fm_dgeb(output, 'id').value = textoutput;
  }
