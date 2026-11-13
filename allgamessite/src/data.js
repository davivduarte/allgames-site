// Catálogo principal selecionado manualmente. As imagens usam artes do Steam CDN
// pelo AppID correspondente; a IGDB complementa detalhes quando estiver configurada.
export const GTA6_IMAGE = 'https://www.rockstargames.com/VI/downloads/artwork-wallpapers'
export const GTA_RELEASE_DATE = new Date('2026-11-19T00:00:00-03:00')

const hero = id => `https://cdn.akamai.steamstatic.com/steam/apps/${id}/library_hero.jpg`
const head = id => `https://cdn.akamai.steamstatic.com/steam/apps/${id}/header.jpg`
const cap = id => `https://cdn.akamai.steamstatic.com/steam/apps/${id}/library_600x900.jpg`
const capsule = id => `https://cdn.akamai.steamstatic.com/steam/apps/${id}/capsule_616x353.jpg`

// 30 destaques fixos. A ordem desta lista define a vitrine inicial.
const raw = [
[271590,'Grand Theft Auto V',2013,'Ação/Aventura',92],
[730,'Counter-Strike 2 (CS:GO)',2023,'Tiro/Competitivo',82],
[2357570,'Overwatch 2',2022,'Ação/Competitivo',79],
[2669320,'EA SPORTS FC 25',2024,'Esporte/Futebol',78],
[1174180,'Red Dead Redemption 2',2018,'Ação/Aventura',93],
[1086940,"Baldur's Gate 3",2023,'RPG/Estratégia',96],
[1091500,'Cyberpunk 2077',2020,'RPG/Ação',86],
[1245620,'Elden Ring',2022,'RPG/Ação',94],
[570,'Dota 2',2013,'MOBA/Estratégia',90],
[1172470,'Apex Legends',2019,'Ação/Competitivo',88],
[440,'Team Fortress 2',2007,'Ação/Competitivo',92],
[550,'Left 4 Dead 2',2009,'Ação/Co-op',89],
[413150,'Stardew Valley',2016,'Simulação/RPG',89],
[105600,'Terraria',2011,'Aventura/Sobrevivência',81],
[620,'Portal 2',2011,'Puzzle/Aventura',95],
[1593500,'God of War',2018,'Ação/Aventura',93],
[1817070,"Marvel's Spider-Man Remastered",2022,'Ação/Aventura',87],
[1888930,'The Last of Us Part I',2022,'Ação/Aventura',88],
[814380,'Sekiro: Shadows Die Twice',2019,'Ação/Aventura',88],
[292030,'The Witcher 3: Wild Hunt',2015,'RPG/Aventura',93],
[782330,'DOOM Eternal',2020,'Ação',88],
[2050650,'Resident Evil 4',2023,'Ação/Terror',93],
[892970,'Valheim',2021,'Sobrevivência/Co-op',85],
[1623730,'Palworld',2024,'Sobrevivência/Aventura',75],
[553850,'HELLDIVERS 2',2024,'Ação/Co-op',82],
[990080,'Hogwarts Legacy',2023,'RPG/Aventura',84],
[200260,'Batman: Arkham City',2011,'Ação/Aventura',91],
[8870,'BioShock Infinite',2013,'Ação/Aventura',94],
[4000,"Garry's Mod",2006,'Sandbox/Simulação',null],
[264710,'Subnautica',2018,'Sobrevivência/Aventura',87],
[1426210,'It Takes Two',2021,'Co-op/Aventura',88],
]

// Descrições editoriais dos 30 destaques, disponíveis mesmo sem conexão com a API.
const descriptions = {
  271590: 'Explore Los Santos e Blaine County em uma aventura de mundo aberto marcada por assaltos, personagens contrastantes e uma cidade cheia de atividades. Alterne entre Michael, Franklin e Trevor e descubra a campanha ou o universo online.',
  730: 'O clássico competitivo da Valve evoluiu para Counter-Strike 2. Dispute partidas táticas em equipes, domine mapas conhecidos e coordene cada rodada com estratégia, precisão e comunicação.',
  2357570: 'Monte sua equipe de heróis e participe de confrontos por objetivos em partidas rápidas e estratégicas. Cada personagem tem habilidades próprias, incentivando combinações e estilos de jogo diferentes.',
  2669320: 'Entre em campo com clubes, seleções e atletas do futebol mundial. Monte seu elenco, dispute temporadas e explore diferentes modos de jogo em uma experiência feita para quem acompanha futebol.',
  1174180: 'Acompanhe Arthur Morgan e a gangue Van der Linde em uma jornada pelo fim da era do Velho Oeste. Um mundo aberto detalhado, personagens marcantes e escolhas que dão peso à narrativa.',
  1086940: 'Forme um grupo de aventureiros e explore os Reinos Esquecidos em um RPG repleto de escolhas. Suas decisões moldam relações, missões e o rumo de uma história que pode ser vivida de muitas maneiras.',
  1091500: 'Mergulhe em Night City, uma metrópole futurista onde tecnologia, poder e identidade se cruzam. Personalize seu personagem, conheça figuras inesquecíveis e descubra histórias em cada distrito.',
  1245620: 'Explore as Terras Intermédias em uma aventura de fantasia sombria. Enfrente desafios, descubra segredos escondidos e construa seu próprio estilo em um vasto mundo interconectado.',
  570: 'Escolha um herói e trabalhe em equipe para destruir a base adversária. Dota 2 combina estratégia em tempo real, grande variedade de personagens e partidas que exigem adaptação constante.',
  1172470: 'Entre em uma arena competitiva com esquadrões de personagens únicos. Combine habilidades, explore cenários em constante mudança e lute para ser a última equipe de pé.',
  440: 'Um jogo de equipes que mistura classes distintas, mapas variados e partidas cheias de personalidade. Escolha sua função, coopere com o time e encontre seu jeito de contribuir para a vitória.',
  550: 'Reúna amigos para atravessar cenários de sobrevivência cooperativa. Cada campanha mistura tensão, exploração e situações diferentes, fazendo com que o trabalho em equipe seja essencial.',
  413150: 'Comece uma nova vida no campo, cuide de sua fazenda, faça amizades e descubra os segredos do vale. Um simulador acolhedor com liberdade para jogar no seu próprio ritmo.',
  105600: 'Cave, construa e explore um mundo 2D cheio de biomas, criaturas e tesouros. A aventura cresce conforme você cria equipamentos, enfrenta desafios e transforma o ambiente ao seu redor.',
  620: 'Resolva enigmas usando portais para atravessar salas de teste cada vez mais inventivas. Humor inteligente e desafios de raciocínio fazem desta aventura uma experiência memorável.',
  1593500: 'Kratos tenta construir uma nova vida ao lado de Atreus em uma jornada pelos reinos da mitologia nórdica. A aventura combina exploração, desafios e uma história sobre família.',
  1817070: 'Vista o traje do Amigão da Vizinhança e percorra uma Nova York vibrante. Balance entre arranha-céus, enfrente desafios e acompanhe uma aventura que coloca Peter Parker no centro da ação.',
  1888930: 'Em um mundo transformado por uma pandemia, Joel e Ellie atravessam territórios difíceis enquanto constroem uma relação complexa. Uma experiência narrativa sobre sobrevivência, confiança e humanidade.',
  814380: 'Em uma versão fantástica do Japão do período Sengoku, um shinobi parte em uma missão de resgate. Observe padrões dos adversários, aperfeiçoe suas habilidades e supere duelos exigentes.',
  292030: 'Acompanhe Geralt de Rívia em uma busca pessoal por um mundo de fantasia repleto de conflitos e escolhas difíceis. Investigue contratos, conheça personagens e explore regiões vastas.',
  782330: 'Enfrente desafios em uma campanha veloz e intensa. Combine movimentação, recursos e equipamentos para atravessar arenas dinâmicas ao som de uma trilha marcante.',
  2050650: 'Leon Kennedy chega a uma região isolada em uma missão de resgate que rapidamente se torna uma jornada de suspense. Explore ambientes, resolva situações e descubra uma releitura moderna do clássico.',
  892970: 'Desperte em um mundo inspirado na mitologia nórdica e construa seu próprio assentamento. Explore florestas, mares e montanhas, reúna recursos e encare criaturas em cooperação.',
  1623730: 'Explore ilhas misteriosas, construa bases e conheça criaturas com habilidades variadas. Combine exploração, construção e sobrevivência em uma aventura que permite diferentes estilos de progresso.',
  553850: 'Faça parte de esquadrões enviados a planetas distantes em missões cooperativas. Complete objetivos, coordene estratégias e ajude sua equipe a superar ambientes desafiadores.',
  990080: 'Viva uma história original no universo de Harry Potter, explorando Hogwarts e seus arredores no século XIX. Aprenda habilidades, descubra lugares e construa sua trajetória como estudante.',
  200260: 'Assuma o papel do Cavaleiro das Trevas em uma Gotham sombria e cheia de mistérios. Investigue crimes, explore a cidade e descubra uma aventura de ação e investigação.',
  8870: 'Em uma cidade flutuante chamada Columbia, Booker DeWitt recebe a missão de encontrar Elizabeth. A jornada mistura ficção científica, atmosfera marcante e uma narrativa cheia de reviravoltas.',
  4000: 'Um sandbox criativo que permite construir cenários, experimentar objetos e criar situações com ferramentas e conteúdos da comunidade. A diversão está na liberdade de inventar.',
  264710: 'Após um acidente em um planeta oceânico, explore profundezas desconhecidas para encontrar recursos e entender o ambiente. A curiosidade guia uma aventura de sobrevivência subaquática.',
  1426210: 'Dois amigos precisam aprender a cooperar em uma aventura feita para duas pessoas. Cada fase apresenta mecânicas diferentes e desafios que dependem de comunicação e trabalho em conjunto.'
}

export const DEMO = raw.map(([id, name, y, g, m]) => ({
  id: 'd' + id, name, released: `${y}-01-01`, yearOnly: true, metacritic: m,
  genres: g.split('/').map(n => ({ name: n })),
  images: [hero(id), head(id), capsule(id), cap(id)], description_raw: descriptions[id], demo: true,
}))
export const GTA6_DEMO = {
  id: 'gta6', name: 'Grand Theft Auto VI', released: '2026-11-19', metacritic: null,
  genres: [{ name: 'Ação' }, { name: 'Aventura' }],
  // A IGDB fornece as artes quando disponível; o endereço oficial fica como referência de mídia.
  images: [
    'https://www.rockstargames.com/VI/_next/static/media/Vice_City_Postcard_landscape.0v2njmlk2n-qm.jpg?akim=1&imdensity=1&imwidth=3840',
    'https://www.rockstargames.com/VI/_next/static/media/Leonida_Keys_Postcard_landscape.05oezf2h--~ed.jpg?akim=1&imdensity=1&imwidth=3840',
    'https://www.rockstargames.com/VI/_next/static/media/Port_Gellhorn_Postcard_landscape.176c2o75nmcr8.jpg?akim=1&imdensity=1&imwidth=3840',
    'https://www.rockstargames.com/VI/_next/static/media/Ambrosia_Postcard_landscape.0gd~9a41ia-rt.jpg?akim=1&imdensity=1&imwidth=3840',
    'https://www.rockstargames.com/VI/_next/static/media/Grassrivers_Postcard_landscape.15-10i39nhex2.jpg?akim=1&imdensity=1&imwidth=3840',
    'https://www.rockstargames.com/VI/_next/static/media/Mount_Kalaga_National_Park_Postcard_landscape.0c1cb4ocq16n3.jpg?akim=1&imdensity=1&imwidth=3840'
  ], demo: true,
  description_raw: 'Vice City e o estado de Leonida voltam em um novo capítulo da Rockstar Games. Previsto para PlayStation 5 e Xbox Series X|S.',
}

export const BANK = [
['Em que ano Grand Theft Auto V foi lançado originalmente?',['2011','2013','2015','2017'],1,'GTA V chegou em setembro de 2013 para PS3 e Xbox 360.'],
['Qual estúdio desenvolveu The Witcher 3?',['Rockstar Games','Naughty Dog','CD Projekt Red','Bethesda'],2,'A CD Projekt Red é da Polônia.'],
['Em que ano Minecraft teve o lançamento oficial (1.0)?',['2009','2010','2011','2012'],2,'A versão 1.0 saiu em novembro de 2011.'],
['Quem é o filho de Kratos em God of War (2018)?',['Atreus','Deimos','Loki','Baldur'],0,'Atreus é também conhecido como Loki na mitologia nórdica.'],
['Qual estúdio criou Elden Ring?',['Capcom','FromSoftware','Square Enix','Platinum Games'],1,'Com colaboração de George R. R. Martin no worldbuilding.'],
['Qual é o nome da princesa em The Legend of Zelda?',['Peach','Zelda','Samus','Daisy'],1,'Aliás, o herói se chama Link!'],
['Qual empresa criou o Pac-Man?',['Atari','Sega','Namco','Konami'],2,'Pac-Man estreou em 1980.'],
['Qual é a cidade fictícia de GTA V?',['Liberty City','Vice City','San Fierro','Los Santos'],3,'Los Santos é inspirada em Los Angeles.'],
['Qual jogo apresentou a famosa "arma de portais"?',['Half-Life','Portal','Quake','Prey'],1,'Portal foi lançado em 2007 dentro da The Orange Box.'],
['Qual estúdio criou The Last of Us?',['Santa Monica','Insomniac','Naughty Dog','Sucker Punch'],2,'O primeiro jogo saiu em 2013 para PS3.'],
['De qual jogo é a frase "Would you kindly?"',['Fallout','BioShock','Dishonored','System Shock'],1,'Uma das maiores reviravoltas dos games.'],
['Quantos Pokémon existem na primeira geração?',['100','120','151','200'],2,'De Bulbasaur a Mew.'],
['Qual é o nome do reino subterrâneo de Hollow Knight?',['Hallownest','Lordran','Drangleic','Yharnam'],0,'Hallownest foi feito pela Team Cherry, da Austrália.'],
['Quem é o protagonista de The Witcher 3?',['Geralt de Rívia','Vesemir','Dandelion','Aiden Pearce'],0,'Também conhecido como o Lobo Branco.'],
['Qual estúdio criou Hades?',['Supergiant Games','Team Cherry','Playdead','Devolver'],0,'Hades venceu diversos prêmios de jogo do ano em 2020/21.'],
['Em que ano Super Mario Bros. foi lançado no NES?',['1983','1985','1987','1990'],1,'Lançado no Japão em setembro de 1985.'],
['Qual empresa desenvolveu Half-Life?',['id Software','Valve','Epic Games','Blizzard'],1,'Half-Life saiu em 1998.'],
['Quem criou Stardew Valley praticamente sozinho?',['Toby Fox','Eric Barone','Markus Persson','Lucas Pope'],1,'Eric Barone usa o nome ConcernedApe.'],
['Em qual continente de The Elder Scrolls se passa Skyrim?',['Tamriel','Azeroth','Tyria','Westeros'],0,'Skyrim é uma província ao norte de Tamriel.'],
['Qual é a cidade de Cyberpunk 2077?',['Neo Tokyo','Night City','Los Santos','Gotham'],1,'Na Califórnia fictícia dos anos 2070.'],
['Qual personagem protagoniza Red Dead Redemption 2?',['John Marston','Arthur Morgan','Dutch','Sadie Adler'],1,'Arthur Morgan é membro da gangue Van der Linde.'],
['Em que ano o PlayStation original foi lançado no Japão?',['1992','1994','1996','1998'],1,'Dezembro de 1994.'],
]

// Perguntas extras para ampliar a variedade de franquias e assuntos.
BANK.push(
['Qual é o nome do protagonista de GTA V?',['Michael, Franklin e Trevor','Niko e Roman','Arthur e John','CJ e Sweet'],0,'GTA V alterna entre três protagonistas jogáveis.'],
['Qual é o nome do mapa principal de Counter-Strike 2 que é um clássico da série?',['Dust II','Summit','Kings Canyon','Hyrule'],0,'Dust II é um dos mapas mais conhecidos da franquia.'],
['Overwatch foi desenvolvido por qual empresa?',['Blizzard Entertainment','Valve','Riot Games','Epic Games'],0,'A Blizzard lançou o primeiro Overwatch em 2016.'],
['Qual franquia de futebol substituiu a marca FIFA nos jogos da EA?',['EA SPORTS FC','eFootball Manager','Pro Soccer League','Football Ultimate'],0,'A série passou a usar a marca EA SPORTS FC em 2023.'],
['Em que ano Minecraft saiu oficialmente da fase beta e teve seu lançamento 1.0?',['2009','2010','2011','2012'],2,'A versão 1.0 foi lançada em novembro de 2011.'],
['Qual é o nome do mundo de Red Dead Redemption 2?',['Hyrule','Oeste americano','Night City','Thedas'],1,'A aventura se passa em uma representação fictícia do oeste e sul dos EUA.'],
['Qual estúdio desenvolveu The Last of Us Part I?',['Naughty Dog','Insomniac Games','Remedy','Capcom'],0,'A Naughty Dog também criou Uncharted.'],
['Qual personagem é o protagonista de God of War (2018)?',['Kratos','Atreus','Baldur','Mimir'],0,'A jornada acompanha Kratos e seu filho Atreus.'],
['Qual é o nome da cidade de Cyberpunk 2077?',['Vice City','Night City','Los Santos','Rapture'],1,'Night City é uma metrópole fictícia da Califórnia.'],
['Qual empresa desenvolveu Valorant?',['Riot Games','Blizzard','Ubisoft','Valve'],0,'Valorant é um jogo tático competitivo da Riot Games.'],
['Qual é o nome do protagonista de The Witcher?',['Geralt de Rívia','Joel Miller','Arthur Morgan','Nathan Drake'],0,'Geralt é conhecido como o Lobo Branco.'],
['Qual jogo tem a região chamada Hallownest?',['Hollow Knight','Celeste','Ori and the Blind Forest','Dead Cells'],0,'Hallownest é o reino explorado em Hollow Knight.'],
['Qual empresa criou a franquia The Legend of Zelda?',['Nintendo','Sega','Sony','Bandai Namco'],0,'A franquia estreou no NES em 1986 no Japão.'],
['Em que ano Among Us ganhou grande popularidade mundial?',['2016','2018','2020','2022'],2,'O jogo teve um enorme crescimento de popularidade em 2020.'],
['Qual é o nome do protagonista de Persona 5?',['Joker','Cloud','Dante','Ryu'],0,'Joker é o codinome do líder dos Phantom Thieves.'],
['Qual estúdio criou Fortnite?',['Epic Games','Mojang','CD Projekt Red','FromSoftware'],0,'A Epic Games lançou Fortnite em 2017.'],
['Qual é o nome do protagonista de Uncharted?',['Nathan Drake','Lara Croft','Sam Fisher','Ezio Auditore'],0,'Nathan Drake é o aventureiro central da série.'],
['Qual jogo é conhecido por construir e explorar mundos feitos de blocos?',['Minecraft','The Sims 4','Cities: Skylines','Fall Guys'],0,'Minecraft combina construção, exploração e sobrevivência.'],
['Qual é o nome da protagonista de Tomb Raider?',['Lara Croft','Aloy','Ellie','Jill Valentine'],0,'Lara Croft estreou em 1996.'],
['Qual estúdio desenvolveu Elden Ring?',['FromSoftware','Rockstar Games','Remedy','Obsidian'],0,'A FromSoftware também criou Dark Souls e Sekiro.'],
['Qual jogo da Valve apresenta a personagem Chell?',['Portal','Half-Life','Left 4 Dead','Dota 2'],0,'Chell enfrenta testes dentro das instalações da Aperture Science.'],
['Em qual jogo aparece a ilha chamada Tsushima?',['Ghost of Tsushima','Assassin’s Creed Valhalla','Sekiro','Rise of the Ronin'],0,'A aventura acompanha Jin Sakai na ilha japonesa de Tsushima.'],
['Qual é o nome do mascote mais conhecido da Sega?',['Sonic','Mario','Crash','Kirby'],0,'Sonic estreou em 1991.'],
['Qual jogo tem os personagens Sackboy e Sackgirl?',['LittleBigPlanet','It Takes Two','Rayman Legends','Overcooked'],0,'LittleBigPlanet é conhecido por criação e compartilhamento de fases.'],
['Qual é o nome do protagonista de Hollow Knight: Silksong?',['Hornet','The Knight','Quirrel','Zote'],0,'Silksong acompanha Hornet em uma nova aventura.']
)
