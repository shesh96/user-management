import React from "react";
import { cn } from "../../lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    title?: string;
    description?: string;
}

export const Card: React.FC<CardProps> = ({
    className,
    title,
    description,
    children,
    ...props
}) => {
    return (
        <div
            className={cn(
                "rounded-lg border border-gray-200 bg-white shadow-sm",
                className
            )}
            {...props}
        >
            {(title || description) && (
                <div className="flex flex-col space-y-1.5 p-6 pb-4 border-b border-gray-100">
                    {title && (
                        <h3 className="text-lg font-semibold leading-none tracking-tight">
                            {title}
                        </h3>
                    )}
                    {description && (
                        <p className="text-sm text-gray-500">{description}</p>
                    )}
                </div>
            )}
            <div className="p-6">{children}</div>
        </div>
    );
};
