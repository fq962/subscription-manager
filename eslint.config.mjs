import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,

  // Override default ignores of eslint-config-next.
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "dist/**",
    "coverage/**",
    "next-env.d.ts",
    "*.config.js",
    "*.config.mjs",
  ]),

  // ── Reglas personalizadas de mejores prácticas ──────────────────
  {
    name: "custom/best-practices",
    rules: {
      // ── TypeScript ──────────────────────────────────────────────
      // Detectar variables/imports no utilizados (permite prefijo _ para ignorar)
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
      // Evitar el uso de `any` para mantener seguridad de tipos
      "@typescript-eslint/no-explicit-any": "warn",
      // Forzar `import type` para importaciones que solo se usan como tipos
      "@typescript-eslint/consistent-type-imports": [
        "warn",
        { prefer: "type-imports", fixStyle: "inline-type-imports" },
      ],
      // Evitar aserciones de no-nulo (!) que pueden ocultar errores
      "@typescript-eslint/no-non-null-assertion": "warn",
      // No permitir imports de tipo con efectos secundarios
      "@typescript-eslint/no-import-type-side-effects": "error",
      // Preferir `as const` sobre literales enumerados
      "@typescript-eslint/prefer-as-const": "error",
      // No permitir `require()` en favor de ESM imports
      "@typescript-eslint/no-require-imports": "error",

      // ── React / JSX ────────────────────────────────────────────
      // Auto-cerrar componentes sin hijos: <Component /> en lugar de <Component></Component>
      "react/self-closing-comp": "warn",
      // Eliminar llaves innecesarias en props y children
      "react/jsx-curly-brace-presence": [
        "warn",
        { props: "never", children: "never" },
      ],
      // Preferir <input disabled /> sobre <input disabled={true} />
      "react/jsx-boolean-value": ["warn", "never"],
      // Eliminar fragmentos innecesarios <></> cuando no se necesitan
      "react/jsx-no-useless-fragment": ["warn", { allowExpressions: true }],
      // Asegurar que el naming de useState siga la convención [value, setValue]
      "react/hook-use-state": "warn",
      // No permitir children como prop (usar composición)
      "react/no-children-prop": "error",

      // ── React Hooks ────────────────────────────────────────────
      // Forzar reglas de hooks (ya configurado por next, reforzamos)
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",

      // ── Accesibilidad (a11y) ───────────────────────────────────
      // Todas las imágenes necesitan atributo alt
      "jsx-a11y/alt-text": "error",
      // Elementos interactivos deben tener roles ARIA apropiados
      "jsx-a11y/click-events-have-key-events": "warn",
      "jsx-a11y/no-static-element-interactions": "warn",
      // Los enlaces deben tener contenido accesible
      "jsx-a11y/anchor-is-valid": "warn",

      // ── Imports ────────────────────────────────────────────────
      // Ordenar imports automáticamente por grupos
      "import/order": [
        "warn",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            ["parent", "sibling", "index"],
            "type",
          ],
          "newlines-between": "always",
          alphabetize: { order: "asc", caseInsensitive: true },
        },
      ],
      // No permitir imports duplicados del mismo módulo
      "import/no-duplicates": "warn",
      // No permitir imports con rutas de archivo innecesarias
      "import/no-useless-path-segments": ["warn", { noUselessIndex: true }],

      // ── Mejores prácticas generales ────────────────────────────
      // Prevenir console.log accidentales en producción
      "no-console": ["warn", { allow: ["warn", "error", "info"] }],
      // No dejar debugger en el código
      "no-debugger": "error",
      // No usar alert/confirm/prompt del navegador
      "no-alert": "warn",
      // Siempre usar const cuando la variable no se reasigna
      "prefer-const": "warn",
      // Prohibir var en favor de let/const
      "no-var": "error",
      // Siempre usar === y !== en lugar de == y !=
      eqeqeq: ["error", "always"],
      // Requerir llaves en bloques multilínea
      curly: ["warn", "multi-line"],
      // Evitar ternarios anidados difíciles de leer
      "no-nested-ternary": "warn",
      // Simplificar ternarios innecesarios (ej: x ? true : false → x)
      "no-unneeded-ternary": "warn",
      // Preferir template literals sobre concatenación de strings
      "prefer-template": "warn",
      // Preferir object shorthand { name } sobre { name: name }
      "object-shorthand": "warn",
      // Eliminar else innecesario después de return
      "no-else-return": "warn",
      // Eliminar return sin valor al final de funciones
      "no-useless-return": "warn",
      // Evitar reasignar parámetros de funciones (permite mutar props de objetos)
      "no-param-reassign": ["warn", { props: false }],
      // Preferir desestructuración de objetos y arrays
      "prefer-destructuring": [
        "warn",
        {
          VariableDeclarator: { array: false, object: true },
          AssignmentExpression: { array: false, object: false },
        },
      ],
      // Preferir spread sobre Object.assign
      "prefer-spread": "warn",
      // Preferir rest parameters sobre arguments
      "prefer-rest-params": "warn",
      // No usar eval
      "no-eval": "error",
      // No usar new Function()
      "no-new-func": "error",
      // No extender prototipos nativos
      "no-extend-native": "error",
      // No usar with
      "no-with": "error",
      // No usar etiquetas (labels) excepto en loops
      "no-labels": ["error", { allowLoop: true }],
      // No arrojar literales (throw "error"), usar new Error()
      "no-throw-literal": "error",
      // Asegurar que las promesas se manejan correctamente
      "no-async-promise-executor": "error",
      // No retornar await innecesario
      "no-return-await": "warn",
    },
  },
]);

export default eslintConfig;
