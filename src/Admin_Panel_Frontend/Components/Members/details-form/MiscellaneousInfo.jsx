export default function MiscellaneousInfo({ formik }) {
  return (
    <div className="w-full max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-md mt-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Miscellaneous
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Kundali Milana */}
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Kundali Milana
          </label>
          <input
            type="text"
            name="kundali_milana"
            value={formik.values.kundali_milana}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full border border-gray-300 rounded-md px-4 py-3 text-lg focus:ring-2 focus:ring-gray-500 focus:outline-none"
          />
          {formik.touched.kundali_milana && formik.errors.kundali_milana && (
            <p className="text-red-500 text-sm mt-1">
              {formik.errors.kundali_milana}
            </p>
          )}
        </div>

        {/* About Me */}
        <div className="sm:col-span-2">
          <label className="block text-lg font-medium text-gray-700 mb-2">
            About Me
          </label>
          <textarea
            name="about_me"
            value={formik.values.about_me}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            rows="5"
            className="w-full border border-gray-300 rounded-md px-4 py-3 text-lg focus:ring-2 focus:ring-gray-500 focus:outline-none"
          ></textarea>
          {formik.touched.about_me && formik.errors.about_me && (
            <p className="text-red-500 text-sm mt-1">
              {formik.errors.about_me}
            </p>
          )}
        </div>

        {/* Image Upload */}
        <div className="sm:col-span-2">
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Profile Image
          </label>
          {/* Preview existing image */}
          {formik.values.image_path &&
            typeof formik.values.image_path === "string" && (
              <img
                src={`http://localhost:4005/${formik.values.image_path}`}
                alt="Current profile"
                className="w-24 h-24 object-cover rounded mb-3"
              />
            )}
          <input
            type="file"
            name="image_path"
            accept="image/*"
            onChange={(event) => {
              const file = event.currentTarget.files[0];
              formik.setFieldValue("image_path", file);
            }}
            onBlur={formik.handleBlur}
            className="w-full border border-gray-300 rounded-md px-4 py-3 text-lg focus:outline-none 
                   file:mr-4 file:py-2 file:px-4 file:rounded-md 
                   file:border-0 file:bg-indigo-50 file:text-indigo-700 
                   hover:file:bg-indigo-100 cursor-pointer"
          />
          {formik.touched.image_path && formik.errors.image_path && (
            <p className="text-red-500 text-sm mt-1">
              {formik.errors.image_path}
            </p>
          )}
        </div>

        {/* Subscription */}
        <div className="flex items-center sm:col-span-2">
          <input
            type="checkbox"
            name="subscription"
            checked={formik.values.subscription}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="h-5 w-5 text-indigo-600 border-gray-300 rounded focus:ring-gray-500"
          />
          <label
            htmlFor="subscription"
            className="ml-3 text-lg text-gray-700 cursor-pointer"
          >
            Subscribe to updates
          </label>
        </div>
      </div>
    </div>
  );
}
