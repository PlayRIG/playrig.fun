import {omit} from "radash";

interface ButtonCTAProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  isCTAExist?: boolean;
}

export const ButtonCTA = (props: ButtonCTAProps) => {
  return (
    <button
      {...omit(props, ["className", "isCTAExist"])}
      aria-label="Button CTA"
      className="w-full border border-white/[15%]">
      <div>{props.text}</div>
    </button>
  );
};
