function SvgTipFilter() {
  return (
    <svg width="0" height="0">
      <filter id="greenBorderFilter">
        <feMorphology
          in="SourceAlpha"
          operator="dilate"
          radius="2"
          result="dilated"
        />
        <feFlood floodColor="green" floodOpacity="1" result="color" />
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
