<?php

function uniord($ch) {

	$n = ord($ch{0});

	if ($n < 128) {
		return $n; // no conversion required
	}

	if ($n < 192 || $n > 253) {
		return false; // bad first byte || out of range
	}

	$arr = array(1 => 192, // byte position => range from
				 2 => 224,
				 3 => 240,
				 4 => 248,
				 5 => 252,
				 );

	foreach ($arr as $key => $val) {
		if ($n >= $val) { // add byte to the 'char' array
			$char[] = ord($ch{$key}) - 128;
			$range  = $val;
		} else {
			break; // save some e-trees
		}
	}

	$retval = ($n - $range) * pow(64, sizeof($char));

	foreach ($char as $key => $val) {
		$pow = sizeof($char) - ($key + 1); // invert key
		$retval += $val * pow(64, $pow);   // dark magic
	}

	return $retval;
}
function uni_strsplit($string, $split_length=1)
{
	preg_match_all('`.`u', $string, $arr);
	$arr = array_chunk($arr[0], $split_length);
	$arr = array_map('implode', $arr);
	return $arr;
}

class LZW {
	function compress($uncompressed) {
		$dictSize = 256;
		$dictionary = array();
		for ($i = 0; $i < 256; $i++) {
			$dictionary[chr($i)] = $i;
		}
		$w = "";
		$result = "";
		for ($i = 0; $i < strlen($uncompressed); $i++) {
			$c = $this->charAt($uncompressed, $i);
			$wc = $w.$c;
			if (isset($dictionary[$wc])) {
				$w = $wc;
			} else {
				if ($result != "") {
					$result .= ",".$dictionary[$w];
				} else {
					$result .= $dictionary[$w];
				}
				$dictionary[$wc] = $dictSize++;
				$w = "".$c;
			}
		}
		if ($w != "") {
			if ($result != "") {
				$result .= ",".$dictionary[$w];
			} else {
				$result .= $dictionary[$w];
			}
		}
		return $result;
	}
	function decompress($compressed) {
		echo $compressed;
		$compressed1 = uni_strsplit($compressed);
		$compressed = array();
		$count;
		var_dump($compressed1);
		foreach($compressed1 as $key)
		  {
			//$compressed[] = ord(utf8_encode($key));
			$compressed[] = uniord($key);
			echo "\n".ord($key)." ".utf8_decode($key)." ".utf8_encode($key)." ".$key." /".uniord($key)."/ ".++$count;
		  }
		//$compressed = explode(",", $compressed);
		$dictSize = 256;
		$dictionary = array();
		for ($i = 1; $i < 256; $i++) {
			$dictionary[$i] = chr($i);
		}
		$w = chr($compressed[0]);
		$result = $w;
		for ($i = 1; $i < count($compressed); $i++) {
			$entry = "";
			$k = $compressed[$i];
			if (isset($dictionary[$k])) {
				$entry = $dictionary[$k];
			} else if ($k == $dictSize) {
				$entry = $w.$this->charAt($w, 0);
			} else {
				return null;
			}
			$result .= $entry;
			$dictionary[$dictSize++] = $w.$this->charAt($entry, 0);
			$w = $entry;
		}
		return $result;
	}
	function charAt($string, $index){
		if($index < mb_strlen($string)){
			return mb_substr($string, $index, 1);
		} else{
			return -1;
		}
	}
};

//$lzw = new LZW();
//$cmp = $lzw->compress("http://webdevwonders.com");
//$dcmp = $lzw->decompress($cmp);

?>