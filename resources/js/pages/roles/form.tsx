import { FormField, FormInput } from '@/components/form-field';
import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { index, store, update } from '@/routes/roles';
import { BreadcrumbItem } from '@/types';
import { Permission, Role } from '@/types/role';
import { Form, Head, Link } from '@inertiajs/react';
import { ArrowLeft, Loader2, Save } from 'lucide-react';

type RolesFormProps = {
    role?: Role;
    permissions: Permission[];
};

export default function RolesForm({ role, permissions }: RolesFormProps) {
    const isEditing = !!role;
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Roles', href: index().url },
        { title: isEditing ? 'Edit Role' : 'Create Role', href: isEditing ? (update(role.id).url as string) : (store().url as string) },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={isEditing ? 'Edit Role' : 'Create Role'} />

            <div className="mb-4">
                <Heading
                    title={isEditing ? 'Edit Role' : 'Create Role'}
                    description={isEditing ? 'Edit the role details and permissions below' : 'Add a new role with specific permissions'}
                />
            </div>

            <Card>
                <CardContent>
                    <Form {...(isEditing ? update.form(role.id) : store.form())}>
                        {({ errors, processing }) => (
                            <>
                                <div className="space-y-6">
                                    {/* Name Field */}
                                    <FormInput
                                        type="text"
                                        id="name"
                                        name="name"
                                        label="Role Name"
                                        required
                                        placeholder="Enter role name..."
                                        defaultValue={role?.name || ''}
                                        error={errors.name}
                                    />

                                    {/* Permissions Field */}
                                    <FormField id="permissions" label="Permissions" error={errors.permissions}>
                                        <div className="mt-2 space-y-3">
                                            <p className="text-sm text-muted-foreground">Select the permissions this role should have:</p>
                                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                                                {permissions.map((permission) => (
                                                    <div key={permission.id} className="flex items-center space-x-2">
                                                        <Checkbox
                                                            id={`permission-${permission.id}`}
                                                            name="permissions[]"
                                                            value={permission.id}
                                                            defaultChecked={role?.permissions?.some((p) => p.id === permission.id) || false}
                                                        />
                                                        <Label htmlFor={`permission-${permission.id}`} className="cursor-pointer text-sm font-normal">
                                                            {/* {permission.name.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())} */}
                                                            {permission.name}
                                                        </Label>
                                                    </div>
                                                ))}
                                            </div>
                                            {permissions.length === 0 && (
                                                <p className="text-sm text-muted-foreground italic">
                                                    No permissions available. Please create some permissions first.
                                                </p>
                                            )}
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
                                                {isEditing ? 'Update Role' : 'Create Role'}
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
