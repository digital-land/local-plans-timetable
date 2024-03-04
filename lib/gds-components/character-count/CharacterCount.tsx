/**
 * GDS component: https://design-system.service.gov.uk/components/character-count/
 */

export interface CharacterCountProps {
  characterLimit: number;
  id?: string;
  numberOfCharacters: number;
}

const getRemainingCharactersMessage = (remainingCharacters: number) => {
  const absoluteRemainingCharacters = Math.abs(remainingCharacters);

  return `You have ${absoluteRemainingCharacters} character${
    absoluteRemainingCharacters === 1 ? "" : "s"
  } ${remainingCharacters < 0 ? "too many" : "remaining"}`;
};

export const CharacterCount = ({
  characterLimit,
  id,
  numberOfCharacters,
}: CharacterCountProps) => {
  const remainingCharacters = characterLimit - numberOfCharacters;
  const isOverLimit = remainingCharacters < 0;

  return (
    <div
      id={id}
      className={`govuk-character-count__message govuk-character-count__status ${
        isOverLimit ? "govuk-error-message" : "govuk-hint"
      }`}
    >
      {getRemainingCharactersMessage(remainingCharacters)}
    </div>
  );
};
