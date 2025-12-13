// QUICK AMOUNT BUTTON FILLER
function fillAmount(val) {
    document.getElementById("customAmount").value = val;
}

// UPI PAYMENT REDIRECT
document.getElementById("donateNow").onclick = () => {
    let name = document.getElementById("donorName").value || "Supporter";
    let amt = Number(document.getElementById("customAmount").value);

    if (!amt || amt < 15) {
        alert("Please enter minimum ₹15");
        return;
    }

    let upiURL = `upi://pay?pa=amankr2929@oksbi&pn=${encodeURIComponent(name)}&am=${amt}&cu=INR`;
    window.location.href = upiURL;

    setTimeout(() => {
        alert("If your UPI app did not open, please scan the QR code shown.");
    }, 2500);
};

// FIREBASE LIVE FEEDING PROGRESS
const firebaseConfig = {
    apiKey: "AIzaSyDRSDd57F2WjW0gTt6u7UlF8dbiBvjT-S4",
    authDomain: "stray-feeding.firebaseapp.com",
    databaseURL: "https://stray-feeding-default-rtdb.firebaseio.com",
    projectId: "stray-feeding",
    storageBucket: "stray-feeding.firebasestorage.app",
    messagingSenderId: "797097427576",
    appId: "1:797097427576:web:bb6f38ed916c0f4f84638d"
};

// Firebase
firebase.initializeApp(firebaseConfig);
var db = firebase.database();

db.ref("feedData").on("value", snapshot => {
    let data = snapshot.val();

    let dogs = data.dogs;
    let cats = data.cats;
    let dogTarget = data.dogTarget;
    let catTarget = data.catTarget;

    document.getElementById("dogsCount").innerHTML = dogs;
    document.getElementById("catsCount").innerHTML = cats;

    let dogPercent = Math.round((dogs / dogTarget) * 100);
    let catPercent = Math.round((cats / catTarget) * 100);

    document.getElementById("dogsPercent").innerHTML = dogPercent + "%";
    document.getElementById("catsPercent").innerHTML = catPercent + "%";

    document.getElementById("dogsBar").style.width = dogPercent + "%";
    document.getElementById("catsBar").style.width = catPercent + "%";
});
