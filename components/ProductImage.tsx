import Image from "next/image";

/** Real photography wrapper — rounded-top media with hover zoom inside `group` cards. */
export function ProductImage({
  src,
  alt,
  ratio = "aspect-[4/3]",
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
  eager = false,
}: {
  src: string;
  alt: string;
  ratio?: string;
  sizes?: string;
  eager?: boolean;
}) {
  return (
    <div className={`relative overflow-hidden ${ratio}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={eager}
        className="object-cover transition-transform duration-700 group-hover:scale-105"
      />
    </div>
  );
}
