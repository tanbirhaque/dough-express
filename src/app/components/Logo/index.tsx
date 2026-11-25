interface LogoProps {
  dark?: boolean;
}

export default function Logo({ dark = false }: LogoProps) {
  return (
    <span
      className={`font-display font-bold uppercase text-xl tracking-[0.08em] ${dark ? "text-vanilla" : "text-cocoa"}`}
    >
      Dough Express
    </span>
  );
}
