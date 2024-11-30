export default function Loading({ className }: { className?: string }) {
  return (
    <div
      className={`inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] absolute left-1/2 top-1/2 ${className}`}
      role="status"
    >
    </div>
  );
}
