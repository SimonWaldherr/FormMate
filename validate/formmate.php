<?php

function fm_converttxt($text)
  {
	$textarray = str_split($text);
	$textoutput = '';
	foreach($textarray as $letter)
	  {
		$ascii = ord($letter);
		if((($ascii>47)&&($ascii<59))||(($ascii>62)&&($ascii<91))||(($ascii>96)&&($ascii<123)))
		  {
			$textoutput .= $letter;
		  }
		if(((($ascii>34)&&($ascii<47))||($ascii==61)||($ascii==33))&&($ascii!=39))
		  {
			$textoutput .= $letter;
		  }
	  }
	return $textoutput;
  }

function fm_convertnumber($text, $correct=0)
  {
	if(is_numeric($text))
	  {
		return ($text+1-1);
	  }
	elseif($correct)
	  {
		$text = str_ireplace(array(e,z,i,o,s,b),array(3,7,1,0,5,8),$text);
		$textarray = str_split($text);
		$textoutput = '';
		$dots = 0;
		foreach($textarray as $letter)
		  {
			if((ord($letter)>47)&&(ord($letter)<59))
			  {
				$textoutput .= $letter;
			  }
			if(((ord($letter)==46)||(ord($letter)==44))&&($dots == 0))
			  {
				$textoutput .= '.';
				$dots = 1;
			  }
		  }
		return ($textoutput+1-1);
	  }
	else
	  {
		return false;
	  }
  }

function fm_nohtml($text)
  {
	$text = strip_tags(addslashes($text));
	return $text;
  }

function fm_email($text, $correct=0)
  {
	if(eregi('^[a-z0-9._-]+@[a-z0-9._-]+\.([a-z]{2,8})$', mb_strtolower($text)))
	  {
		if(filter_var($text, FILTER_VALIDATE_EMAIL))
		  {
			return mb_strtolower($text);
		  }
	  }
	else
	  {
		if($correct)
		  {
			$text = fm_converttxt(str_ireplace(array('<at>','(at)',' at ',' dot ','<dot>','(dot)', ' '),array('@','@','@','.','.','.',''),mb_strtolower($text)));
			if((eregi('^[a-z0-9._-]+@[a-z0-9._-]+\.([a-z]{2,8})$', mb_strtolower($text)))&&(filter_var($text, FILTER_VALIDATE_EMAIL)))
			  {
				return mb_strtolower($text);
			  }
			else
			  {
				return false;
			  }
		  }
		else
		  {
			return false;
		  }
	  }
  }

function fm_hashmix($text, $salt='!entersalthere!1', $rounds=5120)
  {
	if($rounds>999999999)
	  {
		$rounds = 999999900;
	  }
	if($rounds<1000)
	  {
		$rounds = 1200;
	  }
	if((strlen($salt)<16)||(strlen($salt)>16))
	  {
		$salt = str_split(hash("SHA512", $salt), 16);
		$salt = str_split(hash("whirlpool",$salt[2].strtoupper(md5($salt[3])).strtolower(md5($salt[4]))), 16);
		$salt = ucfirst($salt[1]);
	  }
	$return = crypt($text, '$6$rounds='.$rounds.'$'.$salt.'$');
	$return = crypt($return.hash("SHA256", $text.$return.$salt.crc32($return).md5($return)), '$6$rounds=1000$'.$salt.'$');
	$return = explode($salt.'$', $return);
	return $return[1];
  }
function fm_crazyhash($text, $salt='!entersalthere!1', $search='crc')
  {
    $found = 0;
    $i = 1;
    while(!$found)
      {
        $text = crypt($text, '$6$rounds=1000$'.$salt.'$');
        $found = strpos($text, $search);
        ++$i;
        if($i>10000)
          {
            $found=true;
          }
      }
    return hash("SHA512", $i.$i.$text.$i.$i);
  }

function fm_md5($text)
  {
    return md5($text);
  }

function fm_since($date1='now', $output='auto', $date2='0')
  {
    if(strlen($output)=='1')
      {
        switch($output)
          {
            case "s":
                $output = "sec";
                break;
            case "i":
                $output = "min";
                break;
            case "h":
                $output = "hour";
                break;
            case "d":
                $output = "days";
                break;
            case "w":
                $output = "weeks";
                break;
            case "m":
                $output = "month";
                break;
            case "y":
                $output = "years";
                break;
          }
      }
    if($date1=='now')
      {
        $date1=time();
      }
    $dif['sec'] = $date1 - $date2;
    $dif['min'] = $dif['sec']/60;
    $dif['hour'] = $dif['min']/60;
    $dif['days'] = $dif['hour']/24;
    $dif['weeks'] = $dif['days']/7;
    $dif['month'] = $dif['weeks']/4.348125;
    $dif['years'] = $dif['days']/365.2425;
    if($output == 'auto')
      {
        if($dif['years']>0.9)
          {
            $returnfloat = round($dif['years'], 1);
            $returntext = "year";
          }
        elseif($dif['month']>0.9)
          {
            $returnfloat = round($dif['month'], 1);
            $returntext = "month";
          }
        elseif($dif['weeks']>0.9)
          {
            $returnfloat = round($dif['weeks'], 1);
            $returntext = "week";
          }
        elseif($dif['days']>0.9)
          {
            $returnfloat = round($dif['days'], 1);
            $returntext = "day";
          }
        elseif($dif['hour']>0.9)
          {
            $returnfloat = round($dif['hour'], 1);
            $returntext = "hour";
          }
        elseif($dif['min']>0.9)
          {
            $returnfloat = round($dif['min'], 1);
            $returntext = "minute";
          }
        else
          {
            $returnfloat = round($dif['sec'], 1);
            $returntext = "second";
          }
        if($returnfloat>1)
          {
            $returntext = $returntext."s";
          }
        return $returnfloat." ".$returntext;
      }
    else
      {
        return round($dif[$output], 1);
      }
  }

function fm_password($text)
  {
    $valunicode = "";
    $keys = str_split($text);
    $numbers = 1;
    $uletter = 1;
    $lletter = 1;
    $special = 1;
    $complex = 0;
    foreach($keys as $key)
      {
        $ascii = ord($key);
        if(($ascii>0x40)&&($ascii<0x5B))
          {
            ++$uletter;
          }
        if(($ascii>0x60)&&($ascii<0x7B))
          {
            ++$lletter;
          }
        if(($ascii>0x2F)&&($ascii<0x3A))
          {
            ++$numbers;
          }
        if(($ascii>0x20)&&($ascii<0x7F))
          {
            ++$special;
          }
      }
    $complex = ((($uletter*$lletter*$numbers*$special)+round($uletter*1.8+$lletter*1.5+$numbers+$special*2))-7);
    return $complex;
    //BAD     <  200
    //MIN     >  600
    //OK      >  900
    //GOOD    > 2000
    //PERFECT > 2600
  }

?>