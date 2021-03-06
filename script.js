$(document).ready(function () {
  /* ******************** Global variables ******************** */
  
  var activitiesArray = [
    {
      date: "",
      time: moment().startOf("day").add(8, "hours").format("h:mm a"),
      activity: "",
      button: "< class='far fa-save'></i>",
    },
    {
      date: "",
      time: moment().startOf("day").add(9, "hours").format("h:mm a"),
      activity: "",
      button: "< class='far fa-save'></i>",
    },
    {
      date: "",
      time: moment().startOf("day").add(10, "hours").format("h:mm a"),
      activity: "",
      button: "< class='far fa-save'></i>",
    },
    {
      date: "",
      time: moment().startOf("day").add(11, "hours").format("h:mm a"),
      activity: "",
      button: "< class='far fa-save'></i>",
    },
    {
      date: "",
      time: moment().startOf("day").add(12, "hours").format("h:mm a"),
      activity: "",
      button: "< class='far fa-save'></i>",
    },
    {
      date: "",
      time: moment().startOf("day").add(13, "hours").format("h:mm a"),
      activity: "",
      button: "< class='far fa-save'></i>",
    },
    {
      date: "",
      time: moment().startOf("day").add(14, "hours").format("h:mm a"),
      activity: "",
      button: "< class='far fa-save'></i>",
    },
    {
      date: "",
      time: moment().startOf("day").add(15, "hours").format("h:mm a"),
      activity: "",
      button: "< class='far fa-save'></i>",
    },
    {
      date: "",
      time: moment().startOf("day").add(16, "hours").format("h:mm a"),
      activity: "",
      button: "< class='far fa-save'></i>",
    },
    {
      date: "",
      time: moment().startOf("day").add(17, "hours").format("h:mm a"),
      activity: "",
      button: "<class='far fa-save'></i>",
    },
  ];

  var currentDay = moment();
  var firstWeekDay;
  var startCell;
  var countedDatesArray = [];
  var localStorageObjectsArray = [];

  init();

  /* ******************** Function declarations ******************** */
  function init() {
    $("#year").text(currentDay.format("YYYY"));
    $("#month").text(currentDay.format("MMMM"));
    countLocalStorageActivitiesDates();
    createTBody();
    displayDayDate();
  }

  /* ---------- Month View ---------- */
  function createTBody() {
    // Empty previous table displayed
    $("tbody").empty();

    // Find the First Week Day of the Month
    var firstDayFlag = false;
    var lastDay = 0;
    var firstDayStr =
      currentDay.format("YYYY") + currentDay.format("MM") + "01";
    var FirstDay = moment(firstDayStr);
    firstWeekDay = moment(firstDayStr).format("dddd");
    var lastMonthDay = currentDay.endOf("month");

    // Define the Table Cell correspondent to the First Week Day
    switch (firstWeekDay) {
      case "Monday":
        startCell = "cell00";
        break;
      case "Tuesday":
        startCell = "cell01";
        break;
      case "Wednesday":
        startCell = "cell02";
        break;
      case "Thursday":
        startCell = "cell03";
        break;
      case "Friday":
        startCell = "cell04";
        break;
      case "Saturday":
        startCell = "cell05";
        break;
      case "Sunday":
        startCell = "cell06";
        break;
    }

    // Create the new Table Cells
    for (r = 0; r < 6; r++) {
      var newrow = $("<tr>");
      newrow.attr("id", "row" + r);
      for (d = 0; d < 7; d++) {
        var newCell = $("<td>");
        var numDiv = $("<div>");
        var spannum = $("<p>");
        var newtext = $("<p>");
        numDiv.attr("class", "dayNumDiv input-group-prepend");
        spannum.attr("class", "dayNum");
        newtext.attr("class", "dayText");
        numDiv.append(spannum);
        var rStr = String(r);
        var dStr = String(d);
        var compCell = "cell" + rStr + dStr;
        var momentStr = FirstDay.toString();
        if (startCell === compCell) {
          firstDayFlag = true;
        }
        if (firstDayFlag) {
          if (lastDay != 2) {
            spannum.text(FirstDay.format("Do"));
            newCell.attr("moment", momentStr);

            // Display Activities Count
            countedDatesArray.forEach(function (countedDates) {
              if (
                countedDates.current ===
                moment(newCell.attr("moment")).format("MMMM Do YYYY")
              ) {
                newtext.text(`Acts: ${countedDates.cnt}`);
                newCell.append(newtext);
              }
            });
          }
          FirstDay = FirstDay.add(1, "day");
        }
        newCell.attr("class", "cell");
        newCell.attr("id", "cell" + r + d);
        newCell.prepend(numDiv);

        newrow.append(newCell);
        if (lastDay === 1) {
          lastDay = 2;
        }
        if (FirstDay.format("Do") === lastMonthDay.format("Do")) {
          lastDay = 1;
        }
      }
      if (lastDay != 3) {
        $("tbody").append(newrow);
      }
      if (lastDay === 2) {
        lastDay = 3;
      }
    }
    $("tbody").hide();
    $("tbody").fadeIn(1000);
    countLocalStorageActivitiesDates();
  }

  function countLocalStorageActivitiesDates() {
    var datesArray = [];
    localStorageObjectsArray = [];
    for (i = 0; i < localStorage.length; i++) {
      var localStorageKey = localStorage.key(i);
      localStorageObject = JSON.parse(localStorage.getItem(localStorageKey));
      datesArray.push(localStorageObject.date);
      localStorageObjectsArray.push(localStorageObject);
    }

    
    datesArray.sort();
    var current = null;
    var cnt = 0;
    countedDatesArray = [];
    for (var i = 0; i < datesArray.length; i++) {
      if (datesArray[i] != current) {
        if (cnt > 0) {
          var countedDates = {};
          countedDates.current = current;
          countedDates.cnt = cnt;
          countedDatesArray.push(countedDates);
        }
        current = datesArray[i];
        cnt = 1;
      } else {
        cnt++;
      }
    }
    if (cnt > 0) {
      var countedDates = {};
      countedDates.current = current;
      countedDates.cnt = cnt;
      countedDatesArray.push(countedDates);
    }
    
  }

  function changeDate() {
    switch ($(this).attr("id")) {
      case "nextY":
        currentDay = currentDay.add(1, "years");
        break;
      case "prevY":
        currentDay = currentDay.subtract(1, "years");
        break;
      case "nextM":
        currentDay = currentDay.add(1, "months");
        break;
      case "prevM":
        currentDay = currentDay.subtract(1, "months");
        break;
    }

    // Update the Month View
    $("#year").text(currentDay.format("YYYY"));
    $("#month").text(currentDay.format("MMMM"));
    createTBody();

    // Update eventListeners
    clearEventListeners();
    eventListeners();
  }

  /* ---------- Daily Planner ---------- */
  function displayDayDate() {
    if ($("#dayDate").attr("moment") === undefined) {
      $("#dayDate").attr("moment", moment().format("MMMM Do YYYY"));
      $("#dayDate").text(moment().format("MMMM Do YYYY"));
    } else {
      var mouseenterMoment = moment($(this).attr("moment")).format(
        "MMMM Do YYYY"
      );
      $("#dayDate").attr("moment", mouseenterMoment);
      $("#dayDate").text(mouseenterMoment);
    }
    displayActivities();
  }

  function displayActivities() {
    // Clear previous Dayly Planner Activities
    $("#activities").empty();

    // Create the new Daily Planner Activities
    activitiesArray.forEach(function (activity, index) {
      // Load activitiesArray from localStorage
      var activityLoad = "activityWrap" + index;
      var activityWrapLoaded = localStorage.getItem(`${activityLoad}`);
      activityWrapLoaded = JSON.parse(activityWrapLoaded);
      if (localStorage.getItem(`${activityLoad}`) != null) {
        activitiesArray[index] = activityWrapLoaded;
      }

      // Create the activity-wraps and display info from activitiesArray
      var divActWrap = $("<div>");
      var divPrepend = $("<div>");
      var spanTime = $("<span>");
      var inputActivity = $("<input>");
      var divAppend = $("<div>");
      var buttonSave = $("<button>");

      divActWrap.attr("class", "activity-wrap input-group");
      divPrepend.attr("class", "input-group-prepend");
      spanTime.attr("class", "time input-group-text");
      inputActivity.attr("type", "text");
      inputActivity.attr("class", "activity form-control");
      inputActivity.attr("placeholder", "");
      divAppend.attr("class", "input-group-append");
      buttonSave.attr("class", "save btn btn-info");
      buttonSave.attr("type", "button");
      buttonSave.attr("data-index", index);

      spanTime.text(activitiesArray[index].time);
      buttonSave.append(activitiesArray[index].button);

      if ($("#dayDate").attr("moment") === activitiesArray[index].date) {
        inputActivity.attr("value", activitiesArray[index].activity);
      }

      divPrepend.append(spanTime);
      divAppend.append(buttonSave);
      divActWrap.append(divPrepend);
      divActWrap.append(inputActivity);
      divActWrap.append(divAppend);
      $("#activities").append(divActWrap);

      // Assign background format according to time of the day
      agendaHour = parseInt(index + 8);
      var current = moment().hour();
      if (current > agendaHour) {
        $("#activities")
          .children()
          .eq(index) 
          .children()
          .eq(1)
          .css("background", "#e2e3e5")
          .css("width", "500px");
      } else if (current === agendaHour) {
        $("#activities")
          .children()
          .eq(index)
          .children()
          .eq(1)
          .css("background", "#bee5eb")
          .css("width", "500px");
      } else {
        $("#activities")
          .children()
          .eq(index)
          .children()
          .eq(1)
          .css("background", "white")
          .css("width", "500px");
      }
    });

    $("#activities").hide();
    $("#activities").fadeIn(1000);

    // Update eventListeners
    clearEventListeners();
    eventListeners();
  }

  function saveActivity() {
    $(".activity-saved").fadeIn(1000);
    $(".activity-saved").fadeOut(1000);

    // Save to localStorage
    var index = $(this).attr("data-index");
    var date = $("#dayDate").attr("moment");
    var time = $("#activities")
      .children()
      .eq(index)
      .children()
      .eq(0)
      .children()
      .eq(0)
      .text();
    var activity = $("#activities").children().eq(index).children().eq(1).val();
    var button = $(this).html();
    var activityWrap = {
      date: date,
      time: time,
      activity: activity,
      button: button,
    };
    var activityWrapText = JSON.stringify(activityWrap);
    var activitySafe = "activityWrap" + index;
    localStorage.setItem(activitySafe, activityWrapText);

    // Update activitiesArray
    activitiesArray[index] = activityWrap;
    countLocalStorageActivitiesDates();
    createTBody();
    clearEventListeners();
    eventListeners();
  }

  /* ******************** Event listeners ******************** */

  function clearEventListeners() {
    // Clear previous eventListeners
    $(".save").unbind();
    $("td").unbind();
    $("#prevY").unbind();
    $("#nextY").unbind();
    $("#prevM").unbind();
    $("#nextM").unbind();
  }

  function eventListeners() {
    // Update eventListeners
    $(".save").on("click", saveActivity);

    $("td").mouseenter(function () {
      $(this).css("background", "lightgray");
    });

    $("td").mouseleave(function () {
      $(this).css("background", "white");
    });

    $("td").on("click", displayDayDate);
    $("#prevY").on("click", changeDate);
    $("#nextY").on("click", changeDate);
    $("#prevM").on("click", changeDate);
    $("#nextM").on("click", changeDate);
  }
  
});
