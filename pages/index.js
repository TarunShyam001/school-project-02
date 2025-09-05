import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-8">
      {/* Content Box */}
      <div className="w-[70%] max-w-3xl bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 rounded-2xl shadow-xl p-10 text-center">
        <h1 className="text-4xl font-bold text-red-500 mb-6">
          Welcome to the Schools
        </h1>

        <p className="text-lg text-black-400 max-w-xl mx-auto mb-8">
          This web application helps you manage school data efficiently.
          You can add new schools to the database and view the list of all
          registered schools with their details.
        </p>

        {/* Buttons */}
        <div className="flex justify-center gap-6">
          <Link
            href="/addSchool"
            className="bg-blue-400 text-white px-6 py-3 rounded-lg shadow-md transform transition hover:scale-105 hover:bg-blue-150"
          >
            Add School
          </Link>

          <Link
            href="/showSchools"
            className="bg-green-400 text-white px-6 py-3 rounded-lg shadow-md transform transition hover:scale-105 hover:bg-green-150"
          >
            Show Schools
          </Link>
        </div>
      </div>
    </div>
  );
}
