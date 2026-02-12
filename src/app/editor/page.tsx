"use client";

import { useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { CanvasPreview } from "@/components/editor/CanvasPreview";
import { EditorLayout } from "@/components/editor/EditorLayout";
import { TemplateGrid } from "@/components/editor/TemplateGrid";
import { TextControls } from "@/components/editor/TextControls";
import { StylePanel } from "@/components/editor/StylePanel";
import { ExportBar } from "@/components/editor/ExportBar";
import { ImageUploader } from "@/components/editor/ImageUploader";
import { HistoryStrip } from "@/components/editor/HistoryStrip";

export default function EditorPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [showUploader, setShowUploader] = useState(false);
  const controls = useMemo(() => {
    return (
      <div className="space-y-4">
        <TemplateGrid onUpload={() => setShowUploader(true)} />
        {showUploader && <ImageUploader onUploaded={() => setShowUploader(false)} />}
        <TextControls />
        <StylePanel />
        <HistoryStrip />
      </div>
    );
  }, [showUploader]);

  return (
    <motion.main
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <EditorLayout
        controls={controls}
        preview={<>
          <CanvasPreview canvasRef={canvasRef} />
          <ExportBar canvasRef={canvasRef} />
        </>}
      />
    </motion.main>
  );
}
