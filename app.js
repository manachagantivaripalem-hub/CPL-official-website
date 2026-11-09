const $ = s => document.querySelector(s);
const config = window.CPL_CONFIG || {};
let db = null;
if (window.supabase && config.supabaseUrl && !config.supabaseUrl.startsWith("YOUR_") && config.supabaseAnonKey && !config.supabaseAnonKey.startsWith("YOUR_")) db = window.supabase.createClient(config.supabaseUrl, config.supabaseAnonKey);
$("#year").textContent = new Date().getFullYear();
$("#menuToggle").addEventListener("click",()=>$("#nav").classList.toggle("open"));
function esc(v=""){return String(v).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
function dateFmt(v){const d=new Date(v);return isNaN(d)?v:d.toLocaleString("en-IN",{day:"numeric",month:"short",year:"numeric",hour:"numeric",minute:"2-digit"});}
async function load(){
 let teams=[],matches=[],points=[],live=[];
 if(db){
  const [t,m,p,l]=await Promise.all([db.from("teams").select("*").order("name"),db.from("matches").select("*").order("match_time"),db.from("points_table").select("*").order("points",{ascending:false}),db.from("live_scores").select("*").order("updated_at",{ascending:false}).limit(1)]);
  if(!l.error) live=l.data||[];
  if(!t.error) teams=t.data||[]; if(!m.error) matches=m.data||[]; if(!p.error) points=p.data||[];
 }
 $("#teamCount").textContent=teams.length; $("#matchCount").textContent=matches.length; $("#playedCount").textContent=matches.filter(x=>x.status==="Completed").length;
 $("#teamsList").innerHTML=teams.length?teams.map((t,i)=>`<article class="team-card"><span class="team-number">${String(i+1).padStart(2,"0")}</span><div><h3>${esc(t.name)}</h3><small>${esc(t.short_name||"CPL TEAM")}</small></div><b>✦</b></article>`).join(""):'<div class="empty">Team announcements coming soon.</div>';
 $("#matchesList").innerHTML=matches.length?matches.map(m=>`<article class="match-card"><div class="match-meta"><span>${esc(m.status||"Upcoming")}</span><time>${esc(dateFmt(m.match_time))}</time></div><div class="versus"><b>${esc(m.team1)}</b><span>VS</span><b>${esc(m.team2)}</b></div><div class="match-foot"><span>📍 ${esc(m.venue||"Chagantivaripalem")}</span><span>${esc(m.result||"Match details soon")}</span></div></article>`).join(""):'<div class="empty">Fixtures will appear here once published by the CPL team.</div>';
 const current=live[0];
 $("#liveScore").innerHTML=current?`<article class="live-card"><div class="live-card-top"><span class="${current.status==='Live'?'live-pill':'status-pill'}">${current.status==='Live'?'<i></i> LIVE':esc(current.status)}</span><span>${esc(current.match_title)}</span></div><div class="live-main"><div><small>NOW BATTING</small><h3>${esc(current.batting_team)}</h3></div><strong>${current.runs}/${current.wickets}</strong></div><div class="live-details"><span>OVERS <b>${esc(current.overs)}</b></span><span>RUN RATE <b>${esc(current.run_rate||'—')}</b></span>${current.target!==null&&current.target!==''?`<span>TARGET <b>${esc(current.target)}</b></span>`:''}</div>${current.note?`<p class="live-note">${esc(current.note)}</p>`:''}<small class="updated">SCORE UPDATED ${esc(new Date(current.updated_at).toLocaleTimeString("en-IN",{hour:"numeric",minute:"2-digit"}))}</small></article>`:'<div class="live-empty">No live match at the moment. Check back on match day.</div>';
 $("#pointsBody").innerHTML=points.length?points.map((p,i)=>`<tr><td>${i+1}</td><td><b>${esc(p.team_name)}</b></td><td>${p.played}</td><td>${p.won}</td><td>${p.lost}</td><td><b>${p.points}</b></td></tr>`).join(""):'<tr><td colspan="6" class="empty">Points table will be updated after matches begin.</td></tr>';
}
load();