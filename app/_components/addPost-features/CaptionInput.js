export default function CaptionInput({ caption, setCaption }) {
  return (
    <textarea
      className="mb-2 w-full rounded border p-2 text-black"
      placeholder="Write a caption..."
      value={caption}
      onChange={(e) => setCaption(e.target.value)}
      rows={2}
      maxLength={250}
    />
  );
}
