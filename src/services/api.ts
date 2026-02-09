import type { User } from "../types";

// Mock Data for initial load
const initialMockUsers: User[] = [
    {
        id: "1",
        firstName: "Rahul",
        lastName: "Singh",
        email: "rahul@example.com",
        phone: "1234567890",
    },
    {
        id: "2",
        firstName: "Mohan", 
        lastName: "sahu",
        email: "mohan@example.com",
        phone: "0987654321",
    }
];

// Simulate network delay to make it feel like a real API
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const getLocalUsers = (): User[] => {
    const stored = localStorage.getItem("users");
    if (!stored) {
        localStorage.setItem("users", JSON.stringify(initialMockUsers));
        return initialMockUsers;
    }
    return JSON.parse(stored);
};

const setLocalUsers = (users: User[]) => {
    localStorage.setItem("users", JSON.stringify(users));
};

export const userService = {
    getAll: async () => {
        await delay(300); // Simulate network latency
        return getLocalUsers();
    },

    getById: async (id: string) => {
        await delay(200);
        const users = getLocalUsers();
        const user = users.find((u) => u.id === id);
        if (!user) throw new Error("User not found");
        return user;
    },

    create: async (user: Omit<User, "id">) => {
        await delay(500);
        const users = getLocalUsers();
        // Generate a simple random ID
        // Generate a simple random ID
        const newUser = { ...user, id: Math.random().toString(36).substr(2, 9) } as User;
        users.push(newUser);
        setLocalUsers(users);
        return newUser;
    },

    update: async (id: string, user: Partial<User>) => {
        await delay(300);
        const users = getLocalUsers();
        const index = users.findIndex((u) => u.id === id);
        if (index !== -1) {
            users[index] = { ...users[index], ...user };
            setLocalUsers(users);
            return users[index];
        }
        throw new Error("User not found");
    },

    delete: async (id: string) => {
        await delay(300);
        const users = getLocalUsers();
        const filtered = users.filter((u) => u.id !== id);
        setLocalUsers(filtered);
    },

    reset: async () => {
        await delay(500);
        localStorage.removeItem("users");
        return getLocalUsers();
    }
};
