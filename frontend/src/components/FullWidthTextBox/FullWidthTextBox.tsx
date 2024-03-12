/*
    This is a component that splits a text in single characters
     and spaces the place between them to create a full width text box
*/

function FullWidthTextBox({
  text,
  size,
  color,
}: {
  text: string;
  size:
    | "xs"
    | "sm"
    | "base"
    | "lg"
    | "xl"
    | "2xl"
    | "3xl"
    | "4xl"
    | "5xl"
    | "6xl"
    | "7xl"
    | "8xl"
    | "9xl";
  color: string; // TailwindCSS color
}) {
  const characters = text.split("");
  return (
    <div className="flex justify-between w-full">
      {characters.map((char, i) => (
        <div key={i} className={`text-${size} text-${color}`}>
          {char}
        </div>
      ))}
    </div>
  );
}

export default FullWidthTextBox;
