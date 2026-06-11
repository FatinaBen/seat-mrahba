import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Seat & Mrahba — L'expérience digitale pour vos invités",
  description:
    "Seat & Mrahba transforme vos événements avec un QR code élégant qui guide vos invités : plan de table, programme, menu, galerie photos. Pour les mariages, fiançailles et événements au Maroc.",
  keywords:
    "mariage Maroc, plan de table digital, QR code mariage, expérience invité, wedding Morocco",
  openGraph: {
    title: "Seat & Mrahba — L'expérience digitale pour vos invités",
    description:
      "Un QR code personnalisé qui accueille vos invités avec toutes les informations de votre événement.",
    type: "website",
    locale: "fr_FR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="h-full">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
