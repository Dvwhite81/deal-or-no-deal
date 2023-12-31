import { acceptOffer, refuseOffer, setCase, setup } from './game';
import { getFormattedOffer, madeAGoodDeal } from './prize-helpers';

// Main elements
const board = document.querySelector('#board');
const bottom = document.querySelector('#bottom');
const leftSide = document.querySelector('#left');
const rightSide = document.querySelector('#right');
const top = document.querySelector('#top');
const overlay = document.querySelector('#overlay-black');
const yourCaseDiv = document.querySelector('#info-your-case');

// Secondary elements
const amountElement = document.querySelector('#guessed-case-amount');
const cases = board.querySelectorAll('.case');
const caseNumberElement = document.querySelector('#guessed-case-number');
const casesToOpenSpan = document.querySelector('#info-cases-to-open-value');
const currentOfferSpan = document.querySelector('#info-offer-value');
const gameInfo = document.querySelector('#game-info');
const infoCase = document.querySelector('#info-case');
const infoOffer = document.querySelector('#info-offer');
const infoCasesToOpen = document.querySelector('#info-cases-to-open');
const prizeAmounts = document.querySelectorAll('.prize-amount');
const prizeSelects = document.querySelectorAll('.prize-select');

// Modal elements
const confirmModal = document.querySelector('#confirm-modal');
const confirmTextSpan = document.querySelector('#confirm-modal-span');
const confirmModalClose = document.querySelector('#confirm-modal-close');
const confirmModalSubmit = document.querySelector('#confirm-modal-submit');
const endGameModal = document.querySelector('#end-game-modal');
const endGameCaseValueSpan = document.querySelector('#your-case-value-span');
const endGameFinalOfferSpan = document.querySelector('#final-offer-span');
const endGameGoodOrBadSpan = document.querySelector('#good-or-bad-span');
const endGameModalSubmit = document.querySelector('#end-game-modal-submit');
const endGameIsAcceptedSpan = document.querySelector('#accept-or-refuse-span');
const finalChoiceModal = document.querySelector('#final-choice-modal');
const finalYourCase = document.querySelector('#final-your-case');
const finalLastCase = document.querySelector('#final-last-case');
const finalChoiceYourCaseNumber = document.querySelector(
  '#final-your-case-number',
);
const finalChoiceLastCaseNumber = document.querySelector(
  '#final-last-case-number',
);
const finalChoiceYourCaseAmount = document.querySelector(
  '#final-your-case-amount',
);
const finalChoiceLastCaseAmount = document.querySelector(
  '#final-last-case-amount',
);
const finalGoodOrBad = document.querySelector('#final-good-or-bad');
const finalGoodOrBadSpan = document.querySelector('#final-good-or-bad-span');
const finalModalSubmit = document.querySelector('#final-choice-modal-submit');
const helpModal = document.querySelector('#help-modal');
const helpModalSubmit = document.querySelector('#help-modal-submit');
const offerModal = document.querySelector('#offer-modal');
const offerModalAmount = document.querySelector('#offer-modal-amount');
const offerModalAccept = document.querySelector('#offer-modal-accept');
const offerModalRefuse = document.querySelector('#offer-modal-refuse');
const openCaseModal = document.querySelector('#open-case-modal');
const topModal = document.querySelector('#top-modal');

const updateCurrentOffer = (offer) => {
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
  briefcase.classList.add('hideVisibility');
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

const showFinalChoiceModal = (yourPrize, yourNumber, lastPrize, lastNumber) => {
  board.classList.add('hidden');
  finalChoiceYourCaseNumber.textContent = yourNumber;
  finalChoiceYourCaseAmount.textContent = `$${yourPrize}`;
  finalChoiceLastCaseNumber.textContent = lastNumber;
  finalChoiceLastCaseAmount.textContent = `$${lastPrize}`;
  finalChoiceModal.classList.remove('hidden');
  addFinalChoiceListeners(yourPrize, lastPrize);
};

const addFinalChoiceListeners = (yourPrize, lastPrize) => {
  finalYourCase.addEventListener('click', () =>
    makeFinalChoice(true, yourPrize, lastPrize),
  );
  finalLastCase.addEventListener('click', () =>
    makeFinalChoice(false, yourPrize, lastPrize),
  );
};

const makeFinalChoice = (isYourCase, yourPrize, lastPrize) => {
  const isAccepted = !isYourCase;
  const firstCase = isYourCase
    ? finalChoiceYourCaseAmount
    : finalChoiceLastCaseAmount;
  const secondCase = isYourCase
    ? finalChoiceLastCaseAmount
    : finalChoiceYourCaseAmount;

  const noCommasYourPrize = yourPrize.replace(/,/g, '');
  const noCommasLastPrize = lastPrize.replace(/,/g, '');
  const goodOrBadDeal = madeAGoodDeal(
    isAccepted,
    noCommasYourPrize,
    noCommasLastPrize,
  );

  firstCase.classList.remove('hidden');
  setTimeout(() => {
    secondCase.classList.remove('hidden');
    finalGoodOrBad.classList.remove('hidden');
    finalGoodOrBadSpan.textContent = goodOrBadDeal;
    finalModalSubmit.addEventListener('click', setup);
  }, 2000);
};

const getLastCase = () => {
  const boardCases = board.querySelectorAll('.case');
  let lastCase;
  boardCases.forEach((c) => {
    if (!c.classList.contains('hideVisibility')) {
      lastCase = c;
    }
  });

  return lastCase;
};

const showEndGameModal = (isAccepted, finalOffer, caseValue, goodOrBadDeal) => {
  board.classList.add('hidden');
  top.classList.add('muted');
  top.classList.remove('black');
  gameInfo.classList.add('hidden');
  leftSide.classList.add('hidden');
  rightSide.classList.add('hidden');
  endGameModal.classList.remove('hidden');
  const acceptedText = isAccepted ? 'accepted' : 'refused';
  endGameIsAcceptedSpan.textContent = acceptedText;
  endGameFinalOfferSpan.textContent = getFormattedOffer(finalOffer);
  endGameCaseValueSpan.textContent = getFormattedOffer(caseValue);
  endGameGoodOrBadSpan.textContent = goodOrBadDeal;
  endGameModalSubmit.addEventListener('click', setup);
};

const getInitialDomState = () => {
  overlay.className = '';
  top.className = 'hidden';
  topModal.className = '';
  bottom.className = '';
  leftSide.classList.add('hidden');
  rightSide.classList.add('hidden');
  const previousCase = yourCaseDiv.querySelector('.case');
  if (previousCase) {
    previousCase.remove();
  }
  cases.forEach((c) => c.classList.remove('hideVisibility'));
  prizeSelects.forEach((p) => p.classList.remove('muted'));
  endGameModal.classList.add('hidden');
  finalChoiceModal.classList.add('hidden');
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
  getInitialDomState,
  getLastCase,
  getNumberFromCase,
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
  showEndGameModal,
  showFinalChoiceModal,
  showGuessedCaseModal,
  showOffer,
  top,
  topModal,
  updateCasesToOpen,
  updateCurrentOffer,
  showHelpInfo,
  yourCaseDiv,
};
