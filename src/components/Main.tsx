import { useState } from "react";
import Results from "./Results";
import { useForm } from "react-hook-form";

interface Current {
  correct: boolean;
  pesel: string[];
  sex: boolean;
  DOB: string;
}

interface Form {
  pesel: string;
}
const year = ["19", "19", "20", "20", "21", "21", "22", "22", "18", "18"];
const monthSingleDigit = ["01", "02", "03", "04", "05", "06", "07", "08", "09"];
const monthTwoDigit = ["10", "11", "12"];
const weights = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3];

const Main = () => {
  const [current, setCurrent] = useState({} as Current);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Form>();
  console.log(errors);
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

  const Submit = (pesel: string) => {
    const { peselArr, correct } = checkPesel(pesel);
    setCurrent(() => ({
      correct,
      pesel: peselArr,
      sex: getGender(peselArr),
      DOB: getDate(peselArr),
    }));
  };

  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <form
        className="bg-purple-400 w-fit h-fit grid place-items-center rounded-lg"
        onSubmit={handleSubmit((value) => Submit(value.pesel))}
      >
        <label className="m-2 text-neutral-800 drop-shadow-xl text-center">
          Pesel
          <input
            {...register("pesel", {
              required: true,
              pattern: /^[0-9]{11}/,
              minLength: 11,
              maxLength: 11,
            })}
            type="text"
            className="text-center text-black block w-60 shadow-xl rounded-md required:"
          />
        </label>

        {/* todo: add popups for validation errors, fix layout */}

        <button
          type="submit"
          className="bg-fuchsia-700 rounded-md 
         shadow-lg shadow-neutral-800 h-fit w-fit p-2
         text-white container mx-36 my-8 active:translate-y-1"
        >
          Sprawdź
        </button>
        <button
          className="bg-fuchsia-700 rounded-md 
         shadow-lg shadow-neutral-800 h-fit w-fit p-2  
         text-white container mx-36 my-8 active:translate-y-1"
          onClick={() => window.location.reload()}
        >
          Refresh Page
        </button>
        <span id="result" className="result"></span>
      </form>
      <Results sex={current.sex} DOB={current.DOB} correct={current.correct} />
    </div>
  );
};

export default Main;
