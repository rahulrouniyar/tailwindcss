import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <>
    <h1 className="text-3xl font-bold underline">
        Hello world!
      </h1>
      <div className="bg-brand-900 text-white">Hello Brand</div>
      <div className="bg-brand-800 text-white">Hello Brand</div>
      <div className="bg-brand-700 text-white">Hello Brand</div>
      <div className="bg-brand-600 text-white">Hello Brand</div>
      <div className="bg-brand-500 text-white">Hello Brand</div>
      <div className="bg-brand-400 text-white">Hello Brand</div>
      <div className="bg-brand-300 text-white">Hello Brand</div>
      <div className="bg-brand-200 text-white">Hello Brand</div>
      <div className="bg-brand-100 text-white">Hello Brand</div>
      {/* <div className="bg-grey-900 text-white">Hello grey</div>
      <div className="bg-grey-800 text-white">Hello grey</div>
      <div className="bg-grey-700 text-white">Hello grey</div>
      <div className="bg-grey-600 text-white">Hello grey</div>
      <div className="bg-grey-500 text-white">Hello grey</div>
      <div className="bg-grey-400 text-white">Hello grey</div>
      <div className="bg-grey-300 text-white">Hello grey</div>
      <div className="bg-grey-200 text-white">Hello grey</div>
      <div className="bg-grey-100 text-white">Hello grey</div>
      <div className="bg-accent-red-700 text-white">Hello red</div>
      <div className="bg-accent-red-600 text-white">Hello red</div>
      <div className="bg-accent-red-500 text-white">Hello red</div>
      <div className="bg-accent-red-400 text-white">Hello red</div>
      <div className="bg-accent-red-300 text-white">Hello red</div>
      <div className="bg-accent-red-200 text-white">Hello red</div>
      <div className="bg-accent-red-100 text-white">Hello red</div> */}
      <div>
        <Button intent="primary" size="large" className='my-5'>
          Delete Action
        </Button>
      </div>
      <div>
        <Button intent="primary" size="medium" className='my-5'>
          Delete Action
        </Button>
      </div>
      <div>
        <Button intent="primary" size="small" className='my-5'>
          Delete Action
        </Button>
      </div>
    </>
  );
}
