window.onload = function () {

    if (window.location.pathname.includes("index.html")) {
        let popup = document.getElementById("popup");
        if (popup) popup.style.display = "flex";
    }

    initCanvas();
    animateBanner();

    let savedUsers = localStorage.getItem("users");
    if (savedUsers) {
        registrations = JSON.parse(savedUsers);
        updateTotalUsers();
        displayUsers();
    }

    setupValidation();
};

function closePopup() {
    let popup = document.getElementById("popup");
    if (popup) popup.style.display = "none";
}

function submitForm() {
    alert("Thank you! We will contact you soon.");
}

let registrations = [];

function registerUser() {

    let name = document.getElementById("name")?.value.trim();
    let email = document.getElementById("email")?.value.trim();
    let phone = document.getElementById("phone")?.value.trim();
    let event = document.getElementById("eventType")?.value || "";
    let packageType = document.getElementById("packageType")?.value || "";

    if (!name || !phone) {
        alert("Please fill all required fields!");
        return;
    }

    if (email) {
        let emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
        if (!email.match(emailPattern)) {
            alert("Enter a valid email!");
            return;
        }
    }

    if (phone.length < 10) {
        alert("Enter a valid phone number!");
        return;
    }

    let user = { name, email, phone, event, package: packageType };

    registrations.push(user);

    localStorage.setItem("users", JSON.stringify(registrations));

    alert(`Thank you ${name}! Registration successful.`);

    updateTotalUsers();
    displayUsers();
    clearForm();
}

function clearForm() {
    ["name", "email", "phone"].forEach(id => {
        let el = document.getElementById(id);
        if (el) el.value = "";
    });
}

function updateTotalUsers() {
    let totalElement = document.getElementById("totalUsers");
    if (totalElement) {
        totalElement.innerText = "Total Registrations: " + registrations.length;
    }
}

function displayUsers() {
    let list = document.getElementById("userList");
    if (!list) return;

    list.innerHTML = "";

    registrations.forEach((user, index) => {
        let li = document.createElement("li");

        li.innerHTML = `
            ${user.name} - ${user.event} (${user.package})
            <button onclick="deleteUser(${index})" style="margin-left:10px;">Delete</button>
        `;

        list.appendChild(li);
    });
}

function deleteUser(index) {

    if (confirm("Are you sure you want to delete this user?")) {
        registrations.splice(index, 1);

        localStorage.setItem("users", JSON.stringify(registrations));

        updateTotalUsers();
        displayUsers();
    }
}

let canvas, ctx;
let bannerX = 650;

function initCanvas() {
    canvas = document.getElementById("myCanvas");
    if (!canvas) return;

    ctx = canvas.getContext("2d");
}


function animateBanner() {

    if (!ctx) return;
   
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, "#1e3a8a");
    gradient.addColorStop(1, "#7c3aed");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.shadowColor = "white";
    ctx.shadowBlur = 20;

    ctx.fillStyle = "white";
    ctx.font = "bold 32px Arial";
    ctx.fillText("Elite Events", bannerX, canvas.height / 2 - 10);

    ctx.font = "18px Arial";
    ctx.fillText("Where Moments Become Memories", bannerX, canvas.height / 2 + 25);

    ctx.shadowBlur = 0;

    bannerX -= 2;

    if (bannerX < -400) {
        bannerX = canvas.width;
    }

    requestAnimationFrame(animateBanner);
}

function setupValidation() {

    let nameInput = document.getElementById("name");
    let phoneInput = document.getElementById("phone");

    if (nameInput) {
        nameInput.addEventListener("input", function () {
            this.style.border = this.value.trim() === ""
                ? "2px solid red"
                : "2px solid green";
        });
    }

    if (phoneInput) {
        phoneInput.addEventListener("input", function () {
            this.style.border = this.value.length < 10
                ? "2px solid red"
                : "2px solid green";
        });
    }
}
