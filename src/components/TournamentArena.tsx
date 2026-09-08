import React, { useState } from 'react';
import { Trophy, QrCode, ShieldCheck, Users, Calendar, Clock, Sparkles, Check, Share2, Flame, Award, Box, Crosshair, Gamepad, Shield } from 'lucide-react';
import { motion } from 'motion/react';
import { sound } from '../utils/audio';
import confetti from 'canvas-confetti';

interface TournamentEvent {
  id: string;
  game: 'Minecraft' | 'Valorant' | 'GTA V' | 'Roblox' | 'Free Fire';
  gameKey: string;
  iconName: string;
  title: string;
  prize: string;
  mode: string;
  slots: string;
  date: string;
  broadcast: string;
  idLabel: string;
  idPlaceholder: string;
  roleOptions: string[];
}

export const TournamentArena: React.FC = () => {
  const tournaments: TournamentEvent[] = [
    {
      id: 't-mc',
      game: 'Minecraft',
      gameKey: 'minecraft',
      iconName: 'Box',
      title: 'UltraOP SMP Bedwars & Mega Build Clash #14',
      prize: '₹10,000 Cash + VIP Realm Host 🏆',
      mode: '4v4 Bedwars Quad Elimination + Hardcore Speed Run',
      slots: '16 / 16 Squads Registered',
      date: 'This Saturday, 7:30 PM IST',
      broadcast: 'Live Broadcast on Ultra OP 2 & Twitch',
      idLabel: 'Minecraft Java / Bedrock IGN',
      idPlaceholder: 'e.g. AhsanCraft_99',
      roleOptions: ['Bed Defender & Trapper', 'PVP Rusher & Bridge Master', 'Diamond & Emerald Collector', 'In-Game Leader (IGL)']
    },
    {
      id: 't-val',
      game: 'Valorant',
      gameKey: 'valorant',
      iconName: 'Crosshair',
      title: 'Valorant 5v5 Radiant Spike Rush Invitational',
      prize: '₹15,000 Cash + VP Bundles 🎯',
      mode: '5v5 Custom Lobby Best of 3 (Ascent & Haven)',
      slots: '8 / 8 Pro Teams',
      date: 'Sunday, 8:00 PM IST',
      broadcast: 'Ultra OP Live (@ultraoplive) & Kick',
      idLabel: 'Riot ID & Tagline',
      idPlaceholder: 'e.g. UltraOP#Aim',
      roleOptions: ['Primary Duelist', 'Controller & Smokes', 'Initiator & Lineups', 'Sentinel & Anchor']
    },
    {
      id: 't-gta',
      game: 'GTA V',
      gameKey: 'gtav',
      iconName: 'Gamepad',
      title: 'Los Santos Mega Ramp & Heist Mastermind Cup',
      prize: '₹7,500 Cash + GTA$ Millions 🚗',
      mode: 'Custom Stunt Race Circuits & 4-Player Speed Heist',
      slots: '24 / 24 Solo Drivers',
      date: 'Friday, 9:00 PM IST',
      broadcast: 'Ultra OP Live (@ultraoplive & Kick)',
      idLabel: 'Rockstar Social Club ID',
      idPlaceholder: 'e.g. LosSantosRacer_OP',
      roleOptions: ['Stunt Driver Specialist', 'Heist Mastermind / Hacker', 'Heavy Weapons Gunner', 'Pilot & Getaway Driver']
    },
    {
      id: 't-roblox',
      game: 'Roblox',
      gameKey: 'roblox',
      iconName: 'Gamepad',
      title: 'Roblox Blade Ball & Obby Speedrun Championship',
      prize: '15,000 Robux (R$) + UltraOP Badge 🕹️',
      mode: 'Blade Ball 1v1 Bracket + Impossible Obby Time Attack',
      slots: '64 / 64 Players Open',
      date: 'Saturday, 5:00 PM IST',
      broadcast: 'Ultra OP (@ultraop3 & Kick)',
      idLabel: 'Roblox Username & Display',
      idPlaceholder: 'e.g. UltraGamer_Roblox',
      roleOptions: ['Blade Ball Striker', 'Obby Parkour Speedrunner', 'Blox Fruits Boss Hunter', 'Party Game Master']
    },
    {
      id: 't-ff',
      game: 'Free Fire',
      gameKey: 'freefire',
      iconName: 'Flame',
      title: 'Grandmaster Throwback Custom Room Clash',
      prize: '10,000 Diamonds + VIP Discord Role 🔥',
      mode: 'Squad Battle Royale (Bermuda)',
      slots: '12 / 12 Squads',
      date: 'Sunday, 6:00 PM IST',
      broadcast: 'Rooter Esports Broadcast & YouTube',
      idLabel: 'Free Fire Player UID',
      idPlaceholder: 'e.g. 142404154',
      roleOptions: ['AWM Sniper Specialist', 'Entry Rusher & Drag Fragger', 'In-Game Leader (IGL)', 'Support & Gloo Wall Master']
    }
  ];

  const [selectedTourney, setSelectedTourney] = useState<number>(0);
  const currentTourney = tournaments[selectedTourney];

  const [ign, setIgn] = useState<string>('Ultra_Ahsan_99');
  const [playerId, setPlayerId] = useState<string>('UltraOP#Aim');
  const [discordTag, setDiscordTag] = useState<string>('AhsanOP#4021');
  const [squadName, setSquadName] = useState<string>('TEAM OP ROYALS');
  const [role, setRole] = useState<string>(currentTourney.roleOptions[0]);
  const [copied, setCopied] = useState<boolean>(false);

  const handleTourneyChange = (idx: number) => {
    sound.playClick();
    setSelectedTourney(idx);
    setRole(tournaments[idx].roleOptions[0]);
  };

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    sound.playScore();
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.7 }
    });
  };

  const handleCopyPass = () => {
    sound.playScore();
    const text = `🎟️ ULTRAOP MULTI-GAME TOURNAMENT TICKET\nGame: ${currentTourney.game}\nTournament: ${currentTourney.title}\nPrize Pool: ${currentTourney.prize}\nPlayer IGN: ${ign}\nGame ID / UID: ${playerId}\nDiscord: ${discordTag}\nSquad / Team: ${squadName} (${role})\nSchedule: ${currentTourney.date}\nLobby: Discord #tournament-lobby-04`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const renderGameIcon = (name: string, className: string = 'w-4 h-4') => {
    switch (name) {
      case 'Box': return <Box className={className} />;
      case 'Crosshair': return <Crosshair className={className} />;
      case 'Gamepad': return <Gamepad className={className} />;
      case 'Flame': return <Flame className={className} />;
      default: return <Gamepad className={className} />;
    }
  };

  return (
    <section id="tournaments" className="py-24 bg-[#ECECE8] relative overflow-hidden border-t border-black/10">
      {/* Background Watermark */}
      <div className="absolute top-10 right-0 text-[180px] sm:text-[220px] font-black text-black/[0.02] pointer-events-none whitespace-nowrap z-0 select-none font-heading leading-none">
        SCRIMS
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="text-left max-w-3xl mb-14"
        >
          <div className="text-[11px] font-black uppercase tracking-[0.4em] text-[#FF3E00] flex items-center gap-3 mb-4">
            <div className="h-[1.5px] w-8 bg-[#FF3E00]"></div>
            <span>07 / Multi-Game Custom Arena</span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-[#121212] tracking-tighter leading-tight font-heading">
            CUSTOM TOURNAMENTS <br className="hidden sm:inline" />
            <span className="font-serif-italic font-normal text-[#FF3E00] lowercase text-4xl sm:text-6xl">
              & scrim tickets.
            </span>
          </h2>
          <p className="mt-4 text-[#555555] text-sm sm:text-base leading-relaxed max-w-2xl font-medium">
            Register your team for UltraOP's weekly custom scrims across Minecraft, Valorant, GTA V, Roblox, and classic battle royale matches. Win cash prizes, stream shoutouts, and verified VIP Discord gladiator roles.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Tournament Selection & Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 space-y-6"
          >
            <div className="bg-white border border-black/15 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <label className="text-[10px] text-[#777777] font-black uppercase tracking-wider block">
                  1. Select Game Tournament Arena
                </label>
                <span className="text-[10px] font-mono text-[#FF3E00] font-bold">5 Active Cups</span>
              </div>
              <div className="space-y-2.5">
                {tournaments.map((t, idx) => (
                  <div
                    key={t.id}
                    onClick={() => handleTourneyChange(idx)}
                    className={`p-3.5 border cursor-pointer transition-all ${
                      selectedTourney === idx
                        ? 'bg-[#121212] text-white border-black shadow-sm'
                        : 'bg-[#F4F4F1] hover:bg-white text-[#121212] border-black/10'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        {renderGameIcon(t.iconName, selectedTourney === idx ? 'w-4 h-4 text-[#FF3E00]' : 'w-4 h-4 text-gray-500')}
                        <span className="text-sm font-black font-heading">{t.title}</span>
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-[#FF3E00] shrink-0 ml-2">
                        {t.prize}
                      </span>
                    </div>
                    <div className={`text-xs ${selectedTourney === idx ? 'text-gray-300' : 'text-[#666666]'}`}>
                      {t.mode} • <span className="font-bold text-[#FF3E00]">{t.game}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Registration Form */}
            <form onSubmit={handleGenerate} className="bg-white border border-black/15 p-6 shadow-sm space-y-4">
              <label className="text-[10px] text-[#777777] font-black uppercase tracking-wider block">
                2. Enter {currentTourney.game} Player Credentials
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] text-[#555555] font-bold block mb-1">Player Display Name / IGN</label>
                  <input
                    type="text"
                    required
                    value={ign}
                    onChange={(e) => setIgn(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-[#F4F4F1] border border-black/15 text-[#121212] focus:outline-none focus:border-black font-medium"
                    placeholder="e.g. UltraOP_Fan"
                  />
                </div>

                <div>
                  <label className="text-[10px] text-[#555555] font-bold block mb-1">{currentTourney.idLabel}</label>
                  <input
                    type="text"
                    required
                    value={playerId}
                    onChange={(e) => setPlayerId(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-[#F4F4F1] border border-black/15 text-[#121212] focus:outline-none focus:border-black font-mono font-medium"
                    placeholder={currentTourney.idPlaceholder}
                  />
                </div>

                <div>
                  <label className="text-[10px] text-[#555555] font-bold block mb-1">Discord Tag / Username</label>
                  <input
                    type="text"
                    required
                    value={discordTag}
                    onChange={(e) => setDiscordTag(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-[#F4F4F1] border border-black/15 text-[#121212] focus:outline-none focus:border-black font-medium"
                    placeholder="e.g. Player#1234"
                  />
                </div>

                <div>
                  <label className="text-[10px] text-[#555555] font-bold block mb-1">Squad / Clan Team Name</label>
                  <input
                    type="text"
                    required
                    value={squadName}
                    onChange={(e) => setSquadName(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-[#F4F4F1] border border-black/15 text-[#121212] focus:outline-none focus:border-black font-medium"
                    placeholder="e.g. OP SQUAD"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] text-[#555555] font-bold block mb-1">Match Role in Squad</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#F4F4F1] border border-black/15 text-[#121212] focus:outline-none focus:border-black font-medium"
                >
                  {currentTourney.roleOptions.map((r, i) => (
                    <option key={i} value={r}>{r}</option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#121212] hover:bg-[#FF3E00] text-white font-black text-[10px] uppercase tracking-[0.25em] flex items-center justify-center gap-2 transition-all shadow-sm"
              >
                <Sparkles className="w-4 h-4 text-[#FF3E00]" />
                Update Match Pass Ticket
              </button>
            </form>
          </motion.div>

          {/* Generated Match Pass Ticket */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6"
          >
            <div className="bg-[#121212] text-white p-7 sm:p-8 border-2 border-black relative overflow-hidden shadow-xl">
              {/* Ticket Top Notch */}
              <div className="flex items-center justify-between border-b border-white/15 pb-4 mb-6">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#FF3E00] flex items-center justify-center font-black text-xs text-white">
                    OP
                  </div>
                  <div>
                    <h4 className="font-heading font-black text-base uppercase tracking-tight">
                      ULTRAOP ARENA PASS
                    </h4>
                    <span className="text-[9px] text-[#FF3E00] font-black uppercase tracking-[0.2em]">
                      {currentTourney.game} Official Ticket
                    </span>
                  </div>
                </div>

                <span className="px-2.5 py-1 bg-white/10 text-gray-300 font-mono text-[10px] font-bold">
                  PASS #UOP-{currentTourney.gameKey.toUpperCase()}-{(ign.length * 137).toString(16).toUpperCase()}
                </span>
              </div>

              {/* Tournament Title */}
              <div className="mb-6">
                <span className="text-[10px] text-[#888888] font-mono uppercase tracking-wider block mb-1">
                  Selected Event:
                </span>
                <h3 className="text-xl font-black font-heading text-white">
                  {currentTourney.title}
                </h3>
                <p className="text-xs text-[#FF3E00] font-bold mt-1">
                  Prize: {currentTourney.prize}
                </p>
              </div>

              {/* Player Details Grid */}
              <div className="grid grid-cols-2 gap-4 bg-white/5 p-4 border border-white/10 mb-6 text-xs">
                <div>
                  <span className="text-[9px] text-[#888888] uppercase block">In-Game Name</span>
                  <strong className="text-sm font-black text-white font-mono">{ign || 'PLAYER_IGN'}</strong>
                </div>
                <div>
                  <span className="text-[9px] text-[#888888] uppercase block">{currentTourney.idLabel}</span>
                  <strong className="text-sm font-black text-white font-mono truncate block">{playerId || 'ID_PENDING'}</strong>
                </div>
                <div>
                  <span className="text-[9px] text-[#888888] uppercase block">Squad / Team</span>
                  <strong className="text-xs font-bold text-gray-200">{squadName || 'TEAM OP'}</strong>
                </div>
                <div>
                  <span className="text-[9px] text-[#888888] uppercase block">Match Role</span>
                  <strong className="text-xs font-bold text-amber-400 truncate block">{role}</strong>
                </div>
              </div>

              {/* Match Schedule & Discord Lobby */}
              <div className="space-y-2 mb-6 text-xs text-gray-300">
                <div className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-[#FF3E00]" />
                  <span>{currentTourney.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-[#FF3E00]" />
                  <span>Room ID & Password drops 15 mins before match in Discord</span>
                </div>
                <div className="flex items-center gap-2 text-[11px] text-gray-400">
                  <Award className="w-3.5 h-3.5 text-amber-400" />
                  <span>{currentTourney.broadcast}</span>
                </div>
              </div>

              {/* Ticket Footer Action */}
              <div className="pt-4 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-[10px] text-gray-400 font-mono">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Anti-Cheat Protected</span>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    onClick={handleCopyPass}
                    className={`flex-1 sm:flex-none px-4 py-2.5 text-[10px] font-black uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all ${
                      copied ? 'bg-emerald-600 text-white' : 'bg-white text-[#121212] hover:bg-[#FF3E00] hover:text-white'
                    }`}
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5" /> Ticket Copied
                      </>
                    ) : (
                      <>
                        <Share2 className="w-3.5 h-3.5" /> Copy Ticket Info
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
