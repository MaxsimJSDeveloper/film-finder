export default function NotFoundPage() {
  return (
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <p>Sorry, we could not find that page</p>
      <a href="/">Go to Home</a>
    </main>
  );
}
