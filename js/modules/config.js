/**
 * Config for OAuth2 and REST requests.
 * 
 * This will have to change in production.
 * @todo: Research how config files are managed live.
 */

 const rootURL = 'http://restapi.local';

 const config = {
     rootURL: rootURL,
     taskRoute: `${rootURL}/wp-json/wp/v2/tasks/`,
     authURI: `${rootURL}/oauth/authorize`,
     clientID: 'wisjLQX9uI6MxImVRqqDmO3Yr4a8SbJRkbiTmjxp',
     responseType: 'token',
     tokenName: 'taskAppToken'
 }

 export default config;