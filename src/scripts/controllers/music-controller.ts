let musicContainer: HTMLElement | null;
let albumArt: HTMLImageElement | null;
let songName: HTMLElement | null;
let artistName: HTMLElement | null;
let spotifyBadge: HTMLAnchorElement | null;
let currentTrack: HTMLElement | null;

function updateMusicDetails(data: any) {
  if (albumArt) albumArt.src = data.albumArt;
  if (songName) songName.textContent = data.song;
  if (artistName) artistName.textContent = data.artist;
  if (spotifyBadge) spotifyBadge.href = data.spotifyUrl || '#';
  if (currentTrack) {
    // Hide the text until we have data
    currentTrack.style.opacity = '0';
    currentTrack.textContent = `Listening to ${data.artist}`;
    // Fade it in smoothly
    setTimeout(() => {
      if (currentTrack) currentTrack.style.opacity = '1';
    }, 50);
  }
}

async function fetchMusicData() {
  try {
    const response = await fetch('/api/spotify');
    if (!response.ok) return;
    const data = await response.json();
    updateMusicDetails(data);
  } catch (error) {
    // Silently fail - no need to log errors for music widget
  }
}

// Initialize elements and fetch data only once on page load
document.addEventListener('DOMContentLoaded', () => {
  // Only initialize if the music container exists
  if (!document.getElementById('music-container')) return;

  musicContainer = document.getElementById('music-container');
  albumArt = document.querySelector('.album-art');
  songName = document.querySelector('.song-name');
  artistName = document.querySelector('.artist-name');
  spotifyBadge = document.querySelector('.spotify-badge');
  currentTrack = document.querySelector('.current-track');

  // Hide the current track text initially
  if (currentTrack) currentTrack.style.transition = 'opacity 0.3s ease';
  if (currentTrack) currentTrack.style.opacity = '0';

  // Single fetch on page load
  fetchMusicData();
}); 