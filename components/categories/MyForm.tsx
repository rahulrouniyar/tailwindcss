// MyForm.tsx
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { categorySchema, CategoryInput } from '@/lib/validations/validation-schema';

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
// import { toast } from "sonner";
// import { toast as sonnerToast } from 'sonner';

import { toast } from "@/lib/sonner";

// export default function MyForm() {
//   const form = useForm<CategoryInput>({
//     mode: "onChange",
//     defaultValues: {
//       name: "",
//       slug: "",
//       description: "",
//     },
//     resolver: zodResolver(categorySchema),
//   });

//   const fields = {
//     name: { id: 'name', label: 'Name' },
//     slug: { id: 'slug', label: 'Slug' },
//     description: { id: 'description', label: 'Description' }
//   };

//   const [serverError, setServerError] = useState('');
//   const [successMessage, setSuccessMessage] = useState('');

//   const onSubmit = async (data: CategoryInput) => {
//     console.log("submit");
//     try {
//       const res = await fetch('http://localhost:8000/api/categories/', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(data),
//       });

//       const result = await res.json();

//       if (!res.ok) {
//         Object.keys(fields).forEach((key) => {
//           const fieldError = result.errors?.[key];
//           if (fieldError) {
//             form.setError(key as keyof typeof fields, {
//               type: "server",
//               message: fieldError,
//             });
//           }
//         });
//         // console.log("Error");
//         return;
//       }

      
//       form.reset(); 
//       console.log('no error');

      
//     // toast.success("Category created", {
//     //   description: "Your category was successfully saved.",
//     // });
//     // toast.success("Success!", {
//     //   description: "Saved successfully.",
//     //   // className: "border-l-4 border-primary bg-primary/10 text-primary",
//     // });
//       toast({
//         title: 'This is a headless toast',
//         description: 'You have full control of styles and jsx, while still having the animations.',
//         // button: {
//         //   label: 'Reply',
//         //   onClick: () => sonnerToast.dismiss(),
//         // },
//       });
//       // toast('me');
//     } catch (error) {
//       // form.setError('root', {
//       //   type: 'server',
//       //   message: 'Internal server error. Please refresh and try again.',
//       // });

//       toast({
//         title: 'This is a headless toast',
//         description: 'You have full control of styles and jsx, while still having the animations.',
//         // button: {
//         //   label: 'Reply',
//         //   onClick: () => sonnerToast.dismiss(),
//         // },
//       });
//     }
//   };

//   const { isSubmitted } = form.formState;
//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 max-w-md mx-auto">

//         <FormField
//           control={form.control}
//           name="name"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Name</FormLabel>
//               <FormControl>
//                 <Input placeholder="Kurta suruwal" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <FormField
//           control={form.control}
//           name="slug"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Slug</FormLabel>
//               <FormControl>
//                 <Input placeholder="kurta-suruwal" {...field} />
//               </FormControl>
//               {/* <FormMessage /> */}
//               {/* Custom FormMessage */}
//               {form.formState.errors.slug && (
//                 <ul className="text-sm font-medium text-destructive mt-1 space-y-1">
//                   {Array.isArray(form.formState.errors.slug.message)
//                     ? form.formState.errors.slug.message
//                         .filter((msg) =>
//                           msg === "Slug is required" ? isSubmitted : true
//                         )
//                         .map((msg, i) => <li key={i}>{msg}</li>)
//                     : (form.formState.errors.slug.message === "Slug is required" &&
//                       !isSubmitted)
//                     ? null
//                     : <li>{form.formState.errors.slug.message}</li>}
//                 </ul>
//               )}
//             </FormItem>
//           )}
//         />

//         <FormField
//           control={form.control}
//           name="description"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Description</FormLabel>
//               <FormControl>
//                 <Textarea
//                   {...field} 
//                   placeholder="Type your message here."
//                   className="resize-none"
//                 />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         {serverError && <p className="text-red-600 text-sm">{serverError}</p>}
//         {successMessage && <p className="text-green-600 text-sm">{successMessage}</p>}
// {/* 
//         {form.formState.errors.root && (
//           <p className="text-sm font-medium text-destructive">
//             {form.formState.errors.root.message}
//           </p>
//         )} */}


//         <Button type="submit">Submit</Button>
//       </form>
//     </Form>
//   );
// }

export default function Headless() {
  return (
    <button
      className="relative flex h-10 flex-shrink-0 items-center justify-center gap-2 overflow-hidden rounded-full bg-white px-4 text-sm font-medium shadow-sm transition-all hover:bg-[#FAFAFA] dark:bg-[#161615] dark:hover:bg-[#1A1A19] dark:text-white"
      onClick={() => {
        toast({
          title: 'This is a headless toast',
          description: 'You have full control of styles and jsx, while still having the animations.',
        });
      }}
    >
      Render toast
    </button>
  );
}

