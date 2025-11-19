import hero from "../../assets/hero.webp";

interface ResponsiveImageProps {
  className?: string;
  alt?: string;
}

const ResponsiveImage = ({ className, alt = "hero" }: ResponsiveImageProps) => {
  return (
    <img
      src={hero}
      srcSet={`${hero} 300w, ${hero} 600w, ${hero} 900w`}
      sizes="(max-width: 600px) 300px, (max-width: 900px) 600px, 900px"
      className={className}
      alt={alt}
      loading="lazy"
    />
  );
};

export default ResponsiveImage;
