import axios from "axios"

interface IRole {
    name: string;
    roleId: number;
}

export async function getRoles(): Promise<IRole[]> {
    return await axios.get("api/ecfRoles").then(response => response.data);
}

export async function invite(user: { email: string, role: string }): Promise<void> {
    return await axios.post("api/invite", user).then(response => response.data);
}