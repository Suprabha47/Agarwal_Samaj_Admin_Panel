import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import { MembershipApi } from "../../Redux/Slice";
import Layout from "../Layout/Layout";

export default function Membership() {
  const dispatch = useDispatch();
  const memberships = useSelector((state) => state.app.Memberships || []);
  const [confirmDelete, setConfirmDelete] = useState(null); // store the id to delete

  useEffect(() => {
    dispatch(MembershipApi());
  }, [dispatch]);

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/api/membership/${id}`
      );
      if (res.data) {
        toast.success("Membership Deleted Successfully");
        dispatch(MembershipApi()); // refresh list
      }
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setConfirmDelete(null); // close modal
    }
  };

  return (
    <>
      <Layout PageName="Membership" />

      <div className="flex flex-col md:ml-64">
        <div className="p-4 md:p-6 space-y-6">
          <div className="bg-white rounded-xl shadow-xl">
            <div className="p-5 border-b border-gray-200 flex justify-between items-center">
              <div>
                <h2 className="font-semibold text-2xl text-gray-800">
                  Memberships
                </h2>
                <p className="text-lg text-gray-500">
                  View and manage memberships
                </p>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="min-w-[600px] w-full text-left">
                <thead className="bg-gray-50 text-gray-700 text-lg">
                  <tr>
                    <th className="py-4 px-5">Applicant</th>
                    <th className="py-4 px-5">Telephone</th>
                    <th className="py-4 px-5">Email</th>
                    <th className="py-4 px-5">Fee</th>
                    <th className="py-4 px-5">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-gray-800">
                  {memberships.map((m) => (
                    <tr
                      key={m.id}
                      className="border-t border-gray-200 hover:bg-gray-50"
                    >
                      <td className="py-4 px-5 font-medium">
                        {m.applicantName}
                      </td>
                      <td className="py-4 px-5">{m.telephone}</td>
                      <td className="py-4 px-5">{m.faxEmail}</td>
                      <td className="py-4 px-5">₹{m.membershipFee}</td>
                      <td className="py-4 px-5 flex gap-2">
                        <NavLink
                          to={`/memberships/${m.id}`}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500"
                        >
                          View
                        </NavLink>
                        <button
                          className="flex items-center gap-1 px-3.5 py-1.5 bg-red-600 text-white rounded-lg hover:bg-red-500"
                          onClick={() => setConfirmDelete(m.membershipNumber)} // open modal
                        >
                          <Trash2 className="w-4 h-4" /> Delete
                        </button>
                      </td>
                    </tr>
                  ))}

                  {memberships.length === 0 && (
                    <tr>
                      <td
                        colSpan="5"
                        className="text-center py-6 text-gray-500 text-lg"
                      >
                        No memberships found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {confirmDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-sm shadow-xl">
            <h2 className="text-xl font-semibold text-gray-800">
              Confirm Delete
            </h2>
            <p className="text-sm text-gray-600 mt-2">
              Are you sure you want to delete this membership? <br />
              This action{" "}
              <span className="font-medium text-red-600">cannot</span> be
              undone.
            </p>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setConfirmDelete(null)}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(confirmDelete)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
