import { CalendarDays, Kanban, LayoutList, Search } from 'lucide-react'
import type { JSX } from 'react'
import type { MockupKind } from '../../data/profile'

/**
 * Lightweight, pure-CSS Odoo-style screens (no images → fast, crisp at any size).
 * Decorative only: hidden from assistive tech.
 */

const crumbs: Record<MockupKind, string> = {
  calendar: 'Appointments / Calendar',
  migration: 'Database Upgrade / Migration',
  bidding: 'Transport / Bids',
  list: 'Inventory / Transfers',
  chart: 'Employees / Analysis',
  documents: 'Company Documents',
  approval: 'Expenses / EXP-0118',
  website: 'Website / Portal',
}

const bar = 'rounded-full bg-white/15'

function Calendar() {
  const ev: Record<number, [string, string]> = {
    1: ['bg-blue-500/60', '09:00'],
    3: ['bg-indigo-500/50', '10:30'],
    7: ['bg-sky-500/50', '11:00'],
    9: ['bg-blue-500/60', '14:00'],
    12: ['bg-emerald-500/50', '15:30'],
    16: ['bg-indigo-500/50', '09:30'],
    18: ['bg-blue-500/60', '16:00'],
  }
  return (
    <div className="grid grid-cols-5 gap-1">
      {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((d) => (
        <div key={d} className="pb-1 text-center text-[8px] text-white/40">
          {d}
        </div>
      ))}
      {Array.from({ length: 20 }).map((_, i) => (
        <div key={i} className="h-7 rounded-md border border-white/5 bg-white/[0.02] p-0.5">
          {ev[i] && (
            <div className={`h-full rounded-[4px] ${ev[i][0]} px-1 text-[7px] leading-[1.4] text-white/90`}>
              {ev[i][1]}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

function Migration() {
  const mods = [
    { t: 'Accounting', v: 100 },
    { t: 'HR & Payroll', v: 100 },
    { t: 'Building Mgmt', v: 82 },
    { t: 'PDF / Excel Reports', v: 64 },
  ]
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-center gap-2 text-[8px]">
        <span className="rounded border border-white/10 bg-white/5 px-2 py-1 text-white/60">OpenERP DB</span>
        <span className="text-blue-300">→ → →</span>
        <span className="rounded border border-blue-400/40 bg-blue-500/20 px-2 py-1 text-white">Odoo DB</span>
      </div>
      <div className="space-y-1.5 rounded-md border border-white/8 bg-white/[0.03] p-2">
        {mods.map((m) => (
          <div key={m.t} className="space-y-0.5">
            <div className="flex justify-between text-[7px] text-white/60">
              {m.t}
              <span className={m.v === 100 ? 'text-emerald-300' : 'text-blue-300'}>{m.v === 100 ? '✓ done' : `${m.v}%`}</span>
            </div>
            <div className="h-1 rounded-full bg-white/10">
              <div
                className={`h-full rounded-full ${m.v === 100 ? 'bg-emerald-400' : 'bg-blue-400'}`}
                style={{ width: `${m.v}%` }}
              />
            </div>
          </div>
        ))}
      </div>
      <p className="text-center text-[7px] text-white/40">Integrity check: 0 mismatched records</p>
    </div>
  )
}

function Bidding() {
  const cols = [
    { t: 'Open', c: 'bg-blue-400', bids: ['AED 1,450', 'AED 980'] },
    { t: 'Bidding', c: 'bg-amber-400', bids: ['AED 2,100', 'AED 1,320'] },
    { t: 'Awarded', c: 'bg-emerald-400', bids: ['AED 1,750'] },
  ]
  return (
    <div className="grid grid-cols-3 gap-2">
      {cols.map((c) => (
        <div key={c.t} className="space-y-1.5">
          <div className="flex items-center justify-between text-[8px] text-white/60">
            {c.t} <span className="text-white/30">{c.bids.length}</span>
          </div>
          <div className={`h-0.5 rounded ${c.c}`} />
          {c.bids.map((b) => (
            <div key={b} className="space-y-1 rounded-md border border-white/8 bg-white/[0.04] p-1.5">
              <div className="flex items-center gap-1">
                <span className="size-3 rounded bg-gradient-to-br from-blue-300 to-blue-600" />
                <span className={`h-1 w-8 ${bar}`} />
              </div>
              <span className="block text-[7px] text-white/70 tabular-nums">{b}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

function List() {
  const st = [
    ['Ready', 'bg-emerald-400/20 text-emerald-300'],
    ['Waiting', 'bg-amber-400/20 text-amber-300'],
    ['Done', 'bg-white/10 text-white/60'],
    ['Ready', 'bg-emerald-400/20 text-emerald-300'],
    ['Draft', 'bg-sky-400/20 text-sky-300'],
  ]
  return (
    <div className="overflow-hidden rounded-md border border-white/8 text-[7.5px]">
      <div className="grid grid-cols-[1.2fr_1fr_0.8fr] bg-white/[0.05] px-2 py-1 text-white/50">
        <span>Reference</span>
        <span>Lot / Serial</span>
        <span className="text-right">Status</span>
      </div>
      {st.map(([s, c], i) => (
        <div
          key={i}
          className="grid grid-cols-[1.2fr_1fr_0.8fr] items-center border-t border-white/5 px-2 py-1 text-white/70"
        >
          <span>WH/OUT/000{i + 31}</span>
          <span className="text-white/40">LOT-{820 + i * 7}</span>
          <span className="text-right">
            <span className={`rounded-full px-1.5 py-px ${c}`}>{s}</span>
          </span>
        </div>
      ))}
    </div>
  )
}

function Chart() {
  const h = [40, 65, 50, 80, 60, 90, 72]
  return (
    <div className="grid grid-cols-[1fr_0.7fr] gap-2">
      <div className="flex h-[92px] items-end gap-1 rounded-md border border-white/8 bg-white/[0.03] p-2">
        {h.map((v, i) => (
          <div
            key={i}
            className="flex-1 rounded-t-sm bg-gradient-to-t from-blue-700 to-blue-400"
            style={{ height: `${v}%`, opacity: 0.55 + i * 0.06 }}
          />
        ))}
      </div>
      <div className="space-y-1.5">
        {[
          ['Present', '92%', 'text-emerald-300'],
          ['On leave', '5%', 'text-amber-300'],
          ['Remote', '3%', 'text-sky-300'],
        ].map(([l, v, c]) => (
          <div key={l} className="rounded-md border border-white/8 bg-white/[0.03] px-2 py-1">
            <p className="text-[7px] text-white/45">{l}</p>
            <p className={`text-[10px] font-semibold ${c}`}>{v}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function Documents() {
  const docs = [
    ['Trade License', 'Valid', 'bg-emerald-400/20 text-emerald-300'],
    ['Establishment Card', 'Expires in 12d', 'bg-amber-400/20 text-amber-300'],
    ['VAT Certificate', 'Valid', 'bg-emerald-400/20 text-emerald-300'],
    ['Tenancy Contract', 'Expired', 'bg-rose-400/20 text-rose-300'],
  ]
  return (
    <div className="grid grid-cols-2 gap-1.5">
      {docs.map(([n, s, c]) => (
        <div key={n} className="rounded-md border border-white/8 bg-white/[0.04] p-1.5">
          <div className="mb-1 h-5 rounded bg-gradient-to-br from-blue-500/30 to-transparent" />
          <p className="truncate text-[7.5px] text-white/80">{n}</p>
          <span className={`mt-0.5 inline-block rounded-full px-1.5 py-px text-[6.5px] ${c}`}>{s}</span>
        </div>
      ))}
    </div>
  )
}

function Approval() {
  const steps = [
    ['Submitted', 'done'],
    ['Manager', 'done'],
    ['Finance', 'current'],
    ['Paid', 'todo'],
  ] as const
  return (
    <div className="space-y-3">
      <div className="flex items-center">
        {steps.map(([s, state], i) => (
          <div key={s} className="flex flex-1 items-center last:flex-none">
            <div className="flex flex-col items-center gap-1">
              <span
                className={`grid size-4 place-items-center rounded-full text-[7px] ${
                  state === 'done'
                    ? 'bg-blue-500 text-white'
                    : state === 'current'
                      ? 'border border-blue-400 bg-blue-500/20 text-blue-200 shadow-[0_0_10px_rgb(139_92_246)]'
                      : 'border border-white/15 text-white/30'
                }`}
              >
                {state === 'done' ? '✓' : i + 1}
              </span>
              <span className="text-[7px] text-white/50">{s}</span>
            </div>
            {i < steps.length - 1 && (
              <span className={`mx-1 mb-3 h-px flex-1 ${state === 'done' ? 'bg-blue-400' : 'bg-white/10'}`} />
            )}
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between rounded-md border border-white/8 bg-white/[0.03] p-2">
        <div>
          <p className="text-[7px] text-white/40">Amount</p>
          <p className="text-[11px] font-semibold">AED 4,850.00</p>
        </div>
        <div className="flex gap-1">
          <span className="rounded bg-emerald-500/70 px-1.5 py-0.5 text-[7px]">Approve</span>
          <span className="rounded bg-white/10 px-1.5 py-0.5 text-[7px] text-white/70">Refuse</span>
        </div>
      </div>
    </div>
  )
}

function Website() {
  return (
    <div className="overflow-hidden rounded-md border border-white/8 bg-white/[0.03]">
      <div className="flex items-center justify-between border-b border-white/5 px-2 py-1">
        <span className="h-1.5 w-8 rounded-full bg-blue-400/70" />
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <span key={i} className={`h-1 w-5 ${bar}`} />
          ))}
          <span className="rounded bg-blue-500/80 px-1 text-[6px]">Portal</span>
        </div>
      </div>
      <div className="grid grid-cols-[1.2fr_1fr] gap-2 p-2">
        <div className="space-y-1">
          <span className="block h-2 w-4/5 rounded-full bg-white/30" />
          <span className="block h-2 w-3/5 rounded-full bg-white/20" />
          <span className={`block h-1 w-full ${bar} opacity-60`} />
          <span className="mt-1 inline-block rounded bg-blue-500/80 px-1.5 py-0.5 text-[6px]">Get started</span>
        </div>
        <div className="h-12 rounded bg-gradient-to-br from-blue-500/40 via-indigo-500/20 to-transparent" />
      </div>
      <div className="grid grid-cols-3 gap-1 px-2 pb-2">
        {['My Orders', 'Invoices', 'Tickets'].map((t) => (
          <div key={t} className="rounded border border-white/8 bg-white/[0.03] p-1 text-[6.5px] text-white/60">
            {t}
          </div>
        ))}
      </div>
    </div>
  )
}

const views: Record<MockupKind, () => JSX.Element> = {
  calendar: Calendar,
  migration: Migration,
  bidding: Bidding,
  list: List,
  chart: Chart,
  documents: Documents,
  approval: Approval,
  website: Website,
}

const viewIcon: Partial<Record<MockupKind, typeof Kanban>> = {
  calendar: CalendarDays,
  bidding: Kanban,
  list: LayoutList,
}

export function ProjectMockup({ kind }: { kind: MockupKind }) {
  const View = views[kind]
  const VIcon = viewIcon[kind] ?? LayoutList
  return (
    <div aria-hidden className="overflow-hidden rounded-xl border border-white/10 bg-[#0b0c12] shadow-2xl">
      {/* app bar */}
      <div className="flex items-center gap-2 border-b border-white/5 bg-white/[0.03] px-3 py-1.5">
        <div className="flex gap-1">
          <span className="size-1.5 rounded-full bg-rose-400/70" />
          <span className="size-1.5 rounded-full bg-amber-400/70" />
          <span className="size-1.5 rounded-full bg-emerald-400/70" />
        </div>
        <span className="truncate text-[8px] text-white/45">{crumbs[kind]}</span>
      </div>
      {/* control panel */}
      <div className="flex items-center justify-between gap-2 px-3 pt-2 pb-1.5">
        <span className="rounded bg-blue-500/80 px-1.5 py-0.5 text-[7px] font-medium">New</span>
        <div className="flex flex-1 items-center gap-1 rounded border border-white/8 bg-white/[0.03] px-1.5 py-0.5 text-[7px] text-white/30">
          <Search className="size-2" /> Search…
        </div>
        <VIcon className="size-2.5 text-white/40" />
      </div>
      <div className="px-3 pb-3">
        <View />
      </div>
    </div>
  )
}
