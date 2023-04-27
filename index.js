const toto = document.getElementById("toto");
const btnSort = document.querySelectorAll(".btnSort");
let dataCountry = [];
let sortMethode = "alpha";

console.log(btnSort);

async function displayCountry () {
    await fetch('https://restcountries.com/v3.1/all')
    .then((res) => res.json())
    .then((data) => (dataCountry = data));

    countryDisplay();
    console.log(dataCountry);

};



function countryDisplay () {
    toto.innerHTML = dataCountry
    .filter((pays) => pays.name.official.toLowerCase().includes(inputSearch.value.toLowerCase()))
    .sort((a, b) => {
        if (sortMethode === "maxToMin"){
            return b.population - a.population;
        } else if (sortMethode === "minToMax") {
            return a.population - b.population
        } else if (sortMethode === "alpha") {
            return a.name.official.localeCompare(b.name.official)
        }
    })
    .slice(0, inputRange.value)
    .map(
        (pays) =>
    `
        <div class="col">
            <div class="card mb-4" style="width: 18rem;height: 21rem;">
            <img src="${pays.flags.svg}" class="card-img-top" alt="${pays.flags.alt} ">
            <div class="card-body">
                <p class="card-text">Capital : ${pays.name.official}</p>
                <p class="card-text">Capital : ${pays.capital}</p>
                <p class="card-text">Population :${pays.population}</p>
            </div>
            </div>
            </div>
        </div>
    `
    )
}

window.addEventListener("load", displayCountry);
inputSearch.addEventListener("input", countryDisplay);
inputRange.addEventListener("input", () => {
    countryDisplay ();
    rangeValue.textContent = inputRange.value;
});

btnSort.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        sortMethode = e.target.id;
        countryDisplay();
    })
})
