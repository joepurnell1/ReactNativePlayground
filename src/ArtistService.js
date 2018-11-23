// See readme for bearer token
const bearerToken = '<<BEARER_TOKEN>>';

function getUrl(artist) {
  let formattedArtist = artist.toLowerCase().replace(/ /g,"%20");
  return (`https://api.spotify.com/v1/search?q=${formattedArtist}&type=artist`);
}

function getHeaders() {
  return ({
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${bearerToken}`
  });
}

async function searchArtist(artist) {
  if (!artist) {
    return [];
  }

  return (
    fetch(
      getUrl(artist),
      {
        'method': 'GET',
        'headers': {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${bearerToken}`
        }
      })
        .then(response => {
          if (response.status === 200) {
            return (JSON.parse(response._bodyInit).artists.items);
          }

          const returnMessage = JSON.parse(response._bodyInit).error.message;
          return [`Error getting artists status returned is ${response.status} message is \'${returnMessage}\'`];
        })
        .catch(error => { console.log('fetching error', error) })
  );
}

export default searchArtist;