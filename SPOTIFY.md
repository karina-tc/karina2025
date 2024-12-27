# Spotify Integration Setup Guide

## Prerequisites
- Spotify Developer Account
- Spotify Application registered at https://developer.spotify.com/dashboard

## Environment Variables
Required variables in `.env`: 

env
SPOTIFY_CLIENT_ID=your_client_id
SPOTIFY_CLIENT_SECRET=your_client_secret
SPOTIFY_REFRESH_TOKEN=your_refresh_token


## Getting a New Refresh Token

1. Visit the authorization URL (replace CLIENT_ID):
https://accounts.spotify.com/authorize?client_id=YOUR_CLIENT_ID&response_type=code&redirect_uri=http://localhost:4321/callback&scope=user-read-recently-played

2. After authorization, you'll be redirected to your callback URL with a code

3. Use the provided script to exchange the code for a refresh token:
bash
node get-spotify-token.js


4. Update your `.env` file with the new refresh token

## Troubleshooting

### Common Issues:
1. "Invalid authorization code"
   - Get a new authorization code and try again
   - Codes expire quickly, use them immediately

2. "Failed to fetch"
   - Check if your environment variables are loaded
   - Verify your Spotify application settings
   - Ensure redirect URI matches exactly

3. No music displaying
   - Check browser console for errors
   - Verify you have recently played tracks on Spotify
   - Restart the Astro dev server after env changes