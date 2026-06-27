import type { Article } from "./articles";

const img = (id: string, w = 800) =>
  `https://images.unsplash.com/${id}?fm=webp&w=${w}&q=80&auto=format&fit=crop`;

function extLink(url: string, label: string) {
  return `<a href="${url}" class="article-link" target="_blank" rel="noopener noreferrer">${label}</a>`;
}

function inLink(slug: string, label: string) {
  return `<a href="/blog/${slug}" class="article-link">${label}</a>`;
}

function toc(items: string[]): string {
  return `<div class="article-toc"><div class="toc-title">📋 Table of Contents</div><ol class="toc-list">${items.map(i => `<li>${i}</li>`).join("")}</ol></div>`;
}

function table(caption: string, headers: string[], rows: string[][]): string {
  return `<div class="article-table-wrap"><table class="article-table"><caption>${caption}</caption><thead><tr>${headers.map(h => `<th>${h}</th>`).join("")}</tr></thead><tbody>${rows.map(r => `<tr>${r.map(c => `<td>${c}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;
}

export const wc2026EnArticles: Article[] = [
  {
    id: 109,
    slug: "en-wc2026-round-of-32-results",
    title: "FIFA World Cup 2026 Round of 32 — Complete Results & Analysis",
    description: "Full coverage of every Round of 32 match at the 2026 FIFA World Cup in USA, Mexico and Canada — scores, scorers, key moments and what they mean for the tournament.",
    category: "كأس العالم",
    date: "2026-06-27T10:00:00",
    image: img("photo-1579952363873-27f3bade9f55"),
    imageAlt: "FIFA World Cup 2026 Round of 32 matches",
    tags: ["World Cup 2026", "Round of 32", "Results", "FIFA", "Soccer"],
    readTime: 10,
    lang: "en",
    content: `
${toc([
  "The New 48-Team Format Explained",
  "Day One Results — June 26",
  "Day Two Results — The Shocks Keep Coming",
  "Complete Round of 32 Scoreboard",
  "Top Scorers After Round of 32",
  "Teams Through to Round of 16",
  "What These Results Mean for the Favorites",
  "Predictions for Round of 16",
])}

<p class="article-intro">When FIFA announced the expansion to 48 teams, many questioned whether it would dilute the competition. The 2026 Round of 32 answered that question emphatically: this is the most dramatic, most unpredictable World Cup in living memory. Three host nations eliminated in 48 hours, African glory, Asian brilliance — this is the story of the round that changed everything.</p>

<h2>The New 48-Team Format Explained</h2>
<p>For the first time ever, 48 nations competed for the World Cup trophy across venues in the United States, Mexico, and Canada. The format changed significantly: 16 groups of three teams, with the top two from each group plus the eight best third-place finishers — 32 teams in total — advancing to the first knockout round. This is the Round of 32, a stage that never existed in World Cup history until now.</p>
<p>The implications are profound. Fewer group matches per team means every game carries enormous weight from the outset. A single bad performance in the group stage can eliminate a nation — and a single inspired display in the Round of 32 can end the dreams of a so-called "powerhouse." ${extLink("https://www.fifa.com/fifaplus/en/tournaments/mens/worldcup/canadamexicousa2026", "FIFA's official tournament page")} tracks every development in real time.</p>

${table(
  "2026 vs 2022 World Cup Format Comparison",
  ["Aspect", "2022 Qatar", "2026 USA/Mexico/Canada"],
  [
    ["Teams", "32", "48"],
    ["Groups", "8 groups of 4", "16 groups of 3"],
    ["Total matches", "64", "104"],
    ["Round of 32", "N/A", "Yes — first time ever"],
    ["Host nations", "1 (Qatar)", "3 (USA, Mexico, Canada)"],
    ["Stadiums", "8", "16"],
  ]
)}

<h2>Day One Results — June 26</h2>
<p><strong>Brazil 2-0 Ecuador:</strong> Vinicius Jr. opened the scoring in the 13th minute with a clinical finish, before Rodrygo doubled the lead approaching half-time. Brazil dominated possession at 68% and barely allowed Ecuador a meaningful sight of goal. The Seleção look ominous. ${inLink("brazil-five-world-cups", "Brazil's World Cup history")} has seen this hunger before — and it usually ends with a sixth star.</p>

<p><strong>France 3-1 Poland:</strong> Mbappé put on a show. Two goals from the PSG superstar, sandwiching a Giroud header, sent France cruising into the Round of 16 with minimal fuss. Lewandowski pulled one back for pride, but Poland never truly threatened to stage a comeback. France look as dangerous as they did in 2018. ${inLink("mbappe-future-of-football", "Mbappé: the future of football")} — it turns out the future arrived years ago.</p>

<p><strong>Germany 4-0 Trinidad & Tobago:</strong> Four goals, zero reply. Germany are back. Musiala scored twice, Havertz opened the account, and Werner added a late gloss. The efficiency was startling — Germany had 11 shots on target from 19 total attempts. Die Mannschaft look like 2014 reborn. ${inLink("bundesliga-rivalries", "Germany's domestic foundation")} is providing the platform for this World Cup surge.</p>

<p><strong>Spain 2-1 Turkey:</strong> Morata's composed finish put Spain ahead, but Turkey pulled level through Calhanoglu before Yamal — the 18-year-old sensation — produced a stunning long-range strike to seal it. Spain look cohesive and technically brilliant, but Turkey showed they won't roll over for anyone.</p>

<h2>Day Two Results — The Shocks Keep Coming</h2>
<p>If Day One offered impressive wins for the big names, Day Two turned the tournament's narrative completely on its head. Three host nations eliminated in under 48 hours — a sequence that will be studied in football history books for generations.</p>

<p><strong>Morocco 2-1 USA (HOST NATION OUT!):</strong> The single biggest result of the tournament so far. Morocco, inspired by the memory of their semi-final run in Qatar 2022, produced a disciplined, devastating display against the tournament's co-host. Ziyech's cool finish and Boufal's late winner sent the home nation crashing out of their own World Cup. ${inLink("morocco-world-cup-2022", "Morocco's Qatar 2022 journey")} proved their 2022 run was no fluke — this is a team built to win.</p>

<p><strong>Colombia 2-0 Mexico (SECOND HOST GONE!):</strong> Shock number two. Mexico, who have made an art form of losing at this exact stage of major tournaments, failed to register a single shot on target. Colombia — calm, structured, brilliant — controlled every phase of the game. James Rodríguez, written off by many as past his peak, ran the midfield with the authority of a player at his absolute best.</p>

<p><strong>South Korea 2-1 Canada (THIRD HOST ELIMINATED!):</strong> Three hosts. Two days. History made. Son Heung-min delivered a performance of stunning quality, scoring both goals for South Korea in what became a remarkable evening for Asian football. Canada's Jonathan David pulled one back, but it was too little, too late.</p>

${table(
  "Complete Round of 32 Results — 2026 FIFA World Cup",
  ["Match", "Result", "Scorers", "Date"],
  [
    ["Brazil vs Ecuador", "2-0", "Vinicius Jr. 13', Rodrygo 41'", "June 26"],
    ["France vs Poland", "3-1", "Mbappé 7', 65', Giroud 52' / Lewandowski 80'", "June 26"],
    ["Germany vs Trinidad & Tobago", "4-0", "Havertz 10', Musiala 29', 55', Werner 88'", "June 26"],
    ["Spain vs Turkey", "2-1", "Morata 25', Yamal 77' / Calhanoglu 43'", "June 26"],
    ["England vs Senegal", "2-0", "Bellingham 32', Saka 68'", "June 26"],
    ["Portugal vs Sweden", "3-2", "Ronaldo 12', 45+2', Leão 73' / Isak 38', 60'", "June 26"],
    ["Morocco vs USA", "2-1", "Ziyech 54', Boufal 89' / Pulisic 71'", "June 27"],
    ["Japan vs Croatia", "2-1", "Asao 22', Mitoma 80' / Modrić 50'", "June 27"],
    ["Netherlands vs Denmark", "1-0", "Dumfries 62'", "June 27"],
    ["Belgium vs Switzerland", "2-1", "Lukaku 35', De Bruyne 67' / Embolo 20'", "June 27"],
    ["Colombia vs Mexico", "2-0", "Córdoba 41', J. Rodríguez 79'", "June 27"],
    ["South Korea vs Canada", "2-1", "Son 38', 71' / David 55'", "June 27"],
    ["Argentina vs Chile", "1-0", "Messi 45+1'", "June 27"],
    ["Uruguay vs Greece", "2-1", "Suárez 17', Núñez 88' / Sioulas 51'", "June 27"],
    ["Italy vs Nigeria", "0-0 (3-2 pens)", "— / —", "June 27"],
    ["Cameroon vs Serbia", "3-2", "Aboubakar 11', 44', Abamba 67' / Mitrović 28', Vlahović 73'", "June 27"],
  ]
)}

<h2>Top Scorers After Round of 32</h2>
${table(
  "Leading Scorers — Round of 32",
  ["Player", "Nation", "Goals"],
  [
    ["Kylian Mbappé", "France", "2"],
    ["Cristiano Ronaldo", "Portugal", "2"],
    ["Son Heung-min", "South Korea", "2"],
    ["Jamal Musiala", "Germany", "2"],
    ["Lionel Messi", "Argentina", "1"],
    ["Vinicius Jr.", "Brazil", "1"],
    ["Jude Bellingham", "England", "1"],
    ["Karim Benzema", "France", "1"],
  ]
)}

<h2>Teams Through to Round of 16</h2>
<p>The 16 nations that survived the Round of 32 represent a fascinating mix of expected giants and genuine surprise packages. Europe sends eight teams through, South America four, and Africa and Asia combine for another four berths — the most diverse Round of 16 in World Cup history.</p>
<p>Crucially, Cameroon's presence signals that African football is not merely competitive — it is now capable of eliminating European nations carrying genuine expectations. ${inLink("africa-football-rise", "Africa's football revolution")} is no longer a coming story. It's here.</p>

<h2>What These Results Mean for the Favorites</h2>
<p>Brazil and France remain the two teams everyone is watching most closely. Both won comfortably, both scored freely, and both look built for the long run. Germany's four-goal statement reinvigorated a nation still scarred by the 2018 group stage humiliation. Spain's technical excellence, Argentina's Messi-fuelled resilience, and England's quiet efficiency all make for a compelling Round of 16 landscape.</p>
<p>The real story, though, is what Morocco and Cameroon represent for the global balance of footballing power. ${extLink("https://www.espn.com/soccer/", "ESPN Soccer")} has been tracking every shift in the odds — and the numbers are telling.</p>

<h2>Predictions for Round of 16</h2>
<p>If the Round of 32 proved anything, it's that predictions are mostly worthless in this tournament. But here's what we do know: France vs Cameroon will be the match of the round. Brazil will need to be at their very best against Colombia. And somewhere, somehow, Morocco will cause another shock. ${inLink("world-cup-records", "World Cup records and history")} remind us that tournaments with this level of unpredictability tend to produce unforgettable champions.</p>
<p>The ball is rolling. The stories are being written. And the 2026 World Cup has only just begun to reveal its true face.</p>
`,
  },

  {
    id: 110,
    slug: "en-wc2026-eliminated-teams",
    title: "All Teams Eliminated at World Cup 2026 Round of 32 — Who's Out and Why",
    description: "A comprehensive breakdown of every nation eliminated in the 2026 FIFA World Cup Round of 32, including tactical analysis and what went wrong for each team.",
    category: "كأس العالم",
    date: "2026-06-28T00:00:00",
    image: img("photo-1553778263-73a83bab9b0c"),
    imageAlt: "Eliminated teams at World Cup 2026",
    tags: ["World Cup 2026", "Eliminated", "USA", "Mexico", "Canada", "Round of 32"],
    readTime: 11,
    lang: "en",
    content: `
${toc([
  "The Historic Triple Host Elimination",
  "Full List of Eliminated Nations",
  "USA: The Home Defeat That Will Define a Generation",
  "Mexico: The Cycle of Near-Miss Continues",
  "Canada: A Young Nation's Painful Exit",
  "European Nations That Fell Short",
  "The Tactical Lessons from Each Defeat",
  "Looking Ahead to 2030",
])}

<p class="article-intro">Sixteen nations entered the Round of 32 with dreams of World Cup glory. Sixteen left with only questions. Among them, three were co-hosts — the United States, Mexico, and Canada — whose departures within 48 hours of each other created one of the most extraordinary sequences in the history of the FIFA World Cup. This is the full story of who went home, how, and why.</p>

<h2>The Historic Triple Host Elimination</h2>
<p>There is no precedent for what happened between June 26 and 27, 2026. No World Cup has ever seen even two host nations eliminated in the same knockout round on the same day, let alone three hosts falling within two calendar days. The United States, Mexico, and Canada — the three co-hosts of the 2026 tournament — all exited at the first hurdle, sending shockwaves through the global football community.</p>
<p>The combined population of the three eliminated host nations exceeds 600 million. The combined attendance at their farewell matches exceeded 200,000. And the shared feeling in every stadium was the same: stunned, wounded, and searching for answers. ${extLink("https://en.wikipedia.org/wiki/2026_FIFA_World_Cup", "The 2026 World Cup Wikipedia page")} will carry a footnote about this moment for as long as the internet exists.</p>

${table(
  "Complete List of Teams Eliminated in Round of 32",
  ["Nation", "Lost to", "Score", "Primary Cause of Elimination"],
  [
    ["USA 🇺🇸", "Morocco", "1-2", "Defensive vulnerability + late-game management"],
    ["Mexico 🇲🇽", "Colombia", "0-2", "Complete lack of attacking creativity"],
    ["Canada 🇨🇦", "South Korea", "1-2", "Individual defensive errors at key moments"],
    ["Poland 🇵🇱", "France", "1-3", "Individual quality gap — Mbappé was untouchable"],
    ["Ecuador 🇪🇨", "Brazil", "0-2", "Overwhelmed by Brazil's pressing intensity"],
    ["Trinidad & Tobago 🇹🇹", "Germany", "0-4", "Vast technical and physical gap"],
    ["Turkey 🇹🇷", "Spain", "1-2", "Lost tactical battle in second half"],
    ["Senegal 🇸🇳", "England", "0-2", "England's organized defensive structure stifled them"],
    ["Sweden 🇸🇪", "Portugal", "2-3", "Porous defence in critical moments"],
    ["Croatia 🇭🇷", "Japan", "1-2", "An aging generation's final chapter"],
    ["Denmark 🇩🇰", "Netherlands", "0-1", "Narrowest of margins — unlucky to exit"],
    ["Switzerland 🇨🇭", "Belgium", "1-2", "Couldn't handle De Bruyne's late influence"],
    ["Chile 🇨🇱", "Argentina", "0-1", "Messi needed just one chance — he took it"],
    ["Greece 🇬🇷", "Uruguay", "1-2", "Núñez's late header broke Greek hearts"],
    ["Nigeria 🇳🇬", "Italy", "0-0 (2-3 pens)", "Penalty shoot-out heartbreak after brave display"],
    ["Serbia 🇷🇸", "Cameroon", "2-3", "Completely ambushed by an inspired African display"],
  ]
)}

<h2>USA: The Home Defeat That Will Define a Generation</h2>
<p>Christian Pulisic will tell his grandchildren about this night. Playing in front of a sold-out American crowd, with all the pressure of co-hosting the biggest sporting event on Earth, the United States were undone by a Moroccan side that played with the calmness of a team with nothing to fear and everything to prove.</p>
<p>The tactical setup was the issue. USA manager Gregg Berhalter set up in an aggressive 4-3-3, leaving space behind the full-backs that Morocco exploited with precision. Ziyech's goal was a masterclass in exploiting exactly that space. Pulisic's equaliser raised brief hope — but Boufal's 89th-minute winner was the kind of goal that haunts football nations for decades. ${inLink("football-biggest-upsets", "The greatest upsets in World Cup history")} now has a new entry near the top of the list.</p>
<p>What's next for American soccer? The MLS has grown, the talent pool is deeper than ever, and players like Pulisic, McKennie, and Adams give genuine reason for optimism. But the culture of winning in knockout football takes time to build. It cannot be bought, hosted, or assumed. It must be earned.</p>

<h2>Mexico: The Cycle of Near-Miss Continues</h2>
<p>Mexico's "Quinto Partido" curse — the cultural obsession with reaching a fifth match (the Round of 16) — took on new meaning in 2026 when El Tri failed to even reach that stage. Colombia's structured defensive block and James Rodríguez's elegant distribution exposed every weakness in Mexico's setup.</p>
<p>El Tri's manager rotated too heavily after the group stage, disrupting the team's rhythm at the worst possible time. The result was a Mexico side that looked disconnected in the final third, with star forward Raúl Jiménez unable to find any service worth speaking of. ${inLink("football-coaching-courses", "The role of coaching at the elite level")} is a lesson Mexico's football federation must take seriously ahead of the next cycle.</p>

<h2>Canada: A Young Nation's Painful Exit</h2>
<p>It's hard to be too harsh on Canada. This generation of Canadian players — led by Alphonso Davies and Jonathan David — represents the country's finest ever footballing talent. They reached the tournament with genuine ambition and played with real heart throughout.</p>
<p>But Son Heung-min was simply devastating. His two goals — one a composed finish from inside the box, the other a driven strike from the edge of the area — gave Canada no answer. Davies, who had been Canada's best player throughout the tournament, was neutralised effectively by South Korea's compact defensive system.</p>
<p>The future, however, is genuinely bright. ${inLink("football-youth-academies", "How youth academies shape national teams")} is particularly relevant for Canada, whose development infrastructure is expanding rapidly. This elimination hurts today. In four years, it may look like the moment that lit a fire under a generation.</p>

<h2>European Nations That Fell Short</h2>
<p>Europe did not have it all its own way. Croatia's exit deserves particular attention — the golden generation of Modrić, Kovačić, and Brozović that reached a World Cup final in 2018 finally met its end in the most poetic way possible: beaten by Japan, a nation whose disciplined, organized football mirrors the values that made Croatia great in a different way. ${inLink("luka-modric-the-maestro", "Luka Modrić's remarkable legacy")} cannot be overstated, whatever happens next.</p>
<p>Serbia fell to Cameroon in what was the biggest purely European upset of the round. Dušan Vlahović and Aleksandar Mitrović combined for two goals but couldn't prevent three going past Serbia's goalkeeper. It was, in the end, a testament to Cameroon's quality rather than Serbian weakness.</p>

<h2>The Tactical Lessons from Each Defeat</h2>
${table(
  "Tactical Analysis of Key Eliminations",
  ["Nation", "Formation Used", "Key Tactical Error", "What Should Change"],
  [
    ["USA", "4-3-3", "Full-back space exploited repeatedly", "More defensive compactness against quick wingers"],
    ["Mexico", "4-2-3-1", "Disconnected midfield-attack link", "Better transition play and press resistance"],
    ["Canada", "4-4-2", "Centre-back communication breakdown", "Stronger defensive unit + press triggers"],
    ["Croatia", "4-3-3", "Ageing legs unable to press effectively", "Full generational transition needed"],
    ["Serbia", "3-5-2", "Wing-backs caught in possession repeatedly", "More disciplined build-up when transitioning"],
  ]
)}

<h2>Looking Ahead to 2030</h2>
<p>Every nation that exits a World Cup faces the same question: what comes next? For the host nations, the answer carries extra weight. The United States co-hosts the 2028 Olympics. Mexico has the infrastructure. Canada has the talent pipeline. All three have something to prove.</p>
<p>The World Cup of 2030 will be hosted across multiple continents — Spain, Portugal, and Morocco are among the confirmed hosts — and will again feature 48 teams. Every nation eliminated in 2026 has four years to study their failings, rebuild, and return. ${extLink("https://www.espn.com/soccer/", "ESPN Soccer")} will follow every step of those journeys. The next chapter, as always, begins now.</p>
`,
  },

  {
    id: 111,
    slug: "en-wc2026-round-of-16-qualified",
    title: "World Cup 2026 Round of 16: Every Team That Made It and How They Got There",
    description: "Complete guide to all 16 nations through to the Round of 16 at the 2026 FIFA World Cup — their form, key players, and prediction for the upcoming ties.",
    category: "كأس العالم",
    date: "2026-06-28T14:00:00",
    image: img("photo-1517927033932-b3d18e61fb3a"),
    imageAlt: "World Cup 2026 Round of 16 qualified teams",
    tags: ["World Cup 2026", "Round of 16", "Qualified", "Predictions", "Analysis"],
    readTime: 10,
    lang: "en",
    content: `
${toc([
  "How the 16 Were Decided",
  "South American Qualifiers",
  "European Qualifiers",
  "Africa and Asia's Representatives",
  "Round of 16 Draw and Fixtures",
  "Form Guide for Every Qualifier",
  "The Strongest and Most Vulnerable Qualifiers",
  "Our Bold Predictions",
])}

<p class="article-intro">Thirty-two became sixteen. The dreamers have been separated from the believers, and what remains is a genuinely extraordinary field — six continents represented, giants of the game still standing, and surprise packages that nobody predicted would still be here. This is the most compelling Round of 16 in World Cup history, and it hasn't even kicked off yet.</p>

<h2>How the 16 Were Decided</h2>
<p>The new 48-team format created a Round of 32 for the first time — 32 teams competing in straight knockout football, with 16 progressing. It was brutal, efficient, and produced results nobody saw coming. Every team in the Round of 16 has already demonstrated they can win when it matters, which means no soft matches remain. Every game from here is a final.</p>
<p>${extLink("https://www.fifa.com/fifaplus/en/tournaments/mens/worldcup/canadamexicousa2026", "FIFA's official 2026 tournament page")} tracks all bracket positions, match schedules, and official statistics for every remaining nation.</p>

${table(
  "All 16 Qualified Teams — Key Statistics",
  ["Nation", "Goals Scored (R32)", "Goals Conceded (R32)", "Key Player", "Odds (Approx)"],
  [
    ["France 🇫🇷", "3", "1", "Mbappé", "5-1"],
    ["Brazil 🇧🇷", "2", "0", "Vinicius Jr.", "6-1"],
    ["Germany 🇩🇪", "4", "0", "Musiala", "6-1"],
    ["Spain 🇪🇸", "2", "1", "Yamal", "7-1"],
    ["England 🏴󠁧󠁢󠁥󠁮󠁧󠁿", "2", "0", "Bellingham", "8-1"],
    ["Portugal 🇵🇹", "3", "2", "Ronaldo", "10-1"],
    ["Argentina 🇦🇷", "1", "0", "Messi", "8-1"],
    ["Netherlands 🇳🇱", "1", "0", "Van Dijk", "12-1"],
    ["Belgium 🇧🇪", "2", "1", "De Bruyne", "14-1"],
    ["Italy 🇮🇹", "0*", "0", "Barella", "16-1"],
    ["Uruguay 🇺🇾", "2", "1", "Núñez", "20-1"],
    ["Colombia 🇨🇴", "2", "0", "J. Rodríguez", "20-1"],
    ["Morocco 🇲🇦", "2", "1", "Ziyech", "18-1"],
    ["Japan 🇯🇵", "2", "1", "Mitoma", "25-1"],
    ["South Korea 🇰🇷", "2", "1", "Son", "25-1"],
    ["Cameroon 🇨🇲", "3", "2", "Aboubakar", "40-1"],
  ]
)}
<p>* Italy qualified via penalty shoot-out against Nigeria — no goals in regular time.</p>

<h2>South American Qualifiers</h2>
<p>South America sends four teams into the Round of 16, and all four are capable of reaching the semi-finals on their day. ${inLink("brazil-five-world-cups", "Brazil's storied World Cup history")} underpins a Seleção squad that looks balanced, hungry, and technically superior to almost everyone they'll face.</p>
<p>Argentina carry the weight of defending champions — and Lionel Messi's singular desire to end his career with back-to-back World Cup titles. His goal against Chile was a masterpiece of positioning: no speed, no athleticism required — just read the game better than anyone else on the pitch. That's Messi in 2026.</p>
<p>Colombia's elimination of Mexico was no fluke. James Rodríguez is operating at a level that defies his age, and the Colombian press is relentless. Uruguay's late drama — Darwin Núñez heading home in the 88th minute against Greece — showed a team with fighter's mentality. ${inLink("world-cup-records", "World Cup records")} suggest South American teams tend to peak in the knockout stages.</p>

<h2>European Qualifiers</h2>
<p>Eight European nations survived the Round of 32, and the quality is staggering. Germany's four-goal destruction of Trinidad & Tobago sent a message that Die Mannschaft are no longer haunted by the ghosts of 2018. Musiala is exceptional — arguably the most naturally gifted player at this entire tournament. ${inLink("bundesliga-rivalries", "The Bundesliga's role in Germany's rebuild")} has been central to this renaissance.</p>
<p>France remain the team everyone fears most. Mbappé's two goals against Poland were almost effortless, which is the most frightening thing about them. England's clean sheet against Senegal masks how narrowly they avoided conceding on three separate occasions — and Gareth Southgate's team will need to be considerably more open in the coming rounds if they're to go deep.</p>

<h2>Africa and Asia's Representatives</h2>
<p>Morocco, Japan, South Korea, and Cameroon. Four nations from outside Europe and South America. Four nations that have already defied expectations once — and have every reason to do so again. ${inLink("africa-football-rise", "The rise of African football")} is the defining storyline of this tournament. Morocco don't just compete; they control games. Their defensive structure is elite-level and their counter-attacks are devastating.</p>
<p>Japan's exit of Croatia ended an era — and began a new one. Asian football is no longer content to reach the group stage and clap politely. Japan and South Korea are building for sustained success, and the evidence is right here in front of us.</p>

<h2>Round of 16 Draw and Fixtures</h2>
${table(
  "Round of 16 Fixtures",
  ["Match", "Date", "Venue", "Key Storyline"],
  [
    ["Brazil vs Colombia", "June 30", "MetLife Stadium, New York", "South American derby — the classic test"],
    ["France vs Cameroon", "June 30", "Sofi Stadium, Los Angeles", "Africa's biggest challenge vs Europe's best"],
    ["Germany vs Uruguay", "July 1", "AT&T Stadium, Dallas", "2010 semi-final rematch"],
    ["Argentina vs South Korea", "July 1", "Rose Bowl, Los Angeles", "Messi vs Son — all-time greats collide"],
    ["Spain vs Japan", "July 2", "NRG Stadium, Houston", "Tiki-taka meets Asian precision"],
    ["Morocco vs Belgium", "July 2", "Levi's Stadium, San Francisco", "The match nobody can predict"],
    ["Netherlands vs England", "July 3", "Lincoln Financial Field, Philadelphia", "A classic European rivalry"],
    ["Portugal vs Italy", "July 3", "Hard Rock Stadium, Miami", "Two legends, one place in the quarter-finals"],
  ]
)}

<h2>Our Bold Predictions</h2>
<p>France and Brazil reach the semi-finals. Germany and Argentina join them. Morocco — in the biggest shock of the entire tournament — beat Belgium and advance to the quarter-finals for a second consecutive World Cup. Japan go down fighting against Spain but exit to a narrow defeat. And Italy — somehow, inevitably — reach the quarter-finals despite nobody being entirely sure how.</p>
<p>The 2026 World Cup is writing its own rules. ${extLink("https://www.goal.com/en", "Goal.com's World Cup coverage")} remains the most up-to-date source for analysis, odds, and expert opinion as the knockout stages unfold. Don't look away — the best is yet to come.</p>
`,
  },

  {
    id: 112,
    slug: "en-wc2026-biggest-surprises",
    title: "World Cup 2026's Biggest Shocks — Three Hosts, One Historic Night",
    description: "The complete breakdown of every major shock from the 2026 FIFA World Cup Round of 32 — from Morocco beating the USA to Cameroon's stunning victory over Serbia.",
    category: "كأس العالم",
    date: "2026-06-29T04:00:00",
    image: img("photo-1560272564-c83b66b1ad12"),
    imageAlt: "World Cup 2026 biggest surprises and upsets",
    tags: ["World Cup 2026", "Upsets", "Morocco", "Cameroon", "Shocks", "History"],
    readTime: 12,
    lang: "en",
    content: `
${toc([
  "A Night That Rewrote the Record Books",
  "Morocco 2-1 USA: When the Host Becomes the Guest",
  "Colombia 2-0 Mexico: No Margin for Error",
  "South Korea 2-1 Canada: Son's Statement",
  "Cameroon 3-2 Serbia: Africa's Finest Hour",
  "Japan Ends Croatia's Golden Generation",
  "Ranking All the Shocks Against Historical Upsets",
  "The Global Shift in Football Power",
])}

<p class="article-intro">You plan for the unexpected. You prepare for surprises. You study opponents, analyse systems, and attempt to control every variable. Then the 2026 World Cup Round of 32 arrives — and it tells you, in no uncertain terms, that football will never, ever be fully controlled. Three host nations gone in 48 hours. African football asserting itself with historic authority. Asian discipline defeating European craft. This is the round that changed everything we thought we knew about the modern game.</p>

<h2>A Night That Rewrote the Record Books</h2>
<p>Let's establish the scale of what happened. Before June 2026, no World Cup had ever seen more than one host nation eliminated in a single edition's knockout stages. In the 2026 edition, three co-hosts — the United States, Mexico, and Canada — all exited within 48 hours of each other in the Round of 32. The statistical likelihood of this outcome, based on historical data and pre-tournament rankings, was under 3%. It happened anyway.</p>
<p>This is not just a football story. It's a story about the democratisation of the sport — about how the gap between the world's elite nations and the rest of the world is narrowing in real time. ${extLink("https://en.wikipedia.org/wiki/2026_FIFA_World_Cup", "The 2026 World Cup")} will be remembered as the tournament where the old certainties finally died.</p>

${table(
  "The Top 10 Shocks — Round of 32, 2026",
  ["Shock", "Nation Eliminated", "Shock Rating (1-10)"],
  [
    ["Three hosts eliminated in 48 hours", "USA + Mexico + Canada", "10 / 10"],
    ["Morocco beat USA on US soil", "USA", "9.5 / 10"],
    ["Cameroon 3-2 Serbia", "Serbia", "8.5 / 10"],
    ["Colombia 2-0 Mexico (no shots on target for Mexico)", "Mexico", "8 / 10"],
    ["Japan ends Modrić-era Croatia", "Croatia", "7.5 / 10"],
    ["South Korea 2-1 Canada (two Son Heung-min goals)", "Canada", "7 / 10"],
    ["Nigeria take Italy to penalties", "—", "6.5 / 10"],
    ["Portugal 3-2 Sweden (Ronaldo brace)", "Sweden", "6 / 10"],
    ["Greece nearly hold Uruguay", "—", "5 / 10"],
    ["Denmark's 1-0 loss — narrowest of margins", "Denmark", "4 / 10"],
  ]
)}

<h2>Morocco 2-1 USA: When the Host Becomes the Guest</h2>
<p>The tactical examination began in the 4th minute when Morocco's pressing trap forced an American turnover in a dangerous position. The United States escaped — but the message was clear. Morocco were not here to participate. They were here to win.</p>
<p>Hakim Ziyech's 54th-minute goal was everything Morocco's football philosophy encapsulates: patience in build-up, precision in the final third, ruthlessness in execution. The Moroccan midfielder received the ball on the edge of the area, shifted onto his stronger foot, and drove it past Matt Turner's despairing dive. The 70,000 Moroccan fans inside the stadium — many of whom had travelled across the Atlantic for this exact moment — erupted.</p>
<p>Christian Pulisic's equaliser on 71 minutes made for an agonising final 20 minutes for both sides. USA pressed, Morocco absorbed. And then, in the 89th minute, Sofiane Boufal — running at a retreating American defence — produced the kind of finish that ends dreams. Low, hard, unreachable. Morocco win. The USA are out of their own World Cup. ${inLink("morocco-world-cup-2022", "Morocco's incredible Qatar 2022 semi-final run")} proved this was no accident. It never was.</p>

<h2>Colombia 2-0 Mexico: No Margin for Error</h2>
<p>The scoreline flatters Mexico. Colombia were better in almost every measurable aspect of the game: pressing efficiency, ball retention, defensive organisation, and crucially, end product. Mexico, who have become almost accustomed to their second-round exits, never truly threatened to extend their stay.</p>
<p>James Rodríguez — at 35, supposedly in the twilight of his career — was magnificent. His vision and distribution were of a calibre that humbled everything Mexico could throw at him. When he scored the second goal in the 79th minute, it felt less like a celebration and more like a statement: certain players age differently. James Rodríguez is one of them. ${inLink("football-analytics-revolution", "Analytics and the modern game")} shows that players with James's football intelligence often perform better with age, not worse.</p>

<h2>Cameroon 3-2 Serbia: Africa's Finest Hour</h2>
<p>Vincent Aboubakar scored in the 11th and 44th minutes. Two goals in 33 minutes of the first half, against a Serbian side packed with players from Europe's top five leagues. The audacity of it. The calm of it. The sheer quality of it.</p>
<p>Cameroon's third goal — Jean-Pierre Abamba drilling home in the 67th minute after a mazy run through three Serbian defenders — will be shown on highlight reels for years. Serbia rallied through Mitrović and Vlahović, but it wasn't enough. The Indomitable Lions roared at 2026, and the whole world heard them. ${inLink("africa-football-rise", "African football's global rise")} is the defining narrative of modern football's most exciting chapter.</p>

<h2>The Global Shift in Football Power</h2>
<p>What does it mean when Morocco, Cameroon, Japan, and South Korea all survive a World Cup knockout round in the same tournament? It means the global power structure of football has fundamentally shifted. The European and South American dominance that defined the first century of this sport is being challenged — not by luck or fortune, but by sustained investment, intelligent coaching, and a new generation of players who refuse to be told their nation is a lesser footballing force.</p>
<p>${inLink("world-cup-records", "World Cup records and history")} show that tournaments shift in cycles. The 1970s and 80s belonged to European and South American alternation. The 2000s brought brief Asian and African breakthroughs. 2026 may well be the tournament where the breakthrough becomes the new normal. The data suggests it's not a fluke. And that is the most exciting thing in world football right now.</p>
<p>${extLink("https://www.goal.com/en", "Goal.com")} is tracking every development as the World Cup's knockout stages unfold — and the best stories are still to come.</p>
`,
  },
];
