INSERT INTO AUTHOR(ID, NAME, DATE_OF_BIRTH)
VALUES (200, 'Sun Tzu', '2023-04-29 21:30:00');

INSERT INTO CATEGORY(ID, NAME)
VALUES (200, 'War');

INSERT INTO COLLECTION(ID, NAME)
VALUES (200, 'Strategy');

INSERT INTO BOOK(ID, TITLE, SINOPSE, IMAGE_LINK, REGISTRATION_DATE, RELEASE_DATE, AUTHOR_ID, CATEGORY_ID, COLLECTION_ID)
VALUES (200, 'A Arte da Guerra', 'Considerado o tratado militar mais antigo do mundo, este volume anotado e comentado instruiu oficiais e estrategistas por mais de dois mil anos. Desde suas origens na China, A arte da guerra viajou pelo mundo para informar as estratégias de Napoleão e de generais da Segunda Guerra Mundial. Mais recentemente, assumiu uma nova vida como guia para competir com sucesso nos negócios, no direito e nos esportes. Todos os conceitos desta obra atemporal mantêm seu valor para os leitores modernos, desde a prudência de contornar um oponente forte e tirar vantagem de um fraco até a sabedoria da preparação e flexibilidade. Outros tópicos incluem estratégias, táticas, manobras, comunicações, tratamento de soldados e o valor de oficiais bem treinados. Entusiastas da história, líderes de pensamento de negócios e qualquer pessoa intrigada com competição e rivalidade apreciarão esta elegante edição da obra clássica.',
'https://m.media-amazon.com/images/I/71FMCr5Z9rL.jpg',
'2023-06-17 15:43:00', '2020-06-17 15:43:00', 200, 200, 200);

INSERT INTO AUTHOR(ID, NAME, DATE_OF_BIRTH)
VALUES (201, 'Antoine de Saint-Exupéry', '1900-06-29 00:00:00');

INSERT INTO CATEGORY(ID, NAME)
VALUES (201, 'Literatura');

INSERT INTO BOOK(ID, TITLE, SINOPSE, IMAGE_LINK, REGISTRATION_DATE, RELEASE_DATE, AUTHOR_ID, CATEGORY_ID)
VALUES (201, 'O Pequeno Príncipe', '“O essencial é invisível aos olhos ..." O Pequeno Príncipe é uma das obras literárias mais lidas no mundo e isto se deve à sua capacidade de relevar, a cada pessoa, significados diferentes, profundos, diante de uma história aparentemente simples. Nesta nova edição, você terá a chance de revisitar asteroides, planetas e baobás, encontrar uma certa raposa e admirar uma rosa muito especial. Escrito há mais de 70 anos, este livro é um dos favoritos de todos os apaixonados por literatura. E, até quem não tem hábito de leitura, se encanta pela doçura do pequeno príncipe. Ilustrado com as aquarelas do autor, a obra narra a amizade entre um piloto perdido no deserto e seu amigo inesperado, o pequeno príncipe. Seja esta a sua primeira leitura ou já perdeu as contas de quantas vezes leu a história: prepare-se para se emocionar.',
'https://m.media-amazon.com/images/P/B00RO2K7XC.01._SCLZZZZZZZ_SX500_.jpg',
'2023-06-17 15:43:00', '2020-06-17 15:43:00', 201, 201);


INSERT INTO AUTHOR(ID, NAME, DATE_OF_BIRTH)
VALUES (202, 'J. R. R. Tolkien', '1892-01-03 00:00:00');

INSERT INTO CATEGORY(ID, NAME)
VALUES (202, 'Fantasia');

INSERT INTO BOOK(ID, TITLE, SINOPSE, IMAGE_LINK, REGISTRATION_DATE, RELEASE_DATE, AUTHOR_ID, CATEGORY_ID)
VALUES (202, 'O Senhor dos Anéis', 'O Senhor dos Anéis é um livro de alta fantasia, escrito pelo escritor britânico J. R. R. Tolkien. Escrita entre 1937 e 1949, com muitas partes criadas durante a Segunda Guerra Mundial, a saga é uma continuação de O Hobbit.',
'https://m.media-amazon.com/images/P/B07XL583JL.01._SCLZZZZZZZ_SX500_.jpg',
'2023-06-17 15:43:00', '2020-06-17 15:43:00', 201, 201);
