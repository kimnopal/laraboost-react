export interface Permission {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
}

export interface Role {
    id: number;
    name: string;
    permissions: Permission[];
    created_at: string;
    updated_at: string;
}
