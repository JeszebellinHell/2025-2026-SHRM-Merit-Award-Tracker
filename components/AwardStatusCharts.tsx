import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, Sector } from 'recharts';

interface CategoryProgress {
  name: string;
  completed: number;
  total: number;
}

interface AwardStatusChartsProps {
  categoryProgress: CategoryProgress[];
  totalActivities: number;
  completedActivities: number;
}

const COLORS = ['#10b981', '#e5e7eb']; // Emerald-500 for completed, Slate-200 for remaining

const renderActiveShape = (props: any) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent } = props;

  return (
    <g>
      <text x={cx} y={cy - 10} textAnchor="middle" fill="#334155" fontSize={16} fontWeight="semibold">
        {payload.name}
      </text>
      <text x={cx} y={cy + 10} textAnchor="middle" fill={fill} fontSize={24} fontWeight="bold">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
    </g>
  );
};


const AwardStatusCharts: React.FC<AwardStatusChartsProps> = ({ categoryProgress, totalActivities, completedActivities }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const pieData = [
    { name: 'Completed', value: completedActivities },
    { name: 'Remaining', value: totalActivities - completedActivities },
  ];

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  return (
    <div className="mt-8 grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3 bg-white p-6 rounded-xl shadow-lg border border-slate-200">
            <h3 className="text-lg font-bold text-slate-700 mb-4">Activities by Category</h3>
            <ResponsiveContainer width="100%" height={300}>
            <BarChart data={categoryProgress} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis allowDecimals={false} domain={[0, 4]} ticks={[0, 1, 2, 3, 4]}/>
                <Tooltip
                    cursor={{fill: 'rgba(241, 245, 249, 0.5)'}}
                    contentStyle={{
                        backgroundColor: 'white',
                        border: '1px solid #e2e8f0',
                        borderRadius: '0.5rem',
                    }}
                    />
                <Bar dataKey="completed" fill="#2563eb" name="Completed Activities" barSize={40}/>
            </BarChart>
            </ResponsiveContainer>
        </div>
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-lg border border-slate-200 flex flex-col justify-center items-center">
             <h3 className="text-lg font-bold text-slate-700 mb-4 text-center">Overall Activity Progress</h3>
            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie
                        activeIndex={activeIndex}
                        activeShape={renderActiveShape}
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={70}
                        outerRadius={90}
                        fill="#8884d8"
                        dataKey="value"
                        onMouseEnter={onPieEnter}
                    >
                        {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                     <Legend wrapperStyle={{fontSize: "14px", paddingTop: "20px"}} iconType="circle" />
                </PieChart>
            </ResponsiveContainer>
        </div>
    </div>
  );
};

export default AwardStatusCharts;