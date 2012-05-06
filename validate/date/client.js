function fm_date(dateid,notation,output)
  {
    
    //var timestamp = new Date();
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
        //alert("xyz");
        break;
      case "yyyy.mm.dd":
        splited = date.split(".");
        day = splited[2];
        month = splited[1];
        year = splited[0];
        //alert("xyz");
        break;
      case "mm/dd/yyyy":
        splited = date.split("/");
        day = splited[1];
        month = splited[0];
        year = splited[2];
        //alert("xyz");
        break;
      default:
        //alert("ERROR");
        break;
    }
    
    /*
    if(day<1)
      {
        day = 1;
      }
    if(day>31)
      {
        day = 31;
      }
    if(month<1)
      {
        month = 1;
      }
    if(month>12)
      {
        month = 12;
      }
    */
    
    
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
        error = 1
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
        //fm_dgeb(output, 'id').style.background = 'rgb(255,153,153)';
        return false;
      }
    else
      {
        fm_colorize(true,output);
        //fm_dgeb(output, 'id').style.background = 'rgb(145,243,63)';
        return true;
      }
    
    //alert(timestamp);
    /*
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if(reg.test(email) == false)
      {
        fm_dgeb(output, 'id').style.background = 'rgb(255,153,153)';
        return false;
      }
    else
      {
        fm_dgeb(output, 'id').style.background = 'rgb(145,243,63)';
        return false;
      }
      */
  }