let buildingData = [];

async function loadBuildingData() {
  await fetch('http://localhost:3001/umdbuilding')
    .then((result) => result.json())
    .then((resultJson) => {
      console.log('Loaded building data:', resultJson);

      buildingData = resultJson;

      const quote = document.getElementById('quote');
      quote.innerHTML = 'Enter a building abbreviation above to search.';
    });
}

function searchBuilding() {
  console.log('Search button clicked');
  console.log('Current building data:', buildingData);

  const buildingInput = document
    .getElementById('buildingInput')
    .value
    .trim()
    .toLowerCase();

  const quote = document.getElementById('quote');
  const historyList = document.getElementById('historyList');

  if (!buildingInput) {
    quote.innerHTML = 'Please enter a building abbreviation.';
    return;
  }

  const foundBuilding = buildingData.find((building) => {
    return building['abbreviation'].trim().toLowerCase() === buildingInput;
  });

  if (foundBuilding) {
    quote.innerHTML = `
      <strong>${foundBuilding['abbreviation'].toUpperCase()} - ${foundBuilding['full_name']}</strong><br>
      Address: ${foundBuilding['address']}<br>
      <a href="${foundBuilding['map_url']}" target="_blank">Open in Google Maps</a>
    `;

    const historyItem = document.createElement('li');
    historyItem.innerHTML = `${foundBuilding['abbreviation'].toUpperCase()} - ${foundBuilding['full_name']}`;
    historyList.appendChild(historyItem);
  } else {
    quote.innerHTML = `No building found for "${buildingInput}". Please try again.`;

    const historyItem = document.createElement('li');
    historyItem.innerHTML = `${buildingInput.toUpperCase()} - Not found`;
    historyList.appendChild(historyItem);
  }
}

window.onload = loadBuildingData;