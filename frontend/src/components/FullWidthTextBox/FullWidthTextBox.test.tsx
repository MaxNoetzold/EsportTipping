import { expect, it } from "vitest";

import { render } from "@testing-library/react";
import FullWidthTextBox from "./FullWidthTextBox";

it("renders the correct number of characters", () => {
  const text = "Test mit Leerzeichen";
  const { container } = render(<FullWidthTextBox text={text} />);

  // Check if the number of divs in the rendered component is equal to the number of characters in the text
  const divs = container.querySelectorAll("div");
  expect(divs.length).toBe(text.length + 1); // +1 for the parent div
});
