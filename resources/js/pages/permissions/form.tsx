import { FormInput } from '@/components/form-field';
import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { index, store, update } from '@/routes/permissions';
import { BreadcrumbItem } from '@/types';
import { Permission } from '@/types/permission';
import { Form, Head, Link } from '@inertiajs/react';
import { ArrowLeft, Loader2, Save } from 'lucide-react';

type PermissionsFormProps = {
    permission?: Permission;
};

export default function PermissionsForm({ permission }: PermissionsFormProps) {
    const isEditing = !!permission;
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Permissions', href: index().url },
        {
            title: isEditing ? 'Edit Permission' : 'Create Permission',
            href: isEditing ? (update(permission.id).url as string) : (store().url as string),
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={isEditing ? 'Edit Permission' : 'Create Permission'} />

            <div className="mb-4">
                <Heading
                    title={isEditing ? 'Edit Permission' : 'Create Permission'}
                    description={isEditing ? 'Edit the permission details below' : 'Add a new permission'}
                />
            </div>

            <Card>
                <CardContent>
                    <Form {...(isEditing ? update.form(permission.id) : store.form())}>
                        {({ errors, processing }) => (
                            <>
                                <div className="space-y-6">
                                    {/* Name Field */}
                                    <FormInput
                                        type="text"
                                        id="name"
                                        name="name"
                                        label="Permission Name"
                                        required
                                        placeholder="Enter permission name (e.g., create-users, edit-posts)..."
                                        defaultValue={permission?.name || ''}
                                        error={errors.name}
                                    />
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
                                                {isEditing ? 'Update Permission' : 'Create Permission'}
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
