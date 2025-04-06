import Image from "next/image";
import Link from "next/link";

interface LocationCardProps {
  title: string;
  description?: string;
  imageSrc: string;
  href: string;
}

export function LocationCard({
  title,
  description,
  imageSrc,
  href,
}: LocationCardProps) {
  return (
    <Link
      href={href}
      className="group relative block h-full overflow-hidden rounded-lg">
      <div className="relative h-80 w-full overflow-hidden">
        <Image
          src={imageSrc || "/placeholder.png"}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
      </div>
      <div className="absolute bottom-0 left-0 w-full p-6 text-white">
        <h3 className="text-2xl font-light tracking-wide">{title}</h3>
        {description && (
          <p className="mt-2 max-w-md text-sm font-light text-white/80">
            {description}
          </p>
        )}
      </div>
    </Link>
  );
}
