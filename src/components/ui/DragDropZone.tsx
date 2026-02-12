import { useState, type ReactNode } from "react";

export function DragDropZone({
  onFiles,
  children,
}: {
  onFiles: (files: File[]) => void;
  children?: ReactNode;
}) {
  const [dragging, setDragging] = useState(false);

  return (
    <label
      onDragOver={(event) => {
        event.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={(event) => {
        event.preventDefault();
        setDragging(false);
        onFiles(Array.from(event.dataTransfer.files));
      }}
      className={`cursor-pointer rounded-2xl border-2 border-dashed transition ${
        dragging ? "border-blue-400 bg-white/10" : "border-white/20 bg-black/20"
      } p-4`}
    >
      {children}
      <input
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(event) => {
          const files = event.currentTarget.files
            ? Array.from(event.currentTarget.files)
            : [];
          onFiles(files);
        }}
      />
    </label>
  );
}
