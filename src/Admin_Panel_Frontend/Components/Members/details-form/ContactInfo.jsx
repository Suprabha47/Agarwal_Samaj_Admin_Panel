export default function ContactInfo({ formik }) {
  const indianStates = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
    // Union Territories
    "Andaman and Nicobar Islands",
    "Chandigarh",
    "Dadra and Nagar Haveli and Daman and Diu",
    "Delhi",
    "Jammu and Kashmir",
    "Ladakh",
    "Lakshadweep",
    "Puducherry",
  ];

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 text-center">
        Contact Information
      </h2>

      {/* Responsive grid: 1 col (mobile), 2 col (tablet), 3 col (desktop) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Address - always full width */}
        <div className="col-span-1 sm:col-span-2 lg:col-span-3">
          <label className="block text-base sm:text-lg font-medium text-gray-700 mb-2">
            Address
          </label>
          <input
            type="text"
            name="address"
            value={formik.values.address}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full border border-gray-300 rounded-md px-4 py-3 text-base sm:text-lg focus:ring-2 focus:ring-gray-500 focus:outline-none"
          />
          {formik.touched.address && formik.errors.address && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.address}</p>
          )}
        </div>

        {/* Country */}
        <div>
          <label className="block text-base sm:text-lg font-medium text-gray-700 mb-2">
            Country
          </label>
          <select
            name="country"
            value={formik.values.country}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full border border-gray-300 rounded-md px-4 py-3 text-base sm:text-lg focus:ring-2 focus:ring-gray-500 focus:outline-none"
          >
            <option value="">---Select---</option>
            <option value="India">India</option>
          </select>
          {formik.touched.country && formik.errors.country && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.country}</p>
          )}
        </div>

        {/* State */}
        <div>
          <label className="block text-base sm:text-lg font-medium text-gray-700 mb-2">
            State
          </label>
          <select
            name="state"
            value={formik.values.state}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full border border-gray-300 rounded-md px-4 py-3 text-base sm:text-lg focus:ring-2 focus:ring-gray-500 focus:outline-none"
          >
            <option value="">---Select State---</option>
            {indianStates.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
          {formik.touched.state && formik.errors.state && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.state}</p>
          )}
        </div>

        {/* District */}
        <div>
          <label className="block text-base sm:text-lg font-medium text-gray-700 mb-2">
            District
          </label>
          <input
            type="text"
            name="district"
            value={formik.values.district}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full border border-gray-300 rounded-md px-4 py-3 text-base sm:text-lg focus:ring-2 focus:ring-gray-500 focus:outline-none"
          />
          {formik.touched.district && formik.errors.district && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.district}</p>
          )}
        </div>

        {/* Pin Code */}
        <div>
          <label className="block text-base sm:text-lg font-medium text-gray-700 mb-2">
            Pin Code
          </label>
          <input
            type="text"
            name="pin_code"
            value={formik.values.pin_code}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full border border-gray-300 rounded-md px-4 py-3 text-base sm:text-lg focus:ring-2 focus:ring-gray-500 focus:outline-none"
          />
          {formik.touched.pin_code && formik.errors.pin_code && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.pin_code}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="block text-base sm:text-lg font-medium text-gray-700 mb-2">
            Phone
          </label>
          <input
            type="text"
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full border border-gray-300 rounded-md px-4 py-3 text-base sm:text-lg focus:ring-2 focus:ring-gray-500 focus:outline-none"
          />
          {formik.touched.phone && formik.errors.phone && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.phone}</p>
          )}
        </div>

        {/* Contact No */}
        <div>
          <label className="block text-base sm:text-lg font-medium text-gray-700 mb-2">
            Contact No
          </label>
          <input
            type="text"
            name="contact_no"
            value={formik.values.contact_no}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full border border-gray-300 rounded-md px-4 py-3 text-base sm:text-lg focus:ring-2 focus:ring-gray-500 focus:outline-none"
          />
          {formik.touched.contact_no && formik.errors.contact_no && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.contact_no}</p>
          )}
        </div>

        {/* Email - full width */}
        <div className="col-span-1 sm:col-span-2 lg:col-span-3">
          <label className="block text-base sm:text-lg font-medium text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full border border-gray-300 rounded-md px-4 py-3 text-base sm:text-lg focus:ring-2 focus:ring-gray-500 focus:outline-none"
          />
          {formik.touched.email && formik.errors.email && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
          )}
        </div>
      </div>
    </div>
  );
}
