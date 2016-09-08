     $(document).ready(function() {
       startTime();
       getLocation();
       day();
       //call the ip adress api to find my location
       function getLocation() {
         var getIP = 'http://ip-api.com/json/';
         //now we got back a bunch of data
         $.getJSON(getIP).done(function(location) {
           //we only want the city, read the docs and it will tell us to use location.city. now put the results in the id tag that you defined.
           $('#currentLocation').text(location.city);
           //now we can use the city location to get the weather.
           getWeather(location.city);
         })
       }
       //call the weather api with city name.
       function getWeather(city) {
         //read the docs and get your api key!!
         var weatherApiUrl = 'http://api.openweathermap.org/data/2.5/weather?q=' + city + "&units=Imperial" + '&appid=c6ef9885ea8a5415b8fe68cfefd72ad9';

         //use this to test if you got any results
         console.log(weatherApiUrl);

         $.getJSON(weatherApiUrl).done(function(weather) {

           var fah = parseFloat((weather.main.temp_min).toFixed(0));

           var cel = parseFloat(((fah - 32) * (5 / 9)).toFixed(0));
           console.log(weather);

           //get a better icon!!
           $("#weatherIcon").html("<img class ='wiSize' src='http://openweathermap.org/img/w/" + weather.weather[0].icon + ".png'>");

           $('#fahrenheit').html(fah + ' &deg;' + '<a href="#" class="fah">F</a>');
           $('#celsius').html(cel + ' &deg;' + '<a href="#" class="cel">C</a>');
           $("#celsius").hide();
          

           $(".fah").click(function() {
             $("#fahrenheit").hide();
             $("#celsius").show();

           });
           $(".cel").click(function() {
             $("#celsius").hide();
             $("#fahrenheit").show();

           });

         })
       }

       function startTime() {
         var today = new Date();
         var h = today.getHours();
         var m = today.getMinutes();
         var s = today.getSeconds();
         m = checkTime(m);
         s = checkTime(s);
         $("#time").text(h + ":" + m);
         var t = setTimeout(startTime, 500);

         if (h >= 5 && h <= 11) {
           $("#greeting").text("Good Mourning");
         } else if (h >= 12 && h <= 17) {
           $("#greeting").text("Good Afternoon");
         } else if (h >= 18 && h <= 24) {
           $("#greeting").text("Good Evening");
         } else if (h >= 0 && h <= 4) {
           $("#greeting").text("Good Evening");
         }  else {
           $("#greeting").text("Welcome Back");
         }

       }

       function checkTime(i) {
         if (i < 10) {
           i = "0" + i
         }; // add zero in front of numbers < 10
         return i;
       }

       function day() {
         var day = new Date().getDay();
         var month = new Date().getMonth();
         var date = new Date().getDate();
         var week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
         var mWord = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
         $("#day").text(week[day] + ", " + mWord[month] + " " + date);
         console.log(day);
       }

     });