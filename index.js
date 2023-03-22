const genderVal = document.querySelectorAll('input[type="radio"]');
const ageVal = document.getElementById("usia");
const heightVal = document.getElementById("tinggi_badan");
const weightVal = document.getElementById("berat_badan");
const statusWeight = document.getElementById("status_berat");
// message validation
const genderMsg = document.getElementById("error_jenis_kelamin");
const ageMsg = document.getElementById("error_usia");
const heightMsg = document.getElementById("error_tinggi_badan");
const weightMsg = document.getElementById("error_berat_badan");

// button
const calculateBtn = document.getElementById("hitung");
const resetBtn = document.getElementById("reset");

// reset button
resetBtn.addEventListener("click", function () {
  genderVal.forEach((item) => {
    item.checked = false;
  });
  ageVal.value = "";
  heightVal.value = "";
  weightVal.value = "";

  document.getElementById("hasil_angka").innerHTML = "...";
  statusWeight.innerHTML = "...";
});

// validate gender
genderVal.forEach((item) => {
  item.addEventListener("click", function () {
    validateGender();
  });
});

function validateGender() {
  let gender = "";

  genderVal.forEach((item) => {
    if (item.checked == true) {
      gender = item.value;
      //   genderMsg
      genderMsg.innerHTML = "";
    } else if (gender == "") {
      genderMsg.innerHTML = "Jenis kelamin tidak boleh kosong";
    }
  });
}

// validate age
ageVal.addEventListener("keyup", function () {
  validateAge();
});

function validateAge() {
  const age = ageVal.value;
  if (age < 0) {
    ageMsg.innerHTML = "Usia tidak boleh kurang dari 0";
  } else if (age > 120) {
    ageMsg.innerHTML = "Usia tidak boleh lebih dari 120";
  } else if (age == "") {
    ageMsg.innerHTML = "Usia tidak boleh kosong";
  } else {
    ageMsg.innerHTML = "";
  }
}

// validate height
heightVal.addEventListener("keyup", function () {
  validateHeight();
});

function validateHeight() {
  const height = heightVal.value;

  if (height < 0) {
    heightMsg.innerHTML = "Tinggi badan tidak boleh kurang dari 0";
  } else if (height > 250) {
    heightMsg.innerHTML = "Tinggi badan tidak boleh lebih dari 250";
  } else if (height == "") {
    heightMsg.innerHTML = "Tinggi badan tidak boleh kosong";
  } else {
    heightMsg.innerHTML = "";
  }
}

// validate weight
weightVal.addEventListener("keyup", function () {
  validateWeight();
});

function validateWeight() {
  const weight = weightVal.value;
  if (weight < 0) {
    weightMsg.innerHTML = "Berat badan tidak boleh kurang dari 0";
  } else if (weight > 250) {
    weightMsg.innerHTML = "Berat badan tidak boleh lebih dari 250";
  } else if (weight == "") {
    weightMsg.innerHTML = "Berat badan tidak boleh kosong";
  } else {
    weightMsg.innerHTML = "";
  }
}

// validate form
function validateForm() {
  validateGender();
  validateAge();
  validateHeight();
  validateWeight();

  if (genderMsg.innerHTML == "" && ageMsg.innerHTML == "" && heightMsg.innerHTML == "" && weightMsg.innerHTML == "") {
    return true;
  }

  return false;
}

// calculate button
calculateBtn.addEventListener("click", function () {
  if (validateForm()) {
    const weight = weightVal.value;
    const height = heightVal.value;
    const age = ageVal.value;
    calculateBtn.disabled = false;
    genderVal.forEach((item) => {
      if (item.checked) {
        gender = item.value;
      }
    });

    //   Total calculation
    let total = weight / (height * height);

    // Total to 2 decimal places and cm to m
    total = total * 10000;
    total = Math.round(total);

    if (total < 18.5) {
      statusWeight.innerHTML = "kekurangan berat badan";
    } else if (total >= 18.5 && total <= 24.9) {
      statusWeight.innerHTML = "normal (ideal)";
    } else if (total >= 25.0 && total <= 29.9) {
      statusWeight.innerHTML = "kelebihan berat badan";
    } else if (total >= 30.0) {
      statusWeight.innerHTML = "kegemukan (Obesitas)";
    }

    document.getElementById("hasil_angka").innerHTML = total;
  } else {
    calculateBtn.disabled = true;
  }
});
