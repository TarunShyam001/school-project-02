import { useForm } from "react-hook-form";
import { useState } from "react";
import Link from "next/link";

export default function AddSchool() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [message, setMessage] = useState("");

  const onSubmit = async (data) => {
  const formData = new FormData();

  // Append normal fields
  for (let key in data) {
    if (key !== "image") {
      formData.append(key, data[key]);
    }
  }

  // Append the actual file (first file from FileList)
  if (data.image && data.image[0]) {
    formData.append("image", data.image[0]);
  }

  const res = await fetch("/api/addSchool", {
    method: "POST",
    body: formData,
  });

  const result = await res.json();
  setMessage(result.message || result.error);

  // ✅ Clear the form only if submission was successful
  if (res.ok) {
    reset();
  }
};


  return (
    <div className="max-w-md mx-auto p-6 bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 shadow-lg rounded-2xl mt-10">
    <h1 className="text-3xl font-extrabold mb-6 text-center text-purple-700">Add School</h1>

    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" encType="multipart/form-data">
      <input
        {...register("name", { required: true })}
        placeholder="School Name"
        className="w-full p-3 border-2 border-pink-300 rounded-lg focus:outline-none text-gray-800 placeholder-gray-600"
      />
      {errors.name && <p className="text-red-500 text-sm">Name is required</p>}

      <input
        {...register("address", { required: true })}
        placeholder="Address"
        className="w-full p-3 border-2 border-pink-300 rounded-lg focus:outline-none text-gray-800 placeholder-gray-600"
      />

      <input
        {...register("city", { required: true })}
        placeholder="City"
        className="w-full p-3 border-2 border-pink-300 rounded-lg focus:outline-none text-gray-800 placeholder-gray-600"
      />

      <input
        {...register("state")}
        placeholder="State"
        className="w-full p-3 border-2 border-pink-300 rounded-lg focus:outline-none text-gray-800 placeholder-gray-600"
      />

      <input
        type="number"
        {...register("contact", { required: true })}
        placeholder="Contact Number"
        className="w-full p-3 border-2 border-pink-300 rounded-lg focus:outline-none text-gray-800 placeholder-gray-600"
      />

      <input
        type="email"
        {...register("email_id", { required: true })}
        placeholder="Email"
        className="w-full p-3 border-2 border-pink-300 rounded-lg focus:outline-none text-gray-800 placeholder-gray-600"
      />
      {errors.email_id && <p className="text-red-500 text-sm">Enter valid email</p>}

      <input
        type="file"
        name="image"
        {...register("image", { required: true })}
        className="w-full border-2 border-pink-300 rounded-lg p-2 bg-white hover:border-purple-400 text-gray-800 placeholder-gray-600"
      />

      <button
        type="submit"
        className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white font-bold py-2 rounded-lg shadow-md hover:from-red-500 hover:via-pink-500 hover:to-purple-500 transition duration-300"
      >
        Submit
      </button>
    </form>

    <div className="mt-6 flex justify-center">
      <Link href="/showSchools" className="w-full bg-gradient-to-r from-yellow-400 via-orange-350 to-red-400 text-white font-bold py-2 rounded-lg shadow-md hover:from-red-400 hover:via-orange-350 hover:to-yellow-400 transition duration-300 text-center">
        Show Schools
      </Link>
    </div>


    {message && (
      <p
        className={`mt-4 text-center font-semibold ${
          message.includes("success")
            ? "text-green-600"
            : "text-red-600"
        }`}
      >
        {message}
      </p>
    )}
  </div>
  );
}
