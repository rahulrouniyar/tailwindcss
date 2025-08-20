'use client';

import { ControllerRenderProps, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ProductSchema, ProductInput } from '@/lib/validation-schema';
import { toast } from '@/lib/sonner';
import { toast as sonnerToast } from 'sonner';
import { CategorySelect } from './CategoryDropdown';

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

export default function ProductForm({ type, product, productID }:
  {
    type: 'Create' | 'Update' | 'Detail';
    product?: Partial<ProductInput>;
    productID?: string;
  }
) {

  const router = useRouter();
  const isReadOnly = type === "Detail";
  const form = useForm<ProductInput>({
    mode: "onChange",
    defaultValues: product && (type === 'Update' || type === 'Detail') ? product : {
      name: "",
      slug: "",
      description: "",
      base_price: "",
      category: "",
    },
    resolver: zodResolver(ProductSchema),
  });

  const fields = {
    name: { id: 'name', label: 'Name' },
    slug: { id: 'slug', label: 'Slug' },
    description: { id: 'description', label: 'Description' },
    base_price: { id: 'base_price', label: 'Base Price' },
    category: { id: 'category', label: 'Category ID' },
    detail: {id: 'detail', label: 'Detail'}
  };

  const handleEditClick = () => {
    if (!productID) return;
    router.push(`/products/${productID}/edit`);
  };

  const onSubmit: SubmitHandler<ProductInput> = async (data: ProductInput) => {
    console.log(data);
    try {
      const res = await fetch(`http://localhost:8000/api/products/${type === 'Update' ? productID + '/' : ''}`, {
        method: type === 'Update' ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();
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
        description: type === 'Create' ? 'New product created successfully.' : 'Product updated successfully.',
        variant: 'success',
        button: {
          label: 'Close',
          onClick: () => sonnerToast.dismiss(),
        },
      });
      form.reset();
      router.push('/products');

    } catch (error) {
      toast({
        title: 'Submission failed!',
        description: `Could not ${type === 'Create' ? 'create' : 'update'} the product.`,
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
          render={({ field }: { field: ControllerRenderProps<ProductInput, 'name'> }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Rajasthani Lehenga" {...field} className="disabled:cursor-default" disabled={isReadOnly} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="slug"
          render={({ field }: { field: ControllerRenderProps<ProductInput, 'slug'> }) => (
            <FormItem>
              <FormLabel>Slug</FormLabel>
              <FormControl>
                <Input placeholder="rajasthani-lehenga" {...field} className="disabled:cursor-default" disabled={isReadOnly} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }: { field: ControllerRenderProps<ProductInput, 'description'> }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Product description here."
                  className="resize-none disabled:bg-white disabled:text-black disabled:cursor-default"
                  disabled={isReadOnly}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

<FormField
          control={form.control}
          name="detail"
          render={({ field }: { field: ControllerRenderProps<ProductInput, 'detail'> }) => (
            <FormItem>
              <FormLabel>Detail</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Product description here."
                  className="resize-none disabled:bg-white disabled:text-black disabled:cursor-default"
                  disabled={isReadOnly}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="base_price"
          render={({ field }: { field: ControllerRenderProps<ProductInput, 'base_price'> }) => (
            <FormItem>
              <FormLabel>Base Price</FormLabel>
              <FormControl>
                <Input placeholder="123.00" {...field} type="number" className="disabled:cursor-default" disabled={isReadOnly} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* <FormField
          control={form.control}
          name="category"
          render={({ field }: { field: ControllerRenderProps<ProductInput, 'category'> }) => (
            <FormItem>
              <FormLabel>Category ID</FormLabel>
              <FormControl>
                <Input placeholder="1" {...field} type="text" className="disabled:cursor-default" disabled={isReadOnly} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <CategorySelect
                  value={field.value}
                  onChange={field.onChange}
                  disabled={isReadOnly}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {type !== 'Detail' && <Button type="submit">{`${type} Product`}</Button>}
        {type === 'Detail' && (
          <Button type="button" onClick={handleEditClick}>
            Edit
          </Button>
        )}
      </form>
    </Form>
  );
}
