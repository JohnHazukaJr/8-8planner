$(function () {
  // Display the current date in the header
  var currentDate = moment().format("dddd, MMMM D");
  $("#currentDay").text(currentDate);

  // Populate timeblocks from 8 AM to 8 PM
  var container = $(".container-lg");
  var currentTime = moment().hour();

  for (var i = 8; i <= 20; i++) {
    var timeBlockId = "hour-" + i;
    var timeBlockClass = getTimeBlockClass(i, currentTime);

    var timeBlock = $("<div>").addClass("row time-block " + timeBlockClass).attr("id", timeBlockId);
    var hourDiv = $("<div>").addClass("col-2 col-md-1 hour text-center py-3").text(formatHour(i));
    var textarea = $("<textarea>").addClass("col-8 col-md-10 description").attr("rows", 3);
    var saveButton = $("<button>").addClass("btn saveBtn col-2 col-md-1").html('<i class="fas fa-save"></i>');

    timeBlock.append(hourDiv, textarea, saveButton);
    container.append(timeBlock);

    var savedEvent = localStorage.getItem(timeBlockId);
    if (savedEvent) {
      textarea.val(savedEvent);
    }

    saveButton.on("click", function() {
      var userEvent = $(this).siblings(".description").val();
      localStorage.setItem(timeBlockId, userEvent);
    });
  }

  // Get the appropriate class for the time block
  function getTimeBlockClass(blockHour, currentHour) {
    if (blockHour < currentHour) {
      return "past";
    } else if (blockHour === currentHour) {
      return "present";
    } else {
      return "future";
    }
  }

  // Format hour in 12-hour format with AM/PM indicator
  function formatHour(hour) {
    return moment().hour(hour).format("hA");
  }
});
