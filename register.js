var notes_database = {
  apiKey: "AIzaSyCt9cJHPU9VC2ygDW9qdfFcJP7e0Rn8Bwk",
  authDomain: "notes-89337.firebaseapp.com",
  databaseURL: "https://notes-89337-default-rtdb.firebaseio.com",
  projectId: "notes-89337",
  storageBucket: "notes-89337.appspot.com",
  messagingSenderId: "739166822032",
  appId: "1:739166822032:web:e7fd33e994065877460215"
};

// Initialize Firebase
const notes_db = firebase.initializeApp(notes_database, "secondary");


today  = new Date();
var date = today.getDate() + "/" + (today.getMonth()+1) + "/" + today.getFullYear() ; //gives the  current date to the system
const db = firebase.firestore();
const reg_form = document.querySelector("#register");
function register_usr()
{
    var error_reg = document.getElementById("error_reg");
    error_reg.innerHTML = "";
      globalThis.reg_usr = document.getElementById("reg_usr").value.toLowerCase().trim(); // gets the username (user entered in DOM)
      var reg_email = document.getElementById("reg_email").value.trim(); //gets the email (user entered in DOM)
      var reg_psswd = document.getElementById("reg_psswd").value.trim(); //gets the password (user entered in DOM)
      var reg_psswd_confirm = document.getElementById("reg_psswd_confirm").value; //gets the confirm password (user entered in DOM)
    
    var usrFind = db.collection("Users").doc(reg_usr);
    usrFind.get().then((doc) => { //gets the whole data against the entered email address
      if (doc.exists) //if the username already exists
      {
        var error_reg = document.getElementById("error_reg");
        error_reg.innerHTML = "Username already exists. Please choose a different one";
        

        setTimeout(function(){
          error_reg.innerHTML = "";
          document.getElementById("reg_usr").value = "";
          document.getElementById("reg_usr").focus();
        }, 2500)
      }
      else //if the username does not exists then proceed to create a new user
      {
        firebase.auth().createUserWithEmailAndPassword(reg_email, reg_psswd)
        .then((userCredential) => {
          var user = userCredential.user; //suspends all the values to user variable
          console.log(user.email, user.uid)
            db.collection('Users').doc(reg_usr).set({
                username : reg_usr,
                password : reg_psswd,
                email : reg_email,
                uid : user.uid,
                verified : false,
                dev : false,
                date_of_creation : date,
                displayName : reg_usr,
                profile_logo: "https://firebasestorage.googleapis.com/v0/b/chat-c774b.appspot.com/o/0A%20NightAngle%20Assets%2Fdef%20logo.jpg?alt=media&token=2acb6b5b-c634-4927-b029-d107913efe00",
            })
            
            var timestamp = new Date().getTime();
            firebase.database(notes_db).ref(reg_usr+"/"+timestamp+"/").set({
              content : "1. Click on Me to Expand... 2. Click on the + icon to add a note... 3. Click on the tag button on a note to PIN it.... 4. Click on the tag button beside the + icon to filter PINNED notes... 5. Click on the app icon in the header to logout.... Wishing you a very happy stay user, we are your daily dose of support",
              heading: "Welcome",
              unique_id : timestamp,
              pinned : false,
            })


            form = document.getElementById("form");
              reg = document.getElementById("register");
              reg.style.transform = "translateY(750px)";
              reg.style.opacity = "0%";
              reg.style.zIndex = "-1";
        
              document.getElementById("reg_usr").value = "";
              document.getElementById("reg_email").value = "";
              document.getElementById("reg_psswd").value = "";
              document.getElementById("reg_psswd_confirm").value = "";
              
        
            setTimeout(function(){
              document.getElementById("register_message").style.animation = "grow 2s linear forwards";
              document.getElementById("register_message").style.animation = "shrink 2s linear forwards";
            }, 1000)
        
            setTimeout(function(){
              
        
              form = document.getElementById("form");
              reg = document.getElementById("register");
              reg.style.transform = "translateY(750px)";
              form.style.transform = "translateY(0px)";
              form.style.opacity = "100%";
              form.style.zIndex = "100";
              reg.style.zIndex = "-1";
              reg.style.opacity = "0";
              window.location.reload()
            }, 3000)  
        
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          var error_reg = document.getElementById("error_reg");
          error_reg.innerHTML = errorMessage;
        
        });
      }

    })


// function to register a user

}

//Register security checks

  reg_btn = document.getElementById("btn_reg");
  function register()
  {
      var reg_usr = document.getElementById("reg_usr").value;
      var reg_email = document.getElementById("reg_email").value;
      var reg_psswd = document.getElementById("reg_psswd").value;
      var reg_psswd_confirm = document.getElementById("reg_psswd_confirm").value;
      if ( reg_usr == "" || reg_email == "" || reg_psswd == "" || reg_psswd_confirm == "") 
      {
        // alert("required Fields were not filled");
        var error_reg = document.getElementById("error_reg");
        error_reg.innerHTML = "Required Credential Fields were not Filled";

        
      }
      if(reg_psswd !== reg_psswd_confirm)
      {
        var error_reg = document.getElementById("error_reg");
        error_reg.innerHTML = "Passwords Entries don't Match";
      }
      else
      {
        register_usr(); 
      }
  }



