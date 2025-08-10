'use client';

import { UseFormRegisterReturn, FieldErrors } from 'react-hook-form';

type InputFieldProps = {
  label: string;
  id: string;
  register: UseFormRegisterReturn;
  error?: FieldErrors<{
    name: string;
    slug: string;
}>;
  serverError?: Record<string, string>;
};

export default function InputField({ label, id, register, error, serverError }: InputFieldProps) {
  return (
    <div>
      <label htmlFor={id} className="block mb-1 font-medium">
        {label}
      </label>
      <input id={id} {...register} className="border px-2 py-1 w-full" />
      {error && <p className="text-red-600 text-sm">{error[id]?.message}</p>}
      {serverError[id] && <p className="text-red-600 text-sm">{serverError[id]}</p>}
      {console.log(error)}
    </div>
  );
}