import { Dispatch, SetStateAction } from "react";

/**
 * Interface that represents the properties we store with an input element
 * of our own design.
 */
export interface ControlledInputProps {
  value: string;
  setValue: Dispatch<SetStateAction<string>>; // USeful for clearing the textbox.
  ariaLabel: string;
  spaces: boolean;
  id?: string;
}

/**
 * Controlled textinput so we can store values and check spacing.
 * @param
 * @returns
 */
export default function ControlledInput({
  value,
  setValue,
  ariaLabel,
  spaces,
  id,
}: ControlledInputProps) {
  return (
    <input
      id={id}
      value={value} // We grab this for command outputs.
      onChange={(ev) => {
        if (spaces) {
          setValue(ev.target.value);
        } else {
          setValue(ev.target.value.replace(" ", ""));
        }
      }} // For resetting.
      aria-label={ariaLabel}
      type="text"
      className="input"
      placeholder="Start typing..."
    ></input>
  );
}
