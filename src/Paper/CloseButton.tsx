import * as React from "react";
import CloseIcon from "../Icon/Close.svg";

interface IProps {
  show: boolean;
  onClick?: (e: React.MouseEvent) => void;
  className?: string;
}

const CloseButton: React.FC<IProps> = (props: IProps) => {
  const { className, show, onClick } = props;

  if (!show) {
    return null;
  }

  return (
    <div style={{ position: "relative" }}>
      <span onClick={onClick} className={className}>
        <CloseIcon />
      </span>
    </div>
  );
};

export default CloseButton;
