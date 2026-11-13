import {
  Accessibility, BadgeCheck, Braces, CloudUpload, Component, FileCheck, FlaskConical, Gauge, GitCompare,
  Globe, Image, Layers, ListChecks, MousePointerClick, Navigation, Palette, PanelTop, PenTool, Paintbrush,
  Rocket, Route, ScrollText, Search, ShieldCheck, Smartphone, Sparkles, TextCursorInput, Code, FileCode,
} from 'lucide-react';

const icons = {
  Accessibility, BadgeCheck, Braces, CloudUpload, Component, FileCheck, FlaskConical, Gauge, GitCompare,
  Globe, Image, Layers, ListChecks, MousePointerClick, Navigation, Palette, PanelTop, PenTool, Paintbrush,
  Rocket, Route, ScrollText, Search, ShieldCheck, Smartphone, Sparkles, TextCursorInput, Code, FileCode,
};

export default function SectionIcon({ name, size = 18 }) {
  const Icon = icons[name] || ListChecks;
  return <Icon size={size} aria-hidden="true" />;
}
