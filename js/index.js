const images = document.querySelectorAll('.imagen-img');
const descs = document.querySelectorAll('.desc');

if ((screen.width > 768)) {
    images.forEach((image) => {
        image.addEventListener('mouseover', () => {
            descs.forEach((desc) => {
                desc.style.display = 'none';
            });
            const imageAlt = image.getAttribute('alt');
            console.log("Mouseover on image with alt:", imageAlt);
            if(imageAlt == "Piernas"){
                document.querySelector('.legDesc').style.display = 'block';
            }
            if(imageAlt == "Espalda"){
                document.querySelector('.backDesc').style.display = 'block';
            }
            if(imageAlt == "Pecho"){
                document.querySelector('.chestDesc').style.display = 'block';
            }
            if(imageAlt == "Abdominales"){
                document.querySelector('.flatDesc').style.display = 'block';
            }
            });
    })};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
});

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
