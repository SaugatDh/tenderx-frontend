import type { Metadata } from "next";
import { ReferenceHomepage } from "@/components/public/ReferenceHomepage";

export const metadata: Metadata = {
  title: "TenderX Nepal — Prepare your next bid with confidence",
  description:
    "Bring company profiles, partner details, signatures, and bid documents together in one joint-venture workspace built for Nepali contractors.",
};

export default function HomePage() {
  return <ReferenceHomepage />;
}
