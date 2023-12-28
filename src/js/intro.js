import startGame from './game';
import {
  board,
  bottom,
  confirmModal,
  confirmModalClose,
  confirmModalSubmit,
  confirmTextSpan,
  gameInfo,
  leftSide,
  overlay,
  rightSide,
  top,
  topModal,
  yourCaseDiv,
  addCaseListeners,
} from './dom';

let selectedCase;

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
  top.classList.add('hidden');
  confirmModal.classList.remove('hidden');
  confirmModalClose.addEventListener('click', () => {
    confirmModal.classList.add('hidden');
    board.classList.remove('hidden');
    top.classList.remove('hidden');
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



const fadeIn = () => {
  setTimeout(() => {
    overlay.classList.add('hidden');
    board.classList.remove('hidden');
    top.classList.remove('hidden');
  }, 4000);
};

export { setCase, fadeIn };
