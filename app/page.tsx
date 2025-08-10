// import { Button } from '@/components/ui/button';
// import {Header} from './header';

// export default function Home() {
//   return (
//     <>
//     <Header label="Header"/>
//     <h1 className="text-3xl font-bold underline">
//         Hello world!
//       </h1>
//       <div className="bg-brand-900 text-white">Hello Brand</div>
//       <div className="bg-brand-800 text-white">Hello Brand</div>
//       <div className="bg-brand-700 text-white">Hello Brand</div>
//       <div className="bg-brand-600 text-white">Hello Brand</div>
//       <div className="bg-brand-500 text-white">Hello Brand</div>
//       <div className="bg-brand-400 text-white">Hello Brand</div>
//       <div className="bg-brand-300 text-white">Hello Brand</div>
//       <div className="bg-brand-200 text-white">Hello Brand</div>
//       <div className="bg-brand-100 text-white">Hello Brand</div>
//       {/* <div className="bg-grey-900 text-white">Hello grey</div>
//       <div className="bg-grey-800 text-white">Hello grey</div>
//       <div className="bg-grey-700 text-white">Hello grey</div>
//       <div className="bg-grey-600 text-white">Hello grey</div>
//       <div className="bg-grey-500 text-white">Hello grey</div>
//       <div className="bg-grey-400 text-white">Hello grey</div>
//       <div className="bg-grey-300 text-white">Hello grey</div>
//       <div className="bg-grey-200 text-white">Hello grey</div>
//       <div className="bg-grey-100 text-white">Hello grey</div>
//       <div className="bg-accent-red-700 text-white">Hello red</div>
//       <div className="bg-accent-red-600 text-white">Hello red</div>
//       <div className="bg-accent-red-500 text-white">Hello red</div>
//       <div className="bg-accent-red-400 text-white">Hello red</div>
//       <div className="bg-accent-red-300 text-white">Hello red</div>
//       <div className="bg-accent-red-200 text-white">Hello red</div>
//       <div className="bg-accent-red-100 text-white">Hello red</div> */}
//       <div>
//         <Button intent="primary" size="large" className='my-5'>
//           Delete Action
//         </Button>
//       </div>
//       <div>
//         <Button intent="primary" size="medium" className='my-5'>
//           Delete Action
//         </Button>
//       </div>
//       <div>
//         <Button intent="primary" size="small" className='my-5'>
//           Delete Action
//         </Button>
//       </div>
//     </>
//   );
// }



'use client';

import React from 'react';
import { toast as sonnerToast } from 'sonner';

/** I recommend abstracting the toast function
 *  so that you can call it without having to use toast.custom everytime. */
function toast(toast: Omit<ToastProps, 'id'>) {
  return sonnerToast.custom((id) => (
    <Toast
      id={id}
      title={toast.title}
      description={toast.description}
      button={{
        label: toast.button.label,
        onClick: () => console.log('Button clicked'),
      }}
    />
  ));
}

/** A fully custom toast that still maintains the animations and interactions. */
function Toast(props: ToastProps) {
  const { title, description, button, id } = props;

  return (
    <div className="flex rounded-lg bg-white shadow-lg ring-1 ring-black/5 w-full md:max-w-[364px] items-center p-4">
      <div className="flex flex-1 items-center">
        <div className="w-full">
          <p className="text-sm font-medium text-gray-900">{title}</p>
          <p className="mt-1 text-sm text-gray-500">{description}</p>
        </div>
      </div>
      <div className="ml-5 shrink-0 rounded-md text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-hidden">
        <button
          className="rounded bg-indigo-50 px-3 py-1 text-sm font-semibold text-indigo-600 hover:bg-indigo-100"
          onClick={() => {
            button.onClick();
            sonnerToast.dismiss(id);
          }}
        >
          {button.label}
        </button>
      </div>
    </div>
  );
}

export default function Headless() {
  return (
    <button
      className="relative flex h-10 flex-shrink-0 items-center justify-center gap-2 overflow-hidden rounded-full bg-white px-4 text-sm font-medium shadow-sm transition-all hover:bg-[#FAFAFA] dark:bg-[#161615] dark:hover:bg-[#1A1A19] dark:text-white"
      onClick={() => {
        toast({
          title: 'This is a headless toast',
          description: 'You have full control of styles and jsx, while still having the animations.',
          button: {
            label: 'Reply',
            onClick: () => sonnerToast.dismiss(),
          },
        });
      }}
    >
      Render toast
    </button>
  );
}

interface ToastProps {
  id: string | number;
  title: string;
  description: string;
  button: {
    label: string;
    onClick: () => void;
  };
}
