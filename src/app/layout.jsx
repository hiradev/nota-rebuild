import { Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";
import "./sections.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
});

export const metadata = {
  title: "NŌTA — Smart pen for real thinking",
  description:
    "NOTA smart pen — precision writing hardware with real-time digital continuity.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${instrumentSerif.variable} root--primary`}>
        {children}
      </body>
    </html>
  );
}
