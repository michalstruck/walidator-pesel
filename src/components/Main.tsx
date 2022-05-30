import { useCallback, useState } from "react";
import Results from "./Results";

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

const Main = () => {
  const [current, setCurrent] = useState({} as Current);

  const results = [
    {
      status: false,
      message: "Pesel musi składać się z 11 cyfr",
    },
    {
      status: false,
      message: "Pesel nieprawidłowy",
    },
    {
      status: true,
      message: "Pesel prawidłowy",
    },
  ];

  const checkPesel = (
    pesel: string
  ): { correct: boolean; peselArr: string[] } => {
    if (pesel === null || pesel.length !== 11)
      return { correct: false, peselArr: [] };
    const peselArr = pesel.split("");
    let sum: number = 0;
    //todo -- rewrite to forEach
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

  const handleSubmit = (e: React.BaseSyntheticEvent) => {
    const { value } = e.target[0];
    const { peselArr, correct } = checkPesel(value);
    setCurrent(() => ({
      correct,
      pesel: peselArr,
      sex: getGender(peselArr),
      DOB: getDate(peselArr),
    }));
    console.log(current);
  };

  return (
    <div className="grid place-items-center h-screen">
      <form
        className="bg-purple-400 w-fit h-fit grid place-items-center rounded-lg"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(e);
        }}
      >
        <label htmlFor="pesel" className="m-2">
          Pesel
        </label>
        <input
          id="pesel"
          type="text"
          className="block w-80 shadow-lg rounded-md focus:border-blue-100"
          min="0"
          required={true}
        />
        <button
          type="submit"
          className="bg-fuchsia-700 rounded-md 
         shadow-lg shadow-stone-500 h-fit w-fit p-2
         text-white container mx-36 my-8 active:translate-y-1"
        >
          Sprawdź
        </button>
        <button
          className="bg-fuchsia-700 rounded-md 
         shadow-lg shadow-stone-500 h-fit w-fit p-2  
         text-white container mx-36 my-8 active:translate-y-1"
          onClick={() => window.location.reload()}
        >
          Refresh Page
        </button>
        <span id="result" className="result"></span>
      </form>
      <Results sex={current.sex} DOB={current.DOB} />
    </div>
  );
};

export default Main;
