"use client";

import useSWR from "swr";

export default function useOwnerStatus(token) {
    const header = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
    };

    const fetcher = (url) =>
        fetch(url, { headers: header }).then((res) => {
            if (!res.ok) {
                const error = new Error(
                    "An error occurred while fetching the data."
                );
                // Attach extra info to the error object.
                error.info = res.json();
                error.status = res.status;
                throw error;
            }
            return res.json();
        });
    const { data, error, isLoading, mutate } = useSWR(
        `${process.env.NEXT_PUBLIC_API_HOST}/shop-owners/status`,
        fetcher
    );
    return { newOwner: data, isLoading, isError: error, mutate };
}
