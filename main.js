var BookNameInput = document.getElementById("BookName");
var WebsiteURLInput = document.getElementById("WebsiteURL");
var alert = document.getElementById("myAlert");

var siteList = [];

var siteNameRegex = /^.{3,}$/;
var siteUrlRegex = /^[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+$/;

window.onload = function reloaded() {
  if (localStorage.getItem("sitecontainer") !== null) {
    siteList = JSON.parse(localStorage.getItem("sitecontainer"));
    displayData();
  }
};

function closeAlert() {
  alert.style.display = "none";
}

function addSite() {
  if (
    siteNameRegex.test(BookNameInput.value) === false ||
    siteUrlRegex.test(WebsiteURLInput.value) === false
  ) {
    alert.style.display = "block";
  } else {
    var site = {
      Name: BookNameInput.value,
      URL: WebsiteURLInput.value,
    };

    siteList.push(site);
    localStorage.setItem("sitecontainer", JSON.stringify(siteList));
    displayData();
    clearForm();
  }
}

function clearForm() {
  BookNameInput.value = null;
  WebsiteURLInput.value = null;
}

function displayData() {
  var cartona = "";

  for (i = 0; i < siteList.length; i++) {
    var url =
      siteList[i].URL.startsWith("http://") ||
      siteList[i].URL.startsWith("https://")
        ? siteList[i].URL
        : `https://${siteList[i].URL}`;

    cartona += ` <div class="col-md-12 row-data">
        <div class="d-flex justify-content-between px-3 py-2">
            <span class="fw-bold index-row">${i + 1}</span>
            <span class="fw-bold name">${siteList[i].Name}</span>
            <button class="btn btn-success"><a class="visit-btn" href="${url}" target="_blank"><i class="fa-solid fa-eye"></i> Visit</a></button>
            <button onclick="deleteItem(${i})" class="btn btn-danger"><i class="fa-solid fa-trash-can"></i> Delete</button>
        </div>
    </div>`;
  }

  document.getElementById("rowData").innerHTML = cartona;
}

function deleteItem(index) {
  siteList.splice(index, 1);
  localStorage.setItem("sitecontainer", JSON.stringify(siteList));
  displayData();
}

function validationSiteName() {
  var siteNameElement = document.getElementById("BookName");
  if (siteNameRegex.test(BookNameInput.value) === false) {
    siteNameElement.classList.add("error-input");
    siteNameElement.classList.remove("success-input");
  } else if (siteNameRegex.test(BookNameInput.value) === true) {
    siteNameElement.classList.remove("error-input");
    siteNameElement.classList.add("success-input");
  }
}

function validationSiteUrl() {
  var siteUrlElement = document.getElementById("WebsiteURL");
  if (siteUrlRegex.test(WebsiteURLInput.value) === false) {
    siteUrlElement.classList.add("error-input");
    siteUrlElement.classList.remove("success-input");
  } else if (siteUrlRegex.test(WebsiteURLInput.value) === true) {
    siteUrlElement.classList.remove("error-input");
    siteUrlElement.classList.add("success-input");
  }
}
