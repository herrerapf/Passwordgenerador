document.addEventListener("DOMContentLoaded", function () {

  const passwordField = document.getElementById("password");
  const lengthSlider = document.getElementById("length");
  const lengthValue = document.getElementById("lengthValue");
  const copyBtn = document.getElementById("copyBtn");
  const generateBtn = document.getElementById("generateBtn");
  const strengthBar = document.getElementById("strengthBar");
  const strengthText = document.getElementById("strengthText");

  // Seguridad extra: verificar que los elementos existen
  if (!passwordField || !lengthSlider || !generateBtn) {
    console.error("Elementos no encontrados en el DOM");
    return;
  }

  // Actualizar valor del slider
  lengthValue.textContent = lengthSlider.value;

  lengthSlider.addEventListener("input", () => {
    lengthValue.textContent = lengthSlider.value;
  });

  generateBtn.addEventListener("click", generatePassword);
  copyBtn.addEventListener("click", copyPassword);

  function generatePassword() {
    const length = parseInt(lengthSlider.value);
    const upper = document.getElementById("uppercase").checked;
    const lower = document.getElementById("lowercase").checked;
    const numbers = document.getElementById("numbers").checked;
    const symbols = document.getElementById("symbols").checked;

    let chars = "";
    if (upper) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (lower) chars += "abcdefghijklmnopqrstuvwxyz";
    if (numbers) chars += "0123456789";
    if (symbols) chars += "!@#$%^&*()_+-=[]{}<>?";

    if (chars === "") {
      alert("Selecciona al menos una opción");
      return;
    }

    let password = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      password += chars[randomIndex];
    }

    passwordField.value = password;
    checkStrength(password);
  }

  function copyPassword() {
    if (!passwordField.value) return;

    navigator.clipboard.writeText(passwordField.value)
      .then(() => {
        copyBtn.textContent = "Copiado!";
        setTimeout(() => copyBtn.textContent = "Copiar", 1500);
      })
      .catch(() => {
        alert("No se pudo copiar");
      });
  }

  function checkStrength(password) {
    let strength = 0;

    if (password.length >= 12) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    const width = (strength / 4) * 100;
    strengthBar.style.width = width + "%";

    if (strength <= 2) {
      strengthBar.style.background = "#ef4444";
      strengthText.textContent = "Seguridad: Baja";
    } else if (strength === 3) {
      strengthBar.style.background = "#facc15";
      strengthText.textContent = "Seguridad: Media";
    } else {
      strengthBar.style.background = "#22c55e";
      strengthText.textContent = "Seguridad: Alta";
    }
  }

  // Generar contraseña al cargar
  generatePassword();

});
