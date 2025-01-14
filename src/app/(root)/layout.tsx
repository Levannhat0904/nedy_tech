import { NDashboardLayout } from "@/components/templates";
import "../globals.css";
import { EvenEditProvider } from "@/contexts/EventContext";
import { QueryParamsProvider } from "@/contexts/FilterContext";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NDashboardLayout>
      <EvenEditProvider>
        <QueryParamsProvider>{children}</QueryParamsProvider>
      </EvenEditProvider>
    </NDashboardLayout>
  );
}
// }
