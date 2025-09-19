export default function Header() {
  return (
    <header className="bg-primary text-primary-foreground shadow-sm">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="text-primary-foreground/80 text-sm">
              Welcome to Zettabyte Technology Inc.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-medium">Messages</p>
              <p className="text-xs text-primary-foreground/60">
                {new Date().toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export { Header };
