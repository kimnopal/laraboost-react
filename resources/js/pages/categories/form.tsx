import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { index, store } from '@/routes/categories';
import { Form, Link } from '@inertiajs/react';
import { Loader2 } from 'lucide-react';

export default function CategoriesForm() {
    return (
        <AppLayout>
            <Form {...store.form()}>
                {({ errors, processing }) => (
                    <>
                        <div className="flex flex-col gap-2">
                            <Label>Name</Label>
                            <Input type="text" name="name" />
                            {errors.name && <InputError message={errors.name} />}
                        </div>
                        <div className="flex items-center gap-2">
                            <Button variant="outline" asChild>
                                <Link href={index().url}>Back</Link>
                            </Button>
                            <Button type="submit" disabled={processing}>
                                {processing && <Loader2 className="animate-spin" />} Save
                            </Button>
                        </div>
                    </>
                )}
            </Form>
        </AppLayout>
    );
}
