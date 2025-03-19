const apiKey = "032f3c943eddd9d3cf0895d2";
const apiUrl = "https://v6.exchangerate-api.com/v6/" + apiKey + "/latest/";

const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const fromAmount = document.getElementById("fromAmount");
const toAmount = document.getElementById("toAmount");
const exchangeRateText = document.getElementById("exchangeRate");
const convertBtn = document.getElementById("convert");
const swapBtn = document.getElementById("swap");

async function populateCurrencies() {
    const res = await fetch(apiUrl + "USD");
    const data = await res.json();
    const currencies = Object.keys(data.conversion_rates);

    currencies.forEach(currency => {
        let option1 = document.createElement("option");
        let option2 = document.createElement("option");

        option1.value = currency;
        option1.textContent = currency;
        option2.value = currency;
        option2.textContent = currency;

        fromCurrency.appendChild(option1);
        toCurrency.appendChild(option2);
    });

    fromCurrency.value = "USD";
    toCurrency.value = "INR";
}

// Fetch exchange rate and convert currency
async function convertCurrency() {
    const from = fromCurrency.value;
    const to = toCurrency.value;
    const amount = fromAmount.value;

    if (amount === "" || amount <= 0) {
        alert("Enter a valid amount");
        return;
    }

    const res = await fetch(apiUrl + from);
    const data = await res.json();
    const rate = data.conversion_rates[to];

    toAmount.value = (amount * rate).toFixed(2);
    exchangeRateText.textContent = `Rate: 1 ${from} = ${rate} ${to}`;
}

// Swap currencies
swapBtn.addEventListener("click", () => {
    let temp = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = temp;
    convertCurrency();
});

// Convert button event
convertBtn.addEventListener("click", convertCurrency);

// Initialize currencies
populateCurrencies();
