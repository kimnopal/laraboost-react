import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { Pencil, Trash } from 'lucide-react';

export default function CategoriesPage() {
    return (
        <AppLayout>
            <div>
                <div className="mb-4">
                    <h1 className="text-2xl font-bold">Categories Data</h1>
                </div>
                <Card>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow className="hover:bg-transparent">
                                    <TableHead className="w-[100px]">Invoice</TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Method</TableHead>
                                    <TableHead>Amount</TableHead>
                                    <TableHead className="text-right">Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow className="hover:bg-transparent">
                                    <TableCell className="font-medium">INV001</TableCell>
                                    <TableCell>Paid</TableCell>
                                    <TableCell>Credit Card</TableCell>
                                    <TableCell>$250.00</TableCell>
                                    <TableCell className="space-x-2 text-right">
                                        <Button variant="secondary" size="icon">
                                            <Pencil />
                                        </Button>
                                        <Button variant="destructive" className="text-destructive-foreground" size="icon">
                                            <Trash />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
