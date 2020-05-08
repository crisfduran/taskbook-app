import config from './modules/config.js';

const login = document.querySelector( '#login' );

login.addEventListener( 'click', () => {
    window.location = `${config.authURI}?client_id=${config.clientID}&response_type=${config.responseType}`; 
});