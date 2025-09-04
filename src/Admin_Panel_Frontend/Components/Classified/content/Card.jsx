import { useSelector } from "react-redux";
import { Users, UserCheck,  } from "lucide-react";

export default function Card() {
  const classified = useSelector((state) => state.app.classified);
  const approvedClassified=classified.filter((item)=>item.status==='approved')
  const disapprovedClassified=classified.filter((item)=>item.status==='disapproved')
  const pending=classified.filter((item)=>item.status==='pending')



  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 ">
      <Card1 
        title="Total Adds"
        count={classified.length}
        icon={<Users className="w-7 h-7 text-gray-500" />}
      />
      <Card1
        title="Active Adds"
        count={approvedClassified.length}
        icon={<UserCheck className="w-7 h-7 text-green-600" />}
      />
      <Card1
        title="Inactive Adds"
        count={disapprovedClassified.length}
        icon={
          <img src="https://img.icons8.com/?size=100&id=23265&format=png&color=FA5252" alt="" className="size-7 "/>
        }
      />

      <Card1
        title="Pending"
        count={pending.length}
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

