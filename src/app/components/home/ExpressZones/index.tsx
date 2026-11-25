import { motion } from "framer-motion";
import { Clock, MapPin } from "lucide-react";
import { ZONES } from "@/data/bakery";
import { useCart } from "@/context/CartContext";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

type Zone = (typeof ZONES)[number];

export default function ExpressZones() {
  const { zone, setZone } = useCart();
  const active = ZONES.find((z: Zone) => z.name === zone);

  return (
    <section
      id="zones"
      className="py-20 md:py-28 scroll-mt-16"
      data-testid="express-zones"
    >
      <div className="max-w-[1320px] mx-auto px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.9, ease: EASE }}
          className="relative overflow-hidden rounded-[2.5rem] md:rounded-[3rem] bg-cocoa text-vanilla p-8 md:p-14 lg:p-16 grid lg:grid-cols-2 gap-12 items-center"
        >
          <div>
            <span className="font-script text-3xl text-frosting">
              sixty minutes or less
            </span>
            <h2 className="mt-3 font-display font-bold uppercase text-3xl md:text-5xl tracking-[0.04em]">
              Dhaka Express Zones
            </h2>
            <p className="mt-4 max-w-md text-vanilla/65 font-light leading-relaxed text-sm md:text-base">
              Our riders leave the oven door every fifteen minutes. Pick your
              zone to see the live express window and delivery fee &mdash; the
              bag updates instantly.
            </p>

            <div
              className="mt-8 flex flex-wrap gap-2"
              data-testid="zone-selector"
            >
              {ZONES.map((z: Zone) => (
                <button
                  key={z.name}
                  data-testid={`zone-${z.name.toLowerCase()}`}
                  onClick={() => setZone(z.name)}
                  className={`rounded-full border px-4 py-2 text-[10px] font-bold tracking-[0.2em] uppercase transition-all duration-300 ${
                    zone === z.name
                      ? "bg-honey text-cocoa border-honey"
                      : "border-vanilla/25 text-vanilla/70 hover:border-vanilla/60 hover:text-vanilla"
                  }`}
                >
                  {z.name}
                </button>
              ))}
            </div>

            <div
              className="mt-9 flex items-end gap-8"
              data-testid="zone-detail"
            >
              <div>
                <span className="flex items-center gap-2 text-[10px] font-bold tracking-[0.28em] text-vanilla/50 uppercase">
                  <Clock size={12} /> Express window
                </span>
                <p
                  className="mt-1.5 font-display font-bold text-4xl md:text-5xl text-honey"
                  data-testid="zone-eta"
                >
                  {active?.eta}
                </p>
              </div>
              <div className="pb-1">
                <span className="flex items-center gap-2 text-[10px] font-bold tracking-[0.28em] text-vanilla/50 uppercase">
                  <MapPin size={12} /> Delivery fee
                </span>
                <p
                  className="mt-1.5 font-display font-bold text-4xl md:text-5xl"
                  data-testid="zone-fee"
                >
                  ৳{active?.fee}
                </p>
              </div>
            </div>
          </div>

          {/* Stylized Dhaka coverage map */}
          <div
            className="relative aspect-[5/4] rounded-[2rem] border border-vanilla/15 bg-[#6B3A1D]/40 overflow-hidden"
            data-testid="zone-map"
          >
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 500 400"
              fill="none"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path
                d="M-20 300 C120 260 180 320 300 240 S480 200 520 240"
                stroke="rgba(255,249,245,0.14)"
                strokeWidth="1.5"
                strokeDasharray="6 8"
              />
              <path
                d="M-20 120 C100 160 240 60 380 120 S480 160 520 120"
                stroke="rgba(255,249,245,0.12)"
                strokeWidth="1.5"
                strokeDasharray="6 8"
              />
              <path
                d="M120 -20 C160 100 260 180 300 420"
                stroke="rgba(255,249,245,0.10)"
                strokeWidth="1.5"
                strokeDasharray="6 8"
              />
              <circle
                cx="250"
                cy="200"
                r="30"
                stroke="rgba(255,249,245,0.28)"
                strokeWidth="1.5"
              />
              <circle
                cx="250"
                cy="200"
                r="9"
                stroke="rgba(255,249,245,0.28)"
                strokeWidth="1.5"
              />
              <text
                x="250"
                y="296"
                textAnchor="middle"
                fill="rgba(255,249,245,0.45)"
                style={{
                  fontSize: "9px",
                  letterSpacing: "2px",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 700,
                }}
              >
                DX BAKERY · BANANI
              </text>
            </svg>

            {ZONES.map((z: Zone) => {
              const isActive = zone === z.name;
              return (
                <button
                  key={z.name}
                  data-testid={`zone-pin-${z.name.toLowerCase()}`}
                  onClick={() => setZone(z.name)}
                  style={{ left: `${z.x}%`, top: `${z.y}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 flex items-center gap-2 group"
                  aria-label={`Select ${z.name} zone`}
                >
                  <span
                    className={`w-3.5 h-3.5 rounded-full border-2 transition-all duration-300 ${
                      isActive
                        ? "bg-coral border-coral scale-125 ring-4 ring-coral/30"
                        : "bg-vanilla/80 border-vanilla/40 group-hover:scale-125"
                    }`}
                  />
                  <span
                    className={`text-[10px] font-bold tracking-[0.18em] transition-colors ${
                      isActive
                        ? "text-honey"
                        : "text-vanilla/70 group-hover:text-vanilla"
                    }`}
                  >
                    {z.name.toUpperCase()}
                  </span>
                </button>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
