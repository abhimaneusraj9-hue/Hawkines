import { useNavigate } from 'react-router-dom';
import { PlayCircle, CheckCircle2 } from 'lucide-react';

interface Props {
  icon: string;
  title: string;
  description: string;
  path: string;
  completed?: boolean;
  color: string;
  bgGradient: string;
}

export function MissionCard({ icon, title, description, path, completed, color, bgGradient }: Props) {
  const navigate = useNavigate();
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex flex-col">
      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${bgGradient} flex items-center justify-center text-xl mb-3 shrink-0`}>
        {icon}
      </div>
      <h3 className="font-bold text-gray-800 text-sm">{title}</h3>
      <p className="text-xs text-gray-500 mt-1 flex-1 leading-relaxed">{description}</p>
      <button
        onClick={() => navigate(path)}
        className={`mt-4 w-full py-2 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-colors ${completed ? 'bg-green-100 text-green-700 hover:bg-green-200' : `bg-gradient-to-r ${bgGradient} text-white hover:opacity-90`}`}
      >
        {completed ? <><CheckCircle2 className="w-4 h-4" /> Replay</> : <><PlayCircle className="w-4 h-4" /> Play</>}
      </button>
    </div>
  );
}
