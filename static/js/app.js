const selected = document.querySelector(".selected p");
const optionsContainer = document.querySelector(".options-container");
const optionsList = document.querySelectorAll(".options");
const filterBtn = document.querySelector(".filter-icon");

const countryCards = document.querySelector(".card-row");
const searchBox = document.querySelector("#search-country");

const body= document.querySelector("body");

// const countryImg = document.querySelectorAll(".card-img-top");
// console.log(countryFullDetails)

window.addEventListener("DOMContentLoaded", () => {
    getCountry();   
})

// filterbtn toggler
filterBtn.addEventListener("click", () => {
    optionsContainer.classList.toggle("active");
    filterBtn.classList.toggle("active");
})

// filter regions
optionsList.forEach(option => {
    option.addEventListener("click", () =>{
        selected.textContent = option.querySelector("p").innerHTML;
        getByRegion()
        optionsContainer.classList.remove("active");
        filterBtn.classList.remove("active");
    })
})


// listen to search input and search country
searchBox.addEventListener("input", () => {
    const searchName = searchBox.value;
    const searchApi = `https://restcountries.com/v2/name/${searchName}`
    fetch(searchApi).then(
        response => {
            return response.json();
        }
    ).then(
        countrySearch => {
            dynamicCards(countrySearch);
        }
    ).catch(
        errors => {
        console.log(errors);
    })
})

// get countries info from api
function getCountry(){
    const countriesApi = "https://restcountries.com/v2/all";
    fetch(countriesApi).then(
        response => {
            return response.json();
        }
    ).then(
     countryData =>{
        // let country_details = "";
        dynamicCards(countryData);
        
        // return countryImg.src;
     }
    ).catch(
        errors =>{
            console.log(errors);
        }
    )
}
// get target image and get target country name
function getCountryName(image){
    // console.log(image)
    image.forEach(img => {
        img.addEventListener("click", (e) => {
                const cardContainer = e.target.parentElement;
                const countryName = cardContainer.querySelector(".card-title").innerHTML;
                localStorage.setItem("name", countryName);
                // getCountryInfo(countryName);
                // return countryName;
            })
        }) 
}

// get country by region
function getByRegion(){
    const regionName = selected.innerHTML;
    if (regionName === "Filter by Region" || regionName === "All"){
        getCountry();
    }else{
        const regionApi = `https://restcountries.com/v2/region/${regionName.toLowerCase()}`
        fetch(regionApi).then(
            response => {
                return response.json();
            }
        ).then(
            countryRegion => {
                dynamicCards(countryRegion);
            }
        ).catch(
            errors => {
            console.log(errors);
        })
    }
    
}


// get dynamic country data
function dynamicCards(complete_data){
    let country_card = "";
    // let country_details = "";

    complete_data.map(data => {
        country_card += ` <a href= "${window.static_folder}" class="nav-link col-lg-3 col-sm-4"> <div class="card card-container  ">
                    <img src="${data.flags['png']}" class="card-img-top" alt="${data.name}-flag">
                    <div class="card-body">
                        <h3 class="card-title">${data.name}</h3>
                        <p class="card-text"><span>Population:</span>  ${data.population.toLocaleString()}</p>
                        <p class="card-text"><span>Region:</span> ${data.region}</p>
                        <p class="card-text"><span>Capital:</span> ${data.capital}</p>    
                    </div>
                </div> </a>`       
                
    })
    countryCards.innerHTML = country_card;
    const countryImg = document.querySelectorAll(".card-img-top");
    getCountryName(countryImg);
}




