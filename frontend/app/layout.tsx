import "./globals.css";

export const metadata = {
  title: "YafAI Studio",
  description: "Code at the speed of thought",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <nav style={{
          padding: "20px 32px",
          borderBottom: "1px solid #1f2437",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          fontWeight: 700,
          fontSize: "18px"
        }}>
          🚀 <span style={{ color: "#6c7cff" }}>YafAI</span> Studio
        </nav>

        <main style={{ maxWidth: 900, margin: "0 auto", padding: 32 }}>
          {children}
        </main>
      </body>
    </html>
  );
}
