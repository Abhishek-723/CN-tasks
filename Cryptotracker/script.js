// Get references to the select element and the price display element
const cryptoSelect = document.getElementById("crypto-select");
const cryptoPrice = document.getElementById("crypto-price");
const thresholdInput = document.getElementById("alert-price");
const errorMessage = document.getElementById("alert-message");

// API endpoints
const tickersUrl = "https://api.coinlore.net/api/tickers/";
const tickerUrl = "https://api.coinlore.net/api/ticker/?id=";

// Function to fetch the list of cryptocurrencies and populate the select element
async function populateCryptoSelect() {
  console.log("called");
  try {
    const response = await fetch(tickersUrl);
    if (response.ok) {
      const data = await response.json();

      data.data.forEach((crypto) => {
        const option = document.createElement("option");
        option.value = crypto.id;
        option.textContent = crypto.name;
        cryptoSelect.appendChild(option);
      });

      // Add an event listener to fetch the price when a selection is made
      cryptoSelect.addEventListener("change", fetchCryptoPrice);
    } else {
      console.error("Failed to fetch cryptocurrency data");
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

// Function to fetch the real-time price of the selected cryptocurrency
async function fetchCryptoPrice() {
  const selectedCryptoId = cryptoSelect.value;
  if (selectedCryptoId) {
    try {
      const response = await fetch(`${tickerUrl}${selectedCryptoId}`);
      if (response.ok) {
        const data = await response.json();
        const price = data[0].price_usd;
        cryptoPrice.textContent = `$${price}`;
        handleThresholdChange();
      } else {
        console.error("Failed to fetch cryptocurrency price");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  } else {
    cryptoPrice.textContent = "";
  }
}

// Function to handle changes in the threshold input
function handleThresholdChange() {
  const thresholdValue = parseFloat(thresholdInput.value);
  if (isNaN(thresholdValue)) {
    errorMessage.textContent = "Please enter a valid number.";
  } else {
    errorMessage.textContent = ""; // Clear any previous error message
    checkCryptoPrice(thresholdValue);
  }
}

// Function to check if the cryptocurrency price exceeds the threshold
function checkCryptoPrice(thresholdValue) {
  const selectedCryptoId = cryptoSelect.value;
  if (selectedCryptoId) {
    try {
      fetch(`${tickerUrl}${selectedCryptoId}`)
        .then((response) => response.json())
        .then((data) => {
          const price = parseFloat(data[0].price_usd);
          cryptoPrice.textContent = `$${price}`;

          if (price > thresholdValue) {
            errorMessage.textContent =
              "Cryptocurrency has exceeded the set threshold!";
            setTimeout(() => {
              errorMessage.textContent = "";
            }, 5000); // Display error for 5 seconds
          }
        })
        .catch((error) => {
          console.error("Failed to fetch cryptocurrency price:", error);
        });
    } catch (error) {
      console.error("An error occurred:", error);
    }
  } else {
    cryptoPrice.textContent = "";
  }
}

// Add an event listener to the threshold input
// thresholdInput.addEventListener("change", handleThresholdChange);

// Populate the select element on page load
populateCryptoSelect();
