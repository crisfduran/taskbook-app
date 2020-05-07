import config from './config.js';

/**
 * Get OAuth2 token from address bar.
 * 
 * @todo This will most def have to change in prod. Research.
 */

 function removeHash() {
     history.pushState("", document.title, window.location.pathname + window.location.search);
 }

 let token = sessionStorage.getItem(config.tokenName);

 const queryString = window.location.hash.substr(1);
 let urlParams = new URLSearchParams(queryString);
 let newToken = urlParams.get('access_token');

 let currentTime = Math.round( ( new Date() ).getTime() / 1000 );

 if ( currentTime > sessionStorage.getItem( 'tokenExpiry' ) ) {
     sessionStorage.removeItem(config.tokenName);
     token = null;
 }

 if ( token === null && newToken === null ) {
     window.location = `${window.location.origin}/login.html`;
 } else {
     if ( token === null ) {
         sessionStorage.setItem( config.tokenName, newToken );

         sessionStorage.setItem( 'tokenExpiry', (Math.round(( new Date()).getTime() / 1000 ))+3600 );

         removeHash();
     }
 }

 token = sessionStorage.getItem(config.tokenName;)

 export default token;