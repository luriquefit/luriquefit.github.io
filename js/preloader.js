window.addEventListener('load', () => {
      const preloader = document.getElementById('preloader');
      preloader.classList.add('hide');
      setTimeout(() => {
        preloader.style.display = 'none';
      }, 5000);
    });