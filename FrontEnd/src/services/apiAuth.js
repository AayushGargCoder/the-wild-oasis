export async function login(email, password) {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/users/login`, {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    if (data.status === "fail") throw new Error(data.message);

    return data.data.user;
  } catch (err) {
    throw new Error(err.message);
  }
}
