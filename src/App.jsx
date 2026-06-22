import { useState, useEffect, useRef } from "react";

const PALETTE = {
  muted: [
    { hex:"#C0766A", label:"Terracotta" },
    { hex:"#C8944A", label:"Burnt" },
    { hex:"#C8A85A", label:"Gold" },
    { hex:"#5FAAB0", label:"Teal" },
    { hex:"#7BAFD4", label:"Slate Blue" },
    { hex:"#8F87C8", label:"Lavender" },
    { hex:"#B87AAA", label:"Mauve" },
    { hex:"#5FA88A", label:"Sage" },
    { hex:"#9BAA72", label:"Olive" },
    { hex:"#8A9BAA", label:"Smoke" },
  ],
  vivid: [
    { hex:"#E04A3A", label:"Red" },
    { hex:"#F07830", label:"Orange" },
    { hex:"#F0C030", label:"Yellow" },
    { hex:"#48B860", label:"Green" },
    { hex:"#88BBDD", label:"Sky" },
    { hex:"#3070E0", label:"Blue" },
    { hex:"#5058C0", label:"Indigo" },
    { hex:"#E04878", label:"Rose" },
    { hex:"#B080C8", label:"Lavender" },
    { hex:"#907850", label:"Tan" },
    { hex:"#506070", label:"Slate" },
    { hex:"#D09888", label:"Blush" },
  ],
};

const TRANSLATIONS = {
  ja: {
    nav_tasks: "タスク",
    nav_checklist: "チェックリスト",
    nav_calendar: "カレンダー",
    nav_settings: "設定",
    tasks_left: n => `残り ${n} 件 — ファイト！`,
    all_done: "✦ 全部終わった！最高！",
    btn_add_task: "＋ タスク",
    btn_add: "＋ 追加",
    btn_today: "✕ 今日",
    filter_all: "すべて",
    badge_done: "✦ 完了",
    no_tasks: "タスクなし — 右上の＋から追加",
    weekdays: ["日","月","火","水","木","金","土"],
    cal_footer: "日付をタップ → その日のタスクへ移動",
    cl_subtitle: "毎日リセット — カテゴリ別に確認 ✦",
    sec_lang: "言語 / Language",
    sec_notif: "通知設定",
    sec_task_cats: "タスクカテゴリ",
    sec_cl_cats: "チェックリストカテゴリ",
    drag_hint: "行をドラッグして順番を変更できます",
    notif_title: "期限タスクの通知",
    notif_granted: "✦ 通知が有効です",
    notif_off: "通知がオフになっています",
    notif_denied: "🚫 ブラウザ設定から許可してください",
    notif_default: "アプリ起動時に期限タスクをお知らせします",
    btn_allow: "許可する",
    modal_add_task: "新しいタスク",
    modal_edit_task: "タスクを編集",
    modal_add_cl: "チェック項目を追加",
    modal_add_tcat: "タスクカテゴリを追加",
    modal_add_ccat: "チェックリストカテゴリを追加",
    modal_edit_cat: "カテゴリを編集",
    modal_locked_cat: (emoji, name) => `${emoji} ${name}に追加`,
    lbl_task_name: "タスク名",
    lbl_category: "カテゴリ",
    lbl_due: "期限（任意）",
    lbl_item_name: "項目名",
    lbl_repeat: "繰り返し",
    lbl_cat_name: "カテゴリ名",
    lbl_emoji: "絵文字",
    lbl_color: "カラー",
    btn_add_item: "追加する",
    btn_save: "保存する",
    btn_close: "閉じる",
    btn_edit: "編集",
    btn_delete: "削除",
    auto_set: "（自動セット）",
    ph_task: "例: メールチェック",
    ph_item: "例: 財布を確認",
    ph_cat: "例: 勉強",
    ph_emoji_task: "例: 📚",
    ph_ccat: "例: 外出グッズ",
    ph_emoji_ccat: "例: 🎒",
    color_muted: "落ち着いた",
    color_vivid: "パキッとした",
    filter_date_label: (m, d) => `📅 ${m}/${d} の期限タスク`,
    no_tasks_day: "この日のタスクはありません",
    notif_banner_title: "今日が期限のタスクがあります",
    notif_banner_body: t => `今日が期限：${t}`,
    add_cat: "＋ カテゴリを追加",
    no_cats_yet: "カテゴリがありません — 下のボタンから追加してください",
    no_tasks_today: "今日のタスクはありません ✦",
    sec_cl_repeat: "チェックリスト 繰り返し設定",
    repeat_daily: "毎日繰り返す",
    repeat_once: "一回のみ",
    sec_danger: "データ",
    btn_reset: "🔄 すべてリセット",
    confirm_reset: "現在のデータが全て削除されます。初期データにリセットしますか？",
    fmt_header: (m, d) => `${m}月${d}日 🧠`,
    fmt_filter_hdr: (m, d) => `${m}月${d}日 📅`,
  },
  en: {
    nav_tasks: "Tasks",
    nav_checklist: "Checklist",
    nav_calendar: "Calendar",
    nav_settings: "Settings",
    tasks_left: n => `${n} left — you got this!`,
    all_done: "✦ All done! Amazing!",
    btn_add_task: "+ Task",
    btn_add: "+ Add",
    btn_today: "✕ Today",
    filter_all: "All",
    badge_done: "✦ Done",
    no_tasks: "No tasks — tap + to add",
    weekdays: ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],
    cal_footer: "Tap a date → jump to that day's tasks",
    cl_subtitle: "Daily reset — check by category ✦",
    sec_lang: "言語 / Language",
    sec_notif: "Notifications",
    sec_task_cats: "Task Categories",
    sec_cl_cats: "Checklist Categories",
    drag_hint: "Drag rows to reorder",
    notif_title: "Due task alerts",
    notif_granted: "✦ Notifications enabled",
    notif_off: "Notifications are off",
    notif_denied: "🚫 Enable in browser settings",
    notif_default: "You'll be alerted about due tasks on launch",
    btn_allow: "Allow",
    modal_add_task: "New Task",
    modal_edit_task: "Edit Task",
    modal_add_cl: "Add Checklist Item",
    modal_add_tcat: "Add Task Category",
    modal_add_ccat: "Add Checklist Category",
    modal_edit_cat: "Edit Category",
    modal_locked_cat: (emoji, name) => `Add to ${emoji} ${name}`,
    lbl_task_name: "Task name",
    lbl_category: "Category",
    lbl_due: "Due date (optional)",
    lbl_item_name: "Item name",
    lbl_repeat: "Repeat",
    lbl_cat_name: "Category name",
    lbl_emoji: "Emoji",
    lbl_color: "Color",
    btn_add_item: "Add",
    btn_save: "Save",
    btn_close: "Close",
    btn_edit: "Edit",
    btn_delete: "Delete",
    auto_set: "(auto-set)",
    ph_task: "e.g. Check emails",
    ph_item: "e.g. Check wallet",
    ph_cat: "e.g. Study",
    ph_emoji_task: "e.g. 📚",
    ph_ccat: "e.g. Going out",
    ph_emoji_ccat: "e.g. 🎒",
    color_muted: "Muted",
    color_vivid: "Vivid",
    filter_date_label: (m, d) => `📅 ${m}/${d} due tasks`,
    no_tasks_day: "No tasks for this day",
    notif_banner_title: "Tasks due today",
    notif_banner_body: t => `Due today: ${t}`,
    add_cat: "+ Add Category",
    no_cats_yet: "No categories yet — add one below",
    no_tasks_today: "No tasks for today ✦",
    sec_cl_repeat: "Checklist Repeat Settings",
    repeat_daily: "Repeat daily",
    repeat_once: "One time only",
    sec_danger: "Data",
    btn_reset: "🔄 Reset all",
    confirm_reset: "This will delete all current data and reset to defaults. Continue?",
    fmt_header: (m, d) => `${m}/${d} 🧠`,
    fmt_filter_hdr: (m, d) => `${m}/${d} 📅`,
  },
};

const DEFAULTS = {
  ja: {
    tCats: [
      { id:"morning",   name:"午前",         color:"#C8A85A", emoji:"🌤" },
      { id:"afternoon", name:"午後",         color:"#7BAFD4", emoji:"☀️" },
      { id:"work",      name:"仕事",         color:"#C87878", emoji:"💼" },
      { id:"private",   name:"プライベート", color:"#5FA88A", emoji:"🌿" },
    ],
    cCats: [
      { id:"cl_morning", name:"朝の持ち物", color:"#C8944A", emoji:"🎒" },
      { id:"cl_work",    name:"仕事グッズ", color:"#8A9BAA", emoji:"💻" },
      { id:"cl_night",   name:"夜の準備",   color:"#8F87C8", emoji:"🌙" },
    ],
    tasks: [
      { id:"t1", title:"メールチェック",         catId:"morning",   done:false, due:"", ts:1 },
      { id:"t2", title:"企画書を仕上げる",       catId:"work",      done:false, due:"", ts:2 },
      { id:"t3", title:"ランチ予約",             catId:"afternoon", done:true,  due:"", ts:3 },
      { id:"t4", title:"SNS投稿スケジュール確認", catId:"work",     done:false, due:"", ts:4 },
    ],
    clItems: [
      { id:"c1", title:"スマホ充電器",   clCatId:"cl_morning", checked:false },
      { id:"c2", title:"財布・カード",   clCatId:"cl_morning", checked:false },
      { id:"c3", title:"薬を飲む",       clCatId:"cl_morning", checked:true  },
      { id:"c4", title:"PC・充電器",     clCatId:"cl_work",    checked:false },
      { id:"c5", title:"手帳・ペン",     clCatId:"cl_work",    checked:false },
      { id:"c6", title:"翌日の服を用意", clCatId:"cl_night",   checked:false },
    ],
  },
  en: {
    tCats: [
      { id:"morning",   name:"Morning",   color:"#C8A85A", emoji:"🌤" },
      { id:"afternoon", name:"Afternoon", color:"#7BAFD4", emoji:"☀️" },
      { id:"work",      name:"Work",      color:"#C87878", emoji:"💼" },
      { id:"private",   name:"Personal",  color:"#5FA88A", emoji:"🌿" },
    ],
    cCats: [
      { id:"cl_morning", name:"Morning bag", color:"#C8944A", emoji:"🎒" },
      { id:"cl_work",    name:"Work gear",   color:"#8A9BAA", emoji:"💻" },
      { id:"cl_night",   name:"Night prep",  color:"#8F87C8", emoji:"🌙" },
    ],
    tasks: [
      { id:"t1", title:"Check emails",        catId:"morning",   done:false, due:"", ts:1 },
      { id:"t2", title:"Finish the proposal", catId:"work",      done:false, due:"", ts:2 },
      { id:"t3", title:"Book lunch",          catId:"afternoon", done:true,  due:"", ts:3 },
      { id:"t4", title:"Review post schedule", catId:"work",     done:false, due:"", ts:4 },
    ],
    clItems: [
      { id:"c1", title:"Phone charger", clCatId:"cl_morning", checked:false },
      { id:"c2", title:"Wallet & cards", clCatId:"cl_morning", checked:false },
      { id:"c3", title:"Take medication", clCatId:"cl_morning", checked:true  },
      { id:"c4", title:"Laptop & charger", clCatId:"cl_work",  checked:false },
      { id:"c5", title:"Notebook & pen",  clCatId:"cl_work",   checked:false },
      { id:"c6", title:"Prep tomorrow's clothes", clCatId:"cl_night", checked:false },
    ],
  },
};

// デフォルトカテゴリIDに対応する言語別名前（言語切替時に自動更新）
const CAT_NAMES = {
  ja: {
    morning:"午前", afternoon:"午後", work:"仕事", private:"プライベート",
    cl_morning:"朝の持ち物", cl_work:"仕事グッズ", cl_night:"夜の準備",
  },
  en: {
    morning:"Morning", afternoon:"Afternoon", work:"Work", private:"Personal",
    cl_morning:"Morning Bag", cl_work:"Work Gear", cl_night:"Night Prep",
  },
};

// デフォルト項目IDに対応する言語別タイトル（言語切替時に自動更新）
const ITEM_NAMES = {
  ja: {
    t1:"メールチェック", t2:"企画書を仕上げる", t3:"ランチ予約", t4:"SNS投稿スケジュール確認",
    c1:"スマホ充電器", c2:"財布・カード", c3:"薬を飲む", c4:"PC・充電器", c5:"手帳・ペン", c6:"翌日の服を用意",
  },
  en: {
    t1:"Check emails", t2:"Finish proposal", t3:"Book lunch", t4:"Check post schedule",
    c1:"Phone charger", c2:"Wallet & cards", c3:"Take meds", c4:"Laptop & charger", c5:"Notebook & pen", c6:"Prep clothes",
  },
};

const uid   = () => Math.random().toString(36).slice(2,9);
const today = () => new Date().toISOString().slice(0,10);
const fmtD  = d => { if(!d) return ""; const [,m,day]=d.split("-"); return `${+m}/${+day}`; };

function mix(hex, pct=0.15) {
  const n=parseInt(hex.slice(1),16);
  const r=((n>>16)&255), g=((n>>8)&255), b=(n&255);
  const mx=(c)=>Math.round(c+(255-c)*pct);
  return `#${[mx(r),mx(g),mx(b)].map(x=>x.toString(16).padStart(2,"0")).join("")}`;
}

function Sparkle({ color, x, y }) {
  const [visible, setVisible] = useState(true);
  useEffect(() => { const t=setTimeout(()=>setVisible(false),600); return()=>clearTimeout(t); },[]);
  if(!visible) return null;
  return (
    <div style={{ position:"fixed", left:x, top:y, pointerEvents:"none", zIndex:999 }}>
      {["✦","·","✦","·","✦"].map((s,i)=>(
        <span key={i} style={{
          position:"absolute", fontSize: i%2===0 ? 12 : 7, color,
          transform:`rotate(${i*72}deg) translateY(-${10+i*3}px)`,
          opacity:0, animation:`sparkle-fly 0.6s ease-out ${i*0.05}s forwards`,
        }}>{s}</span>
      ))}
      <style>{`@keyframes sparkle-fly{0%{opacity:1;transform:rotate(var(--r,0deg)) translateY(0)}100%{opacity:0;transform:rotate(var(--r,0deg)) translateY(-22px)}}`}</style>
    </div>
  );
}

function ColorPicker({ selected, onSelect, t }) {
  const Row = ({ colors, label }) => (
    <div style={{ marginBottom:10 }}>
      <div style={{ fontSize:10, fontWeight:700, color:"#B0A8C8", letterSpacing:1.5, textTransform:"uppercase", marginBottom:6 }}>{label}</div>
      <div style={{ display:"flex", gap:7, flexWrap:"wrap" }}>
        {colors.map(c=>(
          <button key={c.hex} onClick={()=>onSelect(c.hex)} title={c.label} style={{
            width:28, height:28, borderRadius:"50%", background:c.hex,
            border: selected===c.hex ? "3px solid #0F0E2A" : "3px solid transparent",
            cursor:"pointer", outline:"none",
            boxShadow: selected===c.hex ? "0 0 0 2px #fff, 0 0 0 4px "+c.hex : "none",
            transition:"box-shadow 0.15s, transform 0.1s",
            transform: selected===c.hex ? "scale(1.15)" : "scale(1)",
          }}/>
        ))}
      </div>
    </div>
  );
  return (
    <div style={{ marginTop:8 }}>
      <Row colors={PALETTE.muted} label={t("color_muted")}/>
      <div style={{ height:1, background:"#EDE8F8", margin:"4px 0 10px" }}/>
      <Row colors={PALETTE.vivid} label={t("color_vivid")}/>
    </div>
  );
}

const iS = {
  width:"100%", padding:"10px 13px", borderRadius:12,
  border:"2px solid #EEEAF4", fontSize:14, outline:"none",
  boxSizing:"border-box", marginTop:5, color:"#0F0E2A",
  fontFamily:"inherit", background:"#FAFAFA", transition:"border-color 0.15s",
};
const lS = { fontSize:11, fontWeight:800, color:"#B0A8C8", letterSpacing:1, marginTop:14, display:"block", textTransform:"uppercase" };
const bP = (c="#7472A8")=>({ padding:"12px 20px", borderRadius:10, border:"none", background:c, color:"#fff", fontWeight:800, cursor:"pointer", fontSize:14, marginTop:18, width:"100%", fontFamily:"inherit", letterSpacing:0.5 });

function Modal({ title, accent="#7c6ef4", onClose, children }) {
  return (
    <div style={{ position:"fixed", inset:0, background:"#0F0E2Acc", zIndex:200, display:"flex", alignItems:"center", justifyContent:"center", backdropFilter:"blur(4px)" }}
      onClick={e=>e.target===e.currentTarget&&onClose()}>
      <div style={{ background:"#FFF8F0", borderRadius:24, padding:"26px 28px", minWidth:320, maxWidth:420, width:"90%", boxShadow:"0 20px 60px #0F0E2A44", borderTop:`4px solid ${accent}`, maxHeight:"90vh", overflowY:"auto" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
          <span style={{ fontSize:17, fontWeight:900, color:"#0F0E2A" }}>{title}</span>
          <button onClick={onClose} style={{ background:"none", border:"none", fontSize:22, cursor:"pointer", color:"#C0B8D0", lineHeight:1 }}>×</button>
        </div>
        {children}
      </div>
    </div>
  );
}

function CategoryCard({ cat, items, onToggleItem, onDeleteItem, onEditItem, onAdd, isTask=true, t }) {
  const done  = items.filter(i=>i.done??i.checked).length;
  const total = items.length;
  const allDone = total>0 && done===total;
  const pct = total===0 ? 0 : Math.round(done/total*100);
  return (
    <div style={{ borderRadius:20, overflow:"hidden", marginBottom:16, boxShadow: allDone ? "0 1px 4px #0F0E2A08" : "0 2px 10px #0F0E2A0c", transition:"box-shadow 0.3s" }}>
      <div style={{ background:`linear-gradient(100deg,${cat.color}ee,${mix(cat.color,0.4)}cc)`, padding:"10px 16px", display:"flex", alignItems:"center", gap:8 }}>
        <span style={{ fontSize:18 }}>{cat.emoji}</span>
        <span style={{ fontWeight:900, fontSize:15, color:"#fff", flex:1, letterSpacing:0.3 }}>{cat.name}</span>
        <div style={{ background: allDone ? "#fff" : "rgba(255,255,255,0.3)", borderRadius:20, padding:"3px 10px", display:"flex", alignItems:"center", gap:5 }}>
          <span style={{ fontSize:11, fontWeight:900, color: allDone ? cat.color : "#fff" }}>{allDone ? t("badge_done") : `${done}/${total}`}</span>
        </div>
        {onAdd && (
          <button onClick={onAdd} style={{ width:26, height:26, borderRadius:"50%", border:"none", background:"rgba(255,255,255,0.35)", color:"#fff", fontSize:18, lineHeight:1, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, fontWeight:400 }}>＋</button>
        )}
      </div>
      {total>0 && (
        <div style={{ height:3, background:"#F0ECF8" }}>
          <div style={{ height:"100%", width:`${pct}%`, background:`linear-gradient(90deg,${cat.color},${mix(cat.color,-0.1)})`, transition:"width 0.4s cubic-bezier(.4,0,.2,1)" }}/>
        </div>
      )}
      <div style={{ background:"#FFFCF8", padding:"8px 12px" }}>
        {items.length===0 && <div style={{ padding:"14px 4px", fontSize:13, color:"#C0B8CC", textAlign:"center" }}>{t("no_tasks")}</div>}
        {items.map(item=>(
          isTask
            ? <TaskRow  key={item.id} item={item} color={cat.color} onToggle={onToggleItem} onDelete={onDeleteItem} onEdit={onEditItem} t={t}/>
            : <CheckRow key={item.id} item={item} color={cat.color} onToggle={onToggleItem} onDelete={onDeleteItem} t={t}/>
        ))}
      </div>
    </div>
  );
}

function TaskRow({ item, color, onToggle, onDelete, onEdit, t }) {
  const [hov, setHov] = useState(false);
  const ref = useRef(null);
  const [sparks, setSparks] = useState([]);
  const handleToggle = () => {
    if(!item.done) { const r=ref.current?.getBoundingClientRect(); if(r) setSparks(s=>[...s,{id:uid(),x:r.left+r.width*0.15,y:r.top+r.height/2,color}]); }
    onToggle(item.id);
  };
  return (
    <div ref={ref} onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{ display:"flex", alignItems:"center", gap:10, padding:"10px 6px", borderBottom:"1px solid #F3EFF8", transition:"opacity 0.25s" }}>
      {sparks.map(s=><Sparkle key={s.id} color={s.color} x={s.x} y={s.y}/>)}
      <button onClick={handleToggle} style={{ width:24, height:24, borderRadius:8, flexShrink:0, border:`2.5px solid ${color}`, background:item.done?color:"transparent", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", transition:"background 0.2s, transform 0.1s", transform:hov&&!item.done?"scale(1.1)":"scale(1)", opacity:item.done?0.5:1 }}>
        {item.done && <span style={{ color:"#fff", fontSize:13, fontWeight:900, lineHeight:1 }}>✓</span>}
      </button>
      <span style={{ flex:1, fontSize:14, color:"#0F0E2A", fontWeight:500, textDecoration:item.done?"line-through":"none", opacity:item.done?0.45:1, transition:"opacity 0.25s", paddingLeft:8 }}>{item.title}</span>
      {item.due && <span style={{ fontSize:11, fontWeight:700, color:item.due<today()?"#FF6B6B":"#B0A8C8", background:item.due<today()?"#FF6B6B18":"#F3EFF8", padding:"2px 7px", borderRadius:8 }}>📅{fmtD(item.due)}</span>}
      {hov && (
        <div style={{ display:"flex", gap:2 }}>
          <button onClick={()=>onEdit(item)} style={{ background:"none",border:"1px solid #E0DCF0",borderRadius:6,cursor:"pointer",fontSize:11,padding:"3px 8px",color:"#9B8FC8",fontWeight:700,fontFamily:"inherit" }}>{t("btn_edit")}</button>
          <button onClick={()=>onDelete(item.id)} style={{ background:"none",border:"1px solid #FFE0E0",borderRadius:6,cursor:"pointer",fontSize:11,padding:"3px 8px",color:"#FF8080",fontWeight:700,fontFamily:"inherit" }}>{t("btn_delete")}</button>
        </div>
      )}
    </div>
  );
}

function CheckRow({ item, color, onToggle, onDelete, t }) {
  const [hov, setHov] = useState(false);
  const ref = useRef(null);
  const [sparks, setSparks] = useState([]);
  const handleToggle = () => {
    if(!item.checked) { const r=ref.current?.getBoundingClientRect(); if(r) setSparks(s=>[...s,{id:uid(),x:r.left+r.width*0.12,y:r.top+r.height/2,color}]); }
    onToggle(item.id);
  };
  return (
    <div ref={ref} onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{ display:"flex", alignItems:"center", gap:10, padding:"9px 6px", borderBottom:"1px solid #F3EFF8", transition:"opacity 0.25s" }}>
      {sparks.map(s=><Sparkle key={s.id} color={s.color} x={s.x} y={s.y}/>)}
      <button onClick={handleToggle} style={{ width:22, height:22, borderRadius:"50%", flexShrink:0, border:`2.5px solid ${color}`, background:item.checked?color:"transparent", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", transition:"background 0.2s, transform 0.1s", transform:hov&&!item.checked?"scale(1.1)":"scale(1)", opacity:item.checked?0.45:1 }}>
        {item.checked && <span style={{ color:"#fff", fontSize:11, fontWeight:900 }}>✓</span>}
      </button>
      <span style={{ flex:1, fontSize:14, color:"#0F0E2A", fontWeight:500, textDecoration:item.checked?"line-through":"none", opacity:item.checked?0.45:1, transition:"opacity 0.25s", paddingLeft:8 }}>{item.title}</span>
      {hov && <button onClick={()=>onDelete(item.id)} style={{ background:"none",border:"1px solid #FFE0E0",borderRadius:6,cursor:"pointer",fontSize:11,padding:"3px 8px",color:"#FF8080",fontWeight:700,fontFamily:"inherit" }}>{t("btn_delete")}</button>}
    </div>
  );
}

function CalendarView({ tasks, taskCats, onSelectDay, todayKey, selectedDate, t }) {
  const todayDate = new Date(todayKey);
  const [yr, setYr] = useState(todayDate.getFullYear());
  const [mo, setMo] = useState(todayDate.getMonth());
  // 日付が変わったとき（todayKey更新時）にカレンダーの表示月を今日に追従
  useEffect(() => {
    const d = new Date(todayKey);
    setYr(d.getFullYear());
    setMo(d.getMonth());
  }, [todayKey]);
  const WD = t("weekdays");
  const byDate = {};
  tasks.forEach(t=>{ if(t.due){ if(!byDate[t.due]) byDate[t.due]=[]; byDate[t.due].push(t); }});
  const days  = new Date(yr,mo+1,0).getDate();
  const first = new Date(yr,mo,1).getDay();
  const prev = ()=>{ if(mo===0){setYr(y=>y-1);setMo(11);}else setMo(m=>m-1); };
  const next = ()=>{ if(mo===11){setYr(y=>y+1);setMo(0);}else setMo(m=>m+1); };
  return (
    <div style={{ background:"#FAFAF8", border:"1px solid #E4E2EA" }}>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"12px 16px", borderBottom:"1px solid #E4E2EA" }}>
        <button onClick={prev} style={{ background:"none",border:"1px solid #DDD9E8",width:30,height:30,cursor:"pointer",fontSize:16,color:"#7472A8",display:"flex",alignItems:"center",justifyContent:"center" }}>‹</button>
        <span style={{ fontSize:14, fontWeight:700, color:"#2A2840", letterSpacing:2 }}>{yr} / {String(mo+1).padStart(2,"0")}</span>
        <button onClick={next} style={{ background:"none",border:"1px solid #DDD9E8",width:30,height:30,cursor:"pointer",fontSize:16,color:"#7472A8",display:"flex",alignItems:"center",justifyContent:"center" }}>›</button>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(7,1fr)", borderBottom:"1px solid #E4E2EA" }}>
        {WD.map((d,i)=>(
          <div key={d} style={{ textAlign:"center", fontSize:10, fontWeight:700, padding:"7px 0", letterSpacing:1, color:i===0?"#C07070":i===6?"#7BAFD4":"#A09AB8", borderRight:i<6?"1px solid #E4E2EA":"none" }}>{d}</div>
        ))}
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(7,1fr)" }}>
        {Array.from({length:first}).map((_,i)=>(
          <div key={`e${i}`} style={{ borderRight:"1px solid #E4E2EA", borderBottom:"1px solid #E4E2EA", minHeight:48 }}/>
        ))}
        {Array.from({length:days}).map((_,i)=>{
          const d   = i+1;
          const key = `${yr}-${String(mo+1).padStart(2,"0")}-${String(d).padStart(2,"0")}`;
          const its = byDate[key]||[];
          const isTo  = key===todayKey;
          const isSel = key===(selectedDate||todayKey);
          const dow = (first+i)%7;
          const isLastCol = (first+i)%7===6;
          return (
            <div key={d} onClick={()=>onSelectDay(key)}
              onMouseEnter={e=>{ if(!isTo&&!isSel) e.currentTarget.style.background="#F0EEF8"; }}
              onMouseLeave={e=>{ if(!isTo&&!isSel) e.currentTarget.style.background="transparent"; }}
              style={{ minHeight:48, padding:"6px 4px", background:isSel?"#7472A830":isTo?"#7472A818":"transparent", borderRight:isLastCol?"none":"1px solid #E4E2EA", borderBottom:"1px solid #E4E2EA", cursor:"pointer", transition:"background 0.1s", borderLeft:isSel?"2px solid #7472A8":"none" }}>
              <div style={{ textAlign:"center", fontSize:12, fontWeight:isSel?800:400, color:isSel?"#7472A8":dow===0?"#C07070":dow===6?"#7BAFD4":"#2A2840" }}>{d}</div>
              <div style={{ display:"flex", flexWrap:"wrap", gap:2, justifyContent:"center", marginTop:3 }}>
                {its.slice(0,4).map(tk=>{ const c=taskCats.find(c=>c.id===tk.catId); return <div key={tk.id} style={{ width:6,height:6,borderRadius:"50%",background:c?.color||"#ccc",flexShrink:0 }}/>; })}
              </div>
            </div>
          );
        })}
      </div>
      <div style={{ padding:"8px", textAlign:"center", fontSize:11, color:"#B0ACBF", borderTop:"1px solid #E4E2EA", letterSpacing:0.5 }}>{t("cal_footer")}</div>
    </div>
  );
}

function load(key, fallback) {
  try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; } catch { return fallback; }
}

export default function App() {
  const [lang, setLang]       = useState(()=>load("tb_lang", "ja"));
  const [tab, setTab]         = useState("tasks");
  // 初回起動時の言語設定に合わせてサンプルデータを選択
  const [tasks, setTasks]     = useState(()=>{ const l=load("tb_lang","ja"); return load("tb_tasks",   DEFAULTS[l]?.tasks   || DEFAULTS.ja.tasks);   });
  const [clItems, setClItems] = useState(()=>{ const l=load("tb_lang","ja"); return load("tb_clItems", DEFAULTS[l]?.clItems || DEFAULTS.ja.clItems); });
  const [tCats, setTCats]     = useState(()=>{ const l=load("tb_lang","ja"); return load("tb_tCats",   DEFAULTS[l]?.tCats   || DEFAULTS.ja.tCats);   });
  const [cCats, setCCats]     = useState(()=>{ const l=load("tb_lang","ja"); return load("tb_cCats",   DEFAULTS[l]?.cCats   || DEFAULTS.ja.cCats);   });

  // 日付は state で管理し、0:00 に自動更新
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const scheduleNext = () => {
      const n = new Date();
      const msToMidnight = new Date(n.getFullYear(), n.getMonth(), n.getDate()+1, 0, 0, 0) - n + 100;
      return setTimeout(() => { setNow(new Date()); scheduleNext(); }, msToMidnight);
    };
    const timer = scheduleNext();
    return () => clearTimeout(timer);
  }, []);
  const todayStr = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,"0")}-${String(now.getDate()).padStart(2,"0")}`;

  const t = key => TRANSLATIONS[lang][key];

  useEffect(()=>{ localStorage.setItem("tb_lang",    JSON.stringify(lang));    }, [lang]);
  useEffect(()=>{ localStorage.setItem("tb_tasks",   JSON.stringify(tasks));   }, [tasks]);
  useEffect(()=>{ localStorage.setItem("tb_clItems", JSON.stringify(clItems)); }, [clItems]);
  useEffect(()=>{ localStorage.setItem("tb_tCats",   JSON.stringify(tCats));   }, [tCats]);
  useEffect(()=>{ localStorage.setItem("tb_cCats",   JSON.stringify(cCats));   }, [cCats]);

  const [filterCat,  setFilterCat]  = useState("all");
  const [filterDate, setFilterDate] = useState(null);
  const [mAddTask, setMAddTask] = useState(false);
  const [mAddCl,   setMAddCl]   = useState(false);
  const [mAddTCat, setMAddTCat] = useState(false);
  const [mAddCCat, setMAddCCat] = useState(false);
  const [mEditT,   setMEditT]   = useState(null);
  const [mEditCat, setMEditCat] = useState(null);
  const [fTask,  setFTask]  = useState({ title:"", catId:tCats[0]?.id||"", due:"" });
  const [fCl,    setFCl]    = useState({ title:"", clCatId:cCats[0]?.id||"", repeat:"daily" });
  const [fTCat,  setFTCat]  = useState({ name:"", color:PALETTE.muted[0].hex, emoji:"📌" });
  const [fCCat,  setFCCat]  = useState({ name:"", color:PALETTE.muted[3].hex, emoji:"📦" });
  const [fECat,  setFECat]  = useState({ name:"", color:"", emoji:"" });
  const [editCatType, setEditCatType] = useState("task");
  // チェックリスト毎日リセット（日付変わったとき repeat:"daily" のものをリセット）
  const [lastResetDate, setLastResetDate] = useState(()=>load("tb_last_reset", ""));
  useEffect(()=>{ localStorage.setItem("tb_last_reset", JSON.stringify(lastResetDate)); }, [lastResetDate]);
  useEffect(() => {
    if(lastResetDate !== todayStr) {
      setClItems(cs => cs.map(c => (c.repeat ?? "daily") === "daily" ? {...c, checked:false} : c));
      setLastResetDate(todayStr);
    }
  }, [todayStr]);

  const [notifBanner,   setNotifBanner]   = useState(null);
  const [notifPerm,     setNotifPerm]     = useState(typeof Notification !== "undefined" ? Notification.permission : "default");
  const [notifEnabled,  setNotifEnabled]  = useState(()=>load("tb_notif_enabled", true));
  useEffect(()=>{ localStorage.setItem("tb_notif_enabled", JSON.stringify(notifEnabled)); }, [notifEnabled]);
  const notifiedDateRef = useRef("");

  const toggleTask  = id => setTasks(ts=>ts.map(t=>t.id===id?{...t,done:!t.done}:t));
  const deleteTask  = id => setTasks(ts=>ts.filter(t=>t.id!==id));
  const addTask = () => {
    if(!fTask.title.trim()) return;
    setTasks(ts=>[...ts,{id:uid(),title:fTask.title.trim(),catId:fTask.catId,done:false,due:fTask.due,ts:Date.now()}]);
    setFTask({title:"",catId:tCats[0]?.id||"",due:""}); setMAddTask(false);
  };
  const saveEditTask = () => { setTasks(ts=>ts.map(t=>t.id===mEditT.id?mEditT:t)); setMEditT(null); };
  const toggleCl = id => setClItems(cs=>cs.map(c=>c.id===id?{...c,checked:!c.checked}:c));
  const deleteCl = id => setClItems(cs=>cs.filter(c=>c.id!==id));
  const addCl = () => {
    if(!fCl.title.trim()) return;
    setClItems(cs=>[...cs,{id:uid(),title:fCl.title.trim(),clCatId:fCl.clCatId,checked:false,repeat:fCl.repeat}]);
    setFCl({title:"",clCatId:cCats[0]?.id||"",repeat:"daily"}); setMAddCl(false);
  };
  const addTCat = () => { if(!fTCat.name.trim()) return; setTCats(cs=>[...cs,{id:uid(),...fTCat}]); setFTCat({name:"",color:PALETTE.muted[0].hex,emoji:"📌"}); setMAddTCat(false); };
  const addCCat = () => { if(!fCCat.name.trim()) return; setCCats(cs=>[...cs,{id:uid(),...fCCat}]); setFCCat({name:"",color:PALETTE.muted[3].hex,emoji:"📦"}); setMAddCCat(false); };
  const openEditCat  = (cat, type="task") => { setMEditCat(cat); setFECat({name:cat.name,color:cat.color,emoji:cat.emoji}); setEditCatType(type); };
  const saveEditCat  = () => {
    if(editCatType==="task") setTCats(cs=>cs.map(c=>c.id===mEditCat.id?{...c,...fECat}:c));
    else                     setCCats(cs=>cs.map(c=>c.id===mEditCat.id?{...c,...fECat}:c));
    setMEditCat(null);
  };
  const jumpToDay = key => {
    setFilterCat("all");
    setTab("tasks");
    // 今日をタップ → 通常の今日ビュー（filterDateなし）
    setFilterDate(key === todayStr ? null : key);
  };
  const clearDateFilter = () => setFilterDate(null);

  // todayStr が変わった瞬間（日付変更）または初回に通知を発火
  useEffect(() => {
    if(notifiedDateRef.current === todayStr) return;
    notifiedDateRef.current = todayStr;
    const dueTasks = tasks.filter(tk => !tk.done && tk.due === todayStr);
    if(dueTasks.length === 0) return;
    setNotifBanner(dueTasks);
    if(!notifEnabled || typeof Notification === "undefined") return;
    if(Notification.permission === "granted") {
      dueTasks.forEach(tk => new Notification("Today's Brain 🧠", { body: t("notif_banner_body")(tk.title), icon:"/icon-192.png" }));
    } else if(Notification.permission === "default") {
      Notification.requestPermission().then(perm => {
        setNotifPerm(perm);
        if(perm === "granted") dueTasks.forEach(tk => new Notification("Today's Brain 🧠", { body: t("notif_banner_body")(tk.title), icon:"/icon-192.png" }));
      });
    }
  }, [todayStr, tasks]);

  const NAV = [
    { id:"tasks",     icon:"☑️",  label: t("nav_tasks")     },
    { id:"checklist", icon:"🎒",  label: t("nav_checklist") },
    { id:"calendar",  icon:"📅",  label: t("nav_calendar")  },
    { id:"settings",  icon:"⚙️",  label: t("nav_settings")  },
  ];

  const visibleCats = filterCat==="all" ? tCats : tCats.filter(c=>c.id===filterCat);
  // デフォルト表示: 今日のタスク（期限=今日 or 期限なし）。カレンダー選択時: その日のみ
  const activeDateFilter = filterDate
    ? (tk) => tk.due === filterDate
    : (tk) => tk.due === "" || tk.due === todayStr;
  const hdr = filterDate
    ? t("fmt_filter_hdr")(+filterDate.split("-")[1], +filterDate.split("-")[2])
    : t("fmt_header")(now.getMonth()+1, now.getDate());
  const totalTasks = tasks.filter(tk => !tk.done && activeDateFilter(tk) && (filterCat==="all" || tk.catId===filterCat)).length;

  return (
    <div style={{ height:"100dvh", background:"linear-gradient(160deg,#F4F3F8 0%,#FAFAF8 60%,#F3F6F9 100%)", fontFamily:"'Hiragino Sans','Noto Sans JP','Yu Gothic',sans-serif", display:"flex", justifyContent:"center", overflow:"hidden" }}>
      <div style={{ width:"100%", maxWidth:480, height:"100%", display:"flex", flexDirection:"column", position:"relative" }}>

        {/* HEADER */}
        <div style={{ background:"rgba(252,252,250,0.95)", backdropFilter:"blur(12px)", padding:"16px 20px 12px", borderBottom:"1px solid #E8E6EC", position:"sticky", top:0, zIndex:50 }}>
          <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between" }}>
            <div>
              <div style={{ fontSize:10, fontWeight:900, color:"#B0A8C8", letterSpacing:3, textTransform:"uppercase" }}>Today's Brain</div>
              <div style={{ fontSize:24, fontWeight:900, color:"#0F0E2A", marginTop:2, lineHeight:1.1 }}>{hdr}</div>
              {tab==="tasks" && totalTasks>0 && <div style={{ fontSize:12, color:"#9B8FC8", marginTop:3, fontWeight:700 }}>{t("tasks_left")(totalTasks)}</div>}
              {tab==="tasks" && totalTasks===0 && tasks.length>0 && <div style={{ fontSize:12, color:"#55EFC4", marginTop:3, fontWeight:700 }}>{t("all_done")}</div>}
            </div>
            <div style={{ display:"flex", gap:6, alignItems:"center" }}>
              {filterDate && <button onClick={clearDateFilter} style={{ padding:"6px 11px", borderRadius:20, border:"none", background:"#F3EFF8", color:"#9B8FC8", fontWeight:800, fontSize:11, cursor:"pointer", fontFamily:"inherit" }}>{t("btn_today")}</button>}
              {tab==="tasks" && <button onClick={()=>{ const preselect=filterCat!=="all"?filterCat:tCats[0]?.id||""; setFTask({title:"",catId:preselect,due:filterDate||""}); setMAddTask(true); }} style={{ padding:"8px 16px", borderRadius:20, border:"none", background:"#7472A8", color:"#fff", fontWeight:900, fontSize:13, cursor:"pointer", fontFamily:"inherit", boxShadow:"0 2px 8px #7472A820" }}>{t("btn_add_task")}</button>}
              {tab==="checklist" && <button onClick={()=>setMAddCl(true)} style={{ padding:"8px 16px", borderRadius:20, border:"none", background:"#C8944A", color:"#fff", fontWeight:900, fontSize:13, cursor:"pointer", fontFamily:"inherit", boxShadow:"0 2px 8px #C8944A20" }}>{t("btn_add")}</button>}
            </div>
          </div>
          {tab==="tasks" && (
            <div style={{ display:"flex", gap:6, marginTop:12, overflowX:"auto", paddingBottom:2 }}>
              {[{id:"all",name:t("filter_all"),color:"#0F0E2A",emoji:""},...tCats].map(c=>(
                <button key={c.id} onClick={()=>setFilterCat(c.id)} style={{ padding:"5px 13px", borderRadius:20, border: filterCat===c.id ? "none" : `1.5px solid ${c.id==="all"?"#B0A8C8":c.color+"88"}`, fontSize:12, fontWeight:800, background:filterCat===c.id?(c.id==="all"?"#3A384A":c.color):(c.id==="all"?"#ECEAF2":c.color+"18"), color:filterCat===c.id?"#fff":(c.id==="all"?"#7472A8":c.color), cursor:"pointer", whiteSpace:"nowrap", fontFamily:"inherit", transition:"background 0.15s, color 0.15s" }}>{c.emoji} {c.name}</button>
              ))}
            </div>
          )}
        </div>

        {/* 期限バナー */}
        {notifBanner && (
          <div style={{ background:"linear-gradient(135deg,#FF6B6B,#FF9F43)", padding:"10px 16px", display:"flex", alignItems:"flex-start", gap:10 }}>
            <span style={{ fontSize:20, flexShrink:0 }}>⏰</span>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:12, fontWeight:900, color:"#fff", marginBottom:3 }}>{t("notif_banner_title")}</div>
              {notifBanner.map(tk => {
                const cat = tCats.find(c=>c.id===tk.catId);
                return <div key={tk.id} onClick={()=>{ setFilterDate(today()); setFilterCat("all"); setTab("tasks"); setNotifBanner(null); }} style={{ fontSize:13, color:"#fff", fontWeight:700, opacity:0.95, display:"flex", alignItems:"center", gap:5, marginTop:2, cursor:"pointer" }}><span style={{ fontSize:14 }}>{cat?.emoji}</span><span style={{ textDecoration:"underline" }}>{tk.title}</span></div>;
              })}
            </div>
            <button onClick={()=>setNotifBanner(null)} style={{ background:"rgba(255,255,255,0.25)", border:"none", borderRadius:8, color:"#fff", fontWeight:900, fontSize:11, padding:"4px 10px", cursor:"pointer", flexShrink:0, fontFamily:"inherit", letterSpacing:0.5 }}>{t("btn_close")}</button>
          </div>
        )}

        {/* CONTENT */}
        <div style={{ flex:1, padding:"16px 14px 24px", overflowY:"auto", WebkitOverflowScrolling:"touch" }}>
          {tab==="tasks" && (
            <div>
              {filterDate && <div style={{ fontSize:12, color:"#B0A8C8", marginBottom:10, fontWeight:700 }}>{t("filter_date_label")(+filterDate.split("-")[1], +filterDate.split("-")[2])}</div>}
              {tCats.length===0 ? (
                <div style={{ textAlign:"center", padding:"60px 0", color:"#C0B8CC" }}>
                  <div style={{ fontSize:40 }}>📂</div>
                  <div style={{ marginTop:8, fontSize:14, fontWeight:700 }}>{t("no_cats_yet")}</div>
                  <button onClick={()=>setMAddTCat(true)} style={{ marginTop:16, padding:"10px 24px", borderRadius:20, border:"none", background:"#7472A8", color:"#fff", fontWeight:800, fontSize:13, cursor:"pointer", fontFamily:"inherit" }}>{t("add_cat")}</button>
                </div>
              ) : (
                visibleCats.map(cat=>{
                  const items = tasks.filter(tk=>tk.catId===cat.id).filter(activeDateFilter).sort((a,b)=>a.ts-b.ts);
                  if(items.length===0 && filterDate) return null;
                  return <CategoryCard key={cat.id} cat={cat} items={items} isTask={true} onToggleItem={toggleTask} onDeleteItem={deleteTask} onEditItem={setMEditT} onAdd={()=>{ setFTask({title:"",catId:cat.id,due:filterDate||""}); setMAddTask(true); }} t={t}/>;
                })
              )}
              {tCats.length>0 && tasks.filter(activeDateFilter).length===0 && !filterDate && (
                <div style={{ textAlign:"center", padding:"40px 0", color:"#C0B8CC", fontSize:13 }}>
                  <div style={{ fontSize:36 }}>✨</div>
                  <div style={{ marginTop:8, fontWeight:700 }}>{t("no_tasks_today")}</div>
                </div>
              )}
              {filterDate && tasks.filter(tk=>tk.due===filterDate).length===0 && (
                <div style={{ textAlign:"center", padding:"60px 0", color:"#C0B8CC" }}>
                  <div style={{ fontSize:40 }}>🗓</div>
                  <div style={{ marginTop:8, fontSize:14, fontWeight:700 }}>{t("no_tasks_day")}</div>
                </div>
              )}
            </div>
          )}
          {tab==="checklist" && (
            <div>
              <div style={{ fontSize:12, color:"#B0A8C8", marginBottom:14, fontWeight:700 }}>{t("cl_subtitle")}</div>
              {cCats.length===0 ? (
                <div style={{ textAlign:"center", padding:"40px 0", color:"#C0B8CC" }}>
                  <div style={{ fontSize:36 }}>📂</div>
                  <div style={{ marginTop:8, fontSize:14, fontWeight:700 }}>{t("no_cats_yet")}</div>
                </div>
              ) : (
                cCats.map(cat=>{ const items=clItems.filter(c=>c.clCatId===cat.id); return <CategoryCard key={cat.id} cat={cat} items={items} isTask={false} onToggleItem={toggleCl} onDeleteItem={deleteCl} onAdd={()=>{ setFCl({title:"",clCatId:cat.id,repeat:"daily"}); setMAddCl(true); }} t={t}/>; })
              )}
              <button onClick={()=>setMAddCCat(true)} style={{ width:"100%", padding:"12px", borderRadius:16, border:"2px dashed #D8D0EC", background:"transparent", color:"#C0B8CC", fontWeight:800, cursor:"pointer", fontFamily:"inherit", fontSize:13 }}>{t("add_cat")}</button>
            </div>
          )}
          {tab==="calendar" && <div style={{ border:"1px solid #E4E2EA" }}><CalendarView tasks={tasks} taskCats={tCats} onSelectDay={jumpToDay} todayKey={todayStr} selectedDate={filterDate} t={t}/></div>}
          {tab==="settings" && (
            <div>
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:20 }}>
                <span style={{ fontSize:12, fontWeight:700, color:"#B0A8C8", letterSpacing:0.5 }}>{t("sec_lang")}</span>
                <div style={{ display:"flex", gap:6 }}>
                  {["ja","en"].map(l=>(
                    <button key={l} onClick={()=>{
                      setLang(l);
                      const names = CAT_NAMES[l];
                      const items = ITEM_NAMES[l];
                      setTCats(cs => cs.map(c => names[c.id] ? {...c, name:names[c.id]} : c));
                      setCCats(cs => cs.map(c => names[c.id] ? {...c, name:names[c.id]} : c));
                      setTasks(ts => ts.map(t => items[t.id] ? {...t, title:items[t.id]} : t));
                      setClItems(cs => cs.map(c => items[c.id] ? {...c, title:items[c.id]} : c));
                    }} style={{ padding:"4px 12px", borderRadius:20, border: lang===l ? "none" : "1px solid #E0DCF0", background: lang===l ? "#7472A8" : "transparent", color: lang===l ? "#fff" : "#C0B8CC", fontWeight:700, fontSize:12, cursor:"pointer", fontFamily:"inherit", transition:"all 0.15s" }}>
                      {l==="ja" ? "🇯🇵 JP" : "🇺🇸 EN"}
                    </button>
                  ))}
                </div>
              </div>
              <SectionHead>{t("sec_notif")}</SectionHead>
              <div style={{ background:"#FFFCF8", borderRadius:14, padding:"12px 16px", marginBottom:20, boxShadow:"0 1px 4px #0F0E2A0a", display:"flex", alignItems:"center", gap:12 }}>
                <span style={{ fontSize:24 }}>🔔</span>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:13, fontWeight:800, color:"#0F0E2A" }}>{t("notif_title")}</div>
                  <div style={{ fontSize:11, color:"#B0A8C8", marginTop:2 }}>
                    {notifPerm==="denied" ? t("notif_denied")
                      : notifPerm==="granted" && notifEnabled ? t("notif_granted")
                      : notifPerm==="granted" && !notifEnabled ? t("notif_off")
                      : t("notif_default")}
                  </div>
                </div>
                {notifPerm==="default" && (
                  <button onClick={()=>{ Notification.requestPermission().then(p=>{ setNotifPerm(p); if(p==="granted") setNotifEnabled(true); }); }} style={{ padding:"7px 14px", borderRadius:20, border:"none", background:"linear-gradient(135deg,#7c6ef4,#A29BFE)", color:"#fff", fontWeight:800, fontSize:12, cursor:"pointer", fontFamily:"inherit", whiteSpace:"nowrap" }}>{t("btn_allow")}</button>
                )}
                {notifPerm==="granted" && (
                  <button onClick={()=>setNotifEnabled(v=>!v)} style={{ padding:"7px 14px", borderRadius:20, border:"none", background: notifEnabled ? "#E8F5E9" : "#F3EFF8", color: notifEnabled ? "#388E3C" : "#B0A8C8", fontWeight:800, fontSize:12, cursor:"pointer", fontFamily:"inherit", whiteSpace:"nowrap" }}>
                    {notifEnabled ? "✅ ON" : "🔕 OFF"}
                  </button>
                )}
              </div>
              <SectionHead>{t("sec_task_cats")}</SectionHead>
              <div style={{ fontSize:11, color:"#C0B8CC", fontWeight:700, marginBottom:10, display:"flex", alignItems:"center", gap:4 }}><span>⠿</span><span>{t("drag_hint")}</span></div>
              <SortableCatList cats={tCats} onReorder={setTCats} onEdit={openEditCat} onDelete={id=>setTCats(cs=>cs.filter(c=>c.id!==id))} t={t}/>
              <DashedAdd onClick={()=>setMAddTCat(true)} label={t("add_cat")}/>
              <SectionHead style={{marginTop:24}}>{t("sec_cl_cats")}</SectionHead>
              <div style={{ fontSize:11, color:"#C0B8CC", fontWeight:700, marginBottom:10, display:"flex", alignItems:"center", gap:4 }}><span>⠿</span><span>{t("drag_hint")}</span></div>
              <SortableCatList cats={cCats} onReorder={setCCats} onEdit={cat=>openEditCat(cat,"cl")} onDelete={id=>setCCats(cs=>cs.filter(c=>c.id!==id))} t={t}/>
              <DashedAdd onClick={()=>setMAddCCat(true)} label={t("add_cat")}/>
              <div style={{ marginTop:24, borderTop:"1px solid #F0ECF8", paddingTop:16, display:"flex", flexDirection:"column", alignItems:"center", gap:12 }}>
                <button onClick={()=>{
                  if(!window.confirm(t("confirm_reset"))) return;
                  const d = DEFAULTS[lang] || DEFAULTS.ja;
                  setTasks(d.tasks); setClItems(d.clItems); setTCats(d.tCats); setCCats(d.cCats);
                }} style={{ padding:"6px 16px", borderRadius:20, border:"1px solid #FFD0D0", background:"transparent", color:"#FFB0B0", fontWeight:700, cursor:"pointer", fontFamily:"inherit", fontSize:11 }}>
                  {t("btn_reset")}
                </button>
                <a href="/privacy.html" target="_blank" rel="noopener noreferrer" style={{ fontSize:11, color:"#B0A8C8", textDecoration:"none", letterSpacing:0.3 }}>
                  {lang==="en" ? "Privacy Policy" : "プライバシーポリシー"}
                </a>
              </div>
            </div>
          )}
        </div>

        {/* BOTTOM NAV */}
        <div style={{ flexShrink:0, background:"rgba(255,252,248,0.95)", borderTop:"1px solid #EDE8F8", display:"flex", zIndex:50, backdropFilter:"blur(12px)", paddingBottom:"env(safe-area-inset-bottom,0px)" }}>
          {NAV.map(n=>{ const active=tab===n.id; return (
            <button key={n.id} onClick={()=>setTab(n.id)} style={{ flex:1, padding:"11px 0 8px", border:"none", background:"none", cursor:"pointer", display:"flex", flexDirection:"column", alignItems:"center", gap:1 }}>
              <span style={{ fontSize:22, filter:active?"none":"grayscale(0.2) opacity(0.85)" }}>{n.icon}</span>
              <span style={{ fontSize:9, fontWeight:active?900:600, color:active?"#7472A8":"#6B6480", letterSpacing:0.5 }}>{n.label}</span>
              {active && <div style={{ width:22, height:3, borderRadius:3, background:"#7472A8", marginTop:2 }}/>}
            </button>
          ); })}
        </div>
      </div>

      {/* MODALS */}
      {mAddTask && (()=>{
        const lockedCat = filterCat!=="all" ? tCats.find(c=>c.id===filterCat) : null;
        const accent = lockedCat ? lockedCat.color : "#7c6ef4";
        return (
          <Modal title={lockedCat ? t("modal_locked_cat")(lockedCat.emoji, lockedCat.name) : t("modal_add_task")} accent={accent} onClose={()=>setMAddTask(false)}>
            <label style={lS}>{t("lbl_task_name")}</label>
            <input style={iS} placeholder={t("ph_task")} value={fTask.title} onChange={e=>setFTask(v=>({...v,title:e.target.value}))} onKeyDown={e=>e.key==="Enter"&&addTask()} autoFocus/>
            {lockedCat ? (
              <div style={{ marginTop:14, display:"flex", alignItems:"center", gap:8, padding:"8px 12px", borderRadius:12, background:lockedCat.color+"15" }}>
                <div style={{ width:10, height:10, borderRadius:"50%", background:lockedCat.color }}/>
                <span style={{ fontSize:13, fontWeight:800, color:lockedCat.color }}>{lockedCat.emoji} {lockedCat.name}</span>
                <span style={{ fontSize:11, color:"#C0B8CC", marginLeft:2 }}>{t("auto_set")}</span>
              </div>
            ) : (
              <><label style={lS}>{t("lbl_category")}</label><select style={iS} value={fTask.catId} onChange={e=>setFTask(v=>({...v,catId:e.target.value}))}>{tCats.map(c=><option key={c.id} value={c.id}>{c.emoji} {c.name}</option>)}</select></>
            )}
            <label style={lS}>{t("lbl_due")}</label>
            <input style={iS} type="date" value={fTask.due} onChange={e=>setFTask(v=>({...v,due:e.target.value}))}/>
            <button onClick={addTask} style={bP(accent)}>{t("btn_add_item")}</button>
          </Modal>
        );
      })()}
      {mEditT && (
        <Modal title={t("modal_edit_task")} accent="#48CAE4" onClose={()=>setMEditT(null)}>
          <label style={lS}>{t("lbl_task_name")}</label>
          <input style={iS} value={mEditT.title} onChange={e=>setMEditT(v=>({...v,title:e.target.value}))} autoFocus/>
          <label style={lS}>{t("lbl_category")}</label>
          <select style={iS} value={mEditT.catId} onChange={e=>setMEditT(v=>({...v,catId:e.target.value}))}>{tCats.map(c=><option key={c.id} value={c.id}>{c.emoji} {c.name}</option>)}</select>
          <label style={lS}>{t("lbl_due")}</label>
          <input style={iS} type="date" value={mEditT.due||""} onChange={e=>setMEditT(v=>({...v,due:e.target.value}))}/>
          <button onClick={saveEditTask} style={bP("#48CAE4")}>{t("btn_save")}</button>
        </Modal>
      )}
      {mAddCl && (
        <Modal title={t("modal_add_cl")} accent="#FF9F43" onClose={()=>setMAddCl(false)}>
          <label style={lS}>{t("lbl_item_name")}</label>
          <input style={iS} placeholder={t("ph_item")} value={fCl.title} onChange={e=>setFCl(v=>({...v,title:e.target.value}))} onKeyDown={e=>e.key==="Enter"&&addCl()} autoFocus/>
          <label style={lS}>{t("lbl_category")}</label>
          <select style={iS} value={fCl.clCatId} onChange={e=>setFCl(v=>({...v,clCatId:e.target.value}))}>{cCats.map(c=><option key={c.id} value={c.id}>{c.emoji} {c.name}</option>)}</select>
          <label style={lS}>{t("lbl_repeat")}</label>
          <div style={{ display:"flex", gap:8, marginTop:6 }}>
            {["daily","once"].map(r=>(
              <button key={r} onClick={()=>setFCl(v=>({...v,repeat:r}))} style={{ flex:1, padding:"10px", borderRadius:12, border: fCl.repeat===r ? "none" : "1.5px solid #E0DCF0", background: fCl.repeat===r ? (r==="daily"?"#EEF2FF":"#F3EFF8") : "transparent", color: fCl.repeat===r ? (r==="daily"?"#5472C8":"#9B8FC8") : "#C0B8CC", fontWeight:800, fontSize:13, cursor:"pointer", fontFamily:"inherit", transition:"all 0.15s" }}>
                {r==="daily" ? "🔄 "+t("repeat_daily") : "1️⃣ "+t("repeat_once")}
              </button>
            ))}
          </div>
          <button onClick={addCl} style={bP("#FF9F43")}>{t("btn_add_item")}</button>
        </Modal>
      )}
      {mAddTCat && (
        <Modal title={t("modal_add_tcat")} accent="#7c6ef4" onClose={()=>setMAddTCat(false)}>
          <label style={lS}>{t("lbl_cat_name")}</label>
          <input style={iS} placeholder={t("ph_cat")} value={fTCat.name} onChange={e=>setFTCat(v=>({...v,name:e.target.value}))} autoFocus/>
          <label style={lS}>{t("lbl_emoji")}</label>
          <input style={iS} placeholder={t("ph_emoji_task")} value={fTCat.emoji} onChange={e=>setFTCat(v=>({...v,emoji:e.target.value}))}/>
          <label style={lS}>{t("lbl_color")}</label>
          <ColorPicker selected={fTCat.color} onSelect={c=>setFTCat(v=>({...v,color:c}))} t={t}/>
          <button onClick={addTCat} style={bP(fTCat.color)}>{t("btn_add_item")}</button>
        </Modal>
      )}
      {mAddCCat && (
        <Modal title={t("modal_add_ccat")} accent="#FF9F43" onClose={()=>setMAddCCat(false)}>
          <label style={lS}>{t("lbl_cat_name")}</label>
          <input style={iS} placeholder={t("ph_ccat")} value={fCCat.name} onChange={e=>setFCCat(v=>({...v,name:e.target.value}))} autoFocus/>
          <label style={lS}>{t("lbl_emoji")}</label>
          <input style={iS} placeholder={t("ph_emoji_ccat")} value={fCCat.emoji} onChange={e=>setFCCat(v=>({...v,emoji:e.target.value}))}/>
          <label style={lS}>{t("lbl_color")}</label>
          <ColorPicker selected={fCCat.color} onSelect={c=>setFCCat(v=>({...v,color:c}))} t={t}/>
          <button onClick={addCCat} style={bP(fCCat.color)}>{t("btn_add_item")}</button>
        </Modal>
      )}
      {mEditCat && (
        <Modal title={t("modal_edit_cat")} accent={fECat.color} onClose={()=>setMEditCat(null)}>
          <label style={lS}>{t("lbl_cat_name")}</label>
          <input style={iS} value={fECat.name} onChange={e=>setFECat(v=>({...v,name:e.target.value}))} autoFocus/>
          <label style={lS}>{t("lbl_emoji")}</label>
          <input style={iS} value={fECat.emoji} onChange={e=>setFECat(v=>({...v,emoji:e.target.value}))}/>
          <label style={lS}>{t("lbl_color")}</label>
          <ColorPicker selected={fECat.color} onSelect={c=>setFECat(v=>({...v,color:c}))} t={t}/>
          <button onClick={saveEditCat} style={bP(fECat.color)}>{t("btn_save")}</button>
        </Modal>
      )}
    </div>
  );
}

function SortableCatList({ cats, onReorder, onEdit, onDelete, t }) {
  const [dragIdx, setDragIdx] = useState(null);
  const [overIdx, setOverIdx] = useState(null);
  const state    = useRef({ dragIdx:null, overIdx:null, cats:[] });
  const itemRefs = useRef([]);
  const gripRefs = useRef([]);
  state.current.cats = cats;

  useEffect(() => {
    const handlers = [];
    gripRefs.current.forEach((el, i) => {
      if (!el) return;
      const onTouchStart = () => { state.current.dragIdx=i; setDragIdx(i); };
      const onTouchMove = (e) => {
        e.preventDefault();
        const y = e.touches[0].clientY;
        let found = null;
        itemRefs.current.forEach((row, j) => { if(!row) return; const r=row.getBoundingClientRect(); if(y>=r.top&&y<=r.bottom) found=j; });
        if(found!==null&&found!==state.current.dragIdx) { state.current.overIdx=found; setOverIdx(found); }
      };
      const onTouchEnd = () => {
        const from=state.current.dragIdx, to=state.current.overIdx;
        if(from!==null&&to!==null&&from!==to) { const next=[...state.current.cats]; const [moved]=next.splice(from,1); next.splice(to,0,moved); onReorder(next); }
        state.current.dragIdx=null; state.current.overIdx=null; setDragIdx(null); setOverIdx(null);
      };
      el.addEventListener("touchstart",  onTouchStart, { passive:true  });
      el.addEventListener("touchmove",   onTouchMove,  { passive:false });
      el.addEventListener("touchend",    onTouchEnd,   { passive:true  });
      handlers.push({ el, onTouchStart, onTouchMove, onTouchEnd });
    });
    return () => { handlers.forEach(({ el, onTouchStart, onTouchMove, onTouchEnd }) => { el.removeEventListener("touchstart",onTouchStart); el.removeEventListener("touchmove",onTouchMove); el.removeEventListener("touchend",onTouchEnd); }); };
  }, [cats.length]);

  const onDragStart = (e, i) => { e.dataTransfer.effectAllowed="move"; setDragIdx(i); state.current.dragIdx=i; };
  const onDragOver  = (e, i) => { e.preventDefault(); if(i!==state.current.dragIdx){ setOverIdx(i); state.current.overIdx=i; }};
  const onDrop      = (e, i) => { e.preventDefault(); const from=state.current.dragIdx; if(from===null||from===i) return; const next=[...cats]; const [m]=next.splice(from,1); next.splice(i,0,m); onReorder(next); setDragIdx(null); setOverIdx(null); };
  const onDragEnd   = () => { setDragIdx(null); setOverIdx(null); state.current.dragIdx=null; state.current.overIdx=null; };

  return (
    <div>
      {cats.map((cat, i) => (
        <div key={cat.id} ref={el => itemRefs.current[i] = el}>
          <div style={{ height:overIdx===i&&dragIdx!==null&&dragIdx!==i?3:0, borderRadius:2, background:"#7472A8", marginBottom:overIdx===i&&dragIdx!==null&&dragIdx!==i?5:0, transition:"height 0.1s", overflow:"hidden" }}/>
          <SettingRow cat={cat} isDragging={dragIdx===i} isOver={overIdx===i&&dragIdx!==i} gripRef={el=>gripRefs.current[i]=el} onEdit={()=>onEdit(cat)} onDelete={()=>onDelete(cat.id)} onDragStart={e=>onDragStart(e,i)} onDragOver={e=>onDragOver(e,i)} onDrop={e=>onDrop(e,i)} onDragEnd={onDragEnd} t={t}/>
        </div>
      ))}
    </div>
  );
}

function SectionHead({ children, style={} }) {
  return <div style={{ fontWeight:900, fontSize:14, color:"#0F0E2A", marginBottom:10, ...style }}>{children}</div>;
}
function SettingRow({ cat, onEdit, onDelete, onDragStart, onDragOver, onDrop, onDragEnd, gripRef, isDragging, isOver, t }) {
  return (
    <div onDragOver={onDragOver} onDrop={onDrop} style={{ display:"flex", alignItems:"center", gap:10, background:isOver?"#F0ECFF":"#FFFCF8", padding:"10px 14px", borderRadius:14, marginBottom:8, borderLeft:`4px solid ${cat.color}`, boxShadow:isDragging?"0 8px 24px #0F0E2A22":"0 1px 4px #0F0E2A0a", opacity:isDragging?0.35:1, transform:isDragging?"scale(1.03) rotate(1deg)":"scale(1)", transition:"box-shadow 0.15s, opacity 0.15s, transform 0.15s, background 0.1s", userSelect:"none" }}>
      <span ref={gripRef} draggable onDragStart={onDragStart} onDragEnd={onDragEnd} style={{ display:"flex", flexDirection:"column", gap:3, padding:"6px 8px", flexShrink:0, cursor:isDragging?"grabbing":"grab", touchAction:"none", borderRadius:6, background:isDragging?"#EDE8F8":"transparent" }}>
        {[0,1,2].map(r=><span key={r} style={{ display:"flex", gap:3 }}><span style={{ width:3,height:3,borderRadius:"50%",background:"#B0A8C8",display:"inline-block" }}/><span style={{ width:3,height:3,borderRadius:"50%",background:"#B0A8C8",display:"inline-block" }}/></span>)}
      </span>
      <span style={{ fontSize:18 }}>{cat.emoji}</span>
      <div style={{ width:12,height:12,borderRadius:"50%",background:cat.color,flexShrink:0 }}/>
      <span style={{ flex:1,fontSize:14,fontWeight:700,color:"#0F0E2A" }}>{cat.name}</span>
      <button onClick={e=>{ e.stopPropagation(); onEdit(); }} style={{ background:"none",border:"1px solid #E0DCF0",borderRadius:6,cursor:"pointer",fontSize:11,padding:"3px 8px",color:"#9B8FC8",fontWeight:700,fontFamily:"inherit" }}>{t("btn_edit")}</button>
      <button onClick={e=>{ e.stopPropagation(); onDelete(); }} style={{ background:"none",border:"1px solid #FFE0E0",borderRadius:6,cursor:"pointer",fontSize:11,padding:"3px 8px",color:"#FF8080",fontWeight:700,fontFamily:"inherit" }}>{t("btn_delete")}</button>
    </div>
  );
}
function DashedAdd({ onClick, label }) {
  return <button onClick={onClick} style={{ width:"100%", padding:"11px", borderRadius:14, border:"2px dashed #D8D0EC", background:"transparent", color:"#C0B8CC", fontWeight:800, cursor:"pointer", fontFamily:"inherit", fontSize:13, marginTop:4 }}>{label}</button>;
}
