import { useState, useEffect, useCallback } from "react";
import axiosInstance from "@/core/services/axios/axiosInstance";
import { getEndpoint } from "@/core/constant/apis";
import { toast } from "sonner";
import axios from "axios";

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  fetchData: (params?: Record<string, any>) => Promise<void>;
}

export const useGetApi = <T>(
  endpointKey: string,
  params?: Record<string, any>,
  autoFetch: boolean = true
): FetchState<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(autoFetch);
  const [error, setError] = useState<string | null>(null);

  // Function to fetch data
  const fetchData = useCallback(async (queryParams?: Record<string, any>) => {
    setLoading(true);
    setError(null);
    try {
      const url = getEndpoint(endpointKey);
      const { data } = await axiosInstance.get<T>(url, { 
        params: queryParams || params 
      });
      setData(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred";
      toast.error("Error Fetching Data", {
        description: errorMessage,
      });
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [endpointKey, params]);

  // Auto-fetch on mount if enabled
  useEffect(() => {
    if (autoFetch) {
      fetchData();
    }
  }, [fetchData, autoFetch]);

  return { data, loading, error, fetchData };
};