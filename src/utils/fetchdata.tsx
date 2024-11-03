// This file will hold simplfied versions of functions
// Some of these may be for smaller components, it will be organized
// such that subcomponents and API calls are separated
interface PrerequisitesProps {
  prereqs: string;
}

const Prerequisites: React.FC<PrerequisitesProps> = ({ prereqs }) => {
  if (!prereqs || prereqs.length === 0) return null; // lazy error case

  return (
    <ul>
      {prereqs.split(',').map((prereq, index) => (
        <li key={index}>{prereq}</li>
      ))}
    </ul>
  );
};

export default Prerequisites;
