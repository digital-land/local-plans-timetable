import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import { CharacterCount, CharacterCountProps } from "./CharacterCount";

interface TestCase extends Omit<CharacterCountProps, "id"> {
  expectedMessage: string;
}

const testCases: TestCase[] = [
  {
    characterLimit: 10,
    numberOfCharacters: 5,
    expectedMessage: "You have 5 characters remaining",
  },
  {
    characterLimit: 10,
    numberOfCharacters: 9,
    expectedMessage: "You have 1 character remaining",
  },
  {
    characterLimit: 10,
    numberOfCharacters: 10,
    expectedMessage: "You have 0 characters remaining",
  },
  {
    characterLimit: 10,
    numberOfCharacters: 11,
    expectedMessage: "You have 1 character too many",
  },
  {
    characterLimit: 10,
    numberOfCharacters: 15,
    expectedMessage: "You have 5 characters too many",
  },
];

test.each(testCases)(
  "renders the correct message for numberOfCharacters === $numberOfCharacters, characterLimit === $characterLimit",
  ({ characterLimit, numberOfCharacters, expectedMessage }) => {
    const { asFragment } = render(
      <CharacterCount
        characterLimit={characterLimit}
        numberOfCharacters={numberOfCharacters}
      />
    );

    expect(asFragment()).toMatchSnapshot();
    expect(screen.queryByText(expectedMessage)).toBeInTheDocument();
  }
);
