import config from './modules/config.js';
import token from './modules/auth.js';
import logout from './modules/logout.js';
import getTaskList from './modules/loadlist.js';

logout();


if ( token === null ) {
    window.location = `${window.location.origin}/login.html`;
    
} else {
    console.log( 'token: ', token );
    getTaskList( config.taskRoute );
}