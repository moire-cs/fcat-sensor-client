import { Header } from '@/components/ui/header';
import { useState } from 'react';

export const Dashboard = () => {
  const [data, setData] = useState([]);

  return (
    <>
      <Header />
      <div className="flex justify-center">
        <div className=" w-5/6">
          <h1
            className="font-bold italic tracking-tighter text-4xl pt-8"
            style={{ fontFamily: 'Franklin Gothic ATF' }}
          >
            Dashboard
          </h1>
        </div>
      </div>
    </>
  );
};
