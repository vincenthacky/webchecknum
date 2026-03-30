"use client";

// Spinner d'attente pendant l'hydratation de Zustand depuis localStorage.
// Utiliser dans les pages protégées : if (!hydrated) return <AuthLoading />;
export function AuthLoading() {
  return (
    <div className="flex justify-center items-center py-20">
      <div className="w-6 h-6 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );
}
