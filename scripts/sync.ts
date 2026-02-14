import { readFileSync, writeFileSync, existsSync, mkdirSync, cpSync, readdirSync, statSync, rmSync } from "fs";
import { join } from "path";
import { submodules, vendors } from "../meta.ts";

console.log("=== Submodules ===");
console.log(JSON.stringify(submodules, null, 2));

console.log("\n=== Vendors ===");
console.log(JSON.stringify(vendors, null, 2));

// Update .gitmodules
function updateGitModules() {
  const gitmodulesPath = join(process.cwd(), ".gitmodules");
  let content = "";
  
  for (const [name, url] of Object.entries(submodules)) {
    content += `[submodule "vendor/${name}"]\n`;
    content += `\tpath = vendor/${name}\n`;
    content += `\turl = ${url}\n`;
  }
  
  writeFileSync(gitmodulesPath, content);
  console.log("\n✓ Updated .gitmodules");
}

// Copy skills from vendor to skills directory
function syncSkills() {
  const skillsDir = join(process.cwd(), "skills");
  
  // Create skills directory if not exists
  if (!existsSync(skillsDir)) {
    mkdirSync(skillsDir, { recursive: true });
  }
  
  for (const [vendorName, config] of Object.entries(vendors)) {
    console.log(`\nProcessing vendor: ${vendorName}`);
    
    const vendorSkills = config.skills as Record<string, string>;
    for (const [sourceSkillName, outputSkillName] of Object.entries(vendorSkills)) {
      const sourcePath = join(process.cwd(), "vendor", vendorName, "skills", sourceSkillName);
      const destPath = join(skillsDir, outputSkillName);
      
      if (!existsSync(sourcePath)) {
        console.log(`  ⚠ Source not found: ${sourcePath}`);
        continue;
      }
      
      // Remove destination if exists
      if (existsSync(destPath)) {
        rmSync(destPath, { recursive: true, force: true });
      }
      
      // Copy recursively
      cpSync(sourcePath, destPath, { recursive: true });
      console.log(`  ✓ Copied: ${sourceSkillName} -> ${outputSkillName}`);
    }
  }
}

// Main
console.log("Starting sync...\n");
updateGitModules();
syncSkills();
console.log("\n✓ Sync complete!");
