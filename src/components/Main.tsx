// rename and think ab component composition

const Main = () => {
  let sum = 0;
  let checkDigit = 0;
  const weights = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3];

  let year = ["19", "19", "20", "20", "21", "21", "22", "22", "18", "18"];

  let monthSingleDigit = ["01", "02", "03", "04", "05", "06", "07", "08", "09"];

  let monthTwoDigit = ["10", "11", "12"];

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

  const checkPesel = (pesel: string) => {
    //zamiana inputu na tablice typu number
    let peselArr = pesel.split("").map((el) => parseInt(el));

    //tu podstawia do wzorku 1*a + 3*b + 7*c + 9*d + 1*e + 3*f + 7*g + 9*h + 1*i + 3*j || last == result
    // check later
    peselArr.forEach((element, index, peselArr) => {
      if (index === peselArr[10]) {
        return (sum += element * weights[index]);
      }
    });

    //sprawdzenie ostatniego indexu tablicy
    // comapre with original??
    checkDigit = 10 - (sum % 10);

    //zwraca komunikat czy pesel jest poprawny
    if (peselArr.length !== 11) return results[0];
    if (checkDigit === peselArr[10]) return results[2];
    return results[1];
  };

  // check later -- added + parsing to match number type of month... indexes, argument correct?
  const getDate = (pesel: string[]) => {
    let monthLength;
    +pesel[2] % 2 === 0
      ? (monthLength = monthSingleDigit[+pesel[3]])
      : (monthLength = monthTwoDigit[+pesel[3]]);
    return `${year[+pesel[2]]}${pesel[0]}${pesel[1]}-${monthLength}-${
      pesel[4]
    }${pesel[5]}`;
  };

  const getGender = (pesel: string[]) => {
    return +pesel[9] % 2 === 0 ? "kobieta" : "mężczyzna";
  };
  //tego nie tykalem ale to do przycisku sie odnosi
  const button = document.querySelector("#button");
  const result = document.querySelector("#result");

  // button.addEventListener("click", () => {
  //   const pesel = document.querySelector("#pesel").value;
  //   const checkStatus = checkPesel(pesel);
  //   result.innerHTML = checkStatus.message;
  //   if (checkStatus.message === results[2]) {
  //     document.getElementById("gender").innerHTML = getGender(pesel);
  //     document.getElementById("birthDate").innerHTML = getDate(pesel);
  //   }
  // });
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <label htmlFor="pesel" className="label">
          Pesel
        </label>
        <input
          id="pesel"
          type="string"
          className="input"
          min="0"
          required={true}
        />
        <button id="button" className="button">
          Sprawdź
        </button>
        <button onClick={() => window.location.reload()}>Refresh Page</button>
        <span id="result" className="result"></span>
      </form>
      <p id="gender"></p>
      <p id="birthDate"></p>
    </div>
  );
};

export default Main;
