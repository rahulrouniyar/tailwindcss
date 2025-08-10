import { Metadata } from 'next';
import CategoryForm from '@/components/categories/CategoryForm'

export const metadata: Metadata = {
  title: 'Edit Category'

}

type Props = {
    params: {
      id: string;
    };
};

export default async function CategoryEditPage({ params }: { params: { id: string } }) {
    const {id} = await params;

    const res = await fetch(`http://localhost:8000/api/categories/${id}`, {
      method: "GET",
      cache: "no-store", // ensure fresh data each request
    });
  
    if (!res.ok) {
      // Handle not found or server error
      return <div>Failed to load category</div>;
    }
  
    const category = await res.json();
    console.log(category);
    return (
        <>
            <h2 className='h2-bold'>Edit Category</h2>
            <div className='my-8'>
                <CategoryForm
                type="Update"
                category={category}
                categoryID={id}
                />
            </div>
        </>
    );
  }