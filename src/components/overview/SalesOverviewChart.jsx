import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";

const usersData = [
  { month: "Jul", users: 420 },
  { month: "Aug", users: 680 },
  { month: "Sep", users: 910 },
  { month: "Oct", users: 1150 },
  { month: "Nov", users: 1420 },
  { month: "Dec", users: 1720 },
  { month: "Jan", users: 2010 },
  { month: "Feb", users: 2350 },
  { month: "Mar", users: 2680 },
  { month: "Apr", users: 2930 },
  { month: "May", users: 3210 },
  { month: "Jun", users: 3550 },
];

const UserGrowthChart = () => {
  return (
    <motion.div
      className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <h2 className='text-lg font-medium mb-4 text-gray-100'>User Growth Overview</h2>

      <div className='h-80'>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={usersData}>
            <CartesianGrid strokeDasharray='3 3' stroke='#4B5563' />
            <XAxis 
              dataKey="month" 
              stroke='#9ca3af' 
              tick={{ fill: '#E5E7EB' }}
            />
            <YAxis 
              stroke='#9ca3af' 
              tick={{ fill: '#E5E7EB' }}
              label={{ 
                value: 'Users', 
                angle: -90, 
                position: 'insideLeft',
                fill: '#E5E7EB'
              }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(31, 41, 55, 0.9)",
                border: "1px solid #4B5563",
                borderRadius: "8px",
              }}
              formatter={(value) => [`${value} users`, '']}
              itemStyle={{ color: '#E5E7EB' }}
            />
            <Line
              type='monotone'
              dataKey='users'
              stroke='#10B981'  // Changed to green for growth theme
              strokeWidth={2}
              dot={{ fill: "#10B981", strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default UserGrowthChart;