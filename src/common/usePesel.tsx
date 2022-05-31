import { useState } from "react";

interface Current {
  correct: boolean;
  pesel: string[];
  sex: boolean;
  DOB: string;
}

const year = ["19", "19", "20", "20", "21", "21", "22", "22", "18", "18"];
const monthSingleDigit = ["01", "02", "03", "04", "05", "06", "07", "08", "09"];
const monthTwoDigit = ["10", "11", "12"];
const weights = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3];

const usePesel = () => {
  const [current, setCurrent] = useState({} as Current);

  const checkPesel = (
    pesel: string
  ): { correct: boolean; peselArr: string[] } => {
    let sum: number = 0;
    const peselArr = pesel.split("");

    if (pesel === null || pesel.length !== 11)
      return { correct: false, peselArr: [] };

    for (let i: number = 0; i < peselArr.length - 1; i++) {
      sum += +peselArr[i] * weights[i];
    }

    const modulo = sum % 10;
    const twoLast = +pesel.substring(pesel.length - 1);

    return {
      correct: (modulo === 0 && twoLast === 0) || twoLast === 10 - modulo,
      peselArr,
    };
  };

  const getDate = (pesel: string[]) => {
    let monthLength;
    +pesel[2] % 2 === 0
      ? (monthLength = monthSingleDigit[+pesel[3] - 1])
      : (monthLength = monthTwoDigit[+pesel[3]]);
    return `${year[+pesel[2]]}${pesel[0]}${pesel[1]}-${monthLength}-${
      pesel[4]
    }${pesel[5]}`;
  };

  const getGender = (pesel: string[]) => {
    return +pesel[9] % 2 === 0;
  };
  return { current, setCurrent, getDate, getGender, checkPesel };
};

export default usePesel;
