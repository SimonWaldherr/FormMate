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
    else if (type == 'class')
      {
        //try later
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