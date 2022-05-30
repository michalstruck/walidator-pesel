type Props = {
  sex: boolean;
  DOB: string;
};

const Results = ({ sex, DOB }: Props) => {
  return (
    <div>
      {"Płeć: " + sex ? "Kobieta" : "🚹 Mężczyzna"} {DOB}
    </div>
  );
};

export default Results;
