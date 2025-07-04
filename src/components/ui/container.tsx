import {cn} from "src/utils/cn";
import type {ReactNode} from "react";

type ContainerProps = {
  children: ReactNode;
  className?: string;
  ref?: React.LegacyRef<HTMLDivElement>;
};

export const Container = (props: ContainerProps) => {
  return (
    <div
      ref={props.ref}
      className={cn(
        "mx-auto flex h-screen w-full flex-col items-center justify-center",
        props.className,
      )}>
      {props.children}
    </div>
  );
};
