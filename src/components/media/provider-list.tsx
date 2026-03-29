import { WatchProviderResult } from "@/lib/api/types";
import { getLogoURL } from "@/lib/movies";
import Image from "next/image";

interface ProviderListProps {
  providers: WatchProviderResult | undefined;
}

function ProviderSection({
  title,
  items,
}: {
  title: string;
  items: { logo_path: string; provider_name: string }[];
}) {
  if (!items || items.length === 0) return null;

  return (
    <div className="space-y-2">
      <h4 className="text-sm font-medium text-muted-foreground">{title}</h4>
      <div className="flex flex-wrap gap-2">
        {items.map((provider) => (
          <div
            key={provider.provider_name}
            title={provider.provider_name}
            className="relative h-10 w-10 overflow-hidden rounded-lg"
          >
            <Image
              src={getLogoURL(provider.logo_path, "small")}
              alt={provider.provider_name}
              fill
              className="object-cover"
              sizes="40px"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export function ProviderList({ providers }: ProviderListProps) {
  if (!providers) return null;

  const hasAny =
    providers.flatrate?.length ||
    providers.rent?.length ||
    providers.buy?.length;

  if (!hasAny) return null;

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Where to Watch</h3>
      <div className="flex flex-wrap gap-8">
        {providers.flatrate && (
          <ProviderSection title="Stream" items={providers.flatrate} />
        )}
        {providers.rent && (
          <ProviderSection title="Rent" items={providers.rent} />
        )}
        {providers.buy && (
          <ProviderSection title="Buy" items={providers.buy} />
        )}
      </div>
      <p className="text-xs text-muted-foreground">
        Powered by{" "}
        <a
          href={providers.link}
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-primary"
        >
          JustWatch
        </a>
      </p>
    </div>
  );
}
