// globals.d.ts
declare module '*.css' {
  const content: { [className: string]: string };
  export default content;
}

// Optional: if you also use CSS Modules (.module.css)
declare module '*.module.css' {
  const classes: { readonly [key: string]: string };
  export default classes;
}