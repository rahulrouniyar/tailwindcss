'use client';

import { useForm } from 'react-hook-form';

const items = ['Apple', 'Banana', 'Orange', 'Grapes', 'Pineapple'];

export default function SearchFilter() {
  const { register, watch } = useForm();
  const search = watch('search', '');

  const filtered = items.filter((item) =>
    item.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4">
      <input
        {...register('search')}
        placeholder="Search fruits..."
        className="border px-2 py-1 w-full mb-4"
      />

      <ul>
        {filtered.slice(0, 3).map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}


// import { useRef, useEffect } from 'react';

// export default function MyComponent() {
//   const inputRef = useRef(null);

//   useEffect(() => {
//     inputRef.current?.focus();
//   }, []);

//   return (
//     <div>
//       <input ref={inputRef} type="text" placeholder="Enter something" />
//       {/* <button onClick={handleClick}>Focus Input</button> */}
//     </div>
//   );
// }
