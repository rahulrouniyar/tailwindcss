import { Metadata } from 'next';
import CategoryForm from '@/components/categories/CategoryForm'

export const metadata: Metadata = {
  title: 'Create Category'

}

export default function CreateCategoryPage() {
  return (
    <>
      <h2 className='h2-bold'>Create Category</h2>
      <div className='my-8'>
        <CategoryForm type='Create'/>
      </div>
    </>
  );
}
// export default {CreateCategoryPage};