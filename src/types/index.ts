export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    // This allows adding extra fields without changing the code
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
}

export type FieldType = "text" | "email" | "tel" | "date" | "number";

export interface FormFieldConfig {
    name: keyof User;
    label: string;
    type: FieldType;
    placeholder?: string;
    required?: boolean;
    validation?: {
        pattern?: RegExp;
        minLength?: number;
        maxLength?: number;
    };
}
