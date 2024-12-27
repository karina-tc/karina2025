const clientId = '59e2f90df400498ca39f6bd566646240';
const clientSecret = '6f46e11cfd8d4c48b915256830168830';

// Replace this with the code you got from the callback URL
const code = 'AQC6MTFwiWpVAQARKkJHhYcX0TPPSQC4xhWzJQ34EVkV-n2spKtNZE6Cw_aCPxpqzOMGmLq50mO8pmjOG0duBdQOD2IfaDCLiEWw2R0iy_GtyJW2of-LpgaU-egoeoLxtyAS26oVLDsIgjlslWA7hHReEG96u8JFBZqseghZb7BIfVKzgKr9cfzZnWvGiiseSy2Bz3I8l-HoJIGYrg';

async function getRefreshToken() {
  console.log('Using code:', code); // Debug line

  const params = new URLSearchParams({
    grant_type: 'authorization_code',
    code: code,
    redirect_uri: 'http://localhost:4321/callback'
  });

  console.log('Request params:', params.toString()); // Debug line

  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Authorization': 'Basic ' + Buffer.from(clientId + ':' + clientSecret).toString('base64'),
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: params
  });

  const data = await response.json();
  console.log('Full response:', data);
}

getRefreshToken(); 