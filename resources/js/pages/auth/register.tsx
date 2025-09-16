import { RegisterForm } from '@/components/register-form';
import AuthLayout from '@/layouts/auth-layout';

export default function Login() {
    return (
        <AuthLayout>
            <RegisterForm />
        </AuthLayout>
    );
}
