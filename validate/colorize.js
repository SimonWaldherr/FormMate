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