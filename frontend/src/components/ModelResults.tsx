import { User } from "../types/user";
interface Props {
  severity: number | 3;
}

const ModelResults: React.FC<Props> = ({ severity }) => {
  return (
    <div>
      <div className={`text-2xl font-bold`}>Severity Level: {severity}</div>
    </div>
  );
};

export default ModelResults;
