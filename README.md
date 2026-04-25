# hsg-investment

Frontend en **React + Vite + TypeScript** con **React Router**, **TanStack React Query**, **Zod** y **Tailwind**.

## Requisitos

- Node.js (LTS recomendado)
- pnpm

## Instalación

```bash
pnpm install
```

## Variables de entorno

Este proyecto usa Vite: **cualquier variable que deba estar disponible en el navegador debe empezar con `VITE_`**.

Crea/actualiza `.env.local` (no se commitea) con:

```bash
VITE_SUPABASE_URL="https://<project-ref>.supabase.co"
VITE_SUPABASE_ANON_KEY="<public-anon-key>"
VITE_WHATSAPP_PHONE="<country-code><number>" # ej: 573001112233
```

Notas importantes:

- **No uses `SUPABASE_SERVICE_ROLE_KEY` (o equivalente) en frontend**. Esa key es secreta y debe vivir solo en backend/servidor.
- Si tus variables en `.env.local` no empiezan con `VITE_`, Vite **no** las inyectará en el bundle del cliente.

## Correr el proyecto

```bash
pnpm dev
```

## Idiomas

La landing es multilingüe por rutas:

- Español: `/es`
- English: `/en`

Build:

```bash
pnpm build
```

Preview del build:

```bash
pnpm preview
```

Lint:

```bash
pnpm lint
```

## Supabase (recomendado)

> Si aún no lo instalaste, agrega el SDK:
>
> ```bash
> pnpm add @supabase/supabase-js
> ```

### Cliente de Supabase

- Centraliza la creación del cliente (por ejemplo en `src/lib/supabase.ts`) leyendo `import.meta.env.VITE_SUPABASE_URL` y `import.meta.env.VITE_SUPABASE_ANON_KEY`.
- Evita recrear el cliente en cada render. Exporta una instancia singleton.

### Buenas prácticas de seguridad (clave)

- **RLS por defecto**: habilita Row Level Security en todas las tablas expuestas (especialmente en `public`) y define policies específicas.
- **No autorices con `user_metadata`**: no uses claims editables por el usuario para decisiones de autorización. Si usas JWT claims, guarda roles/permisos en `app_metadata` o (mejor) en tablas con RLS.
- **Vistas y RLS**: las vistas pueden **bypassear RLS por defecto** (depende de versión/config). Revisa `security_invoker`/permisos antes de exponer vistas al cliente.
- **UPDATE requiere SELECT policy** en RLS: si falta policy de `SELECT`, un `UPDATE` puede “no afectar filas” silenciosamente.

### Esquema y migraciones

Si este repo incluye (o va a incluir) cambios de base de datos:

- Crea migraciones con el CLI (`supabase migration new <nombre>`) y evita inventar nombres/formatos.
- Revisa advisors y checklist de seguridad cuando toques views/functions/triggers/storage.

## Convenciones sugeridas (frontend)

- **React Query**: modela accesos a datos como `queryKey` estables y separa “fetchers” (Supabase) de hooks (`useQuery`/`useMutation`).
- **Validación**: valida inputs/salidas críticas con **Zod** (sobre todo en formularios y transformaciones).
- **Rutas**: mantén routing en un solo lugar (e.g. `App.tsx`) y agrupa pantallas por feature cuando crezca (`src/features/<feature>/...`).

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
