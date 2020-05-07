/**
 * Config for OAuth2 and REST requests.
 * 
 * This will have to change in production.
 * @todo: Research how config files are managed live.
 */

 const rootURL = '';

 const config = {
     rootURL: rootURL,
     taskRoute: `${rootURL}/wp-json/wp/v2/tasks/`,
     authURI: `${rootURL}/oauth/authorize`,
     clientID: '',
     responseType: 'token',
     tokenName: 'taskAppToken'
 }

 export default config;