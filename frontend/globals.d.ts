// globals.d.ts - Type declarations for CSS imports

// For global CSS (side-effect imports like import './globals.css')
declare module '*.css';

// Optional: If you ever use CSS Modules (.module.css)
declare module '*.module.css' {
  const classes: { readonly [key: string]: string };
  export default classes;
}