import StatsButton from "./StatsButton";

interface StatsCardProps {
  title: string;
  count: number;
  buttonText: string;
  onClick?: () => void;
}

const StatsCard: React.FC<StatsCardProps> = (props) => {
  return (
    <div className="rounded-2xl shadow bg-[#E1F3FF] h-full transition-all duration-300 hover:bg-[#0754AE] group">
      <div className="rounded-2xl shadow bg-[#E1F3FF] h-full transition-all duration-300 hover:bg-[#0754AE] group">
        <div className="p-4 rounded-md w-full h-full">
          <div className="flex flex-col justify-between gap-4 w-full h-full">
            <div className="flex justify-between">
              <div className="text-md text-gray-700 font-medium w-24 text-start group-hover:text-white">
                {props.title}
              </div>
              <div className="text-2xl font-bold text-blue-700 group-hover:text-white">
                {props.count}
              </div>
            </div>

            <div className="flex-grow" />

            <StatsButton text={props.buttonText} onclick={props.onClick} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
