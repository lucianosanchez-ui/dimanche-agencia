# Zignia — subir las placas a las TVs

`https://gett.zignia.net` · la sesión está en el **Chrome de Luciano**.
Menú: **Dispositivos** (las TVs) → **Librería** (los archivos) → **Listas de
reproducción** (qué se ve en cada pantalla).

## ⚠ La carga NO se puede automatizar
Está probado y falla: si el archivo se sube por automatización queda con
**duración 0 segundos y sin miniatura**, y la TV no lo muestra. La plataforma
calcula la duración en el navegador, con el selector nativo de archivos — y Chrome
bloquea abrir ese selector por automatización.

También se probó forzarlo con permisos de Accesibilidad del sistema: se logra abrir
el selector (enfocando el input por JavaScript + una tecla real), pero **los clics
sintéticos siguen bloqueados**, así que no se puede terminar de navegar el diálogo.

**Entonces: los archivos los arrastra una persona.** Es un minuto y funciona siempre.

## El camino
1. Claude deja los archivos en **`~/Desktop/PARA SUBIR A ZIGNIA/`** con nombres claros.
2. Abrir `gett.zignia.net` → **Librería** → pestaña **Imágenes** o **Videos**.
3. **Subir media** → escribir el nombre → **arrastrar el archivo** al recuadro.
4. Esperar a que aparezca la miniatura y la duración. **Si dice 0 seg, algo falló:
   borralo y subilo de nuevo.**
5. **Guardar.**
6. Ir a **Listas de reproducción** y poner la placa nueva en la lista de la pantalla
   que corresponda — **subirla a la Librería no la pone al aire**.
7. Si reemplaza a una vieja, sacar la vieja de la lista.

## Cuidados
- **Al borrar, mirá bien la tarjeta.** Los tachos están pegados entre sí y es fácil
  borrar el de al lado — ya pasó una vez (se borró el video de `sanguchito`).
- Un archivo puede estar en la Librería y **no estar en ninguna lista**: ocupa lugar
  y no se ve. Vale la pena revisar cada tanto.
- Las 3 pantallas de cada local tienen listas distintas:
  **◀ izquierda = producto · ▦ medio = info · ▶ derecha = contenido**.

## Pendientes detectados (30/08, revisar si siguen)
- El video de **budines** al aire decía **"$4.500 el que sea"** — hoy son $5.500 y $7.000.
- La imagen de **sanguchitos caja x9** decía **$10.000** — hoy $14.000.
- **Criollos, desayuno y Día del Padre** estaban en la Librería pero **en ninguna lista**.
- **Horarios y delivery** estaban repetidos en las tres pantallas.
