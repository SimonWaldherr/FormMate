/**
 *  CrossBrowserAjax, version 1.10
 *  (c) 2007 CrossBrowserAjax.com
 *
 *  CrossBrowserAjax is freely distributable under the terms of an MIT-style license.
 *  Type: Uncompressed
 */

/////////// DOM ////////////////////////////

/**
 * Interface for DOM
 * @class Interface for DOM
 * @author crossbrowserajax.com
 * @version 1.0
 */
function cbaDOM()
{
  
 /**
  * Remove Element 
  *
  * @author crossbrowserajax.com
  * @param _element dom-element
  * @member cbaDOM
  */
  this.removeElement = function(_element)
  {
    _element.parentNode.removeChild(_element);
  }
  
  /**
   * Create Element
   *
   * @author crossbrowserajax.com
   * @return link on element
   * @param _parent parent for element
   * @param _type type of element (tag name)
   * @param _property assotiative array for property. Example: { 'className' : 'my-class' , 'style.color' : '#f00' }. 
   * Warning: support only one-level & two-level parameters (one-level - 'className' or two-level - 'style.color')
   * @param _text tag content (any text)
   * @member cbaDOM
   */
  this.createElement = function( _parent, _type, _property, _text )
  {
    // create element
    var el = document.createElement(_type);
    // set all properties
    for (var k in _property) 
    {
      var keys = k.split('.');
      // if 'k' - object
      if (keys.length == 2)
      {
        el[keys[0]][keys[1]] = _property[k];
      }
      else
      {
        el[k] = _property[k];
      }  
    }
    // add text in the tag
    if (_text != '') el.innerHTML = _text;
    // add in a parent
    _parent.appendChild(el);
    // link on element
    return el;
  }

 /**
  * Create Script-Tag.
  * Please! Don't use function 'createElement' for creating SCRIPT-Tag
  *
  * @author crossbrowserajax.com
  * @param _parent parent for element
  * @param _id id for parent tag (span)
  * @param _request url-request
  * @member cbaDOM
  */  
  this.createScript = function( _parent, _id, _request )
  { 
    var span = this.createElement( _parent, 'span', {'style.display' : 'none', 'id' : _id}, '%<s' + 'cript></' + 'script>' );
    setTimeout(
      function(){
        var _script  = span.getElementsByTagName('script')[0];
        _script.type = 'text/javascript';
        _script.src  = _request;
        }, 5);
  }  
}

/////////// CACHE ////////////////////////////


/**
 * Cache
 *
 * @package CBA
 * @author crossbrowserajax.com
 * @version 1.0
 * @param buffer_size buffer size (amount request)
 * @param length_ct length string for analysis (for control total)
 */
function cbaCache( buffer_size, length_ct )
{
  
  /**
   * Request Control Total
   *
   * @author crossbrowserajax.com
   * @return control total ( integer )
   * @param _request url-request
   * @param _length length string for analysis
   */
  this._rct = function( _request, _length )
  {
    //_request  = escape(_request);
    var control = 0;
    var start   = Math.floor(_request.length / _length);
    if (start < 1) start = 1;
    for (var i  = _request.length; i > 0; i-=start){
      control  += '                                  !"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\]^_`abcdefghijklmnopqrstuvwxyz{|}~ˆ?‚?„…†‡?‰S‹??Z??‘’“”•–—?™s›??zY ???¤?¦§?©?«¬­®?°±???µ¶·???»????AAAAAA?CEEEEIIII?NOOOOO?OUUUUY??aaaaaa?ceeeeiiii?nooooo?ouuuuy?y'.indexOf(_request.charAt(i));}
    return control;
  }
  
  /**
   * Search Cache
   *
   * @author crossbrowserajax.com
   * @param _request url-request
   */
  this._search = function( _request )
  {
    // hash generate
    var _hash = this._rct( _request, this._length_ct );
    // viewing the cache
    for (i in this._cache)
    {
      if (this._cache[i][0] == _hash && this._cache[i][1] == _request)
      {
        this._search_buffer = this._data_cache[i];
        return true;
      }
    }
    return false;
  }
  
  /**
   * Add Cache
   *
   * @author crossbrowserajax.com
   * @param _request url-request
   * @param _data data
   */
  this._add  = function( _request, _data )
  {
    // checking the limit of memories
    if ( this._cache_index >= this._buffer_size )
    {
      this._cache_index = 0;
    }
    // hash generate
    var _hash = this._rct( _request, this._length_ct );
    // caching
    this._cache[this._cache_index] = [_hash, _request];
    this._data_cache[this._cache_index] = _data;
    
    this._cache_index++;
  }
  
  /**
   * Initializing
   *
   * @author crossbrowserajax.com
   * @param buffer_size buffer size
   * @param length_ct length string for analysis (for control total)
   */
  this._init = function( buffer_size, length_ct )
  {
  
    /** buffer_size */
    this._buffer_size = buffer_size;
    
    /** length string for analysis (for control total) */
    this._length_ct = length_ct;
    
    /** cache */
    this._cache       = new Array();
    
    /** data cache */
    this._data_cache  = new Array();
    
    /** current index of cache */
    this._cache_index = 0;
    
    /** search result buffer */
    this._search_buffer = null;
    
  }

  /** Init Class */
  this._init( buffer_size, length_ct );
}

/////////// C.B.A. ( core ) ////////////////////////////

/**
 * C.B.A.
 * 
 * @class CrossBrowserAjax. Core.
 * @author crossbrowserajax.com
 * @version 1.10
 * @base cbaDOM
 */
function cbaRequest()
{
  
  /**
   * Initializing the C.B.A. Class
   *
   * @author crossbrowserajax.com
   * @member cbaRequest
   */
  this._init = function()
  {
    /** handler error status */
    this._handler_error = true;
    /* enable handler error */
    if ( this._handler_error )
    {
      window.onerror = this.cbaJsError;
    }
    
    /** parent element id-name */
    this._parent_id_name = '_cba_parent_id';
    
    /** name id in url-request */
    this._url_id = '_cba_request_id';
        
    /** prefix for created request */
    this._id_prefix = '_cba_pack_';
    
    /** interface for dom */
    this.dom = new cbaDOM();
    
    /** parent element */
    this._parent_element = this.createParentElement();
    
    /** cache of requests */
    this._requests = new Array();
    
    /* cache */
    /** caching enabled  */
    this._caching_enabled = true;
    
    if ( this._caching_enabled )
    {
    
      /** buffer_size */
      this._buffer_size = 25;
      
      /** length string for analysis (for control total) */
      this._length_ct = 100;
      
      /** cache */
      this.cache = new cbaCache( this._buffer_size, this._length_ct );
    
    }
  }
  
  /**
   * Handler Errors
   * @author crossbrowserajax.com
   * @param _message error description
   * @param _url url
   * @param _line error line
   * @member cbaRequest
   */
  this.cbaJsError = function(_message, _url, _line)
  {
    var _file  = "File: " + _url + " :: " + _line + "\n";
    var _title = "There was an error on this page.\n--------------------------\n";
    var _error = _title;
    _error  += "Error: " + _message + "\n";
    _error  += _file;
    if ( _message.indexOf('unterminated string literal') + _message.indexOf('missing ;') + _message.indexOf('Syntax error') > -3){
    _error += '--------------------------\nRecommendation:\n   Check response from the server.\n   He may return incorrect JavaScrip.';
    }
    alert(_error);
  }
      
  /**
   * Making the Container for <SCRIPT>
   *
   * @author crossbrowserajax.com
   * @return element
   * @member cbaRequest
   */
  this.createParentElement = function()
  {
    // create element unless exists
    if ( document.getElementById( this._parent_id_name ) )
    {
      return document.getElementById( this._parent_id_name );
    }
    else
    {
      return this.dom.createElement( document.body, 'div', {'id' : this._parent_id_name}, '' );
    }
  }
  
  /**
   * Remote Query
   *
   * @author crossbrowserajax.com
   * @param _url url-address for backend
   * @param _callback callback-function
   * @param _use_cache use the cache (unnecessary argument)
   * @member cbaRequest
   */
  this.query = function( _url , _callback )
  {
    // set _use_cache
    if ( arguments.length > 2 ) 
    {
      var _use_cache = arguments[2];
    }
    else
    {  
      var _use_cache = true;
    }
    
    // search in cache();
    if ( _use_cache && ( this.cache && this.cache._search( _url ) ) )
    {
      // rec result in 'this.answer'
      this.answer = this.cache._search_buffer;
      // run user function
      if (_callback instanceof Function) _callback();
    }  
    else
    {
      // create id
      var _id = this._requests.push( {'callback' : _callback, 'request' : _url } ) - 1;
      /** shaping url */
      if ( _url.indexOf('?') == -1 )
      {
        _url += '?';
      }
      else
      {
        _url += '&';
      }
      _url += this._url_id + '=' + _id;
      // create <SCRIPT>
      this.dom.createScript( this._parent_element, this._id_prefix + _id, _url );
    }  
  }

  /**
   * Processing Results
   *
   * @author crossbrowserajax.com
   * @param _id id of request
   * @param _result response
   * @member cbaRequest
   */
  this.ready = function( _id, _result )
  {
    // rec result in 'this.answer'
    this.answer = _result;
    // save in cache
    if ( this.cache ) this.cache._add( this._requests[_id].request, _result );
    // run user function
    if (this._requests[_id].callback instanceof Function) this._requests[_id].callback();
    // remove <SCRIPT>
    if (document.getElementById( this._id_prefix + _id ))
    {
      this.dom.removeElement( document.getElementById( this._id_prefix + _id ) );
    }
    // clear id
    delete( this._requests[_id] );
  }
  
  /** Init Class */
  this._init( arguments );
  
}  


/////////// use CBA ////////////////////////

/**
 * CBA Object. Internal Variable for CBA
 * Do not Use This Variable for Other Integer.
 */
var _cba = null;
 
/**
 * Load of Data In ID.
 *
 * @author crossbrowserajax.com
 * @version 1.00
 * @param _doc_id ID in (X)HTML-document
 * @param _url url-address for request (backend)
 * @param _loading_text text/html (unnecessary argument)
 * @param _caching caching enabled (unnecessary argument)
 * @param _template template for show (unnecessary argument)
 * More:
 * if parameter is not given or is null, that occurs simple insertion,
 * otherwise occurs processing the pattern.
 * %keyname%, keyname - key in array
 * Exapmle:
 *   // Error Response
 *   _cba.ready (
 *    100, // 100 is ID
 *    {
 *      'age'  : '50',
 *      'city' : 'New York'
 *    }
 *  );
 *   // Template Value:   'Age: %age%; City: %city%'
 *   // Result:            Age: 50; City: New York
 * @param _error_template template for error ( for incorrect data )(unnecessary argument)
 * _error_template is array. First parameter - sign of the error, second parameter - text for show.
 * Exapmle: [null,'Error!']. If response == null Then print 'Error!'.
 * More:
 *   // Error Response
 *   _cba.ready (
 *    100, // 100 is ID
 *    null // sign of the error
 *  );
 * @param _user_method method (unnecessary argument)
 * Exapmle: function(){ alert('Loading Completed'); }
 * @base cbaRequest
 */
 function cbaUpdateElement ( _doc_id, _url )
 {
    // set _loading_text
    var _loading_text = (arguments[2]) ? arguments[2] : null;
    // set _caching
    var _caching = (arguments.length > 3) ? arguments[3] : true;
    // set _template
    var _template = (arguments[4]) ? arguments[4] : '%1';
    // set error template
    var _error_template = (arguments[5]) ? arguments[5] : null;
    // set user method
    var _user_method = (arguments[6]) ? arguments[6] : null;
    
    // status of loading
    if (_loading_text) document.getElementById( _doc_id ).innerHTML = _loading_text;
    
    // create CBA object (unless exists)
    if (!_cba) _cba = new cbaRequest();
    // query
    _cba.query( _url, function(){
      // if it is used error template
      if ( ( _error_template) && _cba.answer == _error_template[0] )
      {
        // write for error
        document.getElementById( _doc_id ).innerHTML = _error_template[1]; 
      }
      else
      {  
        // is object
        if (typeof(_cba.answer) == 'object')
        {
          var _result = _template;
          // see all values and keys
          for (key in _cba.answer)
          {
            _result = _result.replace('%' + key + '%', _cba.answer[key]); 
          }
          // write result
          document.getElementById( _doc_id ).innerHTML = _result; 
        }
        else
        { 
          // write result 
          document.getElementById( _doc_id ).innerHTML = _template.replace('%1', _cba.answer); 
        }
      }
      // run user method
      if ( _user_method&&_user_method instanceof Function ) _user_method();
    }, _caching );
 }