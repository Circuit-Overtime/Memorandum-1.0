function delete_note(self)
{
  data_baseRef = self.getAttribute("data-id").split(",")[0];
  domRef = self.getAttribute("data-id").split(",")[1];
  const TIME_LIMIT = 5;
    let timePassed = 0;
    let timeLeft = TIME_LIMIT;
    let timerInterval = null;
    
    function onTimesUp() {
        clearInterval(timerInterval);
        document.getElementById("cancel_deleteProcess").style.display = "none";
        document.getElementById("deleteProg_number").style.color = "red";
        document.getElementById("deleteProg_number").innerHTML = "Removed";
        document.getElementById("deleteProg").style.transform  = "translateY(200px)";

        setTimeout(() => {
            document.getElementById("deleteProg_number").style.color = "#fff";
            document.getElementById("deleteProg_number").innerHTML = "5";
        }, 800);
        
        firebase.database().ref(localStorage.getItem("account_login_username_NOTES")+"/"+data_baseRef+"/").remove();
        document.getElementsByName(data_baseRef)[0].style.transform = "rotate(360deg)";
        document.getElementsByName(data_baseRef)[0].style.height = "0px";
        document.getElementsByName(data_baseRef)[0].style.width = "0px";
        document.getElementsByName(data_baseRef)[0].style.opacity = "0";
        document.getElementById(domRef).remove();
      
    }
    function startTimer()
    {
        document.getElementById("deleteProg_number").style.color = "#fff";
            document.getElementById("deleteProg_number").innerHTML = "5";
        document.getElementById("deleteProg_unit").style.width = "100%";
        document.getElementById("deleteProg").style.transform  = "translateY(0px)";
        document.getElementById("cancel_deleteProcess").style.display = "block";
        timerInterval = setInterval(() => {
            timePassed = timePassed += 1;
            timeLeft = TIME_LIMIT - timePassed;
            document.querySelector(".deleteProg_unit").style.width = ((timeLeft / 5)*100) + "%";
            // console.log( ((timeLeft / 5)*100)/10 + "%");
            document.getElementById("deleteProg_number").innerHTML = formatTime(
              timeLeft
            );
                
                
           
        
            if (timeLeft === 0) {
              onTimesUp();
            }
          }, 1000);
          setInterval(() => {
            
          }, 80);
        }
        
        function formatTime(time) {
          const minutes = Math.floor(time / 60);
          let seconds = time % 60;
        
        
        
          return `${seconds}`;
    }
    startTimer()

    document.getElementById("cancel_deleteProcess").addEventListener("click", () => {
        clearInterval(timerInterval);
        document.getElementById("deleteProg_unit").style.width = "0%";
        document.getElementById("cancel_deleteProcess").style.display = "none";
        document.getElementById("deleteProg_number").style.color = "green";
        document.getElementById("deleteProg_number").innerHTML = "Cancelled";
        

        setTimeout(() => {
            document.getElementById("deleteProg").style.transform  = "translateY(200px)";
            document.getElementById("deleteProg_number").style.color = "inherit";
            document.getElementById("deleteProg_number").innerHTML = "5";
        }, 900);
    })
    
     
    
}

