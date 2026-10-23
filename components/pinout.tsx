import type { Link } from "@/content/site";

type Pin = { number: number; side: "left" | "right"; row: number; link?: Link };

// Lays links out like a DIP package: pin 1 at the top left, numbering runs
// down the left side and back up the right. Unused pins become "NC".
function assignPins(links: Link[]): Pin[] {
  const perSide = Math.max(2, Math.ceil(links.length / 2));
  return Array.from({ length: perSide * 2 }, (_, i) => {
    const left = i < perSide;
    return {
      number: i + 1,
      side: left ? "left" : "right",
      row: left ? i + 1 : perSide * 2 - i,
      link: links[i],
    };
  });
}

export function Pinout({ links, marking }: { links: Link[]; marking: string }) {
  const pins = assignPins(links);
  const rows = pins.length / 2;

  return (
    <ol
      className="pinout"
      aria-label="Links"
      style={{ gridTemplateRows: `repeat(${rows}, var(--pitch))` }}
    >
      {pins.map((pin) => {
        const content = (
          <>
            <span className="pin-label">{pin.link?.label ?? "NC"}</span>
            <span className="pin-leg" aria-hidden="true" />
            <span className="pin-number" aria-hidden="true">
              {pin.number}
            </span>
          </>
        );
        // rel="me" marks the other profiles as belonging to the same person.
        const rel = pin.link?.href.startsWith("https://") ? "me" : undefined;
        return (
          <li
            key={pin.number}
            className={`pin pin-${pin.side}`}
            style={{ gridRow: pin.row }}
            aria-hidden={pin.link ? undefined : true}
          >
            {pin.link ? (
              <a href={pin.link.href} className="pin-body" rel={rel}>
                {content}
              </a>
            ) : (
              <span className="pin-body pin-nc">{content}</span>
            )}
          </li>
        );
      })}
      <li className="chip" aria-hidden="true">
        <span className="chip-marking">{marking}</span>
      </li>
    </ol>
  );
}
