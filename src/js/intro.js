import startGame from './game';
import {
  board,
  bottom,
  confirmModal,
  confirmModalClose,
  confirmModalSubmit,
  confirmTextSpan,
  cases,
  gameInfo,
  leftSide,
  overlay,
  rightSide,
  top,
  topModal,
  yourCaseDiv,
} from './dom';

let selectedCase;

const handleBackgrounds = () => {
  topModal.classList.add('hidden');
  gameInfo.classList.remove('hidden');
  leftSide.classList.remove('hidden');
  rightSide.classList.remove('hidden');
  top.classList.remove('muted');
  top.classList.add('black');
  bottom.classList.add('muted');
};

const copySelectedCase = (caseCopy) => {
  yourCaseDiv.append(caseCopy);
  caseCopy.classList.remove('selected-case');
};

const finishSetup = () => {
  selectedCase.classList.add('selected-case');
  handleBackgrounds();
  const caseCopy = selectedCase.cloneNode(true);
  caseCopy.id = 'case-copy';
  copySelectedCase(caseCopy);
  startGame(selectedCase);
};

const showConfirmModal = () => {
  confirmModal.classList.remove('hidden');
  confirmModalClose.addEventListener('click', () => {
    confirmModal.classList.add('hidden');
    board.classList.remove('hidden');
    selectedCase = null;
  });
  confirmModalSubmit.addEventListener('click', () => {
    confirmModal.classList.add('hidden');
    board.classList.remove('hidden');
    finishSetup(selectedCase);
  });
};

const confirmCase = () => {
  const caseNumber = Number(selectedCase.querySelector('.case-text').innerHTML);
  confirmTextSpan.textContent = caseNumber;
  board.classList.add('hidden');
  showConfirmModal(selectedCase);
};

const setCase = (e) => {
  const { target } = e;
  selectedCase = target.classList.contains('case-text')
    ? target.parentElement
    : target;
  confirmCase(selectedCase);
};

const addCaseListeners = () => {
  cases.forEach((c) => {
    c.addEventListener('click', setCase, { once: true });
  });
};

const setup = () => {
  setTimeout(() => {
    overlay.classList.add('hidden');
    board.classList.remove('hidden');
    addCaseListeners();
  }, 4000);
};

export default setup;
