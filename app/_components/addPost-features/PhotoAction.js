export default function PhotoActions({
  preview,
  handleRemoveImage,
  handleUpload,
}) {
  if (!preview) return null;

  return (
    <>
      <button
        className="mt-4 rounded bg-[var(--color-border)] px-4 py-2 text-sm text-red-600"
        onClick={handleRemoveImage}
      >
        Remove Image
      </button>

      <button
        className="mt-4 rounded bg-[var(--color-light)] px-4 py-2 text-[var(--color-white)]"
        onClick={handleUpload}
      >
        Upload & Exit
      </button>
    </>
  );
}
