export default function BasicInfo({ formik }) {
  return (
    <div className="w-full max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Member Basic Information
      </h1>

      <div className="space-y-5">
        {/* Name */}
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full rounded-md border border-gray-300 px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
          />
          {formik.touched.name && formik.errors.name && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.name}</p>
          )}
        </div>

        {/* Date of Birth */}
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Date of Birth
          </label>
          <input
            type="date"
            name="dob"
            value={formik.values.dob}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full rounded-md border border-gray-300 px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
          />
          {formik.touched.dob && formik.errors.dob && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.dob}</p>
          )}
        </div>

        {/* Birth Place */}
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Birth Place
          </label>
          <input
            type="text"
            name="birth_place"
            value={formik.values.birth_place}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full rounded-md border border-gray-300 px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
          />
          {formik.touched.birth_place && formik.errors.birth_place && (
            <p className="text-red-500 text-sm mt-1">
              {formik.errors.birth_place}
            </p>
          )}
        </div>

        {/* Gender */}
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Gender
          </label>
          <select
            name="candidate_gender"
            value={formik.values.candidate_gender}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full rounded-md border border-gray-300 bg-white px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
          >
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          {formik.touched.candidate_gender &&
            formik.errors.candidate_gender && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.candidate_gender}
              </p>
            )}
        </div>

        {/* Manglik */}
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Manglik
          </label>
          <select
            name="manglik"
            value={formik.values.manglik}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full rounded-md border border-gray-300 bg-white px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
          >
            <option value="">Select</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
          {formik.touched.manglik && formik.errors.manglik && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.manglik}</p>
          )}
        </div>

        {/* Gotra */}
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Gotra
          </label>
          <input
            type="text"
            name="gotra"
            value={formik.values.gotra}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full border border-gray-300 rounded-md px-4 py-3 text-lg focus:ring-2 focus:ring-gray-500 focus:outline-none"
          />
          {formik.touched.gotra && formik.errors.gotra && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.gotra}</p>
          )}
        </div>

        {/* Maternal Gotra */}
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Maternal Gotra
          </label>
          <input
            type="text"
            name="maternal_gotra"
            value={formik.values.maternal_gotra}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full border border-gray-300 rounded-md px-4 py-3 text-lg focus:ring-2 focus:ring-gray-500 focus:outline-none"
          />
          {formik.touched.maternal_gotra && formik.errors.maternal_gotra && (
            <p className="text-red-500 text-sm mt-1">
              {formik.errors.maternal_gotra}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
