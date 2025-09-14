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
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { create, destroy, edit, index } from '@/routes/permissions';
import { BreadcrumbItem, Link as LinkType } from '@/types';
import { Permission } from '@/types/permission';
import { Head, Link, router } from '@inertiajs/react';
import { Edit, Loader2, Plus, Shield, Trash2 } from 'lucide-react';
import { useState } from 'react';

type PermissionsPageProps = {
    permissions: {
        data: Permission[];
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

export default function PermissionsPage({ permissions, filters }: PermissionsPageProps) {
    const breadcrumbs: BreadcrumbItem[] = [{ title: 'Permissions', href: index().url }];

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
            <Head title="Permissions Data" />

            <div className="">
                <div className="mb-6">
                    <Heading title="Permissions Data" description="Manage system permissions" />
                </div>
                <div className="mb-5 flex items-center justify-between">
                    <SearchInput placeholder="Search permissions..." initialValue={filters.search || ''} />
                    <div>
                        <Button asChild>
                            <Link href={create().url} className="text-sm">
                                <Plus className="size-3" /> Add Permission
                            </Link>
                        </Button>
                    </div>
                </div>
                {permissions.data.length !== 0 ? (
                    <>
                        <div className="mb-5 rounded-md border">
                            <Table>
                                <TableHeader className="bg-muted/50">
                                    <TableRow className="hover:bg-transparent">
                                        <TableHead className="w-[100px]">#</TableHead>
                                        <TableHead>Name</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {permissions.data.map((permission, index) => (
                                        <TableRow key={permission.id} className="">
                                            <TableCell className="font-medium">{permissions.from + index}</TableCell>
                                            <TableCell>{permission.name}</TableCell>
                                            <TableCell className="space-x-2 text-right">
                                                <Link href={edit(permission.id).url}>
                                                    <Button variant="outline" size="sm">
                                                        <Edit className="mr-1" />
                                                        Edit
                                                    </Button>
                                                </Link>
                                                <Button variant="destructive" className="" size="sm" onClick={() => handleDeleteModal(permission.id)}>
                                                    <Trash2 className="mr-1" />
                                                    Delete
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>

                        <DataPagination data={permissions} />
                    </>
                ) : (
                    <div className="rounded-md border">
                        <EmptyState
                            icon={Shield}
                            title="No permissions found"
                            description="You haven't created any permissions yet. Start by adding your first permission to manage system access."
                            action={{
                                label: 'Add Permission',
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
                                This action cannot be undone. This will permanently delete the permission and remove it from our servers.
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
