import { top, bottom, topModal, gameInfo, leftSide, rightSide } from './dom';

const handleBackgrounds = () => {
  topModal.classList.add('hidden');
  gameInfo.classList.remove('hidden');
  leftSide.classList.remove('hidden');
  rightSide.classList.remove('hidden');
  top.classList.remove('muted');
  top.classList.add('black');
  bottom.classList.add('muted');
};
const startGame = (selectedCase) => {
  selectedCase.classList.add('selected-case');
  handleBackgrounds();
};

export default startGame;
