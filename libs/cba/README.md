#CBS

##JavaScript Cross Browser Ajax

###Version 1.1

###Lizenz MIT

####Key Features:

* Extended Cross Browser Compatibility
* works with IE5.0+, Moz 1.7+, FF1.0+, Opera7.3+, Safari
* small size. 4.9Kb compressed
* Data can loaded from different host
* Easy to Use

####How to use CrossBrowserAjax Library:

* include the library file in your <head></head> section like this:

`` <script src="cba.js"></script>``

* make the ajax request and update content by calling cbaUpdateElement(elementID,url), for example:

`` <span id="myElement"></span><a href="javascript://" 
onClick="cbaUpdateElement('myElement', 'userinfo.php?data=mydata');">
Update myElement</a>``

It will load data returned from "userinfo.php?data=mydata" to "myElement".

####Ajax Response in CrossBrowserAjax

The server response in this example should look like this:

``_cba.ready (
   0, // request id
   'Data...' // data
);``

A request handler can be written in any server language (PHP, JSP, ASP etc..). Every CrossBrowserAjax response must be wrapped in _cba.ready

``_cba.ready (
	// your response data here
);``

The server request handler for our example, written in php ( userinfo.php ):

``<?php $answer = 'Data...'; ?> 
_cba.ready ( 
   <?php  echo $_GET['_cba_request_id'];?>, 
   "<?php echo addslashes($answer);?>"
);``