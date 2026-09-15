/** Venetian-blind reveal: 25 white slats collapsing (staggered) to reveal the photo beneath. */
export default function Blinds() {
  return (
    <div className="inside__blinds-blinds" aria-hidden="true">
      {Array.from({ length: 25 }).map((_, i) => (
        <div className="inside__blind" key={i} />
      ))}
    </div>
  );
}
