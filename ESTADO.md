# ESTADO — Agencia de Marketing Dimanche (punto de retomada)

> Leé este archivo primero para retomar el proyecto en una sesión nueva. Última actualización: 2026-06-02.

## Qué es
Agencia de marketing semiautomática de Dimanche Panificados. Operada por Anto + IA, dirigida y aprobada por Luciano. Objetivo: posicionar la marca, salir del secreto, in-house. Fuente de verdad: **Notion**. Interfaz: **bot de Telegram con memoria** (vía n8n + Claude). Repo: este.

## Estado actual (✅ hecho)
- **Notion** — mesa operativa creada (página madre + 5 DBs) + 2 manuales aprobados (Vigentes).
- **Brand kit + skills** — `brand/` (Brand Book, contexto, visual kit) + 8 skills Dimanche en `.claude/skills/` (orquestador `dimanche-mkt`, brand-check, copy, media, calendario, guion, campana, formatos).
- **Agentes** (prompts en `agentes-autonomos/`): briefing, cazador-virales, observatorio, tendencias, tendencias-globales, competencia, performance, coordinacion.
- **Calendarios junio y julio** cargados en Notion (estado Propuesto).
- **Infra decidida:** n8n Cloud + Railway/Scrapling (servicio pre-armado: `server.py`, `Dockerfile`, `requirements.txt`).
- **Bot de Telegram v1 CREADO** en n8n (solo texto, con memoria de conversación + marca). Workflow `YeDLHszeKM9Q7rMx`.
- **Learning loop:** base "Memoria & Aprendizajes" creada en Notion.

## Lo que falta (próximos pasos)
**De Luciano (manual):**
- Activar el bot: cargar credenciales (token de Telegram + API key Anthropic) en el workflow `YeDLHszeKM9Q7rMx` y darle **Publish**. (BotFather → /setprivacy → Disable si es grupo.)
- Disparar el **deploy** en Railway (repo ya conectado) y pasar la URL.
- Poner un **tope de gasto** en console.anthropic.com (la API es pay-per-use, aparte del plan Teams).

**De Claude (cuando Luciano dé acceso/URLs):**
- **v2 del bot:** conectar Notion como herramienta del agente → lee toda la base + escribe en *Memoria & Aprendizajes* (learning loop completo).
- **Fotos en el bot:** conectar Higgsfield (mood/escena) + Drive (foto real de producto/local). Regla: NADA real inventado con IA.
- **Agentes autónomos** como workflows n8n (briefing, cazador de virales, performance) que postean en el grupo de Telegram.
- **Conectar Scrapling de Railway** a los workflows.
- **Ordenar Notion** (tarea pendiente): diagnóstico/competencia/drivers → docs `ref__` formales (notion-dimanche).

## IDs clave
- **Repo:** github.com/lucianosanchez-ui/dimanche-agencia · local: `~/Desktop/dimanche-agencia`
- **n8n:** panaderiadimanche.app.n8n.cloud · bot workflow: `YeDLHszeKM9Q7rMx`
- **Railway:** project `f6a8eb56-85a9-4174-8add-b092c25a8744`
- **Notion teamspace:** `3655616e-313d-8127-89a6-004279baed6c`
  - Página madre "Agencia de Marketing": `3735616e-313d-8180-a8b4-ebab3c762635`
  - DBs: Objetivos&Campañas `9603f67e-0647-49d3-85e9-eda7454cf6d5` · Calendario `3d326521-b346-46ab-9bfd-141475b44fd5` · Inteligencia&Ideas `2a3d57ca-7585-4e85-ab2e-eb0f4225790f` · Activos `b032f2bc-0864-4d55-837b-81b8bb10eea4` · Memoria&Aprendizajes `63e720f6-4942-48c2-965b-f5df8e08d93f`
  - DB Documentos (marca): `d508a305-c1d5-4c27-901c-38903c2e8ff8` · DB Productos: `ef5aaa1f-f186-4cc8-94c5-0730df86bb44`
- **Drive:** 06_Marketing `1XmTlskZNjzWjMNSz2bXset8uC422jJIB` · MKT-Dimanche `1Nr8iiUwmdPwEsKYvoUt54CFnMCiGjb--`
- **Higgsfield:** workspace plus (créditos disponibles).

## Cómo retomar en una sesión nueva
1. Abrí **Claude Code en `~/Desktop/dimanche-agencia`** (o Claude con acceso a este repo).
2. Decile: **"Leé ESTADO.md y CLAUDE.md, y seguimos con [el próximo paso]"**.
3. El sistema documental de Notion se gestiona con la skill **notion-dimanche** (respetarla).
4. Nada de secretos en el repo: las API keys/tokens van en n8n y en `.env` local (gitignored).
