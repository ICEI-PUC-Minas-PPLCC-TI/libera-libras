var eventPageSize = 3;
const months = [
    "Jan",
    "Fev",
    "Mar",
    "Abr",
    "Mai",
    "Jun",
    "Jul",
    "Ago",
    "Set",
    "Out",
    "Nov",
    "Dez",
];

function updateEventDiv(eventData, eventDiv) {
    let event = eventData;
    let eventDate = new Date(event.date.split("T")[0] + "T00:00");
    let eventTime = event.date.split("T")[1];

    eventDiv.id = "spotlight-event-" + event.id;

    eventDiv.getElementsByClassName(
        "event-day"
    )[0].innerHTML = eventDate.getDate();

    eventDiv.getElementsByClassName(
        "event-date"
    )[0].innerHTML = `<i class="fa fa-calendar-o" aria-hidden="true"></i> ${
        months[eventDate.getMonth()]
    } ${eventDate.getFullYear()}`;

    eventDiv.getElementsByClassName(
        "event-time"
    )[0].innerHTML = `<i class="fa fa-clock-o" aria-hidden="true"></i> ${eventTime}`;

    eventDiv.getElementsByClassName("title")[0].innerHTML = event.name;

    eventDiv.getElementsByClassName("description")[0].innerHTML =
        event.description;

    eventDiv.getElementsByClassName(
        "city"
    )[0].innerHTML = `<i class="fa fa-map-o" aria-hidden="true"></i> ${event.city.name}`;

    eventDiv.getElementsByClassName(
        "place"
    )[0].innerHTML = `<i class="fa fa-map-marker" aria-hidden="true"></i> ${event.place}`;
}

function updateSpotlightEvents(data) {
    let events = data;
    let spotlight = document.getElementById("spotlight-events");
    let eventBox = spotlight.getElementsByClassName("event-box")[0];

    events.forEach((event) => {
        let thisEventDiv;

        if (eventBox.id) {
            thisEventDiv = eventBox.cloneNode(true);
            spotlight.appendChild(thisEventDiv);
        } else {
            thisEventDiv = eventBox;
        }

        updateEventDiv(event, thisEventDiv);
    });
}

function updateCityEvents(data) {
    let events = data;
    let cityEventSection = document.getElementById("cityEventSection");
    let eventBox = cityEventSection.getElementsByClassName("event-box")[0];
    cityEventSection.innerHTML = "";

    if (events && events.length) {
        events.forEach((event, index) => {
            let thisEventDiv;

            if (index == 0) {
                thisEventDiv = eventBox;
                cityEventSection.appendChild(thisEventDiv);
            } else {
                thisEventDiv = eventBox.cloneNode(true);
                cityEventSection.appendChild(thisEventDiv);
            }

            updateEventDiv(event, thisEventDiv);
        });
    } else {
        cityEventSection.innerHTML = `
            <div class="col-12 not-found-div">
                <h5><img class="not-found" src="../../assets/notFound.png" alt="evento-nao-encontrado">
                Não conseguimos encontrar eventos para a sua cidade, tente criar o seu!</h5>
            </div>`;
    }
}

function updateCities(data) {
    let cities = data;
    let selects = document.getElementsByClassName("select-city");
    
    for (let i = 0; i<selects.length; i++) {
        let option = selects[i].getElementsByTagName("option")[1];

        cities.forEach((city) => {
            let thisOption;

            if (option.value) {
                thisOption = option.cloneNode(true);
                selects[i].appendChild(thisOption);
            } else {
                thisOption = option;
            }

            thisOption.value = city.id;
            thisOption.innerHTML = city.name;
        });
    }
}

function reloadPage(data) {
    location.reload()
}

function createEvent () {
    let eventToCreate = {
        name: $("#eventName").val(),
        description: $("#eventDescription").val(),
        date: $("#eventDate").val() +"T"+ $("#eventTime").val(),
        place: $("#eventLoc").val(),
        spotlight: false,
        cityId: "",
    };

    //todo: permitir criar cidade
    /*if ($("#createCitySelect").val() == 0) {
        postCity(
            { name: $("#eventCity").val() },
            (data) => (eventToCreate.cityId = data.id)
        );
    } else */
    if ($("#createCitySelect").val() > 0) {
        eventToCreate.cityId = $("#createCitySelect").val();
    } else {
        alert ("Houve um problema");
        throw "selectError"
    }

    postEvent(eventToCreate, reloadPage);
}

function checkForm () {
    if ($("#eventName").val() && $("#eventDescription").val() &&
        $("#eventDate").val() && $("#eventTime").val() &&
        //(($("#createCitySelect").val() == 0 && $("#eventCity").val())) ||
        ($("#createCitySelect").val() > 0 ) && 
        $("#eventLoc").val()) {
    
        $("#submitEvent").prop("disabled", false).click(createEvent);
    } else {
        $("#submitEvent").prop("disabled", true).click();
    }
}

// todo: permitir criar cidade
/*function enableCityField (event) {
    if ($(this).val() == 0) {
        $("#eventCity").removeClass("d-none");
    } else {
        $("#eventCity").addClass("d-none");
    }
}*/



function start() {
    let cityCode = document.getElementById("citySelect").value;

    getCities(updateCities);
    getSpotlightEvents(updateSpotlightEvents);
    getEventsByCity(updateCityEvents, cityCode);

    $("#eventCity").addClass("d-none");
    //$("#createCitySelect").change(enableCityField);
    
    $(".form-field").change(checkForm);

    // só permite datas futuras
    $(function(){
    var dtToday = new Date();

    var month = dtToday.getMonth() + 1;
    var day = dtToday.getDate();
    var year = dtToday.getFullYear();

    if(month < 10)
        month = '0' + month.toString();
    if(day < 10)
        day = '0' + day.toString();

    var minDate = year + '-' + month + '-' + day;    
    $('#eventDate').attr('min', minDate);
});
}

$(document).ready(start);

