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
import { create, destroy, edit, index } from '@/routes/categories';
import { BreadcrumbItem, Pagination } from '@/types';
import { Category } from '@/types/category';
import { Head, Link, router } from '@inertiajs/react';
import { Edit, FolderOpen, Loader2, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';

type CategoriesPageProps = {
    categories: Pagination<Category>;
    filters: {
        search?: string;
    };
};

export default function CategoriesPage({ categories, filters }: CategoriesPageProps) {
    const breadcrumb: BreadcrumbItem[] = [{ title: 'Categories', href: index().url }];

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
        <AppLayout breadcrumbs={breadcrumb}>
            <Head title="Categories Data" />

            <div className="">
                <div className="mb-6">
                    <Heading title="Categories Data" description="Manage and organize categories data" />
                </div>
                <div className="mb-5 flex items-center justify-between">
                    <SearchInput placeholder="Search categories..." initialValue={filters.search || ''} />
                    <div>
                        <Button asChild>
                            <Link href={create().url} className="text-sm">
                                <Plus className="size-3" /> Add Category
                            </Link>
                        </Button>
                    </div>
                </div>
                {categories.data.length !== 0 ? (
                    <>
                        <div className="mb-5 rounded-md border">
                            <Table>
                                <TableHeader className="bg-muted/50">
                                    <TableRow className="hover:bg-transparent">
                                        <TableHead className="w-[100px]">#</TableHead>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Description</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {categories.data.map((category, index) => (
                                        <TableRow key={category.id} className="">
                                            <TableCell className="font-medium">{categories.from + index}</TableCell>
                                            <TableCell>{category.name}</TableCell>
                                            <TableCell>{category.description}</TableCell>
                                            <TableCell>
                                                <Badge variant={category.is_active ? 'default' : 'secondary'}>
                                                    {category.is_active ? 'Active' : 'Inactive'}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="space-x-2 text-right">
                                                <Link href={edit(category.id).url}>
                                                    <Button variant="outline" size="sm">
                                                        <Edit className="mr-1" />
                                                        Edit
                                                    </Button>
                                                </Link>
                                                <Button variant="destructive" className="" size="sm" onClick={() => handleDeleteModal(category.id)}>
                                                    <Trash2 />
                                                    Delete
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>

                        <DataPagination data={categories} />
                    </>
                ) : (
                    <div className="rounded-md border">
                        <EmptyState
                            icon={FolderOpen}
                            title="No categories found"
                            description="You haven't created any categories yet. Start by adding your first category to organize your content."
                            action={{
                                label: 'Add Category',
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
                                This action cannot be undone. This will permanently delete your account and remove your data from our servers.
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
