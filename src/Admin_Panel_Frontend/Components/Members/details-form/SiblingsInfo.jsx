import React from "react";

export default function SiblingsInfo({ formik }) {
  return (
    <div className="w-full max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-md mt-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Siblings Information
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Unmarried Brothers */}
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">
            No. of Unmarried Brothers
          </label>
          <input
            type="number"
            name="no_unmarried_brother"
            value={formik.values.no_unmarried_brother}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full border border-gray-300 rounded-md px-4 py-3 text-lg focus:ring-2 focus:ring-gray-500 focus:outline-none"
          />
          {formik.touched.no_unmarried_brother &&
            formik.errors.no_unmarried_brother && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.no_unmarried_brother}
              </p>
            )}
        </div>

        {/* Unmarried Sisters */}
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">
            No. of Unmarried Sisters
          </label>
          <input
            type="number"
            name="no_unmarried_sister"
            value={formik.values.no_unmarried_sister}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full border border-gray-300 rounded-md px-4 py-3 text-lg focus:ring-2 focus:ring-gray-500 focus:outline-none"
          />
          {formik.touched.no_unmarried_sister &&
            formik.errors.no_unmarried_sister && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.no_unmarried_sister}
              </p>
            )}
        </div>

        {/* Married Brothers */}
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">
            No. of Married Brothers
          </label>
          <input
            type="number"
            name="no_married_brother"
            value={formik.values.no_married_brother}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full border border-gray-300 rounded-md px-4 py-3 text-lg focus:ring-2 focus:ring-gray-500 focus:outline-none"
          />
          {formik.touched.no_married_brother &&
            formik.errors.no_married_brother && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.no_married_brother}
              </p>
            )}
        </div>

        {/* Married Sisters */}
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">
            No. of Married Sisters
          </label>
          <input
            type="number"
            name="no_married_sister"
            value={formik.values.no_married_sister}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full border border-gray-300 rounded-md px-4 py-3 text-lg focus:ring-2 focus:ring-gray-500 focus:outline-none"
          />
          {formik.touched.no_married_sister &&
            formik.errors.no_married_sister && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.no_married_sister}
              </p>
            )}
        </div>
      </div>
    </div>
  );
}
