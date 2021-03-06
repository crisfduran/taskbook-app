import config from './config.js';

const logout = () => {
    const logoutButton = document.querySelector( '#logout' );

    logoutButton.addEventListener( 'click', () => {
        sessionStorage.removeItem( config.tokenName );
        sessionStorage.removeItem( 'tokenExpiry' );
        window.location = `${window.location.origin}/login.html`;
    });
}

export default logout