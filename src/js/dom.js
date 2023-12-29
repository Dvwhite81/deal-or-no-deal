import { acceptOffer, refuseOffer, setCase } from './game';

const overlay = document.querySelector('#overlay-black');
const board = document.querySelector('#board');
const cases = board.querySelectorAll('.case');
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
const offerModalAmount = document.querySelector('#offer-modal-amount');
const offerModalAccept = document.querySelector('#offer-modal-accept');
const offerModalRefuse = document.querySelector('#offer-modal-refuse');
const yourCaseDiv = document.querySelector('#info-your-case');
const currentOfferSpan = document.querySelector('#info-offer-value');
const casesToOpenSpan = document.querySelector('#info-cases-to-open-value');
const helpModal = document.querySelector('#help-modal');
const helpModalSubmit = document.querySelector('#help-modal-submit');
const openCaseModal = document.querySelector('#open-case-modal');
const caseNumberElement = document.querySelector('#guessed-case-number');
const amountElement = document.querySelector('#guessed-case-amount');
const prizeAmounts = document.querySelectorAll('.prize-amount');

const updateCurrentOffer = (offer) => {
  console.log('OFFER:', offer);
  currentOfferSpan.textContent = offer;
};

const updateCasesToOpen = (number) => {
  casesToOpenSpan.textContent = number;
};

const getNumberFromCase = (briefcase) => {
  const { id } = briefcase;
  return id.split('-')[1];
};

const showHelpInfo = () => {
  helpModal.classList.remove('hidden');
  infoOffer.classList.remove('hidden');
  helpModalSubmit.addEventListener('click', () => {
    helpModal.classList.add('hidden');
    board.classList.remove('hidden');
  });
};

const fadeInBackground = () => {
  overlay.classList.add('hidden');
  board.classList.remove('hidden');
  top.classList.remove('hidden');
  cases.forEach((c) => c.addEventListener('click', setCase));
};

const handleBackgrounds = () => {
  topModal.classList.add('hidden');
  gameInfo.classList.remove('hidden');
  leftSide.classList.remove('hidden');
  rightSide.classList.remove('hidden');
  top.classList.remove('muted', 'hidden');
  top.classList.add('black');
  bottom.classList.add('muted');
};

const showGuessedCaseModal = (briefcase, prize) => {
  briefcase.style.visibility = 'hidden';
  board.classList.add('hidden');
  openCaseModal.classList.remove('hidden');
  updateGuessModal(briefcase, prize);
  amountElement.classList.remove('hidden');
  setTimeout(hideGuessedCaseModal, 3000);
};

const hideGuessedCaseModal = () => {
  board.classList.remove('hidden');
  openCaseModal.classList.add('hidden');
};

const updateGuessModal = (briefcase, prize) => {
  const caseNumber = getNumberFromCase(briefcase);
  caseNumberElement.textContent = caseNumber;
  amountElement.textContent = `$${prize}`;
};

const applyGuessToPrize = (prize) => {
  const prizeElement = getPrizeElement(prize);
  setTimeout(() => {
    prizeElement.classList.add('muted');
  }, 3000);
};

const getPrizeElement = (prize) => {
  let prizeElement;
  prizeAmounts.forEach((el) => {
    if (el.textContent === prize) {
      prizeElement = el;
    }
  });
  const { parentElement } = prizeElement;
  return parentElement;
};

const showOffer = (offer) => {
  gameInfo.classList.add('hidden');
  board.classList.add('hidden');
  offerModalAmount.textContent = offer;
  offerModal.classList.remove('hidden');
  offerModalAccept.addEventListener('click', acceptOffer);
  offerModalRefuse.addEventListener('click', refuseOffer);
};

const hideOffer = () => {
  gameInfo.classList.remove('hidden');
  board.classList.remove('hidden');
  offerModal.classList.add('hidden');
};

export {
  applyGuessToPrize,
  board,
  bottom,
  cases,
  casesToOpenSpan,
  confirmModal,
  confirmModalClose,
  confirmModalSubmit,
  confirmTextSpan,
  currentOfferSpan,
  fadeInBackground,
  gameInfo,
  handleBackgrounds,
  hideOffer,
  infoCase,
  infoCasesToOpen,
  infoOffer,
  leftSide,
  offerModal,
  openCaseModal,
  overlay,
  rightSide,
  showGuessedCaseModal,
  showOffer,
  top,
  topModal,
  updateCasesToOpen,
  updateCurrentOffer,
  showHelpInfo,
  yourCaseDiv,
};
