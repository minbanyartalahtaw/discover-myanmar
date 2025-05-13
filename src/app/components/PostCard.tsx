import Image from "next/image";
import Link from "next/link";

interface PostCardProps {
  title: string;
  imageSrc: string;
  href: string;
}

export function PostCard({
  title,
  imageSrc,
  href,
}: PostCardProps) {
  return (
    <Link
      href={href}
      className="group relative block h-full overflow-hidden rounded-lg bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <Image
          src={imageSrc || "/placeholder.png"}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 ease-out will-change-transform group-hover:scale-105"
          priority
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-50 transition-opacity duration-300 group-hover:opacity-100" />
      </div>
      <div className="absolute bottom-0 left-0 w-full p-6 translate-y-4 transition-transform duration-300 group-hover:translate-y-0">
        <div className="overflow-hidden">
          <h3 className="text-xl font-medium text-white transform-gpu transition-transform duration-300">
            {title}
          </h3>
        </div>
        <div className="mt-3 h-[2px] w-12 bg-white/40 transition-all duration-300 group-hover:w-24 group-hover:bg-white" />
      </div>
    </Link>
  );
}
