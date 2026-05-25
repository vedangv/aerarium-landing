type MobileSnapBeatProps = {
  className?: string;
};

export default function MobileSnapBeat({ className = "" }: MobileSnapBeatProps) {
  return <div className={`snap-beat lg:hidden ${className}`} aria-hidden="true" />;
}
