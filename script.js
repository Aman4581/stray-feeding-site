// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDRSDd57f2WjWOgTt6u7Ulf8dbiBvjT-S4",
  authDomain: "stray-feeding.firebaseapp.com",
  databaseURL: "https://stray-feeding-default-rtdb.firebaseio.com",
  projectId: "stray-feeding",
  storageBucket: "stray-feeding.firebasestorage.app",
  messagingSenderId: "797097427576",
  appId: "1:797097427576:web:bb6f38ed916c0f4f84638d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

firebase.initializeApp(firebaseConfig);
var db = firebase.database();

// Live listener for feedData
db.ref("feedData").on("value", function(snapshot) {
  var data = snapshot.val() || {};
  var dogs = data.dogs || 0;
  var cats = data.cats || 0;
  var dogTarget = data.dogTarget || 50;
  var catTarget = data.catTarget || 30;

  document.getElementById("dogsCount").innerText = dogs;
  document.getElementById("catsCount").innerText = cats;

  var dogPercent = Math.round((dogs / dogTarget) * 100);
  var catPercent = Math.round((cats / catTarget) * 100);

  dogPercent = Math.min(100, dogPercent);
  catPercent = Math.min(100, catPercent);

  document.getElementById("dogPercent").innerText = dogPercent + "%";
  document.getElementById("catPercent").innerText = catPercent + "%";

  document.getElementById("dogBar").style.width = dogPercent + "%";
  document.getElementById("catBar").style.width = catPercent + "%";
});

// UPI donation handler (opens UPI intent for mobile UPI apps)
function startUPI(amount) {
  // This opens the UPI intent on mobile. On desktop it will do nothing or show an error.
  var upi = encodeURIComponent('upi://pay?pa=amankr2929@oksbi&pn=Aman%20Kumar&am=' + amount + '&cu=INR');
  window.location.href = decodeURIComponent(upi);
}

function customDonate() {
  var amt = parseFloat(document.getElementById("customAmount").value);
  if (!amt || amt < 15) { alert("Minimum amount is ₹15"); return; }
  startUPI(amt);
}
