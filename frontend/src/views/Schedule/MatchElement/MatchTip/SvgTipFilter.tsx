const getNiceLookingColors = (colorName: string) => {
  const colors: { [key: string]: string } = {
    red: "#EE4266",
    yellow: "#FFBB64",
    green: "#337357",
  };
  if (colors[colorName]) {
    return colors[colorName];
  }
  return colorName;
};

function SvgTipFilter({ color }: { color: string }) {
  return (
    <svg width="0" height="0">
      <filter id={`${color}BorderFilter`}>
        <feMorphology
          in="SourceAlpha"
          operator="dilate"
          radius="2"
          result="dilated"
        />
        <feFlood
          floodColor={getNiceLookingColors(color)}
          floodOpacity="1"
          result="color"
        />
        <feComposite in="color" in2="dilated" operator="in" result="outline" />
        <feMerge>
          <feMergeNode in="outline" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </svg>
  );
}

export default SvgTipFilter;
