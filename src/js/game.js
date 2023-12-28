import {
  board,
  bottom,
  cases,
  confirmModal,
  confirmModalClose,
  confirmModalSubmit,
  confirmTextSpan,
  gameInfo,
  leftSide,
  overlay,
  rightSide,
  showHelpInfo,
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
let gameCase;

const setup = () => {
  assignedCases = fillCases();
  offer = 0;
  casesToOpen = 6;
  setTimeout(fadeIn, 4000);
};

const fadeIn = () => {
  overlay.classList.add('hidden');
  board.classList.remove('hidden');
  top.classList.remove('hidden');
  cases.forEach((c) => c.addEventListener('click', setCase));
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
  console.log('finishSetup selectedCase:', selectedCase);
  selectedCase.classList.add('selected-case');
  handleBackgrounds();
  const caseCopy = selectedCase.cloneNode(true);
  caseCopy.id = 'case-copy';
  copySelectedCase(caseCopy);
  startGame(selectedCase);
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

const copySelectedCase = (caseCopy) => {
  if (yourCaseDiv.children.length > 1) {
    return;
  }
  yourCaseDiv.append(caseCopy);
  caseCopy.classList.remove('selected-case');
};

const guessCase = (e) => {
  console.log('guessCase e:', e);
  console.log('guessCase gameCase:', gameCase);
  console.log('guessCase assignedCases:', assignedCases);
};

const playRound = () => {
  cases.forEach((c) => c.addEventListener('click', guessCase));
};

const startGame = () => {
  console.log('startGame assignedCases:', assignedCases);
  gameCase = selectedCase;
  console.log('startGame gameCase:', gameCase);
  cases.forEach((c) => c.removeEventListener('click', setCase));

  updateCasesToOpen(casesToOpen);
  updateCurrentOffer(offer);
  showHelpInfo();
  setTimeout(() => {
    playRound();
  }, 3000);
};

export default setup;
