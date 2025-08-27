export default function EduWorkInfo({ formik }) {
  return (
    <div className="w-full max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-md mt-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Education and Work
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Education Detail */}
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Education Detail
          </label>
          <input
            type="text"
            name="education_detail"
            value={formik.values.education_detail}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full border border-gray-300 rounded-md px-4 py-3 text-lg focus:ring-2 focus:ring-gray-500 focus:outline-none"
          />
          {formik.touched.education_detail &&
            formik.errors.education_detail && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.education_detail}
              </p>
            )}
        </div>

        {/* Education */}
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Education
          </label>
          <input
            type="text"
            name="education"
            value={formik.values.education}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full border border-gray-300 rounded-md px-4 py-3 text-lg focus:ring-2 focus:ring-gray-500 focus:outline-none"
          />
          {formik.touched.education && formik.errors.education && (
            <p className="text-red-500 text-sm mt-1">
              {formik.errors.education}
            </p>
          )}
        </div>

        {/* Hobby */}
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Hobby
          </label>
          <input
            type="text"
            name="hobby"
            value={formik.values.hobby}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full border border-gray-300 rounded-md px-4 py-3 text-lg focus:ring-2 focus:ring-gray-500 focus:outline-none"
          />
          {formik.touched.hobby && formik.errors.hobby && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.hobby}</p>
          )}
        </div>

        {/* Occupation */}
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Occupation
          </label>
          <input
            type="text"
            name="occupation"
            value={formik.values.occupation}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full border border-gray-300 rounded-md px-4 py-3 text-lg focus:ring-2 focus:ring-gray-500 focus:outline-none"
          />
          {formik.touched.occupation && formik.errors.occupation && (
            <p className="text-red-500 text-sm mt-1">
              {formik.errors.occupation}
            </p>
          )}
        </div>

        {/* Designation */}
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Designation
          </label>
          <input
            type="text"
            name="designation"
            value={formik.values.designation}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full border border-gray-300 rounded-md px-4 py-3 text-lg focus:ring-2 focus:ring-gray-500 focus:outline-none"
          />
          {formik.touched.designation && formik.errors.designation && (
            <p className="text-red-500 text-sm mt-1">
              {formik.errors.designation}
            </p>
          )}
        </div>

        {/* Annual Income */}
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Annual Income
          </label>
          <input
            type="number"
            name="annual_income"
            value={formik.values.annual_income}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full border border-gray-300 rounded-md px-4 py-3 text-lg focus:ring-2 focus:ring-gray-500 focus:outline-none"
          />
          {formik.touched.annual_income && formik.errors.annual_income && (
            <p className="text-red-500 text-sm mt-1">
              {formik.errors.annual_income}
            </p>
          )}
        </div>

        {/* Company Name */}
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Company Name
          </label>
          <input
            type="text"
            name="company_name"
            value={formik.values.company_name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full border border-gray-300 rounded-md px-4 py-3 text-lg focus:ring-2 focus:ring-gray-500 focus:outline-none"
          />
          {formik.touched.company_name && formik.errors.company_name && (
            <p className="text-red-500 text-sm mt-1">
              {formik.errors.company_name}
            </p>
          )}
        </div>

        {/* Company City */}
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Company City
          </label>
          <input
            type="text"
            name="company_city"
            value={formik.values.company_city}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full border border-gray-300 rounded-md px-4 py-3 text-lg focus:ring-2 focus:ring-gray-500 focus:outline-none"
          />
          {formik.touched.company_city && formik.errors.company_city && (
            <p className="text-red-500 text-sm mt-1">
              {formik.errors.company_city}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
