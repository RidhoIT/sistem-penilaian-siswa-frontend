export async function uploadGambarKeCloudinary(base64: string): Promise<string> {
  const formData = new FormData();
  formData.append("file", base64);
  formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_PRESET || "");

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
    { method: "POST", body: formData }
  );

  if (!res.ok) throw new Error("Upload gambar ke Cloudinary gagal");
  const data = await res.json();
  if (!data.secure_url) throw new Error("URL gambar tidak ditemukan");
  return data.secure_url as string;
}