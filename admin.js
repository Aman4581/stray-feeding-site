var firebaseConfig = {
  apiKey: "AIzaSyDRSDd57f2WjWOgTt6u7Ulf8dbiBvjT-S4",
  authDomain: "stray-feeding.firebaseapp.com",
  databaseURL: "https://stray-feeding-default-rtdb.firebaseio.com",
  projectId: "stray-feeding",
  storageBucket: "stray-feeding.firebasestorage.app",
  messagingSenderId: "797097427576",
  appId: "1:797097427576:web:bb6f38ed916c0f4f84638d"
};

firebase.initializeApp(firebaseConfig);
var db = firebase.database();

function loginAdmin(){
    let pin = document.getElementById("adminPin").value;
    if(pin == "4554"){
        document.getElementById("loginBox").style.display="none";
        document.getElementById("adminPanel").style.display="block";
        fetchData();
    } else {
        alert("Incorrect PIN");
    }
}

function fetchData(){
    db.ref("feedData").once("value").then(snap=>{
        let d = snap.val();
        dogsInput.value = d.dogs;
        catsInput.value = d.cats;
        dogTargetInput.value = d.dogTarget;
        catTargetInput.value = d.catTarget;

        new Chart(document.getElementById("adminChart"), {
            type:"bar",
            data:{
                labels:["Dogs","Cats"],
                datasets:[{
                    data:[d.dogs,d.cats],
                    backgroundColor:["#ff7043","#29b6f6"]
                }]
            }
        });
    });
}

function updateData(){
    db.ref("feedData").update({
        dogs: Number(dogsInput.value),
        cats: Number(catsInput.value),
        dogTarget: Number(dogTargetInput.value),
        catTarget: Number(catTargetInput.value)
    }).then(()=>{
        alert("Updated Successfully!");
    });
}
