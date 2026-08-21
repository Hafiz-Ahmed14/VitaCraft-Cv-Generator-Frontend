export type CvTemplate = {
    id: string;
    name: string;
    description: string;
    preview: string;
};

type TemplateCardProps = {
    template: CvTemplate;
    onUseTemplate: (template: CvTemplate) => void;
};

export function TemplateCard({ template, onUseTemplate }: TemplateCardProps) {
    return (
        <article className="card h-100 border-0 shadow-sm dashboard-template-card">
            <div className="dashboard-template-preview">
                <img src={template.preview} alt={`${template.name} CV template preview`} />
            </div>
            <div className="card-body d-flex flex-column p-4">
                <h3 className="h5 card-title mb-2">{template.name}</h3>
                <p className="card-text text-secondary mb-4">{template.description}</p>
                <button
                    type="button"
                    className="btn btn-primary dashboard-use-template mt-auto"
                    onClick={() => onUseTemplate(template)}
                >
                    Use Template
                </button>
            </div>
        </article>
    );
}
