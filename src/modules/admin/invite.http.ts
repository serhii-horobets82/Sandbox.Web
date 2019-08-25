import axios from "axios"

interface IRole {
    name: string;
    roleId: number;
}

type InviteStatus = 'Failed'| 'Sent' | 'AlreadyExists'

interface IInviteResult {
    email: string;
    status: InviteStatus;
}

export async function getRoles(): Promise<IRole[]> {
    return await axios.get("api/roles").then(response => response.data);
}

export async function invite(user: { email: string, role: string }): Promise<IInviteResult> {
    return await axios.post("api/invite", user).then(response => response.data);
}