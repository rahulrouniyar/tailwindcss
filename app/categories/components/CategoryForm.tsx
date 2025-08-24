'use client';

import { ControllerRenderProps, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CategorySchema, CategoryInput } from '@/lib/validations/validation-schema';
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

  // const method = {
  //   'Create': 'POST',
  //   'Update': 'PUT',
  //   'Detail': 'GET'
  // };

  const router = useRouter();
  const isReadOnly = type === "Detail";
  const form = useForm<CategoryInput>({
    mode: "onChange",
    defaultValues: category && type === 'Update' || type === 'Detail'? category: {
      name: "",
      slug: "",
      description: "",
    },
    resolver: zodResolver(CategorySchema),
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
