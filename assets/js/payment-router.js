/* ==========================================================================
   ONLY LORD - payment-router.js
   Ruta: assets/js/payment-router.js  (cargar DESPUÉS de store-logic.js)

   Qué hace:
   1. Detecta el país por IP (ipapi.co, timeout 3 s, respaldo 'DEFAULT').
   2. Puebla #cart-payment-method según las reglas de pago del país.
   3. Renderiza el panel del método elegido (imágenes, pasos, video, datos).
   4. Al pulsar #btn-finalizar-pago abre WhatsApp con el pedido formateado.

   No modifica main.js ni store-logic.js. Solo lee el DOM del carrito.
   Guardar el archivo en UTF-8.
   ========================================================================== */
(function () {
	'use strict';

	/* ======================================================================
	   0. CONFIGURACIÓN
	   ====================================================================== */
	var CONFIG = {
		whatsapp: '59162276138',
		ipApi: 'https://ipwho.is/',
		ipTimeout: 3000,
		imgBase: 'assets/images/home/Tutoriales/',
		imgExts: ['webp', 'jpg', 'jpeg', 'png'],
		// true = oculta el botón original "Finalizar Compra por WhatsApp" mientras
		// el panel nuevo está activo (reaparece si el panel falla). false = ambos visibles.
		ocultarBotonLegado: true
	};
	var ARCHIVOS_IMAGENES = {
		airtm1: 'airtm1.jpg',
		airtm2: 'airtm2.jpg',
		qrairtm: 'QRairtm.jpeg',
		takenos1: 'Takenos1.jpg',
		takenos2: 'takenos2.jpg',
		qrtakenos: 'QRtakenos.jpeg',
		ach: 'ACH.jpeg',
		yape: 'Yape.jpg',
		datosyape: 'DatosYape.jpeg',
		remitly: 'Remitly.jpg',
		ria: 'Ria.jpg',
		westerunion: 'Westernunion.jpg',
		qrbolivia: 'QRbolivia.jpeg'
	};

	/* ======================================================================
	   1. REGLAS DE PAGO POR PAÍS (orden = orden en el select)
	   ====================================================================== */
	var REGLAS_PAGO = {
		'BO': ['QR_BOLIVIA'],
		'PE': ['YAPE', 'TAKENOS', 'AIRTM', 'WESTERN_UNION'],
		'AR': ['TAKENOS', 'AIRTM', 'WESTERN_UNION'],
		'BR': ['TAKENOS', 'AIRTM', 'WESTERN_UNION'],
		'CO': ['TAKENOS', 'AIRTM', 'WESTERN_UNION'],
		'US': ['ACH', 'RIA', 'REMITLY', 'AIRTM'],
		'CA': ['RIA', 'REMITLY', 'AIRTM', 'WESTERN_UNION'],
		'CL': ['RIA', 'AIRTM', 'WESTERN_UNION'],
		'MX': ['AIRTM', 'WESTERN_UNION'],
		'GT': ['AIRTM', 'WESTERN_UNION'],
		'SV': ['AIRTM', 'WESTERN_UNION'],
		'HN': ['AIRTM', 'WESTERN_UNION'],
		'NI': ['AIRTM', 'WESTERN_UNION'],
		'CR': ['AIRTM', 'WESTERN_UNION'],
		'PA': ['AIRTM', 'WESTERN_UNION'],
		'DO': ['AIRTM', 'WESTERN_UNION'],
		'CU': ['WESTERN_UNION'],
		'PY': ['WESTERN_UNION'],
		'DEFAULT': ['AIRTM', 'WESTERN_UNION']
	};
	// Caribe y resto de Sudamérica: WESTERN_UNION + AIRTM
	['HT', 'JM', 'TT', 'BS', 'BB', 'AG', 'DM', 'GD', 'KN', 'LC', 'VC', 'KY',
	 'BM', 'AW', 'CW', 'PR', 'GY', 'SR', 'UY', 'VE'].forEach(function (cc) {
		REGLAS_PAGO[cc] = ['WESTERN_UNION', 'AIRTM'];
	});
	var NOMBRES_PAISES = {
		BO: 'Bolivia', PE: 'Perú', AR: 'Argentina', BR: 'Brasil', CO: 'Colombia',
		US: 'Estados Unidos', CA: 'Canadá', CL: 'Chile', MX: 'México', GT: 'Guatemala',
		SV: 'El Salvador', HN: 'Honduras', NI: 'Nicaragua', CR: 'Costa Rica', PA: 'Panamá',
		DO: 'República Dominicana', CU: 'Cuba', PY: 'Paraguay', HT: 'Haití', JM: 'Jamaica',
		TT: 'Trinidad y Tobago', BS: 'Bahamas', BB: 'Barbados', AG: 'Antigua y Barbuda',
		DM: 'Dominica', GD: 'Granada', KN: 'San Cristóbal y Nieves', LC: 'Santa Lucía',
		VC: 'San Vicente y las Granadinas', KY: 'Islas Caimán', BM: 'Bermudas', AW: 'Aruba',
		CW: 'Curazao', PR: 'Puerto Rico', GY: 'Guyana', SR: 'Surinam', UY: 'Uruguay',
		VE: 'Venezuela', ES: 'España', GB: 'Reino Unido', DE: 'Alemania', FR: 'Francia',
		IT: 'Italia', PT: 'Portugal', NL: 'Países Bajos', BE: 'Bélgica', CH: 'Suiza',
		AT: 'Austria', IE: 'Irlanda', SE: 'Suecia', NO: 'Noruega', DK: 'Dinamarca',
		FI: 'Finlandia', PL: 'Polonia', GR: 'Grecia', TR: 'Turquía', RU: 'Rusia',
		UA: 'Ucrania', AU: 'Australia', NZ: 'Nueva Zelanda', JP: 'Japón', CN: 'China',
		KR: 'Corea del Sur', IN: 'India', PK: 'Pakistán', BD: 'Bangladés', ID: 'Indonesia',
		PH: 'Filipinas', SG: 'Singapur', MY: 'Malasia', TH: 'Tailandia', VN: 'Vietnam',
		ZA: 'Sudáfrica', NG: 'Nigeria', EG: 'Egipto', MA: 'Marruecos', IL: 'Israel',
		AE: 'Emiratos Árabes Unidos', SA: 'Arabia Saudita'
	};
	var ALIAS_PAISES = { 'ee uu': 'US', 'estados unidos de america': 'US', 'usa': 'US', 'brasil': 'BR', 'haiti': 'HT', 'curacao': 'CW' };
	var PREFIJOS_TELEFONICOS = {
		BO: '+591', PE: '+51', AR: '+54', BR: '+55', CO: '+57', US: '+1', CA: '+1',
		CL: '+56', MX: '+52', GT: '+502', SV: '+503', HN: '+504', NI: '+505', CR: '+506',
		PA: '+507', DO: '+1', CU: '+53', PY: '+595', HT: '+509', JM: '+1', TT: '+1',
		BS: '+1', BB: '+1', AG: '+1', DM: '+1', GD: '+1', KN: '+1', LC: '+1', VC: '+1',
		KY: '+1', BM: '+1', AW: '+297', CW: '+599', PR: '+1', GY: '+592', SR: '+597',
		UY: '+598', VE: '+58', ES: '+34', GB: '+44', DE: '+49', FR: '+33', IT: '+39',
		PT: '+351', NL: '+31', BE: '+32', CH: '+41', AT: '+43', IE: '+353', SE: '+46',
		NO: '+47', DK: '+45', FI: '+358', PL: '+48', GR: '+30', TR: '+90', RU: '+7',
		UA: '+380', AU: '+61', NZ: '+64', JP: '+81', CN: '+86', KR: '+82', IN: '+91',
		PK: '+92', BD: '+880', ID: '+62', PH: '+63', SG: '+65', MY: '+60', TH: '+66',
		VN: '+84', ZA: '+27', NG: '+234', EG: '+20', MA: '+212', IL: '+972', AE: '+971',
		SA: '+966'
	};

	/* ======================================================================
	   2. DATOS DEL DESTINATARIO (Ria, Remitly, Western Union)
	   ====================================================================== */
	var DESTINATARIO = [
		['Nombre', 'Daniel Lorenzo Mamani Guarachi'],
		['País', 'Bolivia'],
		['Ciudad', 'La Paz'],
		['Teléfono', '+591 62276138'],
		['Banco', 'Banco Solidario (BancoSol)'],
		['Tipo de cuenta', 'Cuenta de ahorros'],
		['Número de cuenta', '2082316000001'],
		['Cédula de identidad', '10060383'],
		['Dirección', 'Av. Periférica N.º 9425, Villa Mercedes "B"'],
		['Correo', 'beltsasar007@gmail.com'],
		['Método de recepción', 'Únicamente depósito en cuenta bancaria']
	];

	/* ======================================================================
	   3. DATOS POR MÉTODO
	   imagenes: nombres sin extensión (carpeta CONFIG.imgBase). Un elemento
	             puede ser un array de nombres alternativos.
	   datos:    filas [etiqueta, valor] o 'DESTINATARIO'.
	   ====================================================================== */
	var METODOS = {
		TAKENOS: {
			nombre: 'Takenos',
			imagenes: ['takenos1', 'takenos2', 'qrtakenos'],
			datosTitulo: 'Datos de pago',
			datos: [['TakeCard', 'onlylord']],
			enlaceOficial: null,
			video: 'https://www.youtube.com/shorts/BjR8OoeauYU',
			pasos: [
				'Abre la app de Takenos e inicia sesión.',
				'Selecciona la opción "Pago QR" o "Escanear QR".',
				'Escanea el código QR que aparece en la imagen.',
				'Verifica el monto y el tipo de cambio.',
				'Confirma el pago.',
				'Envía el comprobante por WhatsApp.'
			]
		},
		AIRTM: {
			nombre: 'AirTM',
			imagenes: ['airtm1', 'airtm2', 'qrairtm'],
			datosTitulo: 'Datos de pago',
			datos: [['Usuario AirTM', 'onlylordmt']],
			enlaceOficial: null,
			video: 'https://www.youtube.com/watch?v=GX1BAhcp_Rs',
			pasos: [
				'Abre la app de AirTM e inicia sesión.',
				'Ve a "Pagos" y selecciona "Pagos QR".',
				'Escanea el código QR que aparece en la imagen.',
				'Verifica el monto y el tipo de cambio.',
				'Confirma el pago.',
				'Envía el comprobante por WhatsApp.'
			]
		},
		RIA: {
			nombre: 'Ria Money Transfer',
			imagenes: ['Ria'],
			datosTitulo: 'Datos del destinatario',
			datos: 'DESTINATARIO',
			enlaceOficial: 'https://www.riamoneytransfer.com',
			video: 'https://www.youtube.com/watch?v=wef6j9WA1SE',
			pasos: [
				'Descarga la app de Ria o entra a su web e inicia sesión.',
				'Toca "Enviar dinero".',
				'Selecciona "Bolivia" como destino e ingresa el monto.',
				'Elige "Depósito bancario" como método de entrega (no retiro en efectivo).',
				'Ingresa los datos del destinatario.',
				'Selecciona tu método de pago (tarjeta de débito, crédito, Google Pay o Apple Pay).',
				'Revisa el resumen y confirma.',
				'Guarda el número de transacción y envíalo por WhatsApp.'
			]
		},
		REMITLY: {
			nombre: 'Remitly',
			imagenes: ['remitly'],
			datosTitulo: 'Datos del destinatario',
			datos: 'DESTINATARIO',
			enlaceOficial: 'https://www.remitly.com',
			video: null,
			pasos: [
				'Descarga la app de Remitly o entra a su web e inicia sesión.',
				'Toca "Enviar dinero".',
				'Selecciona "Bolivia" como destino.',
				'Ingresa el monto.',
				'Elige "Depósito bancario" como método de entrega.',
				'Ingresa los datos del destinatario.',
				'Selecciona tu método de pago (tarjeta de débito o crédito).',
				'Confirma la transferencia, guarda el número de transacción y envíalo por WhatsApp.'
			]
		},
		WESTERN_UNION: {
			nombre: 'Western Union',
			// 'westerunion' es el nombre indicado; 'westernunion' por si el archivo está bien escrito
			imagenes: [['westerunion', 'westernunion']],
			datosTitulo: 'Datos del destinatario',
			datos: 'DESTINATARIO',
			nota: 'Código requerido: MTCN (lo recibes al confirmar el envío).',
			enlaceOficial: 'https://www.westernunion.com',
			video: 'https://www.youtube.com/watch?v=ymzsNPsqVa8',
			pasos: [
				'Descarga la app de Western Union o entra a su web e inicia sesión.',
				'Selecciona "Enviar dinero".',
				'Elige "Bolivia" como destino e ingresa el monto.',
				'Selecciona "Depósito en cuenta bancaria" como método de entrega.',
				'Ingresa los datos del destinatario y bancarios.',
				'Selecciona tu método de pago y confirma.',
				'Guarda el código MTCN.',
				'Envía el código MTCN por WhatsApp.'
			]
		},
		ACH: {
			nombre: 'Transferencia ACH (EE.UU.)',
			imagenes: ['ACH'],
			datosTitulo: 'Datos bancarios ACH',
			datos: [
				['Titular', 'Daniel Lorenzo Mamani Guarachi'],
				['Número de cuenta', '212774739259'],
				['Número de ruta (Routing)', '101019644'],
				['Tipo de cuenta', 'Personal checking'],
				['Banco', 'Lead Bank'],
				['Dirección del banco', '1801 Main St., Kansas City, MO, 64108']
			],
			enlaceOficial: 'https://www.lead.bank',
			enlaceTexto: 'Lead Bank',
			video: null,
			pasos: [
				'Solicita los datos de la cuenta por WhatsApp.',
				'Ingresa a tu banca en línea en EE.UU.',
				'Agrega la cuenta externa con los datos proporcionados.',
				'Realiza la transferencia ACH por el monto del pedido.',
				'Guarda el número de confirmación.',
				'Envía el comprobante por WhatsApp.'
			]
		},
		YAPE: {
			nombre: 'Yape (Perú)',
			imagenes: ['Yape', 'Datosyape'],
			datosTitulo: 'Datos de pago',
			datos: [
				['Yape Bolivia', '62276138'],
				['Titular', 'Daniel Lorenzo Mamani Guarachi']
			],
			enlaceOficial: null,
			video: null,
			pasos: [
				'Abre Yape Perú y ve al menú > Remesas.',
				'Elige "Quiero Yapear".',
				'Selecciona Bolivia como destino.',
				'Método de envío: "Billetera Digital" e ingresa el monto.',
				'En la lista de billeteras selecciona "Yape Bolivia".',
				'Completa los datos con el número 62276138.',
				'Revisa, valida y confirma.',
				'Envía el comprobante por WhatsApp.'
			]
		},
		QR_BOLIVIA: {
			nombre: 'QR Simple (Bolivia)',
			imagenes: ['QRBolivia'],
			datos: null,
			enlaceOficial: null,
			video: null,
			pasos: [
				'Abre la aplicación de tu banco.',
				'Busca la opción "Simple QR" o "Pago QR".',
				'Escanea el código QR que aparece en la imagen.',
				'Verifica el monto y los datos.',
				'Confirma el pago con tu clave o huella digital.',
				'Envía el comprobante por WhatsApp.'
			]
		}
	};

	/* ======================================================================
	   4. ESTADO Y REFERENCIAS AL DOM
	   ====================================================================== */
	var estado = { codigoPais: '', nombrePais: '', metodo: '', prefijoTelefono: '' };
	var $pais, $telefono, $select, $panel, $boton, $botonLegado, $estadoPais, $form;
	var paisModificado = false;

	/* ======================================================================
	   5. UTILIDADES
	   ====================================================================== */
	function esc(t) {
		return String(t).replace(/[&<>"']/g, function (c) {
			return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
		});
	}

	function limpiar(t) {
		return String(t == null ? '' : t).replace(/\s+/g, ' ').trim();
	}

	function valorCampo(id) {
		var el = document.getElementById(id);
		return el && limpiar(el.value) ? limpiar(el.value) : 'No especificado';
	}

	// "$12.50 USD" -> "12.50" (o '' si no hay número)
	function soloNumero(texto) {
		var m = String(texto || '').match(/\d[\d.,]*/);
		return m ? m[0] : '';
	}

	/* ======================================================================
	   6. PAÍS INGRESADO POR EL CLIENTE
	   ====================================================================== */
	function normalizarPais(nombre) {
		return limpiar(nombre).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
	}

	function poblarPaises() {
		var lista = document.getElementById('cart-country-options');
		if (!lista) { return; }
		Object.keys(NOMBRES_PAISES).forEach(function (codigo) {
			var opcion = document.createElement('option');
			opcion.value = NOMBRES_PAISES[codigo];
			lista.appendChild(opcion);
		});
	}

	function actualizarPrefijoTelefono(codigo, prefijoDetectado) {
		if (!$telefono) { return; }
		var nuevoPrefijo = prefijoDetectado || PREFIJOS_TELEFONICOS[codigo] || '';
		var valorActual = limpiar($telefono.value);
		var prefijoAnterior = estado.prefijoTelefono;
		if (!nuevoPrefijo) {
			if (prefijoAnterior && valorActual.indexOf(prefijoAnterior) === 0) {
				$telefono.value = limpiar(valorActual.slice(prefijoAnterior.length));
			}
			estado.prefijoTelefono = '';
			$telefono.placeholder = 'Se añadirá cuando indiques tu país';
			return;
		}
		if (!valorActual) {
			$telefono.value = nuevoPrefijo + ' ';
		} else if (prefijoAnterior && (valorActual === prefijoAnterior || valorActual.indexOf(prefijoAnterior + ' ') === 0)) {
			$telefono.value = nuevoPrefijo + valorActual.slice(prefijoAnterior.length);
		}
		estado.prefijoTelefono = nuevoPrefijo;
		$telefono.placeholder = 'Ej: ' + nuevoPrefijo + ' 62276138';
	}

	function actualizarPais(codigoDetectado, prefijoDetectado) {
		estado.nombrePais = limpiar($pais.value);
		var clave = normalizarPais(estado.nombrePais);
		var codigo = codigoDetectado || ALIAS_PAISES[clave];
		if (!codigo) {
			Object.keys(NOMBRES_PAISES).some(function (cc) {
				if (normalizarPais(NOMBRES_PAISES[cc]) === clave) { codigo = cc; return true; }
				return false;
			});
		}
		estado.codigoPais = estado.nombrePais ? (codigo || 'DEFAULT') : '';
		actualizarPrefijoTelefono(estado.codigoPais, prefijoDetectado);
		actualizarEstadoPais();
		poblarSelect();
	}

	function detectarPais() {
		return new Promise(function (resolve) {
			var terminado = false;
			function finalizar(datos) {
				if (terminado) { return; }
				terminado = true;
				resolve(datos);
			}
			var timer = setTimeout(function () { finalizar(null); }, CONFIG.ipTimeout);
			fetch(CONFIG.ipApi, { cache: 'no-store' })
				.then(function (respuesta) { return respuesta.ok ? respuesta.json() : null; })
				.then(function (datos) {
					clearTimeout(timer);
					finalizar(datos && datos.success !== false && datos.country_code ? datos : null);
				})
				.catch(function () { clearTimeout(timer); finalizar(null); });
		});
	}

	/* ======================================================================
	   7. SELECT DE MÉTODOS
	   ====================================================================== */
	function poblarSelect() {
		var lista = estado.codigoPais ? (REGLAS_PAGO[estado.codigoPais] || REGLAS_PAGO.DEFAULT) : [];
		$select.innerHTML = '';
		if (!lista.length) {
			var vacio = document.createElement('option');
			vacio.value = '';
			vacio.textContent = 'Primero indica tu país';
			$select.appendChild(vacio);
			$select.disabled = true;
			renderPanel('');
			return;
		}
		$select.disabled = false;
		lista.forEach(function (codigo) {
			var m = METODOS[codigo];
			if (!m) { return; }
			var op = document.createElement('option');
			op.value = codigo;
			op.textContent = m.nombre;
			$select.appendChild(op);
		});
		if ($select.options.length) {
			$select.selectedIndex = 0;
			renderPanel($select.value);
		} else {
			renderPanel('');
		}
	}

	function actualizarEstadoPais() {
		if (!$estadoPais) { return; }
		if (!estado.nombrePais) {
			$estadoPais.textContent = 'Indica tu país para mostrar los métodos de pago disponibles.';
		} else if (estado.codigoPais === 'DEFAULT') {
			$estadoPais.textContent = 'No hay métodos específicos para ' + estado.nombrePais + '. Te mostramos las opciones internacionales disponibles.';
		} else {
			$estadoPais.textContent = 'Métodos de pago disponibles para ' + estado.nombrePais + '.';
		}
	}

	/* ======================================================================
	   8. IMÁGENES (webp -> jpg -> png, con texto de respaldo)
	   ====================================================================== */
	function candidatos(nombre) {
		var nombres = Array.isArray(nombre) ? nombre : [nombre];
		var out = [];
		nombres.forEach(function (n) {
			var archivo = ARCHIVOS_IMAGENES[String(n).toLowerCase()];
			if (archivo) {
				out.push(CONFIG.imgBase + archivo);
				return;
			}
			var variantes = [n];
			// Cloudflare Pages distingue mayúsculas: se prueba también en minúsculas
			if (n.toLowerCase() !== n) { variantes.push(n.toLowerCase()); }
			variantes.forEach(function (v) {
				CONFIG.imgExts.forEach(function (ext) {
					out.push(CONFIG.imgBase + v + '.' + ext);
				});
			});
		});
		return out;
	}

	function esCodigoQr(nombre) {
		return ['qrairtm', 'qrtakenos', 'qrbolivia'].indexOf(String(nombre).toLowerCase()) !== -1;
	}

	function crearImagen(nombre, alt) {
		var lista = candidatos(nombre);
		var i = 0;

		var a = document.createElement('a');
		a.target = '_blank';
		a.rel = 'noopener';
		a.title = 'Abrir imagen en pantalla completa';
		a.style.cssText = 'display:block;border-bottom:none;';

		var img = document.createElement('img');
		img.alt = alt;
		img.className = esCodigoQr(nombre) ? 'payment-qr-image' : 'payment-tutorial-image';
		img.loading = 'lazy';
		img.style.cssText = 'max-width:100%;height:auto;border-radius:8px;' +
			'box-shadow:0 8px 25px rgba(0,0,0,0.4);cursor:zoom-in;display:block;margin:0 auto 1.5em auto;';

		img.onload = function () { a.href = img.currentSrc || img.src; };
		img.onerror = function () {
			i++;
			if (i < lista.length) {
				img.src = lista[i];
				return;
			}
			if (a.parentNode) {
				var p = document.createElement('p');
				p.className = 'payment-image-missing';
				p.textContent = 'Imagen del tutorial no disponible';
				a.parentNode.replaceChild(p, a);
			}
		};

		a.appendChild(img);
		img.src = lista[0];
		return a;
	}

	/* ======================================================================
	   9. PANEL DEL MÉTODO
	   ====================================================================== */
	function bloqueDatos(m) {
		var filas = m.datos === 'DESTINATARIO' ? DESTINATARIO : m.datos;
		if (!filas || !filas.length) { return ''; }
		var h = '<div class="payment-recipient-box"><h4>' + esc(m.datosTitulo || 'Datos de pago') + '</h4><ul>';
		filas.forEach(function (f) {
			h += '<li><span>' + esc(f[0]) + '</span><strong>' + esc(f[1]) + '</strong></li>';
		});
		h += '</ul></div>';
		if (m.nota) { h += '<p class="payment-method-note">' + esc(m.nota) + '</p>'; }
		return h;
	}

	function mostrarBotonLegado(visible) {
		if ($botonLegado && CONFIG.ocultarBotonLegado) {
			$botonLegado.style.display = visible ? '' : 'none';
		}
	}

	function renderPanel(codigo) {
		var m = METODOS[codigo];
		estado.metodo = codigo;
		if (!codigo) {
			$panel.innerHTML = '';
			$panel.style.display = 'none';
			$boton.style.display = 'none';
			mostrarBotonLegado(true);
			return;
		}

		// Método inexistente: mensaje genérico y sin botón
		if (!m) {
			$panel.innerHTML = '<p class="payment-method-note">Método de pago no disponible. Contáctanos por WhatsApp.</p>';
			$panel.style.display = 'block';
			$boton.style.display = 'none';
			mostrarBotonLegado(true);
			return;
		}

		var h = '';

		// Enlace oficial (esquina superior derecha, definido en el CSS de carrito.html)
		if (m.enlaceOficial) {
			h += '<a class="payment-official-link" href="' + esc(m.enlaceOficial) +
				'" target="_blank" rel="noopener">Ir a ' + esc(m.enlaceTexto || m.nombre) + ' &#8599;</a>';
		}

		// Imágenes (se agregan por DOM para gestionar sus fallbacks)
		h += '<div class="payment-tutorial-image-wrap"></div>';

		// Paso a paso + video
		h += '<div class="payment-steps-box"><h4>Paso a paso</h4><ol>';
		m.pasos.forEach(function (p) { h += '<li>' + esc(p) + '</li>'; });
		h += '</ol>';
		if (m.video) {
			h += '<p class="payment-video-link"><span class="icon brands fa-youtube"></span> ' +
				'<a href="' + esc(m.video) + '" target="_blank" rel="noopener">Ver video tutorial</a></p>';
		}
		h += '</div>';

		// Datos específicos
		h += bloqueDatos(m);

		$panel.innerHTML = h;

		var wrap = $panel.querySelector('.payment-tutorial-image-wrap');
		m.imagenes.forEach(function (n) {
			var imagen = crearImagen(n, esCodigoQr(n) ? 'Código QR de pago de ' + m.nombre : 'Tutorial ' + m.nombre);
			if (esCodigoQr(n)) {
				var qrWrap = document.createElement('div');
				qrWrap.className = 'payment-qr-wrap';
				var etiqueta = document.createElement('p');
				etiqueta.className = 'payment-qr-label';
				etiqueta.textContent = 'Escanea este QR para pagar con ' + m.nombre;
				qrWrap.appendChild(etiqueta);
				qrWrap.appendChild(imagen);
				wrap.appendChild(qrWrap);
			} else {
				wrap.appendChild(imagen);
			}
		});

		$panel.style.display = 'block';
		$boton.style.display = 'inline-block';
		mostrarBotonLegado(false);
	}

	/* ======================================================================
	   10. MENSAJE DE WHATSAPP
	   ====================================================================== */
	function leerProductos() {
		var filas = document.querySelectorAll('#lista-carrito-productos tr');
		var items = [];
		Array.prototype.forEach.call(filas, function (tr) {
			var celdas = tr.querySelectorAll('td');
			if (celdas.length < 4) { return; }          // fila de "carrito vacío" u otra
			var nombre = limpiar(celdas[1].textContent);
			var celdaPrecio = celdas[3];
			for (var k = 2; k < celdas.length; k++) {   // por si cambian las columnas
				if (/\$\s*\d/.test(celdas[k].textContent)) { celdaPrecio = celdas[k]; break; }
			}
			var num = soloNumero(celdaPrecio.textContent);
			if (nombre) { items.push('- ' + nombre + ' - $' + (num || limpiar(celdaPrecio.textContent))); }
		});
		return items;
	}

	function construirMensaje() {
		var m = METODOS[estado.metodo];
		var totalEl = document.getElementById('cart-total-final');
		var total = totalEl ? soloNumero(totalEl.textContent) : '';
		var productos = leerProductos();
		var codigoEl = document.getElementById('cart-discount-code');
		var filaDescuento = document.getElementById('cart-discount-row');
		var porcentajeEl = document.getElementById('cart-discount-label');
		var importeEl = document.getElementById('cart-discount-amount');
		var codigoDescuento = codigoEl ? limpiar(codigoEl.value).toUpperCase() : '';
		var porcentajeDescuento = porcentajeEl ? soloNumero(porcentajeEl.textContent) : '';
		var importeDescuento = importeEl ? soloNumero(importeEl.textContent) : '';
		var bloqueDescuento = codigoDescuento && filaDescuento && filaDescuento.style.display !== 'none' && porcentajeDescuento && importeDescuento
			? '\uD83C\uDFF7\uFE0F *Descuento:* ' + codigoDescuento + ' -' + porcentajeDescuento + '% (-$' + importeDescuento + ' USD)'
			: '';
		var nombres = valorCampo('cart-client-name');
		var apellidos = valorCampo('cart-client-lastname');
		var cliente = (nombres === 'No especificado' && apellidos === 'No especificado')
			? 'No especificado'
			: (nombres !== 'No especificado' ? nombres : '') + ' ' + (apellidos !== 'No especificado' ? apellidos : '');

		return [
			'\uD83D\uDED2 *NUEVO PEDIDO - ONLY LORD*',
			'',
			'\uD83D\uDC64 *Cliente:* ' + limpiar(cliente),
			'\uD83C\uDF0E *País:* ' + (estado.nombrePais || 'No especificado'),
			'\uD83D\uDCDE *Teléfono:* ' + valorCampo('cart-client-phone'),
			'\uD83D\uDCE7 *Correo:* ' + valorCampo('cart-client-email'),
			'',
			'\uD83D\uDCB3 *Método de pago:* ' + (m ? m.nombre : 'No especificado'),
			'',
			'\uD83D\uDCE6 *Productos:*',
			productos.length ? productos.join('\n') : 'Carrito vacío',
			bloqueDescuento,
			'',
			'\uD83D\uDCB0 *Total:* $' + (total || '0.00') + ' USD',
			'',
			'\uD83D\uDCCE *Comprobante / Código de envío:*',
			'PEGA AQUI TU COMPROBANTE DE PAGO/MTCN/referencia'
		].join('\n');
	}

	function enviarWhatsApp() {
		// Reutiliza la validación nativa de los campos required del formulario
		if ($form && !$form.checkValidity()) {
			$form.reportValidity();
			return;
		}
		var url = 'https://wa.me/' + CONFIG.whatsapp + '?text=' + encodeURIComponent(construirMensaje());
		window.open(url, '_blank', 'noopener');
	}

	/* ======================================================================
	   11. INICIO
	   ====================================================================== */
	function iniciar() {
		$pais = document.getElementById('cart-client-country');
		$telefono = document.getElementById('cart-client-phone');
		$select = document.getElementById('cart-payment-method');
		// Acepta ambos ids: el actual del HTML y el del prompt original
		$panel = document.getElementById('payment-method-panel') || document.getElementById('panel-metodo-pago');
		$boton = document.getElementById('btn-finalizar-pago');
		$estadoPais = document.getElementById('payment-country-status');
		$form = document.getElementById('form-checkout-pass');
		$botonLegado = $form ? $form.querySelector('button[type="submit"]') : null;

		if (!$pais || !$select || !$panel || !$boton) {
			if (window.console) { console.warn('payment-router: faltan elementos en carrito.html'); }
			return;
		}

		poblarPaises();
		$pais.addEventListener('input', function () { paisModificado = true; });
		$pais.addEventListener('change', function () {
			paisModificado = true;
			actualizarPais();
		});
		$select.addEventListener('change', function () { renderPanel($select.value); });
		$boton.addEventListener('click', enviarWhatsApp);
		actualizarEstadoPais();
		poblarSelect();
		detectarPais().then(function (datos) {
			if (!datos || paisModificado || $pais.value.trim()) { return; }
			var codigo = String(datos.country_code || '').toUpperCase();
			$pais.value = datos.country || datos.country_name || NOMBRES_PAISES[codigo] || '';
			var prefijo = datos.country_calling_code || (datos.calling_code ? '+' + datos.calling_code : '');
			actualizarPais(codigo, prefijo);
		});
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', iniciar);
	} else {
		iniciar();
	}
})();
