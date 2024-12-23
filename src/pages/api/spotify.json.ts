import type { APIRoute } from 'astro';
import SpotifyWebApi from 'spotify-web-api-node';

const spotifyApi = new SpotifyWebApi({
  clientId: import.meta.env.SPOTIFY_CLIENT_ID,
  clientSecret: import.meta.env.SPOTIFY_CLIENT_SECRET,
  refreshToken: import.meta.env.SPOTIFY_REFRESH_TOKEN
});

export const GET: APIRoute = async () => {
  try {
    const data = await spotifyApi.refreshAccessToken();
    spotifyApi.setAccessToken(data.body.access_token);

    const recentTracks = await spotifyApi.getMyRecentlyPlayedTracks({
      limit: 1
    });

    const track = recentTracks.body.items[0].track;
    
    return new Response(JSON.stringify({
      artist: track.artists[0].name,
      song: track.name,
      albumArt: track.album.images[0].url
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
};
