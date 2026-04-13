"use client";

import { Button } from "@/components/ui/button";
import { toPng } from "html-to-image";
import jsPDF from "jspdf";
import { useState } from "react";

export function AnalyticsHeader() {
  const [isExporting, setIsExporting] = useState(false);

  const exportPDF = async () => {
    setIsExporting(true);
    try {
      const element = document.getElementById("analytics-dashboard-content");
      if (!element) return;
      
      // Temporarily add a class to adjust background for PDF if needed
      element.classList.add("pdf-export-mode");
      
      // Use html-to-image which uses SVG foreignObject (browser native rendering)
      // This perfectly supports modern CSS like oklch(), lab(), lch()
      const dataUrl = await toPng(element, { 
        quality: 1, 
        pixelRatio: 2,
        backgroundColor: document.documentElement.classList.contains('dark') ? '#0f172a' : '#ffffff' 
      });
      
      element.classList.remove("pdf-export-mode");
      
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      
      // We need to know the original dimensions to keep aspect ratio
      const imgProps = pdf.getImageProperties(dataUrl);
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      
      pdf.addImage(dataUrl, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("AuraStudy_Analytics.pdf");
    } catch (error) {
      console.error("Export failed", error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 mb-8">
      <div className="space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Progress Analytics</h1>
        <p className="text-muted-foreground text-sm max-w-[500px] leading-relaxed">
          A specialized view of your intellectual velocity and cognitive performance trends.
        </p>
      </div>
      
      <div className="flex items-center gap-3 shrink-0">
        <Button 
          variant="outline" 
          onClick={exportPDF} 
          disabled={isExporting}
          className="rounded-full h-10 px-5 text-xs font-semibold tracking-wider hover:bg-muted/50 border-border/60"
        >
          {isExporting ? "EXPORTING..." : "EXPORT DATA"}
        </Button>
        <div className="bg-primary text-primary-foreground h-10 px-6 inline-flex items-center justify-center rounded-full text-xs font-semibold tracking-wide shadow-md">
          7 DAYS
        </div>
      </div>
    </div>
  );
}
