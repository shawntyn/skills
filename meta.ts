export interface VendorSkillMeta {
  official?: boolean;
  source: string;
  skills: Record<string, string>; // sourceSkillName -> outputSkillName
}

/**
 * Repositories to clone as submodules
 */
export const submodules = {
  slidev: "https://github.com/slidevjs/slidev",
  ai: "https://github.com/vercel/ai",
  anthropics: "https://github.com/anthropics/skills",
  turborepo: "https://github.com/vercel/turborepo",
  "agent-skills": "https://github.com/vercel-labs/agent-skills",
};

/**
 * Already generated skills, sync with their `skills/` directory
 */
export const vendors: Record<string, VendorSkillMeta> = {
  slidev: {
    source: "https://github.com/slidevjs/slidev",
    skills: {
      slidev: "slidev",
    },
  },
  ai: {
    source: "https://github.com/vercel/ai",
    skills: {
      "add-provider-package": "add-provider-package",
      "capture-api-response-test-fixture": "capture-api-response-test-fixture",
      "develop-ai-functions-example": "develop-ai-functions-example",
      "list-npm-package-content": "list-npm-package-content",
      "use-ai-sdk": "use-ai-sdk",
    },
  },
  anthropics: {
    source: "https://github.com/anthropics/skills",
    skills: {
      "algorithmic-art": "algorithmic-art",
      "brand-guidelines": "brand-guidelines",
      "canvas-design": "canvas-design",
      "doc-coauthoring": "doc-coauthoring",
      docx: "docx",
      "frontend-design": "frontend-design",
      "internal-comms": "internal-comms",
      "mcp-builder": "mcp-builder",
      pdf: "pdf",
      pptx: "pptx",
      "skill-creator": "skill-creator",
      "slack-gif-creator": "slack-gif-creator",
      "theme-factory": "theme-factory",
      "web-artifacts-builder": "web-artifacts-builder",
      "webapp-testing": "webapp-testing",
      xlsx: "xlsx",
    },
  },
  turborepo: {
    source: "https://github.com/vercel/turborepo",
    skills: {
      turborepo: "turborepo",
    },
  },
  "agent-skills": {
    source: "https://github.com/vercel-labs/agent-skills",
    skills: {
      "web-design-guidelines": "web-design-guidelines",
    },
  },
};
