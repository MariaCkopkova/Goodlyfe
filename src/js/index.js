//document.addEventListener("DOMContentLoaded");
import scroll from "./modules/scroll";
scroll();
import mobileNav from "./modules/mobile-nav";
mobileNav();
import searchForm from "./modules/search";
searchForm();

// Swiper 
import Swiper from 'swiper';
import { Navigation, Pagination, EffectFade } from 'swiper/modules';
import '../../node_modules/swiper/swiper-bundle.min.css';

const swiper = new Swiper('.slider', {
  modules: [Navigation, Pagination, EffectFade],
  spaceBetween: 30,
  loop: true,
  speed: 1000,
  effect: 'fade',
  crossfade: true,
  lazy: true,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  autoplay: {
    delay: 2500,
    disableOnInteraction: false
  }
});

