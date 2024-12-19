const inp = document.querySelector("input.form-control");
const container = document.querySelector("#myRow");
let allData;
window.navigator.geolocation.getCurrentPosition(
  (data) => {
    getWeatherData(`${data.coords.latitude},${data.coords.longitude}`);
  },
  () => {
    getWeatherData();
  }
);
const getWeatherData = async (location = "alex") => {
  let res = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=5d6b5d86fdc64001bd3160939241912&q=${location}&days=3`
  );
  let finalRes = await res.json();
  allData = finalRes;
  displayWeatherData(allData.forecast.forecastday);
};
const getDateDetails = (dates) => {
  const dateDetails = new Date(dates);
  const weekDay = dateDetails.toLocaleString("ar-EG", { weekday: "long" });
  const day = dateDetails.toLocaleString("ar-EG", { day: "2-digit" });
  const month = dateDetails.toLocaleString("ar-EG", { month: "long" });
  return { weekDay, day, month };
};
const displayWeatherData = (arr) => {
  let cartona = ``;
  for (let i = 0; i < arr.length; i++) {
    const { weekDay, day, month } = getDateDetails(arr[i].date);
    cartona += `<div class="col-md-6 col-lg-4">
                        <div class="card third text-light text-center h-100">
                            <div class="d-flex justify-content-between align-items-center fs-3">
                                ${
                                  i === 0
                                    ? `
                                    <p>${weekDay}</p>
                                <p>${day} ${month}</p>
                                    `
                                    : `<p>${weekDay}</p>`
                                }
                            </div>
                            <div class="fs-4 text-center">
                            ${
                              i === 0
                                ? `
                                <p>
                                    ${allData.location.name}
                                </p>
                                `
                                : ""
                            }
                                <div class="text-center">
                                ${
                                  i === 0
                                    ? `
                                    <p class="fw-bold">
                                        ${allData.current.temp_c} &deg;C
                                    </p>
                                    <img src="${allData.current.condition.icon}" alt="Weather Logo">`
                                    : `
                                    <p>${arr[i].day.maxtemp_c} &deg;C</p>
                                    <p>${arr[i].day.mintemp_c} &deg;C</p>
                                    <img src="${arr[i].day.condition.icon}" alt="Weather Logo"/>
                                    `
                                }
                                </div>
                                <p class="text-center fs-3">
                                    ${
                                      i === 0
                                        ? `${allData.current.condition.text}`
                                        : `${arr[i].day.condition.text}`
                                    }
                                </p>
                            </div>
                            ${
                              i === 0
                                ? `
                                <div class="d-flex justify-content-between align-items-center py-2">
                                <span>
                                    <i class="fa-solid fa-umbrella"></i>
                                    ${arr[0].day.daily_chance_of_rain}%
                                </span>
                                <span>
                                    <i class="fa-solid fa-wind"></i>
                                    ${arr[0].day.maxwind_kph} KM/H
                                </span>
                                <span>
                                    <i class="fa-solid fa-compass"></i>
                                    ${allData.current.wind_dir}
                                </span>
                            </div>
                                `
                                : ``
                            }
                        </div>
                    </div>`;
  }
  container.innerHTML = cartona;
};

inp.addEventListener("change", (e) => {
  console.log(getWeatherData(e.target.value));
});
