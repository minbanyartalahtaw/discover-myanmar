import Image from "next/image";
import Link from "next/link";

interface LocationCardProps {
  title: string;
  description?: string;
  imageSrc: string;
  href: string;
  contentCount?: number; // Added contentCount prop
}

export function LocationCard({
  title,
  description,
  imageSrc,
  href,
  contentCount = 0, // Default value of 0
}: LocationCardProps) {
  return (
    <Link
      href={href}
      className="group relative block h-full overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl">
      <div className="relative h-80 w-full overflow-hidden">
        <Image
          src={imageSrc || "/placeholder.png"}
          alt={title}
          fill
          className="object-cover transition-all duration-700 ease-out group-hover:scale-110"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20 opacity-80 transition-opacity duration-300 group-hover:opacity-90" />
        <div className="absolute top-4 right-4 px-3 py-1 text-sm font-light text-white/90 bg-black/50 rounded-full backdrop-blur-sm">
          {contentCount} items
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full p-8 transform transition-transform duration-300 group-hover:translate-y-[-8px]">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-light tracking-wider text-white/90 transition-all duration-300 group-hover:text-white">
            {title}
          </h3>
        </div>
        {description && (
          <p className="mt-3 max-w-md overflow-hidden text-sm font-light text-white/70 opacity-0 transition-all duration-300 group-hover:opacity-100">
            {description}
          </p>
        )}
        <div className="mt-4 h-[1px] w-0 bg-white/30 transition-all duration-300 group-hover:w-full" />
      </div>
    </Link>
  );
}
