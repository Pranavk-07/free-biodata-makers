import { BIODATA_TEMPLATES } from "./biodataTemplates";
import {
  RoyalLayout,
  ModernLayout,
} from "./BiodataTemplateLayouts";

import { Biodata } from "../biodata/page";

export default function TemplateRenderer({
  templateId,
  data,
}: {
  templateId: string;
  data: Biodata;
}) {
  const template =
    BIODATA_TEMPLATES.find((t) => t.id === templateId) ||
    BIODATA_TEMPLATES[0];

  if (template.category === "modern") {
    return <ModernLayout template={template} data={data} />;
  }

  return <RoyalLayout template={template} data={data} />;
}