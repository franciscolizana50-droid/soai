# Seguimiento de ventas y bonos — versión web / móvil

> **Importante:** esto ya no es un archivo suelto. `index.html` necesita las carpetas que van a su lado (`vendor/`, `fonts/`, `ocr/`…). **Extrae el ZIP completo** (clic derecho → *Extraer todo*) en una carpeta fija y abre `index.html` desde ahí, **no** desde dentro del ZIP ni copiándolo solo. Si falta `vendor/`, no se pueden importar ni exportar archivos Excel (la app lo avisa arriba y, si hay internet, intenta bajar la librería por su cuenta).
> Para usarla en el computador **no es necesario subirla a internet ni instalarla**; eso solo hace falta para usarla en teléfonos y compartirla.

Carpeta autocontenida: `index.html`, `sw.js`, `manifest.webmanifest`, `icons/`, `fonts/`, `vendor/` y `ocr/` (lector de fotos, ~7 MB). **Publica la carpeta completa.** No pide nada a internet salvo el respaldo en GitHub. No necesita servidor ni base de datos: cada persona guarda sus datos en su propio navegador y puede respaldarlos (cifrados) en GitHub.

## 1. Publicarlo

### Opción A: Netlify (la más simple)
1. Entra a https://app.netlify.com/drop
2. Arrastra la carpeta `soai-web` completa.
3. Netlify te da una dirección `https://algo.netlify.app`. Compártela.

### Opción B: GitHub Pages
1. Crea un repositorio (para publicar con Pages en cuenta gratuita debe ser **público**; aquí solo va el código, nunca datos).
2. Sube **todo el contenido** de la carpeta a la raíz del repositorio (archivos y subcarpetas).
3. Settings → Pages → Source: *Deploy from a branch* → `main` / `(root)`.
4. La dirección será `https://TU-USUARIO.github.io/NOMBRE-REPO/`.

En el teléfono: abre la dirección y usa "Agregar a pantalla de inicio" para tenerla como app.

### Instalarla y usarla sin conexión
Requiere que la dirección sea `https://` (Netlify y GitHub Pages lo son). Abrir `index.html` como archivo del computador no la instala.
1. Abre la dirección **con internet** al menos una vez y espera a que cargue por completo (guarda en el dispositivo la app, las tipografías, la librería de Excel y el lector de fotos: ~8 MB).
2. **Android (Chrome):** botón **Instalar app** de la barra, o menú ⋮ → *Instalar aplicación*. **iPhone (Safari):** Compartir → *Agregar a pantalla de inicio*.
3. Desde ahí funciona sin conexión: ingresar ventas y metas, importar archivos, leer fotos, filtros, Excel, PDF y respaldos por archivo. **Solo el respaldo en GitHub necesita internet.**

Importante
- **iPhone:** la app instalada guarda sus datos aparte de Safari. Instálala **antes** de cargar datos y úsala siempre desde su ícono (o traspasa con un respaldo).
- Cuando hay internet, al abrir la app recibe las actualizaciones; sin internet (o con señal muy mala, tras 4 s) abre la copia guardada.
- **Si cambias cualquier archivo de esta carpeta, cambia `VERSION` al inicio de `sw.js`** (por ejemplo `soai-v2`); así los dispositivos descargan la versión nueva.
- Los datos viven en el dispositivo: haz respaldos de vez en cuando.

## 2. Compartir un respaldo con compañeros (lo más simple, sin token)

**Quien publica**
1. En la app: **Respaldos** → pon un nombre de archivo (por ejemplo `respaldo-compartido`) → **Descargar cifrado** (con una contraseña larga) o **Descargar sin cifrar**.
2. En GitHub, en un repositorio **público**: **Add file → Upload files** → arrastra el archivo → **Commit changes**.
3. Abre el archivo en GitHub → botón **Raw** → copia la dirección (`https://raw.githubusercontent.com/…`) y envíasela a tus compañeros (y la contraseña, por otro medio).
4. Para publicar cambios: descarga de nuevo y sube **un archivo con el mismo nombre** (reemplaza al anterior). El enlace no cambia.

**Quien recibe**
1. **Respaldos** → pega el enlace en *Recibir / actualizar desde un enlace* → escribe la contraseña si el archivo está cifrado → **Guardar enlace y actualizar ahora**.
2. Desde entonces aparece el botón **Actualizar** en la barra: un clic y baja la última versión (si marcó "Recordar la contraseña", no la vuelve a pedir).

Notas
- Actualizar **reemplaza** los datos de este dispositivo de los meses que trae el respaldo (la app pide confirmación y muestra la fecha del respaldo).
- GitHub puede tardar unos minutos en mostrar la versión recién subida.
- El enlace funciona solo con repositorios públicos. Cualquiera con el enlace puede descargar el archivo: por eso conviene cifrarlo. Si necesitas un repositorio privado, usa el método con token de la siguiente sección.

## 2b. Avanzado: subir a GitHub desde la app (con token)

Crea **otro repositorio, privado**, solo para respaldos (distinto al del sitio).

1. GitHub → Settings → Developer settings → Personal access tokens → **Fine-grained tokens** → Generate new token.
2. *Repository access*: **Only select repositories** → elige el repositorio privado de respaldos.
3. *Permissions* → Repository permissions → **Contents: Read and write**.
4. Copia el token (`github_pat_...`).
5. En la app: **Respaldos (archivo / GitHub)** → completa usuario, repositorio, rama y archivo; pega el token; escribe una **contraseña de cifrado** (mín. 8 caracteres) → **Subir respaldo cifrado**.

Para restaurar en otro dispositivo: mismos datos + la misma contraseña → **Descargar y restaurar**.

Notas importantes
- El respaldo se cifra en el dispositivo (AES-256-GCM, clave derivada con PBKDF2) antes de subirse. GitHub solo ve texto ilegible.
- **La contraseña no se guarda en ninguna parte. Si se pierde, el respaldo no se puede recuperar.**
- Cada vez que subes, GitHub conserva el historial de versiones anteriores del archivo.
- Quien tenga el token puede escribir en ese repositorio. Si varias personas comparten el repositorio, cada una debe usar un **nombre de archivo distinto** (por ejemplo `respaldos/ana.enc.json`) y su propia contraseña.
- Marca "Recordar" solo en un dispositivo personal: el token queda guardado en ese navegador.

## 3. Respaldo y carga manual por archivo
En la misma ventana: **Descargar cifrado**, **Descargar sin cifrar** y **Cargar respaldo…** (acepta cifrados y los `.json` antiguos).

## Qué se guarda y dónde
Los datos (ventas, metas, vendedoras, tramos) viven en el navegador de cada dispositivo. Si se borran los datos del navegador se pierden, por eso conviene subir un respaldo de vez en cuando.
Al abrir la web desde internet, los datos quedan asociados a esa dirección; los que tenías en el archivo local del computador se pasan con un respaldo.

## Ingresar la venta de un día desde una foto del reporte

### A. Leer la foto dentro de la app
**Ingresar venta de un día** → elige el día → **Tomar foto** (o **Elegir imagen**). La app prepara la imagen, la lee y propone las filas "Total" (ID y monto). Todo ocurre en el teléfono: la foto no se sube a ningún lado.
- La primera vez tarda unos segundos en cargar el lector.
- **Es obligatorio revisar**: compara cada ID y monto con la foto (tócala para ampliarla) y marca la casilla "Revisé…" para poder guardar. El lector puede confundir dígitos y un ID mal leído manda la venta a otra persona.
- Si en la foto aparece el total general del reporte, la app lo detecta y confirma que la suma coincida (esto valida los montos, no los ID).
- Funciona mejor con la foto recta, de cerca, sin reflejos y mostrando solo las líneas de Total. En pruebas: una foto nítida se leyó perfecta; con desenfoque y ángulo fuerte leyó solo parte o nada.

### B. Si la lectura falla: usar el lector del teléfono
1. Con Google Lens / "Copiar texto" (Android) o Texto en vivo (iPhone), copia las líneas "Total" de la foto.
2. En **Ingresar venta de un día**, abre **Pegar filas desde el reporte**, pega y toca **Leer texto pegado**.
3. Revisa los **ID** (los desconocidos aparecen como "Sin vendedora asignada") y que aparezca "✓ La suma coincide con el total del reporte".
