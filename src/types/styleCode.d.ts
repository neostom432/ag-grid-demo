import { TagOption } from "@parte-ds/ui";

declare global {
  type StyleFilterCategory = "season" | "mainCategory" | "middleCategory" | "item";

  type StyleTagOption = TagOption & { category: StyleFilterCategory };
}
