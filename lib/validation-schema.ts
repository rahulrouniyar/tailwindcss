
// formSchema.ts
import { z } from 'zod';

export const CategorySchema = z.object({
  name: z.string()
  .min(1, {error:'Name is required'})
  .transform((val) => val.trim()),
  // slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/,{ error:'Slug must be lowercase and hyphenated'}),
  slug: z.string()
  .transform((val) => val.trim().toLowerCase())
  .superRefine((val, ctx) => {
    if (!val || val.trim() === '') {
      ctx.addIssue({
        code: "custom",
        message: 'Slug is required',
      });
    } else if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(val)) {
      ctx.addIssue({
        code: "custom",
        message: 'Slug must be lowercase and hyphenated',
      });
    }
  }),
  description: z.string().optional()
});

// For update operations, we don't need the id in the form data since it's passed separately
// export const updateCategorySchema = insertCategorySchema;




export const ProductSchema = z.object({
  name: z.string()
    .min(1, { message: 'Name is required' })
    .transform((val) => val.trim()),
  
  slug: z.string()
    .transform((val) => val.trim().toLowerCase())
    .superRefine((val, ctx) => {
      if (!val || val.trim() === '') {
        ctx.addIssue({
          code: "custom",
          message: 'Slug is required',
        });
      } else if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(val)) {
        ctx.addIssue({
          code: "custom",
          message: 'Slug must be lowercase and hyphenated',
        });
      }
    }),
  
  description: z.string().optional(),
  detail: z.string().optional(),
  
  // base_price: z.coerce.number(),
  base_price: z.string()
    .min(1, { message: 'Base price is required' })
    .regex(/^\d+(\.\d+)?$/, { message: 'Base price must be a valid number' }),
  // category: z.number()
  //   .refine(val => val === undefined || val === null, {
  //     message: 'Category ID is required',
  //   }),
  category: z.string()
});

export type ProductInput = z.infer<typeof ProductSchema>;


export type CategoryInput = z.infer<typeof CategorySchema>;
