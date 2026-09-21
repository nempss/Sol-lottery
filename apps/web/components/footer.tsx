import { CLUSTER } from "@/lib/constants";
import { BRAND_NAME } from "@/lib/brand";
export function Footer() {
  return (
    <footer className="mt-20 border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-8 text-xs text-mute sm:flex-row sm:items-center sm:justify-between">
        <p>{BRAND_NAME} · {CLUSTER}</p>
        <p>Chain state is authoritative. This UI never selects winners.</p>
      </div>
    </footer>
  );
}
