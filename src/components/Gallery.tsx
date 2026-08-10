import {
  ArrowUpRight,
  Star,
  Search,
  Command,
  ArrowRight,
} from "lucide-react";
import type { ReactNode } from "react";
import type { HookEntry } from "../lib/registry";
import {
  CATEGORY_ORDER,
  CATEGORY_ACCENT,
  HOOK_META,
  type Category,
} from "../lib/meta";
import { Faq } from "./Faq";

export function Gallery({
  hooks,
  allCount,
  category,
  onCategoryChange,
  onSelect,
  favorites,
  onToggleFavorite,
  favoritesOnly,
  onToggleFavoritesOnly,
  query,
  onQueryChange,
  onOpenPlayground,
}: {
  hooks: HookEntry[];
  allCount: number;
  category: Category | "All";
  onCategoryChange: (c: Category | "All") => void;
  onSelect: (slug: string) => void;
  favorites: string[];
  onToggleFavorite: (slug: string) => void;
  favoritesOnly: boolean;
  onToggleFavoritesOnly: () => void;
  query: string;
  onQueryChange: (q: string) => void;
  onOpenPlayground: () => void;
}) {
  return (
    <div className="bg-canvas text-ink antialiased min-h-screen flex flex-col">
      {/*  Hero Section */}
      <section className="relative overflow-hidden border-b border-border py-20 sm:py-32">
        {/* Subtle, Centered Grid Background with Radial Mask */}
        <div className="absolute inset-0 z-0 pointer-events-none flex justify-center">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:48px_48px] opacity-40 [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,#000_40%,transparent_100%)]" />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          {/* Badge */}
          <div className="mx-auto mb-3 inline-flex items-center gap-2.5 px-3.5 py-1.5 text-[13px] font-medium text-ink-faint">
            <span className="text-ink-soft">{allCount} hooks</span>
            <span className="h-1 w-1 rounded-full bg-border-strong" />
            <span>Zero Dependencies</span>
            <span className="h-1 w-1 rounded-full bg-border-strong" />
            <span>MIT Licensed</span>
          </div>

          {/* Heading */}
          <h1 className="mx-auto max-w-3xl text-4xl font-medium tracking-tight text-ink sm:text-6xl sm:leading-[1.15]">
            <span className="text-ink-soft">A curated shelf of</span>{" "}
            <br className="hidden sm:inline" />
            essential React hooks.
          </h1>

          {/* Subtitle */}
          <p className="mx-auto mt-6 max-w-xl text-[15px] leading-relaxed text-ink-soft sm:text-base">
            Logic primitives crafted for clarity, performance, and developer
            experience. Inspect live examples, then drop the source directly
            into your codebase.
          </p>

          {/* Actions */}
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="#browse"
              className="inline-flex h-10 items-center justify-center rounded-lg bg-solid px-5 text-sm font-medium text-on-solid transition-all hover:bg-solid/90 active:scale-[0.98]"
            >
              Browse hooks
            </a>
            <button
              onClick={onOpenPlayground}
              className="group inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-border bg-surface px-5 text-sm font-medium text-ink transition-all hover:border-border-strong hover:bg-surface/80 active:scale-[0.98]"
            >
              Try the playground
              <ArrowRight
                className="h-3.5 w-3.5 text-ink-faint transition-transform group-hover:translate-x-0.5 group-hover:text-ink"
                strokeWidth={2}
              />
            </button>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div id="browse" className="mx-auto w-full max-w-6xl px-6 flex-1">
        {/* Navigation / Filtering */}
        <div className="flex flex-col gap-4 py-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-1.5">
            <FilterPill
              active={category === "All" && !favoritesOnly}
              onClick={() => {
                onCategoryChange("All");
                if (favoritesOnly) onToggleFavoritesOnly();
              }}
              label={`All · ${allCount}`}
            />
            {CATEGORY_ORDER.map((c) => (
              <FilterPill
                key={c}
                active={category === c && !favoritesOnly}
                onClick={() => {
                  onCategoryChange(c);
                  if (favoritesOnly) onToggleFavoritesOnly();
                }}
                label={c}
                dotClass={CATEGORY_ACCENT[c].dot}
              />
            ))}
            <span className="mx-1.5 h-4 w-px bg-border" />
            <FilterPill
              active={favoritesOnly}
              onClick={onToggleFavoritesOnly}
              label={`Favorites · ${favorites.length}`}
              icon={
                <Star
                  className="h-3 w-3"
                  strokeWidth={2}
                  fill={favoritesOnly ? "currentColor" : "none"}
                />
              }
            />
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-64">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint"
              strokeWidth={1.75}
            />
            <input
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
              placeholder="Search hooks…"
              className="w-full rounded-lg border border-border bg-surface py-2 pl-9 pr-12 text-[14px] text-ink outline-none transition-colors focus:border-border-strong focus:ring-1 focus:ring-border-strong placeholder:text-ink-faint"
            />
            <span className="pointer-events-none absolute right-2.5 top-1/2 hidden -translate-y-1/2 items-center gap-0.5 rounded border border-border bg-canvas px-1.5 py-0.5 text-[10px] font-mono text-ink-faint sm:flex">
              <Command className="h-2.5 w-2.5" strokeWidth={2.5} />K
            </span>
          </div>
        </div>

        {/* Hook Cards Grid */}
        <div className="min-h-[420px] pb-24">
          {hooks.length === 0 ? (
            <div className="flex min-h-[300px] flex-col items-center justify-center rounded-xl border border-dashed border-border py-16 text-center">
              <p className="text-sm font-medium text-ink-soft">
                No hooks found
              </p>
              <p className="mt-1.5 text-[13px] text-ink-faint">
                Try adjusting your filters or search query.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {hooks.map((hook) => {
                const meta = HOOK_META[hook.name];
                const Icon = meta?.icon;
                const accent = meta ? CATEGORY_ACCENT[meta.category] : null;
                const isFav = favorites.includes(hook.slug);

                return (
                  <div
                    key={hook.slug}
                    onClick={() => onSelect(hook.slug)}
                    className="group relative flex flex-col justify-between rounded-xl border border-border bg-surface p-5 transition-all duration-300 hover:border-border-strong hover:bg-[color-mix(in_srgb,var(--color-surface)_95%,var(--color-border))] cursor-pointer"
                  >
                    <div>
                      {/* Card Header */}
                      <div className="flex items-start justify-between gap-3">
                        {Icon ? (
                          <div
                            className={`flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-canvas ${accent?.text}`}
                          >
                            <Icon className="h-5 w-5" strokeWidth={1.5} />
                          </div>
                        ) : (
                          <div className="h-10 w-10" />
                        )}

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onToggleFavorite(hook.slug);
                          }}
                          aria-label={
                            isFav ? "Remove from favorites" : "Add to favorites"
                          }
                          className={`-mr-2 -mt-2 p-2 rounded-lg transition-colors ${
                            isFav
                              ? "text-amber-400"
                              : "text-ink-faint opacity-0 group-hover:opacity-100 hover:text-ink"
                          }`}
                        >
                          <Star
                            className="h-4.5 w-4.5 transition-transform active:scale-90"
                            strokeWidth={1.75}
                            fill={isFav ? "currentColor" : "none"}
                          />
                        </button>
                      </div>

                      {/* Content */}
                      <div className="mt-5">
                        <h3 className="font-mono text-[14px] font-medium tracking-tight text-ink">
                          {hook.name}
                        </h3>
                        <p className="mt-2 line-clamp-2 text-[13px] leading-relaxed text-ink-soft">
                          {hook.summary}
                        </p>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="mt-6 flex items-center justify-between border-t border-border pt-4 text-xs">
                      {meta ? (
                        <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-ink-soft">
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${accent?.dot ?? "bg-ink-faint"}`}
                          />
                          {meta.category}
                        </span>
                      ) : (
                        <span />
                      )}

                      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-ink-faint transition-colors group-hover:text-ink">
                        View hook
                        <ArrowUpRight
                          className="h-3 w-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                          strokeWidth={2}
                        />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <Faq />
    </div>
  );
}

function FilterPill({
  active,
  onClick,
  label,
  dotClass,
  icon,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  dotClass?: string;
  icon?: ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex shrink-0 items-center gap-1.5 rounded-lg border px-3 py-1.5 text-[13px] font-medium transition-all ${
        active
          ? "border-solid bg-solid text-on-solid"
          : "border-transparent text-ink-soft hover:border-border hover:bg-surface hover:text-ink"
      }`}
    >
      {dotClass && (
        <span
          className={`h-1.5 w-1.5 rounded-full ${active ? "bg-on-solid" : dotClass}`}
        />
      )}
      {icon}
      {label}
    </button>
  );
}
