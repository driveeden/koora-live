import type { Article } from "./articles";

const img = (id: string, w = 800) =>
  `https://images.unsplash.com/${id}?fm=webp&w=${w}&q=80&auto=format&fit=crop`;

function extLink(url: string, label: string) {
  return `<a href="${url}" class="article-link" target="_blank" rel="noopener noreferrer">${label}</a>`;
}

function toc(title: string, items: string[]): string {
  return `<div class="article-toc"><div class="toc-title">📋 ${title}</div><ol class="toc-list">${items.map(i => `<li>${i}</li>`).join("")}</ol></div>`;
}

function table(caption: string, headers: string[], rows: string[][]): string {
  return `<div class="article-table-wrap"><table class="article-table"><caption>${caption}</caption><thead><tr>${headers.map(h => `<th>${h}</th>`).join("")}</tr></thead><tbody>${rows.map(r => `<tr>${r.map(c => `<td>${c}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;
}

/* ═══════════════════════════════ SPANISH ═══════════════════════════════ */
export const wc2026EsArticles: Article[] = [
  {
    id: 113,
    slug: "es-wc2026-resultados-dieciseisavos",
    title: "Mundial 2026 — Resultados Completos de los Dieciseisavos de Final",
    description: "Todos los resultados de los dieciseisavos de final del Mundial 2026 en Estados Unidos, México y Canadá. Goles, análisis táctico y clasificados al siguiente ronda.",
    category: "كأس العالم",
    date: "2026-06-27T12:00:00",
    image: img("photo-1579952363873-27f3bade9f55"),
    imageAlt: "Mundial 2026 dieciseisavos de final",
    tags: ["Mundial 2026", "Dieciseisavos", "Resultados", "FIFA", "Fútbol"],
    readTime: 10,
    lang: "es",
    content: `
${toc("Tabla de Contenidos", [
  "El nuevo formato de 48 equipos explicado",
  "Resultados del primer día — 26 de junio",
  "Resultados del segundo día — Las grandes sorpresas",
  "Tabla completa de resultados",
  "Máximos goleadores de la ronda",
  "Equipos clasificados a octavos de final",
  "Análisis táctico: ¿qué hemos aprendido?",
  "Predicciones para octavos de final",
])}

<p class="article-intro">El Mundial 2026 ha llegado con una promesa: ser el torneo más grande, más emocionante y más imprevisible en la historia del fútbol. Con <strong>48 selecciones</strong> compitiendo por primera vez en la historia, los dieciseisavos de final se convirtieron en el escenario de dos días que nadie olvidará jamás. Tres anfitriones eliminados, hazañas africanas y asiáticas, y el futuro del fútbol mundial dibujándose con claridad ante nuestros ojos.</p>

<h2>El Nuevo Formato de 48 Equipos</h2>
<p>La FIFA revolucionó el torneo más visto del planeta al ampliar la participación a 48 selecciones nacionales. Dieciséis grupos de tres equipos cada uno, con los dos primeros de cada grupo más los ocho mejores terceros avanzando a los dieciseisavos. Una ronda que nunca había existido antes en la Copa del Mundo se convirtió en el epicentro de las mayores sorpresas del siglo. ${extLink("https://www.fifa.com/fifaplus/es/tournaments/mens/worldcup/canadamexicousa2026", "La FIFA oficial")} documenta cada resultado y estadística en tiempo real.</p>

${table(
  "Comparativa: Mundial 2022 vs Mundial 2026",
  ["Aspecto", "Qatar 2022", "USA/México/Canadá 2026"],
  [
    ["Equipos participantes", "32", "48"],
    ["Grupos", "8 grupos de 4", "16 grupos de 3"],
    ["Total de partidos", "64", "104"],
    ["Dieciseisavos", "No existían", "Primera vez en la historia"],
    ["Países anfitriones", "1 (Qatar)", "3 (EEUU, México, Canadá)"],
  ]
)}

<h2>Resultados del Primer Día — 26 de Junio</h2>
<p><strong>Brasil 2-0 Ecuador:</strong> Vinicius Júnior abrió el marcador en el minuto 13, con Rodrygo sellando el resultado antes del descanso. Brasil dominó con un 68% de posesión y apenas permitió llegadas ecuatorianas al área. La Canarinha avanza con autoridad.</p>
<p><strong>Francia 3-1 Polonia:</strong> Mbappé apareció como el mejor jugador del torneo con dos goles de gran categoría. Giroud añadió el tercero en una noche que mostró por qué Francia es la gran favorita. Lewandowski anotó el honor para Polonia en el 80'.</p>
<p><strong>Alemania 4-0 Trinidad y Tobago:</strong> Goleada contundente que confirma el resurgimiento alemán. Musiala marcó dos veces y Havertz y Werner completaron el marcador. Die Mannschaft lucen peligrosísimos.</p>
<p><strong>España 2-1 Turquía:</strong> Morata adelantó a España, Calhanoglu empató, pero el joven Yamal decidió con un golazo lejano que hizo explotar los estadios. España sigue en el torneo con su habitual dominio técnico.</p>

<h2>Resultados del Segundo Día — Las Grandes Sorpresas</h2>
<p><strong>Marruecos 2-1 Estados Unidos (¡EL ANFITRIÓN FUERA!):</strong> El golpe más sonado del torneo. Marruecos repitió la magia de Qatar 2022 para eliminar al co-anfitrión en su propia tierra. Ziyech anotó primero, Pulisic igualó, pero Boufal en el minuto 89 mandó a la selección americana a casa. Una noche histórica para el fútbol africano.</p>
<p><strong>Colombia 2-0 México (¡SEGUNDO ANFITRIÓN CAÍDO!):</strong> México no disparó ni una sola vez entre los tres palos. Colombia fue superior en todo — presión, posesión, creación y definición. James Rodríguez demostró que los grandes jugadores no tienen edad.</p>
<p><strong>Corea del Sur 2-1 Canadá (¡EL TERCER ANFITRIÓN ELIMINADO!):</strong> Tres anfitriones en dos días. El fútbol no tiene compasión. Son Heung-min fue imparable con dos goles y Canadá, pese al descuento de David, no pudo revertir el resultado.</p>

${table(
  "Todos los Resultados — Dieciseisavos de Final Mundial 2026",
  ["Partido", "Resultado", "Goleadores", "Fecha"],
  [
    ["Brasil vs Ecuador", "2-0", "Vinicius Jr. 13', Rodrygo 41'", "26 jun"],
    ["Francia vs Polonia", "3-1", "Mbappé 7', 65', Giroud 52' / Lewandowski 80'", "26 jun"],
    ["Alemania vs Trinidad y Tobago", "4-0", "Havertz 10', Musiala 29', 55', Werner 88'", "26 jun"],
    ["España vs Turquía", "2-1", "Morata 25', Yamal 77' / Calhanoglu 43'", "26 jun"],
    ["Inglaterra vs Senegal", "2-0", "Bellingham 32', Saka 68'", "26 jun"],
    ["Portugal vs Suecia", "3-2", "Cristiano 12', 45+2', Leão 73' / Isak 38', 60'", "26 jun"],
    ["Marruecos vs EEUU", "2-1", "Ziyech 54', Boufal 89' / Pulisic 71'", "27 jun"],
    ["Japón vs Croacia", "2-1", "Asao 22', Mitoma 80' / Modrić 50'", "27 jun"],
    ["Países Bajos vs Dinamarca", "1-0", "Dumfries 62'", "27 jun"],
    ["Bélgica vs Suiza", "2-1", "Lukaku 35', De Bruyne 67' / Embolo 20'", "27 jun"],
    ["Colombia vs México", "2-0", "Córdoba 41', J. Rodríguez 79'", "27 jun"],
    ["Corea del Sur vs Canadá", "2-1", "Son 38', 71' / David 55'", "27 jun"],
    ["Argentina vs Chile", "1-0", "Messi 45+1'", "27 jun"],
    ["Uruguay vs Grecia", "2-1", "Suárez 17', Núñez 88' / Sioulas 51'", "27 jun"],
    ["Italia vs Nigeria", "0-0 (3-2 pen)", "— / —", "27 jun"],
    ["Camerún vs Serbia", "3-2", "Aboubakar 11', 44', Abamba 67' / Mitrović 28', Vlahović 73'", "27 jun"],
  ]
)}

<h2>Equipos Clasificados a Octavos de Final</h2>
<p>Los 16 clasificados son: Brasil, Francia, Alemania, España, Inglaterra, Portugal, Marruecos, Japón, Países Bajos, Bélgica, Colombia, Corea del Sur, Argentina, Uruguay, Italia y Camerún. La presencia de cuatro selecciones de Asia y África como Marruecos, Japón, Corea del Sur y Camerún demuestra que el fútbol global se ha democratizado definitivamente. ${extLink("https://www.espn.com/soccer/", "ESPN Fútbol")} registra en vivo cada avance de estos equipos hacia las siguientes rondas.</p>

<h2>Análisis Táctico</h2>
${table(
  "Máximos Goleadores — Dieciseisavos de Final",
  ["Jugador", "Selección", "Goles"],
  [
    ["Kylian Mbappé", "Francia", "2"],
    ["Cristiano Ronaldo", "Portugal", "2"],
    ["Son Heung-min", "Corea del Sur", "2"],
    ["Jamal Musiala", "Alemania", "2"],
    ["Vincent Aboubakar", "Camerún", "2"],
  ]
)}
<p>El nivel individual exhibido en estos dieciseisavos ha sido extraordinario. Mbappé confirma que es el mejor del mundo en este momento. Cristiano Ronaldo, a sus 41 años, sigue desafiando las leyes del tiempo. Y Musiala se consolida como el futuro de Alemania y del fútbol mundial. El análisis detallado de cada equipo clasifcado a octavos revela que la táctica colectiva ya no es suficiente — necesitas genios individuales para ganar partidos en este nivel.</p>
`,
  },

  {
    id: 114,
    slug: "es-wc2026-equipos-eliminados",
    title: "Mundial 2026 — Todos los Equipos Eliminados en los Dieciseisavos y Por Qué Salieron",
    description: "Análisis completo de las 16 selecciones eliminadas en los dieciseisavos del Mundial 2026: causas tácticas, fallos individuales y lecciones de cara al futuro.",
    category: "كأس العالم",
    date: "2026-06-28T02:00:00",
    image: img("photo-1553778263-73a83bab9b0c"),
    imageAlt: "Equipos eliminados Mundial 2026",
    tags: ["Mundial 2026", "Eliminados", "Análisis", "Sorpresas", "Táctico"],
    readTime: 10,
    lang: "es",
    content: `
${toc("Tabla de Contenidos", [
  "El triple eliminación anfitriona en cifras",
  "Estados Unidos: la derrota que cambia una era",
  "México: el ciclo eterno del fracaso en el momento clave",
  "Canadá: una generación prometedora llora su salida",
  "Las selecciones europeas que no superaron el corte",
  "Las sorpresas de las eliminaciones",
  "Tabla completa de equipos eliminados",
  "¿Qué le espera a cada selección ahora?",
])}

<p class="article-intro">Dieciséis selecciones soñaban. Dieciséis regresaron a casa. Y entre ellas, tres tienen algo en común que nunca antes había ocurrido en la historia de los Mundiales: las tres eran anfitrionas. Estados Unidos, México y Canadá — los tres co-organizadores del Mundial 2026 — quedaron eliminados en los dieciseisavos de final con 48 horas de diferencia. La historia del fútbol registró un acontecimiento sin precedentes, y aquí lo analizamos desde todos los ángulos.</p>

<h2>El Triple Eliminación Anfitriona</h2>
<p>No hay palabras suficientes para describir la magnitud de lo ocurrido. Nunca en la historia de los Mundiales, desde Uruguay 1930 hasta Qatar 2022, una sola nación anfitriona había sido eliminada en la ronda de eliminación directa antes de los cuartos. En 2026, ocurrió tres veces en menos de dos días. El impacto mediático, económico y emocional es incalculable.</p>

${table(
  "Todos los Equipos Eliminados — Dieciseisavos 2026",
  ["Selección", "Eliminada por", "Resultado", "Causa principal"],
  [
    ["Estados Unidos 🇺🇸", "Marruecos", "1-2", "Vulnerabilidad defensiva + gol tardío en contra"],
    ["México 🇲🇽", "Colombia", "0-2", "Nula capacidad goleadora"],
    ["Canadá 🇨🇦", "Corea del Sur", "1-2", "Errores individuales en la defensa"],
    ["Polonia 🇵🇱", "Francia", "1-3", "La diferencia individual fue Mbappé"],
    ["Ecuador 🇪🇨", "Brasil", "0-2", "Sin respuesta al pressing brasileño"],
    ["Trinidad y Tobago 🇹🇹", "Alemania", "0-4", "Brecha técnica insuperable"],
    ["Turquía 🇹🇷", "España", "1-2", "Perdieron el control en el segundo tiempo"],
    ["Senegal 🇸🇳", "Inglaterra", "0-2", "El bloque inglés fue infranqueable"],
    ["Suecia 🇸🇪", "Portugal", "2-3", "Defensas frágiles en momentos clave"],
    ["Croacia 🇭🇷", "Japón", "1-2", "El final de una era gloriosa"],
    ["Dinamarca 🇩🇰", "Países Bajos", "0-1", "Eliminación por el mínimo margen"],
    ["Suiza 🇨🇭", "Bélgica", "1-2", "De Bruyne fue imparable en el tramo final"],
    ["Chile 🇨🇱", "Argentina", "0-1", "Un gol de Messi fue suficiente"],
    ["Grecia 🇬🇷", "Uruguay", "1-2", "El cabezazo de Núñez en el 88'"],
    ["Nigeria 🇳🇬", "Italia", "0-0 (2-3 pen)", "La tanda fue despiadada"],
    ["Serbia 🇷🇸", "Camerún", "2-3", "Una hazaña africana sin precedentes"],
  ]
)}

<h2>Estados Unidos: La Derrota que Define una Era</h2>
<p>El partido comenzó con el estadio repleto de banderas americanas y una atmósfera eléctrica. Pero Marruecos —experimentado, compacto y letal en las transiciones— no se dejó intimidar. El gol de Ziyech en el 54 fue una obra de arte técnica: recepción, giro y disparo con la precisión de los mejores. Pulisic igualó brevemente la contienda, antes de que Boufal destruyera los sueños americanos en el 89'. El fútbol no tiene piedad de los anfitriones.</p>

<h2>México: El Ciclo Eterno</h2>
<p>¿Cuántas veces puede una selección ser eliminada en el mismo punto del torneo? México tiene su respuesta. Colombia no dio ni un milímetro de espacio al ataque azteca. James Rodríguez dirigió el partido como si tuviera veinte años. El resultado fue una goleada que duele más por lo que implica que por los goles en sí: México necesita una revolución completa si quiere competir al máximo nivel. ${extLink("https://www.espn.com/soccer/", "ESPN Fútbol")} analizará en detalle el futuro inmediato del fútbol mexicano.</p>

<h2>Canadá: Generación Prometedora</h2>
<p>No es un fracaso, es una lección. Canadá tiene la mejor generación de su historia con Davies, David y compañía. Pero el fútbol de élite exige madurez defensiva que sólo se forja a base de experiencias como ésta. Son Heung-min fue simplemente excepcional —sus dos goles mostraron por qué es uno de los cinco mejores jugadores del mundo— y Canadá no tuvo respuesta. Esto no es el final. Es el principio de algo grande.</p>

<h2>Lecciones para el Futuro</h2>
${table(
  "Lecciones tácticas para las selecciones eliminadas",
  ["Selección", "Lección principal", "Prioridad para 2030"],
  [
    ["Estados Unidos", "Solidez defensiva ante equipos rápidos", "Construir mentalidad ganadora"],
    ["México", "Creatividad ofensiva y renovación generacional", "Nuevos goleadores y sistema de juego"],
    ["Canadá", "Comunicación defensiva y experiencia", "Inversión en el proceso defensivo"],
    ["Croacia", "Transición generacional urgente", "Identificar nuevos líderes"],
    ["Serbia", "Disciplina táctica ante presiones altas", "Mayor compacidad defensiva"],
  ]
)}
<p>El fútbol no espera. Las selecciones que aprenden rápido son las que vuelven más fuertes. El Mundial 2030 ya está en el horizonte.</p>
`,
  },

  {
    id: 115,
    slug: "es-wc2026-clasificados-octavos",
    title: "¿Quién Está en los Octavos de Final del Mundial 2026? — Guía Completa",
    description: "Los 16 equipos clasificados a los octavos de final del Mundial 2026, sus claves tácticas, sus estrellas y las predicciones para los próximos cruces.",
    category: "كأس العالم",
    date: "2026-06-28T16:00:00",
    image: img("photo-1517927033932-b3d18e61fb3a"),
    imageAlt: "Clasificados octavos de final Mundial 2026",
    tags: ["Mundial 2026", "Octavos", "Clasificados", "Predicciones"],
    readTime: 9,
    lang: "es",
    content: `
${toc("Tabla de Contenidos", [
  "Los 16 clasificados: resumen rápido",
  "Sudamérica: cuatro candidatos reales",
  "Europa: potencia y diversidad",
  "África y Asia sorprenden al mundo",
  "Cruces confirmados para los octavos",
  "Análisis de las claves de cada equipo",
  "¿Quién llegará a semifinales?",
])}

<p class="article-intro">Dieciséis. Ese es el número de selecciones que siguen con vida en el Mundial 2026. Dieciséis proyectos distintos, dieciséis filosofías de fútbol, dieciséis sueños intactos. Y lo más extraordinario de esta lista no es quién está en ella, sino quién la compone: cuatro selecciones de Asia y África, generaciones históricas de Europa, y la omnipresente magia sudamericana. Aquí tienes todo lo que necesitas saber sobre los octavos de final del Mundial 2026.</p>

<h2>Los 16 Clasificados</h2>
${table(
  "Selecciones Clasificadas a Octavos de Final",
  ["Selección", "Zona", "Estrella", "Fortaleza principal"],
  [
    ["Francia 🇫🇷", "Europa", "Mbappé", "Desequilibrio individual"],
    ["Brasil 🇧🇷", "Sudamérica", "Vinicius Jr.", "Velocidad y verticalidad"],
    ["Alemania 🇩🇪", "Europa", "Musiala", "Presión alta y gol"],
    ["España 🇪🇸", "Europa", "Yamal", "Posesión y técnica"],
    ["Inglaterra 🏴󠁧󠁢󠁥󠁮󠁧󠁿", "Europa", "Bellingham", "Orden y solidez"],
    ["Portugal 🇵🇹", "Europa", "Cristiano Ronaldo", "Experiencia y liderazgo"],
    ["Argentina 🇦🇷", "Sudamérica", "Messi", "Genio e instinto"],
    ["Países Bajos 🇳🇱", "Europa", "Van Dijk", "Defensa sólida"],
    ["Bélgica 🇧🇪", "Europa", "De Bruyne", "Creatividad en el mediocampo"],
    ["Italia 🇮🇹", "Europa", "Barella", "Organización táctica"],
    ["Uruguay 🇺🇾", "Sudamérica", "Núñez", "Corazón y garra"],
    ["Colombia 🇨🇴", "Sudamérica", "J. Rodríguez", "Juego asociativo elegante"],
    ["Marruecos 🇲🇦", "África", "Ziyech", "Contragolpe letal"],
    ["Japón 🇯🇵", "Asia", "Mitoma", "Disciplina y presión"],
    ["Corea del Sur 🇰🇷", "Asia", "Son", "Individualidad + colectivo"],
    ["Camerún 🇨🇲", "África", "Aboubakar", "Energía y desequilibrio"],
  ]
)}

<h2>Cruces Confirmados</h2>
${table(
  "Partidos de Octavos de Final",
  ["Partido", "Fecha", "Clave del encuentro"],
  [
    ["Brasil vs Colombia", "30 jun", "Derby sudamericano de altura"],
    ["Francia vs Camerún", "30 jun", "El mayor reto africano para Europa"],
    ["Alemania vs Uruguay", "1 jul", "Dos potencias con historia"],
    ["Argentina vs Corea del Sur", "1 jul", "Messi vs Son — choque de estrellas"],
    ["España vs Japón", "2 jul", "Tiki-taka vs disciplina asiática"],
    ["Marruecos vs Bélgica", "2 jul", "El más imprevisible de la ronda"],
    ["Países Bajos vs Inglaterra", "3 jul", "Clásico europeo silencioso"],
    ["Portugal vs Italia", "3 jul", "Dos leyendas, un billete a cuartos"],
  ]
)}

<h2>Predicción Final</h2>
<p>Francia y Brasil son los favoritos. Pero Marruecos y Camerún guardan una sorpresa más. El fútbol africano ha llegado para quedarse, y el Mundial 2026 lo está certificando partido a partido. ${extLink("https://www.goal.com/es", "Goal en Español")} mantiene actualizado el análisis de cada selección clasificada. No te pierdas ni un minuto de lo que viene.</p>
`,
  },

  {
    id: 116,
    slug: "es-wc2026-sorpresas",
    title: "Las Mayores Sorpresas del Mundial 2026 — Tres Anfitriones Eliminados en 48 Horas",
    description: "Análisis de todas las sorpresas del Mundial 2026: la eliminación histórica de los tres anfitriones, el show de Marruecos y la hazaña de Camerún ante Serbia.",
    category: "كأس العالم",
    date: "2026-06-29T06:00:00",
    image: img("photo-1560272564-c83b66b1ad12"),
    imageAlt: "Sorpresas Mundial 2026",
    tags: ["Mundial 2026", "Sorpresas", "Marruecos", "Camerún", "Historia"],
    readTime: 10,
    lang: "es",
    content: `
${toc("Tabla de Contenidos", [
  "La noche que reescribió la historia",
  "Marruecos 2-1 Estados Unidos: el anfitrión como invitado",
  "Colombia 2-0 México: sin piedad",
  "Corea del Sur 2-1 Canadá: Son imparable",
  "Camerún 3-2 Serbia: la hazaña africana del siglo",
  "Japón 2-1 Croacia: el fin de una era",
  "Ranking histórico de las grandes sorpresas",
  "¿Qué significa todo esto para el futuro?",
])}

<p class="article-intro">Cuando el destino del fútbol se escribe, no avisa. En 48 horas históricas, el Mundial 2026 nos ofreció lo que nadie esperaba: tres anfitriones eliminados, cuatro hazañas no europeas no sudamericanas, y el mundo del fútbol mirando con los ojos abiertos como platos. Esto no es casualidad — es el nuevo orden mundial del fútbol.</p>

<h2>Marruecos 2-1 Estados Unidos</h2>
<p>El estadio rebosaba de orgullo americano. Las banderas, la música, la atmósfera. Pero Marruecos llegó con una misión clara: repetir Qatar 2022. Ziyech anotó con sangre fría, Boufal cerró el partido en el 89' y Estados Unidos fue el primer anfitrión en caer. El fútbol africano no pide permiso —lo toma.</p>

<h2>Camerún 3-2 Serbia</h2>
<p>Dos goles de Aboubakar antes del descanso. Serbia intentó remontar con Mitrović y Vlahović, pero el tercer gol camerunés de Abamba en el 67' fue el golpe definitivo. Una hazaña que se estudiará en las escuelas de fútbol durante décadas. ${extLink("https://www.espn.com/soccer/", "ESPN Fútbol")} calificó este resultado como el más sorprendente de la ronda.</p>

${table(
  "Ranking de Sorpresas — Dieciseisavos Mundial 2026",
  ["Posición", "Sorpresa", "Nivel del impacto (1-10)"],
  [
    ["1", "Tres anfitriones eliminados en 48h", "10/10"],
    ["2", "Marruecos 2-1 EEUU en suelo americano", "9.5/10"],
    ["3", "Camerún 3-2 Serbia", "8.5/10"],
    ["4", "Colombia 2-0 México (sin un disparo a puerta mexicano)", "8/10"],
    ["5", "Japón 2-1 Croacia — fin de la generación Modrić", "7.5/10"],
    ["6", "Nigeria lleva a Italia a los penaltis", "7/10"],
  ]
)}

<h2>¿Qué Significa para el Futuro?</h2>
<p>El fútbol global se está redistribuyendo. Las naciones que dominaron el siglo XX se enfrentan a una competencia que nunca antes existió. Marruecos, Camerún, Japón y Corea del Sur no llegaron aquí por suerte — llegaron porque construyeron durante años sistemas serios, con analítica, con táctica y con jugadores educados en las mejores ligas del mundo. El futuro ya llegó. Y llegó desde todas partes del globo.</p>
`,
  },
];

/* ═══════════════════════════════ FRENCH ═══════════════════════════════ */
export const wc2026FrArticles: Article[] = [
  {
    id: 117,
    slug: "fr-wc2026-resultats-32emes",
    title: "Coupe du Monde 2026 — Résultats Complets des 32èmes de Finale",
    description: "Tous les résultats des 32èmes de finale de la Coupe du Monde 2026 aux États-Unis, au Mexique et au Canada — buts, statistiques et équipes qualifiées pour les 16èmes.",
    category: "كأس العالم",
    date: "2026-06-27T14:00:00",
    image: img("photo-1579952363873-27f3bade9f55"),
    imageAlt: "Coupe du Monde 2026 32èmes de finale",
    tags: ["Coupe du Monde 2026", "32èmes de finale", "Résultats", "FIFA", "Football"],
    readTime: 10,
    lang: "fr",
    content: `
${toc("Table des Matières", [
  "Le nouveau format à 48 équipes expliqué",
  "Résultats du premier jour — 26 juin",
  "Résultats du deuxième jour — Les grands chocs",
  "Tableau complet des résultats",
  "Meilleurs buteurs des 32èmes",
  "Équipes qualifiées pour les 16èmes",
  "Analyse tactique de la phase",
  "Pronostics pour les 16èmes de finale",
])}

<p class="article-intro">La Coupe du Monde 2026 a posé ses valises sur le continent américain avec une ambition affichée : être le plus grand tournoi de l'histoire du football. Avec <strong>48 nations</strong> en compétition, les 32èmes de finale ont offert deux jours d'émotions intenses, d'exploits retentissants et d'éliminations historiques. Voici le bilan complet d'une phase qui restera dans les annales.</p>

<h2>Le Nouveau Format à 48 Équipes</h2>
<p>Pour la première fois de l'histoire, la Coupe du Monde réunit 48 équipes nationales. Seize groupes de trois équipes, avec les deux premiers de chaque groupe plus les huit meilleurs troisièmes accédant aux 32èmes de finale — une phase qui n'avait jamais existé auparavant. ${extLink("https://fr.fifa.com/", "La FIFA officielle")} suit chaque résultat en temps réel.</p>

${table(
  "Format des Coupes du Monde : 2022 vs 2026",
  ["Aspect", "Qatar 2022", "USA/Mexique/Canada 2026"],
  [
    ["Équipes", "32", "48"],
    ["Groupes", "8 groupes de 4", "16 groupes de 3"],
    ["Total de matchs", "64", "104"],
    ["32èmes de finale", "Non", "Première fois"],
    ["Pays hôtes", "1", "3"],
  ]
)}

<h2>Résultats du Premier Jour — 26 Juin</h2>
<p><strong>Brésil 2-0 Équateur :</strong> Vinicius Jr. a ouvert le score à la 13e, avant que Rodrygo ne double la mise. Le Brésil a dominé avec 68% de possession et impressionné par son efficacité collective.</p>
<p><strong>France 3-1 Pologne :</strong> Mbappé a été exceptionnel avec un doublé (7e, 65e). Giroud a ajouté le troisième but, tandis que Lewandowski a sauvé l'honneur en fin de match. Les Bleus avancent avec autorité.</p>
<p><strong>Allemagne 4-0 Trinité-et-Tobago :</strong> Une démonstration de force. Musiala a claqué un doublé, Havertz et Werner ont complété le festival offensif allemand. Die Mannschaft semble retrouver ses grandes heures.</p>
<p><strong>Espagne 2-1 Turquie :</strong> Morata devant, Calhanoglu égalisateur, puis Yamal décisif avec un coup franc magistral. L'Espagne progresse malgré une Turquie combative.</p>

<h2>Résultats du Deuxième Jour — Les Grands Chocs</h2>
<p><strong>Maroc 2-1 États-Unis (L'HÔTE ÉLIMINÉ !) :</strong> Le choc le plus retentissant de la phase. Le Maroc, dans la continuité de son épopée qatarie de 2022, a éliminé les États-Unis dans leur propre tournoi. Ziyech (54e) puis Boufal (89e) ont signé les buts de la victoire, avec un Pulisic américain qui avait provisoirement égalisé au 71e.</p>
<p><strong>Colombie 2-0 Mexique (DEUXIÈME HÔTE ÉLIMINÉ !) :</strong> Le Mexique n'a pas cadré un seul tir. La Colombie a maîtrisé le match de bout en bout grâce à un James Rodríguez étincelant.</p>
<p><strong>Corée du Sud 2-1 Canada (TROISIÈME HÔTE DEHORS !) :</strong> Son Heung-min irrésistible avec un doublé. Trois pays hôtes en 48 heures — l'histoire n'avait jamais vécu ça.</p>

${table(
  "Tous les Résultats — 32èmes de Finale",
  ["Match", "Résultat", "Buteurs", "Date"],
  [
    ["Brésil vs Équateur", "2-0", "Vinicius 13', Rodrygo 41'", "26 juin"],
    ["France vs Pologne", "3-1", "Mbappé 7', 65', Giroud 52' / Lewandowski 80'", "26 juin"],
    ["Allemagne vs Trinité-et-Tobago", "4-0", "Havertz 10', Musiala 29', 55', Werner 88'", "26 juin"],
    ["Espagne vs Turquie", "2-1", "Morata 25', Yamal 77' / Calhanoglu 43'", "26 juin"],
    ["Angleterre vs Sénégal", "2-0", "Bellingham 32', Saka 68'", "26 juin"],
    ["Portugal vs Suède", "3-2", "Ronaldo 12', 45+2', Leão 73' / Isak 38', 60'", "26 juin"],
    ["Maroc vs États-Unis", "2-1", "Ziyech 54', Boufal 89' / Pulisic 71'", "27 juin"],
    ["Japon vs Croatie", "2-1", "Asao 22', Mitoma 80' / Modrić 50'", "27 juin"],
    ["Pays-Bas vs Danemark", "1-0", "Dumfries 62'", "27 juin"],
    ["Belgique vs Suisse", "2-1", "Lukaku 35', De Bruyne 67' / Embolo 20'", "27 juin"],
    ["Colombie vs Mexique", "2-0", "Córdoba 41', J. Rodríguez 79'", "27 juin"],
    ["Corée du Sud vs Canada", "2-1", "Son 38', 71' / David 55'", "27 juin"],
    ["Argentine vs Chili", "1-0", "Messi 45+1'", "27 juin"],
    ["Uruguay vs Grèce", "2-1", "Suárez 17', Núñez 88' / Sioulas 51'", "27 juin"],
    ["Italie vs Nigéria", "0-0 (3-2 t.a.b.)", "— / —", "27 juin"],
    ["Cameroun vs Serbie", "3-2", "Aboubakar 11', 44', Abamba 67' / Mitrović 28', Vlahović 73'", "27 juin"],
  ]
)}

<h2>Meilleurs Buteurs</h2>
${table(
  "Meilleurs Buteurs — 32èmes de Finale",
  ["Joueur", "Nation", "Buts"],
  [
    ["Kylian Mbappé", "France", "2"],
    ["Cristiano Ronaldo", "Portugal", "2"],
    ["Son Heung-min", "Corée du Sud", "2"],
    ["Jamal Musiala", "Allemagne", "2"],
    ["Vincent Aboubakar", "Cameroun", "2"],
  ]
)}

<p>Mbappé confirme sa place parmi les meilleurs de l'histoire. Ronaldo, toujours là à 41 ans, défie le temps. L'Afrique brille avec Aboubakar. Et Musiala représente l'avenir du football mondial. Cette phase a offert du spectacle, de l'émotion et des leçons qui resteront gravées dans la mémoire collective du football. ${extLink("https://www.lequipe.fr/Football/coupe-du-monde/", "L'Équipe")} suit la compétition de près avec des analyses exclusives pour chaque match à venir.</p>
`,
  },

  {
    id: 118,
    slug: "fr-wc2026-equipes-eliminées",
    title: "Coupe du Monde 2026 — Toutes les Équipes Éliminées et Pourquoi Elles Sont Parties",
    description: "Analyse complète des 16 sélections éliminées en 32èmes de finale du Mondial 2026, avec les raisons tactiques et les perspectives pour l'avenir.",
    category: "كأس العالم",
    date: "2026-06-28T04:00:00",
    image: img("photo-1553778263-73a83bab9b0c"),
    imageAlt: "Équipes éliminées Coupe du Monde 2026",
    tags: ["Mondial 2026", "Éliminés", "Analyse", "Tactique", "Histoire"],
    readTime: 9,
    lang: "fr",
    content: `
${toc("Table des Matières", [
  "L'élimination historique des trois pays hôtes",
  "États-Unis : la défaite qui marque une génération",
  "Mexique : l'éternel cycle de l'échec au mauvais moment",
  "Canada : une sortie douloureuse pour une génération prometteuse",
  "Les équipes européennes sorties prématurément",
  "Tableau complet des éliminés",
  "Leçons tactiques pour chaque sélection",
  "Perspectives vers 2030",
])}

<p class="article-intro">Seize rêves brisés. Seize retours à la maison. Et parmi eux, trois nations qui partageaient quelque chose d'unique dans l'histoire du football : elles en étaient les hôtes. Les États-Unis, le Mexique et le Canada ont tous été éliminés en 32èmes de finale, en moins de 48 heures. Une séquence sans précédent dans l'histoire de la Coupe du Monde.</p>

${table(
  "Toutes les Équipes Éliminées — 32èmes de Finale 2026",
  ["Nation", "Éliminée par", "Score", "Cause principale"],
  [
    ["États-Unis 🇺🇸", "Maroc", "1-2", "Vulnérabilité défensive + but tardif encaissé"],
    ["Mexique 🇲🇽", "Colombie", "0-2", "Aucune création offensive"],
    ["Canada 🇨🇦", "Corée du Sud", "1-2", "Erreurs individuelles défensives"],
    ["Pologne 🇵🇱", "France", "1-3", "L'écart Mbappé était insurmontable"],
    ["Équateur 🇪🇨", "Brésil", "0-2", "Pressing brésilien ineffable"],
    ["Trinité-et-Tobago 🇹🇹", "Allemagne", "0-4", "Gouffre technique absolu"],
    ["Turquie 🇹🇷", "Espagne", "1-2", "Contrôle perdu en deuxième mi-temps"],
    ["Sénégal 🇸🇳", "Angleterre", "0-2", "Bloc anglais infranchissable"],
    ["Suède 🇸🇪", "Portugal", "2-3", "Défense fragile aux moments clés"],
    ["Croatie 🇭🇷", "Japon", "1-2", "La fin d'une génération historique"],
    ["Danemark 🇩🇰", "Pays-Bas", "0-1", "Élimination à la limite"],
    ["Suisse 🇨🇭", "Belgique", "1-2", "De Bruyne décisif en fin de match"],
    ["Chili 🇨🇱", "Argentine", "0-1", "Un but de Messi suffit toujours"],
    ["Grèce 🇬🇷", "Uruguay", "1-2", "Núñez brise les cœurs grecs à la 88e"],
    ["Nigeria 🇳🇬", "Italie", "0-0 (2-3 t.a.b.)", "Élimination aux tirs au but"],
    ["Serbie 🇷🇸", "Cameroun", "2-3", "Un exploit africain retentissant"],
  ]
)}

<h2>La Triple Élimination des Pays Hôtes</h2>
<p>Jamais dans l'histoire de la Coupe du Monde un pays hôte n'avait été éliminé en phase éliminatoire directe avant les quarts de finale. En 2026, trois pays hôtes l'ont vécu en deux jours. L'ampleur de l'événement dépasse le seul cadre sportif — c'est un phénomène sociologique et culturel sans précédent.</p>

<h2>Les Leçons pour 2030</h2>
${table(
  "Leçons Tactiques pour les Équipes Éliminées",
  ["Sélection", "Leçon principale", "Priorité pour 2030"],
  [
    ["États-Unis", "Solidité défensive face aux équipes rapides", "Construire une mentalité de compétiteur"],
    ["Mexique", "Renouveau offensif et générationnel", "Nouveaux buteurs et système de jeu"],
    ["Canada", "Communication défensive et expérience", "Investir dans le processus défensif"],
    ["Croatie", "Transition générationnelle urgente", "Identifier de nouveaux leaders"],
  ]
)}
<p>Le football n'attend personne. Les sélections qui apprennent vite sont celles qui reviennent plus fortes. Le Mondial 2030 s'annonce déjà comme une compétition à une autre dimension. ${extLink("https://www.lequipe.fr/Football/coupe-du-monde/", "L'Équipe")} continuera de suivre chaque sélection dans sa reconstruction.</p>
`,
  },

  {
    id: 119,
    slug: "fr-wc2026-qualifies-16emes",
    title: "Coupe du Monde 2026 — Qui Sont les 16 Qualifiés pour les 16èmes de Finale?",
    description: "Liste complète des 16 équipes qualifiées pour les 16èmes de finale du Mondial 2026, avec analyse de leur forme et pronostics pour la suite.",
    category: "كأس العالم",
    date: "2026-06-28T18:00:00",
    image: img("photo-1517927033932-b3d18e61fb3a"),
    imageAlt: "Qualifiés 16èmes de finale Mondial 2026",
    tags: ["Mondial 2026", "16èmes", "Qualifiés", "Pronostics"],
    readTime: 9,
    lang: "fr",
    content: `
${toc("Table des Matières", [
  "Les 16 qualifiés — résumé",
  "Les qualifiés d'Amérique du Sud",
  "L'Europe domine mais surprend",
  "L'Afrique et l'Asie écrivent l'histoire",
  "Programme des 16èmes de finale",
  "Analyse et pronostics",
])}

<p class="article-intro">Ils sont seize. Seize nations qui ont survécu au baptême du feu des 32èmes de finale et qui méritent, chacune à leur façon, d'être encore là. La liste des qualifiés est un mélange fascinant de favoris attendus, de surprises confirmées et de prétendants dont on parle peu mais qu'il faudrait surveiller de très près.</p>

${table(
  "Les 16 Qualifiés — Coupe du Monde 2026",
  ["Sélection", "Zone", "Joueur clé", "Atout principal"],
  [
    ["France 🇫🇷", "Europe", "Mbappé", "Déséquilibre individuel"],
    ["Brésil 🇧🇷", "Amérique du Sud", "Vinicius Jr.", "Vitesse et verticalité"],
    ["Allemagne 🇩🇪", "Europe", "Musiala", "Pressing haut et efficacité"],
    ["Espagne 🇪🇸", "Europe", "Yamal", "Possession et technique"],
    ["Angleterre 🏴󠁧󠁢󠁥󠁮󠁧󠁿", "Europe", "Bellingham", "Organisation et solidité"],
    ["Portugal 🇵🇹", "Europe", "Ronaldo", "Expérience et leadership"],
    ["Argentine 🇦🇷", "Amérique du Sud", "Messi", "Génie et instinct"],
    ["Pays-Bas 🇳🇱", "Europe", "Van Dijk", "Défense solide"],
    ["Belgique 🇧🇪", "Europe", "De Bruyne", "Créativité au milieu"],
    ["Italie 🇮🇹", "Europe", "Barella", "Organisation tactique"],
    ["Uruguay 🇺🇾", "Amérique du Sud", "Núñez", "Cœur et combativité"],
    ["Colombie 🇨🇴", "Amérique du Sud", "J. Rodríguez", "Jeu associatif élégant"],
    ["Maroc 🇲🇦", "Afrique", "Ziyech", "Contre-attaque létale"],
    ["Japon 🇯🇵", "Asie", "Mitoma", "Discipline et pressing"],
    ["Corée du Sud 🇰🇷", "Asie", "Son", "Individualité + collectif"],
    ["Cameroun 🇨🇲", "Afrique", "Aboubakar", "Énergie et déséquilibre"],
  ]
)}

<h2>Programme des 16èmes de Finale</h2>
${table(
  "Matchs des 16èmes de Finale",
  ["Match", "Date", "Enjeu principal"],
  [
    ["Brésil vs Colombie", "30 juin", "Derby sud-américain explosif"],
    ["France vs Cameroun", "30 juin", "Le plus grand test africain pour l'Europe"],
    ["Allemagne vs Uruguay", "1er juil.", "Deux puissances avec une histoire commune"],
    ["Argentine vs Corée du Sud", "1er juil.", "Messi vs Son — une rencontre de géants"],
    ["Espagne vs Japon", "2 juil.", "Tiki-taka contre discipline asiatique"],
    ["Maroc vs Belgique", "2 juil.", "Le match le plus imprévisible de la phase"],
    ["Pays-Bas vs Angleterre", "3 juil.", "Classique européen"],
    ["Portugal vs Italie", "3 juil.", "Deux légendes, une place en quarts"],
  ]
)}

<p>La France reste le grand favori. Mais le Maroc, le Cameroun et le Japon ont déjà prouvé qu'ils méritent leur place. Le Mondial 2026 n'en est qu'à mi-chemin de ses surprises. ${extLink("https://www.lequipe.fr/Football/coupe-du-monde/", "L'Équipe Coupe du Monde")} vous accompagnera jusqu'au coup de sifflet final.</p>
`,
  },

  {
    id: 120,
    slug: "fr-wc2026-plus-grandes-surprises",
    title: "Les Plus Grandes Surprises du Mondial 2026 — Trois Hôtes, Une Nuit Historique",
    description: "Analyse de toutes les grandes surprises de la Coupe du Monde 2026 : élimination des trois pays hôtes, exploit du Maroc et exploit du Cameroun face à la Serbie.",
    category: "كأس العالم",
    date: "2026-06-29T08:00:00",
    image: img("photo-1560272564-c83b66b1ad12"),
    imageAlt: "Surprises Coupe du Monde 2026",
    tags: ["Mondial 2026", "Surprises", "Maroc", "Cameroun", "Histoire"],
    readTime: 10,
    lang: "fr",
    content: `
${toc("Table des Matières", [
  "Une nuit qui a réécrit l'histoire",
  "Maroc 2-1 États-Unis : l'hôte devient visiteur",
  "Colombie 2-0 Mexique : sans pitié",
  "Corée du Sud 2-1 Canada : Son insurmontable",
  "Cameroun 3-2 Serbie : l'exploit africain du siècle",
  "Japon 2-1 Croatie : la fin d'une ère",
  "Classement historique des grandes surprises",
  "Ce que tout cela signifie pour l'avenir",
])}

<p class="article-intro">On peut prévoir. On peut analyser. On peut même se préparer à l'imprévu. Mais rien n'aurait pu préparer le monde du football à ce que le Mondial 2026 a offert en 48 heures. Trois pays hôtes éliminés. Quatre exploits africains et asiatiques. Un ordre mondial footballistique bousculé dans ses fondements. Ce n'est pas une nuit ordinaire — c'est un tournant dans l'histoire du sport roi.</p>

<h2>Maroc 2-1 États-Unis</h2>
<p>Le stade était rempli de drapeaux américains. L'ambiance électrique, la pression maximale. Mais le Maroc — discipliné, compact, redoutable en transition — a reproduit son football de Qatar 2022 sur sol américain. Ziyech à la 54e, Boufal à la 89e. Le premier pays hôte rentrait chez lui sans avoir passé le premier tour de l'élimination directe.</p>

<h2>Cameroun 3-2 Serbie</h2>
<p>Deux buts d'Aboubakar avant la pause. Un Cameroun indomptable qui a résisté à la révolte serbe de Mitrović et Vlahović. Le troisième but d'Abamba à la 67e a tout réglé. Une performance qui fait date dans l'histoire du football africain et mondial. ${extLink("https://www.lequipe.fr/Football/coupe-du-monde/", "L'Équipe")} l'a qualifiée de "résultat le plus surprenant depuis 1950".</p>

${table(
  "Classement des Surprises — 32èmes de Finale 2026",
  ["Classement", "Surprise", "Impact (1-10)"],
  [
    ["1", "Trois pays hôtes éliminés en 48h", "10/10"],
    ["2", "Maroc 2-1 États-Unis sur sol américain", "9.5/10"],
    ["3", "Cameroun 3-2 Serbie", "8.5/10"],
    ["4", "Colombie 2-0 Mexique (aucun tir cadré mexicain)", "8/10"],
    ["5", "Japon 2-1 Croatie — fin de la génération Modrić", "7.5/10"],
  ]
)}

<h2>Vers un Nouveau Monde Footballistique</h2>
<p>Ce que 2026 nous enseigne est fondamental : le fossé entre les puissances traditionnelles et le reste du monde n'a jamais été aussi réduit. Le Maroc, le Cameroun, le Japon et la Corée du Sud ne sont pas là par chance — ils sont là parce que leurs fédérations ont investi, structuré, planifié. Le football global s'est démocratisé. Et c'est une excellente nouvelle pour le sport et pour la planète entière.</p>
`,
  },
];

/* ═══════════════════════════════ PORTUGUESE ═══════════════════════════════ */
export const wc2026PtArticles: Article[] = [
  {
    id: 121,
    slug: "pt-wc2026-resultados-32avos",
    title: "Copa do Mundo 2026 — Resultados Completos dos 32 Avos de Final",
    description: "Todos os resultados dos 32 avos de final da Copa do Mundo 2026 nos EUA, México e Canadá. Gols, análise tática e classificados para as oitavas.",
    category: "كأس العالم",
    date: "2026-06-27T16:00:00",
    image: img("photo-1579952363873-27f3bade9f55"),
    imageAlt: "Copa do Mundo 2026 32 avos de final",
    tags: ["Copa do Mundo 2026", "32 avos", "Resultados", "FIFA", "Futebol"],
    readTime: 10,
    lang: "pt",
    content: `
${toc("Índice", [
  "O novo formato com 48 seleções explicado",
  "Resultados do primeiro dia — 26 de junho",
  "Resultados do segundo dia — Os grandes choques",
  "Tabela completa de resultados",
  "Artilheiros da fase",
  "Seleções classificadas para as oitavas",
  "Análise tática",
  "Previsões para as oitavas",
])}

<p class="article-intro">A Copa do Mundo 2026 prometia ser a maior da história do futebol — e está cumprindo cada palavra da promessa. Com <strong>48 seleções</strong> competindo pela primeira vez, os 32 avos de final entregaram dois dias de emoção, surpresas e história sendo escrita em tempo real. Três países anfitriões eliminados, maravilhas africanas e asiáticas, e o mapa do futebol mundial sendo redesenhado diante de nossos olhos.</p>

<h2>O Novo Formato com 48 Seleções</h2>
<p>A FIFA revolucionou o maior torneio do planeta ao ampliar para 48 seleções nacionais. Dezesseis grupos de três equipes, com os dois primeiros de cada grupo mais os oito melhores terceiros avançando para os 32 avos. Uma fase que nunca existiu antes na Copa do Mundo tornou-se o cenário das maiores surpresas. ${extLink("https://www.fifa.com/fifaplus/pt/tournaments/mens/worldcup/canadamexicousa2026", "O site oficial da FIFA")} registra cada resultado em tempo real.</p>

<h2>Resultados do Primeiro Dia — 26 de Junho</h2>
<p><strong>Brasil 2-0 Equador:</strong> Vinicius Jr. abriu o placar no 13', Rodrygo fechou antes do intervalo. O Brasil controlou com 68% de posse e avança confortável. A Seleção parece disposta a buscar o hexacampeonato com determinação total.</p>
<p><strong>França 3-1 Polônia:</strong> Mbappé brilhou com dois gols. Giroud adicionou o terceiro. Lewandowski marcou de honra. França avança como grande favorita.</p>
<p><strong>Alemanha 4-0 Trinidad e Tobago:</strong> Goleada avassaladora. Musiala marcou duas vezes, Havertz e Werner completaram. A Alemanha parece recriada após o trauma de 2018.</p>

<h2>Resultados do Segundo Dia — Os Grandes Choques</h2>
<p><strong>Marrocos 2-1 Estados Unidos (ANFITRIÃO ELIMINADO!):</strong> O maior resultado da fase. Marrocos repetiu a magia do Catar 2022 no solo americano. Ziyech (54'), Boufal (89') selaram o resultado histórico.</p>
<p><strong>Colômbia 2-0 México (SEGUNDO ANFITRIÃO FORA!):</strong> O México não chutou uma vez ao gol. Colômbia foi superior em tudo. James Rodríguez mostrou que gênios não têm idade.</p>
<p><strong>Coreia do Sul 2-1 Canadá (TERCEIRO ANFITRIÃO ELIMINADO!):</strong> Son Heung-min com dois gols. Três anfitriões em 48 horas — algo jamais visto na história da Copa.</p>

${table(
  "Todos os Resultados — 32 Avos de Final Copa do Mundo 2026",
  ["Partida", "Resultado", "Goleadores", "Data"],
  [
    ["Brasil vs Equador", "2-0", "Vinicius Jr. 13', Rodrygo 41'", "26 jun"],
    ["França vs Polônia", "3-1", "Mbappé 7', 65', Giroud 52' / Lewandowski 80'", "26 jun"],
    ["Alemanha vs Trinidad e Tobago", "4-0", "Havertz 10', Musiala 29', 55', Werner 88'", "26 jun"],
    ["Espanha vs Turquia", "2-1", "Morata 25', Yamal 77' / Calhanoglu 43'", "26 jun"],
    ["Inglaterra vs Senegal", "2-0", "Bellingham 32', Saka 68'", "26 jun"],
    ["Portugal vs Suécia", "3-2", "Cristiano 12', 45+2', Leão 73' / Isak 38', 60'", "26 jun"],
    ["Marrocos vs EUA", "2-1", "Ziyech 54', Boufal 89' / Pulisic 71'", "27 jun"],
    ["Japão vs Croácia", "2-1", "Asao 22', Mitoma 80' / Modrić 50'", "27 jun"],
    ["Holanda vs Dinamarca", "1-0", "Dumfries 62'", "27 jun"],
    ["Bélgica vs Suíça", "2-1", "Lukaku 35', De Bruyne 67' / Embolo 20'", "27 jun"],
    ["Colômbia vs México", "2-0", "Córdoba 41', J. Rodríguez 79'", "27 jun"],
    ["Coreia do Sul vs Canadá", "2-1", "Son 38', 71' / David 55'", "27 jun"],
    ["Argentina vs Chile", "1-0", "Messi 45+1'", "27 jun"],
    ["Uruguai vs Grécia", "2-1", "Suárez 17', Núñez 88' / Sioulas 51'", "27 jun"],
    ["Itália vs Nigéria", "0-0 (3-2 pen)", "— / —", "27 jun"],
    ["Camarões vs Sérvia", "3-2", "Aboubakar 11', 44', Abamba 67' / Mitrović 28', Vlahović 73'", "27 jun"],
  ]
)}

<h2>Seleções Classificadas e Artilheiros</h2>
${table(
  "Artilheiros — 32 Avos de Final",
  ["Jogador", "Seleção", "Gols"],
  [
    ["Kylian Mbappé", "França", "2"],
    ["Cristiano Ronaldo", "Portugal", "2"],
    ["Son Heung-min", "Coreia do Sul", "2"],
    ["Jamal Musiala", "Alemanha", "2"],
    ["Vincent Aboubakar", "Camarões", "2"],
  ]
)}
<p>Os 16 classificados são: Brasil, França, Alemanha, Espanha, Inglaterra, Portugal, Marrocos, Japão, Holanda, Bélgica, Colômbia, Coreia do Sul, Argentina, Uruguai, Itália e Camarões. A Copa do Mundo 2026 já provou que o futebol é verdadeiramente global — e as oitavas prometem ainda mais emoção. ${extLink("https://www.espn.com.br/futebol/", "ESPN Brasil")} mantém cobertura em tempo real de todos os jogos.</p>
`,
  },

  {
    id: 122,
    slug: "pt-wc2026-eliminados",
    title: "Copa do Mundo 2026 — Todas as Seleções Eliminadas nos 32 Avos e Por Quê",
    description: "Análise completa das 16 seleções eliminadas nos 32 avos da Copa do Mundo 2026, com as causas táticas e perspectivas para o futuro.",
    category: "كأس العالم",
    date: "2026-06-28T06:00:00",
    image: img("photo-1553778263-73a83bab9b0c"),
    imageAlt: "Seleções eliminadas Copa do Mundo 2026",
    tags: ["Copa do Mundo 2026", "Eliminados", "Análise", "EUA", "México", "Canadá"],
    readTime: 9,
    lang: "pt",
    content: `
${toc("Índice", [
  "A eliminação histórica dos três anfitriões",
  "EUA: a derrota que define uma geração",
  "México: o ciclo eterno do fracasso no momento certo",
  "Canadá: uma saída dolorosa para uma geração promissora",
  "Seleções europeias que ficaram pelo caminho",
  "Tabela completa dos eliminados",
  "Lições táticas",
  "Perspectivas para 2030",
])}

<p class="article-intro">Dezesseis sonhos interrompidos. Dezesseis retornos para casa. E entre eles, três que jamais imaginariam sair tão cedo: os países anfitriões. Os Estados Unidos, o México e o Canadá foram eliminados nos 32 avos de final da Copa do Mundo 2026 com menos de 48 horas de diferença — uma sequência sem precedentes na história do torneio mais assistido do planeta.</p>

${table(
  "Todas as Seleções Eliminadas — 32 Avos 2026",
  ["Seleção", "Eliminada por", "Resultado", "Causa principal"],
  [
    ["EUA 🇺🇸", "Marrocos", "1-2", "Vulnerabilidade defensiva + gol tardio"],
    ["México 🇲🇽", "Colômbia", "0-2", "Zero criatividade ofensiva"],
    ["Canadá 🇨🇦", "Coreia do Sul", "1-2", "Erros individuais na defesa"],
    ["Polônia 🇵🇱", "França", "1-3", "A diferença Mbappé foi decisiva"],
    ["Equador 🇪🇨", "Brasil", "0-2", "Pressing brasileiro avassalador"],
    ["Trinidad e Tobago 🇹🇹", "Alemanha", "0-4", "Abismo técnico insuperável"],
    ["Turquia 🇹🇷", "Espanha", "1-2", "Perderam o controle no segundo tempo"],
    ["Senegal 🇸🇳", "Inglaterra", "0-2", "Bloco inglês intransponível"],
    ["Suécia 🇸🇪", "Portugal", "2-3", "Defesa frágil nos momentos decisivos"],
    ["Croácia 🇭🇷", "Japão", "1-2", "O fim de uma geração histórica"],
    ["Dinamarca 🇩🇰", "Holanda", "0-1", "Eliminação pelo mínimo"],
    ["Suíça 🇨🇭", "Bélgica", "1-2", "De Bruyne decisivo no final"],
    ["Chile 🇨🇱", "Argentina", "0-1", "Um gol de Messi basta"],
    ["Grécia 🇬🇷", "Uruguai", "1-2", "Cabeçada de Núñez no 88'"],
    ["Nigéria 🇳🇬", "Itália", "0-0 (2-3 pen)", "Eliminação nos pênaltis"],
    ["Sérvia 🇷🇸", "Camarões", "2-3", "Uma proeza africana histórica"],
  ]
)}

<h2>Lições para 2030</h2>
<p>O futebol não perdoa. As seleções que aprendem com as derrotas são as que voltam mais fortes. EUA, México e Canadá têm quatro anos para reconstruir — e o futebol americano tem mais talento do que nunca para fazer isso. ${extLink("https://www.espn.com.br/futebol/", "ESPN Brasil")} acompanhará cada passo dessas jornadas de reconstrução. O próximo capítulo começa agora.</p>
`,
  },

  {
    id: 123,
    slug: "pt-wc2026-classificados-oitavas",
    title: "Copa do Mundo 2026 — Quem se Classificou para as Oitavas de Final?",
    description: "Lista completa das 16 seleções classificadas para as oitavas de final da Copa do Mundo 2026, com análise da forma e previsões para os confrontos.",
    category: "كأس العالم",
    date: "2026-06-28T20:00:00",
    image: img("photo-1517927033932-b3d18e61fb3a"),
    imageAlt: "Classificados oitavas de final Copa do Mundo 2026",
    tags: ["Copa do Mundo 2026", "Oitavas", "Classificados", "Previsões"],
    readTime: 9,
    lang: "pt",
    content: `
${toc("Índice", [
  "Os 16 classificados — resumo",
  "América do Sul: quatro candidatos reais",
  "Europa: potência e diversidade",
  "África e Ásia escrevem história",
  "Confrontos confirmados nas oitavas",
  "Análise e previsões",
])}

<p class="article-intro">Dezesseis. Esse é o número de seleções que ainda sonham com a Copa do Mundo 2026. E o que torna essa lista tão especial é justamente a sua diversidade: quatro seleções da Ásia e África, gerações históricas da Europa, e a onipresente magia sul-americana. Aqui está tudo que você precisa saber sobre as oitavas de final.</p>

${table(
  "Os 16 Classificados — Copa do Mundo 2026",
  ["Seleção", "Zona", "Estrela", "Principal força"],
  [
    ["França 🇫🇷", "Europa", "Mbappé", "Desequilíbrio individual"],
    ["Brasil 🇧🇷", "América do Sul", "Vinicius Jr.", "Velocidade e verticalidade"],
    ["Alemanha 🇩🇪", "Europa", "Musiala", "Pressing e eficácia"],
    ["Espanha 🇪🇸", "Europa", "Yamal", "Posse e técnica"],
    ["Inglaterra 🏴󠁧󠁢󠁥󠁮󠁧󠁿", "Europa", "Bellingham", "Organização e solidez"],
    ["Portugal 🇵🇹", "Europa", "Cristiano Ronaldo", "Experiência e liderança"],
    ["Argentina 🇦🇷", "América do Sul", "Messi", "Gênio e instinto"],
    ["Holanda 🇳🇱", "Europa", "Van Dijk", "Defesa sólida"],
    ["Bélgica 🇧🇪", "Europa", "De Bruyne", "Criatividade no meio"],
    ["Itália 🇮🇹", "Europa", "Barella", "Organização tática"],
    ["Uruguai 🇺🇾", "América do Sul", "Núñez", "Coração e garra"],
    ["Colômbia 🇨🇴", "América do Sul", "J. Rodríguez", "Jogo associativo elegante"],
    ["Marrocos 🇲🇦", "África", "Ziyech", "Contra-ataque letal"],
    ["Japão 🇯🇵", "Ásia", "Mitoma", "Disciplina e pressing"],
    ["Coreia do Sul 🇰🇷", "Ásia", "Son", "Individualidade + coletivo"],
    ["Camarões 🇨🇲", "África", "Aboubakar", "Energia e desequilíbrio"],
  ]
)}

<h2>Confrontos nas Oitavas</h2>
${table(
  "Jogos das Oitavas de Final",
  ["Jogo", "Data", "Destaque"],
  [
    ["Brasil vs Colômbia", "30 jun", "Derby sul-americano explosivo"],
    ["França vs Camarões", "30 jun", "O maior teste africano para a Europa"],
    ["Alemanha vs Uruguai", "1 jul", "Duas potências com história"],
    ["Argentina vs Coreia do Sul", "1 jul", "Messi vs Son — encontro de gênios"],
    ["Espanha vs Japão", "2 jul", "Tiki-taka contra disciplina asiática"],
    ["Marrocos vs Bélgica", "2 jul", "O mais imprevisível da fase"],
    ["Holanda vs Inglaterra", "3 jul", "Clássico europeu"],
    ["Portugal vs Itália", "3 jul", "Duas lendas, uma vaga nas quartas"],
  ]
)}
<p>O Brasil é o favorito da América do Sul. França e Alemanha lideram a Europa. Mas Marrocos e Camarões têm uma surpresa guardada. A Copa do Mundo 2026 apenas começou a revelar sua face mais emocionante. ${extLink("https://www.espn.com.br/futebol/", "ESPN Brasil")} cobrirá cada partida ao vivo com análises aprofundadas.</p>
`,
  },

  {
    id: 124,
    slug: "pt-wc2026-maiores-surpresas",
    title: "As Maiores Surpresas da Copa do Mundo 2026 — Três Anfitriões, Uma Noite Histórica",
    description: "Análise completa de todas as grandes surpresas da Copa do Mundo 2026: eliminação dos três anfitriões, show do Marrocos e proeza dos Camarões contra a Sérvia.",
    category: "كأس العالم",
    date: "2026-06-29T10:00:00",
    image: img("photo-1560272564-c83b66b1ad12"),
    imageAlt: "Maiores surpresas Copa do Mundo 2026",
    tags: ["Copa do Mundo 2026", "Surpresas", "Marrocos", "Camarões", "História"],
    readTime: 10,
    lang: "pt",
    content: `
${toc("Índice", [
  "Uma noite que reescreveu a história",
  "Marrocos 2-1 EUA: o anfitrião vira visitante",
  "Colômbia 2-0 México: sem misericórdia",
  "Coreia do Sul 2-1 Canadá: Son imbatível",
  "Camarões 3-2 Sérvia: a proeza africana do século",
  "Japão 2-1 Croácia: o fim de uma era",
  "Ranking histórico das grandes surpresas",
  "O que tudo isso significa para o futuro",
])}

<p class="article-intro">Você pode planejar. Pode analisar. Pode se preparar para o inesperado. Mas nada poderia preparar o mundo do futebol para o que a Copa do Mundo 2026 entregou em 48 horas. Três países anfitriões eliminados. Quatro proezas africanas e asiáticas. A ordem mundial do futebol sacudida em seus alicerces. Isso não é uma noite qualquer — é um divisor de águas na história do esporte mais amado do planeta.</p>

<h2>Marrocos 2-1 EUA</h2>
<p>O estádio estava repleto de bandeiras americanas. A atmosfera, elétrica. A pressão, máxima. Mas Marrocos — disciplinado, compacto e letal nas transições — chegou com uma missão: repetir o Catar 2022. Ziyech no 54', Boufal no 89'. O primeiro país anfitrião foi eliminado em casa. O futebol não tem clemência com anfitriões.</p>

<h2>Camarões 3-2 Sérvia</h2>
<p>Dois gols de Aboubakar antes do intervalo. A Sérvia tentou a reação com Mitrović e Vlahović, mas o terceiro gol camaronês de Abamba no 67' selou a vitória. Uma atuação que ficará na história do futebol africano e mundial. O futebol do continente africano não para de surpreender e encamtar.</p>

${table(
  "Ranking de Surpresas — 32 Avos Copa do Mundo 2026",
  ["Posição", "Surpresa", "Impacto (1-10)"],
  [
    ["1", "Três anfitriões eliminados em 48h", "10/10"],
    ["2", "Marrocos 2-1 EUA no solo americano", "9.5/10"],
    ["3", "Camarões 3-2 Sérvia", "8.5/10"],
    ["4", "Colômbia 2-0 México (sem um chute ao gol mexicano)", "8/10"],
    ["5", "Japão 2-1 Croácia — fim da geração Modrić", "7.5/10"],
  ]
)}

<h2>Um Novo Mundo do Futebol</h2>
<p>O que 2026 nos ensina é fundamental: a lacuna entre as potências tradicionais e o resto do mundo nunca foi tão estreita. Marrocos, Camarões, Japão e Coreia do Sul não estão aqui por sorte — estão aqui porque construíram durante anos sistemas sérios, com análise, tática e jogadores formados nas melhores ligas do mundo. O futebol global foi democratizado. E isso é uma ótima notícia para o esporte e para o planeta inteiro. ${extLink("https://www.espn.com.br/futebol/", "ESPN Brasil")} acompanhará cada desenvolvimento desta Copa histórica.</p>
`,
  },
];

/* ═══════════════════════════════ GERMAN ═══════════════════════════════ */
export const wc2026DeArticles: Article[] = [
  {
    id: 125,
    slug: "de-wc2026-ergebnisse-32tel",
    title: "WM 2026 — Alle Ergebnisse der Runde der 32 im Überblick",
    description: "Komplette Ergebnisübersicht der Runde der 32 bei der WM 2026 in den USA, Mexiko und Kanada — Tore, Analysen und wer die Runde der 16 erreicht hat.",
    category: "كأس العالم",
    date: "2026-06-27T18:00:00",
    image: img("photo-1579952363873-27f3bade9f55"),
    imageAlt: "WM 2026 Runde der 32 Ergebnisse",
    tags: ["WM 2026", "Runde der 32", "Ergebnisse", "FIFA", "Fußball"],
    readTime: 10,
    lang: "de",
    content: `
${toc("Inhaltsverzeichnis", [
  "Das neue 48-Teams-Format erklärt",
  "Ergebnisse des ersten Tages — 26. Juni",
  "Ergebnisse des zweiten Tages — Die großen Überraschungen",
  "Vollständige Ergebnistabelle",
  "Beste Torschützen",
  "Qualifizierte Teams für die Runde der 16",
  "Taktische Analyse",
  "Prognosen für die Runde der 16",
])}

<p class="article-intro">Die WM 2026 ist mehr als ein Turnier — sie ist ein historisches Ereignis. Mit <strong>48 Mannschaften</strong>, die erstmals an einer Weltmeisterschaft teilnehmen, lieferte die Runde der 32 zwei Tage voller Drama, Überraschungen und unvergesslicher Momente. Drei Gastgeberländer schieden in 48 Stunden aus, Afrika und Asien schrieben Geschichte, und der Weltfußball wurde auf den Kopf gestellt.</p>

<h2>Das Neue 48-Teams-Format</h2>
<p>Die FIFA hat die größte Veranstaltung der Welt revolutioniert: 48 Nationalmannschaften, 16 Gruppen zu je drei Teams, und die ersten zwei jeder Gruppe sowie die acht besten Drittplatzierten rücken in eine neue Runde vor — die Runde der 32, die es in der WM-Geschichte noch nie gab. ${extLink("https://de.fifa.com/", "FIFA offizielle Website")} bietet alle aktuellen Informationen.</p>

${table(
  "WM-Format: 2022 vs. 2026",
  ["Aspekt", "Katar 2022", "USA/Mexiko/Kanada 2026"],
  [
    ["Teams", "32", "48"],
    ["Gruppen", "8 Gruppen à 4", "16 Gruppen à 3"],
    ["Spiele gesamt", "64", "104"],
    ["Runde der 32", "Nicht vorhanden", "Erstmals in der Geschichte"],
    ["Gastgeberländer", "1", "3"],
  ]
)}

<h2>Ergebnisse des Ersten Tages — 26. Juni</h2>
<p><strong>Brasilien 2:0 Ecuador:</strong> Vinicius Jr. traf in der 13. Minute, Rodrygo legte kurz vor der Pause nach. Brasilien dominierte mit 68% Ballbesitz und macht einen starken Eindruck. Die Seleção ist auf dem Weg zu ihrem sechsten Titel.</p>
<p><strong>Frankreich 3:1 Polen:</strong> Mbappé war unaufhaltsam mit zwei Toren. Giroud erhöhte auf 3:0, Lewandowski verkürzte für Polen. Die Franzosen sind der große Favorit des Turniers.</p>
<p><strong>Deutschland 4:0 Trinidad und Tobago:</strong> Eine Machtdemonstration! Musiala traf zweimal, Havertz und Werner vollendeten das Torspektakel. Die Nationalmannschaft wirkt wie wiederbelebt nach dem 2018er Trauma.</p>

<h2>Ergebnisse des Zweiten Tages — Die Großen Überraschungen</h2>
<p><strong>Marokko 2:1 USA (GASTGEBER RAUS!):</strong> Das Ergebnis der Runde. Marokko, das 2022 in Katar Halbfinalist war, eliminierte den Mitgastgeber auf eigenem Boden. Ziyech (54.) und Boufal (89.) trafen für die Nordafrikaner, Pulisic (71.) zwischenzeitlich für die USA.</p>
<p><strong>Kolumbien 2:0 Mexiko (ZWEITER GASTGEBER AUSGESCHIEDEN!):</strong> Mexiko schoss kein einziges Mal aufs Tor. Kolumbien kontrollierte das Spiel von Anfang bis Ende, James Rodríguez glänzte als Spielgestalter.</p>
<p><strong>Südkorea 2:1 Kanada (DRITTER GASTGEBER WEG!):</strong> Son Heung-min erzielte beide Tore für Südkorea und hinterließ einen bleibenden Eindruck. Drei Gastgeberländer in 48 Stunden — WM-Geschichte.</p>

${table(
  "Alle Ergebnisse — Runde der 32, WM 2026",
  ["Spiel", "Ergebnis", "Torschützen", "Datum"],
  [
    ["Brasilien vs Ecuador", "2:0", "Vinicius Jr. 13', Rodrygo 41'", "26. Jun."],
    ["Frankreich vs Polen", "3:1", "Mbappé 7', 65', Giroud 52' / Lewandowski 80'", "26. Jun."],
    ["Deutschland vs Trinidad u. Tobago", "4:0", "Havertz 10', Musiala 29', 55', Werner 88'", "26. Jun."],
    ["Spanien vs Türkei", "2:1", "Morata 25', Yamal 77' / Calhanoglu 43'", "26. Jun."],
    ["England vs Senegal", "2:0", "Bellingham 32', Saka 68'", "26. Jun."],
    ["Portugal vs Schweden", "3:2", "Ronaldo 12', 45+2', Leão 73' / Isak 38', 60'", "26. Jun."],
    ["Marokko vs USA", "2:1", "Ziyech 54', Boufal 89' / Pulisic 71'", "27. Jun."],
    ["Japan vs Kroatien", "2:1", "Asao 22', Mitoma 80' / Modrić 50'", "27. Jun."],
    ["Niederlande vs Dänemark", "1:0", "Dumfries 62'", "27. Jun."],
    ["Belgien vs Schweiz", "2:1", "Lukaku 35', De Bruyne 67' / Embolo 20'", "27. Jun."],
    ["Kolumbien vs Mexiko", "2:0", "Córdoba 41', J. Rodríguez 79'", "27. Jun."],
    ["Südkorea vs Kanada", "2:1", "Son 38', 71' / David 55'", "27. Jun."],
    ["Argentinien vs Chile", "1:0", "Messi 45+1'", "27. Jun."],
    ["Uruguay vs Griechenland", "2:1", "Suárez 17', Núñez 88' / Sioulas 51'", "27. Jun."],
    ["Italien vs Nigeria", "0:0 (3:2 i.E.)", "— / —", "27. Jun."],
    ["Kamerun vs Serbien", "3:2", "Aboubakar 11', 44', Abamba 67' / Mitrović 28', Vlahović 73'", "27. Jun."],
  ]
)}

<h2>Qualifizierte Teams und Torschützen</h2>
${table(
  "Beste Torschützen — Runde der 32",
  ["Spieler", "Nation", "Tore"],
  [
    ["Kylian Mbappé", "Frankreich", "2"],
    ["Cristiano Ronaldo", "Portugal", "2"],
    ["Son Heung-min", "Südkorea", "2"],
    ["Jamal Musiala", "Deutschland", "2"],
    ["Vincent Aboubakar", "Kamerun", "2"],
  ]
)}
<p>Die 16 qualifizierten Teams sind: Brasilien, Frankreich, Deutschland, Spanien, England, Portugal, Marokko, Japan, Niederlande, Belgien, Kolumbien, Südkorea, Argentinien, Uruguay, Italien und Kamerun. Deutschland gehört zu den Topfavoriten und zeigt sich in bester Verfassung. ${extLink("https://www.kicker.de/", "Kicker")} berichtet live über alle weiteren Spiele.</p>
`,
  },

  {
    id: 126,
    slug: "de-wc2026-ausgeschiedene-teams",
    title: "WM 2026 — Alle Ausgeschiedenen Teams aus der Runde der 32 und Warum",
    description: "Vollständige Analyse aller 16 in der Runde der 32 ausgeschiedenen Mannschaften bei der WM 2026 — taktische Gründe und Ausblick auf die Zukunft.",
    category: "كأس العالم",
    date: "2026-06-28T08:00:00",
    image: img("photo-1553778263-73a83bab9b0c"),
    imageAlt: "Ausgeschiedene Teams WM 2026",
    tags: ["WM 2026", "Ausgeschieden", "USA", "Mexiko", "Kanada", "Analyse"],
    readTime: 9,
    lang: "de",
    content: `
${toc("Inhaltsverzeichnis", [
  "Das historische Dreifach-Gastgeber-Ausscheiden",
  "USA: Die Niederlage, die eine Generation prägt",
  "Mexiko: Das ewige Scheitern im entscheidenden Moment",
  "Kanada: Ein schmerzhaftes Ausscheiden für eine vielversprechende Generation",
  "Europäische Teams, die den Sprung nicht schafften",
  "Vollständige Tabelle der ausgeschiedenen Teams",
  "Taktische Lektionen",
  "Ausblick auf 2030",
])}

<p class="article-intro">Sechzehn Träume zerplatzt. Sechzehn Heimreisen angetreten. Und unter ihnen drei, die etwas Einzigartiges teilten — sie waren die Gastgeber. Die USA, Mexiko und Kanada schieden allesamt in der Runde der 32 aus, innerhalb von 48 Stunden. Eine Abfolge, die in der Geschichte der Weltmeisterschaft beispiellos ist.</p>

${table(
  "Alle Ausgeschiedenen Teams — Runde der 32, WM 2026",
  ["Nation", "Ausgeschieden gegen", "Ergebnis", "Hauptgrund"],
  [
    ["USA 🇺🇸", "Marokko", "1:2", "Defensive Anfälligkeit + Spätor"],
    ["Mexiko 🇲🇽", "Kolumbien", "0:2", "Null Torgefahr im Angriff"],
    ["Kanada 🇨🇦", "Südkorea", "1:2", "Individuelle Abwehrfehler"],
    ["Polen 🇵🇱", "Frankreich", "1:3", "Mbappé war schlichtweg nicht zu halten"],
    ["Ecuador 🇪🇨", "Brasilien", "0:2", "Brasiliens Pressing überwältigend"],
    ["Trinidad u. Tobago 🇹🇹", "Deutschland", "0:4", "Riesiges technisches Gefälle"],
    ["Türkei 🇹🇷", "Spanien", "1:2", "Verloren die Kontrolle in HZ 2"],
    ["Senegal 🇸🇳", "England", "0:2", "Englands Block war unüberwindbar"],
    ["Schweden 🇸🇪", "Portugal", "2:3", "Brüchige Defensive in kritischen Momenten"],
    ["Kroatien 🇭🇷", "Japan", "1:2", "Das Ende einer goldenen Generation"],
    ["Dänemark 🇩🇰", "Niederlande", "0:1", "Ausscheiden knapp, aber verdient"],
    ["Schweiz 🇨🇭", "Belgien", "1:2", "De Bruyne zum Schluss entscheidend"],
    ["Chile 🇨🇱", "Argentinien", "0:1", "Ein Messi-Tor reicht immer"],
    ["Griechenland 🇬🇷", "Uruguay", "1:2", "Núñez' Kopfball in der 88."],
    ["Nigeria 🇳🇬", "Italien", "0:0 (2:3 i.E.)", "Im Elfmeterschießen ausgeschieden"],
    ["Serbien 🇷🇸", "Kamerun", "2:3", "Afrikanische Sensation"],
  ]
)}

<h2>Lektionen für 2030</h2>
${table(
  "Taktische Lektionen für ausgeschiedene Teams",
  ["Nation", "Hauptlektion", "Priorität für 2030"],
  [
    ["USA", "Defensive Stabilität gegen schnelle Außenspieler", "Wettbewerbsmentalität aufbauen"],
    ["Mexiko", "Offensiver Erneuerungsbedarf", "Neue Torjäger entwickeln"],
    ["Kanada", "Defensivkommunikation stärken", "In Nachwuchsförderung investieren"],
    ["Kroatien", "Generationswechsel dringend nötig", "Neue Führungsspieler finden"],
  ]
)}
<p>Fußball wartet nicht. Die Nationalmannschaften, die aus Niederlagen lernen, kehren gestärkt zurück. Die WM 2030 steht bereits am Horizont — und jede dieser Mannschaften hat Zeit zu beweisen, dass sie sich weiterentwickelt hat. ${extLink("https://www.kicker.de/", "Kicker")} begleitet die Entwicklungen aller betroffenen Verbände.</p>
`,
  },

  {
    id: 127,
    slug: "de-wc2026-qualifizierte-runde-16",
    title: "WM 2026 — Wer Hat die Runde der 16 Erreicht? Alle Infos",
    description: "Vollständige Liste der 16 qualifizierten Teams für die Runde der 16 bei der WM 2026, mit taktischer Analyse und Prognosen für die kommenden Spiele.",
    category: "كأس العالم",
    date: "2026-06-28T22:00:00",
    image: img("photo-1517927033932-b3d18e61fb3a"),
    imageAlt: "Qualifizierte Runde der 16 WM 2026",
    tags: ["WM 2026", "Runde der 16", "Qualifiziert", "Prognosen"],
    readTime: 9,
    lang: "de",
    content: `
${toc("Inhaltsverzeichnis", [
  "Die 16 Qualifizierten im Überblick",
  "Südamerikanische Teams",
  "Europäische Qualifizierte",
  "Afrika und Asien schreiben Geschichte",
  "Spielplan der Runde der 16",
  "Prognosen",
])}

<p class="article-intro">Sechzehn. Genau sechzehn Mannschaften sind noch im Rennen um den WM-Titel 2026. Die Liste der Qualifizierten vereint erwartete Favoriten, bestätigte Überraschungen und Außenseiter, die niemand auf der Rechnung hatte. Hier ist alles, was Sie über die Runde der 16 wissen müssen.</p>

${table(
  "Alle 16 Qualifizierten — WM 2026",
  ["Nation", "Zone", "Schlüsselspieler", "Hauptstärke"],
  [
    ["Frankreich 🇫🇷", "Europa", "Mbappé", "Individuelles Ausnahmetalent"],
    ["Brasilien 🇧🇷", "Südamerika", "Vinicius Jr.", "Schnelligkeit und Vertikalität"],
    ["Deutschland 🇩🇪", "Europa", "Musiala", "Hohe Pressing und Effizienz"],
    ["Spanien 🇪🇸", "Europa", "Yamal", "Ballbesitz und Technik"],
    ["England 🏴󠁧󠁢󠁥󠁮󠁧󠁿", "Europa", "Bellingham", "Organisation und Solidität"],
    ["Portugal 🇵🇹", "Europa", "Cristiano Ronaldo", "Erfahrung und Führung"],
    ["Argentinien 🇦🇷", "Südamerika", "Messi", "Genie und Instinkt"],
    ["Niederlande 🇳🇱", "Europa", "Van Dijk", "Solide Abwehr"],
    ["Belgien 🇧🇪", "Europa", "De Bruyne", "Kreativität im Mittelfeld"],
    ["Italien 🇮🇹", "Europa", "Barella", "Taktische Organisation"],
    ["Uruguay 🇺🇾", "Südamerika", "Núñez", "Herz und Kampfgeist"],
    ["Kolumbien 🇨🇴", "Südamerika", "J. Rodríguez", "Elegantes Kombinationsspiel"],
    ["Marokko 🇲🇦", "Afrika", "Ziyech", "Tödlicher Konter"],
    ["Japan 🇯🇵", "Asien", "Mitoma", "Disziplin und Pressing"],
    ["Südkorea 🇰🇷", "Asien", "Son", "Individualität + Kollektiv"],
    ["Kamerun 🇨🇲", "Afrika", "Aboubakar", "Energie und Unberechenbarkeit"],
  ]
)}

<h2>Spielplan der Runde der 16</h2>
${table(
  "Spiele der Runde der 16",
  ["Spiel", "Datum", "Wichtigste Storyline"],
  [
    ["Brasilien vs Kolumbien", "30. Jun.", "Südamerikanisches Derby"],
    ["Frankreich vs Kamerun", "30. Jun.", "Afrikas größte Herausforderung für Europa"],
    ["Deutschland vs Uruguay", "1. Jul.", "Historische Rivalen treffen aufeinander"],
    ["Argentinien vs Südkorea", "1. Jul.", "Messi vs Son"],
    ["Spanien vs Japan", "2. Jul.", "Tiki-Taka gegen asiatische Disziplin"],
    ["Marokko vs Belgien", "2. Jul.", "Das unvorhersehbarste Spiel"],
    ["Niederlande vs England", "3. Jul.", "Europäischer Klassiker"],
    ["Portugal vs Italien", "3. Jul.", "Zwei Legenden, ein Platz im Viertelfinale"],
  ]
)}
<p>Deutschland ist einer der Topfavoriten. Musiala in Topform, eine ausgewogene Mannschaft und die Erfahrung aus vielen großen Turnieren machen die Nationalelf zu einem ernsthaften Titelanwärter. ${extLink("https://www.kicker.de/", "Kicker")} begleitet das deutsche Team durch jeden weiteren WM-Schritt.</p>
`,
  },

  {
    id: 128,
    slug: "de-wc2026-groesste-ueberraschungen",
    title: "Die Größten Überraschungen der WM 2026 — Drei Gastgeber, Eine Historische Nacht",
    description: "Analyse aller großen Überraschungen der WM 2026: drei Gastgeber eliminiert, Marokkos Sensation gegen die USA und Kameruns Triumph gegen Serbien.",
    category: "كأس العالم",
    date: "2026-06-29T12:00:00",
    image: img("photo-1560272564-c83b66b1ad12"),
    imageAlt: "Größte Überraschungen WM 2026",
    tags: ["WM 2026", "Überraschungen", "Marokko", "Kamerun", "Geschichte"],
    readTime: 10,
    lang: "de",
    content: `
${toc("Inhaltsverzeichnis", [
  "Eine Nacht, die Geschichte schrieb",
  "Marokko 2:1 USA: Der Gastgeber wird zum Gast",
  "Kolumbien 2:0 Mexiko: Keine Gnade",
  "Südkorea 2:1 Kanada: Son nicht aufzuhalten",
  "Kamerun 3:2 Serbien: Afrikas Sternstunde",
  "Japan 2:1 Kroatien: Das Ende einer Ära",
  "Historisches Ranking der Überraschungen",
  "Was das für die Zukunft bedeutet",
])}

<p class="article-intro">Man kann planen. Man kann analysieren. Man kann sich sogar auf das Unerwartete vorbereiten. Aber nichts hätte die Fußballwelt auf das vorbereiten können, was die WM 2026 in 48 Stunden lieferte. Drei Gastgeberländer ausgeschieden. Vier afrikanische und asiatische Sensationen. Die Weltordnung des Fußballs erschüttert in ihren Grundfesten.</p>

<h2>Marokko 2:1 USA</h2>
<p>Das Stadion war voll mit amerikanischen Flaggen. Die Atmosphäre elektrisch. Aber Marokko — diszipliniert, kompakt und tödlich im Umschaltspiel — ließ sich nicht einschüchtern. Ziyech in der 54., Boufal in der 89. Minute. Der erste Gastgeber war raus. Fußball kennt keine Gnade.</p>

<h2>Kamerun 3:2 Serbien</h2>
<p>Zwei Tore von Aboubakar vor der Pause. Serbien versuchte die Aufholjagd durch Mitrović und Vlahović, aber Abambas drittes Tor in der 67. Minute besiegelte alles. Eine Leistung, die Geschichte schreibt. Afrikanischer Fußball auf höchstem Niveau.</p>

${table(
  "Ranking der Überraschungen — Runde der 32, WM 2026",
  ["Rang", "Überraschung", "Auswirkung (1-10)"],
  [
    ["1", "Drei Gastgeber in 48h ausgeschieden", "10/10"],
    ["2", "Marokko 2:1 USA auf amerikanischem Boden", "9.5/10"],
    ["3", "Kamerun 3:2 Serbien", "8.5/10"],
    ["4", "Kolumbien 2:0 Mexiko (kein einziger Schuss aufs Tor)", "8/10"],
    ["5", "Japan 2:1 Kroatien — Ende der Modrić-Ära", "7.5/10"],
  ]
)}

<h2>Die Neue Weltordnung des Fußballs</h2>
<p>Was uns 2026 lehrt, ist fundamental: Die Lücke zwischen den traditionellen Mächten und dem Rest der Welt war noch nie so gering. Marokko, Kamerun, Japan und Südkorea sind nicht durch Zufall hier — sie sind hier, weil ihre Verbände über Jahre hinweg investiert, strukturiert und geplant haben. Der globale Fußball wurde demokratisiert. Und das ist eine großartige Nachricht für den Sport und für den ganzen Planeten. ${extLink("https://www.kicker.de/", "Kicker")} begleitet weiterhin jeden Aspekt dieser historischen WM.</p>
`,
  },
];

/* ═══════════════════════════════ JAPANESE ═══════════════════════════════ */
export const wc2026JaArticles: Article[] = [
  {
    id: 129,
    slug: "ja-wc2026-round32-results",
    title: "2026年FIFAワールドカップ ラウンド32 全試合結果と分析",
    description: "2026年FIFAワールドカップのラウンド32の全試合結果を徹底分析。3つの開催国が48時間で敗退という歴史的な出来事を含む完全レポート。",
    category: "كأس العالم",
    date: "2026-06-27T20:00:00",
    image: img("photo-1579952363873-27f3bade9f55"),
    imageAlt: "2026年ワールドカップ ラウンド32",
    tags: ["ワールドカップ2026", "ラウンド32", "結果", "FIFA", "サッカー"],
    readTime: 10,
    lang: "ja",
    content: `
${toc("目次", [
  "48チーム制の新フォーマット解説",
  "1日目の結果 — 6月26日",
  "2日目の結果 — 歴史的な衝撃",
  "ラウンド32全試合結果一覧",
  "得点ランキング",
  "ラウンド16進出チーム",
  "戦術的分析",
  "ラウンド16の展望",
])}

<p class="article-intro">2026年FIFAワールドカップは、フットボール史上最大の大会として幕を開けた。初めて<strong>48カ国</strong>が参加するこの大会で、ラウンド32は2日間で数々の歴史的瞬間をもたらした。3つの開催国が48時間以内に敗退、アフリカとアジアの躍進、そして世界のサッカー地図が塗り替えられる瞬間を見た。日本代表もクロアチアに劇的な勝利を収め、ラウンド16への切符を手にした。</p>

<h2>48チーム制の新フォーマット</h2>
<p>FIFAは世界最大のスポーツイベントを革新した。48の代表チームが参加し、3チームずつ16グループに分かれてグループステージを戦う。各グループの上位2チームと、グループ3位のうち最良の8チームがラウンド32（決勝トーナメント1回戦）に進出。このラウンドはワールドカップ史上初めて設けられた。${extLink("https://www.fifa.com/", "FIFA公式サイト")}で全試合のリアルタイム情報を確認できる。</p>

${table(
  "ワールドカップフォーマット比較：2022年 vs 2026年",
  ["項目", "カタール2022", "アメリカ/メキシコ/カナダ2026"],
  [
    ["参加チーム数", "32", "48"],
    ["グループ", "8グループ×4チーム", "16グループ×3チーム"],
    ["総試合数", "64", "104"],
    ["ラウンド32", "なし", "史上初"],
    ["開催国数", "1", "3"],
  ]
)}

<h2>1日目の結果 — 6月26日</h2>
<p><strong>ブラジル 2-0 エクアドル：</strong>ヴィニシウス・ジュニオールが13分に先制、ロドリゴが45分前に追加点。ブラジルは68%のボール支配率で試合をコントロールした。セレソンは6回目の優勝に向けて力強い第一歩を踏み出した。</p>
<p><strong>フランス 3-1 ポーランド：</strong>エムバペが7分と65分に得点、ジルーが52分に追加。ポーランドのレヴァンドフスキが80分に一点を返したが及ばず。フランスは大会最有力候補として強さを見せた。</p>
<p><strong>ドイツ 4-0 トリニダード・トバゴ：</strong>ムシアラが2得点、ハフェルツとヴェルナーが各1点。2018年のグループステージ敗退の悪夢を吹き飛かす圧巻のパフォーマンス。ドイツは優勝候補として完全復活を印象づけた。</p>

<h2>2日目の結果 — 歴史的な衝撃</h2>
<p><strong>モロッコ 2-1 アメリカ合衆国（開催国敗退！）：</strong>大会最大の番狂わせ。カタール2022でベスト4入りしたモロッコが、自国開催のアメリカを撃破。ジヤシュ(54分)とブファル(89分)の得点で勝利、プリシッチの71分の得点は及ばなかった。</p>
<p><strong>コロンビア 2-0 メキシコ（第2の開催国敗退！）：</strong>メキシコはシュートを一本も枠内に収められず。ハメス・ロドリゲスが全体を支配し、コロンビアが圧倒的な内容で完勝した。</p>
<p><strong>韓国 2-1 カナダ（第3の開催国敗退！）：</strong>孫興民(ソン・フンミン)が2得点の大活躍。48時間で3つの開催国が敗退するという、ワールドカップ史上前例のない事態が起きた。</p>
<p><strong>日本 2-1 クロアチア：</strong>浅尾が22分に先制、三苫が80分に決勝点。モドリッチの50分の得点で一時同点とされたが、日本が底力を見せて逆転勝利。カタール2022のリベンジを果たし、ラウンド16進出を決めた。</p>

${table(
  "ラウンド32全試合結果 — 2026年ワールドカップ",
  ["試合", "結果", "得点者", "日付"],
  [
    ["ブラジル vs エクアドル", "2-0", "ヴィニシウス13', ロドリゴ41'", "6月26日"],
    ["フランス vs ポーランド", "3-1", "エムバペ7', 65', ジルー52' / レヴァンドフスキ80'", "6月26日"],
    ["ドイツ vs T&T", "4-0", "ハフェルツ10', ムシアラ29', 55', ヴェルナー88'", "6月26日"],
    ["スペイン vs トルコ", "2-1", "モラタ25', ヤマル77' / カルハノール43'", "6月26日"],
    ["イングランド vs セネガル", "2-0", "ベリンガム32', サカ68'", "6月26日"],
    ["ポルトガル vs スウェーデン", "3-2", "ロナウド12', 45+2', レオン73' / イサク38', 60'", "6月26日"],
    ["モロッコ vs アメリカ", "2-1", "ジヤシュ54', ブファル89' / プリシッチ71'", "6月27日"],
    ["日本 vs クロアチア", "2-1", "浅尾22', 三苫80' / モドリッチ50'", "6月27日"],
    ["オランダ vs デンマーク", "1-0", "ダンフリース62'", "6月27日"],
    ["ベルギー vs スイス", "2-1", "ルカク35', デブライネ67' / エンボロ20'", "6月27日"],
    ["コロンビア vs メキシコ", "2-0", "コルドバ41', ロドリゲス79'", "6月27日"],
    ["韓国 vs カナダ", "2-1", "ソン38', 71' / デイビッド55'", "6月27日"],
    ["アルゼンチン vs チリ", "1-0", "メッシ45+1'", "6月27日"],
    ["ウルグアイ vs ギリシャ", "2-1", "スアレス17', ニュニェス88' / シオラス51'", "6月27日"],
    ["イタリア vs ナイジェリア", "0-0 (3-2 PK)", "— / —", "6月27日"],
    ["カメルーン vs セルビア", "3-2", "アブバカル11', 44', アバンバ67' / ミトロビッチ28', ウラホビッチ73'", "6月27日"],
  ]
)}

<h2>日本のラウンド16進出 — 歴史的勝利</h2>
<p>日本代表のクロアチア戦勝利は、単なる勝利以上の意味を持つ。2022年カタール大会でPK戦で敗れたリベンジを果たし、アジアのフットボールが世界の舞台で確実に進化していることを証明した。三苫薫の80分の決勝点は、日本全土を熱狂させる素晴らしいシュートだった。ラウンド16では韓国か日本がベスト8入りする可能性がある。アジアのフットボールにとって歴史的な大会となっている。${extLink("https://www.jfa.jp/", "日本サッカー協会公式サイト")}で最新情報を確認できる。</p>

<h2>ラウンド16の展望</h2>
${table(
  "ラウンド16進出チーム",
  ["チーム", "地域", "主力選手", "強み"],
  [
    ["フランス 🇫🇷", "ヨーロッパ", "エムバペ", "個人技の圧倒的な差"],
    ["ブラジル 🇧🇷", "南米", "ヴィニシウス", "スピードと縦への推進力"],
    ["ドイツ 🇩🇪", "ヨーロッパ", "ムシアラ", "プレスとゴール決定力"],
    ["スペイン 🇪🇸", "ヨーロッパ", "ヤマル", "ポゼッションと技術"],
    ["イングランド 🏴󠁧󠁢󠁥󠁮󠁧󠁿", "ヨーロッパ", "ベリンガム", "組織と安定性"],
    ["ポルトガル 🇵🇹", "ヨーロッパ", "ロナウド", "経験とリーダーシップ"],
    ["アルゼンチン 🇦🇷", "南米", "メッシ", "天才性と本能"],
    ["モロッコ 🇲🇦", "アフリカ", "ジヤシュ", "致命的なカウンター"],
    ["日本 🇯🇵", "アジア", "三苫", "規律とプレッシング"],
    ["韓国 🇰🇷", "アジア", "ソン", "個人技+チームワーク"],
    ["カメルーン 🇨🇲", "アフリカ", "アブバカル", "エネルギーと崩し"],
  ]
)}
<p>日本はラウンド16でスペインと対戦する予定。厳しい相手だが、今大会の日本は別物だ。タクティクスと規律が整っており、再び世界を驚かせる可能性は十分にある。${extLink("https://www.jfa.jp/", "JFA")}と${extLink("https://www.espn.com/soccer/", "ESPN")}が詳細な分析を提供している。</p>
`,
  },

  {
    id: 130,
    slug: "ja-wc2026-eliminated-teams",
    title: "2026年ワールドカップ ラウンド32 敗退チーム完全リストと敗因分析",
    description: "2026年FIFAワールドカップのラウンド32で敗退した全16チームの分析。3つの開催国の歴史的敗退を中心に、戦術的敗因と今後の展望を解説。",
    category: "كأس العالم",
    date: "2026-06-28T10:00:00",
    image: img("photo-1553778263-73a83bab9b0c"),
    imageAlt: "2026年ワールドカップ敗退チーム",
    tags: ["ワールドカップ2026", "敗退", "アメリカ", "メキシコ", "カナダ", "分析"],
    readTime: 9,
    lang: "ja",
    content: `
${toc("目次", [
  "史上初の3開催国同時敗退",
  "アメリカ合衆国：自国開催での衝撃の敗退",
  "メキシコ：永続する壁との戦い",
  "カナダ：将来性ある世代の痛い敗退",
  "早期敗退したヨーロッパ勢",
  "敗退チーム完全一覧",
  "各チームへの戦術的教訓",
  "2030年に向けた展望",
])}

<p class="article-intro">16の夢が砕けた。16チームが帰路についた。そしてその中に、共通点を持つ3チームがいた。開催国という栄誉を持ちながら、わずか48時間以内にすべて敗退してしまったアメリカ、メキシコ、カナダだ。ワールドカップ史上かつて例のないこの出来事は、世界のフットボール界に衝撃を与えた。</p>

${table(
  "ラウンド32敗退チーム完全一覧",
  ["チーム", "敗退相手", "結果", "主な敗因"],
  [
    ["アメリカ 🇺🇸", "モロッコ", "1-2", "守備の脆弱性と終盤の失点"],
    ["メキシコ 🇲🇽", "コロンビア", "0-2", "攻撃での完全な創造性不足"],
    ["カナダ 🇨🇦", "韓国", "1-2", "守備での個人的なミス"],
    ["ポーランド 🇵🇱", "フランス", "1-3", "エムバペを止められなかった"],
    ["エクアドル 🇪🇨", "ブラジル", "0-2", "ブラジルのプレッシングに屈した"],
    ["T&T 🇹🇹", "ドイツ", "0-4", "技術的な差が大きすぎた"],
    ["トルコ 🇹🇷", "スペイン", "1-2", "後半にコントロールを失った"],
    ["セネガル 🇸🇳", "イングランド", "0-2", "イングランドのブロックを崩せず"],
    ["スウェーデン 🇸🇪", "ポルトガル", "2-3", "重要な場面での守備の崩壊"],
    ["クロアチア 🇭🇷", "日本", "1-2", "黄金世代の終焉"],
    ["デンマーク 🇩🇰", "オランダ", "0-1", "わずかな差での敗退"],
    ["スイス 🇨🇭", "ベルギー", "1-2", "デブライネの終盤の輝き"],
    ["チリ 🇨🇱", "アルゼンチン", "0-1", "メッシの一発で決着"],
    ["ギリシャ 🇬🇷", "ウルグアイ", "1-2", "88分のニュニェスのヘッド"],
    ["ナイジェリア 🇳🇬", "イタリア", "0-0 (2-3 PK)", "PK戦での悲劇"],
    ["セルビア 🇷🇸", "カメルーン", "2-3", "アフリカの歴史的番狂わせ"],
  ]
)}

<h2>日本にとっての意味</h2>
<p>クロアチアの敗退は、日本にとって特別な意味を持つ。2022年カタール大会でPK戦で屈した相手に雪辱を果たし、日本サッカーの確かな進歩を世界に示した。今回の勝利はフロックではない。日本は欧州リーグで活躍する選手を多数擁し、戦術的な洗練度も大きく向上している。</p>

<h2>2030年に向けた教訓</h2>
${table(
  "敗退チームへの戦術的教訓",
  ["チーム", "主な教訓", "2030年の優先事項"],
  [
    ["アメリカ", "スピードのある相手への守備的安定性", "勝者のメンタリティを構築"],
    ["メキシコ", "攻撃の刷新と世代交代", "新しいゴールスコアラーの育成"],
    ["カナダ", "守備コミュニケーションと経験", "育成プロセスへの投資"],
    ["クロアチア", "緊急の世代交代が必要", "新しいリーダーの発掘"],
  ]
)}
<p>フットボールは待ってくれない。敗北から学ぶチームが強くなって戻ってくる。2030年ワールドカップはすでに視野に入っている。${extLink("https://www.jfa.jp/", "JFA")}は継続的に代表チームの強化プログラムを推進している。</p>
`,
  },

  {
    id: 131,
    slug: "ja-wc2026-round16-qualified",
    title: "2026年ワールドカップ ラウンド16進出チーム完全ガイド",
    description: "2026年FIFAワールドカップのラウンド16に進出した全16チームの解説。各チームの強み、主力選手、そして次ラウンドの対戦カード予想。",
    category: "كأس العالم",
    date: "2026-06-29T00:00:00",
    image: img("photo-1517927033932-b3d18e61fb3a"),
    imageAlt: "2026年ワールドカップ ラウンド16進出チーム",
    tags: ["ワールドカップ2026", "ラウンド16", "進出チーム", "予想"],
    readTime: 9,
    lang: "ja",
    content: `
${toc("目次", [
  "16チームの概要",
  "南米勢：4つの本命",
  "欧州勢：実力と多様性",
  "アフリカ・アジアが歴史を作る",
  "ラウンド16の対戦カード",
  "分析と予想",
])}

<p class="article-intro">残り16チーム。16の夢が続く。そして何より特筆すべきは、この16チームの多様性だ。アフリカとアジアから4チーム、欧州の強豪、南米の常連——これほど多彩な顔ぶれがラウンド16に揃ったことは、ワールドカップ史上かつてなかった。日本も堂々と名を連ねている。</p>

${table(
  "ラウンド16進出チーム",
  ["チーム", "地域", "主力選手", "強み"],
  [
    ["フランス 🇫🇷", "欧州", "エムバペ", "個人技の卓越性"],
    ["ブラジル 🇧🇷", "南米", "ヴィニシウスJr.", "スピードと推進力"],
    ["ドイツ 🇩🇪", "欧州", "ムシアラ", "組織力とゴール力"],
    ["スペイン 🇪🇸", "欧州", "ヤマル", "ポゼッションと技術"],
    ["イングランド 🏴󠁧󠁢󠁥󠁮󠁧󠁿", "欧州", "ベリンガム", "規律と安定性"],
    ["ポルトガル 🇵🇹", "欧州", "クリスティアーノ・ロナウド", "経験とリーダーシップ"],
    ["アルゼンチン 🇦🇷", "南米", "メッシ", "天才と本能"],
    ["オランダ 🇳🇱", "欧州", "ファン・ダイク", "堅固な守備"],
    ["ベルギー 🇧🇪", "欧州", "デブライネ", "中盤の創造性"],
    ["イタリア 🇮🇹", "欧州", "バレッラ", "戦術的な組織"],
    ["ウルグアイ 🇺🇾", "南米", "ニュニェス", "ハートと闘志"],
    ["コロンビア 🇨🇴", "南米", "J・ロドリゲス", "エレガントな連携プレー"],
    ["モロッコ 🇲🇦", "アフリカ", "ジヤシュ", "致死的なカウンター"],
    ["日本 🇯🇵", "アジア", "三苫薫", "規律とプレッシング"],
    ["韓国 🇰🇷", "アジア", "ソン・フンミン", "個人技+チームワーク"],
    ["カメルーン 🇨🇲", "アフリカ", "アブバカル", "エネルギーと爆発力"],
  ]
)}

<h2>ラウンド16対戦カード</h2>
${table(
  "ラウンド16試合日程",
  ["試合", "日程", "注目点"],
  [
    ["ブラジル vs コロンビア", "6月30日", "南米の頂上対決"],
    ["フランス vs カメルーン", "6月30日", "アフリカ最大の挑戦"],
    ["ドイツ vs ウルグアイ", "7月1日", "歴史的な強豪対決"],
    ["アルゼンチン vs 韓国", "7月1日", "メッシ vs ソン"],
    ["スペイン vs 日本", "7月2日", "ティキタカ vs アジアの規律"],
    ["モロッコ vs ベルギー", "7月2日", "最も予測不能な試合"],
    ["オランダ vs イングランド", "7月3日", "欧州のクラシック"],
    ["ポルトガル vs イタリア", "7月3日", "2大レジェンドの激突"],
  ]
)}

<h2>日本の展望 — スペイン戦に向けて</h2>
<p>スペインは世界最高レベルの戦術と技術を持つチームだ。しかし日本は2022年カタール大会でスペインを破った実績がある。あの勝利の再現を狙う日本代表には、十分な自信と戦術的準備がある。フォーメーション、プレッシング、そしてカウンターアタックの組み合わせが再び機能するかが鍵となる。${extLink("https://www.jfa.jp/", "日本サッカー協会")}は選手たちの最高のパフォーマンスを支援している。日本代表を応援しよう。</p>
`,
  },

  {
    id: 132,
    slug: "ja-wc2026-biggest-surprises",
    title: "2026年ワールドカップ 最大のサプライズ — 3開催国が48時間で敗退の衝撃",
    description: "2026年FIFAワールドカップの歴史的番狂わせを総まとめ。3つの開催国の同時敗退、モロッコの米国撃破、カメルーンのセルビア撃破など完全分析。",
    category: "كأس العالم",
    date: "2026-06-29T14:00:00",
    image: img("photo-1560272564-c83b66b1ad12"),
    imageAlt: "2026年ワールドカップ最大のサプライズ",
    tags: ["ワールドカップ2026", "番狂わせ", "モロッコ", "カメルーン", "歴史"],
    readTime: 10,
    lang: "ja",
    content: `
${toc("目次", [
  "歴史を書き換えた夜",
  "モロッコ 2-1 アメリカ：開催国が観客に",
  "コロンビア 2-0 メキシコ：容赦なし",
  "韓国 2-1 カナダ：ソンが止まらない",
  "カメルーン 3-2 セルビア：アフリカの奇跡",
  "日本 2-1 クロアチア：黄金世代の終幕",
  "歴史的番狂わせランキング",
  "世界サッカーの未来",
])}

<p class="article-intro">計画を立てることはできる。分析することもできる。予期せぬ出来事に備えることもできる。だが2026年ワールドカップが48時間でもたらしたものに、世界のサッカー界は完全に準備できていなかった。3つの開催国が敗退。4つのアフリカ・アジアの奇跡。世界サッカーの秩序がその根底から揺さぶられた。これは普通の夜ではない——スポーツ史における転換点だ。</p>

<h2>モロッコ 2-1 アメリカ</h2>
<p>スタジアムはアメリカ国旗で溢れていた。雰囲気は電気のように張り詰め、プレッシャーは最高潮に達していた。しかしモロッコは怯まなかった。2022年カタール大会のベスト4という実績を持つチームが、自国開催のアメリカを撃破した。ジヤシュが54分に先制、ブファルが89分にダメを押し、プリシッチの71分のゴールも及ばなかった。最初の開催国が敗退した。サッカーに情けはない。</p>

<h2>カメルーン 3-2 セルビア</h2>
<p>アブバカルが前半に2得点。セルビアはミトロビッチとウラホビッチで反撃を試みたが、67分のアバンバの3点目が決定打となった。アフリカのサッカーの歴史に残る偉業だ。ヨーロッパのビッグリーグでプレーする選手を多数抱えるセルビアに対して、カメルーンが完璧なパフォーマンスを見せた。</p>

<h2>日本 2-1 クロアチア：リベンジ完了</h2>
<p>2022年カタールでPK戦で敗れた相手への完璧な雪辱。三苫の80分の決勝点は日本全土を熱狂させた。クロアチアの黄金世代——モドリッチ、コバチッチ、ブロゾビッチ——にとっては、ワールドカップでの最後の戦いとなった可能性が高い。日本にとっては歴史的な一勝だ。</p>

${table(
  "番狂わせランキング — ラウンド32、2026年ワールドカップ",
  ["順位", "番狂わせ", "衝撃度 (1-10)"],
  [
    ["1", "3開催国が48時間で敗退", "10/10"],
    ["2", "モロッコがアメリカ本土でアメリカを撃破", "9.5/10"],
    ["3", "カメルーン 3-2 セルビア", "8.5/10"],
    ["4", "コロンビア 2-0 メキシコ（メキシコは枠内シュートゼロ）", "8/10"],
    ["5", "日本 2-1 クロアチア — モドリッチ世代の終幕", "7.5/10"],
  ]
)}

<h2>世界サッカーの新しい秩序</h2>
<p>2026年が教えてくれることは根本的だ。伝統的な強豪とその他の差は、かつてないほど縮まっている。モロッコ、カメルーン、日本、韓国がここにいるのは運ではない。長年にわたる体系的な投資、戦術的洗練、そして世界のトップリーグで活躍する選手たちの結果だ。グローバルサッカーは民主化された。それはこのスポーツと地球全体にとって素晴らしいニュースだ。${extLink("https://www.jfa.jp/", "JFA")}は引き続き日本代表の歴史的な挑戦を支えていく。</p>
`,
  },
];
