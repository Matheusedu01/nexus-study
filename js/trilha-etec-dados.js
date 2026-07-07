// ========================================
// SEED: TRILHA "ESTUDOS PARA PROVA DA ETEC"
// ========================================
// Mesmo padrão de js/trilha-ingles-dados.js: um objeto com a trilha inteira,
// pronto pra ser importado pelo botão do admin (importarTrilhaEtec, em
// js/admin.js). Cobre os 4 grandes blocos do Vestibulinho: Língua
// Portuguesa, Matemática, Ciências Humanas (História e Geografia) e
// Ciências da Natureza (Biologia, Física e Química).

const TRILHA_ETEC_SEED = {
    titulo: "Estudos para prova da ETEC",
    descricao: "Revisão completa pro Vestibulinho da ETEC: Português, Matemática, História, Geografia, Biologia, Física e Química, com teoria, exemplos e exercícios no estilo da prova.",
    nivel: "Intermediário",
    icone: "🎓",
    cor: "#ff6b6b",
    tags: ["etec", "vestibulinho", "português", "matemática", "história", "geografia", "biologia", "física", "química"],
    duracao: "12 semanas",
    estudos: [
        // ========================================
        // MÓDULO 1: LÍNGUA PORTUGUESA
        // ========================================
        {
            id: 101,
            titulo: "Interpretação de Texto",
            descricao: "O assunto que mais pesa na prova: como ler com atenção e não cair em pegadinha.",
            modulo: "Módulo 1: Língua Portuguesa",
            ordem: 1,
            publicado: true,
            conteudo: `# Por que Interpretação de Texto é o Ponto Mais Importante

A prova da ETEC costuma trazer um ou mais textos (notícia, tirinha, poema, artigo de opinião) seguidos de várias questões. Interpretação de texto normalmente vale mais pontos do que qualquer assunto isolado, porque aparece embutida em quase todas as questões de Português — inclusive nas de gramática, que costumam ser cobradas dentro de um texto.

**A boa notícia:** interpretação de texto não exige decorar regras. Exige leitura atenta e um método.

💡 Regra de ouro: nunca responda uma questão de interpretação só com o que você "acha" sobre o assunto. A resposta certa está sempre dentro do texto — mesmo quando a pergunta pede uma inferência.

# Ideia Principal x Ideias Secundárias

Todo texto tem uma **ideia principal** (o que o autor quer dizer, no fundo) e várias **ideias secundárias** (detalhes e exemplos que sustentam a ideia principal).

Um erro comum é confundir um detalhe chamativo com a ideia principal. As provas adoram criar alternativas erradas que pegam um detalhe verdadeiro do texto, mas que não é o assunto central.

**Como encontrar a ideia principal:** depois de ler o texto, tente resumir em uma frase só o que ele diz. Se sua frase cobre o texto inteiro, é a ideia principal. Se cobre só um parágrafo, é uma ideia secundária.

# Inferência: Ler nas Entrelinhas

Inferir é concluir algo que o texto não diz literalmente, mas que fica claro pelo contexto. É diferente de opinar livremente: a inferência tem que ser sustentada pelo texto.

**Exemplo resolvido:** se um texto diz "João saiu de casa sem guarda-chuva e voltou encharcado", dá pra inferir que choveu — mesmo que a palavra "chuva" nunca apareça escrita.

Questões de inferência costumam vir com enunciados como "é possível concluir que...", "o texto sugere que...", "depreende-se que...".

# Recursos Expressivos

Os autores escolhem palavras de propósito, pra causar um efeito no leitor.

[TABELA]
Recurso|O que faz|Exemplo
----|---|---
Ironia|Diz o oposto do que quer dizer, geralmente criticando|"Que ótimo, mais uma prova pra estudar!" dito com irritação
Metáfora|Compara duas coisas sem usar "como"|Seu sorriso é um raio de sol
Repetição|Reforça uma ideia insistindo nela|Nunca, nunca, nunca desista
Pergunta retórica|Pergunta que não espera resposta, usada pra fazer o leitor refletir|Até quando vamos aceitar isso?
Linguagem formal x informal|Formal segue a norma culta; informal é mais próxima da fala do dia a dia|Uma carta oficial x uma mensagem de WhatsApp
[FIM_TABELA]

# Passo a Passo Pra Resolver Questões de Interpretação

Siga esta ordem: primeiro leia o texto inteiro sem se preocupar em decorar detalhes. Depois leia as perguntas. Depois volte ao texto e releia o trecho relacionado a cada pergunta antes de responder. Elimine alternativas que contradizem o texto ou que trazem informação que não está lá, mesmo que pareça verdade no mundo real. Desconfie de alternativas com palavras absolutas demais, como "sempre", "nunca", "todos" — elas costumam estar erradas quando o texto é mais moderado.

<colapsavel titulo="📌 Pegadinha clássica de prova">
Cuidado com alternativas que repetem palavras exatas do texto, mas mudam o sentido da frase. A banca sabe que muitos alunos escaneiam o texto procurando as mesmas palavras da alternativa, sem checar se o sentido bate. Sempre releia a frase inteira do texto, não só a palavra isolada.
</colapsavel>

<exercicio-interativo pergunta="Leia: 'Pedro chegou atrasado à reunião pela terceira vez no mês. O chefe apenas anotou algo em sua agenda, sem dizer uma palavra.' O que dá pra inferir sobre a reação do chefe? Responda com uma palavra." resposta="incomodado" dica="O silêncio e o gesto de anotar sugerem que ele não gostou, mesmo sem dizer isso diretamente. 'Irritado' ou 'insatisfeito' também valem."></exercicio-interativo>

<quiz>
A frase 'Ele é tão pontual quanto um relógio quebrado', dita de forma sarcástica sobre alguém sempre atrasado, é um exemplo de qual recurso?
Metáfora direta
[correta] Ironia
Linguagem formal
Repetição
</quiz>

<flashcard frente="O que é 'inferir' em um texto?" verso="Concluir algo que não está escrito literalmente, mas que fica claro pelo contexto - sem inventar informação que o texto não sustenta."></flashcard>`
        },
        {
            id: 102,
            titulo: "Classes de Palavras",
            descricao: "As 10 classes gramaticais: o que cada uma faz e como reconhecer numa frase.",
            modulo: "Módulo 1: Língua Portuguesa",
            ordem: 2,
            publicado: true,
            conteudo: `# As 10 Classes de Palavras

Toda palavra da língua portuguesa se encaixa em uma classe gramatical, de acordo com a função que ela exerce na frase. Saber reconhecer essas classes é a base pra entender análise sintática, concordância e regência — os próximos assuntos desta trilha.

[TABELA]
Classe|Função|Exemplo
----|---|---
Substantivo|Nomeia seres, objetos, sentimentos, lugares|casa, alegria, Maria, São Paulo
Artigo|Antecede o substantivo, indicando se é definido ou indefinido|o, a, os, as, um, uma
Adjetivo|Caracteriza o substantivo|bonito, rápido, brasileiro
Verbo|Indica ação, estado ou fenômeno|correr, ser, chover
Pronome|Substitui ou acompanha o substantivo|eu, ele, meu, que, isso
Numeral|Indica quantidade, ordem ou fração|dois, segundo, metade
Advérbio|Modifica o verbo, o adjetivo ou outro advérbio|rapidamente, muito, aqui
Preposição|Liga duas palavras, estabelecendo relação de sentido entre elas|de, para, com, em
Conjunção|Liga orações ou termos semelhantes|e, mas, porque, se
Interjeição|Expressa emoção|Ai!, Nossa!, Socorro!
[FIM_TABELA]

# Palavras Variáveis x Invariáveis

As classes se dividem em dois grupos: **variáveis**, que mudam de forma (gênero, número, grau, tempo, pessoa) — substantivo, artigo, adjetivo, verbo, pronome e numeral; e **invariáveis**, que não mudam de forma — advérbio, preposição, conjunção e interjeição.

Essa distinção ajuda bastante em questões de concordância, porque só as palavras variáveis "combinam" gênero e número com outras palavras da frase.

# Substantivo: Tipos Mais Cobrados

O substantivo é a classe mais rica em subtipos. Os mais cobrados no Vestibulinho são: **substantivo comum** (nomeia de forma genérica, ex: cidade, cachorro) e **substantivo próprio** (nomeia de forma específica e sempre com inicial maiúscula, ex: São Paulo, Rex); **substantivo concreto** (existe por si só, ex: mesa, ar) e **substantivo abstrato** (depende de outro ser pra existir — sentimentos, qualidades e ações, ex: amor, beleza, corrida); **substantivo coletivo**, que no singular já indica um conjunto de seres da mesma espécie (ex: cardume = conjunto de peixes, alcateia = conjunto de lobos).

# Adjetivo x Advérbio: A Confusão Mais Comum

Uma das pegadinhas mais frequentes é confundir adjetivo com advérbio, porque muitos advérbios em português terminam em "-mente", derivados de um adjetivo.

**A diferença:** o adjetivo caracteriza um substantivo ("menino rápido" — rápido caracteriza menino); o advérbio modifica um verbo, adjetivo ou outro advérbio ("o menino correu rapidamente" — rapidamente modifica o verbo correu).

Repare que o adjetivo concorda em gênero e número com o substantivo (menina rápid**a**, meninos rápid**os**), enquanto o advérbio é sempre invariável (ela correu rapidamente, eles correram rapidamente — a forma não muda).

<colapsavel titulo="📂 Pronomes: uma classe cheia de subtipos">
Os pronomes se dividem em vários subtipos e todos costumam aparecer na prova: pessoais (eu, tu, ele, nós...), possessivos (meu, teu, seu...), demonstrativos (este, esse, aquele...), relativos (que, qual, cujo...), indefinidos (algum, nenhum, todo...) e interrogativos (que, quem, qual, quanto, usados em perguntas).
</colapsavel>

<exercicio-interativo pergunta="Na frase 'O time jogou muito bem ontem', a palavra 'bem' modifica o verbo jogou. Que classe gramatical é essa palavra?" resposta="advérbio" dica="Ela é invariável e está modificando o verbo, não um substantivo - isso é típico de uma classe específica."></exercicio-interativo>

<quiz>
Em 'A alcateia atravessou a floresta silenciosamente', a palavra 'alcateia' é um substantivo de qual tipo?
Substantivo abstrato
Substantivo próprio
[correta] Substantivo coletivo
Substantivo concreto simples
</quiz>

<flashcard frente="Qual a diferença entre substantivo concreto e abstrato?" verso="Concreto existe por si só (mesa, ar, cachorro). Abstrato depende de outro ser pra existir - são sentimentos, qualidades e ações (amor, beleza, viagem)."></flashcard>`
        },
        {
            id: 103,
            titulo: "Análise Sintática",
            descricao: "Sujeito, predicado, complementos e como as orações se relacionam num período.",
            modulo: "Módulo 1: Língua Portuguesa",
            ordem: 3,
            publicado: true,
            conteudo: `# Os Termos Essenciais da Oração

Análise sintática é o estudo da função que cada termo exerce dentro da oração. Os dois termos essenciais são o **sujeito** (de quem ou do que se fala) e o **predicado** (tudo o que se diz sobre o sujeito).

**Exemplo:** "O aluno estudou para a prova." — "O aluno" é o sujeito; "estudou para a prova" é o predicado.

# Tipos de Sujeito

[TABELA]
Tipo|O que é|Exemplo
----|---|---
Simples|Tem apenas um núcleo|O menino chorou. (núcleo: menino)
Composto|Tem dois ou mais núcleos|João e Maria viajaram. (núcleos: João, Maria)
Oculto (ou desinencial)|Não aparece na frase, mas é identificado pela terminação do verbo|Estudamos a noite toda. (sujeito: nós)
Indeterminado|Não é possível identificar quem pratica a ação|Falaram mal de você na festa.
Oração sem sujeito|O verbo não se refere a nenhum sujeito, geralmente com verbos de fenômeno da natureza ou o verbo haver no sentido de existir|Choveu bastante ontem. / Havia muitas pessoas na fila.
[FIM_TABELA]

💡 Cuidado especial com o verbo **haver** no sentido de "existir": ele nunca vai para o plural, mesmo quando fala de várias coisas. "Haviam muitos problemas" está errado; o certo é "Havia muitos problemas".

# Predicado e Complementos Verbais

O predicado se organiza ao redor do verbo, que pode exigir (ou não) complementos:

**Objeto direto:** completa o sentido do verbo sem preposição obrigatória. "Comprei um livro" (comprei o quê? um livro).

**Objeto indireto:** completa o sentido do verbo com preposição obrigatória. "Obedeço aos meus pais" (obedeço a quem? aos meus pais).

**Complemento nominal:** completa o sentido de um substantivo, adjetivo ou advérbio, sempre com preposição. "Ele tem medo de altura" (medo de quê? de altura).

**Predicativo:** indica uma característica do sujeito ou do objeto, geralmente ligado por um verbo de ligação. "Ela está cansada" (cansada é uma característica do sujeito ela).

# Período Composto: Coordenação e Subordinação

Quando uma frase tem mais de um verbo (ou seja, mais de uma oração), ela é um **período composto**. As orações desse período podem se relacionar de duas formas:

**Coordenação:** as orações são independentes entre si, uma não completa o sentido da outra. Ligam-se geralmente por conjunções coordenativas (e, mas, ou, porém, logo). Exemplo: "Estudei bastante, mas fiquei nervoso na prova."

**Subordinação:** uma oração depende da outra pra fazer sentido completo — a oração principal e a oração subordinada, que funciona como um termo dentro da principal (sujeito, complemento, ou uma circunstância). Exemplo: "Espero que você passe na prova" (a oração "que você passe na prova" funciona como objeto direto do verbo espero).

<colapsavel titulo="🔎 Como diferenciar coordenação de subordinação rapidamente">
Tente separar as orações em duas frases completas e independentes. Se as duas continuam fazendo sentido sozinhas, é coordenação. Se uma delas fica "incompleta" ou sem sentido isolada, é subordinação. "Estudei bastante" e "fiquei nervoso" fazem sentido sozinhas → coordenação. Mas "que você passe na prova" sozinha não tem sentido completo → subordinação.
</colapsavel>

<exercicio-interativo pergunta="Na frase 'Choveu muito na cidade ontem', que tipo de sujeito a oração tem?" resposta="oração sem sujeito" dica="O verbo chover é um verbo de fenômeno da natureza e não se refere a nenhum sujeito."></exercicio-interativo>

<quiz>
Na frase 'Ela obedece aos professores', o termo 'aos professores' é classificado como:
Objeto direto
[correta] Objeto indireto
Predicativo do sujeito
Complemento nominal
</quiz>

<flashcard frente="Qual a diferença entre objeto direto e objeto indireto?" verso="Objeto direto completa o verbo sem preposição obrigatória (comprei um livro). Objeto indireto completa o verbo com preposição obrigatória (obedeço aos pais)."></flashcard>`
        },
        {
            id: 104,
            titulo: "Concordância Nominal e Verbal",
            descricao: "As regras de concordância mais cobradas e as pegadinhas clássicas de prova.",
            modulo: "Módulo 1: Língua Portuguesa",
            ordem: 4,
            publicado: true,
            conteudo: `# Concordância Verbal: A Regra Geral

Concordância verbal é a combinação entre o verbo e o sujeito da oração, em número (singular/plural) e pessoa. A regra geral é simples: o verbo concorda com o núcleo do sujeito.

**Exemplo:** "Os alunos estudaram para a prova." (sujeito plural → verbo no plural)

O problema aparece quando o sujeito tem uma estrutura mais complexa. Vamos ver os casos mais cobrados.

# Casos Especiais de Concordância Verbal

**Sujeito composto antes do verbo:** o verbo vai para o plural. "João e Maria chegaram cedo."

**Sujeito composto depois do verbo:** o verbo pode concordar com todo o sujeito (plural) ou só com o núcleo mais próximo. "Chegaram (ou chegou) João e Maria" — ambas as formas são aceitas, mas o plural é mais recomendado em prova.

**Expressões partitivas (a maioria de, grande parte de):** o verbo pode concordar com a expressão (singular) ou com o substantivo que vem depois dela (plural). "A maioria dos alunos estudou (ou estudaram) para a prova."

**Sujeito coletivo:** o verbo fica no singular, mesmo que o coletivo represente várias pessoas ou coisas. "A multidão gritou durante o show." (não "gritaram")

**Verbos impessoais (haver no sentido de existir, fazer indicando tempo):** ficam sempre na terceira pessoa do singular, nunca vão para o plural. "Havia muitos carros na rua." / "Faz dez anos que ele se formou."

# Concordância Nominal: A Regra Geral

Concordância nominal é a combinação entre substantivos e as palavras que os acompanham (artigos, adjetivos, numerais, pronomes), em gênero e número.

**Exemplo:** "As casas amarelas foram vendidas." (casas é feminino plural → as, amarelas e vendidas também ficam femininos plurais)

# Casos Especiais de Concordância Nominal

**Um adjetivo para vários substantivos:** se o adjetivo vem depois, concorda com o substantivo mais próximo ou vai para o plural (geralmente masculino, se os substantivos tiverem gêneros diferentes). "Comprei camisa e sapato novos." Se o adjetivo vem antes, concorda só com o substantivo mais próximo. "Comprei novo sapato e camisa."

**"Meio" como advérbio x numeral:** quando "meio" significa "um pouco" (advérbio), fica invariável. "Ela ficou meio tonta." Quando "meio" indica metade (numeral), concorda normalmente. "Comi meia melancia."

**"Bastante" como advérbio x adjetivo:** como advérbio (equivale a "muito", modificando um verbo ou adjetivo), fica invariável. "Eles estudaram bastante." Como adjetivo (equivale a "muitos/muitas", acompanhando um substantivo), concorda normalmente. "Havia bastantes alunos na sala."

<colapsavel titulo="📌 Pegadinha clássica: 'É proibido' x 'É proibida'">
Quando a expressão "é proibido/é necessário/é bom" vem seguida de um substantivo SEM artigo, fica invariável no masculino singular: "Cerveja é proibido para menores." Mas se o substantivo vem COM artigo, concorda normalmente: "A cerveja é proibida para menores."
</colapsavel>

<exercicio-interativo pergunta="Complete corretamente: 'A maioria dos candidatos ___ (chegar) cedo ao local de prova.' Escreva o verbo chegar conjugado numa das formas aceitas (singular ou plural)." resposta="chegou" dica="Com expressões partitivas como 'a maioria de', tanto o singular (chegou) quanto o plural (chegaram) são aceitos - qualquer um dos dois está certo."></exercicio-interativo>

<quiz>
Qual frase está com a concordância correta?
[correta] Ela ficou meio nervosa antes da prova.
Ela ficou meia nervosa antes da prova.
Havia muitos alunos, e todos gritaram.
Faziam dez anos que ele havia se formado.
</quiz>

<flashcard frente="Como fica o verbo com sujeito coletivo, tipo 'a multidão'?" verso="Sempre no singular, mesmo o coletivo representando várias pessoas: 'A multidão gritou' (não 'gritaram')."></flashcard>`
        },
        {
            id: 105,
            titulo: "Regência Nominal e Verbal",
            descricao: "Quais palavras pedem preposição e qual preposição usar.",
            modulo: "Módulo 1: Língua Portuguesa",
            ordem: 5,
            publicado: true,
            conteudo: `# O Que É Regência

Regência é o estudo de como uma palavra "rege" (exige) outra, geralmente por meio de uma preposição. Existem dois tipos: **regência verbal**, quando um verbo exige (ou não) uma preposição pra se ligar ao complemento; e **regência nominal**, quando um nome (substantivo, adjetivo ou advérbio) exige uma preposição específica.

# Regência Verbal: Os Casos Mais Cobrados

[TABELA]
Verbo|Regência correta|Exemplo
----|---|---
Assistir (no sentido de ver)|assistir A algo|Assisti ao filme ontem.
Assistir (no sentido de ajudar)|assistir alguém, sem preposição|O médico assistiu o paciente.
Chegar / Ir|chegar A um lugar, ir A um lugar (nunca "chegar EM" na norma culta)|Cheguei à escola cedo.
Namorar|não usa preposição|Ele namora Maria. (não "namora COM Maria")
Preferir|preferir uma coisa A outra|Prefiro estudar à noite a estudar de manhã.
Obedecer / Desobedecer|sempre com a preposição A|Obedeço aos meus pais.
Simpatizar / Antipatizar|sempre com a preposição COM|Simpatizei com o novo professor.
[FIM_TABELA]

💡 A regência de "assistir" é uma das mais cobradas: repare que o sentido do verbo muda a regência. "Assistir ao jogo" (ver) usa preposição; "assistir o doente" (ajudar, cuidar) não usa.

# Regência Nominal: Os Casos Mais Cobrados

Alguns nomes (substantivos, adjetivos, advérbios) exigem uma preposição específica pra se ligar ao complemento:

[TABELA]
Nome|Preposição|Exemplo
----|---|---
Medo|de|Tenho medo de altura.
Interesse|em / por|Tenho interesse em (ou por) música.
Favorável|a|Sou favorável à sua proposta.
Necessário|a / para|É necessário paciência para essa profissão.
Bom / Ruim|para|Esse remédio é bom para dor de cabeça.
Orgulhoso|de|Estou orgulhoso de você.
[FIM_TABELA]

# Crase e Regência: Onde as Duas Coisas se Encontram

A crase (estudada na próxima aula) costuma aparecer justamente em situações de regência: quando um verbo ou nome pede a preposição "a" e o termo seguinte é feminino e admite o artigo "a", ocorre a crase (fusão da preposição "a" com o artigo "a"), marcada pelo acento grave (à).

**Exemplo:** o verbo "assistir" (ver) pede a preposição "a". Se o complemento for "a novela" (substantivo feminino com artigo), a preposição "a" se funde com o artigo "a", formando "à": "Assisti à novela."

<colapsavel titulo="📌 Truque pra saber se um verbo pede preposição">
Troque o complemento por um substantivo masculino equivalente. Se aparecer naturalmente um "ao" antes dele, o verbo pede a preposição "a" (e por isso, com um complemento feminino, pode ocorrer crase). "Assisti ao jogo" soa natural → "assisti" pede "a" → com complemento feminino, tem crase: "assisti à partida".
</colapsavel>

<exercicio-interativo pergunta="Complete com a regência correta: 'O médico ___ o paciente durante toda a cirurgia.' (verbo assistir, no sentido de cuidar/ajudar - sem preposição)" resposta="assistiu" dica="No sentido de ajudar/cuidar, o verbo assistir não usa preposição: 'assistiu o paciente', e não 'assistiu ao paciente'."></exercicio-interativo>

<quiz>
Qual frase está com a regência verbal correta, segundo a norma culta?
Cheguei em casa tarde.
Ele namora com a Ana há dois anos.
[correta] Prefiro chá a café.
Simpatizei da nova vizinha.
</quiz>

<flashcard frente="Qual a diferença de regência entre 'assistir' no sentido de ver e no sentido de ajudar?" verso="Ver: assistir A algo (assisti ao filme). Ajudar/cuidar: assistir algo, sem preposição (o médico assistiu o paciente)."></flashcard>`
        },
        {
            id: 106,
            titulo: "Pontuação, Acentuação e Crase",
            descricao: "Vírgula, acentos gráficos e a regra da crase explicada de forma prática.",
            modulo: "Módulo 1: Língua Portuguesa",
            ordem: 6,
            publicado: true,
            conteudo: `# Pontuação: A Vírgula

A vírgula é o sinal de pontuação mais cobrado na prova, porque errar (ou acertar) o uso dela muda o sentido da frase.

**Usos mais importantes da vírgula:**

Separar elementos de uma enumeração: "Comprei maçã, banana, uva e pêra."

Separar o aposto (termo que explica ou detalha outro): "São Paulo, capital do estado, é a maior cidade do Brasil."

Separar o vocativo (quando se chama alguém diretamente): "Maria, venha aqui."

Isolar expressões explicativas ou adverbiais deslocadas no início da frase: "Depois da prova, todos foram comemorar."

Separar orações coordenadas (sem conjunção "e", "ou", "nem"): "Estudei bastante, fiz os exercícios, revisei tudo."

💡 Regra de ouro: **nunca separe o sujeito do predicado com vírgula**, mesmo que o sujeito seja longo. "Os alunos que estudaram bastante para a prova, passaram no vestibulinho." está ERRADO — não deve haver vírgula ali.

# Acentuação Gráfica

As palavras se classificam pela posição da sílaba tônica: **oxítonas** (tônica na última sílaba), **paroxítonas** (tônica na penúltima) e **proparoxítonas** (tônica na antepenúltima).

[TABELA]
Classificação|Regra de acentuação|Exemplo
----|---|---
Oxítonas|Acentuam-se quando terminam em A, E, O, EM, ENS (seguidas ou não de S)|café, você, jiló, também
Paroxítonas|Acentuam-se quando NÃO terminam em A, E, O, EM (seguidas ou não de S) - ou seja, é a regra invertida|fácil, açúcar, hífen, órgão
Proparoxítonas|Todas são acentuadas, sem exceção|médico, lâmpada, ônibus
[FIM_TABELA]

Além disso, existe a acentuação de **hiatos**: quando o "i" ou o "u" tônico forma sílaba sozinho (sem ditongo) depois de uma vogal, ele é acentuado, mesmo em palavras paroxítonas. Exemplo: "saída", "baú" — o i e o u são tônicos e formam sílaba isolada.

# Crase: A Regra Prática

Crase é a fusão da preposição "a" com o artigo feminino "a" (ou "as"), representada pelo acento grave (à). Ela só pode ocorrer diante de palavra feminina.

**Como testar se tem crase, passo a passo:** troque a palavra feminina por uma masculina equivalente. Se aparecer "ao" na frase, tem crase (vira "à" no feminino). Se aparecer só "o" (sem preposição), não tem crase.

**Exemplo:** "Fui à escola." → trocando por masculino: "Fui ao colégio." Como apareceu "ao", confirma que tem crase: "à escola".

**Exemplo sem crase:** "Fui a Paris." → trocando por masculino: "Fui a Portugal" (não "ao Portugal", porque nomes de países masculinos que não levam artigo não formam "ao"). Então não tem crase: apenas "a Paris".

**Casos que NUNCA têm crase:** antes de verbo ("Começou a chorar"), antes de palavra masculina ("Andava a cavalo"), antes de pronomes que não admitem artigo, como "ela", "isso", "esta" (mas "àquela" tem crase, porque "aquela" é uma exceção que combina com o "a").

<colapsavel titulo="📌 Crase em expressões de tempo e lugar">
Duas situações merecem atenção especial: expressões que indicam horas costumam ter crase quando o horário está determinado ("Chego à uma hora", "às três horas"); e expressões como "à noite", "à tarde" têm crase quando estão sozinhas, mas perdem o acento se vier "todas": "Estudo à noite" (com crase), mas "Estudo toda noite" (sem crase, porque "toda" já é um determinante que substitui o artigo).
</colapsavel>

<exercicio-interativo pergunta="A frase 'Cheguei __ escola às sete horas' precisa de crase antes de 'escola'? Responda sim ou não." resposta="sim" dica="Teste com masculino: 'cheguei ao colégio' - como aparece 'ao', confirma que há crase: 'cheguei à escola'."></exercicio-interativo>

<quiz>
Qual palavra é acentuada por ser proparoxítona?
café
[correta] lâmpada
também
fácil
</quiz>

<flashcard frente="Qual o truque prático para testar se uma frase tem crase?" verso="Troque a palavra feminina por uma masculina equivalente. Se aparecer 'ao' na frase, tem crase (vira à no feminino). Se aparecer só 'o', não tem crase."></flashcard>`
        },
        {
            id: 107,
            titulo: "Ortografia",
            descricao: "Grafias que mais causam confusão e como não errar na hora da prova.",
            modulo: "Módulo 1: Língua Portuguesa",
            ordem: 7,
            publicado: true,
            conteudo: `# Por Que Ortografia é Cobrada

Questões de ortografia costumam pedir pra identificar a alternativa com um erro de grafia escondido entre frases corretas, ou pedir a forma correta de uma palavra. O segredo aqui é conhecer os casos mais confusos da língua — poucas palavras concentram a maioria dos erros.

# Porque, Por que, Por quê e Porquê

Esse é o "clássico" mais cobrado em qualquer prova de português.

[TABELA]
Forma|Quando usar|Exemplo
----|---|---
Por que (separado, sem acento)|Em perguntas (diretas ou indiretas) e antes de substantivo que a palavra "razão" poderia substituir|Por que você faltou à aula? / Não sei por que ele faltou.
Por quê (separado, com acento)|Em perguntas, quando fica no final da frase ou sozinho|Você faltou à aula, por quê?
Porque (junto, sem acento)|Para responder, indicando explicação ou causa|Faltei porque estava doente.
Porquê (junto, com acento)|É um substantivo, geralmente vem acompanhado de artigo|Ninguém entendeu o porquê da sua ausência.
[FIM_TABELA]

# Mau x Mal / Mas x Mais

**Mau (adjetivo, o oposto de bom) x Mal (advérbio, o oposto de bem, ou substantivo):** "Ele é um mau aluno" (mau = adjetivo, oposto de bom). "Ele se saiu mal na prova" (mal = advérbio, oposto de bem).

**Mas (conjunção adversativa, equivale a "porém") x Mais (advérbio de intensidade ou quantidade, oposto de menos):** "Estudei bastante, mas fiquei nervoso" (mas = porém). "Preciso estudar mais matemática" (mais = quantidade maior).

# Onde x Aonde

**Onde** indica lugar fixo, sem ideia de movimento, geralmente usado com verbos como "estar", "morar", "ficar". "Onde você mora?"

**Aonde** indica lugar com ideia de movimento, deslocamento, geralmente usado com verbos como "ir", "chegar". "Aonde você vai?"

# Sessão, Seção e Cessão / Ascender e Acender

Palavras homófonas (som parecido, grafia e sentido diferentes) são um alvo clássico de prova:

**Sessão:** período de uma atividade (sessão de cinema, sessão de terapia). **Seção** (ou secção): divisão, parte de algo (seção de frutas do mercado). **Cessão:** ato de ceder algo (cessão de direitos).

**Ascender:** subir, elevar-se (ascender na carreira). **Acender:** botar fogo, ligar (acender a luz, acender uma vela).

💡 Dica geral pra provas de ortografia: quando estiver em dúvida entre duas grafias parecidas, pense no sentido da frase primeiro — a maioria dos erros de ortografia cobrados na prova depende do CONTEXTO da frase, não só de decorar a grafia isolada.

<exercicio-interativo pergunta="Complete corretamente: 'Não entendi ___ ele desistiu do curso.' (use a forma junta e sem acento, indicando explicação embutida na pergunta indireta)" resposta="por que" dica="Antes de uma explicação embutida numa pergunta indireta ('não entendi por que...'), usa-se a forma separada e sem acento: por que."></exercicio-interativo>

<quiz>
Qual frase está com a grafia correta?
Ele se saiu muito mau na entrevista.
Aonde fica a sua casa?
[correta] Estudei bastante, mas ainda me sinto inseguro.
A seção de cinema começa às oito.
</quiz>

<flashcard frente="Qual a diferença entre 'onde' e 'aonde'?" verso="'Onde' indica lugar fixo, sem movimento (onde você mora?). 'Aonde' indica lugar com movimento/deslocamento (aonde você vai?)."></flashcard>`
        },

        // ========================================
        // MÓDULO 2: MATEMÁTICA
        // ========================================
        {
            id: 108,
            titulo: "Conjuntos Numéricos",
            descricao: "Naturais, inteiros, racionais, irracionais e reais - o que diferencia cada um.",
            modulo: "Módulo 2: Matemática",
            ordem: 8,
            publicado: true,
            conteudo: `# Os Cinco Conjuntos Numéricos

A matemática organiza os números em conjuntos, cada um "contendo" o anterior. Entender essa hierarquia evita erro bobo em questões que pedem pra classificar um número.

[TABELA]
Conjunto|Símbolo|O que contém|Exemplo
----|---|---|---
Naturais|N|Números inteiros positivos e o zero, sem frações|0, 1, 2, 3, 100...
Inteiros|Z|Naturais e seus opostos negativos|..., -2, -1, 0, 1, 2...
Racionais|Q|Todo número que pode ser escrito como fração de dois inteiros (inclui decimais exatos e dízimas periódicas)|1/2, 0,75, -3, 0,333...
Irracionais|I|Números com infinitas casas decimais SEM repetição (não podem virar fração exata)|√2, π, 1,010010001...
Reais|R|União de todos os racionais com todos os irracionais|Todos os anteriores juntos
[FIM_TABELA]

💡 Repare que Naturais ⊂ Inteiros ⊂ Racionais ⊂ Reais (todo natural é inteiro, todo inteiro é racional, todo racional é real). Já os Irracionais NÃO têm interseção com os Racionais — um número não pode ser racional e irracional ao mesmo tempo.

# Como Identificar um Número Irracional

O teste prático: tente escrever o número como fração. Se conseguir, é racional (mesmo que a decimal pareça "infinita", desde que ela se repita em um padrão — isso é uma dízima periódica, que também é racional). Se as casas decimais forem infinitas e sem nenhum padrão de repetição, é irracional.

**Exemplo:** 0,333... (dízima periódica) é racional, porque pode ser escrita como a fração 1/3. Já √2 = 1,41421356... nunca forma um padrão que se repete, então é irracional.

**Raízes quadradas:** a raiz quadrada de um número que é "quadrado perfeito" (4, 9, 16, 25, 36...) é sempre um número racional (inteiro, inclusive). Já a raiz quadrada de um número que não é quadrado perfeito (2, 3, 5, 7, 10...) é sempre irracional.

# Operações Básicas e Prioridade

Na resolução de expressões numéricas, a ordem de prioridade das operações é: primeiro resolve-se o que está dentro de parênteses, colchetes e chaves (de dentro para fora); depois potenciação e radiciação; depois multiplicação e divisão (na ordem em que aparecem, da esquerda para a direita); por último, adição e subtração (também da esquerda para a direita).

**Exemplo resolvido:** 2 + 3 × (4 - 1)² = 2 + 3 × 3² = 2 + 3 × 9 = 2 + 27 = 29

<colapsavel titulo="📝 Praticando a ordem de operações">
Resolva passo a passo: 10 - 2 × (3 + 1) ÷ 4. Primeiro o parêntese: (3+1) = 4. Depois multiplicação e divisão, da esquerda pra direita: 2 × 4 = 8, depois 8 ÷ 4 = 2. Por último a subtração: 10 - 2 = 8. Resposta final: 8.
</colapsavel>

<exercicio-interativo pergunta="Classifique o número 0,777... (dízima periódica) - ele é racional ou irracional?" resposta="racional" dica="Toda dízima periódica pode ser escrita como fração (0,777... = 7/9), então ela é racional, mesmo tendo infinitas casas decimais."></exercicio-interativo>

<quiz>
Qual dos números abaixo é irracional?
0,5
[correta] √7
-4
2/3
</quiz>

<flashcard frente="Qual a diferença entre número racional e irracional?" verso="Racional pode ser escrito como fração de dois inteiros (inclui decimais exatos e dízimas periódicas). Irracional tem infinitas casas decimais sem nenhum padrão de repetição, e não pode virar fração exata."></flashcard>`
        },
        {
            id: 109,
            titulo: "Expressões Algébricas e Fatoração",
            descricao: "Como simplificar expressões com letras e fatorar os casos mais comuns.",
            modulo: "Módulo 2: Matemática",
            ordem: 9,
            publicado: true,
            conteudo: `# O Que é uma Expressão Algébrica

Uma expressão algébrica é uma expressão matemática que contém letras (chamadas de variáveis ou incógnitas), representando valores desconhecidos ou genéricos. Exemplo: 3x + 5, onde x é a variável.

**Termos semelhantes** são aqueles que têm exatamente a mesma parte literal (a mesma letra, elevada ao mesmo expoente). Só é possível somar ou subtrair termos semelhantes diretamente.

**Exemplo:** 3x + 5x = 8x (são semelhantes, mesma variável x). Já 3x + 5x² NÃO pode ser somado diretamente, porque x e x² são partes literais diferentes.

# Produtos Notáveis

Produtos notáveis são multiplicações que aparecem com tanta frequência que vale a pena decorar o resultado direto, sem precisar multiplicar termo a termo toda vez.

[TABELA]
Produto notável|Fórmula|Nome
----|---|---
Quadrado da soma|(a + b)² = a² + 2ab + b²|Trinômio quadrado perfeito
Quadrado da diferença|(a - b)² = a² - 2ab + b²|Trinômio quadrado perfeito
Produto da soma pela diferença|(a + b) × (a - b) = a² - b²|Diferença de quadrados
[FIM_TABELA]

**Exemplo resolvido:** (x + 3)² = x² + 2 × x × 3 + 3² = x² + 6x + 9

# Fatoração: O Caminho Inverso

Fatorar é transformar uma soma (ou subtração) de termos em uma multiplicação. É basicamente o caminho inverso dos produtos notáveis, e serve pra simplificar expressões e resolver equações.

**Fator comum em evidência:** quando todos os termos têm um fator em comum, ele "sai" multiplicando o que sobrou entre parênteses. Exemplo: 6x + 9 = 3(2x + 3) — o 3 é fator comum de 6 e 9.

**Diferença de quadrados (caminho inverso):** a² - b² = (a + b)(a - b). Exemplo: x² - 25 = (x + 5)(x - 5), porque 25 = 5².

**Trinômio quadrado perfeito (caminho inverso):** a² + 2ab + b² = (a + b)². Exemplo: x² + 8x + 16 = (x + 4)², porque 16 = 4² e 2 × x × 4 = 8x confere.

<colapsavel titulo="📝 Exemplo resolvido: fatorando passo a passo">
Fatore a expressão 4x² - 36. Primeiro identifique: 4x² é (2x)² e 36 é 6², então é uma diferença de quadrados. Aplicando a fórmula: (2x)² - 6² = (2x + 6)(2x - 6). Se quiser simplificar mais, pode colocar 2 em evidência em cada parêntese: 2(x + 3) × 2(x - 3) = 4(x + 3)(x - 3).
</colapsavel>

<exercicio-interativo pergunta="Fatore a expressão x² - 9 usando diferença de quadrados. Escreva no formato (x + a)(x - a), substituindo a pelo número correto." resposta="(x + 3)(x - 3)" dica="9 é o quadrado de 3 (3² = 9), então x² - 9 = (x + 3)(x - 3)."></exercicio-interativo>

<quiz>
Qual é o resultado de (x - 4)², usando o produto notável do quadrado da diferença?
x² - 16
x² + 16
[correta] x² - 8x + 16
x² - 4x + 16
</quiz>

<flashcard frente="Como fatorar uma diferença de quadrados, do tipo a² - b²?" verso="a² - b² = (a + b)(a - b). Exemplo: x² - 25 = (x + 5)(x - 5)."></flashcard>`
        },
        {
            id: 110,
            titulo: "Equações do 1º e 2º Grau",
            descricao: "Como isolar a incógnita e como aplicar Bhaskara.",
            modulo: "Módulo 2: Matemática",
            ordem: 10,
            publicado: true,
            conteudo: `# Equação do 1º Grau

Uma equação do 1º grau tem a forma geral ax + b = 0, onde a e b são números conhecidos (a diferente de zero) e x é a incógnita que queremos descobrir. Resolver é isolar o x sozinho de um lado da igualdade.

**Regra prática:** tudo o que está somando de um lado passa subtraindo pro outro lado (e vice-versa); tudo o que está multiplicando de um lado passa dividindo pro outro lado (e vice-versa).

**Exemplo resolvido:** 3x + 7 = 22. Passo 1: o +7 passa subtraindo: 3x = 22 - 7, ou seja, 3x = 15. Passo 2: o 3 (que multiplica x) passa dividindo: x = 15 ÷ 3, ou seja, x = 5.

# Equação do 2º Grau e a Fórmula de Bhaskara

Uma equação do 2º grau tem a forma geral ax² + bx + c = 0, com a diferente de zero. Diferente da equação do 1º grau, ela pode ter até duas soluções (duas raízes).

A fórmula de Bhaskara resolve qualquer equação do 2º grau, em duas etapas:

**Primeiro, calcula-se o discriminante:** Δ = b² - 4ac

**Depois, aplica-se a fórmula da raiz:** x = (-b ± √Δ) ÷ 2a

O sinal "±" significa que existem duas contas: uma somando a raiz de Δ, outra subtraindo — o que gera as duas possíveis soluções (x' e x'').

# O Que o Valor de Δ (Delta) Revela

[TABELA]
Valor de Δ|O que significa|Quantidade de raízes reais
----|---|---
Δ maior que zero|A equação tem duas soluções diferentes|2 raízes reais e distintas
Δ igual a zero|A equação tem uma solução repetida|1 raiz real (dupla)
Δ menor que zero|Não existe raiz quadrada de número negativo dentro dos reais|Nenhuma raiz real
[FIM_TABELA]

<colapsavel titulo="📝 Exemplo resolvido: aplicando Bhaskara">
Resolva x² - 5x + 6 = 0. Aqui, a = 1, b = -5, c = 6. Primeiro o discriminante: Δ = (-5)² - 4×1×6 = 25 - 24 = 1. Como Δ é positivo, temos duas raízes. Aplicando a fórmula: x = (-(-5) ± √1) ÷ (2×1) = (5 ± 1) ÷ 2. Isso dá duas contas: x' = (5+1)÷2 = 3, e x'' = (5-1)÷2 = 2. As soluções são x = 3 e x = 2.
</colapsavel>

💡 Dica de prova: depois de encontrar as raízes, você pode conferir se elas estão certas substituindo de volta na equação original. Se 3² - 5×3 + 6 = 9 - 15 + 6 = 0, confere!

<exercicio-interativo pergunta="Resolva a equação do 1º grau: 2x - 4 = 10. Qual o valor de x?" resposta="7" dica="Passe o -4 somando pro outro lado: 2x = 14. Depois divida por 2: x = 7."></exercicio-interativo>

<quiz>
Na equação x² - 4 = 0, qual o valor do discriminante (Δ)?
Δ = -4
Δ = 4
[correta] Δ = 16
Δ = 0
</quiz>

<flashcard frente="Qual é a fórmula de Bhaskara?" verso="Primeiro calcula-se Δ = b² - 4ac. Depois aplica-se x = (-b ± √Δ) ÷ 2a, gerando até duas raízes."></flashcard>`
        },
        {
            id: 111,
            titulo: "Razão, Proporção, Porcentagem e Regra de Três",
            descricao: "As ferramentas mais usadas no dia a dia e mais cobradas na prova.",
            modulo: "Módulo 2: Matemática",
            ordem: 11,
            publicado: true,
            conteudo: `# Razão e Proporção

**Razão** é a comparação entre duas grandezas por meio de uma divisão. Se numa sala há 12 meninos e 18 meninas, a razão entre meninos e meninas é 12/18, que simplificando dá 2/3 (ou seja, "2 para 3").

**Proporção** é a igualdade entre duas razões. Se 2/3 = 4/6, dizemos que essas razões formam uma proporção. Numa proporção a/b = c/d, vale a propriedade fundamental: **o produto dos meios é igual ao produto dos extremos**, ou seja, a × d = b × c. Essa propriedade é a base da regra de três.

# Regra de Três Simples

Usada quando duas grandezas estão relacionadas diretamente (ou inversamente), e conhecemos três valores, precisando descobrir o quarto.

**Grandezas diretamente proporcionais:** quando uma aumenta, a outra aumenta na mesma proporção (e vice-versa). Exemplo: quanto mais horas trabalhadas, mais dinheiro recebido.

**Grandezas inversamente proporcionais:** quando uma aumenta, a outra diminui na mesma proporção. Exemplo: quanto mais rápida a velocidade, menos tempo se leva pra percorrer a mesma distância.

**Exemplo resolvido (direta):** Se 5 metros de tecido custam R$ 50, quanto custam 8 metros? Montamos a proporção: 5/8 = 50/x. Multiplicando cruzado (meios × extremos): 5x = 8 × 50, então 5x = 400, logo x = 80. Resposta: R$ 80.

**Exemplo resolvido (inversa):** Se 4 pedreiros constroem um muro em 12 dias, quantos dias levariam 6 pedreiros pra construir o mesmo muro? Como é inversa, inverte-se uma das razões antes de igualar: 4/6 = x/12, invertido corretamente fica 6/4 = 12/x (ou equivalentemente: 4 × 12 = 6 × x). Logo, 48 = 6x, então x = 8 dias.

# Regra de Três Composta

Usada quando o problema envolve três ou mais grandezas relacionadas ao mesmo tempo. A estratégia é montar uma tabela com todas as grandezas e comparar, uma de cada vez, com a grandeza que contém a incógnita — decidindo se cada relação é direta ou inversa.

# Porcentagem

Porcentagem é uma razão especial, sempre comparada a 100. "20%" significa "20 partes em cada 100", ou seja, 20/100 = 0,2.

**Calculando porcentagem de um valor:** para calcular 20% de 300, multiplica-se 300 × 0,2 = 60.

**Calculando aumento ou desconto:** um aumento de 10% sobre um valor equivale a multiplicar por 1,10. Um desconto de 15% equivale a multiplicar por 0,85 (100% - 15% = 85% = 0,85).

**Exemplo resolvido:** um produto de R$ 200 recebe desconto de 15%. Qual o preço final? 200 × 0,85 = 170. Resposta: R$ 170.

<colapsavel titulo="📌 Pegadinha comum: aumento seguido de desconto não se cancela">
Se um produto sobe 10% e depois cai 10%, muita gente acha que volta ao preço original — mas não volta! Um produto de R$ 100 sobe 10% e vira R$ 110. Depois cai 10% sobre o NOVO valor (110), não sobre o valor original: 110 × 0,9 = 99. O preço final é R$ 99, não R$ 100.
</colapsavel>

<exercicio-interativo pergunta="Um produto custa R$ 150 e recebe um desconto de 20%. Qual o preço final, em reais?" resposta="120" dica="Desconto de 20% equivale a multiplicar por 0,8 (100% - 20% = 80%): 150 × 0,8 = 120."></exercicio-interativo>

<quiz>
Se 3 máquinas produzem 60 peças em 1 hora, quantas peças 6 máquinas (no dobro) produziriam no mesmo tempo? (grandezas diretamente proporcionais)
40 peças
90 peças
[correta] 120 peças
180 peças
</quiz>

<flashcard frente="Como calcular um desconto de 25% sobre um valor?" verso="Multiplique o valor por 0,75 (100% - 25% = 75% = 0,75). Exemplo: R$ 200 com 25% de desconto = 200 × 0,75 = R$ 150."></flashcard>`
        },
        {
            id: 112,
            titulo: "Geometria Plana",
            descricao: "Áreas, perímetros, Teorema de Pitágoras e semelhança de triângulos.",
            modulo: "Módulo 2: Matemática",
            ordem: 12,
            publicado: true,
            conteudo: `# Perímetro x Área

**Perímetro** é a soma de todos os lados de uma figura — mede o "contorno". **Área** é o espaço ocupado dentro da figura — mede a "superfície". São conceitos diferentes e é comum a prova cobrar os dois no mesmo problema.

# Fórmulas de Área das Figuras Mais Cobradas

[TABELA]
Figura|Fórmula da área|Observação
----|---|---
Quadrado|A = lado²|Todos os lados são iguais
Retângulo|A = base × altura|
Triângulo|A = (base × altura) ÷ 2|A altura é sempre perpendicular à base
Círculo|A = π × raio²|π (pi) é aproximadamente 3,14
Trapézio|A = (base maior + base menor) × altura ÷ 2|
[FIM_TABELA]

**Exemplo resolvido:** um triângulo tem base 8 cm e altura 5 cm. Sua área é (8 × 5) ÷ 2 = 40 ÷ 2 = 20 cm².

# Teorema de Pitágoras

Vale exclusivamente para **triângulos retângulos** (que têm um ângulo de 90°). Ele relaciona os três lados: a **hipotenusa** (o lado maior, oposto ao ângulo reto) e os dois **catetos** (os lados que formam o ângulo reto).

**Fórmula:** hipotenusa² = cateto¹² + cateto²²

**Exemplo resolvido:** um triângulo retângulo tem catetos de 3 cm e 4 cm. Qual a medida da hipotenusa? hipotenusa² = 3² + 4² = 9 + 16 = 25. Como hipotenusa² = 25, a hipotenusa = √25 = 5 cm. (Esse é o famoso "triângulo 3-4-5", muito usado em prova por dar números redondos.)

💡 O Teorema de Pitágoras também resolve o caminho inverso: se você sabe a hipotenusa e um cateto, isola o cateto que falta: cateto² = hipotenusa² - outro cateto².

# Semelhança de Triângulos

Dois triângulos são **semelhantes** quando têm os três ângulos correspondentes iguais — e, como consequência, os lados correspondentes são proporcionais (guardam a mesma razão entre si), mesmo que o tamanho dos triângulos seja diferente.

**Como usar na prática:** se você sabe que dois triângulos são semelhantes, pode montar uma proporção entre os lados correspondentes pra descobrir uma medida desconhecida — funciona exatamente como uma regra de três.

**Exemplo resolvido:** dois triângulos semelhantes têm lados correspondentes na razão 2 para 5. Se um lado do triângulo menor mede 6 cm, qual é o lado correspondente no triângulo maior? Monta-se a proporção: 2/5 = 6/x. Multiplicando cruzado: 2x = 30, então x = 15 cm.

<colapsavel titulo="📝 Exemplo resolvido: aplicação combinada">
Uma escada está apoiada numa parede, formando um triângulo retângulo com o chão. A base da escada está a 3 metros da parede, e a escada tem 5 metros de comprimento (a hipotenusa). A que altura da parede a escada alcança? Aplicando Pitágoras: 5² = 3² + altura². Então altura² = 25 - 9 = 16. Logo, altura = √16 = 4 metros.
</colapsavel>

<exercicio-interativo pergunta="Um retângulo tem base 10 cm e altura 6 cm. Qual é a sua área, em cm²?" resposta="60" dica="Área do retângulo = base × altura = 10 × 6 = 60 cm²."></exercicio-interativo>

<quiz>
Um triângulo retângulo tem catetos 6 cm e 8 cm. Qual é a medida da hipotenusa?
12 cm
14 cm
[correta] 10 cm
9 cm
</quiz>

<flashcard frente="Qual é a fórmula do Teorema de Pitágoras?" verso="hipotenusa² = cateto1² + cateto2². Vale só para triângulos retângulos."></flashcard>`
        },
        {
            id: 113,
            titulo: "Sistema Métrico e Conversão de Unidades",
            descricao: "Como converter entre unidades de comprimento, massa, capacidade e volume.",
            modulo: "Módulo 2: Matemática",
            ordem: 13,
            publicado: true,
            conteudo: `# A Lógica do Sistema Métrico Decimal

O sistema métrico é organizado em base 10: cada unidade é 10 vezes maior (ou menor) que a unidade vizinha. Isso significa que converter entre unidades é sempre uma questão de multiplicar ou dividir por potências de 10 — ou seja, andar a vírgula pra direita ou pra esquerda.

# Unidades de Comprimento

[TABELA]
Unidade|Símbolo|Relação com o metro
----|---|---
Quilômetro|km|1 km = 1.000 m
Hectômetro|hm|1 hm = 100 m
Decâmetro|dam|1 dam = 10 m
Metro|m|unidade base
Decímetro|dm|1 dm = 0,1 m
Centímetro|cm|1 cm = 0,01 m
Milímetro|mm|1 mm = 0,001 m
[FIM_TABELA]

**Regra prática:** cada "degrau" da tabela acima corresponde a multiplicar (descendo, indo para unidades menores) ou dividir (subindo, indo para unidades maiores) por 10. Descer 3 degraus (km para m) equivale a multiplicar por 1.000; subir 2 degraus (cm para m) equivale a dividir por 100.

**Exemplo resolvido:** converter 2,5 km para metros. km está 3 degraus acima de m, então multiplica-se por 1.000: 2,5 × 1.000 = 2.500 m.

# Unidades de Massa e Capacidade

Massa (quanto "pesa" algo) segue a mesma lógico do comprimento, com o **grama (g)** como unidade base: quilograma (kg) = 1.000 g; miligrama (mg) = 0,001 g.

Capacidade (quanto um recipiente comporta) tem o **litro (L)** como unidade base: mililitro (mL) = 0,001 L; um litro equivale a 1.000 mL.

# Volume e a Relação com Capacidade

Volume mede o espaço ocupado por um objeto tridimensional, geralmente em metros cúbicos (m³) ou seus derivados (cm³, dm³). Existe uma relação importante entre volume e capacidade, muito cobrada em prova:

💡 **1 litro = 1 dm³ = 1.000 cm³**, e **1 m³ = 1.000 litros**.

Essa relação permite transformar um problema de volume (um tanque, uma caixa d'água) em litros, e vice-versa.

**Exemplo resolvido:** uma caixa d'água tem formato de um cubo com 2 metros de aresta. Qual sua capacidade em litros? Primeiro calcula-se o volume: 2³ = 2 × 2 × 2 = 8 m³. Como 1 m³ = 1.000 litros, a caixa comporta 8 × 1.000 = 8.000 litros.

<colapsavel titulo="📝 Exemplo resolvido: conversão combinada">
Uma receita pede 750 mL de leite, mas a embalagem que você tem informa a quantidade em litros. Quantos litros são 750 mL? Como mL está 3 degraus abaixo de L, divide-se por 1.000: 750 ÷ 1.000 = 0,75 L.
</colapsavel>

<exercicio-interativo pergunta="Converta 3.500 metros para quilômetros. Qual o resultado?" resposta="3,5" dica="km está 3 degraus acima de m, então divide-se por 1.000: 3.500 ÷ 1.000 = 3,5 km."></exercicio-interativo>

<quiz>
Quantos litros cabem em uma caixa d'água de 2 m³?
20 litros
200 litros
[correta] 2.000 litros
20.000 litros
</quiz>

<flashcard frente="Qual a relação entre litro e centímetro cúbico?" verso="1 litro = 1 dm³ = 1.000 cm³. E 1 m³ = 1.000 litros."></flashcard>`
        },

        // ========================================
        // MÓDULO 3: HISTÓRIA
        // ========================================
        {
            id: 114,
            titulo: "Brasil Colonial",
            descricao: "Da chegada dos portugueses ao fim do período colonial: economia, sociedade e poder.",
            modulo: "Módulo 3: História",
            ordem: 14,
            publicado: true,
            conteudo: `# A Chegada Portuguesa e o Ciclo do Pau-Brasil

Em 1500, a expedição de Pedro Álvares Cabral chegou ao território que viria a ser o Brasil. Nas primeiras décadas, os portugueses não tinham grande interesse em colonizar de fato — a exploração se limitou à extração do pau-brasil, madeira usada para produzir corante, obtida por meio de escambo com os povos indígenas.

# Capitanias Hereditárias e Governo-Geral

Com a ameaça de outras potências europeias (como a França) explorarem o território, Portugal decidiu efetivamente colonizar o Brasil. Em 1534, a Coroa dividiu o território em **capitanias hereditárias**: faixas de terra doadas a nobres portugueses (os donatários), que tinham autonomia administrativa mas deviam desenvolver a região às próprias custas. A maioria fracassou, por falta de recursos e conflitos com povos indígenas.

Diante desse fracasso, em 1548 Portugal criou o **Governo-Geral**, centralizando a administração colonial em uma única autoridade nomeada pela Coroa, com sede em Salvador.

# O Ciclo do Açúcar

Entre os séculos XVI e XVII, a cana-de-açúcar se tornou a base da economia colonial, cultivada nos **engenhos**, principalmente no Nordeste. A produção dependia da **mão de obra escravizada**: primeiro indígena, mas rapidamente substituída majoritariamente pela mão de obra africana, trazida à força através do tráfico negreiro transatlântico — um dos episódios mais violentos e determinantes da formação social brasileira.

A sociedade açucareira era marcada por grande desigualdade: de um lado os senhores de engenho, donos de terra e poder; do outro, a população escravizada, submetida a condições desumanas de trabalho e vida.

# Invasões Estrangeiras

Ao longo do período colonial, o Brasil sofreu invasões de outras potências europeias interessadas em explorar suas riquezas, com destaque para as **invasões holandesas**, que ocuparam parte do Nordeste (principalmente Pernambuco) entre 1630 e 1654, período em que a região viveu sob administração holandesa antes de ser expulsa pelos colonos locais.

# O Ciclo do Ouro

No século XVIII, a descoberta de ouro na região de Minas Gerais deslocou o eixo econômico da colônia do Nordeste para o Centro-Sul, provocando uma intensa migração interna. A exploração do ouro gerou maior controle fiscal por parte da Coroa portuguesa, incluindo a cobrança do **quinto** (20% de todo o ouro extraído).

A insatisfação com a pesada tributação portuguesa culminou na **Inconfidência Mineira (1789)**, um movimento de elite (formado por intelectuais, membros do clero e proprietários de terra) que planejava a independência da região e o fim da monarquia. O movimento foi descoberto e reprimido, e seu principal símbolo, Joaquim José da Silva Xavier — o **Tiradentes** — foi executado, tornando-se posteriormente um mártir da luta pela independência brasileira.

# A Chegada da Família Real e o Fim do Período Colonial

Em 1808, fugindo da invasão napoleônica em Portugal, a família real portuguesa se transferiu para o Brasil, instalando a sede do governo português no Rio de Janeiro. Essa mudança teve um efeito prático imediato: a **Abertura dos Portos às Nações Amigas**, que encerrou o monopólio comercial português e permitiu que o Brasil comerciasse diretamente com outros países.

Em 1815, o Brasil foi elevado à condição de **Reino Unido a Portugal e Algarves**, deixando formalmente de ser uma colônia — um passo importante rumo à independência, que ocorreria poucos anos depois, em 1822.

<colapsavel titulo="📌 Por que o Brasil não teve uma só economia colonial?">
A economia colonial se organizou em ciclos, cada um concentrado numa região e período diferentes: pau-brasil (litoral, início da colonização), açúcar (Nordeste, séculos XVI-XVII) e ouro (Minas Gerais, século XVIII). Cada ciclo deslocou o centro de poder econômico e populacional da colônia, moldando as desigualdades regionais que existem no Brasil até hoje.
</colapsavel>

<exercicio-interativo pergunta="Em que ano ocorreu a Inconfidência Mineira, movimento que teve Tiradentes como principal símbolo?" resposta="1789" dica="Foi o mesmo ano da Revolução Francesa, o que não é coincidência: as ideias iluministas influenciaram os inconfidentes mineiros."></exercicio-interativo>

<quiz>
O que motivou a criação do Governo-Geral em 1548?
O fim do ciclo do açúcar
[correta] O fracasso do sistema de capitanias hereditárias
A descoberta de ouro em Minas Gerais
A chegada da família real ao Brasil
</quiz>

<flashcard frente="O que foi a Abertura dos Portos às Nações Amigas, e quando ocorreu?" verso="Em 1808, com a chegada da família real ao Brasil, encerrou o monopólio comercial português e permitiu que o Brasil comerciasse diretamente com outros países."></flashcard>`
        },
        {
            id: 115,
            titulo: "Independência e Brasil Monárquico",
            descricao: "De 1822 até 1889: Primeiro Reinado, Período Regencial e Segundo Reinado.",
            modulo: "Módulo 3: História",
            ordem: 15,
            publicado: true,
            conteudo: `# A Independência do Brasil (1822)

Após o retorno da família real a Portugal em 1821, as Cortes portuguesas tentaram recolonizar o Brasil, reduzindo sua autonomia. Dom Pedro, filho do rei português que havia ficado no Brasil como príncipe regente, resistiu às pressões e, em 7 de setembro de 1822, às margens do rio Ipiranga (em São Paulo), proclamou a independência — episódio conhecido como o **Grito do Ipiranga**. Dom Pedro tornou-se então o primeiro imperador do Brasil, com o título de Dom Pedro I.

💡 A independência não rompeu totalmente os laços com a estrutura social anterior: a escravidão foi mantida, e a elite política e econômica colonial permaneceu praticamente a mesma — foi uma independência conduzida "por cima", sem grande participação popular.

# Primeiro Reinado (1822-1831)

O governo de Dom Pedro I foi marcado por conflitos com a elite política, especialmente em torno da Constituição de 1824 (outorgada, ou seja, imposta pelo imperador, sem participação de uma assembleia representativa) e por dificuldades econômicas. A impopularidade crescente e conflitos políticos levaram Dom Pedro I a abdicar do trono em 1831, em favor de seu filho ainda criança, Dom Pedro II.

# Período Regencial (1831-1840)

Como Dom Pedro II era criança, o país foi governado por regentes até que ele atingisse a maioridade. Esse foi um período de grande instabilidade política, marcado por diversas **revoltas regionais**, motivadas por insatisfações sociais, econômicas e disputas de poder local — entre elas a Cabanagem (Pará), a Sabinada (Bahia), a Balaiada (Maranhão) e a Revolução Farroupilha (Rio Grande do Sul, a mais longa, durando quase uma década).

# Segundo Reinado (1840-1889)

Com a antecipação da maioridade de Dom Pedro II (o chamado **Golpe da Maioridade**, em 1840), inicia-se o Segundo Reinado, período de maior estabilidade política interna, mas também marcado por importantes eventos:

**Guerra do Paraguai (1864-1870):** conflito entre o Paraguai e a Tríplice Aliança (Brasil, Argentina e Uruguai), o maior conflito armado da história da América do Sul, que devastou a população e a economia paraguaia e teve custos altíssimos também para o Brasil.

**Abolição da escravatura:** o fim da escravidão ocorreu de forma gradual, através de leis progressivas — a Lei Eusébio de Queirós (1850, fim do tráfico negreiro), a Lei do Ventre Livre (1871, libertava os filhos de escravizados nascidos a partir daquela data) e a Lei dos Sexagenários (1885) — até a abolição definitiva com a **Lei Áurea**, assinada pela Princesa Isabel em **13 de maio de 1888**.

# A Proclamação da República (1889)

O fim da escravidão desagradou os grandes proprietários rurais, tradicionais sustentadores da monarquia, enquanto o exército (fortalecido após a Guerra do Paraguai) e setores urbanos republicanos ganhavam força política. Esse conjunto de fatores levou à derrubada da monarquia: em **15 de novembro de 1889**, um movimento liderado pelo Marechal Deodoro da Fonseca proclamou a **República**, encerrando o período monárquico no Brasil.

<colapsavel titulo="📌 Linha do tempo resumida">
1822 - Independência (Dom Pedro I). 1824 - Primeira Constituição. 1831 - Abdicação de Dom Pedro I. 1831-1840 - Período Regencial. 1840 - Golpe da Maioridade (início do Segundo Reinado). 1864-1870 - Guerra do Paraguai. 1888 - Lei Áurea (abolição). 1889 - Proclamação da República.
</colapsavel>

<exercicio-interativo pergunta="Em que data foi assinada a Lei Áurea, que aboliu definitivamente a escravidão no Brasil? Responda no formato dia/mês/ano." resposta="13/05/1888" dica="Foi assinada pela Princesa Isabel, em 13 de maio de 1888."></exercicio-interativo>

<quiz>
O que foi o Período Regencial (1831-1840)?
O governo direto de Dom Pedro I
[correta] O período em que o Brasil foi governado por regentes, por Dom Pedro II ser ainda criança
O período da Guerra do Paraguai
O governo provisório após a Proclamação da República
</quiz>

<flashcard frente="Quem proclamou a República no Brasil, e em que ano?" verso="O Marechal Deodoro da Fonseca, em 15 de novembro de 1889."></flashcard>`
        },
        {
            id: 116,
            titulo: "Brasil República",
            descricao: "República Velha, Era Vargas, República Populista, Ditadura Militar e redemocratização.",
            modulo: "Módulo 3: História",
            ordem: 16,
            publicado: true,
            conteudo: `# República Velha (1889-1930)

Também chamada de República Oligárquica, esse período foi marcado pelo domínio político das elites agrárias, especialmente de São Paulo (produtores de café) e Minas Gerais (produtores de leite e pecuária) — daí o apelido de **política do café com leite**, revezamento informal do poder presidencial entre políticos desses dois estados.

No plano local, o poder era exercido através do **coronelismo**: grandes proprietários de terra (os "coronéis") controlavam a política das regiões interioranas, trocando favores e usando de influência (e muitas vezes coerção) para garantir votos.

# Era Vargas (1930-1945)

A crise econômica mundial de 1929, que afetou fortemente o preço do café, e a insatisfação política de setores excluídos do poder culminaram na **Revolução de 1930**, que impediu a posse do candidato eleito e colocou Getúlio Vargas na presidência, encerrando a República Velha.

Vargas governou por 15 anos consecutivos, com uma fase mais autoritária: o **Estado Novo (1937-1945)**, um regime ditatorial que centralizou o poder, perseguiu opositores e controlou fortemente a imprensa, mas também promoveu avanços na legislação trabalhista (criação da CLT, salário mínimo, jornada de trabalho regulamentada).

# República Populista (1945-1964)

Com o fim do Estado Novo, o Brasil viveu um período de redemocratização, com eleições diretas e maior liberdade política. Esse período é chamado de "populista" pelo estilo de liderança de presidentes que buscavam apoio direto das massas populares.

Um destaque importante é o governo de **Juscelino Kubitschek (1956-1961)**, conhecido pelo lema "50 anos em 5", marcado por forte industrialização e pela construção de **Brasília**, a nova capital federal, inaugurada em 1960.

# Ditadura Militar (1964-1985)

Em 1964, um golpe militar derrubou o presidente João Goulart, dando início a um regime ditatorial que durou 21 anos, sob comando de sucessivos presidentes militares. O período foi marcado por forte repressão política, censura à imprensa e perseguição a opositores — intensificada especialmente após o **Ato Institucional nº 5 (AI-5)**, decretado em 1968, que suspendeu diversos direitos e garantias constitucionais.

Apesar da repressão, o período também teve fases de crescimento econômico acelerado, especialmente no início da década de 1970, conhecida como "milagre econômico" — embora acompanhada de aumento da desigualdade social e da dívida externa.

# Redemocratização e Constituição de 1988

A partir do final da década de 1970, o regime militar iniciou uma "abertura política lenta e gradual". O movimento **Diretas Já** (1983-1984) mobilizou a população pedindo eleições diretas para presidente, embora não tenha conseguido aprovação imediata no Congresso. Em 1985, através de eleição indireta, um presidente civil (Tancredo Neves, substituído por José Sarney após seu falecimento) assumiu o poder, encerrando formalmente a ditadura.

Em 1988, foi promulgada a nova **Constituição Federal**, conhecida como "Constituição Cidadã" por ampliar significativamente os direitos individuais, sociais e políticos, servindo como marco legal da democracia brasileira até hoje.

<colapsavel titulo="📌 Linha do tempo resumida">
1889-1930 - República Velha (café com leite, coronelismo). 1930-1945 - Era Vargas (Estado Novo a partir de 1937). 1945-1964 - República Populista (JK e Brasília em 1960). 1964-1985 - Ditadura Militar (AI-5 em 1968). 1985 - Fim da ditadura. 1988 - Nova Constituição.
</colapsavel>

<exercicio-interativo pergunta="Qual Ato Institucional, decretado em 1968 durante a Ditadura Militar, suspendeu diversos direitos constitucionais e marcou o período de maior repressão do regime?" resposta="AI-5" dica="É a sigla de Ato Institucional número 5, considerado o instrumento mais duro da ditadura."></exercicio-interativo>

<quiz>
O que caracterizava a 'política do café com leite' durante a República Velha?
A aliança entre militares e industriais
[correta] O revezamento do poder presidencial entre as elites de São Paulo e Minas Gerais
A união entre trabalhadores urbanos e rurais
O controle da economia pelo governo federal
</quiz>

<flashcard frente="O que foi construído durante o governo de Juscelino Kubitschek, símbolo do lema '50 anos em 5'?" verso="Brasília, a nova capital federal, inaugurada em 1960."></flashcard>`
        },
        {
            id: 117,
            titulo: "Revoluções e Guerras Mundiais",
            descricao: "Revoluções Liberais, Imperialismo, e as duas Guerras Mundiais.",
            modulo: "Módulo 3: História",
            ordem: 17,
            publicado: true,
            conteudo: `# Revoluções Liberais

No final do século XVIII, duas revoluções marcaram a ascensão dos ideais **liberais** (baseados na igualdade jurídica, liberdade individual e limitação do poder absoluto dos reis), rompendo com o modelo de monarquias absolutistas:

A **Independência dos Estados Unidos (1776)**, que rompeu o domínio colonial britânico e criou uma república baseada em princípios liberais e representativos.

A **Revolução Francesa (1789)**, que derrubou a monarquia absolutista francesa, tendo como lema "Liberdade, Igualdade e Fraternidade" — um marco histórico que influenciou movimentos de independência e revoluções liberais em todo o mundo, incluindo a Inconfidência Mineira no Brasil.

# Imperialismo (Século XIX)

No século XIX, as potências industrializadas da Europa (como Reino Unido, França e Alemanha) buscavam matérias-primas, mercados consumidores e prestígio político, o que levou à **partilha da África e de partes da Ásia** entre essas potências — processo conhecido como Imperialismo (ou Neocolonialismo).

A **Conferência de Berlim (1884-1885)** formalizou as regras para essa divisão territorial da África entre as potências europeias, sem qualquer participação dos povos africanos, gerando fronteiras artificiais que ainda hoje causam conflitos étnicos e territoriais no continente.

# Primeira Guerra Mundial (1914-1918)

O acirramento das disputas imperialistas, rivalidades econômicas e alianças militares entre as potências europeias formou dois blocos: a **Tríplice Aliança** (Alemanha, Áustria-Hungria e Itália) e a **Tríplice Entente** (França, Reino Unido e Rússia).

O estopim do conflito foi o **assassinato do Arquiduque Francisco Ferdinando** (herdeiro do trono austro-húngaro), em Sarajevo, em 1914, que desencadeou uma série de declarações de guerra entre as potências aliadas de cada lado.

A guerra terminou em 1918 com a derrota da Alemanha e seus aliados, formalizada pelo **Tratado de Versalhes (1919)**, que impôs pesadas indenizações e restrições militares à Alemanha — condições que, ao empobrecerem e humilharem o país, contribuíram para a ascensão do nazismo poucos anos depois.

# Segunda Guerra Mundial (1939-1945)

O conflito opôs o **Eixo** (Alemanha nazista, Itália fascista e Japão imperial) aos **Aliados** (principalmente Reino Unido, União Soviética, Estados Unidos e França). A guerra começou com a invasão alemã à Polônia, em 1939, sob comando de **Adolf Hitler**.

Um dos episódios mais trágicos do conflito foi o **Holocausto**: o extermínio sistemático de aproximadamente seis milhões de judeus, além de outros grupos perseguidos pelo regime nazista (ciganos, pessoas com deficiência, homossexuais, opositores políticos), em campos de concentração e extermínio.

A guerra terminou em 1945, após a rendição da Alemanha e, no Pacífico, após os Estados Unidos lançarem **bombas atômicas sobre Hiroshima e Nagasaki**, no Japão, levando à rendição japonesa e ao fim do conflito.

<colapsavel titulo="📌 Por que a Primeira Guerra ajudou a causar a Segunda?">
O Tratado de Versalhes impôs à Alemanha derrotada pesadas indenizações de guerra e humilhações territoriais e militares. Essa crise econômica e o sentimento de humilhação nacional criaram um ambiente propício para discursos nacionalistas extremistas, explorados por Hitler e o Partido Nazista para chegar ao poder na década de 1930.
</colapsavel>

<exercicio-interativo pergunta="Qual evento é considerado o estopim (o fato que desencadeou) a Primeira Guerra Mundial, em 1914?" resposta="assassinato do arquiduque francisco ferdinando" dica="Ocorreu em Sarajevo, e envolveu o herdeiro do trono da Áustria-Hungria."></exercicio-interativo>

<quiz>
Qual documento formalizou a partilha da África entre as potências europeias, no século XIX?
Tratado de Versalhes
Declaração dos Direitos do Homem
[correta] Conferência de Berlim
Tríplice Entente
</quiz>

<flashcard frente="Quais países formavam o Eixo na Segunda Guerra Mundial?" verso="Alemanha nazista, Itália fascista e Japão imperial."></flashcard>`
        },
        {
            id: 118,
            titulo: "Guerra Fria e Socialismo",
            descricao: "A disputa entre capitalismo e socialismo que dividiu o mundo no século XX.",
            modulo: "Módulo 3: História",
            ordem: 18,
            publicado: true,
            conteudo: `# O Que é Socialismo

O socialismo é uma teoria política e econômica desenvolvida principalmente por Karl Marx e Friedrich Engels, no século XIX, que critica o sistema capitalista (baseado na propriedade privada dos meios de produção e na busca por lucro) e propõe que os meios de produção (fábricas, terras, recursos) sejam controlados coletivamente, geralmente pelo Estado, buscando reduzir as desigualdades entre classes sociais.

# A Revolução Russa (1917)

Em 1917, a Rússia — até então governada por um czar (monarca absolutista) — viveu uma revolução liderada por Vladimir Lênin e o Partido Bolchevique, que derrubou o governo czarista e, posteriormente, também o governo provisório que o havia sucedido. Esse foi o primeiro grande exemplo prático da implementação de um Estado socialista, dando origem, alguns anos depois, à **União Soviética (URSS)**.

# O Que Foi a Guerra Fria (1947-1991)

Após a Segunda Guerra Mundial, o mundo se dividiu entre duas superpotências com sistemas políticos e econômicos opostos: os **Estados Unidos** (defendendo o capitalismo e a democracia liberal) e a **União Soviética** (defendendo o socialismo). Essa rivalidade ideológica, política, econômica e militar — sem confronto militar direto entre as duas potências — ficou conhecida como Guerra Fria.

**Características principais da Guerra Fria:**

A divisão do mundo em blocos de influência: países alinhados aos Estados Unidos (bloco capitalista) e países alinhados à União Soviética (bloco socialista), além dos países chamados de "não-alinhados".

A **corrida armamentista**, com acúmulo de armas nucleares por ambos os lados, criando um clima de tensão constante pelo risco de uma guerra nuclear.

A **corrida espacial**, disputa simbólica de prestígio tecnológico e científico entre as duas potências (destaque para o lançamento do satélite soviético Sputnik, em 1957, e a chegada norte-americana à Lua, em 1969).

Conflitos "indiretos" (chamados de guerras por procuração), em que as duas potências apoiavam lados opostos em conflitos regionais, sem se enfrentar diretamente — como na Guerra da Coreia e na Guerra do Vietnã.

# O Muro de Berlim: Símbolo da Divisão

A Alemanha, derrotada na Segunda Guerra, foi dividida em duas: a Alemanha Ocidental (capitalista, alinhada aos EUA) e a Alemanha Oriental (socialista, alinhada à URSS). Em 1961, foi construído o **Muro de Berlim**, dividindo fisicamente a cidade de Berlim e impedindo a fuga de cidadãos do lado oriental para o ocidental — tornando-se o principal símbolo físico da Guerra Fria.

# O Fim da Guerra Fria

Ao longo da década de 1980, a União Soviética enfrentou grave crise econômica e política. O Muro de Berlim caiu em **1989**, e a própria União Soviética se dissolveu em **1991**, encerrando oficialmente a Guerra Fria e consolidando os Estados Unidos como principal potência mundial no período seguinte.

<colapsavel titulo="📌 Guerra Fria não foi uma guerra 'quente' — mas quase">
O nome 'fria' existe justamente porque as duas superpotências nunca se enfrentaram diretamente em batalha. Porém, o mundo chegou perto de um conflito nuclear direto durante a Crise dos Mísseis de Cuba (1962), quando a URSS instalou mísseis nucleares em Cuba, próximo aos Estados Unidos — a crise foi resolvida por negociação diplomática, mas é considerada o momento mais tenso de toda a Guerra Fria.
</colapsavel>

<exercicio-interativo pergunta="Em que ano caiu o Muro de Berlim, símbolo da divisão da Guerra Fria?" resposta="1989" dica="Caiu dois anos antes da dissolução da própria União Soviética, que ocorreu em 1991."></exercicio-interativo>

<quiz>
O que caracterizava a disputa da Guerra Fria entre EUA e URSS?
Um confronto militar direto entre as duas potências
[correta] Uma disputa ideológica, política e militar indireta, sem guerra direta entre as duas potências
Uma aliança militar entre as duas potências contra a Alemanha
Um acordo de divisão pacífica do comércio mundial
</quiz>

<flashcard frente="Quem liderou a Revolução Russa de 1917?" verso="Vladimir Lênin, à frente do Partido Bolchevique, derrubando o governo czarista e dando origem à futura União Soviética."></flashcard>`
        },

        // ========================================
        // MÓDULO 4: GEOGRAFIA
        // ========================================
        {
            id: 119,
            titulo: "Geografia do Brasil",
            descricao: "Clima, população, urbanização, agricultura e indústria do território brasileiro.",
            modulo: "Módulo 4: Geografia",
            ordem: 19,
            publicado: true,
            conteudo: `# Os Climas do Brasil

O Brasil é um país de dimensões continentais, o que resulta em grande diversidade climática:

[TABELA]
Tipo de clima|Onde predomina|Característica principal
----|---|---
Equatorial|Região Norte (Amazônia)|Quente e muito úmido, chuvas o ano todo, pouca variação de temperatura
Tropical|Centro-Oeste, partes do Sudeste e Nordeste|Duas estações bem definidas: verão chuvoso e inverno seco
Semiárido|Interior do Nordeste|Quente e com baixos índices de chuva, risco de seca
Tropical de altitude|Áreas mais elevadas do Sudeste (serras)|Temperaturas mais amenas que o tropical típico, por causa da altitude
Subtropical|Região Sul|Quatro estações bem definidas, com invernos mais frios, podendo ocorrer geada e neve em pontos mais altos
[FIM_TABELA]

# População e Urbanização

A população brasileira é historicamente concentrada próxima ao litoral, reflexo do processo de colonização, que começou na costa e avançou lentamente para o interior. As regiões Sudeste e Nordeste concentram a maior parte da população, enquanto a Região Norte, apesar da grande extensão territorial, tem a menor densidade demográfica.

A partir da década de 1950, o Brasil viveu um intenso processo de **urbanização acelerada**, impulsionado principalmente pelo **êxodo rural** — a migração de trabalhadores do campo para as cidades, motivada pela mecanização da agricultura (que reduziu a necessidade de mão de obra rural) e pela busca de empregos industriais nos centros urbanos. Esse processo, muitas vezes desordenado, contribuiu para o crescimento de favelas e para problemas de infraestrutura urbana que persistem até hoje.

# Agricultura Brasileira

A agricultura brasileira combina, de um lado, o **agronegócio**: produção em larga escala, altamente mecanizada e voltada principalmente para exportação, concentrada em grandes propriedades (as chamadas commodities agrícolas, como soja, milho, café e cana-de-açúcar); e, de outro lado, a **agricultura familiar**, praticada em pequenas propriedades, com forte papel na produção de alimentos para o consumo interno do país.

O Brasil é um dos maiores produtores e exportadores mundiais de commodities agrícolas, especialmente **soja** (usada tanto para alimentação animal quanto humana, e como matéria-prima industrial) e **café** (produto historicamente importante desde o período colonial e imperial).

# Indústria e Desigualdades Regionais

A industrialização brasileira se concentrou historicamente na **Região Sudeste**, especialmente em São Paulo, favorecida por fatores como a riqueza acumulada com o ciclo do café, disponibilidade de mão de obra (inclusive de imigrantes) e boa infraestrutura de transporte e energia.

Com o tempo, políticas de desenvolvimento regional e a busca por menores custos de produção incentivaram a formação de **polos industriais em outras regiões**, como o polo automotivo do Sul, o polo de eletroeletrônicos da Zona Franca de Manaus (Região Norte) e polos químicos e têxteis no Nordeste — reduzindo, mas não eliminando, a concentração industrial histórica no Sudeste.

<colapsavel titulo="📌 Por que o Sudeste concentra tanta riqueza até hoje?">
A concentração de riqueza no Sudeste tem raízes históricas: foi ali que se acumulou o capital gerado pelo ciclo do café, no século XIX, capital que depois foi reinvestido na industrialização da região, criando um ciclo de vantagem econômica que se manteve ao longo do século XX e ainda influencia as desigualdades regionais brasileiras atuais.
</colapsavel>

<exercicio-interativo pergunta="Qual processo de migração interna, ocorrido principalmente a partir da década de 1950, levou trabalhadores do campo para as cidades brasileiras?" resposta="êxodo rural" dica="Foi impulsionado pela mecanização da agricultura e pela busca por empregos industriais nas cidades."></exercicio-interativo>

<quiz>
Qual tipo de clima predomina no interior do Nordeste brasileiro, marcado por baixos índices de chuva e risco de seca?
Equatorial
Subtropical
Tropical de altitude
[correta] Semiárido
</quiz>

<flashcard frente="Qual a diferença entre agronegócio e agricultura familiar?" verso="Agronegócio: produção em larga escala, mecanizada, voltada à exportação (commodities). Agricultura familiar: pequenas propriedades, com papel importante na produção de alimentos para consumo interno."></flashcard>`
        },
        {
            id: 120,
            titulo: "Geografia Mundial e Globalização",
            descricao: "Blocos econômicos e os principais aspectos geopolíticos dos continentes.",
            modulo: "Módulo 4: Geografia",
            ordem: 20,
            publicado: true,
            conteudo: `# O Que é Globalização

Globalização é o processo de crescente integração econômica, política, cultural e tecnológica entre os países do mundo, intensificado principalmente a partir do final do século XX, impulsionado pelo avanço dos transportes, das telecomunicações e da internet.

Esse processo trouxe benefícios (maior acesso a produtos, informação e tecnologia) mas também aprofundou desigualdades entre países desenvolvidos e em desenvolvimento, além de gerar debates sobre a perda de identidades culturais locais frente à influência cultural globalizada (fenômeno às vezes chamado de "homogeneização cultural").

# Blocos Econômicos

Blocos econômicos são acordos entre países de uma mesma região para facilitar o comércio entre si, reduzindo tarifas e barreiras comerciais, e fortalecendo o poder de negociação conjunto frente a outros blocos e países.

[TABELA]
Bloco|Países-membros (principais)|Característica
----|---|---
Mercosul|Brasil, Argentina, Paraguai, Uruguai (e outros associados)|Bloco econômico da América do Sul, buscando integração comercial regional
União Europeia|Diversos países europeus, como Alemanha, França e Itália|O bloco mais integrado do mundo, com moeda única (o euro) adotada pela maioria dos membros
[FIM_TABELA]

# Panorama Geopolítico por Região

**Europa:** concentra países desenvolvidos, com destaque para a União Europeia como projeto de integração. Enfrenta desafios como o envelhecimento populacional (baixas taxas de natalidade e aumento da expectativa de vida) e debates sobre imigração.

**América:** os Estados Unidos se consolidaram como a maior potência econômica e militar do continente (e uma das principais do mundo). Já a América Latina, incluindo o Brasil, é formada majoritariamente por países em desenvolvimento, com economias historicamente dependentes da exportação de commodities.

**Ásia:** região de grande diversidade econômica. O **Japão** é uma potência industrial e tecnológica altamente desenvolvida, apesar da escassez de recursos naturais próprios. A **China** se tornou uma potência industrial e comercial de primeira grandeza, com a maior população do mundo entre os países individuais, e crescente influência geopolítica global. A **Índia**, também extremamente populosa, vive um processo acelerado de crescimento econômico e tecnológico, ainda que conviva com desigualdades sociais significativas.

**Oriente Médio:** região estrategicamente importante pelas grandes reservas de petróleo, mas também marcada por conflitos territoriais, religiosos e políticos de longa duração, que têm repercussão geopolítica mundial.

**África:** continente de enorme diversidade cultural, étnica e de recursos naturais. Enfrenta desafios estruturais de desenvolvimento, herança em parte do processo de colonização e da partilha territorial arbitrária feita pelas potências europeias no século XIX (lembra da Conferência de Berlim?), que gerou fronteiras que não respeitam as divisões étnicas locais, contribuindo para conflitos internos em diversos países.

<colapsavel titulo="📌 Como conectar Geografia com a aula de História">
Muita coisa da geopolítica atual só faz sentido conectada com a História: as fronteiras conturbadas da África vêm da partilha colonial do século XIX; a divisão entre países desenvolvidos e em desenvolvimento tem raízes no colonialismo; e os blocos econômicos atuais muitas vezes nasceram como resposta a conflitos históricos (a União Europeia, por exemplo, nasceu da vontade de evitar novas guerras como as duas Guerras Mundiais).
</colapsavel>

<exercicio-interativo pergunta="Qual é o bloco econômico da América do Sul, formado por Brasil, Argentina, Paraguai e Uruguai como membros principais?" resposta="mercosul" dica="É a sigla de Mercado Comum do Sul."></exercicio-interativo>

<quiz>
Qual país asiático é considerado uma potência industrial e tecnológica altamente desenvolvida, apesar da escassez de recursos naturais próprios?
China
Índia
[correta] Japão
Coreia do Norte
</quiz>

<flashcard frente="O que é um bloco econômico?" verso="Um acordo entre países de uma mesma região para facilitar o comércio entre si, reduzindo tarifas e barreiras comerciais, fortalecendo o poder de negociação conjunto."></flashcard>`
        },

        // ========================================
        // MÓDULO 5: BIOLOGIA
        // ========================================
        {
            id: 121,
            titulo: "Ecologia e Meio Ambiente",
            descricao: "Relações ecológicas, ciclos biogeoquímicos e os grandes temas ambientais atuais.",
            modulo: "Módulo 5: Biologia",
            ordem: 21,
            publicado: true,
            conteudo: `# Cadeia Alimentar e Níveis Tróficos

Uma cadeia alimentar representa a transferência de energia entre os seres vivos de um ecossistema, através das relações de "quem come quem". Cada posição nessa cadeia é chamada de **nível trófico**:

[TABELA]
Nível trófico|Função|Exemplo
----|---|---
Produtores|Organismos capazes de produzir seu próprio alimento, geralmente através da fotossíntese|Plantas, algas
Consumidores primários|Se alimentam diretamente dos produtores (herbívoros)|Coelho, gafanhoto
Consumidores secundários|Se alimentam dos consumidores primários (carnívoros ou onívoros)|Sapo, raposa
Decompositores|Se alimentam de matéria orgânica morta, devolvendo nutrientes ao ambiente|Fungos, bactérias
[FIM_TABELA]

Quando várias cadeias alimentares se cruzam (porque a maioria dos animais come mais de um tipo de alimento), formam uma **teia alimentar**, uma representação mais realista das relações de um ecossistema.

# Relações Ecológicas Entre os Seres Vivos

Além de "comer e ser comido", os seres vivos se relacionam de outras formas dentro de um ecossistema:

[TABELA]
Relação|Efeito para cada espécie envolvida|Exemplo
----|---|---
Predatismo|Uma espécie caça e se alimenta da outra (+ para o predador, - para a presa)|Leão caçando zebra
Competição|Duas espécies disputam o mesmo recurso (- para ambas)|Duas plantas disputando luz solar
Mutualismo|Ambas as espécies se beneficiam, e dependem uma da outra pra sobreviver|Abelha e flor (polinização em troca de néctar)
Comensalismo|Uma espécie se beneficia, e a outra não é afetada (nem ganha, nem perde)|Rêmora que se prende ao tubarão para se locomover e se alimentar de restos
Parasitismo|Uma espécie se beneficia (o parasita), prejudicando a outra (o hospedeiro)|Carrapato se alimentando do sangue de um cão
[FIM_TABELA]

# Ciclos Biogeoquímicos

Os elementos químicos essenciais à vida circulam continuamente entre os seres vivos e o ambiente físico (ar, água, solo), em processos chamados de ciclos biogeoquímicos:

**Ciclo da água:** envolve evaporação (da água presente em rios, mares e solo), condensação (formação de nuvens) e precipitação (chuva), num movimento contínuo.

**Ciclo do carbono:** as plantas absorvem gás carbônico (CO₂) do ar durante a fotossíntese, incorporando o carbono à matéria orgânica; esse carbono retorna à atmosfera através da respiração dos seres vivos e da decomposição de matéria orgânica morta, e também através da queima de combustíveis fósseis.

**Ciclo do nitrogênio:** o nitrogênio do ar (que as plantas não conseguem absorver diretamente) é transformado em formas aproveitáveis por bactérias fixadoras de nitrogênio no solo, entrando assim na cadeia alimentar.

# Grandes Temas Ambientais Atuais

**Aquecimento global:** o aumento da concentração de gases do efeito estufa na atmosfera (principalmente CO₂, liberado pela queima de combustíveis fósseis e por desmatamento) intensifica o **efeito estufa** — um fenômeno natural e necessário à vida na Terra, mas que, quando intensificado artificialmente, provoca o aumento da temperatura média do planeta, com consequências como derretimento de geleiras, elevação do nível do mar e eventos climáticos extremos.

**Poluição:** contaminação do ar, água ou solo por substâncias nocivas, com origem principalmente industrial, agrícola (uso excessivo de agrotóxicos) e do descarte inadequado de resíduos.

**Desenvolvimento sustentável:** conceito que busca conciliar o crescimento econômico com a preservação ambiental e a justiça social, garantindo que as gerações futuras também tenham acesso aos recursos naturais necessários.

<colapsavel titulo="📌 Efeito estufa não é sempre 'ruim'">
É importante lembrar que o efeito estufa, em si, é um processo natural e essencial: sem ele, a Terra seria fria demais para a vida como conhecemos, porque os gases da atmosfera retêm parte do calor do sol. O problema ambiental atual não é o efeito estufa em si, mas sua INTENSIFICAÇÃO por causa do excesso de gases lançados pela atividade humana.
</colapsavel>

<exercicio-interativo pergunta="Na relação entre abelha e flor, em que a abelha poliniza a flor e se alimenta do néctar, ambas as espécies se beneficiam. Que tipo de relação ecológica é essa?" resposta="mutualismo" dica="É a relação em que as duas espécies envolvidas se beneficiam mutuamente."></exercicio-interativo>

<quiz>
Qual é a função dos decompositores em um ecossistema?
Produzir seu próprio alimento através da fotossíntese
Caçar os consumidores primários
[correta] Decompor matéria orgânica morta, devolvendo nutrientes ao ambiente
Competir por recursos com os produtores
</quiz>

<flashcard frente="Qual a diferença entre comensalismo e mutualismo?" verso="No mutualismo, as duas espécies se beneficiam. No comensalismo, só uma espécie se beneficia e a outra não é afetada (nem ganha, nem perde)."></flashcard>`
        },
        {
            id: 122,
            titulo: "Corpo Humano, Saúde e Doenças",
            descricao: "Verminoses e doenças causadas por bactérias e protozoários mais cobradas na prova.",
            modulo: "Módulo 5: Biologia",
            ordem: 22,
            publicado: true,
            conteudo: `# Doenças Causadas por Bactérias

Bactérias são microrganismos unicelulares, e algumas espécies são capazes de causar doenças infecciosas nos seres humanos.

[TABELA]
Doença|Causada por|Principal forma de prevenção
----|---|---
Tuberculose|Bactéria (Mycobacterium tuberculosis), transmitida pelo ar|Vacinação (BCG) e evitar contato próximo prolongado com pessoas infectadas
Tétano|Bactéria presente no solo e em objetos enferrujados, que entra através de ferimentos|Vacinação e cuidado ao limpar ferimentos
[FIM_TABELA]

# Doenças Causadas por Protozoários

Protozoários são microrganismos unicelulares mais complexos que as bactérias, e algumas espécies também causam doenças importantes no Brasil:

[TABELA]
Doença|Agente causador|Transmissão|Prevenção
----|---|---|---
Malária|Protozoário do gênero Plasmodium|Picada do mosquito Anopheles fêmea infectado|Evitar picadas do mosquito (repelente, mosquiteiro), combate aos criadouros
Doença de Chagas|Protozoário Trypanosoma cruzi|Contato com as fezes do inseto barbeiro, geralmente através de um ferimento na pele durante o sono|Melhoria habitacional (o barbeiro se esconde em frestas de casas de barro/madeira)
Toxoplasmose|Protozoário Toxoplasma gondii|Contato com fezes de gato contaminado, ou ingestão de carne malcozida|Higiene ao manusear caixa de areia de gatos, cozinhar bem a carne
[FIM_TABELA]

# Verminoses (Doenças Causadas por Vermes)

As verminoses são um dos temas mais cobrados de Biologia na ETEC, por sua relevância em saúde pública no Brasil, associada muitas vezes a condições de saneamento básico precário.

[TABELA]
Verminose|Verme causador|Forma de transmissão
----|---|---
Ascaridíase (lombriga)|Ascaris lumbricoides|Ingestão de água ou alimentos contaminados com ovos do verme
Ancilostomose (amarelão)|Ancylostoma / Necator|Penetração de larvas através da pele, geralmente ao andar descalço em solo contaminado
Teníase (solitária)|Taenia solium / Taenia saginata|Ingestão de carne de porco ou boi malcozida, contaminada com larvas do verme
Esquistossomose (barriga d'água)|Schistosoma mansoni|Penetração de larvas na pele durante contato com água contaminada, onde vive um caramujo hospedeiro intermediário
[FIM_TABELA]

💡 Repare no padrão: a maioria dessas doenças está diretamente ligada à falta de saneamento básico (esgoto tratado, água potável) e a hábitos de higiene — por isso, questões de prova costumam associar as verminoses com condições socioeconômicas e infraestrutura urbana, conectando Biologia com Geografia.

# Prevenção Geral

As principais medidas de prevenção para a maioria dessas doenças envolvem: saneamento básico adequado (tratamento de esgoto e de água); hábitos de higiene pessoal (lavar as mãos, usar calçados); cuidado no preparo de alimentos (lavar bem, cozinhar adequadamente carnes); e controle de vetores transmissores (mosquitos, caramujos, insetos).

<colapsavel titulo="📝 Como diferenciar as verminoses na prova">
Preste atenção na FORMA DE TRANSMISSÃO citada na questão: se envolve "andar descalço" e penetração pela pele a partir do solo, é ancilostomose. Se envolve contato com água parada (rios, açudes) e um caramujo, é esquistossomose. Se envolve ingestão de água/alimento contaminado com ovos, é ascaridíase. Se envolve carne malcozida, é teníase.
</colapsavel>

<exercicio-interativo pergunta="Qual verminose é transmitida pela penetração de larvas na pele durante contato com água contaminada, onde vive um caramujo hospedeiro intermediário?" resposta="esquistossomose" dica="Também é conhecida popularmente como 'barriga d'água'."></exercicio-interativo>

<quiz>
Qual doença é transmitida pela picada do mosquito Anopheles fêmea infectado?
Doença de Chagas
Toxoplasmose
[correta] Malária
Tétano
</quiz>

<flashcard frente="Como se transmite a Doença de Chagas?" verso="Pelo contato com as fezes do inseto barbeiro, geralmente através de um ferimento na pele enquanto a pessoa dorme."></flashcard>`
        },
        {
            id: 123,
            titulo: "Características Gerais dos Seres Vivos",
            descricao: "O que define um ser vivo e como se organiza a classificação dos seres vivos em reinos.",
            modulo: "Módulo 5: Biologia",
            ordem: 23,
            publicado: true,
            conteudo: `# O Que Define um Ser Vivo

Apesar da imensa diversidade da vida na Terra, todos os seres vivos compartilham um conjunto de características básicas:

**Organização celular:** todo ser vivo é formado por pelo menos uma célula (organismos unicelulares) ou por muitas células (organismos multicelulares/pluricelulares), sendo a célula a unidade básica da vida.

**Metabolismo:** conjunto de reações químicas que ocorrem dentro do organismo para obter e utilizar energia, permitindo suas funções vitais.

**Reprodução:** capacidade de gerar descendentes, garantindo a continuidade da espécie.

**Resposta a estímulos:** capacidade de reagir a mudanças no ambiente (luz, temperatura, presença de predadores, entre outros).

**Crescimento e desenvolvimento:** capacidade de aumentar de tamanho e de se desenvolver ao longo do tempo.

**Homeostase:** capacidade de manter um equilíbrio interno relativamente estável, mesmo diante de variações do ambiente externo.

# A Classificação em Reinos

Para organizar a enorme diversidade de seres vivos, a Biologia os agrupa em grandes categorias chamadas de **reinos**, de acordo com características compartilhadas:

[TABELA]
Reino|Características principais|Exemplos
----|---|---
Monera|Seres unicelulares, sem núcleo organizado (procariontes)|Bactérias
Protista|Seres em geral unicelulares, com núcleo organizado (eucariontes), mais complexos que as bactérias|Protozoários, algumas algas
Fungi|Seres que se alimentam absorvendo nutrientes do ambiente (não fazem fotossíntese, nem ingerem como os animais)|Cogumelos, fungos de mofo, leveduras
Plantae|Seres multicelulares, capazes de realizar fotossíntese (produzem seu próprio alimento)|Árvores, gramíneas, samambaias
Animalia|Seres multicelulares, que se alimentam de outros seres vivos (ingerem o alimento)|Mamíferos, aves, peixes, insetos
[FIM_TABELA]

# Célula Procarionte x Célula Eucarionte

Uma distinção fundamental na Biologia é entre dois tipos de célula:

**Célula procarionte:** não possui núcleo organizado — o material genético fica disperso no citoplasma. É o tipo de célula presente nos organismos do Reino Monera (bactérias), consideradas estruturalmente mais simples.

**Célula eucarionte:** possui núcleo organizado, delimitado por uma membrana, onde fica o material genético. É o tipo de célula presente em todos os outros reinos (Protista, Fungi, Plantae e Animalia), sendo estruturalmente mais complexa e compartimentada.

💡 Essa diferença entre célula procarionte e eucarionte é uma das distinções mais fundamentais de toda a Biologia, e costuma aparecer tanto em questões diretas quanto embutida em questões sobre classificação dos seres vivos.

<colapsavel titulo="📌 Vírus são seres vivos?">
Essa é uma dúvida clássica: os vírus não são organizados em células (não têm estrutura celular própria) e só conseguem se reproduzir dentro de uma célula hospedeira, "sequestrando" sua maquinaria celular. Por não atenderem a critérios como organização celular e metabolismo próprio, os vírus costumam ser tratados como um caso à parte, fora da classificação tradicional dos cinco reinos - muitos biólogos nem os consideram seres vivos no sentido estrito.
</colapsavel>

<exercicio-interativo pergunta="A qual reino pertencem os seres unicelulares, sem núcleo organizado, como as bactérias?" resposta="monera" dica="É o reino dos organismos procariontes, ou seja, sem núcleo organizado."></exercicio-interativo>

<quiz>
Qual é a principal diferença entre célula procarionte e eucarionte?
Procarionte é multicelular, eucarionte é unicelular
[correta] Procarionte não tem núcleo organizado; eucarionte tem núcleo organizado, delimitado por membrana
Procarionte faz fotossíntese, eucarionte não
Procarionte só existe no reino animal
</quiz>

<flashcard frente="Quais são os cinco reinos da classificação dos seres vivos?" verso="Monera, Protista, Fungi, Plantae e Animalia."></flashcard>`
        },

        // ========================================
        // MÓDULO 6: FÍSICA
        // ========================================
        {
            id: 124,
            titulo: "Grandezas, Vetores e Mecânica",
            descricao: "Grandezas escalares e vetoriais, e as Leis de Newton que explicam o movimento.",
            modulo: "Módulo 6: Física",
            ordem: 24,
            publicado: true,
            conteudo: `# Grandezas Escalares x Vetoriais

Uma **grandeza física** é tudo aquilo que pode ser medido. Elas se dividem em dois tipos:

**Grandezas escalares:** ficam completamente definidas apenas por um número e uma unidade de medida. Exemplos: massa (5 kg), temperatura (25°C), tempo (10 segundos), volume (2 litros).

**Grandezas vetoriais:** além do valor numérico (chamado de módulo ou intensidade), precisam também de uma **direção** e um **sentido** para ficarem completamente definidas. Exemplos: velocidade, aceleração, força, deslocamento.

**Exemplo prático da diferença:** dizer "um carro anda a 60 km/h" descreve uma grandeza escalar (a rapidez, chamada de velocidade escalar). Já dizer "um carro anda a 60 km/h para o norte" descreve uma grandeza vetorial completa (a velocidade vetorial), porque inclui a direção do movimento.

Grandezas vetoriais são representadas por **vetores**: setas que indicam, ao mesmo tempo, o módulo (pelo tamanho da seta), a direção (pela reta em que a seta está desenhada) e o sentido (pra qual lado a seta aponta).

# Movimento Retilíneo Uniforme (MRU)

É o movimento mais simples: ocorre em linha reta, com **velocidade constante** (não varia), ou seja, sem aceleração. A fórmula fundamental relaciona velocidade, distância percorrida e tempo:

**v = d ÷ t** (velocidade = distância dividida pelo tempo)

**Exemplo resolvido:** um carro percorre 180 km em 2 horas, mantendo velocidade constante. Qual sua velocidade? v = 180 ÷ 2 = 90 km/h.

# Movimento Retilíneo Uniformemente Variado (MRUV)

Ocorre quando a velocidade **varia** de forma constante ao longo do tempo — ou seja, existe uma **aceleração constante** (podendo ser positiva, quando o objeto acelera, ou negativa, quando o objeto desacelera/freia).

# As Três Leis de Newton

As Leis de Newton são a base da mecânica clássica, explicando como e por que os objetos se movem (ou permanecem parados):

[TABELA]
Lei|Nome|O que diz
----|---|---
1ª Lei|Lei da Inércia|Um corpo tende a manter seu estado de movimento (parado ou em velocidade constante) a menos que uma força externa atue sobre ele
2ª Lei|Princípio Fundamental da Dinâmica|A força aplicada sobre um corpo é igual à sua massa multiplicada pela aceleração que ela produz: F = m × a
3ª Lei|Ação e Reação|Para toda ação (força) exercida por um corpo sobre outro, existe uma reação de mesma intensidade, mesma direção e sentido oposto
[FIM_TABELA]

**Exemplo da 1ª Lei (Inércia):** quando um ônibus freia bruscamente, os passageiros são "jogados" para frente — não porque uma força os empurra, mas porque o corpo deles tende a continuar em movimento (inércia), enquanto o ônibus já parou.

**Exemplo da 2ª Lei:** quanto maior a massa de um objeto, maior a força necessária para produzir a mesma aceleração. Por isso é mais difícil empurrar um carro do que uma bicicleta, para alcançar a mesma aceleração.

**Exemplo da 3ª Lei:** ao nadar, você empurra a água para trás (ação); a água empurra você para frente com a mesma intensidade (reação), fazendo você avançar.

<colapsavel titulo="📝 Exemplo resolvido: aplicando a 2ª Lei de Newton">
Uma força de 20 N (Newtons) é aplicada sobre um objeto de massa 4 kg. Qual a aceleração produzida? Usando F = m × a, temos 20 = 4 × a, logo a = 20 ÷ 4 = 5 m/s².
</colapsavel>

<exercicio-interativo pergunta="Um ciclista percorre 40 km em 2 horas, em velocidade constante. Qual sua velocidade, em km/h?" resposta="20" dica="Use v = d ÷ t: 40 ÷ 2 = 20 km/h."></exercicio-interativo>

<quiz>
Qual das grandezas abaixo é vetorial (precisa de direção e sentido para ficar completamente definida)?
Massa
Temperatura
[correta] Força
Tempo
</quiz>

<flashcard frente="O que diz a 1ª Lei de Newton (Lei da Inércia)?" verso="Um corpo tende a manter seu estado de movimento (parado ou em velocidade constante) a menos que uma força externa atue sobre ele."></flashcard>`
        },
        {
            id: 125,
            titulo: "Energia e Transformações",
            descricao: "As principais formas de energia e o princípio da conservação de energia.",
            modulo: "Módulo 6: Física",
            ordem: 25,
            publicado: true,
            conteudo: `# O Que é Energia

Energia é a capacidade de realizar trabalho ou de provocar transformações. Ela se manifesta de diversas formas, e uma das ideias mais importantes da Física é que a energia não é criada nem destruída — apenas se **transforma** de um tipo para outro.

# Principais Formas de Energia

[TABELA]
Forma de energia|O que é|Exemplo
----|---|---
Energia cinética|Energia associada ao movimento de um corpo (quanto maior a velocidade e a massa, maior a energia cinética)|Um carro em movimento
Energia potencial|Energia "armazenada", associada à posição ou condição de um corpo (pronta para se transformar em outra forma)|Uma pedra no alto de um penhasco, uma mola comprimida
Energia térmica|Energia associada à agitação das partículas de um corpo, relacionada à temperatura|O calor de uma fogueira
Energia elétrica|Energia associada ao movimento ordenado de cargas elétricas (corrente elétrica)|A energia que alimenta os aparelhos eletrônicos
[FIM_TABELA]

# O Princípio da Conservação de Energia

Esse princípio estabelece que, em um sistema fechado, a energia total permanece constante — ela pode mudar de forma (se transformar), mas a quantidade total não aumenta nem diminui.

**Exemplo clássico: a queda livre de um objeto.** No topo, o objeto tem energia potencial máxima (por causa da altura) e energia cinética nula (está parado). Conforme cai, a energia potencial vai diminuindo (a altura diminui) e se transformando em energia cinética (a velocidade aumenta). No momento em que toca o chão, toda a energia potencial já se transformou em energia cinética.

# Transformações de Energia no Cotidiano

Um exemplo muito cobrado em prova é o funcionamento de uma **usina hidrelétrica**, que envolve uma sequência de transformações de energia:

A água represada, numa altura elevada, tem **energia potencial** (por causa da posição/altura). Ao descer pelas tubulações da usina, essa energia potencial se transforma em **energia cinética** (a água ganha velocidade). Essa água em movimento gira as turbinas da usina, que por sua vez movem geradores, transformando a energia cinética em **energia elétrica**, que é então distribuída para as residências e indústrias.

Outro exemplo comum: um chuveiro elétrico transforma energia elétrica em energia térmica (calor), que aquece a água.

💡 Questões de prova costumam pedir pra você identificar a SEQUÊNCIA de transformações de energia em um processo (como a usina hidrelétrica) — o segredo é pensar etapa por etapa, do início ao fim do processo.

<colapsavel titulo="📝 Exemplo resolvido: identificando a sequência de transformações">
Em uma usina eólica (movida pelo vento), qual é a sequência de transformação de energia? O vento (movimento do ar) já representa energia cinética. Esse movimento gira as pás do gerador eólico, produzindo energia elétrica. Logo, a sequência é: energia cinética (do vento) → energia elétrica.
</colapsavel>

<exercicio-interativo pergunta="Em uma queda livre, no exato momento em que o objeto atinge o solo, toda a energia potencial já se transformou em que tipo de energia?" resposta="energia cinética" dica="É a energia associada ao movimento - e nesse momento o objeto está com sua velocidade máxima."></exercicio-interativo>

<quiz>
Qual é a sequência correta de transformação de energia em uma usina hidrelétrica?
Energia elétrica → energia potencial → energia cinética
[correta] Energia potencial → energia cinética → energia elétrica
Energia térmica → energia cinética → energia potencial
Energia cinética → energia térmica → energia elétrica
</quiz>

<flashcard frente="O que diz o princípio da conservação de energia?" verso="Em um sistema fechado, a energia total permanece constante - ela pode se transformar de um tipo para outro, mas a quantidade total não aumenta nem diminui."></flashcard>`
        },

        // ========================================
        // MÓDULO 7: QUÍMICA
        // ========================================
        {
            id: 126,
            titulo: "Teoria Atômico-Molecular e Tabela Periódica",
            descricao: "A estrutura do átomo e como a tabela periódica organiza os elementos químicos.",
            modulo: "Módulo 7: Química",
            ordem: 26,
            publicado: true,
            conteudo: `# A Estrutura do Átomo

O átomo é a menor unidade que caracteriza um elemento químico, formado por três tipos de partículas fundamentais:

[TABELA]
Partícula|Carga elétrica|Localização
----|---|---
Próton|Positiva|Núcleo do átomo
Nêutron|Neutra (sem carga)|Núcleo do átomo
Elétron|Negativa|Eletrosfera (região ao redor do núcleo)
[FIM_TABELA]

O núcleo do átomo (formado por prótons e nêutrons) concentra praticamente toda a massa do átomo, enquanto os elétrons, muito mais leves, ocupam a eletrosfera ao redor do núcleo, em constante movimento.

# Número Atômico e Número de Massa

**Número atômico (Z):** representa a quantidade de prótons no núcleo de um átomo. É o número atômico que define de qual elemento químico se trata — cada elemento tem um número atômico único e exclusivo (por exemplo, todo átomo com 8 prótons é, necessariamente, um átomo de oxigênio).

**Número de massa (A):** representa a soma do número de prótons e nêutrons no núcleo do átomo (A = Z + número de nêutrons).

Em um átomo neutro (sem carga elétrica), o número de elétrons é igual ao número de prótons.

# A Organização da Tabela Periódica

A tabela periódica organiza todos os elementos químicos conhecidos, em ordem crescente de número atômico. Ela é organizada em linhas e colunas, cada uma com um significado:

**Períodos (linhas horizontais):** indicam o número de camadas eletrônicas (níveis de energia) que os átomos daquele período possuem. A tabela tem 7 períodos.

**Famílias ou grupos (colunas verticais):** reúnem elementos com propriedades químicas semelhantes, porque possuem uma quantidade parecida de elétrons na última camada eletrônica (a camada de valência, responsável pelas ligações químicas).

# Classificação Geral dos Elementos

De forma simplificada, os elementos da tabela periódica se dividem em três grandes categorias:

**Metais:** maioria dos elementos da tabela. Costumam ser bons condutores de calor e eletricidade, sólidos à temperatura ambiente (exceto o mercúrio, que é líquido), maleáveis e com brilho característico.

**Não metais:** geralmente maus condutores de calor e eletricidade, com propriedades físicas bastante variadas.

**Gases nobres:** localizados na última coluna da tabela, são elementos muito estáveis quimicamente, com baixíssima tendência a reagir com outros elementos, por já terem a última camada eletrônica completa.

💡 Uma família bastante cobrada em prova é a dos **halogênios** (coluna ao lado dos gases nobres, incluindo cloro e flúor) e a dos **metais alcalinos** (primeira coluna da tabela, incluindo sódio e potássio), ambos grupos com propriedades químicas bem características.

<colapsavel titulo="📝 Exemplo resolvido: identificando prótons, nêutrons e elétrons">
Um átomo neutro tem número atômico 11 e número de massa 23. Quantos prótons, nêutrons e elétrons ele possui? Prótons = número atômico = 11. Como o átomo é neutro, elétrons = prótons = 11. Nêutrons = número de massa - número atômico = 23 - 11 = 12.
</colapsavel>

<exercicio-interativo pergunta="Um átomo tem 6 prótons no núcleo. Qual é o seu número atômico (Z)?" resposta="6" dica="O número atômico é exatamente igual à quantidade de prótons no núcleo do átomo."></exercicio-interativo>

<quiz>
O que determina a organização dos elementos nas COLUNAS (famílias) da tabela periódica?
A massa atômica de cada elemento
[correta] Elementos com propriedades químicas semelhantes, por terem quantidade parecida de elétrons na última camada
O estado físico do elemento (sólido, líquido ou gasoso)
A ordem alfabética do nome do elemento
</quiz>

<flashcard frente="Qual a diferença entre número atômico e número de massa?" verso="Número atômico (Z) = quantidade de prótons. Número de massa (A) = soma de prótons e nêutrons (A = Z + nêutrons)."></flashcard>`
        },
        {
            id: 127,
            titulo: "Misturas, Soluções e Métodos de Separação",
            descricao: "Misturas homogêneas e heterogêneas, e como separar seus componentes.",
            modulo: "Módulo 7: Química",
            ordem: 27,
            publicado: true,
            conteudo: `# Substância Pura x Mistura

Uma **substância pura** é formada por um único tipo de componente, com propriedades físicas e químicas constantes e bem definidas (como ponto de fusão e ponto de ebulição fixos). Exemplo: água pura, oxigênio puro.

Uma **mistura** é formada por dois ou mais componentes diferentes, misturados sem se combinarem quimicamente. A grande maioria das substâncias que encontramos no dia a dia são, na verdade, misturas.

# Mistura Homogênea x Heterogênea

**Mistura homogênea:** apresenta uma única fase visível, ou seja, é uniforme em toda sua extensão, mesmo observada com auxílio de microscópio comum — os componentes não podem ser distinguidos a olho nu. Exemplo: água com sal totalmente dissolvido, ar atmosférico.

**Mistura heterogênea:** apresenta duas ou mais fases visíveis, ou seja, é possível distinguir os componentes (a olho nu ou com auxílio de instrumentos simples). Exemplo: água com óleo, água com areia, granito.

💡 Uma mistura homogênea também é chamada de **solução**. Numa solução, o componente presente em maior quantidade é chamado de **solvente**, e o componente dissolvido, em menor quantidade, é chamado de **soluto**. Por exemplo, numa solução de água com sal, a água é o solvente e o sal é o soluto.

# Principais Métodos de Separação de Misturas

[TABELA]
Método|Como funciona|Usado para separar
----|---|---
Filtração|Passa a mistura por um filtro, que retém partículas sólidas maiores|Mistura heterogênea sólido-líquido (ex: areia e água)
Decantação|Aproveita a diferença de densidade: o componente mais denso se deposita no fundo com o tempo|Mistura heterogênea de líquidos ou sólido-líquido que não se dissolvem (ex: água e óleo)
Destilação|Aquece a mistura até evaporar o componente de menor ponto de ebulição, depois condensa esse vapor separadamente|Mistura homogênea (ex: separar álcool de água, ou dessalinizar água do mar)
Evaporação|Aquece a mistura até o líquido evaporar completamente, restando apenas o sólido dissolvido|Mistura homogênea sólido-líquido, quando não se quer aproveitar o líquido evaporado (ex: obter sal a partir de água salgada)
Catação|Separa manualmente, "à mão" ou com pinça, os componentes visíveis|Mistura heterogênea de sólidos com partículas grandes e distintas (ex: separar feijão de pedrinhas)
Peneiração|Passa a mistura por uma peneira, que retém partículas maiores que os furos, deixando passar as menores|Mistura heterogênea de sólidos com tamanhos de partícula diferentes (ex: separar areia grossa de areia fina)
[FIM_TABELA]

# Como Escolher o Método Correto numa Questão

O segredo para acertar essas questões é identificar duas coisas: **primeiro**, se a mistura é homogênea ou heterogênea; **segundo**, o estado físico dos componentes (sólido, líquido, gasoso) e as propriedades que os diferenciam (densidade, ponto de ebulição, tamanho de partícula).

**Exemplo resolvido:** como separar uma mistura de água e sal (mistura homogênea, já que o sal está totalmente dissolvido)? Como é uma mistura homogênea, filtração e decantação NÃO funcionam (esses métodos servem para misturas heterogêneas). O método correto é a evaporação (se o objetivo é recuperar apenas o sal) ou a destilação simples (se o objetivo é recuperar também a água, através da condensação do vapor).

<colapsavel titulo="📌 Pegadinha clássica: filtração só serve para misturas heterogêneas">
Um erro comum é achar que filtração serve para separar qualquer mistura. Mas a filtração só funciona quando existe uma FASE SÓLIDA visível e não dissolvida, que o filtro consegue reter. Numa mistura homogênea (como água com sal totalmente dissolvido), não existe essa fase sólida separada para o filtro reter - por isso a filtração não funciona nesse caso.
</colapsavel>

<exercicio-interativo pergunta="Qual método de separação usa a diferença de densidade para separar água e óleo, que não se misturam completamente?" resposta="decantação" dica="É o método em que o componente mais denso se deposita no fundo com o tempo, permitindo separar os dois líquidos."></exercicio-interativo>

<quiz>
Numa solução de água com açúcar totalmente dissolvido, o açúcar é chamado de:
Solvente
Fase heterogênea
[correta] Soluto
Precipitado
</quiz>

<flashcard frente="Qual a diferença entre mistura homogênea e heterogênea?" verso="Homogênea tem uma única fase visível, uniforme (ex: água com sal dissolvido). Heterogênea tem duas ou mais fases visíveis, com componentes distinguíveis (ex: água com óleo)."></flashcard>`
        },
    ]
};
