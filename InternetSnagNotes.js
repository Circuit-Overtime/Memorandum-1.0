const checkOnlineStatus = async () => {
    try
    {
        var on_off = navigator.onLine
        const online = await fetch("https://api.github.com/users/kipngetich33");
        // console.log(online.status);
        if(online.status >= 200 && online.status <= 300)
        {
          
          document.getElementsByTagName("body")[0].style.pointerEvents = "all";
          document.getElementById("offline_notif").style.display = "none";
        }
        else
        {
          
          document.getElementsByTagName("body")[0].style.pointerEvents = "none";
          document.getElementById("offline_notif").style.display = "block";
        }
      }
      catch
      {
        
        document.getElementsByTagName("body")[0].style.pointerEvents = "none";
          document.getElementById("offline_notif").style.display = "block";
      }
    }
  
    setInterval(async () => {
      await checkOnlineStatus();
   
  }, 500)