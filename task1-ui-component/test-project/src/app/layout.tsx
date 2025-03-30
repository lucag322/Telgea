import { UIProvider } from "./context/UIContext";
import { LoadingErrorProvider } from "./context/LoadingErrorContext";
import { NavigationProvider } from "./context/NavigationContext";
import { DataStoreProvider } from "./context/DataStoreContext";
import "./globals.css";
import Header from "./components/Header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <UIProvider>
          <LoadingErrorProvider>
            <NavigationProvider>
              <DataStoreProvider>
                <div className="px-6 pb-16">
                  <Header />
                  <main className="container mx-auto pt-4">{children}</main>
                </div>
              </DataStoreProvider>
            </NavigationProvider>
          </LoadingErrorProvider>
        </UIProvider>
      </body>
    </html>
  );
}
