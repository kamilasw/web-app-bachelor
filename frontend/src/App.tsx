function App() {
  return (
    <main className="min-h-screen bg-background p-8">
      <div className="rounded-lg border border-border-default bg-surface p-6">
        <h1 className="text-2xl font-bold text-foreground">
          Customer Segmentation
        </h1>

        <p className="mt-2 text-base text-muted">
          Design System Preview
        </p>

        <button className="mt-6 rounded-sm bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-hover">
          Create Dashboard
        </button>

        <p className="mt-4 text-sm text-success">
          Theme successfully configured
        </p>
      </div>
    </main>
  );
}

export default App;
