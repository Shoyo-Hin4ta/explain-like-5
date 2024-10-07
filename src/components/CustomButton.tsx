import React from "react"
import { Button } from "@/components/ui/button"

interface ButtonProps {
    label: string;
    onClick?: () => void;
    size?: "default" | "sm" | "lg" | "icon";
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
    disabled?: boolean;
    className?: string;
}

const CustomButton: React.FC<ButtonProps> = ({
    label,
    onClick,
    size = "default",
    variant = "default",
    disabled = false,
    className = "" 
}) => {
    return (
        <Button 
            onClick={onClick} 
            size={size} 
            variant={variant}
            disabled={disabled}
            className={className} 
        >
            {label}
        </Button>
    )
}

export default CustomButton;