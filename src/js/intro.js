import startGame from './game';
import {
  board,
  confirmModal,
  confirmModalClose,
  confirmModalSubmit,
  confirmTextSpan,
  cases,
  overlay,
} from './dom';

let selectedCase;

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
    startGame(selectedCase);
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
