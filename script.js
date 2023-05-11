function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function injectHTML(list) {
  console.log("fired injectHTML");
  const target = document.querySelector("#hospital_list");
  target.innerHTML = "";
  list.forEach(function(item) {
    const str = `<li>${item.name}</li>`;
    target.innerHTML += str;
  });
}

function filterList(list, query) {
  return list.filter(function(item) {
    const lowerCaseName = item.name.toLowerCase();
    const lowerCaseQuery = query.toLowerCase();
    return lowerCaseName.includes(lowerCaseQuery);
  });
}

function cutHospitalList(list) {
  console.log("fired cut list");
  const range = [...Array(15).keys()];
  return newArray = range.map(function(item) {
    const index = getRandomIntInclusive(0, list.length - 1);
    return list[index];
  });
}






// let mapInitialized = false;
// let carto;

// function initMap(city) {
//   if (carto) {
//     carto.remove();
//   }
//   carto = L.map("map").setView([39.0458, -76.6413], 7);
//   L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
//     attribution: "&copy; <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a>",
//     maxZoom: 18
//   }).addTo(carto);

//   carto.fitBounds([
//     [37.9118, -79.4739], //south west part of MD
//     [39.722, -75.0479] //north east part of MD
//   ]);
  

//   fetch("https://www.communitybenefitinsight.org/api/get_hospitals.php?state=MD")
//     .then((response) => response.json())
//     .then((hospitals) => {
//       const hospitalIcon = L.icon({
//         iconUrl: "https://cdn3.iconfinder.com/data/icons/medical-icons-3/512/Hospital-512.png",
//         iconSize: [40, 40],
//       });

//       const filteredHospitals = hospitals.filter(hospital => hospital.city === city);

//       for (const hospital of filteredHospitals) {
//         const address = hospital.street_address + ", " + hospital.city + ", " + hospital.state + " " + hospital.zip_code;
//         const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(address)}&key=fdbb867d57b24fb5b77b706db67845a1`;
//         fetch(url)
//           .then(response => response.json())
//           .then(data => {
//             console.log(data);
//             const lat = data.results[0].geometry.lat;
//             const lng = data.results[0].geometry.lng;
//             const marker = L.marker([lat, lng]).bindPopup(hospital.name);
//             marker.addTo(carto);
//           })
//           .catch(error => console.error(error));
//       }
//     });
// }



let mapInitialized = false;
let carto;

function initMap(city) {
  if (carto) {
    carto.remove();
  }
  carto = L.map("map").setView([39.0458, -76.6413], 7);
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a>",
    maxZoom: 18
  }).addTo(carto);

  fetch("https://www.communitybenefitinsight.org/api/get_hospitals.php?state=MD")
    .then((response) => response.json())
    .then((hospitals) => {
      const hospitalIcon = L.icon({
        iconUrl: "https://cdn3.iconfinder.com/data/icons/medical-icons-3/512/Hospital-512.png",
        iconSize: [40, 40],
      });

      const filteredHospitals = hospitals.filter(hospital => hospital.city === city);

      for (const hospital of filteredHospitals) {
        const address = hospital.street_address + ", " + hospital.city + ", " + hospital.state + " " + hospital.zip_code;
        const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(address)}&key=fdbb867d57b24fb5b77b706db67845a1`;
        fetch(url)
          .then(response => response.json())
          .then(data => {
            console.log(data);
            const lat = data.results[0].geometry.lat;
            const lng = data.results[0].geometry.lng;
            const marker = L.marker([lat, lng]).bindPopup(hospital.name);
            marker.addTo(carto);
          })
          .catch(error => console.error(error));
      }

      // Zoom the map to the coordinates of the chosen city
      const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(city + ', Maryland')}&key=fdbb867d57b24fb5b77b706db67845a1`;
      fetch(url)
        .then(response => response.json())
        .then(data => {
          const lat = data.results[0].geometry.lat;
          const lng = data.results[0].geometry.lng;
          carto.setView([lat, lng], 11);
        })
        .catch(error => console.error(error));
    });
}

document.querySelector('form').addEventListener('submit', function(event) {
  event.preventDefault();
  const city = document.querySelector('input[name="city"]').value;
  initMap(city);
});


document.addEventListener("DOMContentLoaded", () => {
  const selectCity = document.querySelector("#cities");
  selectCity.addEventListener("change", (event) => {
    const selectedCity = event.target.value;
    initMap(selectedCity);
  });
});











// function initMap() {
//   const carto = L.map('map').setView([39.0458, -76.6413], 7);
//   L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
//     maxZoom: 19,
//     attribution:
//       '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
//   }).addTo(carto);

//   const hospitals = [
//     {"hospital_id":"1254","hospital_org_id":"946","ein":"520607949","name":"Meritus Medical Center","name_cr":"Meritus Medical Center","street_address":"11116 Medical Campus Road","city":"Hagerstown","state":"MD","zip_code":"21742","fips_state_and_county_code":"24043","hospital_bed_count":"271","chrch_affl_f":"N","urban_location_f":"Y","children_hospital_f":"N","memb_counc_teach_hosps_f":"N","medicare_provider_number":"210001","county":"Washington County","hospital_bed_size":"100-299 beds","updated_dt":"March 24, 2023"},
//     {"hospital_id":"1255","hospital_org_id":"947","ein":"521362793","name":"University Of Maryland Med Sys","name_cr":"University Of Maryland Med Sys","street_address":"22 South Greene Street","city":"Baltimore","state":"MD","zip_code":"21201","fips_state_and_county_code":"24510","hospital_bed_count":"816","chrch_affl_f":"N","urban_location_f":"Y","children_hospital_f":"N","memb_counc_teach_hosps_f":"Y","medicare_provider_number":"210002","county":"Baltimore city","hospital_bed_size":">299 beds","updated_dt":"March 24, 2023"},
//     {"hospital_id":"1256","hospital_org_id":"948","ein":"521289729","name":"Prince Georges Hospital Center Inc","name_cr":"Prince Georges Hospital Center Inc","street_address":"7300 Van Dusen Road","city":"Laurel","state":"MD","zip_code":"20707","fips_state_and_county_code":"24033","hospital_bed_count":"285","chrch_affl_f":"N","urban_location_f":"Y","children_hospital_f":"N","memb_counc_teach_hosps_f":"N","medicare_provider_number":"210003","county":"Prince George's County","hospital_bed_size":"100-299 beds","updated_dt":"March 24, 2023"}
//   ];

//   const markers = [];

//   for (const hospital of hospitals) {
//     const address = hospital.street_address + ', ' + hospital.city + ', ' + hospital.state + ' ' + hospital.zip_code; 
//     
//     const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(address)}&key=`;
//     fetch(url)
//       .then(response => response.json())
//       .then(data => {
//         // Store the latitude and longitude values returned by the API in the markers array
//         const lat = data.results[0].geometry.lat;
//         const lng = data.results[0].geometry.lng;
//         markers.push({name: hospital.name, lat: lat, lng: lng});
//       })

//     }};
        



  // const hospitals = [{"hospital_id":"1254","hospital_org_id":"946","ein":"520607949","name":"Meritus Medical Center","name_cr":"Meritus Medical Center","street_address":"11116 Medical Campus Road","city":"Hagerstown","state":"MD","zip_code":"21742","fips_state_and_county_code":"24043","hospital_bed_count":"271","chrch_affl_f":"N","urban_location_f":"Y","children_hospital_f":"N","memb_counc_teach_hosps_f":"N","medicare_provider_number":"210001","county":"Washington County","hospital_bed_size":"100-299 beds","updated_dt":"March 24, 2023"},{"hospital_id":"1255","hospital_org_id":"947","ein":"521362793","name":"University Of Maryland Med Sys","name_cr":"University Of Maryland Med Sys","street_address":"22 South Greene Street","city":"Baltimore","state":"MD","zip_code":"21201","fips_state_and_county_code":"24510","hospital_bed_count":"816","chrch_affl_f":"N","urban_location_f":"Y","children_hospital_f":"N","memb_counc_teach_hosps_f":"Y","medicare_provider_number":"210002","county":"Baltimore city","hospital_bed_size":">299 beds","updated_dt":"March 24, 2023"},{"hospital_id":"1256","hospital_org_id":"948","ein":"521289729","name":"Prince Georges Hospital Center Inc","name_cr":"Prince Georges Hospital Center Inc","street_address":"7300 Van Dusen Road","city":"Laurel","state":"MD","zip_code":"20707","fips_state_and_county_code":"24033","hospital_bed_count":"285","chrch_affl_f":"N","urban_location_f":"Y","children_hospital_f":"N","memb_counc_teach_hosps_f":"N","medicare_provider_number":"210003","county":"Prince George's County","hospital_bed_size":"100-299 beds","updated_dt":"March 24, 2023"}];

  // for (const hospital of hospitals) {
  //   const address = hospital.street_address + ', ' + hospital.city + ', ' + hospital.state + ' ' + hospital.zip_code;
    
  //   // Make a request to OpenCage Geocoding API
  //   const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(address)}&key=`;
  //   fetch(url)
  //     .then(response => response.json())
  //     .then(data => {
  //       // Use the latitude and longitude values returned by the API
  //       const lat = data.results[0].geometry.lat;
  //       const lng = data.results[0].geometry.lng;
  //       console.log(`Hospital: ${hospital.name} - Latitude: ${lat}, Longitude: ${lng}`);
  //     })
  //     .catch(error => console.error(error));


 // 38.9072° N, 77.0369° W
//  const carto = L.map('map').setView([39.0458, -76.6413], 7);
//  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
//    maxZoom: 19,
//    attribution:
//      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
//  }).addTo(carto);
//  return carto;




function markerPlace(array, map) {
  console.log("array for markers", array);

  map.eachLayer((layer) => {
    if (layer instanceof L.Marker) {
      layer.remove();
    }
  });

  array.forEach((item) => {
    console.log("markerPlace", item);
    const { coordinates } = item.geocoded_column_1;

    L.marker([coordinates[1], coordinates[0]]).addTo(map);
  });
}

async function mainEvent() {
  // the async keyword means we can make API requests
  // const mainForm = document.querySelector(".main_form");
  // const loadDataButton = document.querySelector("#data_load");
  // const clearDataButton = document.querySelector("#data_clear");
  const generateListButton = document.querySelector("#generate");
  // const textField = document.querySelector("filter");
  const citiesDropdown = document.querySelector("#cities");

  //const loadAnimation = document.querySelector("#data_load_animation");
  //loadAnimation.style.display = "none";
  //generateListButton.classList.add("hidden");

  const carto = initMap();

  // const storedData = localStorage.getItem("storedData");
  // let parsedData = JSON.parse(storedData);
  // if (parsedData?.length > 0) {
  //   generateListButton.classList.remove("hidden");
  // }
  localStorage.clear()
  let storedList = localStorage.getItem("hospitalList");
  if (!storedList) {
    const results = await fetch(
      "https://www.communitybenefitinsight.org/api/get_hospitals.php?state=MD"
    );
    storedList = await results.json();
    localStorage.setItem("hospitalList", storedList);
    
  }

  let currentList = [];
  // storedList.forEach(item => {
  //   console.log(item)
  // })

  // This changes the response from the GET into data we can use - an "object"
  // /* We need to listen to an "event" to have something happen in our page - here we're listening for a "submit" */
  //loadDataButton.addEventListener("click", async (submitEvent) => {
  // async has to be declared on every function that needs to "await" something
  //console.log("Loading Data");
  //});
  //loadAnimation.style.display = "inline-block";

  //   // Basic GET request - this replaces the form Action
  // const results = await fetch(
  //   "https://www.communitybenefitinsight.org/api/get_hospitals.php?state=MD"
  // );

  // This changes the response from the GET into data we can use - an "object"
  //   const storedList = await results.json();
  //   localStorage.setItem("storedData", JSON.stringify(storedList));
  //   parsedData = storedList;

  //   if (parsedData?.length > 0) {
  //     generateListButton.classList.remove("hidden");
  //   }

  //   loadAnimation.style.display = "none";
  //   // console.table(storedList);
  // });

  // generateListButton.addEventListener("click", (event) => {
  //   console.log("generate new list");
  //   currentList = cutHospitalList(parsedData);
  //   console.log(currentList);
  //   injectHTML(currentList);
  //   markerPlace(currentList, carto);
  // });

  // textField.addEventListener("input", (event) => {
  //   console.log("input", event.target.value);
  //   const newList = filterList(currentList, event.target.value);
  //   console.log(newList);
  //   injectHTML(newList);
  //   markerPlace(newList, carto);
  // });

  // clearDataButton.addEventListener("click", (event) => {
  //   console.log("clear browser data");
  //   localStorage.clear();
  //   console.log("localStorage Check", localStorage.getItem("storedData"));
  // });

    function filterCity(city) {
      const matched = storedList.filter((hospital) => {
        return hospital.city.toLowerCase() === city.toLowerCase();
      });
      return matched;
    }

  //   let hospitals = new Set();

  //   function getHospitals() {
  //     storedList.forEach((hospital) => {
  //       hospitals.add(hospital.city);
  //     });
  //   }
  //   function updateHospitalOptions(city) {
  //     const filteredHospitals = filterCity(city);
  //     let hospitalOptions = [];
  //     filteredHospitals.forEach((hospital) => {
  //       hospitalOptions += `<option value="${hospital.name}">${city}</option>`;
  //     });
  //     document.querySelector("#cities").innerHTML = hospitalOptions;
  //   }

  //   //console.log(hospitalOptions);

  //   // function filterCity(city) {
  //   // const matched = []
  //   // storedList.forEach(hospital)
  //   // return matched
  //   // }

  //   getHospitals();
  //   createDropdown();
  console.log(storedList)
  // fetch(
  //   "https://www.communitybenefitinsight.org/api/get_hospitals.php?state=MD"
  // )
  //   .then((response) => response.json())
  //   .then((data) => {
      //const citiesDropdown = document.querySelector("#cities");
      let data = new Set();
      storedList.forEach((hospital) => {
        data.add(hospital.city)
      });
     
      console.log(data)

      data.forEach((city) => {
        const option = document.createElement("option");
        option.text = city;
        option.value = city;
        citiesDropdown.add(option);
      
      });
    //});
    let selectedCity = "";

    const dropdownMenu = document.querySelector("#cities");
    console.log(dropdownMenu);
    dropdownMenu.addEventListener("change", (event) => {
      selectedCity = event.target.value;
    });

    generateListButton.addEventListener("click", (event) => {
      event.preventDefault();
      const filteredList = filterCity(selectedCity);
      console.log(filteredList);
      injectHTML(filteredList)
    })

    const clearDataButton = document.getElementById("clear")
    clearDataButton.addEventListener("click", async (event) => {
      localStorage.clear()
      let storedData = localStorage.getItem("hospitalList");
      if (!storedList) {
        const results = await fetch("https://www.communitybenefitinsight.org/api/get_hospitals.php?state=MD"
      );
    let storedList = await results.json();
    console.log(storedData)
    console.log(storedList)
    localStorage.setItem("hospitalList", storedList);
    
  }
    })

  //   // Get value from dropdown input using an eventlistener
  //   // Use value to filter stored list
  //   //

  //   document.querySelector("#cities").innerHTML = hospitalOptions;
}

document.addEventListener("DOMContentLoaded", async () => mainEvent()); // the async keyword means we can make API requests
