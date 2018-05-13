let backendHost;

const hostname = window && window.location && window.location.hostname;
console.log('hostname: ' + hostname)
if(hostname === 'localhost') {
    backendHost = 'http://localhost:3090';
} else if (hostname === '192.168.0.138') {
    backendHost = 'http://192.168.0.138:3090'
} else {
    backendHost = 'https://rss-be-fantastic-kookaburra.cfapps.io'; // TODO
}

export const API_ROOT = backendHost;