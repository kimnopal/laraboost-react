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
import { create, destroy, edit, index } from '@/routes/roles';
import { BreadcrumbItem, Link as LinkType } from '@/types';
import { Role } from '@/types/role';
import { Head, Link, router } from '@inertiajs/react';
import { Edit, Loader2, Plus, Shield, Trash2, Users } from 'lucide-react';
import { useState } from 'react';

// Extended role type for this page only
type RoleWithUsersCount = Role & {
    users_count: number;
};

type RolesPageProps = {
    roles: {
        data: RoleWithUsersCount[];
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

export default function RolesPage({ roles, filters }: RolesPageProps) {
    const breadcrumbs: BreadcrumbItem[] = [{ title: 'Roles', href: index().url }];

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
            <Head title="Roles Data" />

            <div className="">
                <div className="mb-6">
                    <Heading title="Roles Data" description="Manage roles and their permissions" />
                </div>
                <div className="mb-5 flex items-center justify-between">
                    <SearchInput placeholder="Search roles..." initialValue={filters.search || ''} />
                    <div>
                        <Button asChild>
                            <Link href={create().url} className="text-sm">
                                <Plus className="size-3" /> Add Role
                            </Link>
                        </Button>
                    </div>
                </div>
                {roles.data.length !== 0 ? (
                    <>
                        <div className="mb-5 rounded-md border">
                            <Table>
                                <TableHeader className="bg-muted/50">
                                    <TableRow className="hover:bg-transparent">
                                        <TableHead className="w-[100px]">#</TableHead>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Permissions</TableHead>
                                        <TableHead>Users</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {roles.data.map((role, index) => (
                                        <TableRow key={role.id} className="">
                                            <TableCell className="font-medium">{roles.from + index}</TableCell>
                                            <TableCell className="font-medium">{role.name}</TableCell>
                                            <TableCell>
                                                <div className="flex flex-wrap gap-1">
                                                    {role.permissions.length > 0 ? (
                                                        role.permissions.map((permission, index) => {
                                                            if (index > 3) return;

                                                            if (index === 3) {
                                                                return (
                                                                    <Badge key={permission.id} variant="secondary">
                                                                        + {role.permissions.length - 3}
                                                                    </Badge>
                                                                );
                                                            }

                                                            return (
                                                                <Badge key={permission.id} variant="secondary">
                                                                    {permission.name}
                                                                </Badge>
                                                            );
                                                        })
                                                    ) : (
                                                        <span className="text-sm text-muted-foreground">No permissions</span>
                                                    )}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <span className="flex items-center gap-2">
                                                    {role.users_count} <Users className="size-4" />
                                                </span>
                                            </TableCell>
                                            <TableCell className="space-x-2 text-right">
                                                <Link href={edit(role.id).url}>
                                                    <Button variant="outline" size="sm">
                                                        <Edit className="mr-1" />
                                                        Edit
                                                    </Button>
                                                </Link>
                                                <Button variant="destructive" className="" size="sm" onClick={() => handleDeleteModal(role.id)}>
                                                    <Trash2 className="mr-1" />
                                                    Delete
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>

                        <DataPagination data={roles} />
                    </>
                ) : (
                    <div className="rounded-md border">
                        <EmptyState
                            icon={Shield}
                            title="No roles found"
                            description="You haven't created any roles yet. Start by adding your first role to manage user permissions."
                            action={{
                                label: 'Add Role',
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
                                This action cannot be undone. This will permanently delete the role and remove it from our servers.
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
