// ================= PAGE LOAD =================
window.onload = function () {

    // Show popup on homepage
    if (window.location.pathname.includes("index.html")) {
        let popup = document.getElementById("popup");
        if (popup) popup.style.display = "flex";
    }

    initCanvas();
    animateBanner();

    // Load saved users (LocalStorage)
    let savedUsers = localStorage.getItem("users");
    if (savedUsers) {
        registrations = JSON.parse(savedUsers);
        updateTotalUsers();
        displayUsers();
    }

    setupValidation();
};

// ================= POPUP =================
function closePopup() {
    let popup = document.getElementById("popup");
    if (popup) popup.style.display = "none";
}

// ================= CONTACT FORM =================
function submitForm() {
    alert("Thank you! We will contact you soon.");
}

// ================= REGISTRATION =================
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

    // Save to LocalStorage
    localStorage.setItem("users", JSON.stringify(registrations));

    alert(`Thank you ${name}! Registration successful.`);

    updateTotalUsers();
    displayUsers();
    clearForm();
}

// ================= CLEAR FORM =================
function clearForm() {
    ["name", "email", "phone"].forEach(id => {
        let el = document.getElementById(id);
        if (el) el.value = "";
    });
}

// ================= UPDATE USERS =================
function updateTotalUsers() {
    let totalElement = document.getElementById("totalUsers");
    if (totalElement) {
        totalElement.innerText = "Total Registrations: " + registrations.length;
    }
}

// ================= DISPLAY USERS =================
function displayUsers() {
    let list = document.getElementById("userList");
    if (!list) return;

    list.innerHTML = "";

    registrations.forEach((user, index) => {

        let li = document.createElement("li");

        li.innerHTML = `
            ${user.name} - ${user.event} (${user.package})
            <button onclick="deleteUser(${index})">Delete</button>
        `;

        list.appendChild(li);
    });
}

// ================= DELETE USER =================
function deleteUser(index) {

    if (confirm("Are you sure you want to delete this registration?")) {

        registrations.splice(index, 1);

        // Update LocalStorage
        localStorage.setItem("users", JSON.stringify(registrations));

        updateTotalUsers();
        displayUsers();
    }
}

// ================= CANVAS =================
let ctx;
let bannerX = 600;

// Initialize canvas
function initCanvas() {
    const canvas = document.getElementById("myCanvas");
    if (!canvas) return;

    ctx = canvas.getContext("2d");
}

// ================= ANIMATED BANNER =================
function animateBanner() {

    if (!ctx) return;

    ctx.clearRect(0, 0, 500, 300);

    // Gradient background
    let gradient = ctx.createLinearGradient(0, 0, 500, 300);
    gradient.addColorStop(0, "#1e3a8a");
    gradient.addColorStop(1, "#7c3aed");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 500, 300);

    // Glow effect
    ctx.shadowColor = "white";
    ctx.shadowBlur = 15;

    // Main text
    ctx.fillStyle = "white";
    ctx.font = "bold 32px Arial";
    ctx.fillText("Elite Events", bannerX, 150);

    // Subtitle
    ctx.font = "18px Arial";
    ctx.fillText("Where Moments Become Memories", bannerX, 190);

    ctx.shadowBlur = 0;

    // Move text
    bannerX -= 3;

    if (bannerX < -400) {
        bannerX = 600;
    }

    requestAnimationFrame(animateBanner);
}

// ================= LIVE VALIDATION =================
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