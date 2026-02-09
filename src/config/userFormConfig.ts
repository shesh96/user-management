import type { FormFieldConfig } from "../types";
import { z } from "zod";

// This configuration allows adding new fields without modifying the UI code.

// Just add a new object here, and the form will automatically update.
export const userFormConfig: FormFieldConfig[] = [
    {
        name: "firstName",
        label: "First Name",
        type: "text",
        placeholder: "John",
        required: true,
        validation: {
            minLength: 2,
        },
    },
    {
        name: "lastName",
        label: "Last Name",
        type: "text",
        placeholder: "Doe",
        required: true,
        validation: {
            minLength: 2,
        },
    },
    {
        name: "email",
        label: "Email Address",
        type: "email",
        placeholder: "john.doe@example.com",
        required: true,
    },
    {
        name: "phone",
        label: "Phone Number",
        type: "tel",
        placeholder: "1234567890",
        required: true,
        validation: {
            pattern: /^\d{10}$/,
        },
    },
];

// Generate Zod schema from config
export const generateUserSchema = () => {
    const shape: Record<string, z.ZodTypeAny> = {};

    userFormConfig.forEach((field) => {
        let schema = z.string();

        if (field.type === "email") {
            schema = schema.email({ message: "Invalid email address" });
        }

        if (field.validation?.minLength) {
            schema = schema.min(field.validation.minLength, {
                message: `${field.label} must be at least ${field.validation.minLength} characters`,
            });
        }

        if (field.validation?.pattern) {
            schema = schema.regex(field.validation.pattern, {
                message: `Invalid ${field.label} format`
            });
        }

        if (field.required) {
            shape[field.name] = schema.min(1, { message: `${field.label} is required` });
        } else {
            shape[field.name] = schema.optional();
        }
    });

    return z.object(shape);
};

export const userSchema = generateUserSchema();
export type UserFormData = z.infer<typeof userSchema>;
