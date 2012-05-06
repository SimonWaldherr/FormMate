function fm_repeat(idone,idtwo,output)
  {
    if(fm_dgeb(idone, 'id').value != fm_dgeb(idtwo, 'id').value)
      {
        fm_dgeb(output, 'id').style.background = 'rgb(255,153,153)';
        return false;
      }
    else
      {
        fm_dgeb(output, 'id').style.background = 'rgb(145,243,63)';
        //fm_dgeb(output, 'id').style.background = fm_dgeb(idone, 'id').style.background;
        return true;
      }
  }