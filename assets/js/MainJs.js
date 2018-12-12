window.onload = function Listen() {
	var confirmClone = false,
		tracker = 0,
		active = null,
		borrowedEqip = [];

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


	// Logout
	var firebase = app_fireBase;
	var uid = null;
	var tbody = document.getElementsByTagName('tbody')[1];

	firebase.auth().onAuthStateChanged(function (user) {
		var namer = document.getElementById("namer");
		namer.innerHTML = user.displayName;

		 //--------------// Load Student data
		var validateAccount = firebase.database().ref(user.uid);
		validateAccount.once("value").then(function(snapshot,e) {
		borrowedEqip = JSON.parse(JSON.parse(snapshot.val())["EqupBorrowed"])

			for (let index = 0; index < borrowedEqip.length/2; index++) {
				var tbody = document.getElementsByTagName('tbody')[1];
				if (confirmClone == true) {
					tracker+= 2;
					var tr = tbody.getElementsByTagName('tr')[0];
					var cloneTr = tr.cloneNode(true);
					cloneTr.getElementsByTagName('td')[0].innerHTML = borrowedEqip[tracker];
					cloneTr.getElementsByTagName('td')[1].innerHTML = borrowedEqip[tracker+1];
					tbody.appendChild(cloneTr);
				}else{ 
					confirmClone = true;
					tbody.getElementsByTagName('tr')[0].classList.remove("dipClass");
					tbody.getElementsByTagName('tr')[0].getElementsByTagName('td')[0].innerHTML = borrowedEqip[index];
					tbody.getElementsByTagName('tr')[0].getElementsByTagName('td')[1].innerHTML = borrowedEqip[index+1];
				}
			}
		});

	try{ 

		var form = document.getElementById('form'),
			equipmentB = document.querySelector(".equipmentB"),
			selectSample = document.getElementById("selectSample");

		document.addEventListener('click', function(e){
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

		  
		  if(equipmentB == e.target && equipmentB.innerHTML == "Borrow"){
		  	console.log("Borrow equipment sector")

		  		if (form.checkValidity() == true) {
		  			var month,date;

		  			if (currentDate.getMonth() < 9) {month = "-0"+(currentDate.getMonth()+1)}else{month = "-"+(currentDate.getMonth()+1)}
		  			if (currentDate.getDate() < 9) {date = "-0"+currentDate.getDate()}else{date = "-"+currentDate.getDate()}

		  			if (returnDate.value > currentDate.getFullYear()+month+date) {

		  				if (confirmClone == true) {
							var tr = tbody.getElementsByTagName('tr')[0];
							  var cloneTr = tr.cloneNode(true);
								tbody.getElementsByTagName('tr')[0].classList.remove("dipClass");
		  						cloneTr.getElementsByTagName('td')[0].innerHTML= equipNameInput.value;
		  						cloneTr.getElementsByTagName('td')[1].innerHTML= returnDate.value;
		  						tbody.appendChild(cloneTr);
		  				}else{ 
							confirmClone = true;
							tbody.getElementsByTagName('tr')[0].classList.remove("dipClass");
		  					tbody.getElementsByTagName('tr')[0].getElementsByTagName('td')[0].innerHTML =  equipNameInput.value;
		  					tbody.getElementsByTagName('tr')[0].getElementsByTagName('td')[1].innerHTML =  returnDate.value;
						}

						// store data online
						borrowedEqip.push(equipNameInput.value, returnDate.value);
						var jsonData = JSON.stringify({ "FullName": user.displayName, "EqupBorrowed": JSON.stringify(borrowedEqip) });
						firebase.database().ref(user.uid).set(jsonData);
			
		  				// clear fileds
		  				equipNameInput.value = "";
		  				returnDate.value = "";
		  				equipIDInput.value = "";
						 
		  			}else{
		  				returnDate.style.border="1px solid red";
						setTimeout(function () { returnDate.style.border = "";},2000);
		  			}
		  		}else{
					
					erroOutPut = (equipNameInput.value == "") ?"1px solid red":"";
					equipNameInput.style.border = erroOutPut;
					erroOutPut = (equipIDInput.value == "") ? "1px solid red" : "";
					equipIDInput.style.border = erroOutPut;
					erroOutPut = (returnDate.value == "") ? "1px solid red" : "";
					returnDate.style.border = erroOutPut;

					setTimeout(function () {
						equipNameInput.style.border = "";
						equipIDInput.style.border = "";
						returnDate.style.border = "";
					}, 2000);
				}
		  	}


		  	//--------------// Return 
		  	var submit = document.getElementById('submit-id-submit');
		  	if(equipmentB == e.target && equipmentB.innerHTML == "Return"){
				  var parent = document.querySelector(".equipDisplay");

				//   Stops an error when you completly remove child elements
				let elmIndex = 0
				for (let index = 0; index < (parent.childNodes).length; index++) {
					if ((parent.childNodes)[index] == active) { if (index == 1) { elmIndex = 0; break }else{elmIndex = (index-2)*2; break}}
				}

				if (parent.childElementCount > 1) {
					parent.removeChild(active);
				} else {
					tbody.getElementsByTagName('tr')[0].className = "dipClass";
				}

				borrowedEqip.splice(elmIndex,1)
				borrowedEqip.splice(elmIndex, 1)
				jsonData = JSON.stringify({ "FullName": user.displayName, "EqupBorrowed": JSON.stringify(borrowedEqip) });
				firebase.database().ref(user.uid).set(jsonData);
		  	}

		  	if(e.target.tagName == "TD"){
		  		console.log("Return equipment sector")
		  		submit.innerHTML = "Return";
		  		submit.style.background="#dc3545";

		  		if (active != null) {
		  			active.style.background="";
		  			active.style.color="";
		  		}

		  		e.path[1].style.background="#212529";
		  		e.path[1].style.color="white";
		  		active = e.path[1];

		  	}else{
		  		submit.innerHTML = "Borrow";
		  		submit.style.background="#1a8a6f";

		  		if (active != null) {
		  			active.style.background="";
		  			active.style.color="";
		  		}
		  	}


		});
		}catch(err){console.log(err)};	
	});	