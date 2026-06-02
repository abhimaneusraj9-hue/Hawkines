import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Layers, Trophy, Award, Settings, LogOut, Shield, BookOpen, Gamepad2 } from 'lucide-react';
import { logout } from '../utils/auth';
import { LogoutModal } from './LogoutModal';

const navItems = [
  { icon: Home,     label: 'Home',         path: '/dashboard'    },
  { icon: BookOpen, label: 'Tutorial',      path: '/levels'       },
  { icon: Layers,   label: 'Missions',      path: '/dashboard'    },
  { icon: Gamepad2, label: 'Mini Games',    path: '/mini-games'   },
  { icon: Trophy,   label: 'Leaderboard',   path: '/leaderboard'  },
  { icon: Award,    label: 'Achievements',  path: '/achievements' },
  { icon: Settings, label: 'Settings',      path: '/settings'     },
];

export function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showLogout, setShowLogout] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      <aside className="w-60 bg-white border-r border-gray-100 flex flex-col h-screen sticky top-0 shrink-0">
        {/* Logo */}
        <div className="px-6 py-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-xl flex items-center justify-center shadow-md">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="font-black text-gray-800 text-sm leading-tight">CYBER</p>
              <p className="font-black text-teal-500 text-sm leading-tight">SMART</p>
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-2 font-medium">PLAY. LEARN. STAY SAFE.</p>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 overflow-y-auto">
          {navItems.map(({ icon: Icon, label, path }) => {
            const active = location.pathname === path || (path === '/dashboard' && location.pathname === '/');
            return (
              <button
                key={label}
                onClick={() => navigate(path)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl mb-1 text-sm font-semibold transition-all duration-200 ${
                  active
                    ? 'bg-teal-50 text-teal-600 shadow-sm'
                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800'
                }`}
              >
                <Icon className={`w-5 h-5 shrink-0 ${active ? 'text-teal-500' : ''}`} />
                {label}
              </button>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="px-3 py-4 border-t border-gray-100">
          <button
            onClick={() => setShowLogout(true)}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-gray-500 hover:bg-red-50 hover:text-red-500 transition-all duration-200"
          >
            <LogOut className="w-5 h-5 shrink-0" />
            Exit
          </button>
        </div>
      </aside>
      {showLogout && <LogoutModal onConfirm={handleLogout} onCancel={() => setShowLogout(false)} />}
    </>
  );
}
