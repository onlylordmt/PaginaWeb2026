(function () {
	"use strict";

	var form = document.getElementById("contact-form");
	if (!form) return;

	form.addEventListener("submit", function (event) {
		event.preventDefault();
		if (form.dataset.preparing === "true") return;
		if (!form.reportValidity()) return;
		form.dataset.preparing = "true";

		var name = document.getElementById("contact-name").value.trim();
		var email = document.getElementById("contact-email").value.trim();
		var phone = document.getElementById("contact-phone").value.trim();
		var message = document.getElementById("contact-message").value.trim();
		var body = [
			"Nombre: " + name,
			"Correo: " + email,
			"WhatsApp/teléfono: " + (phone || "No indicado"),
			"",
			"Mensaje:",
			message
		].join("\n");
		var mailto = "mailto:beltsasar007@gmail.com?subject=" +
			encodeURIComponent("Consulta desde ONLY LORD") + "&body=" + encodeURIComponent(body);
		var status = document.getElementById("contact-form-status");

		if (status) {
			status.textContent = "Se intentará abrir tu aplicación de correo con el mensaje preparado. Aún no se ha enviado; debes revisarlo y pulsar Enviar en esa aplicación. Si no se abre, ";
			var link = document.createElement("a");
			link.href = mailto;
			link.textContent = "pulsa aquí para abrir el correo";
			status.appendChild(link);
			status.appendChild(document.createTextNode(" o utiliza los canales de contacto indicados."));
		}
		var submit = form.querySelector('button[type="submit"]');
		if (submit) submit.disabled = true;
		window.setTimeout(function () {
			form.dataset.preparing = "false";
			if (submit) submit.disabled = false;
		}, 3000);
		window.location.href = mailto;
	});
})();
