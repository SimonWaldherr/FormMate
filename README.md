FormMate
========

FormMate is a Framework for making web forms.

With the FormMate form generator, you can generate self validating (client and server side) forms and the Database backend.

###Generate
in this folder, is the software for automaticle generating webforms.

###Datastore
the Backend to store the forms generated with the generator.

###Validate
functions for **v**alidating/**f**ilter/**c**alculate:  

Function      | PHP | JS | Example PHP | Example JS |
--------------|-----|----|-------------|------------|
eMail         | v/f | v  | `fm_email($_POST['eMail'], 1);` | `fm_email(this.value,'textfield2');` | 
IBAN          |     |    |             |            |
Number        | f   | f  | `fm_convertnumber($_POST['Number'], 1);` | `fm_clearfloat(this.value,'textfield3');` |
Age           |     | v  |             | `fm_age(dateid,notation,rule,output);` |
Date          |     | v  |             | `fm_date(dateid,notation,output);` |
Text          | f   | f  | `fm_converttxt($_POST['Text']);` | `fm_cleartext(this.value,'textfield1');` |
no HTML       | f   |    | `fm_nohtml($_POST['NoHTML']);` | |
Hash          | c   | c  | `hash("SHA256", $_POST['Hash']);` | `hex_sha256(this.value);` |
HashMix       | c   |    | `fm_hashmix($_POST['Hash']);` | |
Password      | v   | v  | `fm_password($_POST['Password']);` | `fm_password(this.value,'textfield6');` |
Time since    | c   |    | `fm_since('now', 'days', strtotime($_POST['Date']));` | |
repeat        |     | v  |             | `fm_repeat(idone,idtwo,output);` |
Phonenumbers  |     |    |             |            |
Websites      |     |    |             |            |


###Libs
contains third party code used in FormMate.  
the following Libs where used:

Lib              | License | Version | Language |
-----------------|---------|---------|----------|
CrossBrowserAjax | MIT     | 1.1     | JS       |
jsHash           | BSD     | 2.2     | JS       |

the following Libs where not used:

* jQuery
* Prototype
* YUI
* dojo
* ExtJS
* script.aculo.us
* ...
