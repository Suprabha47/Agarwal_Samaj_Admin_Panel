export default function ContactInfo({ formik }) {
  return (
    <div className="w-full max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Contact Information
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Address */}
        <div className="sm:col-span-2">
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Address
          </label>
          <input
            type="text"
            name="address"
            value={formik.values.address}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full border border-gray-300 rounded-md px-4 py-3 text-lg focus:ring-2 focus:ring-gray-500 focus:outline-none"
          />
          {formik.touched.address && formik.errors.address && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.address}</p>
          )}
        </div>

        {/* Country */}
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Country
          </label>
          <input
            type="text"
            name="country"
            value={formik.values.country}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full border border-gray-300 rounded-md px-4 py-3 text-lg focus:ring-2 focus:ring-gray-500 focus:outline-none"
          />
          {formik.touched.country && formik.errors.country && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.country}</p>
          )}
        </div>

        {/* State */}
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">
            State
          </label>
          <input
            type="text"
            name="state"
            value={formik.values.state}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full border border-gray-300 rounded-md px-4 py-3 text-lg focus:ring-2 focus:ring-gray-500 focus:outline-none"
          />
          {formik.touched.state && formik.errors.state && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.state}</p>
          )}
        </div>

        {/* District */}
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">
            District
          </label>
          <input
            type="text"
            name="district"
            value={formik.values.district}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full border border-gray-300 rounded-md px-4 py-3 text-lg focus:ring-2 focus:ring-gray-500 focus:outline-none"
          />
          {formik.touched.district && formik.errors.district && (
            <p className="text-red-500 text-sm mt-1">
              {formik.errors.district}
            </p>
          )}
        </div>

        {/* Pin Code */}
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Pin Code
          </label>
          <input
            type="text"
            name="pin_code"
            value={formik.values.pin_code}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full border border-gray-300 rounded-md px-4 py-3 text-lg focus:ring-2 focus:ring-gray-500 focus:outline-none"
          />
          {formik.touched.pin_code && formik.errors.pin_code && (
            <p className="text-red-500 text-sm mt-1">
              {formik.errors.pin_code}
            </p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Phone
          </label>
          <input
            type="text"
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full border border-gray-300 rounded-md px-4 py-3 text-lg focus:ring-2 focus:ring-gray-500 focus:outline-none"
          />
          {formik.touched.phone && formik.errors.phone && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.phone}</p>
          )}
        </div>

        {/* Contact No */}
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Contact No
          </label>
          <input
            type="text"
            name="contact_no"
            value={formik.values.contact_no}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full border border-gray-300 rounded-md px-4 py-3 text-lg focus:ring-2 focus:ring-gray-500 focus:outline-none"
          />
          {formik.touched.contact_no && formik.errors.contact_no && (
            <p className="text-red-500 text-sm mt-1">
              {formik.errors.contact_no}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="sm:col-span-2">
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full border border-gray-300 rounded-md px-4 py-3 text-lg focus:ring-2 focus:ring-gray-500 focus:outline-none"
          />
          {formik.touched.email && formik.errors.email && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
          )}
        </div>
      </div>
    </div>
  );
}
