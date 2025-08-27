export default function PhysicalInfo({ formik }) {
  return (
    <div className="w-full max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-md mt-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Physical Information
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Height */}
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Height
          </label>
          <input
            type="text"
            name="height"
            value={formik.values.height}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full border border-gray-300 rounded-md px-4 py-3 text-lg focus:ring-2 focus:ring-gray-500 focus:outline-none"
          />
          {formik.touched.height && formik.errors.height && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.height}</p>
          )}
        </div>

        {/* Body Type */}
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Body Type
          </label>
          <input
            type="text"
            name="body_type"
            value={formik.values.body_type}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full border border-gray-300 rounded-md px-4 py-3 text-lg focus:ring-2 focus:ring-gray-500 focus:outline-none"
          />
          {formik.touched.body_type && formik.errors.body_type && (
            <p className="text-red-500 text-sm mt-1">
              {formik.errors.body_type}
            </p>
          )}
        </div>

        {/* Complexion */}
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Complexion
          </label>
          <input
            type="text"
            name="complexion"
            value={formik.values.complexion}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full border border-gray-300 rounded-md px-4 py-3 text-lg focus:ring-2 focus:ring-gray-500 focus:outline-none"
          />
          {formik.touched.complexion && formik.errors.complexion && (
            <p className="text-red-500 text-sm mt-1">
              {formik.errors.complexion}
            </p>
          )}
        </div>

        {/* Blood Group */}
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Blood Group
          </label>
          <input
            type="text"
            name="blood_group"
            value={formik.values.blood_group}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full border border-gray-300 rounded-md px-4 py-3 text-lg focus:ring-2 focus:ring-gray-500 focus:outline-none"
          />
          {formik.touched.blood_group && formik.errors.blood_group && (
            <p className="text-red-500 text-sm mt-1">
              {formik.errors.blood_group}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
