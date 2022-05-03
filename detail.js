



const countryNames = localStorage.getItem("name");
window.addEventListener("DOMContentLoaded", () => {
    getCountryInfo(countryNames);
    
    
    
})


function getCountryInfo(name){
    fetch(`https://restcountries.com/v2/name/${name}`)
    .then(
        response => {
            return response.json();
        }
    ).then(
        CountryData => {
            // console.log(CountryData)
            let country_details = ""; 
            let country_border = "";
            let languages ="";
            CountryData.map(data => {
                data.languages.forEach(lang => {
                    languages += `${lang["name"]}` + ", ";
            
                })
                // console.log(data.currencies[0]["name"])
                // remove last comma
                // console.log(languages.replace(/,\s*$/, ""));
                if(data.borders === undefined){
                    country_border = "No border found";
                }else{
                    data.borders.forEach(item => {
                        country_border += `<button class="border-country">${item}</button>`
                    })
                }
                
                country_details = `<div class="country-img"><img src="${data.flags['png']}"  alt=""></div>
                                    <div class="country-details-content">
                                        <h1 class="country-name card-title">${data.name}</h1>
                                        <div class="details">
                                            <div class="details-one">
                                                
                                                <p class="card-text"><span>Native Name: </span> ${data.nativeName}</p>
                                                <p class="card-text"><span>Population: </span> ${data.population.toLocaleString()}</p>
                                                <p class="card-text"><span>Region: </span> ${data.region}</p>
                                                <p class="card-text"><span>Sub Region: </span>  ${data.subregion}</p>
                                                <p class="card-text"><span>Capital: </span>  ${data.capital}</p>
                                
                                            </div>
                                            <div class="details-two">
                                                <p class="card-text"><span>Top Level Domain: </span>${data.topLevelDomain}</p>
                                                <p class="card-text"><span>Curriences: </span>${data.currencies[0]["name"]}</p>
                                                <p class="card-text"><span>Languages: </span>  ${languages.replace(/,\s*$/, "")}</p>
                                            </div>
                                        </div>
                                            <div class="border-countries">
                                                <p>Border Countries:</p>
                                                <div class="border-button">
                                                    ${country_border}
                                                </div>
                                                
                                            </div>
                                        
                                    </div>`
               
                
            })
            
            // console.log(borders)
            const countryFullDetails = document.querySelector(".country-details-inner");
            countryFullDetails.innerHTML = country_details;
            // console.log(country_details);
        }
    )
}
