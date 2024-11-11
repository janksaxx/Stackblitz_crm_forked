import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';
import { countries } from '../../../lib/countries';

const signupSchema = z.object({
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  confirmPassword: z.string(),
  position: z.string().min(2, 'Position is required'),
  companyName: z.string().min(2, 'Company name is required'),
  website: z.string().url('Please enter a valid URL').optional(),
  employeeCount: z.enum(['1-10', '11-50', '51-200', '201-500', '501-1000', '1000+']),
  country: z.string().min(2, 'Country is required'),
  mobileNumber: z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Please enter a valid phone number'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type SignupFormData = z.infer<typeof signupSchema>;

interface SignupFormProps {
  onSubmit: (data: SignupFormData) => void;
}

export function SignupForm({ onSubmit }: SignupFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const inputClasses = "appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm";
  const labelClasses = "block text-sm font-medium text-gray-200 mb-1";
  const errorClasses = "text-red-500 text-xs mt-1";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Personal Information */}
        <div>
          <label htmlFor="firstName" className={labelClasses}>First Name</label>
          <input
            {...register('firstName')}
            id="firstName"
            type="text"
            className={inputClasses}
            placeholder="John"
          />
          {errors.firstName && <p className={errorClasses}>{errors.firstName.message}</p>}
        </div>

        <div>
          <label htmlFor="lastName" className={labelClasses}>Last Name</label>
          <input
            {...register('lastName')}
            id="lastName"
            type="text"
            className={inputClasses}
            placeholder="Doe"
          />
          {errors.lastName && <p className={errorClasses}>{errors.lastName.message}</p>}
        </div>

        <div>
          <label htmlFor="email" className={labelClasses}>Email Address</label>
          <input
            {...register('email')}
            id="email"
            type="email"
            className={inputClasses}
            placeholder="john@company.com"
          />
          {errors.email && <p className={errorClasses}>{errors.email.message}</p>}
        </div>

        <div>
          <label htmlFor="mobileNumber" className={labelClasses}>Mobile Number</label>
          <input
            {...register('mobileNumber')}
            id="mobileNumber"
            type="tel"
            className={inputClasses}
            placeholder="+1234567890"
          />
          {errors.mobileNumber && <p className={errorClasses}>{errors.mobileNumber.message}</p>}
        </div>

        {/* Company Information */}
        <div>
          <label htmlFor="companyName" className={labelClasses}>Company Name</label>
          <input
            {...register('companyName')}
            id="companyName"
            type="text"
            className={inputClasses}
            placeholder="Acme Inc."
          />
          {errors.companyName && <p className={errorClasses}>{errors.companyName.message}</p>}
        </div>

        <div>
          <label htmlFor="position" className={labelClasses}>Position</label>
          <input
            {...register('position')}
            id="position"
            type="text"
            className={inputClasses}
            placeholder="CEO"
          />
          {errors.position && <p className={errorClasses}>{errors.position.message}</p>}
        </div>

        <div>
          <label htmlFor="website" className={labelClasses}>Company Website</label>
          <input
            {...register('website')}
            id="website"
            type="url"
            className={inputClasses}
            placeholder="https://company.com"
          />
          {errors.website && <p className={errorClasses}>{errors.website.message}</p>}
        </div>

        <div>
          <label htmlFor="employeeCount" className={labelClasses}>Number of Employees</label>
          <select
            {...register('employeeCount')}
            id="employeeCount"
            className={inputClasses}
          >
            <option value="">Select size</option>
            <option value="1-10">1-10</option>
            <option value="11-50">11-50</option>
            <option value="51-200">51-200</option>
            <option value="201-500">201-500</option>
            <option value="501-1000">501-1000</option>
            <option value="1000+">1000+</option>
          </select>
          {errors.employeeCount && <p className={errorClasses}>{errors.employeeCount.message}</p>}
        </div>

        <div>
          <label htmlFor="country" className={labelClasses}>Country</label>
          <select
            {...register('country')}
            id="country"
            className={inputClasses}
          >
            <option value="">Select country</option>
            {countries.map((country) => (
              <option key={country.code} value={country.code}>
                {country.name}
              </option>
            ))}
          </select>
          {errors.country && <p className={errorClasses}>{errors.country.message}</p>}
        </div>

        {/* Password Fields */}
        <div>
          <label htmlFor="password" className={labelClasses}>Password</label>
          <input
            {...register('password')}
            id="password"
            type="password"
            className={inputClasses}
            placeholder="••••••••"
          />
          {errors.password && <p className={errorClasses}>{errors.password.message}</p>}
        </div>

        <div>
          <label htmlFor="confirmPassword" className={labelClasses}>Confirm Password</label>
          <input
            {...register('confirmPassword')}
            id="confirmPassword"
            type="password"
            className={inputClasses}
            placeholder="••••••••"
          />
          {errors.confirmPassword && <p className={errorClasses}>{errors.confirmPassword.message}</p>}
        </div>
      </div>

      <div>
        <button
          type="submit"
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Continue to Select Plan
        </button>
      </div>

      <div className="text-sm text-center">
        <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
          Already have an account? Sign in
        </Link>
      </div>
    </form>
  );
}