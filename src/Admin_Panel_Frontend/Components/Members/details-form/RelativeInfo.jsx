export default function RelativeInfo({ formik }) {
  return (
    <div className="w-full max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-md mt-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Relative Information
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Relation */}
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Relation
          </label>
          <input
            type="text"
            name="relation"
            value={formik.values.relation ?? ""}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full border border-gray-300 rounded-md px-4 py-3 text-lg focus:ring-2 focus:ring-gray-500 focus:outline-none"
          />
          {formik.touched.relation && formik.errors.relation && (
            <p className="text-red-500 text-sm mt-1">
              {formik.errors.relation}
            </p>
          )}
        </div>

        {/* Relative Name */}
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Relative Name
          </label>
          <input
            type="text"
            name="relative_name"
            value={formik.values.relative_name ?? ""}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full border border-gray-300 rounded-md px-4 py-3 text-lg focus:ring-2 focus:ring-gray-500 focus:outline-none"
          />
          {formik.touched.relative_name && formik.errors.relative_name && (
            <p className="text-red-500 text-sm mt-1">
              {formik.errors.relative_name}
            </p>
          )}
        </div>

        {/* Relative Mobile */}
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Relative Mobile
          </label>
          <input
            type="text"
            name="relative_mobile_no"
            value={formik.values.relative_mobile_no ?? ""}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full border border-gray-300 rounded-md px-4 py-3 text-lg focus:ring-2 focus:ring-gray-500 focus:outline-none"
          />
          {formik.touched.relative_mobile_no &&
            formik.errors.relative_mobile_no && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.relative_mobile_no}
              </p>
            )}
        </div>

        {/* Relative City */}
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Relative City
          </label>
          <input
            type="text"
            name="relative_city"
            value={formik.values.relative_city ?? ""}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full border border-gray-300 rounded-md px-4 py-3 text-lg focus:ring-2 focus:ring-gray-500 focus:outline-none"
          />
          {formik.touched.relative_city && formik.errors.relative_city && (
            <p className="text-red-500 text-sm mt-1">
              {formik.errors.relative_city}
            </p>
          )}
        </div>

        {/* Relative Company Name */}
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Relative Company Name
          </label>
          <input
            type="text"
            name="relative_company_name"
            value={formik.values.relative_company_name ?? ""}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full border border-gray-300 rounded-md px-4 py-3 text-lg focus:ring-2 focus:ring-gray-500 focus:outline-none"
          />
          {formik.touched.relative_company_name &&
            formik.errors.relative_company_name && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.relative_company_name}
              </p>
            )}
        </div>

        {/* Relative Designation */}
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Relative Designation
          </label>
          <input
            type="text"
            name="relative_designation"
            value={formik.values.relative_designation ?? ""}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full border border-gray-300 rounded-md px-4 py-3 text-lg focus:ring-2 focus:ring-gray-500 focus:outline-none"
          />
          {formik.touched.relative_designation &&
            formik.errors.relative_designation && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.relative_designation}
              </p>
            )}
        </div>

        {/* Relative Company Address */}
        <div className="sm:col-span-2">
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Relative Company Address
          </label>
          <input
            type="text"
            name="relative_company_address"
            value={formik.values.relative_company_address ?? ""}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full border border-gray-300 rounded-md px-4 py-3 text-lg focus:ring-2 focus:ring-gray-500 focus:outline-none"
          />
          {formik.touched.relative_company_address &&
            formik.errors.relative_company_address && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.relative_company_address}
              </p>
            )}
        </div>
      </div>
    </div>
  );
}
