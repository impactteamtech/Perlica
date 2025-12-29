import { Loader2 } from "lucide-react";

function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ");
}

type LoadingProps = {
  className?: string;
  label?: string;
};

function Loading({ className, label = "Loading..." }: LoadingProps) {
  return (
    <div className={cn("w-full py-16 flex items-center justify-center", className)}>
      <div className="flex items-center text-2xl gap-3">
        <Loader2 className="h-5 w-5 animate-spin text-secondary" />
        <span className="text-sm text-primary">{label}</span>
      </div>
    </div>
  );
}

export { Loading };
