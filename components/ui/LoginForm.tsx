// components/LoginForm.tsx
'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type FormData = z.infer<typeof schema>;

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    console.log('Form Data:', data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-sm mx-auto">
      <div>
        <label htmlFor="username" className="block mb-1 font-medium">
          Username
        </label>
        <input
          id="username"
          {...register('username')}
          className="border px-2 py-1 w-full"
        />
        {errors.username && (
          <p className="text-red-600 text-sm mt-1">{errors.username.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="password" className="block mb-1 font-medium">
          Password
        </label>
        <input
          id="password"
          type="password"
          {...register('password')}
          className="border px-2 py-1 w-full"
        />
        {errors.password && (
          <p className="text-red-600 text-sm mt-1">{errors.password.message}</p>
        )}
      </div>

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Submit
      </button>
    </form>
  );
}
