if(localStorage.getItem("account_login_username_NOTES") == null) 
{
  location.replace("Login_or_Reg.html")
}

  var main_database = {
    apiKey: "AIzaSyCt9cJHPU9VC2ygDW9qdfFcJP7e0Rn8Bwk",
    authDomain: "notes-89337.firebaseapp.com",
    databaseURL: "https://notes-89337-default-rtdb.firebaseio.com",
    projectId: "notes-89337",
    storageBucket: "notes-89337.appspot.com",
    messagingSenderId: "739166822032",
    appId: "1:739166822032:web:e7fd33e994065877460215"
  };

  // Initialize Firebase
  firebase.initializeApp(main_database);
  
  document.querySelector(".user_name").innerHTML = localStorage.getItem("account_login_username_NOTES");

  
  function NoteAdd()
  {

  
  var timestamp = new Date().getTime();
  firebase.database().ref(localStorage.getItem("account_login_username_NOTES")+"/"+timestamp+"/").set({
    content : "Your Content",
    heading: "Title",
    unique_id : timestamp,
    pinned : false,
  })
  
  $('#notes_container').stop().animate({
    scrollTop: $('#notes_container')[0].scrollHeight
  }, 800);

}
  

document.getElementById("notes_list").innerHTML = "";
  firebase.database().ref(localStorage.getItem("account_login_username_NOTES")+"/").on("child_added", (doc) => {
    
    if(doc.val().pinned == true)
    {
      structure =  `<li id="${doc.val().heading}" class="notes_li">
      <i class="fa-solid fa-trash" id="delete_note" data-id="${doc.val().unique_id},${doc.val().heading}" onclick="delete_note(this)"></i>
      <ion-icon name="pricetag" id="pin_${doc.val().unique_id}" class = "pin_note active" data-id="${doc.val().unique_id}" onclick="pin_note(this)"></ion-icon>
      <a href="#" id="${doc.val().heading}" name = "${doc.val().unique_id}" class="notes_li_units" onclick ="expandNotes(this)" onblur="savethisnote(this)" data-id="${doc.val().unique_id}"  spellcheck="false">
        <h2 id="heading_${doc.val().unique_id}" draggable="false">${doc.val().heading}</h2>
        <p id="content_${doc.val().unique_id}" draggable="false" >${doc.val().content}</p>
      </a>
    </li>`;
    document.getElementById("notes_list").innerHTML += structure;
    }
    else
    {
      structure =  `<li id="${doc.val().heading}" class="notes_li">
        <i class="fa-solid fa-trash" id="delete_note" data-id="${doc.val().unique_id},${doc.val().heading}" onclick="delete_note(this)"></i>
        <ion-icon name="pricetag" id="pin_${doc.val().unique_id}" class = "pin_note" data-id="${doc.val().unique_id}" onclick="pin_note(this)"></ion-icon>
        <a href="#" id="${doc.val().heading}" name = "${doc.val().unique_id}" class="notes_li_units" onclick ="expandNotes(this)" onblur="savethisnote(this)" data-id="${doc.val().unique_id}" spellcheck="false">
          <h2 id="heading_${doc.val().unique_id}" draggable="false">${doc.val().heading}</h2>
          <p id="content_${doc.val().unique_id}" draggable="false" >${doc.val().content}</p>
        </a>
      </li>`;
      document.getElementById("notes_list").innerHTML += structure;
    }
   
  })
     
  function savethisnote(self)
  {
    
    referral = self.getAttribute("data-id");
   dom_ref = self.getAttribute("id"); 
    // console.log(document.getElementsByName(referral)[0].innerHTML)
    if(document.getElementsByName(referral)[0].innerHTML == "")
    {
      firebase.database().ref(localStorage.getItem("account_login_username_NOTES")+"/"+referral+"/").remove();
      document.getElementsByName(referral)[0].style.transform = "rotate(360deg)";
      document.getElementsByName(referral)[0].style.height = "0px";
      document.getElementsByName(referral)[0].style.width = "0px";
      document.getElementsByName(referral)[0].style.opacity = "0";
      setTimeout(() => {
        document.getElementById(dom_ref).remove()
      }, 800);

    }
    else
    {
    curr_heading = document.getElementById("heading_"+referral).innerHTML.trim();
    curr_content = document.getElementById("content_"+referral).innerHTML.trim();
  
    
    if((curr_content != "<br>") && document.getElementsByName(referral)[0].innerHTML != "")
    {
      firebase.database().ref(localStorage.getItem("account_login_username_NOTES")+"/"+referral+"/").update({
        content : curr_content,
        heading: curr_heading,
      })
    }
    else if(curr_heading == "<br>")
    {
      firebase.database().ref(localStorage.getItem("account_login_username_NOTES")+"/"+referral+"/").update({
        content : curr_content,
        heading: "",
      })
    }

    else if((curr_content == "<br>") && (curr_heading == "<br>"))
    {
      firebase.database().ref(localStorage.getItem("account_login_username_NOTES")+"/"+referral+"/").remove();
      document.getElementsByName(referral)[0].style.transform = "rotate(360deg)";
      document.getElementsByName(referral)[0].style.height = "0px";
      document.getElementsByName(referral)[0].style.width = "0px";
      document.getElementsByName(referral)[0].style.opacity = "0";
      setTimeout(() => {
        document.getElementById(dom_ref).remove()
      }, 800);

    }
    else if((curr_content == "<br>") && (curr_heading != "<br>"))
    {
      firebase.database().ref(localStorage.getItem("account_login_username_NOTES")+"/"+referral+"/").update({
        content : "Your Content",
        heading: curr_heading,
      })
      curr_content = document.getElementById("content_"+referral).innerHTML = "Your Content";
      document.getElementById("heading_"+referral).innerHTML = curr_heading;
    }

    else if((curr_content != "") && document.getElementsByName(referral)[0].innerHTML != "")
    {
      firebase.database().ref(localStorage.getItem("account_login_username_NOTES")+"/"+referral+"/").update({
        content : curr_content,
        heading: curr_heading,
      })
      document.getElementById("heading_"+referral).innerHTML = curr_heading;
      document.getElementById("content_"+referral).innerHTML = curr_content;
    }


  }
}

 
  
 setInterval(() => {

  var today = new Date();
  var time = today.getHours();
  // console.log(time)
  if((time >= "12") && (time <= "17"))
  {
    document.getElementById("greeting").innerHTML = "Good Afternoon!";
  }
    if((time >= "17"))
  {
    document.getElementById("greeting").innerHTML = "Good Evening!";
  }
     if((time >= "00") && (time <= "11"))
  {
    document.getElementById("greeting").innerHTML = "Good Morning!";
  }

firebase.database().ref(localStorage.getItem("account_login_username_NOTES")+"/").on("value", (docs) => {
  data_exists = docs.val();
  if(data_exists != null)
  {
    document.getElementById("onlyPinned").style.display = "block";
    document.getElementById("no_notes").style.display = "none";
    if(document.getElementById("notes_list").childElementCount < 1)
    {
      document.getElementById("honeycomb").style.opacity = "1";
    }
    else
    {
      document.getElementById("honeycomb").style.opacity = "0";
    }

    if((document.getElementById("onlyPinned").classList.contains("active")) && document.getElementById("notes_list").childElementCount < 1)
    {
      document.getElementById("no_Pinnednotes").style.display = "block";
      document.getElementById("honeycomb").style.opacity = "0";
    }
    else
    {
      document.getElementById("no_Pinnednotes").style.display = "none";
    }
  }
  else
  {
    document.getElementById("onlyPinned").style.display = "none";
    document.getElementById("no_notes").style.display = "block";
    document.getElementById("honeycomb").style.opacity = "0";
  }
})


 }, 80);   

 

  
 document.getElementById("logo").addEventListener("click", () => {
  location.replace("Login_or_Reg.html")
 })

 function note_viewer_close(self)
 {
  referral = self.getAttribute("data-id").split(",")[0];
  dom_referral = self.getAttribute("data-id").split(",")[1];
  curr_heading = document.getElementById("note_viewer_title").value;
  curr_content = document.getElementById("note_viewer_content").value;
  if((curr_content == "") && (curr_heading == ""))
    {
  
      firebase.database().ref(localStorage.getItem("account_login_username_NOTES")+"/"+referral+"/").remove();
      document.getElementsByName(referral)[0].style.transform = "rotate(360deg)";
      document.getElementsByName(referral)[0].style.height = "0px";
      document.getElementsByName(referral)[0].style.width = "0px";
      document.getElementsByName(referral)[0].style.opacity = "0";
      setTimeout(() => {
        document.getElementById(dom_referral).remove()
      }, 800);

    }

    else if((curr_content == ""))
    {
      firebase.database().ref(localStorage.getItem("account_login_username_NOTES")+"/"+referral+"/").update({
        content : "",
        heading: curr_heading,
      })
      document.getElementById("content_"+referral).innerHTML = "";
      document.getElementById("heading_"+referral).innerHTML = curr_heading;

    }

    else if(curr_heading == "")
    {
      firebase.database().ref(localStorage.getItem("account_login_username_NOTES")+"/"+referral+"/").update({
        content : curr_content,
        heading: "",
      })
      document.getElementById("content_"+referral).innerHTML = curr_content;
      document.getElementById("heading_"+referral).innerHTML = "";
    }
   else if((curr_heading != "") && (curr_content != ""))
    {
      firebase.database().ref(localStorage.getItem("account_login_username_NOTES")+"/"+referral+"/").update({
        content : curr_content,
        heading: curr_heading,
      })
      document.getElementById("content_"+referral).innerHTML = curr_content;
      document.getElementById("heading_"+referral).innerHTML = curr_heading;
    }



  
  document.getElementById("note_viewer").style.width = "0px";
  document.getElementById("notes_list").style.pointerEvents = "all";
  setTimeout(() => {
    document.getElementById("note_viewer").style.display = "none";
  }, 1000);
  }



 

 function expandNotes(self)
 {
  document.getElementById("note_viewer_content").value = ""
  referral = self.getAttribute("data-id")+","+self.getAttribute("id");
  document.getElementById("note_viewer_close").setAttribute("data-id", referral);
  document.getElementsByName(self.getAttribute("data-id"))[0].blur();
  curr_heading = document.getElementById("heading_"+referral).innerHTML.trim();
    curr_content = document.getElementById("content_"+referral).innerHTML.trim();
    
    document.getElementById("note_viewer_title").value = curr_heading;
    document.getElementById("note_viewer_content").value = curr_content;

    document.getElementById("note_viewer").style.display = "block";
    setTimeout(() => {
      document.getElementById("note_viewer").style.width = "700px";
    }, 500);
   
  
  document.getElementById("notes_list").style.pointerEvents = "none";

  



 }

 //
 function filter()
            {
                var input, filter, ul, li, a, i, txtValue;
                input = document.getElementById("notesSearch");
                filter = input.value.trim().toUpperCase();
                ul = document.getElementById("notes_container");
                li = ul.getElementsByClassName("notes_li");
            for (i = 0; i < li.length; i++) {
                a = li[i].getElementsByClassName("notes_li_units")[0];
                txtValue = a.id;
                
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    // console.log(li[i])
                    li[i].style.display = "";
                    
                } else {
                    li[i].style.display = "none";
                }
            }
        
        }
        document.getElementById("notesSearch").addEventListener("keyup", () => {
            filter();
                })
     

function pin_note(self)
{
  ref = self.getAttribute("data-id");
  if(document.getElementById("pin_"+ref).classList.contains("active") == false)
  {
    document.getElementById("pin_"+ref).classList.toggle("active");
    firebase.database().ref(localStorage.getItem("account_login_username_NOTES")+"/"+ref+"/").update({
      pinned : true,
    })
  }
  else
  {
    document.getElementById("pin_"+ref).classList.toggle("active");
    firebase.database().ref(localStorage.getItem("account_login_username_NOTES")+"/"+ref+"/").update({
      pinned : false,
    })
  }
 
}

document.getElementById("onlyPinned").addEventListener("click", () => {
  if(document.getElementById("onlyPinned").classList.contains("active") == false)
  {
    document.getElementById("notes_list").innerHTML = "";
    document.getElementById("onlyPinned").classList.toggle("active");
    firebase.database().ref(localStorage.getItem("account_login_username_NOTES")+"/").on("child_added", (doc) => {

      if(doc.val().pinned == true)
      {
        structure =  `<li id="${doc.val().heading}" class="notes_li">
        <i class="fa-solid fa-trash" id="delete_note" data-id="${doc.val().unique_id},${doc.val().heading}" onclick="delete_note(this)"></i>
        <ion-icon name="pricetag" id="pin_${doc.val().unique_id}" class = "pin_note active" data-id="${doc.val().unique_id}" onclick="pin_note(this)"></ion-icon>
        <a href="#" id="${doc.val().heading}" name = "${doc.val().unique_id}" class="notes_li_units" onclick ="expandNotes(this)" onblur="savethisnote(this)" data-id="${doc.val().unique_id}" spellcheck="false">
          <h2 id="heading_${doc.val().unique_id}" draggable="false">${doc.val().heading}</h2>
          <p id="content_${doc.val().unique_id}" draggable="false" >${doc.val().content}</p>
        </a>
      </li>`;
      document.getElementById("notes_list").innerHTML += structure;
      }
    })
  }
  else
  {
    document.getElementById("notes_list").innerHTML = "";
    document.getElementById("onlyPinned").classList.toggle("active");
    firebase.database().ref(localStorage.getItem("account_login_username_NOTES")+"/").on("child_added", (doc) => {

      if(doc.val().pinned == true)
      {
        structure =  `<li id="${doc.val().heading}" class="notes_li">
        <i class="fa-solid fa-trash" id="delete_note" data-id="${doc.val().unique_id},${doc.val().heading}" onclick="delete_note(this)"></i>
        <ion-icon name="pricetag" id="pin_${doc.val().unique_id}" class = "pin_note active" data-id="${doc.val().unique_id}" onclick="pin_note(this)"></ion-icon>
        <a href="#" id="${doc.val().heading}" name = "${doc.val().unique_id}" class="notes_li_units" onclick ="expandNotes(this)" onblur="savethisnote(this)" data-id="${doc.val().unique_id}" spellcheck="false">
          <h2 id="heading_${doc.val().unique_id}" draggable="false">${doc.val().heading}</h2>
          <p id="content_${doc.val().unique_id}" draggable="false" >${doc.val().content}</p>
        </a>
      </li>`;
      document.getElementById("notes_list").innerHTML += structure;
      }
      else
      {
        structure =  `<li id="${doc.val().heading}" class="notes_li">
          <i class="fa-solid fa-trash" id="delete_note" data-id="${doc.val().unique_id},${doc.val().heading}" onclick="delete_note(this)"></i>
          <ion-icon name="pricetag" id="pin_${doc.val().unique_id}" class = "pin_note" data-id="${doc.val().unique_id}" onclick="pin_note(this)"></ion-icon>
          <a href="#" id="${doc.val().heading}" name = "${doc.val().unique_id}" class="notes_li_units" onclick ="expandNotes(this)" onblur="savethisnote(this)" data-id="${doc.val().unique_id}" spellcheck="false">
            <h2 id="heading_${doc.val().unique_id}" draggable="false">${doc.val().heading}</h2>
            <p id="content_${doc.val().unique_id}" draggable="false" >${doc.val().content}</p>
          </a>
        </li>`;
        document.getElementById("notes_list").innerHTML += structure;
      }
     
    })

  }
})

