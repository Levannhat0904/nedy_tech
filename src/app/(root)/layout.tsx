import { NDashboardLayout } from "@/components/templates";
import "../globals.css";
import { EvenEditProvider } from "@/contexts/EventContext";
import { FilterProvider } from "@/contexts/FilterContext";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NDashboardLayout>
      <EvenEditProvider>
        <FilterProvider>{children}</FilterProvider>
      </EvenEditProvider>
    </NDashboardLayout>
  );
}
// }
