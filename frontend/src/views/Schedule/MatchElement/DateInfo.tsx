import FullWidthTextBox from "../../../components/FullWidthTextBox";

function DateInfo({ date }: { date: Date }) {
  const dt = new Date(date);
  const formattedDate = `${dt.getDate().toString().padStart(2, "0")}/${(
    dt.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}`;
  const formattedTime = `${dt.getHours().toString().padStart(2, "0")}:${dt
    .getMinutes()
    .toString()
    .padStart(2, "0")}`;

  return (
    <div className="flex flex-col items-center w-20">
      <FullWidthTextBox text={formattedDate} size="base" color="gray-500" />
      <FullWidthTextBox text={formattedTime} size="2xl" color="white" />
    </div>
  );
}

export default DateInfo;
