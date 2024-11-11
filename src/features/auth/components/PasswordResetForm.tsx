import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { authApi } from '../../../lib/api';

const resetSchema = z.object({
  email: z.string().email('Invalid email address'),
});

type ResetFormData = z.infer<typeof resetSchema>;

export function PasswordResetForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<ResetFormData>({
    resolver: zodResolver(resetSchema),
  });

  const resetMutation = useMutation({
    mutationFn: (email: string) => authApi.resetPassword(email),
  });

  const onSubmit = (data: ResetFormData) => {
    resetMutation.mutate(data.email);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email address
        </label>
        <input
          {...register('email')}
          id="email"
          type="email"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="Enter your email"
        />
        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
      </div>

      <div>
        <button
          type="submit"
          disabled={resetMutation.isPending}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {resetMutation.isPending ? 'Sending...' : 'Reset Password'}
        </button>
      </div>

      {resetMutation.isSuccess && (
        <div className="text-sm text-green-600 text-center">
          Check your email for reset instructions
        </div>
      )}

      <div className="text-sm text-center">
        <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
          Back to login
        </Link>
      </div>
    </form>
  );
}