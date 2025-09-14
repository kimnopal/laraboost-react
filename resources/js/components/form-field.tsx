import InputError from '@/components/input-error';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ReactNode } from 'react';

interface FormFieldProps {
    id: string;
    label: string;
    required?: boolean;
    error?: string;
    helpText?: string;
    children?: ReactNode;
}

interface FormInputProps extends FormFieldProps {
    type?: string;
    name: string;
    placeholder?: string;
    defaultValue?: string;
}

export function FormField({ id, label, required = false, error, helpText, children }: FormFieldProps) {
    return (
        <div className="space-y-3">
            <Label htmlFor={id}>
                {label} {required && <span className="text-destructive">*</span>}
            </Label>
            <div className="space-y-1">
                {children}
                {error && (
                    <div className="flex items-center gap-2">
                        <InputError message={error} />
                    </div>
                )}
            </div>
            {helpText && !error && <p className="text-xs text-muted-foreground">{helpText}</p>}
        </div>
    );
}

export function FormInput({ id, label, required = false, error, helpText, type = 'text', name, placeholder, defaultValue = '' }: FormInputProps) {
    return (
        <FormField id={id} label={label} required={required} error={error} helpText={helpText}>
            <Input
                type={type}
                id={id}
                name={name}
                placeholder={placeholder}
                defaultValue={defaultValue}
                className={error ? 'border-destructive' : ''}
            />
        </FormField>
    );
}
