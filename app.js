const input = document.querySelector('input');
const form = document.querySelector('form');

function getWeather(place){
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=dc899e1c6b37739a233c2f31bc5a68b0`;
    fetch(url)
    .then((res) => {
        return res.json();
    })
    .then((res) => {
        if (res.message === 'city not found'){
            alert('Enter a Valid city name!!');
            input.value = '';
            return;
        }

        const wrapper = document.querySelector('#wrapper');
        const divWrapper = document.querySelector('#div-wrap');
        wrapper.classList.add('updatedwrapper');
        divWrapper.classList.add('updateddivwrap');

        const firstLi = document.querySelectorAll('li')[0];
        firstLi.innerText = res.name;
        firstLi.classList.add('firstli');


        const lat = res.coord.lat;
        const lon = res.coord.lon;
        const dateUrl = `https://api.ipgeolocation.io/timezone?apiKey=2195dadfae094a39b037eaf2052f01cd&lat=${lat}&long=${lon}`
        fetch(dateUrl)
        .then((dateRes) => {
            return dateRes.json();
        })
        .then((dateRes) => {
            const dateTime = dateRes.date_time_wti;
            const date = dateTime.split(' ').slice(0,4).join(' ');
            const secondLi = document.querySelectorAll('li')[1];
            secondLi.innerText = date;
            secondLi.classList.add('secondli');

            const thirdLi = document.querySelectorAll('li')[2];
            const temp = Math.round(res.main.temp - 273.15);
            thirdLi.innerHTML = String(temp) + '&deg;C';            
            thirdLi.classList.add('thirdli');

            const fourthLi = document.querySelectorAll('li')[3];
            const minTemp = Math.round(res.main.temp_min - 273.15);
            const maxTemp = Math.round(res.main.temp_max - 273.15);
            fourthLi.innerHTML = String(minTemp) + '&deg;C (min)/ ' + String(maxTemp) + '&deg;C (max)';
            fourthLi.classList.add('fourthli');

            const fifthLi = document.querySelectorAll('li')[4];
            const windSpeed = res.wind.speed * 3.6;
            fifthLi.innerText = String(windSpeed.toFixed(3)) + ' km/hr';
            fifthLi.classList.add('fifthli');

            const sixthLi = document.querySelectorAll('li')[5];
            const description = res.weather[0].description;
            sixthLi.innerText = description;
            sixthLi.classList.add('sixthli');

            const images = {
                thunderstorm: 'thunderstorm.jpeg',
                drizzle: 'drizzle.JPEG',
                rain: 'rain2.JPEG',
                snow: 'snow.jpg',
                mist: 'mist.jpg',
                smoke: 'smoke.jpg',
                haze: 'haze.jpg',
                dust: 'dust2.JPEG',
                fog: 'fog.JPEG',
                sand: 'sand.jpg',
                ash: 'ash.jpg',
                squall: 'squall.jpg',
                tornado: 'tornado.jpg',
                clear: 'clear.jpg',
                clouds: 'clouds.jpg'
            }
            const keyGenerate = description.toLowerCase();
            for (let key in images){
                if (keyGenerate.includes(key)){
                    const body = document.querySelector('body');
                    body.style.background = 'none';
                    const image = document.createElement('img');
                    image.setAttribute('src',images[key]);
                    setTimeout(() => {
                        body.append(image);
                    }, 1500)
                    image.classList.add('image');            
                };
            }

        })
        .catch((err) => {
            console.log(err);
            console.log('something went wrong');
        });

    })
    .catch((err) => {
        console.log(err);
        console.log('something went wrong');
    });
};

form.addEventListener('submit',(e) => {
    e.preventDefault();
    const place = input.value;
    if (place === ''){
        alert('Empty city name!!');
        return;
    }
    getWeather(place);
    input.value = '';
});