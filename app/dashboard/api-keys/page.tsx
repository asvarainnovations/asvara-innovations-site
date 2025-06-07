"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import axiosInstance from '@/lib/axios';

interface ApiKey {
  id: string;
  name: string;
  key: string;
  createdAt: string;
  lastUsed: string | null;
}

export default function ApiKeysPage() {
  const { data: session } = useSession();
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [newKeyName, setNewKeyName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchApiKeys();
  }, []);

  const fetchApiKeys = async () => {
    try {
      const { data } = await axiosInstance.get("/api/api-keys");
      setApiKeys(data);
    } catch (err) {
      setError("Failed to fetch API keys. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateKey = async () => {
    if (!newKeyName.trim()) {
      setError("Please enter a name for your API key");
      return;
    }

    try {
      const { data } = await axiosInstance.post("/api/api-keys", {
        name: newKeyName
      });

      setApiKeys([...apiKeys, data]);
      setNewKeyName("");
      setIsCreating(false);
      setSuccess("API key created successfully");
      setError(null);
    } catch (err) {
      setError("Failed to create API key. Please try again.");
      setSuccess(null);
    }
  };

  const handleDeleteKey = async (keyId: string) => {
    if (!confirm("Are you sure you want to delete this API key?")) {
      return;
    }

    try {
      await axiosInstance.delete(`/api/api-keys/${keyId}`);
      setApiKeys(apiKeys.filter((key) => key.id !== keyId));
      setSuccess("API key deleted successfully");
      setError(null);
    } catch (err) {
      setError("Failed to delete API key. Please try again.");
      setSuccess(null);
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <h2 className="text-lg font-medium text-gray-900">Loading...</h2>
          <p className="mt-1 text-sm text-gray-500">
            Please wait while we fetch your API keys.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 min-h-screen bg-black">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">API Keys</h1>
          <p className="mt-1 text-sm text-gray-300">
            Generate and manage your API keys for accessing our services.
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <button
            onClick={() => setIsCreating(true)}
            className="inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            Create New API Key
          </button>
        </div>
      </div>

      {error && (
        <div className="rounded-md bg-red-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-red-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">{error}</h3>
            </div>
          </div>
        </div>
      )}

      {success && (
        <div className="rounded-md bg-green-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-green-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-green-800">{success}</h3>
            </div>
          </div>
        </div>
      )}

      {isCreating && (
        <div className="rounded-lg bg-[#181c24] p-6 shadow">
          <h2 className="text-lg font-medium text-white">Create New API Key</h2>
          <div className="mt-4">
            <label
              htmlFor="key-name"
              className="block text-sm font-medium text-gray-300"
            >
              Key Name
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="key-name"
                id="key-name"
                value={newKeyName}
                onChange={(e) => setNewKeyName(e.target.value)}
                className="block w-full rounded-md border-[#222c3c] shadow-sm focus:border-[#007BFF] focus:ring-[#007BFF] sm:text-sm text-white bg-[#232b3a]"
                placeholder="e.g., Production API Key"
              />
            </div>
          </div>
          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => setIsCreating(false)}
              className="rounded-md border border-[#222c3c] bg-[#181c24] px-4 py-2 text-sm font-medium text-gray-200 shadow-sm hover:bg-[#222c3c] focus:outline-none focus:ring-2 focus:ring-[#007BFF] focus:ring-offset-2"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleCreateKey}
              className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Create Key
            </button>
          </div>
        </div>
      )}

      {apiKeys.length === 0 ? (
        <div className="mt-8 rounded-lg bg-[#181c24] p-6 shadow text-center text-gray-300">
          <p>No API keys found. Create your first API key to get started.</p>
        </div>
      ) : (
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg bg-[#181c24]">
                <table className="min-w-full divide-y divide-[#222c3c]">
                  <thead className="bg-[#232b3a]">
                  <tr>
                    <th
                      scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-6"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-white"
                    >
                      API Key
                    </th>
                    <th
                      scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-white"
                    >
                      Created
                    </th>
                    <th
                      scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-white"
                    >
                      Last Used
                    </th>
                    <th
                      scope="col"
                      className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                    >
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                  <tbody className="divide-y divide-[#222c3c] bg-[#181c24]">
                    {apiKeys.map((key) => (
                      <tr key={key.id}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-6">
                          {key.name}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                          {key.key}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                          {new Date(key.createdAt).toLocaleDateString()}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                          {key.lastUsed ? new Date(key.lastUsed).toLocaleDateString() : 'Never'}
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          <button
                            onClick={() => handleDeleteKey(key.id)}
                            className="text-red-400 hover:text-red-300"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      )}
    </div>
  );
} 