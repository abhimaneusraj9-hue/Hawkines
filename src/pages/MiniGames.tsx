import { useNavigate } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { PlayCircle } from 'lucide-react';

const games = [
  { icon:'🎣', title:'Phishing Alert',         description:'Click on suspicious parts of a fake phishing email.',          path:'/challenge/phishing',      gradient:'from-red-400 to-rose-500'      },
  { icon:'🔐', title:'Password Strength Test',  description:'Type a password and see how secure it really is.',             path:'/challenge/password',      gradient:'from-purple-400 to-violet-500' },
  { icon:'🛡️', title:'Privacy Settings Game',  description:'Choose the right privacy level for each piece of your profile.',path:'/challenge/privacy',       gradient:'from-blue-400 to-cyan-500'     },
  { icon:'🌐', title:'Safe or Dangerous?',      description:'Judge each website — is it safe, suspicious, or dangerous?',   path:'/challenge/browsing',      gradient:'from-teal-400 to-emerald-500'  },
  { icon:'💬', title:'Cyberbullying Scenarios', description:'Choose the safest response in real cyberbullying situations.',  path:'/challenge/cyberbullying', gradient:'from-pink-400 to-rose-400'     },
];

export default function MiniGames() {
  const navigate = useNavigate();
  return (
    <Layout>
      <div className="p-6 max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-black text-gray-800">Mini Games</h1>
          <p className="text-gray-500 mt-1">Interactive cybersecurity challenges. Practice your skills!</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {games.map(game => (
            <div key={game.title} className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-0.5 transition-all p-5 flex flex-col">
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${game.gradient} flex items-center justify-center text-2xl mb-4 shadow-md`}>{game.icon}</div>
              <h3 className="font-bold text-gray-800 mb-1">{game.title}</h3>
              <p className="text-sm text-gray-500 flex-1 leading-relaxed">{game.description}</p>
              <button
                onClick={() => navigate(game.path)}
                className={`mt-4 w-full py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r ${game.gradient} flex items-center justify-center gap-2 hover:opacity-90 shadow-sm transition-opacity`}
              >
                <PlayCircle className="w-4 h-4" /> Play Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
