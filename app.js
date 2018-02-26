var trainInfo = {
    nr: [42, 42, 42],
    avgår: ['10:25', '12:25', '14:25'],
    ankomst: ['11:23', '13:23', '15:23']
}

var button = document.getElementById("search-button");
if(button){
button.addEventListener("click", function () {

        var test = document.getElementById("destination_field");
        var going = document.getElementById("going-from");
        going.innerHTML = "Åker från " + test.value;
    
        var tbody2 = document.getElementById("train-table");
    
        if (tbody2.childElementCount != 0) {
            tbody2.innerHTML = "";
        }
    
        for (let index = 0; index < 3; index++) {
            var row = tbody2.insertRow(index);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);
            cell1.innerHTML = trainInfo.nr[index];
            cell2.innerHTML = trainInfo.avgår[index];
            cell3.innerHTML = trainInfo.ankomst[index];
        }
    });

}


var getWeather = function () {

    var tableWeather = document.querySelector(".table-weather");
    var bodyWeather = document.createElement('tbody');

    var ajax = new XMLHttpRequest();
    var city = 'Nynashamn';
    var apikey = '1399096a4711557fc517d1808cbd6c93';
    ajax.open('GET', 'http://api.openweathermap.org/data/2.5/forecast?q=' + city +
        '&APPID=' + apikey, true);


    ajax.onload = function () {
        if (this.readyState === 4) {
            if (this.status === 200) {
                var myData = JSON.parse(ajax.responseText);

                var weatherInfo = {
                    klocka: [],
                    väder: [],
                    värme: [],
                    vind: []
                }
            
                for (let index = 0; index < 5; index++) {
            
                    var time = myData.list[index].dt_txt;
                    var hour = new Date(time).getHours();
                    if(hour < 10){
                        hour = "0" + hour;
                    }
                    weatherInfo.klocka[index] = hour + ":00";
            
                    var windy = myData.list[index].wind.speed;
                    weatherInfo.vind[index] = windy;
            
                    var kelvin = myData.list[index].main.temp;
                    var temp = kelvin - 273.15;
                    weatherInfo.värme[index] = temp.toFixed(1) + "°C";
            
                    var des = myData.list[index].weather[0].description;
                    var descr = des[0].toUpperCase() + des.slice(1); 
                    weatherInfo.väder[index] = descr;
                }
            
                for (let index = 0; index < 5; index++) {
            
                    var row1 = bodyWeather.insertRow(index);
                    var cellNo1 = row1.insertCell(0);
                    var cellNo2 = row1.insertCell(1);
                    var cellNo3 = row1.insertCell(2);
                    var cellNo4 = row1.insertCell(3);
                    cellNo1.innerHTML = weatherInfo.klocka[index] + '';
                    cellNo2.innerHTML = weatherInfo.väder[index];
                    cellNo3.innerHTML = weatherInfo.värme[index];
                    cellNo4.innerHTML = weatherInfo.vind[index] + 'm/s';
                }
                tableWeather.appendChild(bodyWeather);

            }
        }
    }
    ajax.send();





}
