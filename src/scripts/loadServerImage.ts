import iUser from "types/iUser";

export default async function GetServerImage(
  imageName: String,
  user: iUser | null
): Promise<String> {
  if (imageName == "no image") return "";
  const url = `${process.env.REACT_APP_API_URL}image/${imageName}`;
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${user?.token}`,
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const blob = await response.blob();
      const imageUrlObject = URL.createObjectURL(blob);

      return imageUrlObject;
    } else {
      console.error("Request failed with status:", response.status);
      return "no image";
    }
  } catch (error) {
    console.error("Request error:", error);
    return "no image";
  }
}
