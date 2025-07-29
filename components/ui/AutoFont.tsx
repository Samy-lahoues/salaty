"use client";

import React from "react";
import { useTranslation } from "@/hooks/useTranslation";
import {
  getFontClass,
  autoDetectFontClass,
  withFontClass,
  type FontClass,
} from "@/lib/fontUtils";

interface AutoFontProps {
  children: React.ReactNode;
  contentType?: "arabic" | "english" | "mixed" | "code" | "auto";
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
  lang?: string;
  forceFont?: FontClass;
}

const AutoFont: React.FC<AutoFontProps> = ({
  children,
  contentType = "auto",
  className = "",
  as: Component = "span",
  lang,
  forceFont,
}) => {
  const { isRTL } = useTranslation();

  // Determine the appropriate font class
  const getFontClassName = (): FontClass => {
    // If a font is explicitly forced, use that
    if (forceFont) {
      return forceFont;
    }

    // If contentType is auto, try to detect from text content
    if (contentType === "auto" && typeof children === "string") {
      return autoDetectFontClass(children, isRTL);
    }

    // Otherwise use the specified content type
    return getFontClass(contentType === "auto" ? "mixed" : contentType, isRTL);
  };

  const fontClass = getFontClassName();
  const combinedClassName = withFontClass(fontClass, className);

  // Props to pass to the component
  const componentProps: Record<string, string> = {
    className: combinedClassName,
  };

  // Add lang attribute if specified
  if (lang) {
    componentProps.lang = lang;
  }

  return React.createElement(
    Component as React.ElementType,
    componentProps,
    children,
  );
};

// Convenience components for specific use cases
export const ArabicText: React.FC<Omit<AutoFontProps, "contentType">> = (
  props,
) => <AutoFont {...props} contentType="arabic" />;

export const EnglishText: React.FC<Omit<AutoFontProps, "contentType">> = (
  props,
) => <AutoFont {...props} contentType="english" />;

export const CodeText: React.FC<Omit<AutoFontProps, "contentType">> = (
  props,
) => <AutoFont {...props} contentType="code" as="code" />;

export const MixedText: React.FC<Omit<AutoFontProps, "contentType">> = (
  props,
) => <AutoFont {...props} contentType="mixed" />;

export default AutoFont;
