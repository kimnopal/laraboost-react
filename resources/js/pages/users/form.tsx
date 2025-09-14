import { FormField, FormInput } from '@/components/form-field';
import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { index, store, update } from '@/routes/users';
import { BreadcrumbItem } from '@/types';
import { Role } from '@/types/role';
import { User } from '@/types/user';
import { Form, Head, Link } from '@inertiajs/react';
import { ArrowLeft, Loader2, Save } from 'lucide-react';

type UserFormProps = {
    user?: User & {
        roles: Array<{
            id: number;
            name: string;
        }>;
    };
    roles: Role[];
};

export default function UserForm({ user, roles }: UserFormProps) {
    const isEditing = !!user;
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Users', href: index().url },
        { title: isEditing ? 'Edit User' : 'Create User', href: '#' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={isEditing ? 'Edit User' : 'Create User'} />

            <div className="mb-4">
                <Heading
                    title={isEditing ? 'Edit User' : 'Create User'}
                    description={isEditing ? 'Update user information and roles below' : 'Add a new user with specific roles'}
                />
            </div>

            <Card>
                <CardContent>
                    <Form {...(isEditing ? update.form(user.id) : store.form())}>
                        {({ errors, processing }) => (
                            <>
                                <div className="space-y-6">
                                    {/* Name and Email Fields */}
                                    <FormInput
                                        type="text"
                                        id="name"
                                        name="name"
                                        label="Name"
                                        required
                                        placeholder="Enter name..."
                                        defaultValue={user?.name || ''}
                                        error={errors.name}
                                    />

                                    <FormInput
                                        type="email"
                                        id="email"
                                        name="email"
                                        label="Email Address"
                                        required
                                        placeholder="Enter email address..."
                                        defaultValue={user?.email || ''}
                                        error={errors.email}
                                    />

                                    {/* Password Field */}
                                    <FormInput
                                        type="password"
                                        id="password"
                                        name="password"
                                        label="Password"
                                        required={!isEditing}
                                        placeholder={isEditing ? 'Leave blank to keep current password' : 'Enter password...'}
                                        helpText={isEditing ? 'Leave blank to keep current password' : 'Password must be at least 8 characters'}
                                        error={errors.password}
                                    />

                                    {/* Roles Field */}
                                    <FormField id="roles" label="Roles" error={errors.roles}>
                                        <div className="mt-2 space-y-3">
                                            <p className="text-sm text-muted-foreground">Select the roles this user should have:</p>
                                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                                                {roles.map((role) => (
                                                    <div key={role.id} className="flex items-center space-x-2">
                                                        <Checkbox
                                                            id={`role-${role.id}`}
                                                            name="roles[]"
                                                            value={role.id}
                                                            defaultChecked={user?.roles?.some((r) => r.id === role.id) || false}
                                                        />
                                                        <Label htmlFor={`role-${role.id}`} className="cursor-pointer text-sm font-normal">
                                                            {role.name}
                                                        </Label>
                                                    </div>
                                                ))}
                                            </div>
                                            {roles.length === 0 && (
                                                <p className="text-sm text-muted-foreground italic">
                                                    No roles available. Please create some roles first.
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
                                                {isEditing ? 'Update User' : 'Create User'}
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
