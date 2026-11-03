import { BiodataTemplate } from "./biodataTemplates";
import { Biodata } from "../biodata/page";

export const RoyalLayout = ({
  template,
  data,
}: {
  template: BiodataTemplate;
  data: Biodata;
}) => (
  <div
    style={{
      background: template.bg,
      borderColor: template.border,
    }}
    className="border-8 h-full p-8 font-serif"
  >
    <h1
      style={{ color: template.headingColor }}
      className="text-4xl font-bold mb-4 border-b-2 pb-2"
    >
      {data.name}
    </h1>
  </div>
);

export const ModernLayout = ({
  template,
  data,
}: {
  template: BiodataTemplate;
  data: Biodata;
}) => (
  <div
    style={{ background: template.bg }}
    className="h-full p-8 font-sans"
  >
    <h1 className="text-3xl font-bold">{data.name}</h1>
  </div>
);