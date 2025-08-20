import React, { useState } from "react";
import Wrapper from "../../../components/Wrapper";
import { Check } from "lucide-react";
import BackButtonAuto from "../../../components/BackButton";

export const LanguageSettingPage: React.FC = () => {
  const [selected, setSelected] = useState("English");
  const langs = [
    "English",
    "Urdu",
    "Pashto",
    "Arabic",
    "Shina",
    "Hindko",
    "Punjabi",
    "Chinese",
  ];

  return (
    <Wrapper>
      <div className="flex items-center gap-3 mb-4">
        <BackButtonAuto />
        <h1 className="text-lg font-semibold">Language</h1>
      </div>

      <div className="rounded-2xl bg-[#1A1C20] divide-y divide-white/10">
        {langs.map((lang) => (
          <button
            key={lang}
            onClick={() => setSelected(lang)}
            className="flex w-full items-center justify-between px-4 py-3 text-sm hover:bg-[#23252b]"
          >
            <span className="text-white/90">{lang}</span>
            {selected === lang && <Check className="h-4 w-4 text-yellow-400" />}
          </button>
        ))}
      </div>
    </Wrapper>
  );
};

export default LanguageSettingPage;
