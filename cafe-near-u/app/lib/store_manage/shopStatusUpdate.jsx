export default async function shopStatusUpdate(token, request) {
    const header = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
    };
    const body = JSON.stringify(request);

    const data = fetch(
        `${process.env.NEXT_PUBLIC_API_HOST}/shop-owners/status`,
        {
            headers: header,
            body,
            method: "PUT",
        }
    ).then((res) => res.status);

    return data;
}
