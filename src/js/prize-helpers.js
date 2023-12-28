import { cases } from './dom';

const PRIZES = [
  '.01',
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

const assignPrizes = () => {
  const assignedPrizes = [];
  const allPrizes = PRIZES;

  for (let i = 0; i < cases.length; i++) {
    const index = Math.floor(Math.random() * allPrizes.length);
    const briefcase = cases[i];
    const prize = allPrizes[index];
    allPrizes.splice(index, 1);
    const assigned = { briefcase, prize };
    assignedPrizes.push(assigned);
  }
  return assignedPrizes;
};

const getPrize = (briefcase) => {
  console.log('getPrize briefcase:', briefcase);
};

const getNumberFromCase = (briefcase) => {
  const { id } = briefcase;
  return id.split('-')[1];
};

const fillCases = () => {
  console.log('fillCases');
  const assignedCases = [];
  const assignedPrizes = assignPrizes();
  cases.forEach((briefcase) => {
    const key = getNumberFromCase(briefcase);
    const value = assignedPrizes[key - 1];
    assignedCases.push({ key, value });
    console.log('fillCases briefcase:', briefcase);
    console.log('fillCases key:', key);
    console.log('fillCases value:', value);
  });
  return assignedCases;
};

export { fillCases, getPrize, PRIZES };
