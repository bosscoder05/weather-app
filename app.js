const getWeather = document.getElementById("getWeatherButton"),
  userInput = document.getElementById("userInput"),
  error = document.getElementById("error"),
  result = document.getElementById("results"),
  closeButtons = document.getElementsByClassName("close");
(closeButtons => {
  closeButtons = document.getElementsByClassName("close");
  for (let each of closeButtons) {
    each.onclick = function () {
      this.parentElement.classList.remove("fade-in");
      this.parentElement.classList.add("fade-out");
      const displayNone = () => {
        this.parentElement.style.display = "none";
      };
      return setTimeout(displayNone, 300);
    };
  }
})();
const showErrors = el => {
  for (let each of el) {
    each.style.display = "block";
  }
};

const convertTemp = K => (1.8 * (K - 273) + 32).toFixed(2);

const convertTime = time => {
  let re = /(?:[01]\d|2[0123]):(?:[012345]\d):(?:[012345]\d)/g,
  h = `${new Date().getHours()}`,
  sH = re.exec(time)[0].split(":")[0];
  let newTime = time.replace(sH, h);
  return newTime;
};

String.prototype.toProperCase = function () {
  return this.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};

String.prototype.fixWhiteSpace = function () {
  return this.replace(/ /g, "%20");
};

window.onload = function () {

};

const getWeatherData = () => {
  let city = userInput.value.trim();
  let publicKey = `af8f9f060e0ecb0ec27600516478b2b8`;
  let apiCall = `https://api.openweathermap.org/data/2.5/forecast?q=${city.fixWhiteSpace()}&APPID=${publicKey}`;

  fetch(apiCall)
    .then(response => response.json())
    .catch(e => {
      console.error(`Retreival error: ${e}`);
    })
    .then(data => {
      const { temp, humidity } = data.list[0].main;
      const { description } = data.list[0].weather[0];
      const { dt_txt } = data.list[0]; 
      const { country } = data.city; 
      const resultDiv = document.getElementById("resultContainer"),
        errorDiv = document.getElementById("errorContainer");
      errorDiv.style.display = "none";
      resultDiv.style.display = "block"; 
      window.scrollTo(0, 200);
      console.log(data)
      result.innerHTML = `
<h2>Weather for ${city.toProperCase()}: (${country})</h2>
<span><span>Temp:</span> ${convertTemp(temp)} &deg;F</span> 
<br />
<span><span>Humidity:</span> ${humidity}&percnt;</span>
<br />
<span><span>Overall Expect:</span> ${description.toProperCase()}</span> 
<br />
<span><span>Last Checked:</span> ${dt_txt} (UK time)</span>
<br />
<span><span>Local time:</span> ${convertTime(dt_txt)}</span>
`;
    })
    .catch(e => {
      let resultDiv = document.getElementById("resultContainer"),
        errorDiv = document.getElementById("errorContainer"),
        errorMsg = document.getElementById("error");
      resultDiv.style.display = "none";
      errorDiv.style.display = "block"; 
      errorDiv.classList.remove("fade-out");
      errorDiv.classList.add("fade-in"); 
      errorMsg.innerHTML = `Bunday shaharni topib bo'lmadi: ${city}!`;
      console.error(`Data Error: ${e} \n city probably does not exist`);
    });
};

getWeather.onclick = function () {
  getWeatherData();
};

userInput.onkeydown = function (e) {
  if (e.key === 'Enter') getWeatherData();
};
