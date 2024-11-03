import { Link } from "react-router-dom";

interface ButtonMailtoProps {
  mailto: string;
  label: string;
}

const ButtonMailto: React.FC<ButtonMailtoProps> = ({ mailto, label }) => {
  return (
    <div className='tooltip' data-tip={mailto}>
      <Link
        to='#'
        onClick={(e) => {
          window.location.href = `mailto:${mailto}`;
          e.preventDefault();
        }}
      >
        <li>
          <a className='text-white btn btn-sm btn-outline bg-red-500'>
            {label}
          </a>
        </li>
      </Link>
    </div>
  );
};

export default ButtonMailto;
