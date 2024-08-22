export async function getCabins() {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/cabins`);
    // const res = await fetch("http://localhost:8000/api/v1/cabins");
    const { data } = await res.json();
    return data.cabins;
  } catch (err) {
    throw new Error("Unable  to fetch Cabins data");
  }
}

export async function deleteCabin(cabinId) {
  try {
    await fetch(`${import.meta.env.VITE_API_URL}/cabins/${cabinId}`, {
      method: "DELETE",
    });
  } catch (err) {
    throw new Error("Unable  to Delete Cabins data");
  }
}
export async function createCabin(newCabin) {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/cabins`, {
      method: "POST",
      body: JSON.stringify(newCabin),
      headers: {
        "Content-Type": "application/json",
      },
    });
    await res.json();
  } catch (err) {
    throw new Error("Unable  to Create Cabin");
  }
}
export async function editCabin(editCabin, cabinId) {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/cabins/${cabinId}`,
      {
        method: "PATCH",
        body: JSON.stringify(editCabin),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    await res.json();
  } catch (err) {
    throw new Error("Unable  to Edit Cabin");
  }
}
