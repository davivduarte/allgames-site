// Catálogo principal selecionado manualmente. As imagens usam artes do Steam CDN
// pelo AppID correspondente; a IGDB complementa detalhes quando estiver configurada.
export const GTA6_IMAGE = 'https://www.rockstargames.com/VI/_next/static/media/Official_Cover_Art_landscape.12.uu2irr.2_a.jpg?akim=1&imdensity=1&imwidth=3840'
export const GTA_RELEASE_DATE = new Date('2026-11-19T00:00:00-03:00')

const hero = id => `https://cdn.akamai.steamstatic.com/steam/apps/${id}/library_hero.jpg`
const head = id => `https://cdn.akamai.steamstatic.com/steam/apps/${id}/header.jpg`
const cap = id => `https://cdn.akamai.steamstatic.com/steam/apps/${id}/library_600x900.jpg`

// 30 destaques fixos com descrições completas em português. A ordem desta lista define a vitrine inicial.
const raw = [
  [271590, 'Grand Theft Auto V', 2013, 'Ação/Aventura', 92, 'Explore o ensolarado estado de San Andreas e a metrópole de Los Santos na pele de três criminosos distintos — Michael, Franklin e Trevor — em uma trama envolvente de assaltos ousados, traições e liberdade total em mundo aberto.'],
  [730, 'Counter-Strike 2 (CS:GO)', 2023, 'Tiro/Competitivo', 82, 'A evolução definitiva do FPS tático competitivo mais icônico do mundo. Desenvolvido na engine Source 2, traz mapas totalmente reformulados, fumaças volumétricas dinâmicas e partidas intensas 5v5 baseadas em precisão e estratégia.'],
  [2357570, 'Overwatch 2', 2022, 'Ação/Competitivo', 79, 'Um jogo de tiro em equipe vibrante e dinâmico ambientado em um futuro otimista, onde heróis de todo o mundo com habilidades únicas se enfrentam em batalhas frenéticas 5v5 por objetivos globais.'],
  [2669320, 'EA SPORTS FC 25', 2024, 'Esporte/Futebol', 78, 'Entre em campo com mais de 19.000 atletas licenciados, o novo modo rápido 5v5 Rush e o sistema tático FC IQ, oferecendo controle estratégico profundo e realismo absoluto nas principais ligas do futebol mundial.'],
  [1174180, 'Red Dead Redemption 2', 2018, 'Ação/Aventura', 93, 'América, 1899. O fim da era do Velho Oeste começou. Após um assalto dar errado em Blackwater, Arthur Morgan e a gangue Van der Linde precisam fugir, roubar e lutar para sobreviver no coração implacável dos Estados Unidos.'],
  [1086940, "Baldur's Gate 3", 2023, 'RPG/Estratégia', 96, 'Reúna seu grupo e retorne aos Reinos Esquecidos em uma história épica de camaradagem, traição, sacrifício e sobrevivência. Baseado nas regras de Dungeons & Dragons, cada escolha molda profundamente o destino do mundo.'],
  [1091500, 'Cyberpunk 2077', 2020, 'RPG/Ação', 86, 'Assuma o papel de V, um mercenário fora da lei em Night City — uma megalópole obcecada por poder, glamour e modificações corporais — em busca de um implante único que guarda a chave da imortalidade.'],
  [1245620, 'Elden Ring', 2022, 'RPG/Ação', 94, 'Erga-se, Maculado, e seja guiado pela graça para portar o poder do Anel Prístino e se tornar um Lorde Prístino nas Terras Intermédias, um vasto mundo de fantasia sombria criado por Hidetaka Miyazaki e George R. R. Martin.'],
  [570, 'Dota 2', 2013, 'MOBA/Estratégia', 90, 'Todos os dias, milhões de jogadores entram na batalha como um dos mais de cem heróis de Dota. Com profundidade estratégica incomparável e atualizações constantes, cada partida 5v5 é uma experiência única.'],
  [1172470, 'Apex Legends', 2019, 'Ação/Competitivo', 88, 'Domine um elenco crescente de Lendas poderosas com habilidades táticas únicas neste Battle Royale estratégico de ritmo acelerado, ambientado nas fronteiras implacáveis do universo de Titanfall.'],
  [440, 'Team Fortress 2', 2007, 'Ação/Competitivo', 92, 'Nove classes distintas oferecem uma enorme variedade de habilidades táticas e personalidades marcantes neste clássico atemporal de tiro em equipe repleto de humor, modos criativos e ação frenética.'],
  [550, 'Left 4 Dead 2', 2009, 'Ação/Co-op', 89, 'Ambientado no apocalipse zumbi, este FPS cooperativo de ação e terror coloca você e até três amigos em uma luta desesperada pela sobrevivência através de cidades, pântanos e cemitérios do sul dos Estados Unidos.'],
  [413150, 'Stardew Valley', 2016, 'Simulação/RPG', 89, 'Você herdou a antiga fazenda do seu avô em Stardew Valley. Armado com ferramentas de segunda mão e algumas moedas, comece uma nova vida cultivando plantações, criando animais, explorando cavernas e fazendo parte da comunidade.'],
  [105600, 'Terraria', 2011, 'Aventura/Sobrevivência', 81, 'Cave, lute, explore e construa! Nada é impossível neste jogo de aventura 2D repleto de ação. O mundo é a sua tela e o próprio solo é a sua tinta enquanto você enfrenta chefes colossais e descobre tesouros ocultos.'],
  [620, 'Portal 2', 2011, 'Puzzle/Aventura', 95, 'Retorne aos laboratórios da Aperture Science em uma campanha solo premiada e um modo cooperativo inovador, resolvendo quebra-cabeças engenhosos com a arma de portais sob o olhar sarcástico da inteligência artificial GLaDOS.'],
  [1593500, 'God of War', 2018, 'Ação/Aventura', 93, 'Com a vingança contra os deuses do Olimpo no passado, Kratos agora vive como um mortal no reino dos deuses e monstros nórdicos. É nesse mundo duro e implacável que ele precisa lutar para sobreviver e ensinar seu filho Atreus a fazer o mesmo.'],
  [1817070, "Marvel's Spider-Man Remastered", 2022, 'Ação/Aventura', 87, 'Em Nova York da Marvel, os mundos de Peter Parker e do Homem-Aranha colidem em uma história original repleta de ação. Balance pela cidade com fluidez acrobática e enfrente vilões icônicos para salvar a metrópole.'],
  [1888930, 'The Last of Us Part I', 2022, 'Ação/Aventura', 88, 'Em uma civilização devastada, onde infectados e sobreviventes implacáveis correm soltos, Joel, um protagonista calejado, é contratado para tirar Ellie, uma garota de 14 anos, de uma zona de quarentena militar.'],
  [814380, 'Sekiro: Shadows Die Twice', 2019, 'Ação/Aventura', 88, 'Trilhe seu próprio caminho de vingança no Japão do período Sengoku no final dos anos 1500. Encarne o "Lobo de Um Braço Só", um guerreiro desonrado resgatado da beira da morte com a missão de proteger um jovem lorde.'],
  [292030, 'The Witcher 3: Wild Hunt', 2015, 'RPG/Aventura', 93, 'Você é Geralt de Rívia, mercenário matador de monstros. Diante de você está um continente devastado pela guerra e infestado de criaturas, onde seu contrato mais importante é encontrar Ciri — a Criança da Profecia.'],
  [782330, 'DOOM Eternal', 2020, 'Ação', 88, 'Os exércitos do Inferno invadiram a Terra. Torne-se o Slayer em uma campanha épica para um jogador e conquiste demônios entre dimensões para impedir a destruição final da humanidade em um combate ultrarrápido.'],
  [2050650, 'Resident Evil 4', 2023, 'Ação/Terror', 93, 'Seis anos após o desastre biológico em Raccoon City, o agente Leon S. Kennedy é enviado para resgatar a filha sequestrada do presidente em uma vila europeia isolada onde algo terrível aconteceu com os moradores.'],
  [892970, 'Valheim', 2021, 'Sobrevivência/Co-op', 85, 'Um brutal jogo de exploração e sobrevivência para 1 a 10 jogadores, ambientado em um purgatório gerado proceduralmente inspirado na cultura viking. Lute, construa fortalezas e conquiste a glória de Odin.'],
  [1623730, 'Palworld', 2024, 'Sobrevivência/Aventura', 75, 'Lute, cultive, construa e trabalhe ao lado de criaturas misteriosas chamadas "Pals" neste vasto mundo aberto multiplayer de sobrevivência e fabricação, repleto de perigos, masmorras e exploração.'],
  [553850, 'HELLDIVERS 2', 2024, 'Ação/Co-op', 82, 'A última linha de defesa da Galáxia. Aliste-se nos Helldivers e junte-se à luta pela liberdade em toda uma galáxia hostil neste jogo de tiro cooperativo em terceira pessoa rápido, frenético e feroz.'],
  [990080, 'Hogwarts Legacy', 2023, 'RPG/Aventura', 84, 'Experimente Hogwarts nos anos 1800. Seu personagem é um estudante que guarda a chave de um antigo segredo que ameaça destruir o mundo bruxo. Descubra feras fantásticas, prepare poções e domine feitiços.'],
  [200260, 'Batman: Arkham City', 2011, 'Ação/Aventura', 91, 'Ambientado dentro dos muros fortemente fortificados de um distrito extenso no coração de Gotham City, o Cavaleiro das Trevas enfrenta os maiores vilões da galeria de Batman em uma luta sombria pela justiça.'],
  [8870, 'BioShock Infinite', 2013, 'Ação/Aventura', 94, 'Em dívida com as pessoas erradas, o detetive Booker DeWitt precisa resgatar Elizabeth, uma jovem misteriosa aprisionada desde a infância em Columbia — uma deslumbrante e perigosa cidade flutuante nos céus de 1912.'],
  [264710, 'Subnautica', 2018, 'Sobrevivência/Aventura', 87, 'Desça às profundezas de um mundo subaquático alienígena repleto de maravilhas e perigos. Crie equipamentos, pilote submarinos e supere a vida selvagem para explorar recifes de corais, vulcões e cavernas abissais.'],
  [1426210, 'It Takes Two', 2021, 'Co-op/Aventura', 88, 'Embarque na jornada mais maluca da sua vida neste jogo de aventura e plataforma criado exclusivamente para o modo cooperativo. Jogue como Cody e May, um casal transformado em bonecos que precisa trabalhar junto para salvar seu relacionamento.'],
]

export const DEMO = raw.map(([id, name, y, g, m, desc]) => ({
  id: 'd' + id,
  name,
  released: `${y}-01-01`,
  yearOnly: true,
  metacritic: m,
  genres: g.split('/').map(n => ({ name: n })),
  images: [hero(id), head(id), cap(id)],
  demo: true,
  description_raw: desc,
}))

export const GTA6_DEMO = {
  id: 'gta6', name: 'Grand Theft Auto VI', released: '2026-11-19', metacritic: null,
  genres: [{ name: 'Ação' }, { name: 'Aventura' }],
  images: [GTA6_IMAGE], demo: true,
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