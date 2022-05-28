let sum = 0;
let checkDigit = 0;
const weights = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3];

year = {
  0: "19",
  1: "19",
  2: "20",
  3: "20",
  4: "21",
  5: "21",
  6: "22",
  7: "22",
  8: "18",
  9: "18",
};
monthSingleDigit = {
  1: "01",
  2: "02",
  3: "03",
  4: "04",
  5: "05",
  6: "06",
  7: "07",
  8: "08",
  9: "09",
};
monthTwoDigit = { 0: "10", 1: "11", 2: "12" };

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

const checkPesel = (pesel) => {
  //zamiana inputu na tablice typu number
  let peselArr = pesel.split("").map((el) => parseInt(el));

  //tu podstawia do wzorku 1*a + 3*b + 7*c + 9*d + 1*e + 3*f + 7*g + 9*h + 1*i + 3*j || last == result
  peselArr.forEach((element, index, peselArr) => {
    if (index === peselArr.length - 1) return;
    sum += parseInt(element) * parseInt(weights[index]);
  });

  //sprawdzenie ostatniego indexu tablicy
  checkDigit = 10 - (sum % 10);

  //zwraca komunikat czy pesel jest poprawny
  if (peselArr.length !== 11) return results[0];
  if (checkDigit === peselArr[10]) return results[2];
  return results[1];
};

const getDate = (pesel) => {
  let monthLength;
  pesel[2] % 2 === 0
    ? (monthLength = monthSingleDigit[pesel[3]])
    : (monthLength = monthTwoDigit[pesel[3]]);
  return `${year[pesel[2]]}${pesel[0]}${pesel[1]}-${monthLength}-${pesel[4]}${
    pesel[5]
  }`;
};

const getGender = (pesel) => {
  return pesel[9] % 2 === 0 ? "kobieta" : "mężczyzna";
};
//tego nie tykalem ale to do przycisku sie odnosi
const button = document.querySelector("#button");
const result = document.querySelector("#result");

button.addEventListener("click", () => {
  const pesel = document.querySelector("#pesel").value;
  const checkStatus = checkPesel(pesel);
  result.innerHTML = checkStatus.message;
  if (checkStatus.message === results[2]) {
    document.getElementById("gender").innerHTML = getGender(pesel);
    document.getElementById("birthDate").innerHTML = getDate(pesel);
  }
});
