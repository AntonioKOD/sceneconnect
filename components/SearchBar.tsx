"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { searchUsers } from "@/app/actions";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<{ id: string; name: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSearch = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!query.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("query", query);

      const searchResults = await searchUsers(formData);
      setResults(searchResults);
    } catch (err) {
      console.error("Error fetching search results:", err);
      setError("Failed to fetch search results. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle clicking a search result
  const handleResultClick = (id: string) => {
    router.push(`/creator/${id}`);
    setResults([]) // Navigate to the profile page
  };

  return (
    <div className="relative flex w-full md:w-80 items-center space-x-2">
      <form onSubmit={handleSearch} className="flex items-center space-x-2 w-full">
        <div className="relative flex-grow">
          <Input
            type="text"
            placeholder="Search creators..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10 w-full"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
        </div>
        <Button type="submit" disabled={loading} className="px-4 py-2 text-white rounded-md">
          {loading ? "Searching..." : "Search"}
        </Button>
      </form>

      {/* Display error message */}
      {error && <p className="text-red-500 mt-2">{error}</p>}

      {/* Display search results */}
      {results.length > 0 && (
        <div className="absolute top-full left-0 w-full bg-white shadow-lg mt-2 rounded-lg p-2">
          {results.map((user) => (
            <div
              key={user.id}
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleResultClick(user.id)} // Click redirects to profile
            >
              <p className="font-semibold">{user.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}