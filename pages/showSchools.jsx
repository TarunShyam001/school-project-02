import { useEffect, useState } from "react";
import Link from "next/link";

export default function ShowSchools() {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const res = await fetch("/api/getSchools");
        const data = await res.json();

        if (Array.isArray(data)) {
          setSchools(data);
        } else if (Array.isArray(data.data)) {
          setSchools(data.data);
        } else {
          console.error("Unexpected API response:", data);
          setSchools([]);
        }
      } catch (err) {
        console.error("Error fetching schools:", err);
        setSchools([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSchools();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading schools...</p>;

  return (
    <div className="max-w-6xl mx-auto p-8 bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 shadow-lg rounded-2xl mt-10">
      {/* Header */}
      <h1 className="text-4xl font-extrabold mb-10 text-center bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-transparent bg-clip-text">
        All Schools
      </h1>

      {schools.length === 0 && (
        <p className="text-center text-gray-600 text-lg">No schools found.</p>
      )}

      {/* School Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {schools.map((s) => (
          <div
            key={s.id}
            className="bg-white border-2 border-pink-200 p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-300"
          >
            {/* School Image */}
            {s.image && (
              <div className="overflow-hidden rounded-xl">
                <img
                  src={s.image}
                  alt={s.name}
                  className="w-full h-48 object-cover transform hover:scale-105 transition duration-300"
                />
              </div>
            )}

            {/* School Details */}
            <div className="mt-4 space-y-2">
              <h2 className="text-2xl font-bold text-purple-700">{s.name}</h2>
              <p className="text-gray-600">
                📍 {s.address}, {s.city}, {s.state}
              </p>
              <p className="text-gray-700 font-medium">📞 {s.contact}</p>
              <p className="text-blue-600 underline hover:text-blue-800">
                ✉ {s.email_id}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Add School Button */}
      <div className="mt-8 flex justify-center">
        <Link
          href="/addSchool"
          className="inline-block bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 text-white font-bold px-8 py-3 rounded-lg shadow-md hover:from-red-400 hover:via-orange-400 hover:to-yellow-400 transition duration-300 text-center"
        >
          ➕ Add School
        </Link>
      </div>
    </div>
  );
}
