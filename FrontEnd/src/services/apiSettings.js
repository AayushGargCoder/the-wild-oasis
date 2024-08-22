export async function getSettings() {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/settings`);
    const { data } = await res.json();
    return data.setting[0];
  } catch (err) {
    throw new Error("Unable  to fetch Settings data");
  }
}

// We expect a newSetting object that looks like {setting: newValue}
export async function updateSetting(newSetting) {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/settings`, {
      method: "PATCH",
      body: JSON.stringify(newSetting),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const setting = await res.json();
    return setting;
  } catch (err) {
    console.log(err);
    throw new Error("Unable  to Edit Setting");
  }
}
