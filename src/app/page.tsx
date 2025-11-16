export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center">
        <h1 className="mb-4 text-6xl font-bold">🧠 DevBrain</h1>
        <p className="mb-8 text-xl text-muted-foreground">
          Your All-in-One DevOps Control Center
        </p>
        <div className="flex gap-4 justify-center">
          <a
            href="/dashboard"
            className="rounded-lg bg-primary px-6 py-3 text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Go to Dashboard
          </a>
          <a
            href="/auth/signin"
            className="rounded-lg border border-input px-6 py-3 hover:bg-accent transition-colors"
          >
            Sign In
          </a>
        </div>
      </div>
    </div>
  );
}
