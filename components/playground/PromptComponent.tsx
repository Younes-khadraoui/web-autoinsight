import React from "react";
import { Input } from "@/components/ui/input";

interface PromptProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
}

const PromptComponent: React.FC<PromptProps> = ({ prompt, setPrompt }) => {
  return (
    <div>
      <label className="text-white font-bold">Prompt (optional)</label>
      <Input
        className="w-[200px] mt-2"
        placeholder="Change the prompt"
        name="prompt"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
    </div>
  );
};

export default PromptComponent;
