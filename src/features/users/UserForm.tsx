import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams } from "react-router-dom";
import { userFormConfig, userSchema } from "../../config/userFormConfig";
import type { UserFormData } from "../../config/userFormConfig";
import { userService } from "../../services/api";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import { Loader2 } from "lucide-react";
import { Card } from "../../components/ui/Card";

export const UserForm: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [loading, setLoading] = React.useState(false);
    const [initialLoading, setInitialLoading] = React.useState(!!id);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<UserFormData>({
        resolver: zodResolver(userSchema),
    });

    React.useEffect(() => {
        if (id) {
            const fetchUser = async () => {
                try {
                    const user = await userService.getById(id);
                    // Set form values based on config to support extensibility
                    userFormConfig.forEach((field) => {
                        const value = user[field.name];
                        if (value !== undefined) {
                            setValue(field.name as keyof UserFormData, value);
                        }
                    });
                } catch (error) {
                    console.error("Failed to fetch user", error);
                    alert("Failed to fetch user details.");
                    navigate("/");
                } finally {
                    setInitialLoading(false);
                }
            };
            fetchUser();
        }
    }, [id, setValue, navigate]);

    const onSubmit = async (data: UserFormData) => {
        setLoading(true);
        try {
            if (id) {
                await userService.update(id, data);
            } else {
                await userService.create(data);
            }
            navigate("/");
        } catch (error) {
            console.error("Failed to save user", error);
            alert("Failed to save user. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    if (initialLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
            </div>
        );
    }

    return (
        <Card title={id ? "Edit User" : "Create New User"} className="max-w-2xl mx-auto">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    {userFormConfig.map((field) => (
                        <Input
                            key={field.name as string}
                            id={field.name as string}
                            label={field.label}
                            type={field.type}
                            placeholder={field.placeholder}
                            error={errors[field.name as keyof UserFormData]?.message as string}
                            required={field.required}
                            {...register(field.name as keyof UserFormData)}
                            className={field.type === "text" || field.type === "email" ? "col-span-1" : "col-span-1"}
                        />
                    ))}
                </div>

                <div className="flex justify-end space-x-4">
                    <Button
                        type="button"
                        variant="ghost"
                        onClick={() => navigate("/")}
                        disabled={loading}
                    >
                        Cancel
                    </Button>
                    <Button type="submit" isLoading={loading}>
                        {id ? "Update User" : "Create User"}
                    </Button>
                </div>
            </form>
        </Card>
    );
};
