import { AuthLayout } from '../components/AuthLayout';
import { PasswordResetForm } from '../components/PasswordResetForm';

export function PasswordResetPage() {
  return (
    <AuthLayout>
      <PasswordResetForm />
    </AuthLayout>
  );
}