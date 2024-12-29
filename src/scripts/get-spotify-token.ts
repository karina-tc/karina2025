export const clientId = 'your_client_id';
export const scope = 'user-read-currently-playing user-read-recently-played';
export const redirectUri = 'http://localhost:4321/callback';

const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scope)}`;

console.log('Visit this URL to authorize:', authUrl);