import { cases } from './dom';

const prizeValues = [
  0.01, 1, 5, 10, 25, 50, 75, 100, 200, 300, 400, 500, 750, 1000, 5000, 10000,
  25000, 50000, 75000, 100000, 200000, 300000, 400000, 500000, 750000, 1000000,
];

const fillCases = () => {
  const assignedCases = [];
  const allPrizes = [
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

  for (let i = 0; i < cases.length; i++) {
    const index = Math.floor(Math.random() * allPrizes.length);
    const briefcase = cases[i];

    const prize = allPrizes[index];
    allPrizes.splice(index, 1);
    const assigned = { briefcase, prize };
    assignedCases.push(assigned);
  }
  return assignedCases;
};

const getInitialCaseValue = (selectedCase, assignedCases) => {
  const targetCase = assignedCases.find((c) => c.briefcase === selectedCase);
  return targetCase.prize;
};

const getPrizeValue = (prize, allPrizes) => {
  const index = allPrizes.indexOf(prize);
  return prizeValues[index];
};

const getOffer = (removedPrizes, offerPercentage) => {
  let squareSum = 0;
  let count = 0;
  prizeValues.forEach((v) => {
    if (!removedPrizes.includes(v)) {
      const square = v * v;
      squareSum += square;
      count++;
    }
  });
  const squareAverage = squareSum / count;
  const sqrt = Math.sqrt(squareAverage);
  const offer = Math.round(sqrt * offerPercentage);
  return offer;
};

const getFormattedOffer = (offer) => {
  const USDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });
  return USDollar.format(offer);
};

const madeAGoodDeal = (isAccepted, caseValue, finalOffer) => {
  const yourCase = Number(caseValue);
  const final = Number(finalOffer);
  const goodDeal =
    (isAccepted && yourCase < final) || (!isAccepted && yourCase >= final);
  return goodDeal ? 'GOOD' : 'BAD';
};

export {
  fillCases,
  getFormattedOffer,
  getInitialCaseValue,
  getOffer,
  getPrizeValue,
  madeAGoodDeal,
  prizeValues,
};
