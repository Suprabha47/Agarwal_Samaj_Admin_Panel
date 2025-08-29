import { useSelector } from "react-redux";
import { Users, UserCheck, Star } from "lucide-react";

export default function Cards() {
  const Members = useSelector((state) => state.app.Members);
  const BasicMembers = Members.filter((users) => users.subscription === false);
  const Premium_Membership = Members.filter(
    (users) => users.subscription === true
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 ">
      <Card 
        title="Total Members"
        count={Members.length}
        icon={<Users className="w-7 h-7 text-gray-500" />}
      />
      <Card
        title="Basic Members"
        count={BasicMembers.length}
        icon={<UserCheck className="w-7 h-7 text-green-600" />}
      />
      <Card
        title="Classified"
        count={Members.filter((m) => m.status === "pending").length}
        icon={
          <img src="https://img.icons8.com/?size=100&id=xYV4Gygh25wG&format=png&color=000000" alt="" className="size-7 "/>
        }
      />

      <Card
        title="Premium Members"
        count={Premium_Membership.length}
        icon={<Star className="w-7 h-7 text-purple-600" />}
      />
    </div>
  );
}

/* Card Component */
const Card = ({ title, count, icon }) => (
  <div className="bg-white p-6 rounded-xl shadow border-white flex justify-between items-center hover:scale-105 transition-transform ease-in-out duration-1000">
    <div>
      <h3 className="text-lg text-gray-500">{title}</h3>
      <p className="text-3xl font-bold mt-2">{count}</p>
    </div>
    {icon}
  </div>
);

