import { Template } from '../../stores/templateStore';

interface TemplatePreviewProps {
  template: Template;
}

export function TemplatePreview({ template }: TemplatePreviewProps) {
  const renderBlock = (block: any) => {
    switch (block.type) {
      case 'text':
        return (
          <div
            style={block.styles}
            className="prose dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: block.content.text }}
          />
        );
      
      case 'image':
        return (
          <img
            src={block.content.url || 'https://via.placeholder.com/800x400'}
            alt={block.content.alt}
            style={{ maxWidth: '100%', height: 'auto', ...block.styles }}
          />
        );
      
      case 'button':
        return (
          <div style={block.styles} className="text-center">
            <a
              href={block.content.url}
              className="inline-block px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              style={block.content.styles}
            >
              {block.content.text}
            </a>
          </div>
        );
      
      case 'divider':
        return <hr style={block.styles} className="my-4" />;
      
      case 'spacer':
        return <div style={{ height: block.content.height }} />;
      
      case 'columns':
        return (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${block.content.columns.length}, 1fr)`,
              gap: '20px',
              ...block.styles,
            }}
          >
            {block.content.columns.map((column: any, index: number) => (
              <div key={index}>{column.content}</div>
            ))}
          </div>
        );
      
      case 'social':
        return (
          <div style={block.styles} className="flex justify-center gap-4">
            {block.content.networks.map((network: any) => (
              <a
                key={network.type}
                href={network.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-600"
              >
                <img
                  src={`/icons/${network.type}.svg`}
                  alt={network.type}
                  className="w-6 h-6"
                />
              </a>
            ))}
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div
      style={{
        fontFamily: template.styles.fontFamily,
        fontSize: template.styles.fontSize,
        color: template.styles.textColor,
        backgroundColor: template.styles.backgroundColor,
      }}
      className="shadow-lg rounded-lg overflow-hidden"
    >
      <div className="p-8 space-y-6">
        {template.blocks.map((block) => (
          <div key={block.id}>{renderBlock(block)}</div>
        ))}
      </div>
    </div>
  );
}