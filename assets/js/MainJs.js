

window.onload = function Listen() {
	var confirmClone = false;
	var equipmentCnt = -1;
	var dataDaseEquipment = {
		"Tripod":"#SjJz0",
		"Camera Light":"#KVx3z",
		"Wireless Microphone":"#iXRCi",
		"Camera lens":"#2m9AR",
		"Shotgun Microphone":"#1c6kH",
		"Boom Pole":"#TSVHG",
		"Wireless Microphone":"#FCyHF",
		"Audio (XLR) Cables":"#3yedH",
		"Light Reflector":"#Fu381",		
		"Video Camera":"#7a0d1",
		"Headphones":"#k2ohk",
		"Camera":"#skZXm",
	}


	// Initialize Firebase
	var config = {
	  apiKey: "AIzaSyB02C3leQrgHdHhS35wCuRT8wogpF9D1So",
	  authDomain: "m2e25d3i6ap65r6o6duc35tion.firebaseapp.com",
	  databaseURL: "https://m2e25d3i6ap65r6o6duc35tion.firebaseio.com",
	  projectId: "m2e25d3i6ap65r6o6duc35tion",
	  storageBucket: "m2e25d3i6ap65r6o6duc35tion.appspot.com",
	  messagingSenderId: "923396059715"
	};
	firebase.initializeApp(config);
	var validateAccount = firebase.database().ref("Students");
	validateAccount.on('value', snap=> validateAccount = snap.val());

	 //--------------// Load this data if detect the equipment page 
	 if (window.location.href.indexOf("assets/Borrow.html?") > 0) {
	 	setTimeout(function(){

	 		var UserName = window.location.search;
	 			UserName = UserName.substr(UserName.indexOf("=")+1);
	 			UserName = UserName.replace("%20"," ");

	 		equipmentCnt = (validateAccount[UserName]["Borrowed Equipments"].length-1)+1;
	 		if (validateAccount[UserName]["Borrowed Equipments"][0] != "null") {
	 		for (var i = 0; i < equipmentCnt; i++) {
	 			 var tbody = document.getElementsByTagName('tbody')[1];
	 			 if (confirmClone == true) {
	 				 var tr = tbody.getElementsByTagName('tr')[0];
	 				 var cloneTr = tr.cloneNode(true);
	 					 cloneTr.getElementsByTagName('td')[0].innerHTML= validateAccount[UserName]["Borrowed Equipments"][i];
	 					 cloneTr.getElementsByTagName('td')[1].innerHTML= validateAccount[UserName]["Return Dates"][i];
	 					 tbody.appendChild(cloneTr);
					}else{ 
	 					confirmClone = true;
	 					tbody.getElementsByTagName('tr')[0].getElementsByTagName('td')[0].innerHTML= validateAccount[UserName]["Borrowed Equipments"][i];
	 					tbody.getElementsByTagName('tr')[0].getElementsByTagName('td')[1].innerHTML= validateAccount[UserName]["Return Dates"][i];
	 				}
	 		}}

	 	},2000);
	 	confirmClone = false;
	 }


	try{ 
		var name = document.querySelector(".name"),
			email = document.querySelector(".email"),
			pass = document.querySelector(".pass"),
			confirmKey = document.querySelector(".ConfirmKey"),
			passConfirm = document.querySelector(".passConfirm"),
			label = document.getElementById('label'),
			form = document.getElementById('form'),
			register = document.querySelector(".register"),
			login = document.querySelector(".login"),
			recoverP = document.querySelector(".recoverP"),
			equipmentB = document.querySelector(".equipmentB"),
			selectSample = document.getElementById("selectSample");

		document.addEventListener('click', function(e){

		  //--------------// login function
		  if(login == e.target){console.log(0)
		  	var UserName = name.value.toUpperCase();
		  	

		  	if (validateAccount[""+UserName] != undefined) {
		  		if (form.checkValidity() == true) {
		  			if (validateAccount[""+UserName]["Pass"] == pass.value && validateAccount[""+UserName]["Valid"] == "true") {
		  				e.preventDefault();
		  				self.location = "assets/Borrow.html?username="+UserName;

		  			}else if (validateAccount[""+name.value.toUpperCase()]["Valid"] == "false" && validateAccount[""+UserName]["Pass"] == pass.value){
		  				e.preventDefault();
		  				confirmKey.style.display="block";
		  				label.style.display="block";
		  				name.style.display="none";
		  				pass.style.display="none";
		  			}else{
		  				pass.setCustomValidity("Password maybe incorrect");
		  				setTimeout(function(){pass.setCustomValidity("");},2000);
		  			}
		  		}
		  	}else{
		  		name.setCustomValidity("You don't exist in our database");
		  		setTimeout(function(){name.setCustomValidity("");},2000);
		  	}

		  }



		  //--------------// register function
		  if(register == e.target){console.log(0)
		  	var UserName = name.value.toUpperCase();

		  	if (!(passConfirm.value == pass.value)) {
		  		passConfirm.setCustomValidity("Password not matching");
		  		setTimeout(function(){passConfirm.setCustomValidity("");},2000);
		  	}

			if (validateAccount[""+name.value.toUpperCase()] == undefined) {
		  		if (form.checkValidity() == true) {
		  			e.preventDefault();
		  			firebase.database().ref("Students").child(UserName).child("Pass").set(pass.value);
		  			firebase.database().ref("Students").child(UserName).child("Email").set(email.value);
		  			firebase.database().ref("Students").child(UserName).child("Valid").set("false");
		  			firebase.database().ref("Students").child(UserName).child("Borrowed Equipments").child(0).set("null");
		  			firebase.database().ref("Students").child(UserName).child("Return Dates").child(0).set("null");
	
		  			// confirm account
		  			confirmKey.style.display="block";
		  			label.style.display="block";
		  			name.style.display="none";
		  			email.style.display="none";
		  			pass.style.display="none";
		  			passConfirm.style.display="none";
		  			// self.location = "Borrow.html";
		  		}
		  	}else{
		  		name.setCustomValidity("Your name is already in or database Please consider to login");
		  		setTimeout(function(){name.setCustomValidity("");},2000);
		  	}
		  }




		  //--------------// recoverP function
		  if(recoverP == e.target){


		  }


		  //--------------// equipmentB function
		  var equipmentName = selectSample.options[selectSample.selectedIndex].innerHTML;
		  	  equipNameInput = document.getElementsByTagName('INPUT')[0];
		  	  equipIDInput = document.getElementsByTagName('INPUT')[1];
		  	  returnDate = document.getElementsByTagName('INPUT')[2];
		  	  currentDate = new Date();

		  if (selectSample == e.target) {
		  	if (equipmentName != "---------Test a Sample---------") {
		  		equipNameInput.value = equipmentName;
		  		equipIDInput.value = dataDaseEquipment[""+equipmentName];
		  	}
		  }
		  if(equipmentB == e.target){
		  	var UserName = window.location.search;
		  		UserName = UserName.substr(UserName.indexOf("=")+1);
		  		UserName = UserName.replace("%20"," ");

		  	if (UserName != "") {
		  		if (form.checkValidity() == true) {

		  			if (returnDate.value > currentDate.getFullYear()+"-0"+(currentDate.getMonth()+1)+"-"+currentDate.getDate()) {
		  				e.preventDefault();
		  				var tbody = document.getElementsByTagName('tbody')[1];

		  				// counter
		  				if (validateAccount[UserName]["Borrowed Equipments"][0] == "null") {
		  					equipmentCnt = 0;
		  				}else{equipmentCnt = (validateAccount[UserName]["Borrowed Equipments"].length-1)+1;} 

		  				if (confirmClone == true) {
		  					var tr = tbody.getElementsByTagName('tr')[0];
		  					var cloneTr = tr.cloneNode(true);
		  						cloneTr.getElementsByTagName('td')[0].innerHTML= equipNameInput.value;
		  						cloneTr.getElementsByTagName('td')[1].innerHTML= returnDate.value;
		  						tbody.appendChild(cloneTr);

		  					// store data online
		  					firebase.database().ref("Students").child(UserName).child("Borrowed Equipments").child(equipmentCnt).set(equipNameInput.value);
		  					firebase.database().ref("Students").child(UserName).child("Return Dates").child(equipmentCnt).set(returnDate.value);

		  				}else{ 
		  					confirmClone = true;
		  					tbody.getElementsByTagName('tr')[0].getElementsByTagName('td')[0].innerHTML=  equipNameInput.value;
		  					tbody.getElementsByTagName('tr')[0].getElementsByTagName('td')[1].innerHTML=  returnDate.value;

		  					// store data online
		  					firebase.database().ref("Students").child(UserName).child("Borrowed Equipments").child(equipmentCnt).set(equipNameInput.value);
		  					firebase.database().ref("Students").child(UserName).child("Return Dates").child(equipmentCnt).set(returnDate.value);
		  				}

		  				// clear fileds
		  				equipNameInput.value = "";
		  				returnDate.value = "";
		  				equipIDInput.value = "";
		  			
		  			}else{
		  				returnDate.setCustomValidity("Return Date is invalid");
		  				setTimeout(function(){returnDate.setCustomValidity("");},2000);
		  			}
		  		}
		  	}else{
		  		alert("You are not authorised to be on this page")
		  	}
		  }
		});
	}catch(err){console.log(err)};
		
}