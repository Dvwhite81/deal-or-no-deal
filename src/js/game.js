import { updateCasesToOpen, updateCurrentOffer } from './dom';

let gameCase;
let offer;
let casesToOpen;

const startGame = (selectedCase) => {
  gameCase = selectedCase;
  offer = 0;
  casesToOpen = 6;
  updateCasesToOpen(casesToOpen);
  updateCurrentOffer(offer);
};

export default startGame;
