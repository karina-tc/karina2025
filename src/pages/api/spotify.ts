import type { APIRoute } from 'astro';
import SpotifyWebApi from 'spotify-web-api-node';

interface SpotifyData {
  artist: string;
  song: string;
  albumArt: string;
  spotifyUrl: string;
}

// Cache for storing Spotify data
let spotifyCache: {
  data: SpotifyData | null;
  timestamp: number;
} = {
  data: null,
  timestamp: 0
};
const CACHE_DURATION = 30 * 1000; // 30 seconds

const spotifyApi = new SpotifyWebApi({
    clientId: import.meta.env.SPOTIFY_CLIENT_ID,
    clientSecret: import.meta.env.SPOTIFY_CLIENT_SECRET,
    refreshToken: import.meta.env.SPOTIFY_REFRESH_TOKEN
});

export const GET: APIRoute = async () => {
    try {
        // Check cache first
        if (spotifyCache.data && Date.now() - spotifyCache.timestamp < CACHE_DURATION) {
            console.log('Returning cached data:', spotifyCache.data);
            return new Response(JSON.stringify(spotifyCache.data), {
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                    'Cache-Control': 'no-store' // Prevent browser caching
                }
            });
        }

        const data = await spotifyApi.refreshAccessToken();
        spotifyApi.setAccessToken(data.body.access_token);

        // Try to get currently playing track first
        const currentTrack = await spotifyApi.getMyCurrentPlayingTrack();
        console.log('Current track response:', currentTrack.body);

        let track;
        if (currentTrack.body && currentTrack.body.item) {
            // Use currently playing track if available
            track = currentTrack.body.item;
        } else {
            // Fall back to recently played if nothing is currently playing
            const recentTracks = await spotifyApi.getMyRecentlyPlayedTracks({ limit: 1 });
            track = recentTracks.body.items[0].track;
        }
        const responseData: SpotifyData = {
            artist: 'artists' in track ? track.artists[0].name : track.show.name,
            song: track.name,
            albumArt: 'album' in track ? track.album.images[0].url : track.images[0].url,
            spotifyUrl: track.external_urls.spotify
        };

        console.log('New data fetched:', responseData);

        // Update cache
        spotifyCache = {
            data: responseData,
            timestamp: Date.now()
        };

        return new Response(JSON.stringify(responseData), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-store' // Prevent browser caching
            }
        });
    } catch (error) {
        console.error('Spotify API error:', error);
        return new Response(JSON.stringify({ error: 'Failed to fetch' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
};