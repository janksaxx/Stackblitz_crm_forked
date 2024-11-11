import { useEffect, useRef } from 'react';
import { Bar } from 'recharts';
import { BarChart, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { stage: 'Lead', value: 120, color: '#818CF8' },
  { stage: 'Meeting', value: 86, color: '#6366F1' },
  { stage: 'Proposal', value: 54, color: '#4F46E5' },
  { stage: 'Negotiation', value: 32, color: '#4338CA' },
  { stage: 'Closed', value: 22, color: '#3730A3' },
];

export function DealsFunnel() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      // Use requestAnimationFrame to batch DOM updates
      window.requestAnimationFrame(() => {
        if (!Array.isArray(entries) || !entries.length) return;
      });
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div ref={containerRef} className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 0, right: 0, left: 80, bottom: 0 }}
        >
          <XAxis type="number" hide />
          <YAxis
            type="category"
            dataKey="stage"
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#fff',
              border: 'none',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
            }}
          />
          <Bar
            dataKey="value"
            fill="#818CF8"
            radius={[0, 4, 4, 0]}
            background={{ fill: '#f3f4f6' }}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}