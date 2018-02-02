/**
 * Amaranth - Aurelia Skeleton (http://github.com/amaranth-framework/aurelia-skeleton/)
 *
 * @link      http://github.com/amaranth-framework/aurelia-skeleton/ for the canonical source repository
 * @copyright Copyright (c) 2007-2017 IT Media Connect (http://itmediaconnect.ro)
 * @license   http://github.com/amaranth-framework/aurelia-skeleton/LICENSE MIT License
 */

 /**********************************************************************************************
  * Cookie
  **********************************************************************************************/

 /**
  * Obtain a Cookie value
  * @param  {String} name Name of the cookie
  * @return {any}         Returns null of cookie is not found, its value otherwise.
  */
 export function getCookie(name) {
     let s = document.cookie;
     let i;
     if (s) {
         for (i = 0, s = s.split('; '); i < s.length; i++) {
             s[i] = s[i].split('=', 2);
             if (unescape(s[i][0]) === name) {
                 return unescape(s[i][1]);
             }
         }
     }
     return null;
 }

 /**
  * Set a cookie
  * @param  {String}  name  Name of the Cookie
  * @param  {any}     value Value of the Cookie
  * @param  {String}  p     Properties assigned to the Cookie
  * @return {Boolean}
  */
 export function setCookie(name, value, p) {
     let s;
     let k;
     s = escape(name) + '=' + escape(value);
     if (p) {
         for (k in p) {
             if (k === 'expires') {
                 p[k] = isNaN(p[k]) ? p[k] : relativeDate(p[k]);
             }

             if (p[k]) {
                 s += '; ' + (k !== 'secure' ? k + '=' + p[k] : k);
             }
         }
     }
     document.cookie = s;
     return getCookie(name) === value;
 }

 /**
  * Return relative date based on current time
  * @private
  * @param   {Number} t Number of milliseconds to offset by
  * @returns {Date}
  */
 function relativeDate(t) {
     const now = new Date();
     return new Date(now.getTime() + t);
 }

 /**
  * Remove cookie
  * @param  {String}  name Name of the cookie to remove
  * @return {Boolean}
  */
 export function removeCookie(name) {
     return !setCookie(name, '', { expires: -1 });
 }
