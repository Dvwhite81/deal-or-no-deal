const cases = document.querySelectorAll('.case');
const overlay = document.querySelector('#overlay-black');
const board = document.querySelector('#board');
const confirmModal = document.querySelector('#confirm-modal');
const confirmTextSpan = document.querySelector('#confirm-modal-span');
const confirmModalClose = document.querySelector('#confirm-modal-close');
const confirmModalSubmit = document.querySelector('#confirm-modal-submit');
const topModal = document.querySelector('#top-modal');
const gameInfo = document.querySelector('#game-info');
const infoCase = document.querySelector('#info-case');
const infoOffer = document.querySelector('#info-offer');
const infoCasesToOpen = document.querySelector('#info-cases-to-open');
const leftSide = document.querySelector('#left');
const rightSide = document.querySelector('#right');
const top = document.querySelector('#top');
const bottom = document.querySelector('#bottom');
const offerModal = document.querySelector('#offer-modal');

export {
  board,
  bottom,
  cases,
  confirmModal,
  confirmModalClose,
  confirmModalSubmit,
  confirmTextSpan,
  gameInfo,
  infoCase,
  infoCasesToOpen,
  infoOffer,
  leftSide,
  offerModal,
  overlay,
  rightSide,
  top,
  topModal,
};
