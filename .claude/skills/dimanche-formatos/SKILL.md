---
name: dimanche-formatos
description: El experto por formato de Dimanche — cada formato es un oficio (post de feed, carrusel, reel, TikTok, story/WhatsApp, TV del local, folleto/cartel), con un playbook propio (propósito, specs 2026, jerarquía de lectura, do's/don'ts, anclas, ejemplos). Usar al planificar o producir cualquier pieza, para elegir el formato y aplicarlo bien.
---

# dimanche-formatos — El experto por formato

**Premisa:** cada formato es un **oficio distinto** — otra lógica de lectura, otra función en el embudo, otras specs, otros do's/don'ts. Esta skill es la **capa de criterio de plataforma/uso**: te dice qué formato usar y cómo clavarlo. El **cómo visual** (IA, prompts, realismo) vive en `dimanche-media`; el **copy** en `dimanche-copy`; el **guion** en `dimanche-guion`; la **bajada al local** en `dimanche-local`. Acá se cruza, no se duplica.

## Cómo elegir formato (por la función que necesitás)

| Necesitás… | Formato | Playbook |
|---|---|---|
| **Descubrimiento** (gente nueva) | Reel · TikTok | [`reel.md`](references/reel.md) · [`tiktok.md`](references/tiktok.md) |
| **Enseñar / contar** (más engagement) | Carrusel | [`carrusel.md`](references/carrusel.md) |
| **Posicionar / autoridad** (la cara premium) | Post de feed | [`feed-post.md`](references/feed-post.md) |
| **Relación** (día a día, ya te siguen) | Story · WhatsApp | [`story.md`](references/story.md) |
| **Vender en el local** (cola de mostrador) | TV · Folleto/cartel | [`tv-local.md`](references/tv-local.md) · [`folleto-cartel.md`](references/folleto-cartel.md) |

Todos los playbooks siguen el mismo molde de 8 secciones → [`_plantilla-formato.md`](references/_plantilla-formato.md).

## Reglas transversales (valen para todos los formatos)

**La señal que más importa en Instagram 2026:** el algoritmo prioriza **watch-time + likes/reach + sends/reach**. **Los DM-shares pesan 3-5× más que los likes** → hacé contenido que la gente quiera **mandarle a un amigo**. Encaja con "Dimanche es excusa de encuentro". (En reels 2026 pesa el **completion-rate** por sobre el watch-time bruto → mejor corto y completado.)

**El mix (MAN-018 + POL-015):** Reels/TikTok para **descubrir** · Carrusel para **enseñar** · Posts para **autoridad** · Stories/WhatsApp para **relación** · TV/folleto para **vender en el local**. **Consistencia > volumen** (4/sem constante gana). Respetá la proporción de pilares POL-015 y **T2** (calidad sobre cantidad).

**Transversal de marca (no se rompe):** sin emojis · **sin naranja** · **foto real** (regla de oro: lo identificable nunca se inventa con IA) · sin marketinería · objetivo de fondo = posicionar. Toda pieza pasa por **`dimanche-brand-check`** y nace **Propuesto** (gate humano).

## Lo vivo (esta base NO es estática)
Las specs y las anclas se mantienen frescas con dos loops: **Numa (performance)** mide qué rinde en Dimanche y ajusta los playbooks (repaso mensual); el **watch de plataforma + radar (Lola/Mateo/Rocco)** trae cambios de formato/algoritmo y tendencias, **filtradas por el norte** (nada efímero). Lo que cambia es la **sección 2 (specs)** y la **6 (anclas)** de cada playbook; el resto es estable a propósito. Aprendizajes → *Memoria & Aprendizajes*.

## Estado de los playbooks (al 2026-06-07)
Completos: reel · tiktok · carrusel · feed-post · story (+WhatsApp) · tv-local · folleto-cartel + el molde común. Decisiones de organización tomadas por defecto (revisables con Luciano): **`dimanche-formatos` = hogar del criterio de formato**; TV y folleto viven acá aunque sean local físico (el detalle QSR de TV sigue en `dimanche-media/pantallas-tv-local.md`, enlazado); **WhatsApp** quedó como anexo de `story.md` (no formato propio). Pendiente menor: bajar la reconciliación del norte (azul dominante solo en placas-texto) al propio `pantallas-tv-local.md`.
