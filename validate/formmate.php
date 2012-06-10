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
		return $text;
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
		return $textoutput;
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

function fm_hashmix($text, $salt="!entersalthere!1", $rounds=5120)
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

function fm_md5($text)
  {
    return md5($text);
  }

?>