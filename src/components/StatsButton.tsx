interface StatsButtonProps {
  text: string;
  onclick?: () => void;
}

const StatsButton: React.FC<StatsButtonProps> = (props) => {
  return (
    <button
      onClick={props.onclick}
      className="px-3 cursor-pointer py-1 text-sm font-medium rounded-full bg-gray-900 text-white transition-all duration-300 group-hover:bg-white group-hover:text-black"
    >
      {props.text}
    </button>
  );
};

export default StatsButton;
