export type EducationItem = {
    institution: string;
    degree: string;
};

export type ExperienceItem = {
    company: string;
    designation: string;
    description: string;
};

export type SkillItem = {
    value: string;
};

export type LanguageItem = {
    value: string;
};

export type ReferenceItem = {
    name: string;
    designation: string;
    institution: string;
    phone: string;
    email: string;
};

export type TemplateId = 'classic' | 'cyan-panel' | 'modern' | 'editorial';

export type CVData = {
    fullName: string;
    designation: string;
    phoneNumber: string;
    email: string;
    address: string;
    linkedin: string;
    profileImage: string;
    careerSummary: string;
    education: EducationItem[];
    skills: SkillItem[];
    languages: LanguageItem[];
    experiences: ExperienceItem[];
    references: ReferenceItem[];
};
