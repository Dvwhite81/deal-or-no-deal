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
const yourCaseDiv = document.querySelector('#info-your-case');
const currentOfferSpan = document.querySelector('#info-offer-value');
const casesToOpenSpan = document.querySelector('#info-cases-to-open-value');

const updateCurrentOffer = (offer) => {
  currentOfferSpan.textContent = offer;
};

const updateCasesToOpen = (number) => {
  casesToOpenSpan.textContent = number;
};

export {
  board,
  bottom,
  cases,
  casesToOpenSpan,
  confirmModal,
  confirmModalClose,
  confirmModalSubmit,
  confirmTextSpan,
  currentOfferSpan,
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
  updateCasesToOpen,
  updateCurrentOffer,
  yourCaseDiv,
};
