import { DataPagination } from '@/components/data-pagination';
import EmptyState from '@/components/empty-state';
import Heading from '@/components/heading';
import SearchInput from '@/components/search-input';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { create, destroy, edit, index } from '@/routes/users';
import { BreadcrumbItem, Link as LinkType } from '@/types';
import { User } from '@/types/user';
import { Head, Link, router } from '@inertiajs/react';
import { Edit, Loader2, Plus, Trash2, User as UserIcon, Users } from 'lucide-react';
import { useState } from 'react';

// Extended user type for this page only
type UserWithRoles = User & {
    roles: Array<{
        id: number;
        name: string;
    }>;
};

type UsersPageProps = {
    users: {
        data: UserWithRoles[];
        links: LinkType[];
        current_page: number;
        last_page: number;
        per_page: number;
        from: number;
        to: number;
        total: number;
        next_page_url: string | null;
        prev_page_url: string | null;
    };
    filters: {
        search?: string;
    };
};

export default function UsersPage({ users, filters }: UsersPageProps) {
    const breadcrumbs: BreadcrumbItem[] = [{ title: 'Users', href: index().url }];

    const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
    const [deletedId, setDeletedId] = useState<number | null>(null);
    const [deleteProcessing, setDeleteProcessing] = useState<boolean>(false);

    const handleDeleteModal = (id: number) => {
        setDeletedId(id);
        setDeleteModalOpen(true);
    };

    const handleDelete = () => {
        if (!deletedId) {
            return;
        }

        setDeleteProcessing(true);
        router.delete(destroy(deletedId).url, {
            onFinish: () => {
                setDeleteProcessing(false);
            },
        });
        setDeleteModalOpen(false);
        setDeletedId(null);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Users Data" />

            <div className="">
                <div className="mb-6">
                    <Heading title="Users Data" description="Manage users and their roles" />
                </div>
                <div className="mb-5 flex items-center justify-between">
                    <SearchInput placeholder="Search users..." initialValue={filters.search || ''} />
                    <div>
                        <Button asChild>
                            <Link href={create().url} className="text-sm">
                                <Plus className="size-3" /> Add User
                            </Link>
                        </Button>
                    </div>
                </div>
                {users.data.length !== 0 ? (
                    <>
                        <div className="mb-5 rounded-md border">
                            <Table>
                                <TableHeader className="bg-muted/50">
                                    <TableRow className="hover:bg-transparent">
                                        <TableHead className="w-[100px]">#</TableHead>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Email</TableHead>
                                        <TableHead>Roles</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {users.data.map((user, index) => (
                                        <TableRow key={user.id} className="">
                                            <TableCell className="font-medium">{users.from + index}</TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <UserIcon className="size-4 text-muted-foreground" />
                                                    {user.name}
                                                </div>
                                            </TableCell>
                                            <TableCell>{user.email}</TableCell>
                                            <TableCell>
                                                <div className="flex flex-wrap gap-1">
                                                    {user.roles.length > 0 ? (
                                                        user.roles.map((role, index) => {
                                                            if (index > 3) return;

                                                            if (index === 3) {
                                                                return (
                                                                    <Badge key={role.id} variant="secondary">
                                                                        + {user.roles.length - 3}
                                                                    </Badge>
                                                                );
                                                            }

                                                            return (
                                                                <Badge key={role.id} variant="secondary">
                                                                    {role.name}
                                                                </Badge>
                                                            );
                                                        })
                                                    ) : (
                                                        <span className="text-sm text-muted-foreground">No roles</span>
                                                    )}
                                                </div>
                                            </TableCell>
                                            <TableCell className="space-x-2 text-right">
                                                <Link href={edit(user.id).url}>
                                                    <Button variant="outline" size="sm">
                                                        <Edit className="mr-1" />
                                                        Edit
                                                    </Button>
                                                </Link>
                                                <Button variant="destructive" className="" size="sm" onClick={() => handleDeleteModal(user.id)}>
                                                    <Trash2 className="mr-1" />
                                                    Delete
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>

                        <DataPagination data={users} />
                    </>
                ) : (
                    <div className="rounded-md border">
                        <EmptyState
                            icon={Users}
                            title="No users found"
                            description="You haven't created any users yet. Start by adding your first user to manage access and permissions."
                            action={{
                                label: 'Add User',
                                href: create().url,
                                icon: Plus,
                            }}
                        />
                    </div>
                )}

                <AlertDialog open={deleteModalOpen}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete the user and remove it from our servers.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel onClick={() => setDeleteModalOpen(false)}>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                                className="bg-destructive text-primary hover:bg-destructive/50"
                                onClick={handleDelete}
                                disabled={deleteProcessing}
                            >
                                {deleteProcessing && <Loader2 className="animate-spin" />}
                                Delete
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </AppLayout>
    );
}
