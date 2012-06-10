function fm_addevent( obj, type, fn )
  {
    if ( obj.attachEvent )
      {
        obj['e'+type+fn] = fn;
        obj[type+fn] = function(){obj['e'+type+fn]( window.event );}
        obj.attachEvent( 'on'+type, obj[type+fn] );
      }
    else
      {
        obj.addEventListener( type, fn, false );
      }
  }

function fm_addfmevents()
  {
    var allinputelements = document.getElementsByTagName('input');
    for(var i in allinputelements)
      {
        var classes = allinputelements[i].previousSibling.className;
        if(classes.indexOf('fm_')!=-1)
          {
            if(classes.indexOf('fm_email')!=-1)
              {
                fm_addevent(allinputelements[i], 'click', fm_email(allinputelements[i].id, "abc"));
              }
            if(classes.indexOf('fm_date')!=-1)
              {
                
              }
            if(classes.indexOf('fm_age')!=-1)
              {
                
              }
            if(classes.indexOf('fm_number')!=-1)
              {
                
              }
            if(classes.indexOf('fm_password')!=-1)
              {
                
              }
            if(classes.indexOf('fm_repeat')!=-1)
              {
                
              }
            if(classes.indexOf('fm_text')!=-1)
              {
                
              }
            if(classes.indexOf('fm_float')!=-1)
              {
                
              }
            //alert(allinputelements[i].parentNode.innerHTML);
          }
        //alert(allinputelements[i].previousSibling.className);
        //alert(allinputelements[i].previousSibling.innerHTML);
        //allinputelements[i].class
      }
  }

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
    var dots = 0;
    for(var i in textarray)
      {
        //alert(textarray[i].charCodeAt(0));
        if((textarray[i].charCodeAt(0)>47)&&(textarray[i].charCodeAt(0)<59))
          {
            textoutput = textoutput+textarray[i]; //0-9, :
          }
        if(((textarray[i].charCodeAt(0)==46)||(textarray[i].charCodeAt(0)==44))&&(dots == 0))
          {
            textoutput = textoutput+'.'; //#$%&()*+,-.=!
            dots = 1;
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
    //alert(email);
    alert(document.getElementById(email).value);
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
    var checkf = 0;
    var checks = 0;
    var number = parseInt(innumber);
    var rulenumbers = rule.split("-");
    
    if((number>=rulenumbers[0])||(rulenumbers[0]=='x'))
      {
        checkf = 1;
      }
    if((number<=rulenumbers[1])||(rulenumbers[1]=='x'))
      {
        checks = 1;
      }
    if(isNaN(innumber))
      {
        checkf = 0;
      }

    if((checkf == 1)&&(checks == 1))
      {
        fm_colorize(true,output);
        return true;
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
    var textoutput = fm_converttxt(text);
    fm_dgeb(output, 'id').value = textoutput;
  }
function fm_clearfloat(text,output)
  {
    var textoutput = fm_convertnumber(text);
    fm_dgeb(output, 'id').value = textoutput;
  }