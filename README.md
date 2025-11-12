## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
## Program structure
E-Learning Platform/
├── public/
│   ├── favicon.ico
│   ├── placeholder.svg
│   └── robots.txt
│
├── src/
│   ├── assets/
│   │   ├── farming-business.jpg
│   │   ├── hero-farming.jpg
│   │   ├── irrigation-tech.jpg
│   │   └── soil-health.jpg
│   │
│   ├── components/
│   │   ├── ui/
│   │   │   ├── accordion.tsx
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   └── ... (other UI components)
│   │   ├── Footer.tsx
│   │   ├── Navigation.tsx
│   │   └── NavLink.tsx
│   │
│   ├── hooks/
│   │   ├── use-mobile.tsx
│   │   └── use-toast.ts
│   │
│   ├── integrations/
│   │   └── supabase/
│   │       ├── client.ts
│   │       └── types.ts
│   │
│   ├── lib/
│   │   └── utils.ts
│   │
│   ├── pages/
│   │   ├── Auth.tsx
│   │   ├── Dashboard.tsx
│   │   ├── Home.tsx
│   │   ├── LessonDetail.tsx
│   │   ├── Lessons.tsx
│   │   ├── Support.tsx
│   │   └── NotFound.tsx
│   │
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
│   └── vite-env.d.ts
│
├── supabase/
│   ├── migrations/
│   └── config.toml
│
├── .gitignore
├── .env.example
├── API_DOCUMENTATION.md
├── components.json
├── eslint.config.js
├── index.html
├── package.json
├── postcss.config.js
├── README.md
├── tailwind.config.ts
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts


