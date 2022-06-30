let darkMode = localStorage.getItem("darkMode");
const darkModeToggle = document.querySelector("#dark-mode-toggle");

const EnabledDarkMode = () => {
    document.body.classList.add("darkmode");

    localStorage.setItem("darkMode", "enabled");
}

const DisabledDarkMode = () => {
    document.body.classList.remove("darkmode");

    localStorage.setItem("darkMode", null);
}
if (darkMode === "enabled") {
    EnabledDarkMode();
    document.getElementById("dark-mode-toggle").innerHTML = 'Swtich to Light mode';
}else{
    DisabledDarkMode();
    document.getElementById("dark-mode-toggle").innerHTML = 'Swtich to Dark mode';
}

darkModeToggle.addEventListener("click", () => {
    darkMode = localStorage.getItem("darkMode");
    if (darkMode !== "enabled") {
        document.getElementById("dark-mode-toggle").innerHTML = 'Swtich to Light mode';
        EnabledDarkMode();
        console.log(darkMode);
    }else{
        document.getElementById("dark-mode-toggle").innerHTML = 'Swtich to Dark mode';
        DisabledDarkMode();
        console.log(darkMode);
    }
});