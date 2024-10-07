import React from "react";
import { Input } from "@/components/ui/input"

interface InputBoxProps {
    label?: string;
    error?: string;
    value: string;
    onChange: (value: string) => void;
    id?: string;
    placeholder?: string;
}

const InputBox: React.FC<InputBoxProps> = ({
    label,
    error,
    value,
    onChange,
    id,
    placeholder,
    ...props
}) => {

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
    };

    return (
        <div className="space-y-2">
            {label && (
                <label htmlFor={id} className="text-sm font-medium">
                    {label}
                </label>
            )}
            <Input 
                id={id}
                value={value}
                onChange={handleChange}
                placeholder={placeholder}
                {...props} 
            />
            {error && <p className="text-sm text-red-500">{error}</p>}
        </div>
    )
}

export default InputBox;