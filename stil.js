const scrollPositions = {}; // her carousel için ayrı scroll takibi

function scrollCarousel(carouselId, direction) {
  const carousel = document.getElementById(carouselId);
  const itemWidth = carousel.querySelector('.carousel-item-custom').offsetWidth;
  const maxScroll = carousel.scrollWidth - carousel.offsetWidth;

  // Eğer daha önce pozisyon yoksa sıfırla
  if (!(carouselId in scrollPositions)) {
    scrollPositions[carouselId] = 0;
  }

  scrollPositions[carouselId] += direction * itemWidth;

  if (scrollPositions[carouselId] < 0) scrollPositions[carouselId] = 0;
  if (scrollPositions[carouselId] > maxScroll) scrollPositions[carouselId] = maxScroll;

  carousel.style.transform = `translateX(-${scrollPositions[carouselId]}px)`;
}


  const scrollTopBtn = document.getElementById("scrollTopBtn");

  // Sayfa scroll olunca buton göster/gizle
  window.onscroll = function () {
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
      scrollTopBtn.style.display = "block";
    } else {
      scrollTopBtn.style.display = "none";
    }
  };

  // Tıklanınca yukarı kaydır
  scrollTopBtn.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
