import { redirect } from "next/navigation";

export default function Home() {
  // Eski anasayfa kaldırıldı, doğrudan yeni E-Ticaret / Dashboard paneline yönlendiriliyor.
  redirect("/dashboard");
}
