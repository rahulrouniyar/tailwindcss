import { Metadata } from 'next';
import ProductForm from '@/app/products/components/ProductForm'

export const metadata: Metadata = {
  title: 'Create Category'

}

export default function CreateProductPage() {
  return (
    <>
      <h2 className='h2-bold'>Create Product</h2>
      <div className='my-8'>
        <ProductForm type='Create'/>
      </div>
    </>
  );
}
// export default {CreateCategoryPage};