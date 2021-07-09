
function updateTimer(deadline){

    var time = deadline - new Date();

    // returning an object stating the units of time left from the current moment up to the event
    return{
        'days'      : Math.floor( time/(1000*60*60*24) ),
        'hours'     : Math.floor( (time/(1000*60*60)) % 24 ),
        'minutes'   : Math.floor( (time/(1000*60)) % 60 ),
        'seconds'   : Math.floor( (time/1000) % 60 ),
        'total'     : time
    };
}


// adding a class name to whichever span needs the CSS to flip
function animateClock(span){
    span.className = "turn";
    setTimeout(function(){
        span.className = ""; // resetting
    }, 700);
}


function startTimer(id, deadline){

    // setInterval() returns an ID for the timer which can later be used with clearInterval() to cancel the timer
    var timerInterval = setInterval(function(){

        // grabbing and storing the 'clock' div to add inner HTML to it later
        var clock = document.getElementById(id);
        var timer = updateTimer(deadline);

        clock.innerHTML = '<span>' + timer.days + '</span>' + 
                          '<span>' + timer.hours + '</span>' + 
                          '<span>' + timer.minutes + '</span>' + 
                          '<span>' + timer.seconds + '</span>';

        // adding inner HTML to whichever time-unit changes for flipping animation; returns array of all 4 span-tags 
        var spans = clock.getElementsByTagName("span");
        
        animateClock(spans[3]);
        if(timer.seconds == 59)
            animateClock(spans[2]);
        if(timer.seconds == 59 && timer.minutes == 59)
            animateClock(spans[1]);
        if(timer.seconds == 59 && timer.minutes == 59 && timer.hours == 23)
            animateClock(spans[0]);
        
        // checking for the end of the timer
        if(timer.time < 1){
            clearInterval(timerInterval);
            clock.innerHTML = '<span>0</span><span>0</span><span>0</span><span>0</span>';
        }
    
    
    }, 1000);
}


window.onload = function(){
    var deadline = new Date("December 31, 2023 23:59:00");  // Enter a valid future date & time 
    startTimer("clock", deadline);
}





