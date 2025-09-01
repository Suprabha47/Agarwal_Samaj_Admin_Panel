import {  } from "react-redux";
import { Users, UserCheck,  } from "lucide-react";

export default function Card() {
  //const Classified = useSelector((state) => state.app.Classified);


  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 ">
      <Card1 
        title="Total Adds"
        count={'7'}
        icon={<Users className="w-7 h-7 text-gray-500" />}
      />
      <Card1
        title="Active Adds"
        count={'4'}
        icon={<UserCheck className="w-7 h-7 text-green-600" />}
      />
      <Card1
        title="Inactive Adds"
        count={'4'}
        icon={
          <img src="https://img.icons8.com/?size=100&id=23265&format=png&color=FA5252" alt="" className="size-7 "/>
        }
      />

      <Card1
        title="Total views"
        count={'290'}
        icon={<img src="https://img.icons8.com/?size=100&id=1uIrq1GnyXTi&format=png&color=1A1A1A" alt="" className="size-7" />}
      />
    </div>
  );
}

/* Card1 Component */
const Card1 = ({ title, count, icon }) => (
  <div className="bg-white p-6 rounded-xl shadow border-white flex justify-between items-center hover:scale-105 transition-transform ease-in-out duration-1000">
    <div>
      <h3 className="text-lg text-gray-500">{title}</h3>
      <p className="text-3xl font-bold mt-2">{count}</p>
    </div>
    {icon}
  </div>
);

