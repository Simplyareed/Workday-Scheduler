const localeSettings = {};
dayjs.locale(localeSettings);
// Wait until the DOM is fully loaded before executing the code inside the function.
$(function () {
  // current hour of the day is being pulled using the dayjs library.
  const currentHour = dayjs().format('H');
// The function setHourlyColor changes the color of each time block depending on if it's in the "past, present, or future" pertaining to time.
function setHourlyColor() {
  console.log('Hourly Color Function called');
  const currentHour = parseInt(dayjs().format('H'));
  // Iterates over each time block, determines if it's in the past, present, or future relative to the current hour,
// and updates its CSS class to reflect its updated status.
  $('.time-block').each(function() {
    const blockHour = parseInt(this.id);
    const timeClass = blockHour < currentHour ? 'past' : (blockHour === currentHour ? 'present' : 'future');
    $(this).removeClass('past present future').addClass(timeClass);
  });
}
// The  user's input saved in localStorage, once save button has been clicked.
  function textEntry() {
    $('.saveBtn').on('click', function() {
      const key = $(this).parent().attr('id');
      const value = $(this).siblings('.description').val();
      localStorage.setItem(key, value);
    });
  }
 //  function setRefreshColor will refresh the color of each time block based on whether it's in the past,present,or future via the current time. 
  function setRefreshColor() {
    $('.time-block').each(function() {
      const blockHour = parseInt(this.id);
      if (blockHour == currentHour) {
        $(this).removeClass('past future').addClass('present');
      } else if (blockHour < currentHour) {
        $(this).removeClass('future present').addClass('past');
      } else {
        $(this).removeClass('past present').addClass('future');
      }
    });
  }
  // user input from the localStorage.
  $('.time-block').each(function() {
    const key = $(this).attr('id');
    const value = localStorage.getItem(key);
    $(this).children('.description').val(value);
  });

  
 // Update the date and time elements in the DOM with the current date and time and displays it 
  function updateTime() {
    const dateElement = $('#date');
    const timeElement = $('#time');
    const currentDate = dayjs().format('dddd, MMMM D, YYYY');
    dateElement.text(currentDate);
    timeElement.text(currentTime);
  }
  // Call the three main functions to set up the page.
  setHourlyColor();
  setRefreshColor();
  textEntry();                
  // This will update the time once per second for the current time
  setInterval(updateTime, 1000);
});