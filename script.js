let checkIn = document.getElementById("Start");
let checkOut = document.getElementById("End");
let checked = false;
let fee = false;
let errorMsg = document.getElementById("afterButton");
let noOfNights = document.getElementById("nights");
let nightFee = document.getElementById("nightFee");
let feeBoldNumber = document.querySelectorAll(".fee");
let nightPrice = document.getElementById("nightPrice");
let servicePrice = document.getElementById("servicePrice");
let totalPrice = document.getElementById("totalPrice");
let nights;
let nPrice;
let sPrice;
let tPrice;

setDate();
function setDate() {
  const date = new Date();
  let currentDate;
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  1 <= month <= 9
    ? (currentDate = `${year}-0${month}-${day}`)
    : (currentDate = `${year}-${month}-${day}`);
  checkIn.setAttribute("min", `${currentDate}`);
  checkOut.setAttribute("min", `${currentDate}`);
  console.log(currentDate);
  console.log(typeof currentDate);
}

nightFee.addEventListener("change", (event) => {
  console.log(feeBoldNumber);
  fee = true;
  feeBoldNumber.forEach((element) => {
    element.textContent = `${nightFee.value}`;
  });
  calc(nights);
});

checkIn.addEventListener("change", (event) => {
  console.log(event.target.value);
  checked = true;
  errorMsg.textContent = "";
  checkOut.setAttribute("min", `${event.target.value}`);
  calc(nights);
  if (nights < 0) errorMsg.textContent = "Choose the check out date again";
});

checkOut.addEventListener("change", (event) => {
  console.log(event.target.value);
  calc(nights);
});

const calc = function (number) {
  if (checked && fee) {
    nights =
      (checkOut.valueAsNumber - checkIn.valueAsNumber) / (1000 * 3600 * 24);
    console.log(nights);
    if (nights > 0) {
      noOfNights.textContent = ` ${nights} `;
      nPrice = nightFee.value * nights;
      sPrice = nPrice * 0.1;
      tPrice = nPrice + sPrice;

      nightPrice.textContent = `$ ${nPrice}`;
      servicePrice.textContent = `$ ${sPrice}`;
      totalPrice.textContent = `$ ${tPrice}`;
    } else if (nights == 0) {
      nights = 1;
      noOfNights.textContent = ` ${nights} `;
      nPrice = nightFee.value * nights;
      sPrice = nPrice * 0.1;
      tPrice = nPrice + sPrice;

      nightPrice.textContent = `$ ${nPrice}`;
      servicePrice.textContent = `$ ${sPrice}`;
      totalPrice.textContent = `$ ${tPrice}`;
    }
  } else if (fee) {
    errorMsg.textContent = "You need to check in first";
  } else if (checked) {
    alert(`You have to set the night fee first`);
  }
};
