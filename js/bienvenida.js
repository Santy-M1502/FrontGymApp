// Mostrar modal al cargar y ocultarlo después de 3 segundos
  window.onload = function() {
    const modal = document.getElementById("modalBienvenida");

    setTimeout(() => {
      modal.style.animation = "fadeOut 0.5s forwards"; // Animación de salida
      setTimeout(() => {
        modal.style.display = "none"; // Lo ocultamos completamente
      }, 500);
    }, 1500);
  }