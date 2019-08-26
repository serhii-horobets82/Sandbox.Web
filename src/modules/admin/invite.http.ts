import axios from "axios"

interface IRole {
    type: string;
    id: number;
}

export async function getRoles(): Promise<IRole[]> {
    return await axios.get("api/employees/roles").then(response => response.data);
}

export async function invite(user: { email: string, role: string }): Promise<void> {
    return await axios.post("api/invite", user).then(response => response.data);
}