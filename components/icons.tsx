import type React from "react"

export const Icons = {
  ArrowRight: ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  ),
  ArrowLeft: ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg>
  ),
  ChevronDown: ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 9l6 6 6-6" />
    </svg>
  ),
  ChevronRight: ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  ),
  Menu: ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  ),
  X: ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  ),
  Phone: ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
      />
    </svg>
  ),
  Mail: ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    </svg>
  ),
  MapPin: ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
      />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  Shield: ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
      />
    </svg>
  ),
  Leaf: ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
      />
    </svg>
  ),
  Award: ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
      <circle cx="12" cy="8" r="7" strokeWidth={2} />
      <polyline points="8.21,13.89 7,23 12,20 17,23 15.79,13.88" strokeWidth={2} />
    </svg>
  ),
  TreePine: ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 2L8 8h8l-4-6zM12 8L6 16h12L12 8zM12 16v6"
      />
    </svg>
  ),
  Wrench: ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"
      />
    </svg>
  ),
  Zap: ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
      <polygon points="13,2 3,14 12,14 11,22 21,10 12,10 13,2" strokeWidth={2} />
    </svg>
  ),
  Car: ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M7 17a2 2 0 11-4 0 2 2 0 014 0zM21 17a2 2 0 11-4 0 2 2 0 014 0zM5 17H3v-6l2-5h9l4 5v6h-2"
      />
    </svg>
  ),
  Users: ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75M13 7a4 4 0 11-8 0 4 4 0 018 0z"
      />
    </svg>
  ),
  Hammer: ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"
      />
    </svg>
  ),
  Star: ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
      <polygon
        points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26 12,2"
        strokeWidth={2}
      />
    </svg>
  ),
  Package: ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
      <line x1="16.5" y1="9.4" x2="7.5" y2="4.21" strokeWidth={2} />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"
      />
      <polyline points="3.27,6.96 12,12.01 20.73,6.96" strokeWidth={2} />
      <line x1="12" y1="22.08" x2="12" y2="12" strokeWidth={2} />
    </svg>
  ),
  Settings: ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
      <circle cx="12" cy="12" r="3" strokeWidth={2} />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"
      />
    </svg>
  ),
  Facebook: ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" {...props}>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  ),
  Instagram: ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" {...props}>
      <path d="M12.017 0C8.396 0 7.989.013 7.041.048 6.094.082 5.52.204 5.02.43a5.105 5.105 0 00-1.852 1.207 5.105 5.105 0 00-1.207 1.852C1.734 4.989 1.612 5.563 1.578 6.51.013 7.458 0 7.865 0 11.486v1.028c0 3.621.013 4.028.048 4.976.034.947.156 1.521.43 2.021a5.105 5.105 0 001.207 1.852 5.105 5.105 0 001.852 1.207c.5.226 1.074.348 2.021.43.948.035 1.355.048 4.976.048h1.028c3.621 0 4.028-.013 4.976-.048.947-.034 1.521-.156 2.021-.43a5.105 5.105 0 001.852-1.207 5.105 5.105 0 001.207-1.852c.226-.5.348-1.074.43-2.021.035-.948.048-1.355.048-4.976v-1.028c0-3.621-.013-4.028-.048-4.976-.034-.947-.156-1.521-.43-2.021a5.105 5.105 0 00-1.207-1.852A5.105 5.105 0 0018.994.478c-.5-.226-1.074-.348-2.021-.43C16.025.013 15.618 0 11.997 0h.02zm-.717 1.442h.718c3.136 0 3.506.012 4.741.066.78.028 1.204.166 1.486.275.374.145.64.318.92.598.28.28.453.546.598.92.109.282.247.706.275 1.486.054 1.235.066 1.605.066 4.741v.717c0 3.136-.012 3.506-.066 4.741-.028.78-.166 1.204-.275 1.486a2.477 2.477 0 01-.598.92c-.28.28-.546.453-.92.598-.282.109-.706.247-1.486.275-1.235.054-1.605.066-4.741.066h-.717c-3.136 0-3.506-.012-4.741-.066-.78-.028-1.204-.166-1.486-.275a2.477 2.477 0 01-.92-.598 2.477 2.477 0 01-.598-.92c-.109-.282-.247-.706-.275-1.486-.054-1.235-.066-1.605-.066-4.741v-.717c0-3.136.012-3.506.066-4.741.028-.78.166-1.204.275-1.486.145-.374.318-.64.598-.92.28-.28.546-.453.92-.598.282-.109.706-.247 1.486-.275 1.08-.049 1.497-.063 3.024-.066v.003zm5.974 1.348a.88.88 0 100 1.76.88.88 0 000-1.76zM5.838 12.017a6.179 6.179 0 1112.358 0 6.179 6.179 0 01-12.358 0zm1.442 0a4.737 4.737 0 109.474 0 4.737 4.737 0 00-9.474 0z" />
    </svg>
  ),
  Youtube: ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" {...props}>
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  ),
  Check: ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
      <polyline points="20,6 9,17 4,12" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
    </svg>
  ),
  Circle: ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" {...props}>
      <circle cx="12" cy="12" r="10" />
    </svg>
  ),
  User: ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
      <circle cx="12" cy="7" r="4" strokeWidth={2} />
    </svg>
  ),
  LogOut: ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"
      />
    </svg>
  ),
  LayoutDashboard: ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
      <rect x="3" y="3" width="7" height="9" strokeWidth={2} />
      <rect x="14" y="3" width="7" height="5" strokeWidth={2} />
      <rect x="14" y="12" width="7" height="9" strokeWidth={2} />
      <rect x="3" y="16" width="7" height="5" strokeWidth={2} />
    </svg>
  ),
  FolderOpen: ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
      />
    </svg>
  ),
  BarChart3: ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
      <line x1="12" y1="20" x2="12" y2="10" strokeWidth={2} />
      <line x1="18" y1="20" x2="18" y2="4" strokeWidth={2} />
      <line x1="6" y1="20" x2="6" y2="16" strokeWidth={2} />
    </svg>
  ),
  MessageSquare: ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"
      />
    </svg>
  ),
  TrendingUp: ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
      <polyline points="23,6 13.5,15.5 8.5,10.5 1,18" strokeWidth={2} />
      <polyline points="17,6 23,6 23,12" strokeWidth={2} />
    </svg>
  ),
  Calendar: ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" strokeWidth={2} />
      <line x1="16" y1="2" x2="16" y2="6" strokeWidth={2} />
      <line x1="8" y1="2" x2="8" y2="6" strokeWidth={2} />
      <line x1="3" y1="10" x2="21" y2="10" strokeWidth={2} />
    </svg>
  ),
  Edit: ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"
      />
    </svg>
  ),
  Trash2: ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
      <polyline points="3,6 5,6 21,6" strokeWidth={2} />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"
      />
      <line x1="10" y1="11" x2="10" y2="17" strokeWidth={2} />
      <line x1="14" y1="11" x2="14" y2="17" strokeWidth={2} />
    </svg>
  ),
  Plus: ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
      <line x1="12" y1="5" x2="12" y2="19" strokeWidth={2} />
      <line x1="5" y1="12" x2="19" y2="12" strokeWidth={2} />
    </svg>
  ),
  Search: ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
      <circle cx="11" cy="11" r="8" strokeWidth={2} />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35" />
    </svg>
  ),
  MoreHorizontal: ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
      <circle cx="12" cy="12" r="1" strokeWidth={2} />
      <circle cx="19" cy="12" r="1" strokeWidth={2} />
      <circle cx="5" cy="12" r="1" strokeWidth={2} />
    </svg>
  ),
  Minus: ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
      <line x1="5" y1="12" x2="19" y2="12" strokeWidth={2} />
    </svg>
  ),
  GripVertical: ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
      <circle cx="9" cy="12" r="1" strokeWidth={2} />
      <circle cx="9" cy="5" r="1" strokeWidth={2} />
      <circle cx="9" cy="19" r="1" strokeWidth={2} />
      <circle cx="15" cy="12" r="1" strokeWidth={2} />
      <circle cx="15" cy="5" r="1" strokeWidth={2} />
      <circle cx="15" cy="19" r="1" strokeWidth={2} />
    </svg>
  ),
  Clock: ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
      <circle cx="12" cy="12" r="10" strokeWidth={2} />
      <polyline points="12,6 12,12 16,14" strokeWidth={2} />
    </svg>
  ),
  ChevronLeft: ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
      <polyline points="15,18 9,12 15,6" strokeWidth={2} />
    </svg>
  ),
  Home: ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
      />
    </svg>
  ),
  Building: ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
      />
    </svg>
  ),
  Upload: ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
      />
    </svg>
  ),
  Paperclip: ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
      />
    </svg>
  ),
  Eye: ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
      />
      <circle cx="12" cy="12" r="3" strokeWidth={2} />
    </svg>
  ),
  Filter: ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
      <polygon points="22,3 2,3 10,12.46 10,19 14,21 14,12.46 22,3" strokeWidth={2} />
    </svg>
  ),
}

export const ArrowRight = Icons.ArrowRight
export const ArrowLeft = Icons.ArrowLeft
export const ChevronDown = Icons.ChevronDown
export const ChevronRight = Icons.ChevronRight
export const ChevronLeft = Icons.ChevronLeft
export const Menu = Icons.Menu
export const X = Icons.X
export const Phone = Icons.Phone
export const Mail = Icons.Mail
export const MapPin = Icons.MapPin
export const Shield = Icons.Shield
export const Leaf = Icons.Leaf
export const Award = Icons.Award
export const TreePine = Icons.TreePine
export const Wrench = Icons.Wrench
export const Zap = Icons.Zap
export const Car = Icons.Car
export const Users = Icons.Users
export const Hammer = Icons.Hammer
export const Star = Icons.Star
export const Package = Icons.Package
export const Settings = Icons.Settings
export const Facebook = Icons.Facebook
export const Instagram = Icons.Instagram
export const Youtube = Icons.Youtube
export const Check = Icons.Check
export const Circle = Icons.Circle
export const User = Icons.User
export const LogOut = Icons.LogOut
export const LayoutDashboard = Icons.LayoutDashboard
export const FolderOpen = Icons.FolderOpen
export const BarChart3 = Icons.BarChart3
export const MessageSquare = Icons.MessageSquare
export const TrendingUp = Icons.TrendingUp
export const Calendar = Icons.Calendar
export const Edit = Icons.Edit
export const Trash2 = Icons.Trash2
export const Plus = Icons.Plus
export const Search = Icons.Search
export const MoreHorizontal = Icons.MoreHorizontal
export const Minus = Icons.Minus
export const GripVertical = Icons.GripVertical
export const Clock = Icons.Clock
export const Home = Icons.Home
export const Building = Icons.Building
export const Upload = Icons.Upload
export const Paperclip = Icons.Paperclip
export const Eye = Icons.Eye
export const Filter = Icons.Filter
