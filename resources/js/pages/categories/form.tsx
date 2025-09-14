import { FormField, FormInput } from '@/components/form-field';
import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import AppLayout from '@/layouts/app-layout';
import { index, store, update } from '@/routes/categories';
import { BreadcrumbItem } from '@/types';
import { Category } from '@/types/category';
import { Form, Head, Link } from '@inertiajs/react';
import { ArrowLeft, Loader2, Save } from 'lucide-react';

type CategoriesFormProps = {
    category?: Category;
};

export default function CategoriesForm({ category }: CategoriesFormProps) {
    const isEditing = !!category;
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Categories', href: index().url },
        { title: isEditing ? 'Edit Category' : 'Create Category', href: isEditing ? (update(category.id).url as string) : (store().url as string) },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={isEditing ? 'Edit Category' : 'Create Category'} />

            <div className="mb-4">
                <Heading
                    title={isEditing ? 'Edit Category' : 'Create Category'}
                    description={isEditing ? 'Edit the category details below' : 'Add a new category'}
                />
            </div>

            <Card>
                <CardContent>
                    <Form {...(isEditing ? update.form(category.id) : store.form())}>
                        {({ errors, processing }) => (
                            <>
                                <div className="space-y-6">
                                    {/* Name Field */}
                                    <FormInput
                                        type="text"
                                        id="name"
                                        name="name"
                                        label="Name"
                                        required
                                        placeholder="Enter category name..."
                                        defaultValue={category?.name || ''}
                                        error={errors.name}
                                    />

                                    {/* Description Field */}
                                    <FormInput
                                        type="text"
                                        id="description"
                                        name="description"
                                        label="Description"
                                        required
                                        placeholder="Enter category description..."
                                        defaultValue={category?.description || ''}
                                        error={errors.description}
                                    />

                                    {/* Active Status */}
                                    <FormField id="is_active" label="Status" required error={errors.is_active}>
                                        <div className="flex items-center justify-between rounded-lg border p-4">
                                            <div className="space-y-1">
                                                <Label htmlFor="is_active" className="cursor-pointer text-sm font-medium">
                                                    Active Category
                                                </Label>
                                                <p className="text-xs text-muted-foreground">
                                                    When enabled, this category will be visible and available for use.
                                                </p>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <input type="hidden" name="is_active" value="false" />
                                                <Switch
                                                    id="is_active"
                                                    name="is_active"
                                                    value="true"
                                                    defaultChecked={category?.is_active ?? true}
                                                    className={errors.is_active ? 'border-destructive' : ''}
                                                />
                                            </div>
                                        </div>
                                    </FormField>
                                </div>

                                <div className="mt-8 flex items-center justify-between gap-4">
                                    <Button variant="outline" asChild className="min-w-24">
                                        <Link href={index().url}>
                                            <ArrowLeft className="size-4" />
                                            Back
                                        </Link>
                                    </Button>
                                    <Button type="submit" disabled={processing}>
                                        {processing ? (
                                            <>
                                                <Loader2 className="size-4 animate-spin" />
                                                {isEditing ? 'Updating...' : 'Creating...'}
                                            </>
                                        ) : (
                                            <>
                                                <Save className="size-4" />
                                                {isEditing ? 'Update Category' : 'Create Category'}
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </>
                        )}
                    </Form>
                </CardContent>
            </Card>
        </AppLayout>
    );
}
