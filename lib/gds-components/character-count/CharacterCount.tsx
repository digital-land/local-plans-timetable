/**
 * GDS component: https://design-system.service.gov.uk/components/character-count/
 */

export interface CharacterCountProps {
  characterLimit: number;
  id?: string;
  numberOfCharacters: number;
}

const getRemainingCharactersMessage = (
  numberOfCharacters: number,
  characterLimit: number
) => {
  const remainingCharacters = characterLimit - numberOfCharacters;
  const absoluteRemainingCharacters = Math.abs(remainingCharacters);

  return `You have ${absoluteRemainingCharacters} character${
    absoluteRemainingCharacters === 1 ? "" : "s"
  } ${remainingCharacters < 0 ? "too many" : "remaining"}`;
};

export const CharacterCount = ({
  characterLimit,
  id,
  numberOfCharacters,
}: CharacterCountProps) => (
  <div id={id} className="govuk-hint">
    {getRemainingCharactersMessage(numberOfCharacters, characterLimit)}
  </div>
);
