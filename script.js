function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function injectHTML(list) {
  console.log("fired injectHTML");
  const target = document.querySelector("#hospital_list");
  target.innerHTML = "";
  list.forEach((item) => {
    const str = `<li>${item.name}</li>`;
    target.innerHTML += str;
  });
}

function filterList(list, query) {
  return list.filter((item) => {
    const lowerCaseName = item.name.toLowerCase();
    const lowerCaseQuery = query.toLowerCase();
    return lowerCaseName.includes(lowerCaseQuery);
  });
}

function cutHospitalList(list) {
  console.log("fired cut list");
  const range = [...Array(15).keys()];
  return (newArray = range.map((item) => {
    const index = getRandomIntInclusive(0, list.length - 1);
    return list[index];
  }));
}

function initMap() {
  // 38.9072° N, 77.0369° W
  const carto = L.map("map").setView([38.98, -76.93], 13);
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(carto);
  return carto;
}

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
  const mainForm = document.querySelector(".main_form");
  const loadDataButton = document.querySelector("#data_load");
  const clearDataButton = document.querySelector("#data_clear");
  const generateListButton = document.querySelector("#generate");
  const textField = document.querySelector("#hosp");

  //const loadAnimation = document.querySelector("#data_load_animation");
  //loadAnimation.style.display = "none";
  //generateListButton.classList.add("hidden");

  // const carto = initMap();

  // const storedData = localStorage.getItem("storedData");
  // let parsedData = JSON.parse(storedData);
  // if (parsedData?.length > 0) {
  //   generateListButton.classList.remove("hidden");
  // }

  let currentList = [];
  const results = await fetch(
    "https://www.communitybenefitinsight.org/api/get_hospitals.php?state=MD"
  );

  // This changes the response from the GET into data we can use - an "object"
  const storedList = await results.json();
  // /* We need to listen to an "event" to have something happen in our page - here we're listening for a "submit" */
  loadDataButton.addEventListener("click", async (submitEvent) => {
    // async has to be declared on every function that needs to "await" something
    console.log("Loading Data")
  });
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

  let hospitals = new Set();

  function getHospitals() {
    console.log(storedList)
    storedList.forEach((hospital) => {
      hospitals.add(hospital.city);
    });
  }
  function filterCity(city) {
    const matched = [];
    storedList.forEach(hospital);
    return matched;
  }
  console.log(hospitals);
  let hospitalOptions = "";
  Array.from(hospitals).forEach((city) => {
    hospitalOptions += `<option value="${city}">${city}</option>`;
  });
  console.log(hospitalOptions);
  let hospital = new Set();

  function getHospitals() {
    storedList.forEach((hospital) => {
      hospitals.add(hospital.city);
    });
  }

  // function filterCity(city) {
  // const matched = []
  // storedList.forEach(hospital)
  // return matched
  // }

  function filterCity(city) {
    const matched = [];
    storedList.forEach((hospital) => {
      if (hospital.city.toLowerCase() === city.toLowerCase()) {
        matched.push(hospital);
      }
    });
    return matched;
  }
  
  getHospitals();
  //createDropdown();

  document
    .getElementById("#filter")
    .addEventListener("change", (event) => {
      const selectedCity = event.target.value;
      const filteredList = filterCity(selectedCity);
      console.log(filteredList);
      injectHTML(filteredList);
      markerPlace(filteredList, filter);
    });

  // Get value from dropdown input using an eventlistener
  // Use value to filter stored list
  //

  document.querySelector("#filter").innerHTML = hospitalOptions;
}

document.addEventListener("DOMContentLoaded", async () => mainEvent()); // the async keyword means we can make API requests
