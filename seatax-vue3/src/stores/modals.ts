// stores/counter.js
import { defineStore } from 'pinia';

export const useModalsStore = defineStore('modals', {
  state: () => {
    return { 
      burgerMenu: false,
      largeModal: false,
      fullScreenModal: false,
    };
  },
  // could also be defined as
  // state: () => ({ count: 0 })
  actions: {
    openBurger() {
      this.burgerMenu = true;
    },
    closeBurger() {
      this.burgerMenu = false;
    },
    closeLargeModal(){
      this.largeModal = false;
    },
    closeFullscreenModal(){
      this.fullScreenModal = false;
    },
    openLargeModal(){
      this.largeModal = true;
    },
    openFullscreenModal(){
      this.fullScreenModal = true;
    },
  },
});