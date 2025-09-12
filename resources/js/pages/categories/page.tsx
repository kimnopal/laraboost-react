import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { create } from '@/routes/categories';
import { Category } from '@/types/category';
import { Link } from '@inertiajs/react';
import { Pencil, Plus, Search, Trash } from 'lucide-react';

type CategoriesPageProps = {
    categories: Category[];
};

export default function CategoriesPage({ categories }: CategoriesPageProps) {
    return (
        <AppLayout>
            <div>
                <div className="mb-5 flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Categories Data</h1>
                </div>
                {/* <Card> */}
                {/* <CardContent> */}
                <div className="mb-3 flex items-center justify-between">
                    <div className="relative w-full sm:w-64">
                        <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input placeholder="Search categories..." className="pl-9" />
                    </div>
                    <div>
                        <Button asChild size="sm">
                            <Link href={create().url} className="text-sm">
                                <Plus className="size-3" /> Add Category
                            </Link>
                        </Button>
                    </div>
                </div>
                <div className="rounded-md border">
                    <Table>
                        <TableHeader className="bg-muted/50">
                            <TableRow className="hover:bg-transparent">
                                <TableHead className="w-[100px]">ID</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead className="text-right">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {categories.map((category) => (
                                <TableRow className="hover:bg-transparent">
                                    <TableCell className="font-medium">{category.id}</TableCell>
                                    <TableCell>{category.name}</TableCell>
                                    <TableCell className="space-x-2 text-right">
                                        <Button variant="secondary" size="sm">
                                            <Pencil className="size-3" />
                                        </Button>
                                        <Button variant="destructive" className="text-destructive-foreground" size="sm">
                                            <Trash className="size-3" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
                {/* </CardContent> */}
                {/* </Card> */}
            </div>
        </AppLayout>
    );
}
