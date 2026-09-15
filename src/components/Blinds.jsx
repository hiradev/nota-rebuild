/**
 * The venetian-blind reveal used in "Inside the box": 25 equal-height
 * white slats layered over a background image, each collapsing from
 * full height to zero (staggered) to reveal the photo beneath.
 */
export default function Blinds() {
  return (
    <div className="inside__blinds-blinds" aria-hidden="true">
      {Array.from({ length: 25 }).map((_, i) => (
        <div className="inside__blind" key={i} />
      ))}
    </div>
  );
}
