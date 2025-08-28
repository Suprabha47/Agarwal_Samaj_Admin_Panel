export default function PhysicalInfo({ formik }) {
  const bloodGroups = [
    "A+",
    "A-",
    "B+",
    "B-",
    "AB+",
    "AB-",
    "O+",
    "O-",
  ];

  // Generate heights from 4'0" to 7'0"
  const heights = [];
  for (let feet = 4; feet <= 7; feet++) {
    for (let inch = 0; inch < 12; inch++) {
      const label = `${feet}'${inch}"`;
      heights.push(label);
      if (feet === 7 && inch === 0) break; // stop at 7'0"
    }
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 bg-white rounded-lg shadow-md mt-6">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 text-center">
        Physical Information
      </h2>

      {/* Responsive grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Height */}
        <div>
          <label className="block text-base sm:text-lg font-medium text-gray-700 mb-2">
            Height
          </label>
          <select
            name="height"
            value={formik.values.height}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full border border-gray-300 rounded-md px-4 py-3 text-base sm:text-lg focus:ring-2 focus:ring-gray-500 focus:outline-none"
          >
            <option value="">---Select Height---</option>
            {heights.map((h) => (
              <option key={h} value={h}>
                {h}
              </option>
            ))}
          </select>
          {formik.touched.height && formik.errors.height && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.height}</p>
          )}
        </div>

        {/* Body Type */}
        <div>
          <label className="block text-base sm:text-lg font-medium text-gray-700 mb-2">
            Body Type
          </label>
          <input
            type="text"
            name="body_type"
            value={formik.values.body_type}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full border border-gray-300 rounded-md px-4 py-3 text-base sm:text-lg focus:ring-2 focus:ring-gray-500 focus:outline-none"
          />
          {formik.touched.body_type && formik.errors.body_type && (
            <p className="text-red-500 text-sm mt-1">
              {formik.errors.body_type}
            </p>
          )}
        </div>

        {/* Complexion */}
        <div>
          <label className="block text-base sm:text-lg font-medium text-gray-700 mb-2">
            Complexion
          </label>
          <input
            type="text"
            name="complexion"
            value={formik.values.complexion}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full border border-gray-300 rounded-md px-4 py-3 text-base sm:text-lg focus:ring-2 focus:ring-gray-500 focus:outline-none"
          />
          {formik.touched.complexion && formik.errors.complexion && (
            <p className="text-red-500 text-sm mt-1">
              {formik.errors.complexion}
            </p>
          )}
        </div>

        {/* Blood Group */}
        <div>
          <label className="block text-base sm:text-lg font-medium text-gray-700 mb-2">
            Blood Group
          </label>
          <select
            name="blood_group"
            value={formik.values.blood_group}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full border border-gray-300 rounded-md px-4 py-3 text-base sm:text-lg focus:ring-2 focus:ring-gray-500 focus:outline-none"
          >
            <option value="">---Select Blood Group---</option>
            {bloodGroups.map((bg) => (
              <option key={bg} value={bg}>
                {bg}
              </option>
            ))}
          </select>
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
