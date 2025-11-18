// @ts-expect-error - vite-imagetools query parameters
import heroSmall from "../../assets/hero.webp?w=300";
// @ts-expect-error - vite-imagetools query parameters
import heroMedium from "../../assets/hero.webp?w=600";
// @ts-expect-error - vite-imagetools query parameters
import heroLarge from "../../assets/hero.webp?w=900";

interface ResponsiveImageProps {
  className?: string;
  alt?: string;
}

const ResponsiveImage = ({ className, alt = "hero" }: ResponsiveImageProps) => {
  return (
    <img
      src={heroSmall}
      srcSet={`${heroSmall} 300w, ${heroMedium} 600w, ${heroLarge} 900w`}
      sizes="(max-width: 600px) 300px, (max-width: 900px) 600px, 900px"
      className={className}
      alt={alt}
      loading="lazy"
    />
  );
};

export default ResponsiveImage;
