import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";
import { IconType } from 'react-icons';

interface ToolButtonProps {
  label: string;
  icon: LucideIcon | IconType;
  onClick: () => void;
  isActive?: boolean;
  disabled?: boolean;
}

export const ToolButton = ({
  label,
  icon: Icon,
  onClick,
  isActive,
  disabled,
}: ToolButtonProps) => {
  return (
    <Hint label={label} side="right" sideOffset={20}>
      <Button
        disabled={disabled}
        onClick={onClick}
        size="icon"
        variant={isActive ? "boardActive" : "board"}
      >
        <Icon />
      </Button>
    </Hint>
  );
};
