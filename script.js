// Version 1.0.0.0

function setAmount(val) {
  document.getElementById("customAmount").value = val;
}

function proceedToDonate1() {
  const amount = document.getElementById("customAmount").value;
  const name = document.getElementById("donorName").value || "Aman Kumar";

  if (!amount || amount < 15) {
    alert("Minimum donation is ₹15");
    return;
  }

  // PERSONAL UPI (no merchant params)
  const upiUrl =
    `upi://pay?pa=amankr2929@oksbi&pn=${encodeURIComponent(name)}&am=${amount}&cu=INR`;

  window.location.href = upiUrl;
}
// Version 1.0.0.1 - UPI SAFE FLOW

function proceedToDonate() {
  const amount = document.getElementById("customAmount").value;
  const name = document.getElementById("donorName").value || "Aman Kumar";

  if (!amount || amount < 15) {
    alert("Minimum donation is ₹15");
    return;
  }

  const upiId = "amankr2929@oksbi";

  // Show clear instruction instead of forcing redirect
  alert(
    "Please scan the QR code using GPay / PhonePe / Paytm OR pay directly to UPI ID:\n\n" +
    upiId +
    "\n\nAmount: ₹" + amount
  );

  // OPTIONAL: try UPI link (best effort)
  const upiUrl =
    `upi://pay?pa=${upiId}&pn=${encodeURIComponent(name)}&am=${amount}&cu=INR`;

  // Delay so alert is read
  setTimeout(() => {
    window.location.href = upiUrl;
  }, 800);
}

// v1.0.1.0 Simple confirmation only (no storage)

// v1.0.1.0 – Thank-you message with donor name (no storage)

function submitDonationDetails() {
  const name = document.getElementById("confName").value;
  const amount = document.getElementById("confAmount").value;
  const utr = document.getElementById("confUTR").value;

  if (!name || !amount || !utr) {
    alert("Please fill all details");
    return;
  }

  document.getElementById("confirmMsg").innerHTML =
    `✅ <b>Thank you ${name} for your donation.</b><br>
     Your donation will be verified by our team. Thank you.<br> 
Once verified, your name will appear in our <b>Recent Supporters ❤️</b>`;

  // Clear inputs after submit
  document.getElementById("confName").value = "";
  document.getElementById("confAmount").value = "";
  document.getElementById("confUTR").value = "";
}





/* Firebase */
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

db.ref("feedData").on("value", snap => {
  const d = snap.val();

  document.getElementById("dogsCount").innerText = d.dogs;
  document.getElementById("catsCount").innerText = d.cats;

  const dogPct = Math.min(100, (d.dogs / d.dogTarget) * 100);
  const catPct = Math.min(100, (d.cats / d.catTarget) * 100);

  document.getElementById("dogsBar").style.width = dogPct + "%";
  document.getElementById("catsBar").style.width = catPct + "%";

  // Chart
  new Chart(document.getElementById("feedingChart"), {
    type: "bar",
    data: {
      labels: ["Dogs", "Cats"],
      datasets: [{
        label: "Weekly Progress",
        data: [d.dogs, d.cats],
        backgroundColor: ["orange", "dodgerblue"]
      }]
    },
    options: { responsive: true }
  });
});
