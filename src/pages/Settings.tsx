import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { useSettings } from '../hooks/useSettings';
import { LogoutModal } from '../components/LogoutModal';
import { logout } from '../utils/auth';
import { resetProgress } from '../utils/storage';
import { Volume2, VolumeX, Music, Accessibility, Type, Eye, RotateCcw, LogOut, AlertTriangle, CheckCircle2 } from 'lucide-react';

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${checked ? 'bg-teal-500' : 'bg-gray-200'}`}
    >
      <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform duration-300 ${checked ? 'translate-x-7' : 'translate-x-1'}`} />
    </button>
  );
}

export default function Settings() {
  const navigate = useNavigate();
  const { settings, update } = useSettings();
  const [showLogout, setShowLogout]   = useState(false);
  const [showReset, setShowReset]     = useState(false);
  const [resetDone, setResetDone]     = useState(false);

  const handleLogout = () => { logout(); navigate('/login'); };
  const handleReset  = () => {
    resetProgress();
    setShowReset(false);
    setResetDone(true);
    setTimeout(() => setResetDone(false), 3000);
  };

  const settingRows = [
    { icon: Volume2,       label: 'Sound Effects',    desc: 'Play sounds during gameplay',              key: 'sound' as const        },
    { icon: Music,         label: 'Background Music',  desc: 'Play music throughout the app',            key: 'music' as const        },
    { icon: Accessibility, label: 'Accessibility Mode',desc: 'Enhanced keyboard navigation & contrast',  key: 'accessibility' as const },
    { icon: Type,          label: 'Large Text Mode',   desc: 'Increase font size for easier reading',    key: 'largeText' as const    },
    { icon: Eye,           label: 'Colour-Friendly',   desc: 'Use patterns in addition to colour cues',  key: 'colorFriendly' as const },
  ];

  return (
    <Layout>
      <div className="p-6 max-w-2xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-black text-gray-800">Settings</h1>
          <p className="text-gray-500 mt-1">Customise your Cyber Smart experience.</p>
        </div>

        {resetDone && (
          <div className="flex items-center gap-3 bg-green-50 border border-green-200 text-green-700 rounded-xl px-4 py-3 mb-5 text-sm">
            <CheckCircle2 className="w-5 h-5" />
            Progress reset successfully. Level 1 is now unlocked.
          </div>
        )}

        {/* Preferences */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-5">
          <div className="px-5 py-4 border-b border-gray-100">
            <h2 className="font-bold text-gray-700 text-sm uppercase tracking-wider">Preferences</h2>
          </div>
          {settingRows.map(({ icon: Icon, label, desc, key }) => (
            <div key={key} className="flex items-center gap-4 px-5 py-4 border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors">
              <div className="w-9 h-9 bg-teal-50 rounded-xl flex items-center justify-center shrink-0">
                <Icon className="w-5 h-5 text-teal-500" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-800 text-sm">{label}</p>
                <p className="text-xs text-gray-500">{desc}</p>
              </div>
              <Toggle checked={settings[key]} onChange={v => update({ [key]: v })} />
            </div>
          ))}
        </div>

        {/* Danger zone */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100">
            <h2 className="font-bold text-gray-700 text-sm uppercase tracking-wider">Account</h2>
          </div>
          <button
            onClick={() => setShowReset(true)}
            className="w-full flex items-center gap-4 px-5 py-4 border-b border-gray-50 hover:bg-orange-50 transition-colors text-left"
          >
            <div className="w-9 h-9 bg-orange-50 rounded-xl flex items-center justify-center shrink-0">
              <RotateCcw className="w-5 h-5 text-orange-500" />
            </div>
            <div>
              <p className="font-semibold text-orange-600 text-sm">Reset Progress</p>
              <p className="text-xs text-gray-500">Erase all level progress, XP, and badges</p>
            </div>
          </button>
          <button
            onClick={() => setShowLogout(true)}
            className="w-full flex items-center gap-4 px-5 py-4 hover:bg-red-50 transition-colors text-left"
          >
            <div className="w-9 h-9 bg-red-50 rounded-xl flex items-center justify-center shrink-0">
              <LogOut className="w-5 h-5 text-red-500" />
            </div>
            <div>
              <p className="font-semibold text-red-600 text-sm">Log Out</p>
              <p className="text-xs text-gray-500">Your progress is saved in the browser</p>
            </div>
          </button>
        </div>

        <p className="text-xs text-gray-400 text-center mt-6">Cyber Smart Challenge v1.0 · 503IT University Project</p>
      </div>

      {showLogout && <LogoutModal onConfirm={handleLogout} onCancel={() => setShowLogout(false)} />}

      {showReset && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-orange-500" />
              </div>
              <div>
                <h3 className="font-bold text-gray-800">Reset Progress?</h3>
                <p className="text-gray-500 text-sm">This cannot be undone.</p>
              </div>
            </div>
            <p className="text-gray-600 text-sm mb-6">All your level completions, XP, stars, and badges will be permanently erased. You'll start from Level 1.</p>
            <div className="flex gap-3">
              <button onClick={() => setShowReset(false)} className="flex-1 py-2.5 border-2 border-gray-200 text-gray-600 rounded-xl font-semibold hover:bg-gray-50 transition-colors">Cancel</button>
              <button onClick={handleReset} className="flex-1 py-2.5 bg-orange-500 text-white rounded-xl font-semibold hover:bg-orange-600 transition-colors">Reset</button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
