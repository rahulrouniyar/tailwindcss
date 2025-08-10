import { Metadata } from 'next';
import CategoryForm from '@/components/categories/CategoryForm'

export const metadata: Metadata = {
  title: 'View Category'

}

type Props = {
    params: {
      id: string;
    };
};

export default async function CategoryDetailPage({ params }: { params: { id: string } }) {
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
  
    return (
        <>
            <h2 className='h2-bold'>Category Detail</h2>
            <div className='my-8'>
                <CategoryForm
                type="Detail"
                category={category}
                categoryID={id}
                />
            </div>
        </>
    );
  }
// export default {CreateCategoryPage};