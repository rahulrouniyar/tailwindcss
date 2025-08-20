import { Metadata } from 'next';
import CategoryForm from '@/app/products/components/ProductForm'

export const metadata: Metadata = {
  title: 'Edit Product'

}

type Props = {
    params: {
      slug: string;
    };
};

export default async function CategoryEditPage({ params }: { params: { slug: string } }) {
    const {slug} = await params;

    const res = await fetch(`http://localhost:8000/api/products/${slug}`, {
      method: "GET",
      cache: "no-store", // ensure fresh data each request
    });
  
    if (!res.ok) {
      // Handle not found or server error
      return <div>Failed to load product</div>;
    }
  
    const product = await res.json();
    console.log(product);
    return (
        <>
            <h2 className='h2-bold'>Edit Product</h2>
            <div className='my-8'>
                <CategoryForm
                type="Update"
                product={product}
                productID={slug}
                />
            </div>
        </>
    );
  }