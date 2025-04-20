const myObserver = new IntersectionObserver((entries) =>{
    entries.forEach( (entry) =>{
        if(entry.isIntersecting){
            entry.target.classList.add('show')
        } else {
            entry.target.classList.remove('show')
        }
    })
})

const elements = document.querySelectorAll ('.hidden')

elements.forEach( (element) => myObserver.observe(element))


let count = 0;
function x(){
    count++;
    document.querySelector('#Amigos').style.backgroundPosition=count+"px";
}
    setInterval(x, 30)




    const carousel = document.querySelector('.carousel');
    const cards = document.querySelectorAll('.card');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
  
    const totalCards = cards.length;
    const visibleCards = 1; // só 1 no mobile
    let currentIndex = 1; // começa no primeiro real (índice 1)
    let isDragging = false;
    let startX = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;
    let animationID;
  
    const cardWidth = window.innerWidth;
  
    function setPositionByIndex(snap = true) {
      const offset = -currentIndex * cardWidth;
      carousel.style.transition = snap ? "transform 0.3s ease" : "none";
      carousel.style.transform = `translateX(${offset}px)`;
      prevTranslate = offset;
    }
  
    function handleInfiniteLoop() {
      const realCardCount = totalCards - 2;
      if (currentIndex === 0) {
        // Se estiver no clone do último, pular pro último real
        currentIndex = realCardCount;
        setTimeout(() => setPositionByIndex(false), 300);
      } else if (currentIndex === totalCards - 1) {
        // Se estiver no clone do primeiro, pular pro primeiro real
        currentIndex = 1;
        setTimeout(() => setPositionByIndex(false), 300);
      }
    }
  
    function touchStart(e) {
      startX = e.touches[0].clientX;
      isDragging = true;
      carousel.style.transition = "none";
      animationID = requestAnimationFrame(animation);
    }
  
    function touchMove(e) {
      if (!isDragging) return;
      const currentX = e.touches[0].clientX;
      const deltaX = currentX - startX;
      currentTranslate = prevTranslate + deltaX;
    }
  
    function touchEnd() {
      cancelAnimationFrame(animationID);
      isDragging = false;
  
      const movedBy = currentTranslate - prevTranslate;
  
      if (movedBy < -50) currentIndex++;
      else if (movedBy > 50) currentIndex--;
  
      setPositionByIndex();
      setTimeout(handleInfiniteLoop, 310);
    }
  
    function animation() {
      if (isDragging) {
        carousel.style.transform = `translateX(${currentTranslate}px)`;
        requestAnimationFrame(animation);
      }
    }
  
    // Botões
    prevBtn.addEventListener('click', () => {
      currentIndex--;
      setPositionByIndex();
      setTimeout(handleInfiniteLoop, 310);
    });
  
    nextBtn.addEventListener('click', () => {
      currentIndex++;
      setPositionByIndex();
      setTimeout(handleInfiniteLoop, 310);
    });
  
    // Swipe
    carousel.addEventListener('touchstart', touchStart);
    carousel.addEventListener('touchmove', touchMove);
    carousel.addEventListener('touchend', touchEnd);
  
    // Iniciar no primeiro real
    window.addEventListener('load', () => {
      setPositionByIndex(false);
    });
  