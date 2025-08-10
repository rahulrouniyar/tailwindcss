// // components/CategoryForm.tsx
// 'use client';

// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { useState } from 'react';
// import InputField from '@/components/ui/FormField';

// import { z } from 'zod';

// export const categorySchema = z.object({
//   name: z.string().min(1, {error:'Name is required'}),
//   slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/,{ error:'Slug must be lowercase and hyphenated'}),
//   description: z.string().optional()
// });

// export type CategoryInput = z.infer<typeof categorySchema>;

// export default function CategoryForm() {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset,
//   } = useForm<CategoryInput>({
//     resolver: zodResolver(categorySchema),
//   });

//   const [serverError, setServerError] = useState('');
//   const [successMessage, setSuccessMessage] = useState('');

//   const onSubmit = async (data: CategoryInput) => {
//     setServerError('');
//     setSuccessMessage('');
//     // console.log(data);
//     try {
//       const res = await fetch('http://localhost:8000/api/categories/', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(data),
//       }); 

//       const result = await res.json();
//       // console.log(result);
//       if (!res.ok) {
//         setServerError(result.errors);
//         return;
//       }

//       setSuccessMessage(result.message);
//     //   console.log(result);
//       reset();
//     } catch (error) {
//       setServerError(error as string);
//     }
//   };
// //   console.log("hfhg");



//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md mx-auto">
//        <InputField
//         id="name"
//         label="Name"
//         register={register("name")}
//         error={errors}
//         serverError={serverError}
//       />

//       <InputField
//         id="description"
//         label="Description"
//         register={register("description")}
//         error={errors}
//         serverError={serverError}
//       />
// {/* 
//       <div>
//         <label htmlFor="slug" className="block mb-1 font-medium">
//           Slug
//         </label>
//         <input
//           id="slug"
//           {...register('slug')}
//           className="border px-2 py-1 w-full"
//         />
//         {errors.slug && <p className="text-red-600 text-sm">{errors.slug.message}</p>}
//         {serverError.slug && <p className="text-red-600 text-sm">{serverError.slug}</p>}
//       </div> */}

//         <InputField
//           id="slug"
//           label="Slug"
//           register={register('slug')}
//           error={errors}
//           serverError={serverError}
//        />


//       {/* {serverError && <p className="text-red-600 text-sm">{serverError}</p>} */}
//       {successMessage && <p className="text-green-600 text-sm">{successMessage}</p>}

//       <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded" onClick={handleSubmit(onSubmit)}>
//         Submit
//       </button>
//     </form>
//   );
// }


// MyForm.tsx
'use client';

import { ControllerRenderProps, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { insertCategorySchema, updateCategorySchema, CategoryInput } from '@/lib/validation-schema';
import { toast } from '@/lib/sonner';
import {toast as sonnerToast} from 'sonner';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useRouter } from 'next/navigation';

export default function CategoryForm({type, category, categoryID}:
  {
    type: 'Create' | 'Update' | 'Detail';
    category?: object;
    categoryID?: string;
  })
{

  const method = {
    'Create': 'POST',
    'Update': 'PUT',
    'Detail': 'GET'
  };

  const router = useRouter();
  const isReadOnly = type === "Detail";
  const form = useForm<CategoryInput>({
    mode: "onChange",
    defaultValues: category && type === 'Update' || type === 'Detail'? category: {
      name: "",
      slug: "",
      description: "",
    },
    resolver: zodResolver(type ==='Update' ? updateCategorySchema: insertCategorySchema),
  });

  const fields = {
    name: { id: 'name', label: 'Name' },
    slug: { id: 'slug', label: 'Slug' },
    description: { id: 'description', label: 'Description' }
  };

  const handleEditClick = () => {
    if (!categoryID) return;
    // Pass the current category data in the URL query
    router.push(`/categories/${categoryID}/edit`);
  };



  const onSubmit:SubmitHandler<CategoryInput> = async (data: CategoryInput) => {
    console.log('here1');
    try {
      const res = await fetch(`http://localhost:8000/api/categories/${type === 'Update'? categoryID + '/': ''}`, {
        method: type === 'Update'? 'PUT': 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      console.log('here');
      if (!res.ok) {
        Object.keys(fields).forEach((key) => {
          const fieldError = result.errors?.[key];
          if (fieldError) {
            form.setError(key as keyof typeof fields, {
              type: "server",
              message: fieldError,
            });
          }
        });
        return;
      }

      toast({
        title: 'Submission successful!',
        description: 'New category created successfully.',
        variant: 'success',
        button: {
          label: 'Close',
          onClick: () => sonnerToast.dismiss(),
        },
      });
      form.reset();
      router.push('/categories');

    }
    catch (error) {
      toast({
        title: 'Submission failed!',
        description: 'Could not create the category.',
        variant: 'warning',
        button: {
          label: 'Close',
          onClick: () => sonnerToast.dismiss(),
        },
      });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={type !== 'Detail' ? form.handleSubmit(onSubmit) : undefined}
        className="space-y-4 max-w-md mx-auto"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }:{field: ControllerRenderProps<CategoryInput, 'name'>}) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Kurta suruwal" {...field} className="disabled:cursor-default" disabled={isReadOnly} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="slug"
          render={({ field }:{field: ControllerRenderProps<CategoryInput, 'slug'>}) => (
            <FormItem>
              <FormLabel>Slug</FormLabel>
              <FormControl>
                <Input placeholder="kurta-suruwal" {...field} className="disabled:cursor-default" disabled={isReadOnly}/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }:{field: ControllerRenderProps<CategoryInput, 'description'>}) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Type your message here."
                  className="resize-none disabled:bg-white disabled:text-black disabled:cursor-default"
                  disabled={isReadOnly}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {type != 'Detail' && <Button type="submit">{`${type} Category`}</Button>}
        {type === 'Detail' && (
        <Button type="button" onClick={handleEditClick}>
          Edit
        </Button>
      )}
      </form>
    </Form>
  );
}
