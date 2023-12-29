import {
  applyGuessToPrize,
  board,
  bottom,
  cases,
  confirmModal,
  confirmModalClose,
  confirmModalSubmit,
  confirmTextSpan,
  fadeInBackground,
  getInitialDomState,
  getLastCase,
  getNumberFromCase,
  handleBackgrounds,
  hideOffer,
  showEndGameModal,
  showFinalChoiceModal,
  showGuessedCaseModal,
  showHelpInfo,
  showOffer,
  top,
  topModal,
  updateCasesToOpen,
  updateCurrentOffer,
  yourCaseDiv,
} from './dom';
import {
  fillCases,
  getFormattedOffer,
  getInitialCaseValue,
  getOffer,
  getPrizeValue,
  madeAGoodDeal,
} from './prize-helpers';

let assignedCases;
let offer;
let casesToOpen;
let selectedCase;
let round;
let removedPrizes;
let allPrizes;
let caseValue;
let isAccepted;
let offerPercentage;

const setup = () => {
  getInitialDomState();
  allPrizes = [
    '0.01',
    '1',
    '5',
    '10',
    '25',
    '50',
    '75',
    '100',
    '200',
    '300',
    '400',
    '500',
    '750',
    '1,000',
    '5,000',
    '10,000',
    '25,000',
    '50,000',
    '75,000',
    '100,000',
    '200,000',
    '300,000',
    '400,000',
    '500,000',
    '750,000',
    '1,000,000',
  ];
  assignedCases = fillCases();
  offer = `$0.00`;
  casesToOpen = 6;
  round = 1;
  removedPrizes = [];
  isAccepted = false;
  offerPercentage = 0.2;
  setTimeout(fadeInBackground, 4000);
};

const setCase = (e) => {
  const { target } = e;
  selectedCase = target.classList.contains('case-text')
    ? target.parentElement
    : target;
  top.classList.add('muted');
  bottom.classList.add('muted');
  topModal.classList.add('hidden');
  confirmCase();
};

const confirmCase = () => {
  const caseNumber = Number(selectedCase.querySelector('.case-text').innerHTML);
  confirmTextSpan.textContent = caseNumber;
  board.classList.add('hidden');
  showConfirmModal();
};

const showConfirmModal = () => {
  confirmModal.classList.remove('hidden');
  confirmModalClose.addEventListener('click', () => {
    confirmModal.classList.add('hidden');
    topModal.classList.remove('hidden');
    board.classList.remove('hidden');
    selectedCase = null;
  });
  confirmModalSubmit.addEventListener('click', () => {
    confirmModal.classList.add('hidden');
    finishSetup(selectedCase);
  });
};

const finishSetup = () => {
  handleBackgrounds();
  const caseCopy = selectedCase.cloneNode(true);
  caseCopy.id = 'case-copy';
  copySelectedCase(caseCopy);
  selectedCase.classList.add('hideVisibility');
  caseValue = getInitialCaseValue(selectedCase, assignedCases);
  startGame();
};

const copySelectedCase = (caseCopy) => {
  if (yourCaseDiv.children.length > 1) {
    return;
  }
  yourCaseDiv.append(caseCopy);
  caseCopy.classList.remove('selected-case');
};

const guessCase = (e) => {
  const { target } = e;
  const targetCase = target.classList.contains('case-text')
    ? target.parentElement
    : target;
  const guess = assignedCases.find((c) => c.briefcase === targetCase);
  openCase(guess);
};

const openCase = (guess) => {
  casesToOpen--;

  const { briefcase, prize } = guess;
  showGuessedCaseModal(briefcase, prize);
  updateCasesToOpen(casesToOpen);
  applyGuessToPrize(prize, assignedCases);
  const prizeValue = getPrizeValue(prize, allPrizes);
  removedPrizes.push(prizeValue);

  if (casesToOpen === 0) {
    endRound();
  }
};

const playRound = () => {
  cases.forEach((c) => c.addEventListener('click', guessCase));
};

const endRound = () => {
  round++;
  offerPercentage += 0.1;
  cases.forEach((c) => c.removeEventListener('click', guessCase));
  offer = getOffer(removedPrizes, offerPercentage);
  const formattedOffer = getFormattedOffer(offer);
  setTimeout(() => {
    showOffer(formattedOffer);
  }, 3000);
};

const setUpFinalChoice = () => {
  const yourAssigned = assignedCases.find((c) => c.briefcase === selectedCase);
  const yourPrize = yourAssigned.prize;
  const yourNumber = getNumberFromCase(selectedCase);
  const lastCase = getLastCase();
  const lastAssigned = assignedCases.find((c) => c.briefcase === lastCase);
  const lastPrize = lastAssigned.prize;
  const lastNumber = getNumberFromCase(lastCase);
  showFinalChoiceModal(yourPrize, yourNumber, lastPrize, lastNumber);
};

const acceptOffer = () => {
  hideOffer();
  isAccepted = true;
  endGame(offer);
};

const refuseOffer = () => {
  casesToOpen = getNewCasesToOpen(round);
  updateCasesToOpen(casesToOpen);
  updateCurrentOffer(getFormattedOffer(offer));
  hideOffer();
  if (round === 10) {
    setUpFinalChoice();
  } else {
    playRound();
  }
};

const getNewCasesToOpen = () => {
  switch (round) {
    case 1:
      return 6;
    case 2:
      return 5;
    case 3:
      return 4;
    case 4:
      return 3;
    case 5:
      return 2;
    default:
      return 1;
  }
};

const startGame = () => {
  cases.forEach((c) => c.removeEventListener('click', setCase));

  updateCasesToOpen(casesToOpen);
  updateCurrentOffer(offer);
  showHelpInfo();
  setTimeout(() => {
    playRound();
  }, 3000);
};

const endGame = (finalOffer) => {
  const yourCaseValue = getPrizeValue(caseValue, allPrizes);
  const goodOrBadDeal = madeAGoodDeal(isAccepted, yourCaseValue, finalOffer);
  showEndGameModal(isAccepted, finalOffer, yourCaseValue, goodOrBadDeal);
};

export { acceptOffer, refuseOffer, setCase, setup };
