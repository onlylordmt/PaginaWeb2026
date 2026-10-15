# ONLY LORD — preparación comercial y técnica para dLocal Go

## Estado resumido

Este repositorio es un sitio estático multipágina HTML/CSS/JavaScript: no hay framework, gestor de paquetes, proceso de compilación, backend ni configuración de Functions. Las páginas existentes se publican desde el repositorio y el sitio indicado por el titular usa Cloudflare Pages. No se desplegó ni se cambió la configuración de publicación.

**dLocal Go no está integrado ni habilitado.** No se dispuso de documentación oficial verificable para la cuenta, credenciales, acceso al panel ni entorno de pruebas. Por seguridad no se programaron rutas, firmas, estados ni URLs supuestos; no hay botones de pago ni pagos simulados.

## Cambios realizados

- `condiciones-de-compra.html` — precios, proceso manual vigente, verificación de pago, entrega digital, incidencias, duplicados, cambios, reclamaciones y uso de archivos.
- `terminos-servicios.html` — contratación por consulta y presupuesto aceptado, pago previo, plazos de referencia, revisiones, cancelaciones, entrega y derechos sobre materiales.
- `privacidad.html` — actividad y titular pendiente de verificación, datos y finalidades, almacenamiento local, correo/WhatsApp iniciados por el usuario, analítica de Cloudflare y terceros.
- `contacto.html`, `assets/js/contact-form.js` — canales indicados por el negocio y formulario que prepara un correo. No simula un envío: el usuario debe enviarlo desde su propia aplicación.
- `carrito.html`, `assets/js/store-logic.js` — checkout reemplazado por consulta manual; productos y totales se muestran como referencia, el pago se confirma aparte, la cesta no se borra al abrir WhatsApp y se indica que el mensaje todavía no se envió. El precio mostrado se busca en el catálogo y se ignoran precios guardados en `localStorage`; los productos de cesta se representan mediante su ID de catálogo.
- `assets/js/payment-router.js` — se sustituyó el antiguo router por un marcador sin instrucciones de pago, datos bancarios ni identificación personal. Se retiró su inclusión del carrito y la detección de país/IP.
- `pedido.html`, `assets/js/store-logic.js` — solicitud personalizada prepara el mensaje codificado para WhatsApp, añade tipo de consulta, BPM/tonalidad y reconocimiento de privacidad. No afirma que el mensaje se envió ni reinicia el formulario; presupuesto y alcance deben aceptarse antes de pagar.
- `soporte.html` — categorías posventa, correo y WhatsApp, plazo habitual de respuesta de 1 a 3 días sin garantía fija; se conservan los tutoriales.
- `index.html`, `membresia.html`, `produccion.html`, `multitracks.html`, `track-details.html` — aclaraciones de disponibilidad y eliminación de afirmaciones no comprobadas (acceso/ahorro de membresía, formatos técnicos universales y plazos garantizados).
- `beats.html`, `carrito.html`, `cursos.html`, `index.html`, `membresia.html`, `multitracks.html`, `pedido.html`, `produccion.html`, `recursos.html`, `sonidos.html`, `soporte.html`, `track-details.html` y las cuatro páginas nuevas — enlaces accesibles a condiciones, términos, privacidad y contacto en el pie de página.

**Atención de seguridad:** la versión previa del archivo de pagos contenía datos financieros y de identificación del destinatario en JavaScript público. Se retiraron del árbol de trabajo actual. Este cambio no elimina versiones ya desplegadas, cachés ni commits históricos del repositorio. Antes de solicitar la revisión, publica la versión corregida y revisa la exposición histórica y el estado de la cuenta/datos de cobro; no se reescribió el historial ni se hizo commit.

En una comprobación de solo lectura del dominio publicado, el `payment-router.js` en producción respondió HTTP 200 y aún contenía marcadores de la versión antigua. Las cuatro nuevas rutas legales/contacto respondieron con la página de inicio (mismo título y contenido), no con las páginas de este workspace. Por tanto, **producción aún no contiene estas correcciones**; se requiere desplegar el sitio actualizado antes de presentar la revisión.

El catálogo existente contiene **28 multitracks** en `LIBRERIA_MULTITRACKS`; se verificó el arreglo fuente y la página renderiza 28 fichas. No se añadió una cifra promocional a las páginas y se conservaron los precios y datos existentes.

## Estado de formularios y soporte

- **Contacto:** validación nativa del navegador para nombre, formato de correo, mensaje y casilla sin marcar por defecto. El JavaScript solo prepara un `mailto:` hacia `beltsasar007@gmail.com`; no hay servidor o servicio de correo y el formulario no confirma que se envió. Alternativas visibles: WhatsApp y correo directo.
- **Pedido personalizado:** validación del navegador y enlace `wa.me` con mensaje codificado. El cliente debe revisar y pulsar enviar en WhatsApp; no se registra la solicitud automáticamente.
- **Carrito:** precios/cupón son cálculos del navegador para solicitar una confirmación manual, no importes autorizados para un cobro. El cupón `ONLYLORD` conserva el 10 % configurado en el código. No existe validación definitiva de precio o descuento en servidor. Se debe confirmar el total y los métodos manuales antes de pagar.
- **Entrega:** el sitio no automatiza el despacho ni envía archivos. La entrega se coordina tras verificar manualmente el pago; las condiciones publican el tiempo de referencia de 5–30 minutos y disponibilidad usual del enlace de 24–48 horas, sujetos a incidencias y confirmación al enviar el enlace.
- **Medios manuales:** el router anterior enumeraba métodos por geolocalización y exponía datos privados, incluida una identificación personal. Se retiraron del checkout. No se publica una lista de métodos porque no fue posible validar cuáles están disponibles y autorizados para cada comprador. El titular debe confirmar los métodos que realmente acepta y qué instrucciones son seguras para mostrar públicamente.

## dLocal Go: configuración pendiente

No existe endpoint de pagos, webhook, almacenamiento de pedidos, reconciliación, devolución ni entrega automatizada. El marcador `assets/js/payment-router.js` no conecta con dLocal Go. No se añadieron secretos, variables ficticias, funciones de Cloudflare ni dependencias.

Antes de implementar se necesita:

1. Confirmar aprobación y disponibilidad de la cuenta y obtener acceso/documentación oficial aplicable a esa cuenta.
2. Credenciales separadas de pruebas y producción, y especificación vigente de autenticación, creación de órdenes, moneda, estados, firmas/webhooks, retorno, idempotencia y conciliación.
3. Confirmar los países, monedas y métodos permitidos para la cuenta; no asumir que son iguales para todos los clientes.
4. Definir almacenamiento persistente confiable de órdenes y un servicio de correo/entrega segura. La cesta del navegador no puede ser la autoridad de precios ni estados.
5. Acordar las URLs del sitio y notificaciones aprobadas, y completar pruebas de sandbox sin cargos reales.

Solo después de revisar la documentación oficial se debe crear una Cloudflare Pages Function (u otro backend aprobado) y guardar credenciales en variables/secretos del servidor de Cloudflare, nunca en HTML o JavaScript público. El servidor tendrá que resolver productos y cupón desde datos confiables, verificar la notificación del proveedor y no entregar por el mero retorno del navegador. Las variables y campos de API concretos dependen de la documentación de la cuenta; no se inventan aquí.

No se configura un proveedor de correo. Para un backend de contacto/pedidos, el titular debe elegir proveedor y aportar sus credenciales por un canal privado para añadirlas a los secretos de Pages. Mientras tanto, los formularios funcionan como iniciadores de correo/WhatsApp del usuario, no como formularios de envío servidor.

## Verificaciones y límites

No hay suite de pruebas ni comandos de build en el repositorio. Se ejecutaron estas comprobaciones estáticas:

- `git diff --check`: sin errores de espacios en blanco.
- Comprobación PowerShell de las 16 páginas HTML: todas las referencias locales `href`, `src` y `action` apuntan a rutas existentes; no se encontraron IDs duplicados ni etiquetas con destino inexistente.
- Comprobación de navegación: las 16 páginas enlazan las cuatro páginas nuevas de condiciones/contacto.
- Búsqueda en páginas y scripts: los antiguos valores completos de identidad, cuenta y domicilio ya no aparecen.
- Recuento de multitracks en el código y fichas renderizadas en navegador: 28.
- `curl -L` a los enlaces suministrados de YouTube, TikTok, Instagram y WhatsApp devolvió HTTP 200. Esto solo confirma una respuesta HTTP en el momento de la prueba, no titularidad ni el funcionamiento de todas las funciones de esos servicios.

No se pudo ejecutar `node --check` ni pruebas unitarias de JavaScript: Node.js y Python no están instalados/disponibles en el entorno y el repositorio no tiene suite automatizada. En un smoke test manual con navegador local se verificó que la página muestra 28 fichas; un artículo de USD 15 aparece con ese subtotal, el cupón `ONLYLORD` calcula USD 13,50 (10 %), un código inválido deja el total en USD 15 y un precio adulterado en `localStorage` no cambia el precio mostrado. Esto valida la presentación y el cálculo del navegador, no sirve para autorizar cobros. Se abrieron las páginas de contacto, carrito y multitracks; quedan pendientes las comprobaciones visuales en móvil/escritorio y la validación interactiva completa de formularios, menú, accesibilidad y cesta. El navegador registró un error 404 de recurso durante la carga local, no identificado. No se probó el envío real desde un cliente de correo o WhatsApp. No hay credenciales ni sandbox, por tanto no se probó una transacción ni un webhook de dLocal Go.

Los enlaces sociales se conservaron a partir de los destinos entregados por el titular; su funcionamiento externo no se da por verificado aquí. La carga de Cloudflare Web Analytics y referencias a almacenamiento local/de sesión se describen según el código revisado; el comportamiento de servicios de terceros y su retención debe confirmarse en sus propias configuraciones.

## Información que debe confirmar el titular

- El titular confirmó que la escritura legal exacta “Daniel Lorenzo Mamani Guarachi” coincide con la cuenta de dLocal Go; se incluyó en la política de privacidad.
- Si dLocal Go exige publicar domicilio, registro u otro dato legal, confirmar el requisito y qué dato no sensible se autoriza publicar. No se publicó domicilio ni identificación personal.
- Lista de métodos manuales vigentes y autorizados para publicación, países y monedas cubiertos, y datos de pago públicos apropiados. No compartir credenciales ni números de identificación personal.
- Para habilitar dLocal Go y correo automático: documentación oficial de la cuenta, credenciales de sandbox/producción y elección/configuración privada de backend, almacenamiento, correo y entrega.

## Publicación en Cloudflare Pages

No se cambió el proyecto ni se desplegó. Tras revisar los cambios y confirmar los datos pendientes:

1. Publicar el contenido actualizado del repositorio en la rama conectada al proyecto Pages (o subir la carpeta raíz mediante el método de despliegue estático ya utilizado).
2. Mantener la raíz del repositorio como origen y no añadir comando de build; las páginas, estilos y scripts son archivos estáticos.
3. Comprobar que el script antiguo ya no se sirve y que las cuatro rutas nuevas devuelven sus títulos y contenidos propios (no la página de inicio de fallback).
4. Comprobar navegación, formularios, teléfono móvil y enlaces desde el dominio de producción.
5. Si se integra backend posteriormente, desplegar Functions y configurar sus secretos por separado en el panel de Cloudflare; no desplegar un checkout antes de completar pruebas.

## Lista de preparación para revisión de dLocal Go

- [x] Confirmar identidad exacta del titular y coincidencia con la cuenta de dLocal Go.
- [ ] Confirmar si dLocal Go requiere publicar domicilio, registro u otro dato legal.
- [ ] Revisar en producción catálogo, precios, productos no disponibles, entrega y políticas.
- [ ] Confirmar los métodos manuales que efectivamente se ofrecen.
- [ ] Probar manualmente los enlaces de contacto y la apertura de formularios en móvil/escritorio.
- [ ] Proporcionar a dLocal Go los datos que solicite por el canal de verificación privado.
- [ ] No afirmar que dLocal Go acepta pagos hasta contar con aprobación, credenciales, backend seguro y transacciones de prueba verificadas.

La preparación del sitio no garantiza aprobación; la decisión corresponde a dLocal Go y depende de su revisión de la cuenta y sus requisitos vigentes.
