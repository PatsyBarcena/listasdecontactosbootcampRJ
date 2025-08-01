# 📒 Lista de Contactos usando React & Context API

Una aplicación profesional de gestión de contactos desarrollada con **React.js**, **React Router** y **Context API**, que permite realizar operaciones CRUD completas (Crear, Leer, Actualizar, Eliminar) de forma moderna, escalable y eficiente.

---

## ⚙️ Tecnologías utilizadas

- ⚛️ React 18 con Hooks
- 🎯 React Router DOM
- 🌍 Context API para manejo de estado global
- 🧪 HTML
- 🎨 CSS
- 🧠 JavaScript
- 🧩 TypeScript *(solo configuración del entorno)*

---

## 🌐 Demo en vivo

🔗 [Ver Deploy en Netlify](https://listasdecontactosbootcamprj.netlify.app/)  
🔗 [Ver Deploy en Vercel](https://listadecontactosbootcamp-lskt.vercel.app/)

---

## 📸 Vista previa

![Vista previa 1](https://github.com/PatsyBarcena/listasdecontactosbootcampRJ/blob/main/listadecontactosvistaprevia1.png)  
![Vista previa 2](https://github.com/PatsyBarcena/listasdecontactosbootcampRJ/blob/main/listadecontactosvistaprevia2.png)

---

## ✨ Funcionalidades principales

- ✅ **Crear** nuevos contactos
- 🔍 **Leer** y visualizar una lista de contactos existentes
- ✏️ **Actualizar** información de los contactos
- 🗑️ **Eliminar** contactos con confirmación (modal emergente)
- 🔄 Comunicación con API externa mediante `fetch`

---

## 🧠 Estado global con Context API

La lógica del CRUD está centralizada usando **Context API**, lo que permite:

- Evitar prop drilling
- Compartir estado y funciones entre vistas
- Escalar la aplicación de manera limpia

---

## 📘 ¿JavaScript o TypeScript?

El proyecto está implementado mayoritariamente en **JavaScript**, pero fue generado con una plantilla de **Vite + React** que incluye por defecto archivos de configuración en **TypeScript**, como:

- `vite.config.ts`
- `tsconfig.json`
- `tsconfig.node.json`

GitHub detecta estos archivos `.ts` como TypeScript, por eso aparece en el resumen de tecnologías. **No se usó tipado estricto ni archivos `.tsx`**, pero el entorno está preparado para una futura migración a TypeScript si se desea.

> ✅ *Esto no afecta el funcionamiento del proyecto, y es común en proyectos modernos scaffolded por Vite.*

---

## 🚀 Cómo ejecutar este proyecto localmente

```bash
git clone https://github.com/PatsyBarcena/listasdecontactosbootcampRJ.git
cd listasdecontactosbootcampRJ
npm install
npm run dev
