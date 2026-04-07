import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
      // Per request: ignore these files for linting (inline styles etc.)
      "src/app/home/page.tsx",
      "src/components/ui/Ballpit.tsx",
      "src/components/ui/DomeGallery.tsx",
      "src/components/ui/SplitText.tsx",
    ],
  },
];

export default eslintConfig;
