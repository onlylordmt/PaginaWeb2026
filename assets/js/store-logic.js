/* ==========================================================================
   ONLY LORD - Motor Arquitectónico Central v4.0 (store-logic.js)
   ========================================================================== */

const MI_TELEFONO_WHATSAPP = "59162276138";
// Pendientes de confirmar por el titular: usuario público de Airtm y Takecard de Takenos.
// No publicar identificadores hasta recibir y verificar los handles exactos.
const IDENTIFICADORES_PUBLICOS_PAGO = {
    airtm: "",
    takenos: ""
};
const PLAYLIST_CURSOS_YT = "https://youtube.com/playlist?list=PLWw6Mm4O7Oz0&si=hoE38sSsruOortGy";
const PLAYLIST_MULTITRACKS_GRATIS_YT = "https://youtube.com/playlist?list=PLCxE4itUOy5CQJ_Qdf617buH2ZrT6sWKA&si=XgAgkO-yx8VmDD70";

const LIBRERIA_MULTITRACKS = [
    { id: "alma-mia", titulo: "ALMA MÍA", artista: "DENICHER POL", precio: 19.99, ytId: "4TulfAu8AeU", gumroadUrl: "https://beltsasar.gumroad.com/l/almamiaLord?wanted=true", acorde: "Fa Mayor", tempo: "130 bpm", cantidadTracks: 17, pesoTrack: "192 Mb", distribucion: "Empaquetado .ZIP", tags: ["worship", "orquestal", "piano", "strings"], stems: ["Arp Strings", "Arp", "Bass", "Bells", "Brass cinematic", "Click Track", "Drums Live", "EG AC", "EG", "Fx", "Guia", "Pad", "Piano", "Strings Bass", "Strings", "Violines 1 y 2"] },
    { id: "cantaremos", titulo: "CANTAREMOS DE TU GRAN AMOR", artista: "BARAK / ONLY LORD", precio: 19.99, ytId: "QQS3hc00RK4", gumroadUrl: "https://beltsasar.gumroad.com/l/cantamorLord?wanted=true", acorde: "Sol Menor", tempo: "142 bpm", cantidadTracks: 20, pesoTrack: "79.3 Mb", distribucion: "Empaquetado .ZIP", tags: ["worship", "adoracion", "live", "brass"], stems: ["Arp 1 y 2", "Bass", "Brass", "Click Track", "Drop", "Drums Live", "EG 1 y 2", "Fx", "Guia", "Lead 1 y 2", "Loop", "Pads", "Pluck", "Synth", "Synth Bass", "Vox 1 y 2"] },
    { id: "en-los-montes", titulo: "EN LOS MONTES LEGADO", artista: "MARCOS WITT", precio: 19.99, ytId: "zGiTsZVtQ9A", gumroadUrl: "https://beltsasar.gumroad.com/l/monteslegadoLord?wanted=true", acorde: "Re Menor", tempo: "116 bpm", cantidadTracks: 26, pesoTrack: "102 Mb", distribucion: "Empaquetado .ZIP", tags: ["clasico", "rock", "worship", "brass"], stems: ["Arp Bells", "Bass", "Clap", "Click Track", "Drop 1 y 2", "Drums Live", "Dubstep Drop", "EG 1, 2 y 3", "Fx", "Guia", "Metales", "Pads", "Percusion", "Pluck 1, 2 y 3", "Synth 1, 2 y 3", "Synth Bass 1 y 2", "Vox"] },
    { id: "hay-libertad-remix", titulo: "HAY LIBERTAD REMIX", artista: "ART AGUILERA / ONLY LORD", precio: 13.99, ytId: "9h0NwcsWMNE", gumroadUrl: "https://beltsasar.gumroad.com/l/haylibertadremixLord?wanted=true", acorde: "Re Menor", tempo: "150 bpm", cantidadTracks: 22, pesoTrack: "67 Mb", distribucion: "Empaquetado .ZIP", tags: ["remix", "edm", "electro", "dance"], stems: ["Arp", "Bass", "Click Track", "Coros", "Drums Live", "EG 1 y 2", "EG AC", "Fx", "Guia", "Keys", "Pad 1 y 2", "Lead 1 y 2", "Piano", "Pluck", "Synth", "Synth Bass", "Vox"] },
    { id: "intro-lion", titulo: "INTRO LION", artista: "BRANDOM LAKE", precio: 19.99, ytId: "NHieltD_310", gumroadUrl: "https://beltsasar.gumroad.com/l/introlionLord?wanted=true", acorde: "Re Menor", tempo: "134 bpm", cantidadTracks: 15, pesoTrack: "28 Mb", distribucion: "Empaquetado .ZIP", tags: ["intro", "worship", "synth", "live"], stems: ["AC", "Bass", "Click Track", "Drums Live", "EG 1 y 2", "Guia", "Keys 1, 2 y 3", "Loop y Fx", "Piano", "Synth Bass 1 y 2", "Vox"] },
    { id: "intro-bautizados-en-fuego", titulo: "INTRO + BAUTIZADOS EN FUEGO", artista: "MONTE SANTO", precio: 19.99, ytId: "BQFtmlfKr0Y", gumroadUrl: "https://beltsasar.gumroad.com/l/introbautizadosLord?wanted=true", acorde: "Re Mayor", tempo: "134 bpm", cantidadTracks: 15, pesoTrack: "22 Mb", distribucion: "Empaquetado .ZIP", tags: ["intro", "worship", "monte santo", "live"], stems: ["Bass", "Click Track", "Drums", "EG 1, 2 y 3", "Guia", "Keys 1 y 2", "Loop y Fx", "Pad", "Percusion", "Piano", "Strings"] },
    { id: "medley-ii", titulo: "MEDLEY II", artista: "AG MUSIC", precio: 35.99, ytId: "4iGNPJgOOIw", gumroadUrl: "https://beltsasar.gumroad.com/l/MedleyAGMusicLord?wanted=true", acorde: "Variable", tempo: "Variable", cantidadTracks: 20, pesoTrack: "171 Mb", distribucion: "Empaquetado .ZIP", tags: ["medley", "worship", "ag music"], stems: ["Arp", "Bass", "Bells", "Click Track", "Drums Live", "EG 1, 2 y 3", "EG Amb", "EG Clean", "EG Mute", "Guia", "Keys", "Loop", "Organ", "Piano", "Pluck", "Strings", "Synth", "Voz"] },
    { id: "medley-celebra-victorioso", titulo: "MEDLEY CELEBRA VICTORIOSO", artista: "BRIMMER / ONLY LORD", precio: 33.99, ytId: "R52eoZr_sWg", gumroadUrl: "https://beltsasar.gumroad.com/l/ketcvn?wanted=true", acorde: "Variable", tempo: "Variable", cantidadTracks: 23, pesoTrack: "232 Mb", tags: ["medley", "victorioso", "brimmer"], stems: ["Bass", "Brass", "Click Track", "Drums Live", "EG 1 - 6", "Fx", "Keys 1, 2, 3 y 4", "Guia", "Loop y Percusion", "Pad", "Piano", "Pluck", "Synth Lead", "Synth Bass", "Violin"] },
    { id: "estoy-convencido", titulo: "ESTOY CONVENCIDO", artista: "AVERLY MORRILLO / WORSHIP BAND LIVE", precio: 13.99, ytId: "OscK7rdACjc", gumroadUrl: "https://beltsasar.gumroad.com/l/estoyconvLord?wanted=true", acorde: "Mi Mayor", tempo: "127 bpm · 6/4", cantidadTracks: 16, pesoTrack: "75 Mb", distribucion: "Empaquetado .ZIP", tags: ["worship", "live", "averly morillo"], stems: ["Arp", "Bass", "Bells", "Click Track", "Drums Live", "EG", "EG AC", "Fx", "Keys", "Guia", "Pad 1 y 2", "Piano", "Strings", "Synth 1 y 2"] },
    { id: "venga-tu-reino", titulo: "VENGA TU REINO", artista: "HILLSONG / ONLY LORD", precio: 13.99, ytId: "ipMtyBpOgSU", ytStart: 6, gumroadUrl: "https://beltsasar.gumroad.com/l/ventureinoLord?wanted=true", acorde: "Si Menor", tempo: "150 bpm", cantidadTracks: 15, pesoTrack: "75 Mb", distribucion: "Empaquetado .ZIP", tags: ["worship", "hillsong", "live", "strings"], stems: ["Arp", "Bass", "Bells", "Click Track", "Drums Live", "EG 1 y 2", "Fx", "Keys", "Guia", "Piano", "Strings", "Synth Bass", "Voz", "Vox"] },
    { id: "intro-nuestro-dios", titulo: "INTRO + NUESTRO DIOS", artista: "MARCO BARRIENTOS", precio: 19.99, ytId: "14eRH7z7lg4", ytStart: 69, gumroadUrl: "https://beltsasar.gumroad.com/l/intrombLord?wanted=true", acorde: "Sol Menor", tempo: "144 bpm", cantidadTracks: 17, pesoTrack: "105 Mb", distribucion: "Empaquetado .ZIP", tags: ["intro", "worship", "marco barrientos"], stems: ["Arp 1 y 2", "Bass", "Bells", "Click Track", "Drums Live", "EG 1, 2 y 3", "Fx", "Guia", "Keys", "Loop", "Pad 1 y 2", "Synth Bass", "Synth"] },
    { id: "salmos-133", titulo: "SALMOS 133 / SOBRENATURAL", artista: "NEW WINE", precio: 25.99, ytId: "b5d5j3CW6Vo", gumroadUrl: "https://beltsasar.gumroad.com/l/NW1Lord?wanted=true", acorde: "Variable", tempo: "Variable", cantidadTracks: 17, pesoTrack: "96 Mb", distribucion: "Empaquetado .ZIP", tags: ["worship", "medley", "brass", "live"], stems: ["AC", "Bass", "Brass", "Click Track", "Coros", "Drums Live", "EG", "Guiro", "Guia", "Keys 1 y 2", "Percusion", "Piano", "Sax", "Trompetas", "Voz"] },
    { id: "padre-bueno", titulo: "PADRE BUENO", artista: "ALEX MARQUEZ", precio: 19.99, ytId: "jD81VUqcRBE", gumroadUrl: "https://beltsasar.gumroad.com/l/padrebuenoLord?wanted=true", acorde: "Sol Mayor", tempo: "132 bpm", cantidadTracks: 17, pesoTrack: "200 Mb", distribucion: "Empaquetado .ZIP", tags: ["worship", "alex marquez", "orquestal"], stems: ["Arp", "Bass", "Bells", "Cello", "Choir", "Click Track", "Drums Live", "EG", "EG AC", "EG Mute", "Guia", "Fx", "Keys", "Pad 1 y 2", "Piano", "Violines"] },
    { id: "remolino", titulo: "REMOLINO", artista: "NEW WINE", precio: 19.99, ytId: "WLNGleSSh2M", gumroadUrl: "https://beltsasar.gumroad.com/l/remoLord?wanted=true", acorde: "Sol Menor", tempo: "172 bpm", cantidadTracks: 14, pesoTrack: "56 Mb", distribucion: "Empaquetado .ZIP", tags: ["worship", "jubilo", "brass", "live"], stems: ["Brass", "Bass", "Click Track", "Drums Live", "EG 1 y 2", "EG AC", "Fx", "Guia", "Keys", "Lead", "Loop", "Pluck", "Strings"] },
    { id: "salmos-99", titulo: "SALMOS 99", artista: "NEW WINE", precio: 19.99, ytId: "EiE_1wigCRU", gumroadUrl: "https://beltsasar.gumroad.com/l/slm99Lord?wanted=true", acorde: "La Menor", tempo: "135 bpm", cantidadTracks: 11, pesoTrack: "52 Mb", tags: ["worship", "brass", "live", "piano"], stems: ["Brass", "Bass", "Click Track", "Drums Live", "EG 1 y 2", "Fx", "Guia", "Lead", "Percusion", "Piano"] },
    { id: "intro-tu-hijo-soy", titulo: "INTRO TU HIJO SOY", artista: "BARAK LIVE / DAVID NOLASCO", precio: 19.99, ytId: "RjpYd6R5msg", ytStart: 89, gumroadUrl: "https://beltsasar.gumroad.com/l/introhijoLord?wanted=true", acorde: "Fa# Menor", tempo: "134 bpm", cantidadTracks: 26, pesoTrack: "162 Mb", distribucion: "Empaquetado .ZIP", tags: ["intro", "worship", "barak", "live"], stems: ["Alto 1 y 2", "Arp 1 y 2", "BGVS 1 y 2", "Choir", "Click Track", "Drums Live", "EG 1, 2 y 3", "Guia", "Keys 1 - 4", "Organ", "Percusion", "Piano", "Synth Bass 1 y 2", "Synth Orq", "Tenor", "Vox Fx 1 y 2"] },
    { id: "salvador", titulo: "SALVADOR", artista: "LA HORMIGA", precio: 9.99, ytId: "qTNHdnxHd-o", gumroadUrl: "https://beltsasar.gumroad.com/l/hormLord?wanted=true", acorde: "Sol Menor", tempo: "118 bpm", cantidadTracks: 12, pesoTrack: "45 Mb", distribucion: "Empaquetado .ZIP", tags: ["rock", "worship", "organ", "live"], stems: ["Bass", "Brass", "Click Track", "Drums Live", "EG 1 y 2", "Guia", "Keys", "Organ", "Fx", "Voz", "Loop"] },
    { id: "lo-que-dios-dice", titulo: "LO QUE DIOS DICE QUE SOY", artista: "ADORACIÓN IGLESIA CRISTIANA", precio: 19.99, ytId: "w_LFCopstUk", gumroadUrl: "https://beltsasar.gumroad.com/l/lqddqsLord?wanted=true", acorde: "Fa# Mayor", tempo: "105 bpm", cantidadTracks: 12, pesoTrack: "61 Mb", distribucion: "Empaquetado .ZIP", tags: ["worship", "soft", "strings", "piano"], stems: ["Arp", "Bass", "Brass", "Click Track", "Drums Live", "EG 1 y 2", "Guia", "Loop", "Piano", "Strings", "Voz"] },
    { id: "con-poder", titulo: "CON PODER", artista: "BARAK LIVE / DAVID NOLASCO", precio: 10, ytId: "vVI-M39MZdw", ytStart: 35, gumroadUrl: "https://beltsasar.gumroad.com/l/conpoderLord?wanted=true", acorde: "Si Menor", tempo: "75 bpm", cantidadTracks: 18, pesoTrack: "51 Mb", distribucion: "Empaquetado .ZIP", tags: ["worship", "live", "rock", "pads"], stems: ["Bass", "Arp", "BGVS", "Click Track", "Drums Live", "EG 1 - 6", "Guia", "Fx", "Keys", "Piano", "Pad", "Voz"] },
    { id: "hosanna-remix", titulo: "HOSANNA REMIX", artista: "MARCOS BARRIENTOS", precio: 9.99, ytId: "1HMqnlELzD0", gumroadUrl: "https://beltsasar.gumroad.com/l/hosannaLord?wanted=true", acorde: "Si Menor", tempo: "146 bpm", cantidadTracks: 21, pesoTrack: "98 Mb", distribucion: "Empaquetado .ZIP", tags: ["remix", "worship", "edm", "live"], stems: ["Bass", "Arp", "BGVS", "Click Track", "Drums Live", "EG 1 - 4", "Guia", "Fx", "Keys", "Loop", "Piano", "Pad 1 y 2", "Strings", "Synth 1 - 4", "Voz"] },
    { id: "fiesta-en-el-desierto-remix", titulo: "FIESTA EN EL DESIERTO REMIX", artista: "MONTE SANTO / WORSHIP BAND LIVE / ARTURY PEPPER", precio: 13.99, ytId: "1HMqnlELzD0", gumroadUrl: "https://beltsasar.gumroad.com/l/fdLord?wanted=true", acorde: "Do# Menor", tempo: "125–140 bpm", cantidadTracks: 27, pesoTrack: "76 Mb", distribucion: "Empaquetado .ZIP", tags: ["remix", "worship", "monte santo", "live"], stems: ["Bass", "Bells", "Arp", "BGVS", "Click Track", "Choir 1 y 2", "Drums Live", "EG 1 - 5", "Guia", "Fx", "Keys 1 - 3", "Loop", "Piano", "Pad 1 y 2", "Strings", "Synth 1 - 4", "Voz"] },
    { id: "intro-yeshua-hamashiaj", titulo: "INTRO + YESHUA HAMASHIAJ", artista: "MONTE SANTO EN CONCIERTO", precio: 19.99, ytId: "P6edqId1N48", gumroadUrl: "https://beltsasar.gumroad.com/l/yehamLord?wanted=true", acorde: "Mib Menor", tempo: "140 bpm", cantidadTracks: 15, pesoTrack: "83 Mb", distribucion: "Empaquetado .ZIP", sampleRate: "44.1 kHz", formatoAudio: "WAV (Linear PCM)", profundidadBits: "24-Bit Stereo", tags: ["intro", "worship", "live", "monte santo"], stems: ["AC", "Bass", "Choir", "Click Track", "Drums Live", "EG 1 - 4", "Guia", "Fx & Loop", "Keys 1 y 2", "Orq", "Piano"] },
    { id: "medley-eres-fiel-ag", titulo: "MEDLEY ERES FIEL", artista: "AG MUSIC", precio: 35.99, ytId: "pp6rCjdzHGQ", gumroadUrl: "https://beltsasar.gumroad.com/l/MedleyAGMusicLord?wanted=true", acorde: "Variable", tempo: "Variable", cantidadTracks: 18, pesoTrack: "193 Mb", distribucion: "Empaquetado .ZIP", tags: ["medley", "worship", "guitarras", "mix"], stems: ["Arp", "Bass", "Bells", "Click Track", "Drums Live", "EG 1 y 2", "Guia", "Fx & Loop", "Keys 1 y 2", "Lead", "Pad", "Piano", "Synth Bass", "Vox", "Voz Guia"] },
    { id: "mix-naciones", titulo: "MIX NACIONES", artista: "NEW WINE", precio: 19.99, ytId: "CdCnEwtuaTU", gumroadUrl: "https://beltsasar.gumroad.com/l/nacionmixLord?wanted=true", acorde: "Variable", tempo: "Variable", cantidadTracks: 15, pesoTrack: "160 Mb", distribucion: "Empaquetado .ZIP", tags: ["medley", "worship", "brass", "live"], stems: ["Arp", "Acordeon", "Bass", "Brass", "Click Track", "Drums Live", "EG 1 y 2", "EG AC", "Guia", "Pad", "Percussion", "Piano", "Sax", "Violin"] },
    { id: "con-toda-mi-alma-comando-gaf", titulo: "CON TODA MI ALMA / CON TODA MI VIDA", artista: "COMANDO GAF", precio: 19.99, ytId: "a5aqL5txrP4", ytStart: 3, gumroadUrl: "https://beltsasar.gumroad.com/l/ccf1Lord?wanted=true", acorde: "Re menor", tempo: "155 bpm", cantidadTracks: 11, pesoTrack: "57 Mb", distribucion: "Empaquetado .ZIP", tags: ["comando gaf", "worship", "horns", "synth"], stems: ["Arp", "Bass", "Horns", "Click Track", "Drums Live", "EG 1", "EG 2", "Guia", "Fx & Drop", "Synth", "Synth bass"] },
    { id: "bye-bye-pa-que-preguntan", titulo: "BYE BYE / PA´QUE PREGUNTAN", artista: "ALEX ZURDO", precio: 15.99, ytId: "aWsW8rvsOaA", ytStart: 90, gumroadUrl: "https://beltsasar.gumroad.com/l/AZ1?wanted=true", acorde: "Variable", tempo: "95–97 bpm", cantidadTracks: 13, pesoTrack: "74 Mb", distribucion: "Empaquetado .ZIP", tags: ["alex zurdo", "urbano", "rap", "synth"], stems: ["Click Track", "Drums Live", "EG Sample", "Loop", "Guia", "Pad", "Pluck", "Piano", "Rodhes", "Synth Bass", "Synth Fx", "Synth Sample", "Voz Guia"] },
    { id: "intro-25-anos-miel-san-marcos", titulo: "INTRO 25 AÑOS", artista: "MIEL SAN MARCOS", precio: 19.99, ytId: "a5tzxtVzXYU", gumroadUrl: "https://beltsasar.gumroad.com/l/intromsm25Lord?wanted=true", acorde: "Re", tempo: "75 bpm", cantidadTracks: 14, pesoTrack: "31 Mb", distribucion: "Empaquetado .ZIP", tags: ["intro", "worship", "miel san marcos"], stems: ["Acustic", "Arp", "Click Track", "Drums Live", "EG Amb", "EG", "Fx", "Guia", "Loop", "Pads", "Percusion", "Piano", "Strings", "Synth Bass"] },
    { id: "no-cuenten-conmigo", titulo: "NO CUENTEN CONMIGO", artista: "ALEX ZURDO", precio: 14.99, ytId: "XVpZmQAFfzc", gumroadUrl: "https://beltsasar.gumroad.com/l/az2Lord?wanted=true", acorde: "F#m", tempo: "120 bpm", cantidadTracks: 18, pesoTrack: "66 Mb", distribucion: "Empaquetado .ZIP", tags: ["alex zurdo", "urbano", "worship"], stems: ["Acordeon", "Bass", "Brass", "Click Track", "Drums Live", "EG 1 y 2", "Fx", "Guia", "Guitar Sample", "Loop", "Orchesta", "Percusion", "Piano", "Pad", "Percussion", "Pluck", "Synth Sample", "Synth Bass"] },
    { id: "intro-vida-tu-me-das", titulo: "INTRO VIDA TÚ ME DAS", artista: "LAKEWOOD", precio: 25.99, ytId: "MMuJmgU8GlQ", ytStart: 3, gumroadUrl: "https://beltsasar.gumroad.com/l/introlakewoodLord?wanted=true", acorde: "Bm", tempo: "Variable", cantidadTracks: 19, pesoTrack: "100 Mb", distribucion: "Empaquetado .ZIP", tags: ["intro", "worship", "lakewood"], stems: ["Arp", "Bass", "Click Track", "Drums Live", "EG 1, 2 y Live", "Fx", "Guia", "Keys 1, 2 y 3", "Lead", "Piano", "Pad", "Pluck", "Synth Bass", "Vox y Vox Sample"] },
    { id: "intro-lo-mio-no-pasa", titulo: "INTRO LO MÍO NO PASA", artista: "ALEX ZURDO", precio: 25.99, ytId: "MMuJmgU8GlQ", ytStart: 3, gumroadUrl: "https://beltsasar.gumroad.com/l/AZ3Lord?wanted=true", acorde: "C#", tempo: "110 bpm", cantidadTracks: 21, pesoTrack: "87 Mb", distribucion: "Empaquetado .ZIP", tags: ["intro", "alex zurdo", "urbano"], stems: ["Acordeon", "Bass Live", "Bells", "Click Track", "Drums Live", "Fx", "Guia", "Guitar Sample", "Hit Orq", "Keys 1 y 2", "Lead 1 y 2", "Piano Live", "Organ", "Pad", "Percussion", "Pluck", "Synth Bass", "Synth", "Vox Sample"] },
    { id: "cantos-de-liberacion-en-unidad", titulo: "CANTOS DE LIBERACIÓN & EN UNIDAD", artista: "GENESIS CAMPOS", precio: 25.99, ytId: "1h9VhrDV7FQ", gumroadUrl: "https://beltsasar.gumroad.com/l/gencLord?wanted=true", acorde: "Cm", tempo: "155 bpm", cantidadTracks: 15, pesoTrack: "104 Mb", distribucion: "Empaquetado .ZIP", tags: ["worship", "genesis campos", "medley"], stems: ["Acordeon", "AC", "Bass Live", "Bells", "Click Track", "Drums Live", "EG 1 y 2", "Fx", "Guia", "Piano Live", "Pad", "Percussion", "Seccion Metales", "Seccion Violines", "Sinfonia"] },
    { id: "medley-danza-de-amor", titulo: "MEDLEY DANZA DE AMOR", artista: "CCINT", precio: 9.99, ytId: "oKJWZWpypQw", gumroadUrl: "https://beltsasar.gumroad.com/l/hqgox?wanted=true", acorde: "Variable", tempo: "Variable", cantidadTracks: 13, pesoTrack: "166 Mb", distribucion: "Empaquetado .ZIP", tags: ["medley", "worship", "ccint"], stems: ["Bass Live", "Click Track", "Drums Live", "EG", "Organ", "Guia", "Piano", "Percussion", "Seccion Metales", "Seccion Violines"] },
    { id: "mix-genesis-campos", titulo: "MIX GENESIS CAMPOS", artista: "GENESIS CAMPOS", precio: 19.99, ytId: "p9QhzFX-FgE", gumroadUrl: "https://beltsasar.gumroad.com/l/mixgc4Lord?wanted=true", acorde: "Variable", tempo: "Variable", cantidadTracks: 15, pesoTrack: "204 Mb", distribucion: "Empaquetado .ZIP", tags: ["medley", "genesis campos", "worship"], stems: ["Acordeon", "AC", "Bass Live", "Click Track", "Drums Live", "EG 1 y 2", "Guia", "Keys", "Mandolin", "Piano Live", "Pad", "Percussion", "Seccion Metales", "Seccion Violines"] }
];

function obtenerPrecioItem(item) {
    const track = LIBRERIA_MULTITRACKS.find(t => t.id === item.id);
    if (track) return track.precio;
    // No se acepta como precio válido un valor guardado/modificado en localStorage.
    return 0;
}

function calcularTotalesCarrito(carrito, aplicarDescuento = false) {
    const subtotal = carrito.reduce((sum, item) => sum + obtenerPrecioItem(item), 0);
    const porcentajeDescuento = aplicarDescuento ? 20 : 0;
    const descuento = subtotal * (porcentajeDescuento / 100);
    const total = subtotal - descuento;
    return { subtotal, descuento, total, codigoValido: aplicarDescuento, porcentajeDescuento };
}

function formatearPrecioUSD(monto) {
    return `$${monto.toFixed(2)} USD`;
}

function formatearPrecioCheckout(monto) {
    return formatearPrecioUSD(monto);
}

const LIBRERIA_SONIDOS = [
    { id: "s1", titulo: "LOOPS DRUMPADS", icon: "fa-drum", desc: "Secuencias rítmicas, loops de percusión y ambientes rítmicos Worship listos para tus shows." },
    { id: "s2", titulo: "KONTAKT LIBRARIES", icon: "fa-keyboard", desc: "Muestreos avanzados de pianos acústicos, sintetizadores analógicos y vientos con máxima articulación." },
    { id: "s3", titulo: "PLUGINS / VSTi", icon: "fa-plug", desc: "Herramientas virtuales de procesamiento de señal, ecualizadores y generadores armónicos de estudio." },
    { id: "s4", titulo: "PRESET GUITAR", icon: "fa-guitar", desc: "Cadenas de efectos y emulaciones de amplificadores exclusivas para procesadores Nux MG-300 / MG-400." },
    { id: "s5", titulo: "PRESET BAJO", icon: "fa-sliders-h", desc: "Configuraciones exclusivas de compresión y saturación analógica para líneas de bajo gordas de directo." },
    { id: "s6", titulo: "VST FULL", icon: "fa-compact-disc", desc: "Instrumentos virtuales y sintetizadores completos optimizados para la carga ligera en memoria RAM." }
];

const LIBRERIA_RECURSOS_GRATIS = [
    { id: "rg1", titulo: "MULTITRACKS GRATIS", icon: "fa-gift", desc: "En esta playlist de YouTube subiré multitracks gratuitos. Suscríbete a nuestro canal: en cada video encontrarás el enlace de descarga directa.", link: PLAYLIST_MULTITRACKS_GRATIS_YT, linkLabel: "Ver Playlist en YouTube" },
    { id: "rg2", titulo: "PLUGINS GRATIS", icon: "fa-plug", desc: "Herramientas y utilidades de mezcla digitales libres de licencias y completamente estables para directo." },
    { id: "rg3", titulo: "VST GRATIS", icon: "fa-keyboard", desc: "Sintetizadores e instrumentos virtuales libres optimizados para un bajo consumo de procesamiento." },
    { id: "rg4", titulo: "DAW GRATIS", icon: "fa-laptop-house", desc: "Estaciones de trabajo de audio digital y secuenciadores libres ideales para lanzar tus pistas en vivo." }
];

document.addEventListener("DOMContentLoaded", () => {
    inicializarCarritoHeader();
    actualizarContadorMenu();

    const gridMultitracks = document.getElementById("catalog-grid-container");
    if (gridMultitracks) {
        renderizarTarjetasTienda(LIBRERIA_MULTITRACKS);
        configurarBuscadorTags();
    }

    if (document.getElementById("detail-track-title")) {
        cargarDatosEnElMoldeDetalle();
    }

    if (document.getElementById("contenedor-sonidos-venta")) {
        renderizarMódulosSonidos();
    }

    if (document.getElementById("contenedor-recursos-gratis")) {
        renderizarMódulosRecursosGratis();
    }

    if (document.querySelector(".accordion-toggle")) {
        configurarAcordeonesSoporte();
    }

    const formPedido = document.getElementById("form-pedido-personalizado");
    if (formPedido) {
        formPedido.addEventListener("submit", procesarPedidoPersonalizado);
    }

    if (document.getElementById("lista-carrito-productos")) {
        renderizarPaginaCarrito();
    }
});

function inicializarCarritoHeader() {
    document.querySelectorAll("#header nav").forEach(nav => {
        if (nav.querySelector(".header-cart-link")) return;
        const cartLink = document.createElement("a");
        cartLink.href = "carrito.html";
        cartLink.className = "header-cart-link";
        cartLink.setAttribute("aria-label", "Ir al carrito");
        cartLink.innerHTML = '<span class="icon solid fa-shopping-cart"></span><span class="header-cart-count cart-counter-nav">0</span>';
        const menuLink = nav.querySelector('a[href="#menu"]');
        if (menuLink) {
            nav.insertBefore(cartLink, menuLink);
        } else {
            nav.appendChild(cartLink);
        }
    });
}

function renderizarTarjetasTienda(lista, idContenedor = "catalog-grid-container") {
    const contenedorGrid = document.getElementById(idContenedor);
    const mensajeNoResultados = idContenedor === "catalog-grid-container" ? document.getElementById("no-results-message") : null;
    if (!contenedorGrid) return;

    contenedorGrid.innerHTML = "";
    if (lista.length === 0) {
        if (mensajeNoResultados) mensajeNoResultados.style.display = "block";
        return;
    }
    if (mensajeNoResultados) mensajeNoResultados.style.display = "none";

    lista.forEach((track, index) => {
        const tarjeta = document.createElement("div");
        tarjeta.className = "track-card";
        tarjeta.style.opacity = "0";
        tarjeta.style.transform = "translateY(15px)";
        tarjeta.style.transition = `all 0.4s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.03}s`;
        tarjeta.style.cursor = "pointer";
        tarjeta.setAttribute("role", "link");
        tarjeta.setAttribute("tabindex", "0");
        tarjeta.setAttribute("aria-label", `Ver detalles de ${track.titulo}`);

        const imgUrl = `https://img.youtube.com/vi/${track.ytId}/hqdefault.jpg`;

        tarjeta.innerHTML = `
            <div class="track-thumbnail-wrapper">
                <img src="${imgUrl}" alt="${track.titulo}" loading="lazy" />
                <div class="track-thumbnail-overlay">
                    <span class="icon solid fa-play"></span>
                    <span class="overlay-text">Ver Detalles</span>
                </div>
            </div>
            <div class="track-card-body">
                <div class="track-card-info">
                    <h3>${track.titulo}</h3>
                    <span class="artist">${track.artista}</span>
                    <span class="track-price-tag">${formatearPrecioUSD(track.precio)}</span>
                </div>
                <span class="button btn-card-action">Más Información</span>
            </div>
        `;

        tarjeta.addEventListener("click", () => enviarAlMoldeDetalle(track.id));
        tarjeta.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                enviarAlMoldeDetalle(track.id);
            }
        });

        contenedorGrid.appendChild(tarjeta);

        setTimeout(() => {
            tarjeta.style.opacity = "1";
            tarjeta.style.transform = "translateY(0)";
        }, 50);
    });
}

function enviarAlMoldeDetalle(idTrack) {
    const track = LIBRERIA_MULTITRACKS.find(t => t.id === idTrack);
    if (track) {
        sessionStorage.setItem("multitrack_detalle_actual", JSON.stringify(track));
        window.location.href = "track-details.html";
    }
}

function renderizarMódulosSonidos() {
    const contenedor = document.getElementById("contenedor-sonidos-venta");
    if (!contenedor) return;

    contenedor.innerHTML = "";
    LIBRERIA_SONIDOS.forEach(sonido => {
        const item = document.createElement("div");
        item.className = "coming-soon-card";
        item.style.textAlign = "center";
        item.innerHTML = `
            <i class="fas ${sonido.icon}" style="font-size: 2.5em; margin-bottom: 0.5em; display: block;"></i>
            <h3>${sonido.titulo}</h3>
            <p style="margin-bottom: 1.5em; min-height: 48px;">${sonido.desc}</p>
            <span class="badge-soon">Muy Pronto</span>
        `;
        contenedor.appendChild(item);
    });
}

function renderizarMódulosRecursosGratis() {
    const contenedor = document.getElementById("contenedor-recursos-gratis");
    if (!contenedor) return;

    contenedor.innerHTML = "";
    LIBRERIA_RECURSOS_GRATIS.forEach(recurso => {
        const item = document.createElement("div");
        item.className = "coming-soon-card";
        item.style.textAlign = "center";

        if (recurso.link) {
            item.style.cursor = "pointer";
            item.innerHTML = `
                <i class="fas ${recurso.icon}" style="font-size: 2.5em; margin-bottom: 0.5em; display: block;"></i>
                <h3>${recurso.titulo}</h3>
                <p style="margin-bottom: 1.5em; min-height: 48px;">${recurso.desc}</p>
                <span class="badge-soon" style="background:rgba(255,0,0,0.08); border-color:rgba(255,0,0,0.25); color:#ff4444;">YouTube</span>
            `;
            item.addEventListener("click", () => window.open(recurso.link, "_blank"));
        } else {
            item.innerHTML = `
                <i class="fas ${recurso.icon}" style="font-size: 2.5em; margin-bottom: 0.5em; display: block;"></i>
                <h3>${recurso.titulo}</h3>
                <p style="margin-bottom: 1.5em; min-height: 48px;">${recurso.desc}</p>
                <span class="badge-soon">Muy Pronto</span>
            `;
        }
        contenedor.appendChild(item);
    });
}

function configurarBuscadorTags() {
    const inputBuscador = document.getElementById("track-search");
    if (!inputBuscador) return;

    inputBuscador.addEventListener("input", (e) => {
        const texto = e.target.value.toLowerCase().trim();
        const filtrados = LIBRERIA_MULTITRACKS.filter(track => {
            const coincideTexto = track.titulo.toLowerCase().includes(texto) ||
                                  track.artista.toLowerCase().includes(texto);
            const limpiarTermino = texto.replace("#", "");
            const coincideTags = track.tags && track.tags.some(tag => tag.includes(limpiarTermino));
            return coincideTexto || coincideTags;
        });
        renderizarTarjetasTienda(filtrados);
    });
}

function lanzarNotificacionPremium(mensaje) {
    const viejoToast = document.getElementById("onlylord-toast-alert");
    if (viejoToast) viejoToast.remove();

    const toast = document.createElement("div");
    toast.id = "onlylord-toast-alert";
    toast.setAttribute("role", "status");
    toast.setAttribute("aria-live", "polite");
    toast.style.cssText = "position:fixed;top:5.5em;right:1.5em;max-width:min(24em,calc(100vw - 2em));background:var(--onlylord-bg-estudio);border:solid 1px var(--onlylord-accent);padding:1em 1.25em;border-radius:6px;box-shadow:0 10px 30px rgba(0,242,254,0.2);color:#fff;font-family:Raleway,Helvetica,sans-serif;font-size:0.9em;font-weight:700;z-index:99999;opacity:0;transform:translateY(-8px);transition:all 0.25s ease;";
    const texto = document.createElement("span");
    texto.textContent = mensaje;
    const enlace = document.createElement("a");
    enlace.href = "carrito.html";
    enlace.textContent = "Ver carrito";
    enlace.style.cssText = "display:inline-block;margin-left:0.9em;color:var(--onlylord-accent);text-decoration:underline;white-space:nowrap;";
    toast.append(texto, enlace);
    document.body.appendChild(toast);

    const carritoHeader = document.querySelector(".header-cart-link");
    if (carritoHeader) {
        const posicion = carritoHeader.getBoundingClientRect();
        toast.style.top = `${Math.max(12, posicion.bottom + 8)}px`;
        toast.style.right = `${Math.max(12, window.innerWidth - posicion.right)}px`;
    }
    setTimeout(() => { toast.style.opacity = "1"; toast.style.transform = "translateY(0)"; }, 30);
    setTimeout(() => {
        toast.style.opacity = "0";
        toast.style.transform = "translateY(-8px)";
        setTimeout(() => toast.remove(), 250);
    }, 5000);
}
function configurarAcordeonesSoporte() {
    const botonesAcordeon = document.querySelectorAll(".accordion-toggle");

    botonesAcordeon.forEach(boton => {
        boton.addEventListener("click", function() {
            const panel = this.nextElementSibling;
            const isOpen = this.classList.contains("active");

            document.querySelectorAll(".accordion-panel").forEach(p => {
                p.style.maxHeight = null;
                p.style.padding = "0 1.2em";
                p.style.borderWidth = "0";
                p.style.overflowY = "hidden";
                if (p.previousElementSibling) p.previousElementSibling.classList.remove("active");
            });

            if (!isOpen) {
                this.classList.add("active");
                panel.style.borderWidth = "1px";
                panel.style.padding = "1.2em";
                panel.style.overflowY = "auto";
                panel.style.maxHeight = Math.min(panel.scrollHeight + 24, window.innerHeight * 0.55) + "px";
            }
        });
    });
}

function obtenerCarrito() {
    try {
        const carrito = JSON.parse(localStorage.getItem("onlylord_cart") || "[]");
        if (!Array.isArray(carrito)) return [];
        const productosDisponibles = new Set(LIBRERIA_MULTITRACKS.map(track => track.id));
        const carritoActualizado = carrito.filter(item => item && typeof item.id === "string" && productosDisponibles.has(item.id));
        if (carritoActualizado.length !== carrito.length) {
            localStorage.setItem("onlylord_cart", JSON.stringify(carritoActualizado));
        }
        return carritoActualizado;
    } catch (error) {
        return [];
    }
}
function actualizarContadorMenu() {
    const carrito = obtenerCarrito();
    document.querySelectorAll(".cart-counter-nav").forEach(el => { el.innerText = carrito.length; });

    document.querySelectorAll("#menu a, .links a").forEach(link => {
        if (link.innerHTML.includes("Mi Carrito")) {
            link.innerHTML = `<span class="icon solid fa-shopping-cart"></span> Mi Carrito (${carrito.length})`;
        }
    });
}

function añadirAlCarritoLocal(id, titulo, categoria, precio) {
    let carrito = obtenerCarrito();
    if (!LIBRERIA_MULTITRACKS.some(track => track.id === id)) {
        lanzarNotificacionPremium("Este producto no está disponible en el catálogo.");
        return;
    }
    if (carrito.some(item => item.id === id)) {
        lanzarNotificacionPremium(`"${titulo}" ya está en tu carrito.`);
        return;
    }
    carrito.push({ id });
    localStorage.setItem("onlylord_cart", JSON.stringify(carrito));
    actualizarContadorMenu();
    lanzarNotificacionPremium(`"${titulo}" añadido al carrito.`);
}

function eliminarDelCarrito(id) {
    let carrito = obtenerCarrito();
    carrito = carrito.filter(item => item.id !== id);
    localStorage.setItem("onlylord_cart", JSON.stringify(carrito));
    actualizarContadorMenu();
    renderizarPaginaCarrito();
    lanzarNotificacionPremium("Elemento removido.");
}

function obtenerOpcionPago() {
    const opcion = document.querySelector('input[name="payment-option"]:checked');
    return opcion ? opcion.value : "gumroad";
}

function obtenerMetodoPagoSeleccionado() {
    const selector = document.getElementById("cart-payment-method");
    if (!selector) return "";
    return ["airtm", "takenos", "usdt", "bolivia"].includes(selector.value) ? selector.value : "";
}

function obtenerNombreMetodoPago(metodo) {
    if (metodo === "airtm") return "AIRTM";
    if (metodo === "takenos") return "TAKENOS";
    if (metodo === "usdt") return "USDT (BSC BEP20)";
    if (metodo === "bolivia") return "QR Bolivia · Sin Comisiones";
    return "Por coordinar";
}

function construirResumenCarritoWhatsApp(metodo) {
    const carrito = obtenerCarrito();
    if (carrito.length === 0) return "";
    const totales = calcularTotalesCarrito(carrito, true);
    const lineasProductos = carrito.map(item => {
        const track = LIBRERIA_MULTITRACKS.find(t => t.id === item.id);
        return `  - *${track ? track.titulo : "Producto no disponible"}* — ${formatearPrecioCheckout(obtenerPrecioItem(item))}`;
    });
    return `Hola, *ONLY LORD*.\nSolicito confirmación de disponibilidad para el siguiente pedido:\n\n` +
        `*📋 PAGO*\n• Método de pago: ${obtenerNombreMetodoPago(metodo)}\n\n` +
        `*🛒 RESUMEN DE LA COMPRA*\n• Producto:\n${lineasProductos.join("\n")}\n` +
        `• Precio:\n  Subtotal: ${formatearPrecioCheckout(totales.subtotal)}\n  Descuento (20%): -${formatearPrecioCheckout(totales.descuento)}\n  Total con descuento: ${formatearPrecioCheckout(totales.total)}\n\n` +
        `*💳 COMPROBANTE DE PAGO*\nManda tu comprobante de pago al WhatsApp.\n\nGracias.`;
}

function actualizarResumenSolicitudManual() {
    const opcion = obtenerOpcionPago();
    const metodo = obtenerMetodoPagoSeleccionado();
    const carrito = obtenerCarrito();
    const gumroadPanel = document.getElementById("gumroad-payment-panel");
    const otherPanel = document.getElementById("other-payment-panel");
    if (gumroadPanel) gumroadPanel.style.display = opcion === "gumroad" ? "block" : "none";
    if (otherPanel) otherPanel.style.display = opcion === "other" ? "block" : "none";

    const qrIds = ["airtm", "takenos", "usdt", "bolivia"];
    qrIds.forEach(id => {
        const qr = document.getElementById(`payment-qr-${id}`);
        if (qr) qr.style.display = opcion === "other" && metodo === id ? "block" : "none";
    });

    const boliviaLink = document.getElementById("bolivia-zero-fee");
    if (boliviaLink) boliviaLink.style.display = opcion === "other" && (navigator.language || "").toLowerCase().includes("bo") ? "block" : "none";

    const resumen = document.getElementById("manual-payment-summary");
    if (resumen) resumen.style.display = opcion === "other" && carrito.length > 0 ? "block" : "none";

    const totales = calcularTotalesCarrito(carrito, true);
    const lista = document.getElementById("manual-summary-products");
    if (lista) {
        lista.replaceChildren();
        carrito.forEach(item => {
            const track = LIBRERIA_MULTITRACKS.find(t => t.id === item.id);
            const li = document.createElement("li");
            li.textContent = `${track ? track.titulo : "Producto no disponible"} — ${formatearPrecioCheckout(obtenerPrecioItem(item))}`;
            lista.appendChild(li);
        });
    }
    const setText = (id, value) => { const el = document.getElementById(id); if (el) el.textContent = value; };
    setText("manual-summary-method", obtenerNombreMetodoPago(metodo));
    setText("manual-summary-subtotal", formatearPrecioCheckout(totales.subtotal));
    setText("manual-summary-discount", `-${formatearPrecioCheckout(totales.descuento)} (20%)`);
    setText("manual-summary-total", formatearPrecioCheckout(totales.total));
}

function renderizarOpcionesPagoGumroad(carrito) {
    const contenedor = document.getElementById("cart-gumroad-payments");
    if (!contenedor) return;
    contenedor.replaceChildren();

    carrito.forEach(item => {
        const track = LIBRERIA_MULTITRACKS.find(producto => producto.id === item.id);
        if (!track || !track.gumroadUrl) return;

        const fila = document.createElement("div");
        fila.className = "cart-gumroad-item";
        const nombre = document.createElement("span");
        nombre.textContent = `${track.titulo} — ${formatearPrecioCheckout(track.precio)}`;
        const enlace = document.createElement("a");
        enlace.className = "button small";
        enlace.href = track.gumroadUrl;
        enlace.target = "_blank";
        enlace.rel = "noopener noreferrer";
        enlace.textContent = "COMPRAR MULTITRACK";
        enlace.setAttribute("aria-label", `Abrir pago de ${track.titulo} en Gumroad`);
        fila.append(nombre, enlace);
        contenedor.appendChild(fila);
    });
}
function renderizarPaginaCarrito() {
    const contenedorLista = document.getElementById("lista-carrito-productos");
    const carrito = obtenerCarrito();
    renderizarOpcionesPagoGumroad(carrito);

    if (!contenedorLista) return;
    contenedorLista.innerHTML = "";

    if (carrito.length === 0) {
        contenedorLista.innerHTML = `<tr><td colspan="5" style="text-align:center; padding: 4em 0; color:rgba(255,255,255,0.3);">Tu carrito de compras se encuentra vacío.</td></tr>`;
        actualizarResumenSolicitudManual();
        return;
    }

    carrito.forEach((item, index) => {
        const track = LIBRERIA_MULTITRACKS.find(t => t.id === item.id);
        const precio = obtenerPrecioItem(item);
        const tr = document.createElement("tr");
        const numero = document.createElement("td");
        const numeroTexto = document.createElement("strong");
        numeroTexto.textContent = String(index + 1);
        numero.appendChild(numeroTexto);

        const nombre = document.createElement("td");
        const nombreTexto = document.createElement("span");
        nombreTexto.style.cssText = "color:#ffffff;font-weight:700;text-transform:uppercase;font-size:0.9em;letter-spacing:0.05em;";
        nombreTexto.textContent = track ? track.titulo : "Producto no disponible";
        nombre.appendChild(nombreTexto);

        const categoria = document.createElement("td");
        const categoriaTexto = document.createElement("span");
        categoriaTexto.className = "badge-soon";
        categoriaTexto.textContent = track ? "Multitrack Premium" : "No disponible";
        categoria.appendChild(categoriaTexto);

        const celdaPrecio = document.createElement("td");
        celdaPrecio.className = "cart-item-price";
        celdaPrecio.style.cssText = "text-align:right;font-weight:700;color:var(--onlylord-accent);";
        celdaPrecio.textContent = formatearPrecioCheckout(precio);

        const acciones = document.createElement("td");
        acciones.style.textAlign = "right";
        const botonEliminar = document.createElement("button");
        botonEliminar.type = "button";
        botonEliminar.className = "button small btn-cart-remove";
        botonEliminar.setAttribute("aria-label", "Eliminar " + (track ? track.titulo : "producto no disponible"));
        botonEliminar.innerHTML = '<i class="fas fa-trash" aria-hidden="true"></i>';
        botonEliminar.addEventListener("click", () => eliminarDelCarrito(item.id));
        acciones.appendChild(botonEliminar);

        tr.appendChild(numero);
        tr.appendChild(nombre);
        tr.appendChild(categoria);
        tr.appendChild(celdaPrecio);
        tr.appendChild(acciones);
        contenedorLista.appendChild(tr);
    });

    document.querySelectorAll('input[name="payment-option"]').forEach(radio => {
        if (!radio.dataset.configurado) {
            radio.addEventListener("change", actualizarResumenSolicitudManual);
            radio.dataset.configurado = "true";
        }
    });

    const formCheckout = document.getElementById("form-checkout-pass");
    if (formCheckout && !formCheckout.dataset.checkoutConfigurado) {
        formCheckout.addEventListener("submit", (e) => {
            e.preventDefault();
            despacharCarritoAWhatsApp();
        });
        formCheckout.dataset.checkoutConfigurado = "true";
    }

    const selectorMetodo = document.getElementById("cart-payment-method");
    if (selectorMetodo && !selectorMetodo.dataset.configurado) {
        selectorMetodo.addEventListener("change", actualizarResumenSolicitudManual);
        selectorMetodo.dataset.configurado = "true";
    }
    const boliviaLink = document.getElementById("bolivia-zero-fee");
    if (boliviaLink && !boliviaLink.dataset.configurado) {
        boliviaLink.addEventListener("click", () => {
            const selector = document.getElementById("cart-payment-method");
            if (selector) selector.value = "bolivia";
            actualizarResumenSolicitudManual();
        });
        boliviaLink.dataset.configurado = "true";
    }
    actualizarResumenSolicitudManual();
}

function actualizarResumenTotalesCarrito() {
    document.querySelectorAll(".cart-item-price").forEach((elemento, indice) => {
        const carrito = obtenerCarrito();
        if (carrito[indice]) elemento.textContent = formatearPrecioCheckout(obtenerPrecioItem(carrito[indice]));
    });
    actualizarResumenSolicitudManual();}

function despacharCarritoAWhatsApp() {
    const formulario = document.getElementById("form-checkout-pass");
    const estado = document.getElementById("checkout-whatsapp-status");
    const carrito = obtenerCarrito();
    const metodo = obtenerMetodoPagoSeleccionado();

    if (!formulario) return;
    if (carrito.length === 0) {
        if (estado) estado.textContent = "Agrega al menos un producto al carrito para continuar.";
        return;
    }

    const mensaje = construirResumenCarritoWhatsApp(metodo);

    const url = `https://wa.me/${MI_TELEFONO_WHATSAPP}?text=${encodeURIComponent(mensaje)}`;
    const enlace = document.createElement("a");
    enlace.href = url;
    enlace.rel = "noopener noreferrer";
    enlace.textContent = "Abrir WhatsApp con la consulta preparada";
    if (estado) {
        estado.textContent = "Revisa la plantilla y el pedido; pulsa Enviar en WhatsApp y adjunta allí el comprobante de pago. ";
        estado.appendChild(enlace);
    }
    // Abrir en el tab actual evita que los bloqueadores de pop-ups intercepten
    // la salida. El enlace visible queda como alternativa si la navegación falla.
    try {
        window.location.assign(url);
    } catch (error) {
        if (estado) {
            estado.insertAdjacentText("afterbegin", "No se pudo abrir automáticamente. Usa este enlace: ");
        }
    }
}

function procesarPedidoPersonalizado(e) {
    e.preventDefault();

    const nombres = document.getElementById("order-client-name").value.trim();
    const apellidos = document.getElementById("order-client-lastname").value.trim();
    const correo = document.getElementById("order-client-email").value.trim();
    const pais = document.getElementById("order-client-country").value.trim();
    const telefono = document.getElementById("order-client-phone").value.trim();
    const servicio = document.getElementById("order-service-type").value;
    const cancion = document.getElementById("order-track-name").value.trim();
    const artista = document.getElementById("order-artist-name").value.trim();
    const version = document.getElementById("order-version-name").value.trim();
    const tonalidadBpm = document.getElementById("order-key-bpm").value.trim();
    const referencia = document.getElementById("order-link-ref").value.trim();
    const notas = document.getElementById("order-instructions").value.trim();

    const mensaje = `Hola, ONLY LORD.\n` +
                    `Quiero consultar sobre: *${servicio}*. Esta solicitud no es una contratación ni un pago.\n\n` +
                    `👤 *Datos del Cliente:*\n` +
                    `• Nombre: ${nombres}${apellidos ? " " + apellidos : ""}\n` +
                    `• Correo: ${correo}\n` +
                    `• País: ${pais || "No indicado"}\n` +
                    `• WhatsApp/teléfono: ${telefono || "No indicado"}\n\n` +
                    `🎵 *Canción o proyecto:* ${cancion}\n` +
                    `🎤 *Artista:* ${artista || "No indicado"}\n` +
                    `💿 *Versión / Concierto:* ${version || "No indicado"}\n` +
                    `🎼 *Tonalidad / BPM:* ${tonalidadBpm || "No indicado"}\n` +
                    `🔗 *Enlace de Referencia:* ${referencia ? referencia : "No especificado"}\n\n` +
                    `📝 *Indicaciones Especiales:*\n"${notas}"\n\n` +
                    `Por favor, indica el alcance, precio, plazo estimado, formato de entrega y modificaciones incluidas. Aceptaré expresamente el presupuesto antes de pagar o iniciar el trabajo.`;

    const url = `https://wa.me/${MI_TELEFONO_WHATSAPP}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, "_blank", "noopener");
    const estado = document.getElementById("order-whatsapp-status");
    if (estado) {
        estado.textContent = "WhatsApp se abrirá con la consulta preparada. Aún no se ha enviado. Si no se abre, ";
        const enlace = document.createElement("a");
        enlace.href = url;
        enlace.target = "_blank";
        enlace.rel = "noopener noreferrer";
        enlace.textContent = "abre el mensaje aquí";
        estado.appendChild(enlace);
        estado.appendChild(document.createTextNode("."));
    }
}

function cargarDatosEnElMoldeDetalle() {
    const datosJSON = sessionStorage.getItem("multitrack_detalle_actual");
    if (!datosJSON) { window.location.href = "multitracks.html"; return; }

    let productoGuardado;
    try {
        productoGuardado = JSON.parse(datosJSON);
    } catch (error) {
        window.location.href = "multitracks.html";
        return;
    }
    const track = LIBRERIA_MULTITRACKS.find(producto => producto.id === productoGuardado.id);
    if (!track) { window.location.href = "multitracks.html"; return; }
    document.getElementById("detail-track-title").innerText = track.titulo;
    document.getElementById("detail-track-artist").innerText = track.artista;

    const iframeVideo = document.getElementById("detail-video-iframe");
    if (iframeVideo) {
        const inicio = track.ytStart ? `&start=${track.ytStart}` : "";
        iframeVideo.src = `https://www.youtube.com/embed/${track.ytId}?rel=0&autoplay=0${inicio}`;
    }

    const contenedorStems = document.getElementById("detail-stems-container");
    if (contenedorStems) {
        contenedorStems.replaceChildren();
        track.stems.forEach(stem => {
            const div = document.createElement("div");
            div.className = "stem-item";
            div.textContent = stem;
            contenedorStems.appendChild(div);
        });
    }

    const elPrecio = document.getElementById("detail-track-price");
    if (elPrecio) {
        const precio = document.createElement("strong");
        precio.textContent = formatearPrecioUSD(track.precio);
        elPrecio.replaceChildren(precio);
    }

    const setSpec = (id, value) => {
        const el = document.getElementById(id);
        if (el) el.textContent = value || "—";
    };
    setSpec("detail-spec-acorde", track.acorde);
    setSpec("detail-spec-tempo", track.tempo);
    setSpec("detail-spec-tracks-count", `${track.cantidadTracks} Tracks`);
    setSpec("detail-spec-weight", `${track.pesoTrack} c/u`);
    setSpec("detail-spec-distribution", track.distribucion || "No especificada");

    const btnCarrito = document.getElementById("btn-add-to-cart-action");
    if (btnCarrito) btnCarrito.addEventListener("click", () => añadirAlCarritoLocal(track.id, track.titulo, "Multitrack Premium", track.precio));

    const recomendados = ["estoy-convencido", "intro-nuestro-dios", "padre-bueno", "medley-celebra-victorioso"]
        .filter(id => id !== track.id)
        .map(id => LIBRERIA_MULTITRACKS.find(producto => producto.id === id))
        .filter(Boolean)
        .slice(0, 4);
    if (recomendados.length) renderizarTarjetasTienda(recomendados, "recommendations-grid");
}
