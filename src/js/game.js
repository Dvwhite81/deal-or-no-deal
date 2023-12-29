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
  handleBackgrounds,
  showGuessedCaseModal,
  showHelpInfo,
  showOffer,
  top,
  topModal,
  updateCasesToOpen,
  updateCurrentOffer,
  yourCaseDiv,
} from './dom';
import { fillCases } from './prize-helpers';

let assignedCases;
let offer;
let casesToOpen;
let selectedCase;
let round;
let removedPrizes;

const setup = () => {
  assignedCases = fillCases();
  offer = 0;
  casesToOpen = 6;
  round = 1;
  removedPrizes = [];
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
  selectedCase.style.visibility = 'hidden';
  startGame(selectedCase);
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
  removedPrizes.push(prize);

  if (casesToOpen === 0) {
    endRound();
  }
};

const playRound = () => {
  cases.forEach((c) => c.addEventListener('click', guessCase));
};

const endRound = () => {
  console.log('endRound');
  round++;
  if (round === 10) {
    endGame();
  }
  cases.forEach((c) => c.removeEventListener('click', guessCase));
  showOffer();
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

const endGame = () => {
  console.log('END GAME');
};

export { setCase, setup };
