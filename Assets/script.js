//set Variables for the rest of the javascript 

var day = 0;
var weekDay = "";
var month = "";
var hour = 0;
var currentDay = "";

var monthName = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
  ];

  var weekdayName = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
  ]
 
  var currentDayEl = $('currentDay');

//set variables to current date and time with dayjs
weekday = weekdayName[dayjs().day()]; //0 to 6 starts on Saturday
day = dayjs().date(); // 1 to 31
month = monthName[dayjs().month()]; //0 to 11 starts on Janaury
hour = dayjs().hour(); // 0 to 23 starts on 12 AM

//prints out current date
currentDayEl.text(weekday + ", " + month + " " + day);

//adjust the styling of each time block depending on the time of day
$('.hour').each(function () {
    if ($(this).data("time") === hour) {
        $(this).parent().next().children().removeClass('future').addClass('present');

    } else if ($(this).data("time") < hour) {
        $(this).parent().next().children().removeClass('present').addClass('past');

    } else if ($(this).data("time") > hour) {
        $(this).parent().next().children().removeClass('past').addClass('future');
    }
});

//same purpose as lines of code above but repeats every second
setInterval(function () {
    weekday = weekdayName[dayjs().day()];
    day = dayjs().date();
    month = monthName[dayjs().month()];
    hour = dayjs().hour();

    currentDayEl.text(weekday + ", " + month + " " + day);

    $('.hour').each(function () {
        if ($(this).data("time") === hour) {
            $(this).parent().next().children().removeClass('future').addClass('present');

        } else if ($(this).data("time") < hour) {
            $(this).parent().next().children().removeClass('present').addClass('past');

        } else if ($(this).data("time") > hour) {
            $(this).parent().next().children().removeClass('past').addClass('future');
        }
    });

}, 1000);

//functions clears out all saved events in local storage if within 12 am (checks once an hour)
setInterval(function () {
    if (hour === 0) {
        $(".hour").each(function () {
            var timeHour = $(this).data("time");
            localStorage.setItem(timeHour, "");
            var eventPrevInput = localStorage.getItem(timeHour);
            $(this).parent().next().children().val(eventPrevInput);

        });
    }
}, 3600000);

setTime();

//function to print out the event saved to the local drive onto the appropriate text area
function setTime() {
    $(".hour").each(function () {
        var timeHour = $(this).data("time");
        var eventPrevInput = localStorage.getItem(timeHour);
        $(this).parent().next().children().val(eventPrevInput);
    });
};

//save button logic when clicked value in text area saved to local drive and display saved message
$(".saveBtn").click(function () {
    var eventInputted = $(this).prev().children().val();
    var timeOfInput = $(this).prev().prev().children().data("time");
    localStorage.setItem(timeOfInput, eventInputted);
    $(".saveMessage").css("display", "flex");
    setTime();
});



// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

// Possible this:
//$( ".inner" ).wrapAll( "<div class='new' />");

  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //

  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //

  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
