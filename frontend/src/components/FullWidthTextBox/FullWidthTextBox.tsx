/*
    This is a component that splits a text in single characters
     and spaces the place between them to create a full width text box
*/

function FullWidthTextBox({
  text,
  textClassName,
}: {
  text: string;
  textClassName?: string;
}) {
  const characters = text.split("");
  return (
    <div className="flex justify-between w-full">
      {characters.map((char, i) => (
        <div key={i} className={textClassName}>
          {char}
        </div>
      ))}
    </div>
  );
}

export default FullWidthTextBox;
