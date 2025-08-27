export default function FamilyInfo({ formik }) {
  return (
    <div className="w-full max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Family Information
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Father Name */}
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Father Name
          </label>
          <input
            type="text"
            name="father_name"
            value={formik.values.father_name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full border border-gray-300 rounded-md px-4 py-3 text-lg focus:ring-2 focus:ring-gray-500 focus:outline-none"
          />
          {formik.touched.father_name && formik.errors.father_name && (
            <p className="text-red-500 text-sm mt-1">
              {formik.errors.father_name}
            </p>
          )}
        </div>

        {/* Father Mobile */}
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Father Mobile
          </label>
          <input
            type="text"
            name="father_mobile"
            value={formik.values.father_mobile}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full border border-gray-300 rounded-md px-4 py-3 text-lg focus:ring-2 focus:ring-gray-500 focus:outline-none"
          />
          {formik.touched.father_mobile && formik.errors.father_mobile && (
            <p className="text-red-500 text-sm mt-1">
              {formik.errors.father_mobile}
            </p>
          )}
        </div>

        {/* Father Occupation */}
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Father Occupation
          </label>
          <input
            type="text"
            name="father_occupation"
            value={formik.values.father_occupation}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full border border-gray-300 rounded-md px-4 py-3 text-lg focus:ring-2 focus:ring-gray-500 focus:outline-none"
          />
          {formik.touched.father_occupation &&
            formik.errors.father_occupation && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.father_occupation}
              </p>
            )}
        </div>

        {/* Father Annual Income */}
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Father Annual Income
          </label>
          <input
            type="number"
            name="father_annual_income"
            value={formik.values.father_annual_income}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full border border-gray-300 rounded-md px-4 py-3 text-lg focus:ring-2 focus:ring-gray-500 focus:outline-none"
          />
          {formik.touched.father_annual_income &&
            formik.errors.father_annual_income && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.father_annual_income}
              </p>
            )}
        </div>

        {/* Mother Name */}
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Mother Name
          </label>
          <input
            type="text"
            name="mother_name"
            value={formik.values.mother_name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full border border-gray-300 rounded-md px-4 py-3 text-lg focus:ring-2 focus:ring-gray-500 focus:outline-none"
          />
          {formik.touched.mother_name && formik.errors.mother_name && (
            <p className="text-red-500 text-sm mt-1">
              {formik.errors.mother_name}
            </p>
          )}
        </div>

        {/* Mother Occupation */}
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Mother Occupation
          </label>
          <input
            type="text"
            name="mother_occupation"
            value={formik.values.mother_occupation}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full border border-gray-300 rounded-md px-4 py-3 text-lg focus:ring-2 focus:ring-gray-500 focus:outline-none"
          />
          {formik.touched.mother_occupation &&
            formik.errors.mother_occupation && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.mother_occupation}
              </p>
            )}
        </div>

        {/* Grandfather */}
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Grandfather
          </label>
          <input
            type="text"
            name="grandfather"
            value={formik.values.grandfather}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full border border-gray-300 rounded-md px-4 py-3 text-lg focus:ring-2 focus:ring-gray-500 focus:outline-none"
          />
          {formik.touched.grandfather && formik.errors.grandfather && (
            <p className="text-red-500 text-sm mt-1">
              {formik.errors.grandfather}
            </p>
          )}
        </div>

        {/* Native Place */}
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Native Place
          </label>
          <input
            type="text"
            name="native_place"
            value={formik.values.native_place}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full border border-gray-300 rounded-md px-4 py-3 text-lg focus:ring-2 focus:ring-gray-500 focus:outline-none"
          />
          {formik.touched.native_place && formik.errors.native_place && (
            <p className="text-red-500 text-sm mt-1">
              {formik.errors.native_place}
            </p>
          )}
        </div>

        {/* Nationality */}
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Nationality
          </label>
          <input
            type="text"
            name="nationality"
            value={formik.values.nationality}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full border border-gray-300 rounded-md px-4 py-3 text-lg focus:ring-2 focus:ring-gray-500 focus:outline-none"
          />
          {formik.touched.nationality && formik.errors.nationality && (
            <p className="text-red-500 text-sm mt-1">
              {formik.errors.nationality}
            </p>
          )}
        </div>

        {/* Status of Family */}
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Status of Family
          </label>
          <input
            type="text"
            name="status_of_family"
            value={formik.values.status_of_family}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full border border-gray-300 rounded-md px-4 py-3 text-lg focus:ring-2 focus:ring-gray-500 focus:outline-none"
          />
          {formik.touched.status_of_family &&
            formik.errors.status_of_family && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.status_of_family}
              </p>
            )}
        </div>
      </div>
    </div>
  );
}
