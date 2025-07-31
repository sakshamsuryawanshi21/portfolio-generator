import React, { useState } from 'react';

interface SkillsSectionFormProps {
  skills: string;
  onChange: (skillsArray: string[]) => void;
}

const SkillsSectionForm: React.FC<SkillsSectionFormProps> = ({ skills, onChange }) => {
  const [input, setInput] = useState('');
  const [skillList, setSkillList] = useState<string[]>(skills ? skills.split(',').map(s => s.trim()) : []);

  const addSkill = () => {
    if (input.trim() && !skillList.includes(input.trim())) {
      const updated = [...skillList, input.trim()];
      setSkillList(updated);
      onChange(updated);
      setInput('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    const updated = skillList.filter(skill => skill !== skillToRemove);
    setSkillList(updated);
    onChange(updated);
  };

  return (
    <div>
      <div className="flex gap-2 mb-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter a skill"
          className="border px-3 py-2 rounded w-full"
        />
        <button onClick={addSkill} className="bg-red-600 text-white px-4 py-2 rounded">Add</button>
      </div>

      <div className="flex flex-wrap gap-2">
        {skillList.map((skill, index) => (
          <div
            key={index}
            className="bg-black text-white text-xs px-3 py-1 rounded-full flex items-center gap-2"
          >
            {skill}
            <button onClick={() => removeSkill(skill)} className="ml-1 text-sm">✕</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsSectionForm;
