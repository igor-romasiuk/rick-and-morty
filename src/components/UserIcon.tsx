import { FaUser } from "react-icons/fa";

interface UserIconProps {
  onClick: () => void;
}

export default function UserIcon({ onClick }: UserIconProps) {
  return (
    <button onClick={onClick} className="text-white text-2xl">
      <FaUser />
    </button>
  );
}
