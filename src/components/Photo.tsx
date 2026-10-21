type PhotoProps = {
  src: string;
  w: number;
  h: number;
  alt: string;
  caption?: string;
  credit?: string;
  className?: string;
  imgClassName?: string;
  eager?: boolean;
  /** Shown small at the bottom-left of the frame. */
  showCredit?: boolean;
};

export function Photo({
  src,
  w,
  h,
  alt,
  caption,
  credit,
  className = "",
  imgClassName = "",
  eager = false,
  showCredit = false,
}: PhotoProps) {
  return (
    <figure className={`photo ${className}`}>
      <img
        src={src}
        width={w}
        height={h}
        alt={alt}
        className={imgClassName}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
      />
      {(caption || (showCredit && credit)) && (
        <figcaption className="absolute bottom-0 left-0 right-0 flex flex-col gap-0.5 p-3 t-small leading-tight text-paper/90">
          {caption && <span>{caption}</span>}
          {showCredit && credit && (
            <span className="opacity-70">{credit}</span>
          )}
        </figcaption>
      )}
    </figure>
  );
}
