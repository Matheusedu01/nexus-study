// ========================================
// TRILHA "INGLÊS PARA INICIANTES" — DADOS SEED
// ========================================
// Conteúdo baseado no material didático de inglês básico (cumprimentos,
// alfabeto, verbo to be, artigos, vocabulário essencial, present continuous,
// cognatos e expressões do dia a dia), organizado em módulos progressivos.
//
// Este arquivo só define os dados; quem realmente grava no localStorage é
// a função importarTrilhaIngles() em js/admin.js (botão "📥 Importar Trilha
// de Inglês" na aba Trilhas do admin).

const TRILHA_INGLES_SEED = {
    titulo: "Inglês para Iniciantes",
    descricao: "Aprenda inglês do zero: cumprimentos, verbo to be, artigos, vocabulário essencial, present continuous e expressões do dia a dia.",
    nivel: "Iniciante",
    icone: "📘",
    cor: "#3a86ff",
    tags: ["inglês", "idiomas", "gramática", "vocabulário"],
    duracao: "10 semanas",
    estudos: [
        // ========================================
        // MÓDULO 1: PRIMEIROS PASSOS
        // ========================================
        {
            id: 1,
            titulo: "Cumprimentos em Inglês",
            descricao: "Hi, Hello, Good morning e outras formas de cumprimentar",
            modulo: "Módulo 1: Primeiros Passos",
            ordem: 1,
            publicado: true,
            conteudo: `# Cumprimentos em Inglês (Greetings)

Todo estudo de um novo idioma começa da mesma forma: aprendendo a cumprimentar as pessoas. Essas frases parecem simples, mas são o primeiro contato que temos com quem não conhecemos — por isso merecem atenção especial.

## Cumprimentos informais

A qualquer hora do dia, você pode usar:

<exemplo en="Hi!" pt="Oi!"></exemplo>
<audio-tts texto="Hi!"></audio-tts>

<exemplo en="Hello!" pt="Olá!"></exemplo>
<audio-tts texto="Hello!"></audio-tts>

## Cumprimentos de acordo com o horário

Em inglês, existe um cumprimento diferente para cada período do dia:

[TABELA]
Inglês|Pronúncia|Quando usar
---|---|---
Good morning!|guud mórnin|de manhã
Good afternoon!|guud áfternum|à tarde
Good evening!|guud ívinin|à noite (ao chegar)
Good night!|guud nait|à noite (ao se despedir ou ir dormir)
[FIM_TABELA]

**Atenção:** "Good night" só é usado para se despedir ou desejar boa noite de sono — nunca para cumprimentar alguém que você acabou de encontrar à noite. Nesse caso, o certo é "Good evening!".

## Se despedindo

Para dizer "tchau" ou "até logo", você pode usar:

<exemplo en="Good bye! / Bye! / Bye bye!" pt="Adeus! Tchau!"></exemplo>

<exemplo en="See you later!" pt="Até logo!"></exemplo>

<exemplo en="So long!" pt="Até mais!"></exemplo>

## Praticando

<quiz>
Como você cumprimenta alguém às 8 da manhã?
Good night!
[correta]Good morning!
Good evening!
</quiz>

<exercicio-interativo pergunta="Complete: Good ______! (usado à tarde)" resposta="afternoon" dica="Pense em 'depois do meio-dia' em inglês."></exercicio-interativo>

<exercicio-interativo pergunta="Como se diz 'tchau' de forma informal em inglês?" resposta="bye" dica="É a forma curta de 'good bye'."></exercicio-interativo>`
        },
        {
            id: 2,
            titulo: "Se Apresentando em Inglês",
            descricao: "My name is, What's your name, How are you e Nice to meet you",
            modulo: "Módulo 1: Primeiros Passos",
            ordem: 2,
            publicado: true,
            conteudo: `# Se Apresentando em Inglês (Introducing Yourself)

Depois de cumprimentar alguém, o próximo passo natural é se apresentar. Vamos aprender as frases mais usadas para dizer seu nome e perguntar como a outra pessoa está.

## Dizendo o seu nome

Existem duas formas comuns de dizer quem você é:

<exemplo en="I'm Bob." pt="Eu sou o Bob."></exemplo>
<audio-tts texto="I am Bob."></audio-tts>

<exemplo en="My name is Tom." pt="Meu nome é Tom."></exemplo>
<audio-tts texto="My name is Tom."></audio-tts>

**Nota:** *I'm* é a forma contraída de *I am* (eu sou/estou). Em inglês falado, é muito mais comum usar a forma contraída.

## Perguntando o nome de alguém

<exemplo en="What's your name?" pt="Qual é o seu nome?"></exemplo>
<audio-tts texto="What is your name?"></audio-tts>

## Perguntando como a pessoa está

<exemplo en="How are you?" pt="Como você está?"></exemplo>
<audio-tts texto="How are you?"></audio-tts>

Se você estiver bem, a resposta mais comum é:

<exemplo en="I'm fine, thanks. And you?" pt="Estou bem, obrigado(a). E você?"></exemplo>

## Ao conhecer alguém

Quando duas pessoas se conhecem pela primeira vez, é comum dizer:

<exemplo en="Nice to meet you!" pt="Prazer em conhecê-lo(a)!"></exemplo>
<audio-tts texto="Nice to meet you!"></audio-tts>

A resposta educada é repetir a expressão e acrescentar *too* (também):

<exemplo en="Nice to meet you too!" pt="O prazer é meu!"></exemplo>

## Diálogo completo

Veja como essas frases aparecem juntas em uma conversa real entre Bob e Tom:

\`\`\`
Bob: Hi! I'm Bob.
Tom: Hello, Bob. My name is Tom.
Bob: How are you, Tom?
Tom: I'm fine, thanks. And you?
Bob: I'm fine too. Nice to meet you!
Tom: Nice to meet you too!
\`\`\`

## Praticando

<quiz>
Qual é a resposta educada quando alguém diz "Nice to meet you!"?
Good bye!
How are you?
[correta]Nice to meet you too!
</quiz>

<exercicio-interativo pergunta="Complete: My ______ is Ana. (meu nome é Ana)" resposta="name" dica="A palavra que significa 'nome' em inglês."></exercicio-interativo>

<exercicio-interativo pergunta="Traduza: 'Como você está?'" resposta="How are you?" dica="Começa com a palavra 'How'."></exercicio-interativo>`
        },
        {
            id: 3,
            titulo: "Praticando as Apresentações",
            descricao: "Revisão prática do Módulo 1 com diálogo e exercícios",
            modulo: "Módulo 1: Primeiros Passos",
            ordem: 3,
            publicado: true,
            conteudo: `# Praticando as Apresentações

Chegou a hora de juntar tudo que você aprendeu no Módulo 1: cumprimentos e apresentações. Vamos revisar com um diálogo novo e uma bateria de exercícios.

## Diálogo: Peter e Paul se conhecem

\`\`\`
Peter: Hi! How are you?
Paul: Hi! I'm fine. And you?
Peter: I'm fine too. By the way, my name is Peter. What is your name?
Paul: My name is Paul.
Peter: Nice to meet you, Paul.
Paul: Nice to meet you too, Peter.
\`\`\`

**Nota:** *By the way* significa "a propósito" — é uma expressão muito usada para mudar de assunto dentro de uma conversa, de forma natural.

## Revisão rápida

[TABELA]
Português|Inglês
---|---
Oi! / Olá!|Hi! / Hello!
Bom dia!|Good morning!
Boa tarde!|Good afternoon!
Boa noite! (chegando)|Good evening!
Boa noite! (se despedindo)|Good night!
Como você está?|How are you?
Estou bem, obrigado(a)|I'm fine, thanks
Meu nome é...|My name is...
Qual é o seu nome?|What's your name?
Prazer em conhecê-lo(a)|Nice to meet you
Tchau! / Adeus!|Bye! / Good bye!
[FIM_TABELA]

## Praticando de verdade

<flashcard frente="Como se diz 'Prazer em conhecê-lo' em inglês?" verso="Nice to meet you"></flashcard>

<flashcard frente="Qual a forma contraída de 'I am'?" verso="I'm"></flashcard>

<flashcard frente="Como se pergunta o nome de alguém em inglês?" verso="What's your name?"></flashcard>

<quiz>
Qual expressão você NUNCA deve usar para cumprimentar alguém que você acabou de encontrar de noite?
Good evening!
Hi!
[correta]Good night!
</quiz>

<exercicio-interativo pergunta="Complete o diálogo: 'Hi! ___ are you?'" resposta="How" dica="É a pergunta que significa 'como'."></exercicio-interativo>

<exercicio-interativo pergunta="Traduza: 'A propósito'" resposta="By the way" dica="Três palavras, começa com 'By'."></exercicio-interativo>

Parabéns por concluir o primeiro módulo! Agora você já consegue cumprimentar, se apresentar e perguntar o nome de alguém em inglês. No próximo módulo, vamos aprender o alfabeto e os números.`
        },

        // ========================================
        // MÓDULO 2: ALFABETO E NÚMEROS
        // ========================================
        {
            id: 4,
            titulo: "O Alfabeto em Inglês",
            descricao: "As 26 letras e suas pronúncias, incluindo K, W e Y",
            modulo: "Módulo 2: Alfabeto e Números",
            ordem: 4,
            publicado: true,
            conteudo: `# O Alfabeto em Inglês (The English Alphabet)

O alfabeto inglês tem 26 letras. Se você comparar com o alfabeto que aprendeu na escola em português (que tradicionalmente tinha 23 letras antes da reforma ortográfica), vai notar que faltavam três: **K, W e Y**. Hoje elas também fazem parte do nosso alfabeto, mas em inglês são extremamente comuns (aparecem em palavras como *okay*, *website* e *yellow*).

## A pronúncia de cada letra

[TABELA]
Letra|Pronúncia|Letra|Pronúncia
---|---|---|---
A|ei|N|en
B|bi|O|ou
C|ci|P|pi
D|di|Q|quiu
E|i|R|ar
F|éf|S|és
G|dji|T|ti
H|eitch|U|iu
I|ai|V|vi
J|djei|W|dábliu
K|quei|X|éks
L|él|Y|uai
M|ém|Z|zi
[FIM_TABELA]

## Para que serve saber o alfabeto?

Além de ajudar na pronúncia de palavras novas, o alfabeto é essencial para **soletrar** (spell) nomes, siglas e palavras difíceis — algo muito comum em ligações telefônicas, cadastros e formulários em inglês.

<exemplo en="How do you spell it?" pt="Como se soletra isso?"></exemplo>
<audio-tts texto="How do you spell it?"></audio-tts>

Por exemplo, para soletrar a sigla "PUC", você diria: **P** (pi), **U** (iu), **C** (ci).

## Praticando

<flashcard frente="Quais 3 letras o alfabeto inglês tem a mais do que o alfabeto tradicional em português?" verso="K, W e Y"></flashcard>

<flashcard frente="Como se pronuncia a letra 'H' em inglês?" verso="eitch"></flashcard>

<exercicio-interativo pergunta="Como se diz 'Como se soletra isso?' em inglês?" resposta="How do you spell it?" dica="Começa com 'How do you...'"></exercicio-interativo>

<quiz>
Qual destas letras NÃO existia no alfabeto tradicional em português?
A
[correta]W
E
</quiz>`
        },
        {
            id: 5,
            titulo: "Números de 0 a 1000",
            descricao: "Cardinais em inglês: unidades, dezenas, centenas e milhares",
            modulo: "Módulo 2: Alfabeto e Números",
            ordem: 5,
            publicado: true,
            conteudo: `# Números em Inglês (Numbers)

Números estão em todo lugar: telefones, preços, endereços, idades. Vamos aprender a contar em inglês, do zero até o milhar.

## De 0 a 10

[TABELA]
Número|Inglês
---|---
0|zero
1|one
2|two
3|three
4|four
5|five
6|six
7|seven
8|eight
9|nine
10|ten
[FIM_TABELA]

<audio-tts texto="zero, one, two, three, four, five, six, seven, eight, nine, ten"></audio-tts>

## De 11 a 20

[TABELA]
Número|Inglês
---|---
11|eleven
12|twelve
13|thirteen
14|fourteen
15|fifteen
16|sixteen
17|seventeen
18|eighteen
19|nineteen
20|twenty
[FIM_TABELA]

**Dica:** repare que a partir do 13, quase todos os números terminam em *-teen* (treze a dezenove). Já as dezenas cheias (20, 30, 40...) terminam em *-ty*.

## Dezenas

<exemplo en="twenty (20), thirty (30), forty (40), fifty (50)" pt="vinte, trinta, quarenta, cinquenta"></exemplo>

Para formar números como 21, 32, 45, basta juntar a dezena com a unidade:

<exemplo en="twenty-one (21), thirty-two (32), forty-five (45)" pt="vinte e um, trinta e dois, quarenta e cinco"></exemplo>

## Centenas e milhares

Para centenas, usa-se a palavra **hundred** depois do número:

<exemplo en="one hundred (100), two hundred (200), three hundred (300)" pt="cem, duzentos, trezentos"></exemplo>

Para milhares, o mesmo princípio vale com a palavra **thousand**:

<exemplo en="one thousand (1,000), two thousand (2,000)" pt="mil, dois mil"></exemplo>

## Praticando

<flashcard frente="Como se diz 15 em inglês?" verso="fifteen"></flashcard>

<flashcard frente="Como se diz 'cem' em inglês?" verso="one hundred"></flashcard>

<exercicio-interativo pergunta="Escreva por extenso, em inglês: 2 + 3 = 5" resposta="five" dica="Apenas o resultado da conta."></exercicio-interativo>

<exercicio-interativo pergunta="Como se diz 'mil' em inglês?" resposta="one thousand" dica="Duas palavras."></exercicio-interativo>

<quiz>
Qual é a forma correta do número 21 em inglês?
twentyone
[correta]twenty-one
two-one
</quiz>`
        },

        // ========================================
        // MÓDULO 3: O VERBO TO BE
        // ========================================
        {
            id: 6,
            titulo: "Pronomes Pessoais",
            descricao: "I, you, he, she, it, we, they — e quando usar cada um",
            modulo: "Módulo 3: O Verbo To Be",
            ordem: 6,
            publicado: true,
            conteudo: `# Pronomes Pessoais (Personal Pronouns)

Antes de aprender o verbo mais importante do inglês (**to be**), precisamos conhecer os pronomes pessoais — as palavras que substituem os nomes de pessoas, coisas e animais.

## A tabela completa

[TABELA]
Inglês|Português|Quando usar
---|---|---
I|eu|quem fala
You|você / tu|com quem se fala
He|ele|pessoa do sexo masculino
She|ela|pessoa do sexo feminino
It|ele/ela|coisas e animais
We|nós|um grupo que inclui quem fala
You|vocês|um grupo com quem se fala
They|eles/elas|um grupo de quem se fala
[FIM_TABELA]

## Observações importantes

- **I** (eu) é sempre escrito em maiúsculo, não importa onde apareça na frase.
- **You** serve tanto para "você" quanto para "vocês" — o inglês não distingue singular e plural nesse pronome.
- **It** é usado exclusivamente para coisas e animais (nunca para pessoas).

## Substituindo nomes por pronomes

Veja como um nome próprio é substituído pelo pronome correspondente:

<exemplo en="Paul is a policeman. → He is a policeman." pt="Paul é policial. → Ele é policial."></exemplo>

<exemplo en="Sheila is a secretary. → She is a secretary." pt="Sheila é secretária. → Ela é secretária."></exemplo>

<exemplo en="Bill and I are journalists. → We are journalists." pt="Bill e eu somos jornalistas. → Nós somos jornalistas."></exemplo>

<exemplo en="Gil and John are soldiers. → They are soldiers." pt="Gil e John são soldados. → Eles são soldados."></exemplo>

## Praticando

<exercicio-interativo pergunta="Qual pronome substitui 'Mary' (uma mulher)?" resposta="She" dica="Pronome usado para pessoas do sexo feminino."></exercicio-interativo>

<exercicio-interativo pergunta="Qual pronome substitui 'my dog' (meu cachorro)?" resposta="It" dica="Pronome usado para coisas e animais."></exercicio-interativo>

<exercicio-interativo pergunta="Qual pronome substitui 'Carol and I'?" resposta="We" dica="Inclui quem está falando."></exercicio-interativo>

<quiz>
Qual pronome é usado para um grupo de homens e mulheres (de quem se fala)?
He
You
[correta]They
</quiz>`
        },
        {
            id: 7,
            titulo: "Verbo To Be — Afirmativa",
            descricao: "Am, is, are: o verbo mais importante do inglês",
            modulo: "Módulo 3: O Verbo To Be",
            ordem: 7,
            publicado: true,
            conteudo: `# O Verbo To Be — Forma Afirmativa

O verbo **to be** corresponde, em português, aos verbos **ser** e **estar**. É o verbo mais usado do inglês, e por isso merece toda a sua atenção.

## Conjugação no presente

[TABELA]
Pronome|To Be|Exemplo|Tradução
---|---|---|---
I|am|I am a teacher.|Eu sou professor(a).
You|are|You are a student.|Você é estudante.
He|is|He is my friend.|Ele é meu amigo.
She|is|She is happy.|Ela está feliz.
It|is|It is a house.|Isto é uma casa.
We|are|We are students.|Nós somos estudantes.
You|are|You are doctors.|Vocês são médicos.
They|are|They are my parents.|Eles são meus pais.
[FIM_TABELA]

## Formas contraídas

No inglês falado e escrito informalmente, é muito comum contrair o pronome com o verbo to be:

[TABELA]
Forma completa|Forma contraída
---|---
I am|I'm
You are|You're
He is|He's
She is|She's
It is|It's
We are|We're
They are|They're
[FIM_TABELA]

<exemplo en="I'm a teenager." pt="Eu sou um(a) adolescente."></exemplo>
<exemplo en="We're best friends." pt="Nós somos melhores amigos."></exemplo>

## Usos do verbo to be

O to be é usado para:

- Descrever e identificar pessoas e coisas: *This is a lion.* (Este é um leão.)
- Falar sobre idade: *Helen is 4 years old.* (Helen tem 4 anos.)
- Falar sobre o clima: *It is raining.* (Está chovendo.)
- Dizer de onde alguém é: *I am from Brazil.* (Eu sou do Brasil.)

## Praticando

<exercicio-interativo pergunta="Complete: My mother ___ happy. (usar am, is ou are)" resposta="is" dica="'Mother' é ele/ela — terceira pessoa do singular."></exercicio-interativo>

<exercicio-interativo pergunta="Complete: I ___ a student." resposta="am" dica="Pronome 'I' sempre usa essa forma do verbo."></exercicio-interativo>

<exercicio-interativo pergunta="Complete: They ___ my parents." resposta="are" dica="Pronome no plural."></exercicio-interativo>

<quiz>
Qual é a forma contraída de "She is"?
She're
[correta]She's
Shes
</quiz>`
        },
        {
            id: 8,
            titulo: "Verbo To Be — Negativa e Interrogativa",
            descricao: "Como negar e fazer perguntas com o verbo to be",
            modulo: "Módulo 3: O Verbo To Be",
            ordem: 8,
            publicado: true,
            conteudo: `# O Verbo To Be — Negativa e Interrogativa

Agora que você já sabe afirmar com o verbo to be, vamos aprender a negar e a perguntar.

## Forma negativa

Para negar, basta acrescentar **not** logo depois do verbo to be.

[TABELA]
Afirmativa|Negativa|Tradução
---|---|---
I am|I am not|Eu não sou/estou
You are|You are not|Você não é/está
He is|He is not|Ele não é/está
She is|She is not|Ela não é/está
It is|It is not|Não é
We are|We are not|Nós não somos/estamos
They are|They are not|Eles não são/estão
[FIM_TABELA]

Também existem formas contraídas para a negativa:

<exemplo en="I'm not tall." pt="Eu não sou alta."></exemplo>
<exemplo en="This isn't a lion." pt="Isso não é um leão."></exemplo>
<exemplo en="We aren't friends." pt="Nós não somos amigos."></exemplo>

**Atenção:** "am not" não tem uma contração curta amplamente usada (não existe "amn't" no inglês padrão) — por isso "I'm not" é a forma preferida.

## Forma interrogativa

Para fazer uma pergunta com o verbo to be, basta **inverter a posição**: o verbo to be vem *antes* do sujeito.

[TABELA]
Afirmativa|Pergunta|Tradução
---|---|---
I am tall.|Am I tall?|Eu sou alto?
You are American.|Are you American?|Você é americano?
She is Lisa.|Is she Lisa?|Ela é a Lisa?
He is your brother.|Is he your brother?|Ele é seu irmão?
[FIM_TABELA]

Também é possível combinar com uma palavra interrogativa, como *where* (onde):

<exemplo en="Where are you?" pt="Onde você está?"></exemplo>

## Praticando

<exercicio-interativo pergunta="Transforme em negativa: 'I am fine.'" resposta="I am not fine." dica="Acrescente 'not' depois do verbo."></exercicio-interativo>

<exercicio-interativo pergunta="Transforme em pergunta: 'You are ready.'" resposta="Are you ready?" dica="Inverta a ordem: verbo antes do sujeito."></exercicio-interativo>

<quiz>
Qual é a forma correta de perguntar "Ele é seu irmão?"
He is your brother?
[correta]Is he your brother?
Is your brother he?
</quiz>`
        },
        {
            id: 9,
            titulo: "Verbo To Be no Passado",
            descricao: "Was e were: o passado de am, is e are",
            modulo: "Módulo 3: O Verbo To Be",
            ordem: 9,
            publicado: true,
            conteudo: `# O Verbo To Be no Passado

O passado do verbo to be é bem simples: basta lembrar de uma única regra.

## A regra de ouro

**am** e **is** viram **was** no passado. **are** vira **were**.

[TABELA]
Pronome|Presente|Passado
---|---|---
I|am|was
You|are|were
He / She / It|is|was
We|are|were
You (plural)|are|were
They|are|were
[FIM_TABELA]

## Exemplos

<exemplo en="I was a teacher." pt="Eu era/fui professor(a)."></exemplo>

<exemplo en="You were happy." pt="Você estava feliz."></exemplo>

<exemplo en="He was my friend." pt="Ele era meu amigo."></exemplo>

<exemplo en="We were students." pt="Nós éramos/fomos estudantes."></exemplo>

**Curiosidade:** para dizer a idade que você tinha no passado, também se usa was/were — mesmo que em português a gente use "tinha":

<exemplo en="I was 25 years old at that time." pt="Eu tinha 25 anos naquela época."></exemplo>

## Negativa e interrogativa no passado

Funciona exatamente como no presente, só trocando o verbo:

<exemplo en="I was not there. / I wasn't there." pt="Eu não estava lá."></exemplo>

<exemplo en="Were you happy?" pt="Você estava feliz?"></exemplo>

## Praticando

<exercicio-interativo pergunta="Complete: I ___ a teacher. (passado)" resposta="was" dica="Passado de 'am'."></exercicio-interativo>

<exercicio-interativo pergunta="Complete: We ___ students. (passado)" resposta="were" dica="Passado de 'are'."></exercicio-interativo>

<flashcard frente="Qual é o passado de 'is'?" verso="was"></flashcard>

<flashcard frente="Qual é o passado de 'are'?" verso="were"></flashcard>

<quiz>
Qual é o passado correto de "She is happy"?
She were happy.
[correta]She was happy.
She was happy?
</quiz>`
        },

        // ========================================
        // MÓDULO 4: ARTIGOS E PRONOMES DEMONSTRATIVOS
        // ========================================
        {
            id: 10,
            titulo: "Artigos A, An e The",
            descricao: "Quando usar cada artigo em inglês",
            modulo: "Módulo 4: Artigos e Demonstrativos",
            ordem: 10,
            publicado: true,
            conteudo: `# Artigos em Inglês (Articles)

Em inglês existem dois tipos de artigo: o **definido** (the) e o **indefinido** (a / an). Vamos entender quando usar cada um.

## The — artigo definido

**The** significa "o", "a", "os" ou "as" — funciona tanto no singular quanto no plural, e não muda de forma nunca.

<exemplo en="The boy" pt="O menino"></exemplo>
<exemplo en="The girls" pt="As meninas"></exemplo>

## A — artigo indefinido (antes de consoante)

**A** significa "um" ou "uma", e é usado no singular diante de palavras que começam com **som de consoante**.

<exemplo en="A boy" pt="Um menino"></exemplo>
<exemplo en="A girl" pt="Uma menina"></exemplo>

## An — artigo indefinido (antes de vogal)

**An** também significa "um" ou "uma", mas é usado diante de palavras que começam com **som de vogal** (a, e, i, o, u) — ou com a letra H quando ela não é pronunciada.

<exemplo en="An apple" pt="Uma maçã"></exemplo>
<exemplo en="An hour ago" pt="Uma hora atrás"></exemplo>

**Atenção:** o que importa é o **som**, não a letra escrita. Por isso "an hour" usa "an" (o H é mudo), mas "a house" usa "a" (o H é pronunciado).

## Sem artigo no plural

Os artigos **a** e **an** não existem no plural — eles simplesmente desaparecem:

<exemplo en="This is a pen. → These are pens." pt="Isto é uma caneta. → Estas são canetas."></exemplo>

## Praticando

<exercicio-interativo pergunta="Complete: This is ___ apple. (a ou an)" resposta="an" dica="Apple começa com som de vogal."></exercicio-interativo>

<exercicio-interativo pergunta="Complete: This is ___ dog. (a ou an)" resposta="a" dica="Dog começa com som de consoante."></exercicio-interativo>

<exercicio-interativo pergunta="Complete: ___ boys are good. (artigo definido)" resposta="The" dica="Artigo que serve tanto no singular quanto no plural."></exercicio-interativo>

<quiz>
Qual artigo é usado antes de "orange" (laranja)?
a
[correta]an
the
</quiz>`
        },
        {
            id: 11,
            titulo: "This, That, These, Those",
            descricao: "Pronomes demonstrativos no singular e no plural",
            modulo: "Módulo 4: Artigos e Demonstrativos",
            ordem: 11,
            publicado: true,
            conteudo: `# Pronomes Demonstrativos (Demonstrative Pronouns)

Esses pronomes indicam se algo está **perto** ou **longe** de quem fala, e mudam de forma no plural.

## No singular: this e that

**This** (este/esta/isto) é usado para algo perto de quem fala.

<exemplo en="This is my book." pt="Este é o meu livro."></exemplo>

**That** (aquele/aquela/aquilo) é usado para algo mais longe.

<exemplo en="That is my mother, in the garden." pt="Aquela é minha mãe, no jardim."></exemplo>

## No plural: these e those

[TABELA]
Singular|Plural
---|---
this (este/esta)|these (estes/estas)
that (aquele/aquela)|those (aqueles/aquelas)
[FIM_TABELA]

<exemplo en="This is a flower. → These are flowers." pt="Esta é uma flor. → Estas são flores."></exemplo>

<exemplo en="That is a lion. → Those are lions." pt="Aquele é um leão. → Aqueles são leões."></exemplo>

## Perguntando "o que é isto?"

<exemplo en="What is this? — This is a car." pt="O que é isto? — Isto é um carro."></exemplo>

<exemplo en="What are these? — These are pictures." pt="O que são estas coisas? — Estas coisas são figuras."></exemplo>

## Plural dos substantivos

Repare que, ao passar para o plural, o substantivo também ganha um **-s** no final (assim como o pronome demonstrativo muda):

<exemplo en="boy → boys, car → cars, book → books" pt="menino → meninos, carro → carros, livro → livros"></exemplo>

## Praticando

<exercicio-interativo pergunta="Complete no plural: 'This is a dog.' → '___ are dogs.'" resposta="These" dica="Plural de 'this'."></exercicio-interativo>

<exercicio-interativo pergunta="Complete no plural: 'That is a tree.' → '___ are trees.'" resposta="Those" dica="Plural de 'that'."></exercicio-interativo>

<flashcard frente="Qual é o plural de 'this'?" verso="these"></flashcard>

<flashcard frente="Qual é o plural de 'that'?" verso="those"></flashcard>

<quiz>
Você aponta para algo bem longe e pergunta o que é. Qual pronome usar?
This
[correta]That
These
</quiz>`
        },

        // ========================================
        // MÓDULO 5: VOCABULÁRIO ESSENCIAL
        // ========================================
        {
            id: 12,
            titulo: "Família (Family)",
            descricao: "Vocabulário sobre os membros da família",
            modulo: "Módulo 5: Vocabulário Essencial",
            ordem: 12,
            publicado: true,
            conteudo: `# Vocabulário: Família (Family)

Vamos aprender os nomes dos membros da família — um dos primeiros vocabulários que qualquer pessoa aprende em um novo idioma.

## Membros da família

[TABELA]
Inglês|Português
---|---
father|pai
mother|mãe
parents|pais (pai e mãe juntos)
brother|irmão
sister|irmã
son|filho
daughter|filha
grandfather|avô
grandmother|avó
grandson|neto
granddaughter|neta
aunt|tia
uncle|tio
cousin|primo(a)
[FIM_TABELA]

## Cuidado com o falso cognato!

A palavra **parents** parece com "parentes" em português, mas na verdade significa **pais** (pai e mãe). Isso é o que chamamos de **falso cognato** — palavras parecidas na escrita, mas com significados diferentes. Vamos estudar isso com mais detalhes no Módulo 7.

## Formas carinhosas

[TABELA]
Inglês|Português
---|---
Dad / Daddy|papai / paizinho
Mom / Mommy|mamãe / mãezinha
Grandpa|vovô
Grandma|vovó
[FIM_TABELA]

## Um exemplo de apresentação de família

<exemplo en="Peter is my father. Mary is my mother. Peter and Mary are my parents." pt="Peter é meu pai. Mary é minha mãe. Peter e Mary são meus pais."></exemplo>

<exemplo en="Carol is my sister and Mike is my brother." pt="Carol é minha irmã e Mike é meu irmão."></exemplo>

## Praticando

<exercicio-interativo pergunta="Como se diz 'irmã' em inglês?" resposta="sister" dica="Rima com 'mister'."></exercicio-interativo>

<exercicio-interativo pergunta="Como se diz 'avô' em inglês?" resposta="grandfather" dica="Junta a palavra 'grand' com 'father'."></exercicio-interativo>

<exercicio-interativo pergunta="'Parents' em inglês significa o quê em português?" resposta="pais" dica="É um falso cognato — não significa 'parentes'!"></exercicio-interativo>

<quiz>
O que significa "parents" em inglês?
parentes
[correta]pais (pai e mãe)
primos
</quiz>`
        },
        {
            id: 13,
            titulo: "Cores e Adjetivos",
            descricao: "As cores em inglês e a regra dos adjetivos invariáveis",
            modulo: "Módulo 5: Vocabulário Essencial",
            ordem: 13,
            publicado: true,
            conteudo: `# Cores em Inglês (Colors)

## Lista de cores

[TABELA]
Inglês|Português
---|---
red|vermelho
blue|azul
green|verde
yellow|amarelo
white|branco
black|preto
gray|cinza
orange|laranja
pink|rosa
purple|roxo/lilás
brown|marrom
[FIM_TABELA]

## Tons claros e escuros

Para dizer que uma cor é **clara**, acrescente a palavra **light** antes dela. Para uma cor **escura**, use **dark**.

<exemplo en="light blue, dark blue" pt="azul claro, azul escuro"></exemplo>

## A grande regra dos adjetivos em inglês

Cor é um tipo de **adjetivo** (palavra que descreve um substantivo). E os adjetivos em inglês têm duas regras muito importantes:

### 1. O adjetivo nunca muda de forma

Diferente do português, os adjetivos em inglês são **invariáveis**: não têm plural, nem feminino/masculino.

<exemplo en="Good girl, good girls, good boy, good boys" pt="Boa menina, boas meninas, bom menino, bons meninos"></exemplo>

Repare que a palavra "good" continua exatamente igual em todos os casos — quem muda é apenas o substantivo (girl/girls, boy/boys).

### 2. O adjetivo vem antes do substantivo

Em português, dizemos "pássaro azul" (substantivo + adjetivo). Em inglês, a ordem é invertida:

<exemplo en="Blue bird" pt="Pássaro azul (literalmente: azul pássaro)"></exemplo>

<exemplo en="Red roses" pt="Rosas vermelhas (literalmente: vermelhas rosas)"></exemplo>

## Praticando

<exercicio-interativo pergunta="Como se diz 'a maçã verde' em inglês?" resposta="the green apple" dica="Lembre-se: o adjetivo vem antes do substantivo."></exercicio-interativo>

<exercicio-interativo pergunta="Complete: What ___ are these shoes? (pergunta sobre cor)" resposta="color" dica="A palavra que significa 'cor'."></exercicio-interativo>

<flashcard frente="Como se diz 'azul escuro' em inglês?" verso="dark blue"></flashcard>

<quiz>
Qual é a ordem correta em inglês para dizer "casa branca"?
house white
[correta]white house
the house white
</quiz>`
        },
        {
            id: 14,
            titulo: "Dias da Semana e Meses do Ano",
            descricao: "Vocabulário de tempo: dias, meses e horários",
            modulo: "Módulo 5: Vocabulário Essencial",
            ordem: 14,
            publicado: true,
            conteudo: `# Dias da Semana e Meses do Ano

## Dias da semana (Days of the Week)

[TABELA]
Português|Inglês|Abreviação
---|---|---
domingo|Sunday|Sun.
segunda-feira|Monday|Mon.
terça-feira|Tuesday|Tue.
quarta-feira|Wednesday|Wed.
quinta-feira|Thursday|Thu.
sexta-feira|Friday|Fri.
sábado|Saturday|Sat.
[FIM_TABELA]

**Atenção:** em inglês, os dias da semana são **sempre escritos com letra maiúscula** — diferente do português.

## Meses do ano (Months of the Year)

[TABELA]
Português|Inglês
---|---
janeiro|January
fevereiro|February
março|March
abril|April
maio|May
junho|June
julho|July
agosto|August
setembro|September
outubro|October
novembro|November
dezembro|December
[FIM_TABELA]

Assim como os dias da semana, os meses também são escritos com letra maiúscula em inglês.

## Dizendo as horas

A forma mais simples é dizer a hora seguida dos minutos:

<exemplo en="It's three thirty-five. (3:35)" pt="São três e trinta e cinco."></exemplo>

Para hora exata (sem minutos), usa-se a expressão **o'clock**:

<exemplo en="It's seven o'clock. (7:00)" pt="São sete horas."></exemplo>

Para meio-dia e meia-noite, existem palavras específicas:

<exemplo en="noon / midday (meio-dia), midnight (meia-noite)" pt="meio-dia, meia-noite"></exemplo>

## Praticando

<exercicio-interativo pergunta="Como se escreve 'sexta-feira' em inglês (com maiúscula)?" resposta="Friday" dica="Começa com F maiúsculo."></exercicio-interativo>

<exercicio-interativo pergunta="Como se diz 'meia-noite' em inglês?" resposta="midnight" dica="Junta 'mid' (meio) com 'night' (noite)."></exercicio-interativo>

<flashcard frente="Como se diz 'dezembro' em inglês?" verso="December"></flashcard>

<quiz>
Como os dias da semana são escritos em inglês?
Sempre com letra minúscula
[correta]Sempre com letra maiúscula
Depende da frase
</quiz>`
        },
        {
            id: 15,
            titulo: "Animais e Alimentos",
            descricao: "Vocabulário essencial de animais e comidas",
            modulo: "Módulo 5: Vocabulário Essencial",
            ordem: 15,
            publicado: true,
            conteudo: `# Vocabulário: Animais e Alimentos

## Animais (Animals)

[TABELA]
Inglês|Português
---|---
dog|cachorro
cat|gato
cow|vaca
horse|cavalo
rabbit|coelho
sheep|ovelha
lion|leão
tiger|tigre
elephant|elefante
fox|raposa
frog|sapo
snake|cobra
bear|urso
butterfly|borboleta
ant|formiga
shark|tubarão
[FIM_TABELA]

## Alimentos (Food)

[TABELA]
Inglês|Português
---|---
bread|pão
rice|arroz
bean|feijão
milk|leite
cheese|queijo
egg|ovo
ice cream|sorvete
apple|maçã
orange|laranja
banana|banana
grape|uva
pineapple|abacaxi
strawberry|morango
avocado|abacate
[FIM_TABELA]

## Praticando com frases

<exemplo en="This is a dog. That is a cat." pt="Este é um cachorro. Aquele é um gato."></exemplo>

<exemplo en="I like to eat rice and beans." pt="Eu gosto de comer arroz e feijão."></exemplo>

## Praticando

<exercicio-interativo pergunta="Como se diz 'cachorro' em inglês?" resposta="dog" dica="Três letras."></exercicio-interativo>

<exercicio-interativo pergunta="Como se diz 'maçã' em inglês?" resposta="apple" dica="Começa com 'a'."></exercicio-interativo>

<flashcard frente="Como se diz 'morango' em inglês?" verso="strawberry"></flashcard>

<flashcard frente="Como se diz 'leão' em inglês?" verso="lion"></flashcard>

<quiz>
Qual palavra significa "queijo" em inglês?
cheese
milk
[correta]cheese
</quiz>`
        },
        {
            id: 16,
            titulo: "Profissões",
            descricao: "Vocabulário de profissões em inglês",
            modulo: "Módulo 5: Vocabulário Essencial",
            ordem: 16,
            publicado: true,
            conteudo: `# Vocabulário: Profissões (Professions)

## Lista de profissões

[TABELA]
Inglês|Português
---|---
teacher|professor(a)
doctor|médico(a)
nurse|enfermeiro(a)
dentist|dentista
lawyer|advogado(a)
policeman|policial
fireman|bombeiro
mechanic|mecânico(a)
waiter|garçom
painter|pintor(a)
secretary|secretário(a)
actor|ator/atriz
carpenter|carpinteiro
baker|padeiro(a)
butcher|açougueiro(a)
postman|carteiro
[FIM_TABELA]

## Perguntando e respondendo sobre profissão

<exemplo en="What is your occupation?" pt="Qual é a sua profissão?"></exemplo>

<exemplo en="I am a teacher." pt="Eu sou professor(a)."></exemplo>

<exemplo en="I am a student." pt="Eu sou estudante."></exemplo>

**Dica:** repare que em inglês usamos o artigo **a/an** antes da profissão (*I am a teacher*), algo que não fazemos em português ("Eu sou professor", sem "um").

## Praticando

<exercicio-interativo pergunta="Como se diz 'médico' em inglês?" resposta="doctor" dica="Palavra parecida com o português."></exercicio-interativo>

<exercicio-interativo pergunta="Como se pergunta 'Qual é a sua profissão?' em inglês?" resposta="What is your occupation?" dica="Começa com 'What is your...'"></exercicio-interativo>

<flashcard frente="Como se diz 'advogado' em inglês?" verso="lawyer"></flashcard>

<flashcard frente="Como se diz 'bombeiro' em inglês?" verso="fireman"></flashcard>

<quiz>
Como se completa a frase "I am ___ teacher"?
[correta]a
an
the
</quiz>`
        },

        // ========================================
        // MÓDULO 6: PRESENT CONTINUOUS
        // ========================================
        {
            id: 17,
            titulo: "O Gerúndio em Inglês",
            descricao: "Como formar o gerúndio (verbo + ING)",
            modulo: "Módulo 6: Present Continuous",
            ordem: 17,
            publicado: true,
            conteudo: `# O Gerúndio em Inglês (The -ING Form)

O gerúndio equivale, em português, aos verbos terminados em **-ando, -endo, -indo** (falando, comendo, dirigindo). Em inglês, o gerúndio é a base para formar o Present Continuous, que veremos na próxima aula.

## Regra geral

Basta acrescentar **-ing** ao final do verbo (sem o "to" do infinitivo):

<exemplo en="to buy → buying, to sell → selling, to bark → barking" pt="comprar → comprando, vender → vendendo, latir → latindo"></exemplo>

## Verbos terminados em E

Retira-se o E antes de acrescentar -ing:

<exemplo en="to love → loving, to write → writing, to drive → driving" pt="amar → amando, escrever → escrevendo, dirigir → dirigindo"></exemplo>

## Verbos terminados em IE

Substitui-se o IE por Y antes de acrescentar -ing:

<exemplo en="to tie → tying, to die → dying, to lie → lying" pt="amarrar → amarrando, morrer → morrendo, mentir → mentindo"></exemplo>

## Verbos com consoante-vogal-consoante (sílaba tônica)

Quando o verbo termina em consoante-vogal-consoante e a última sílaba é tônica, **dobra-se a última consoante** antes de acrescentar -ing:

<exemplo en="to cut → cutting, to swim → swimming, to begin → beginning" pt="cortar → cortando, nadar → nadando, começar → começando"></exemplo>

**Exceção:** se o verbo terminar em **W** ou **X**, não se dobra a consoante:

<exemplo en="to snow → snowing, to fix → fixing" pt="nevar → nevando, consertar → consertando"></exemplo>

## Praticando

<colapsavel titulo="Resumo das 4 regras do gerúndio">
1. Regra geral: acrescente -ing ao verbo (to buy → buying).

2. Verbo terminado em E: retire o E e acrescente -ing (to write → writing).

3. Verbo terminado em IE: troque IE por Y e acrescente -ing (to die → dying).

4. Verbo curto terminado em consoante-vogal-consoante com sílaba tônica: dobre a última consoante (to cut → cutting), exceto se terminar em W ou X.
</colapsavel>

<exercicio-interativo pergunta="Qual é o gerúndio de 'to write'?" resposta="writing" dica="Retire o E antes de acrescentar -ing."></exercicio-interativo>

<exercicio-interativo pergunta="Qual é o gerúndio de 'to run'?" resposta="running" dica="Dobre a última consoante."></exercicio-interativo>

<quiz>
Qual é o gerúndio correto de "to swim"?
swiming
[correta]swimming
swimeing
</quiz>`
        },
        {
            id: 18,
            titulo: "Present Continuous",
            descricao: "Formando frases afirmativas, negativas e interrogativas",
            modulo: "Módulo 6: Present Continuous",
            ordem: 18,
            publicado: true,
            conteudo: `# Present Continuous (Presente Contínuo)

O Present Continuous é formado por: **verbo to be + verbo principal no gerúndio**.

## Forma afirmativa

[TABELA]
Pronome|To Be + Verbo-ING|Tradução
---|---|---
I|am working|Eu estou trabalhando
You|are working|Você está trabalhando
He/She/It|is working|Ele/ela está trabalhando
We|are working|Nós estamos trabalhando
They|are working|Eles estão trabalhando
[FIM_TABELA]

<exemplo en="He is reading a very good book." pt="Ele está lendo um livro muito bom."></exemplo>

## Forma negativa

Basta acrescentar **not** depois do verbo to be:

<exemplo en="They are not studying now. / They aren't studying now." pt="Eles não estão estudando agora."></exemplo>

## Forma interrogativa

Assim como no verbo to be sozinho, inverte-se a posição: o verbo to be vem antes do sujeito.

<exemplo en="Are they studying now?" pt="Eles estão estudando agora?"></exemplo>

<exemplo en="What is she doing?" pt="O que ela está fazendo?"></exemplo>

## Respostas curtas

[TABELA]
Pergunta|Sim|Não
---|---|---
Are you working?|Yes, I am.|No, I'm not.
Is he working?|Yes, he is.|No, he isn't.
Are they working?|Yes, they are.|No, they aren't.
[FIM_TABELA]

## Praticando

<exercicio-interativo pergunta="Complete: She ___ studying English. (is/are)" resposta="is" dica="'She' é terceira pessoa do singular."></exercicio-interativo>

<exercicio-interativo pergunta="Transforme em pergunta: 'They are working.'" resposta="Are they working?" dica="Inverta a ordem do sujeito com o verbo to be."></exercicio-interativo>

<exercicio-interativo pergunta="Transforme em negativa: 'I am studying.'" resposta="I am not studying." dica="Acrescente 'not' depois do verbo to be."></exercicio-interativo>

<quiz>
Qual é a forma correta do Present Continuous para "he" com o verbo "to read"?
he are reading
[correta]he is reading
he is read
</quiz>`
        },
        {
            id: 19,
            titulo: "Quando Usar o Present Continuous",
            descricao: "Ações do momento e planos futuros já combinados",
            modulo: "Módulo 6: Present Continuous",
            ordem: 19,
            publicado: true,
            conteudo: `# Quando Usar o Present Continuous

O Present Continuous tem dois usos principais — e entender a diferença evita muita confusão.

## Uso 1: ações acontecendo agora

Quando algo está acontecendo neste exato momento, ou nesse período (não necessariamente no segundo exato da fala):

<exemplo en="I am studying English at the moment." pt="Eu estou estudando inglês neste momento."></exemplo>

Expressões comuns desse uso: *now* (agora), *at the moment* (neste momento), *at present* (no presente).

## Uso 2: planos futuros já combinados

Se você já tem algo **planejado, agendado ou combinado** para o futuro, também pode usar o Present Continuous — mas é obrigatório incluir uma expressão de tempo que deixe claro que é futuro.

<exemplo en="I am traveling to Italy next year." pt="Vou viajar para a Itália no ano que vem."></exemplo>

<exemplo en="We are having dinner together tonight." pt="Nós vamos jantar juntos hoje à noite."></exemplo>

<exemplo en="She is starting a new job next week." pt="Ela vai começar um trabalho novo na semana que vem."></exemplo>

## Comparando os dois usos

Veja como a mesma estrutura gramatical (Present Continuous) pode significar coisas diferentes, dependendo apenas da expressão de tempo:

<exemplo en="They are studying English at the moment. (agora)" pt="Eles estão estudando inglês agora."></exemplo>

<exemplo en="They are studying English next year. (plano futuro)" pt="Eles vão estudar inglês no ano que vem."></exemplo>

**Conclusão:** é a expressão de tempo (*at the moment* ou *next year*) que indica se a ação é do presente ou um plano para o futuro — a estrutura gramatical é a mesma.

## Praticando

<exercicio-interativo pergunta="Complete: I ___ traveling to Italy next year. (plano futuro)" resposta="am" dica="Pronome 'I' usa essa forma do verbo to be."></exercicio-interativo>

<quiz>
Na frase "We are having dinner together tonight", a ação está acontecendo:
Neste exato segundo
[correta]No futuro, já combinado
No passado
</quiz>

<quiz>
Qual expressão de tempo indica um plano futuro (e não uma ação acontecendo agora)?
at the moment
[correta]next week
right now
</quiz>`
        },

        // ========================================
        // MÓDULO 7: COGNATOS E FALSOS COGNATOS
        // ========================================
        {
            id: 20,
            titulo: "Palavras Cognatas",
            descricao: "Palavras parecidas com o português que facilitam o aprendizado",
            modulo: "Módulo 7: Cognatos e Falsos Cognatos",
            ordem: 20,
            publicado: true,
            conteudo: `# Palavras Cognatas (Cognates)

Uma das melhores notícias para quem está aprendendo inglês: muitas palavras são **parecidas na escrita e no significado** com o português. Essas são chamadas de **palavras cognatas**, e reconhecê-las acelera muito sua leitura e compreensão.

## Por que isso importa?

Quando você lê um texto em inglês, não precisa traduzir palavra por palavra. Uma das primeiras estratégias de leitura é justamente **identificar as palavras cognatas**, que geralmente têm o mesmo significado nos dois idiomas.

## Exemplos de cognatos comuns

[TABELA]
Inglês|Português
---|---
animal|animal
hospital|hospital
important|importante
different|diferente
information|informação
music|música
telephone|telefone
family|família
possible|possível
natural|natural
[FIM_TABELA]

## Praticando a leitura com cognatos

Veja como reconhecer cognatos ajuda a entender um texto mesmo sem saber todas as palavras:

<exemplo en="Distance education takes place when a teacher and students are separated by physical distance." pt="A educação a distância ocorre quando um professor e os estudantes são separados por distância física."></exemplo>

Repare que *distance*, *education*, *separated* e *physical* são todos cognatos — reconhecê-los já dá uma ideia geral do assunto do texto, mesmo antes de traduzir tudo.

## Atenção: nem todo parecido é cognato de verdade

Existem palavras que **parecem** cognatos, mas têm um significado completamente diferente. Essas são os **falsos cognatos**, e vamos estudá-los na próxima lição — eles são uma das maiores armadilhas para quem está aprendendo inglês.

## Praticando

<exercicio-interativo pergunta="'Music' em inglês significa o quê em português?" resposta="música" dica="É um cognato — mesma escrita quase idêntica."></exercicio-interativo>

<quiz>
O que é uma "palavra cognata"?
Uma palavra que não existe em português
[correta]Uma palavra parecida na escrita e no significado entre dois idiomas
Um verbo irregular
</quiz>`
        },
        {
            id: 21,
            titulo: "Falsos Cognatos (False Friends)",
            descricao: "Palavras parecidas mas com significados diferentes",
            modulo: "Módulo 7: Cognatos e Falsos Cognatos",
            ordem: 21,
            publicado: true,
            conteudo: `# Falsos Cognatos (False Friends)

Os falsos cognatos são palavras escritas de forma parecida em dois idiomas, mas com **significados diferentes**. Eles são uma armadilha clássica para quem está aprendendo inglês — por isso vale a pena decorar os mais importantes.

## Os falsos cognatos mais importantes

[TABELA]
Palavra em inglês|Parece com|Mas na verdade significa
---|---|---
parents|parentes|pais (pai e mãe)
pretend|pretender|fingir
actually|atualmente|na verdade
college|colégio|faculdade
push|puxar|empurrar
pull|pular|puxar
fabric|fábrica|tecido
lunch|lanche|almoço
data|data (calendário)|dados (informações)
costume|costume (hábito)|fantasia (roupa)
exquisite|esquisito|belo, refinado
novel|novela|romance (livro)
library|livraria|biblioteca
prejudice|prejuízo|preconceito
[FIM_TABELA]

## Exemplos de uso correto

<exemplo en="My parents are travelling." pt="Meus pais estão viajando. (não 'meus parentes')"></exemplo>

<exemplo en="Actually, I don't like coffee." pt="Na verdade, eu não gosto de café."></exemplo>

<exemplo en="Push the door to open it." pt="Empurre a porta para abri-la."></exemplo>

<exemplo en="I need to buy some fabric for the dress." pt="Preciso comprar um tecido para o vestido."></exemplo>

## Por que isso é tão importante?

Imagine ler "My push was to open the door" pensando que "push" significa "puxar" — você entenderia o oposto do que a frase realmente diz! Por isso, sempre que uma palavra em inglês parecer "óbvia demais" por ser parecida com o português, vale a pena desconfiar e confirmar o significado.

## Praticando

<exercicio-interativo pergunta="O que significa 'push' em inglês?" resposta="empurrar" dica="É o oposto de 'pull'."></exercicio-interativo>

<exercicio-interativo pergunta="O que significa 'actually' em inglês?" resposta="na verdade" dica="Não significa 'atualmente'!"></exercicio-interativo>

<exercicio-interativo pergunta="O que significa 'college' em inglês?" resposta="faculdade" dica="Não é a mesma coisa que 'colégio' (ensino médio)."></exercicio-interativo>

<quiz>
Qual é o significado correto de "parents" em inglês?
parentes
[correta]pais
avós
</quiz>

<quiz>
"Push" significa:
puxar
[correta]empurrar
apertar
</quiz>`
        },

        // ========================================
        // MÓDULO 8: EXPRESSÕES DO DIA A DIA
        // ========================================
        {
            id: 22,
            titulo: "Expressões de Gentileza",
            descricao: "Please, thank you, excuse me e outras expressões educadas",
            modulo: "Módulo 8: Expressões do Dia a Dia",
            ordem: 22,
            publicado: true,
            conteudo: `# Expressões de Gentileza (Politeness)

Assim como em português, existem expressões em inglês que mostram educação e boa convivência. Vamos aprender as mais importantes.

## Pedindo e agradecendo

[TABELA]
Inglês|Português
---|---
Please|Por favor
Thank you / Thanks|Obrigado(a)
Thank you very much|Muito obrigado(a)
You're welcome|De nada
Excuse me|Com licença
Sorry|Desculpe
[FIM_TABELA]

**Curiosidade:** *You're welcome* significa literalmente "você é bem-vindo(a)" — é assim que o inglês expressa "de nada".

## Felicitando e desejando coisas boas

<exemplo en="Congratulations!" pt="Parabéns!"></exemplo>

<exemplo en="Good luck!" pt="Boa sorte!"></exemplo>

<exemplo en="Have a nice day!" pt="Tenha um bom dia! / Passe bem!"></exemplo>

<exemplo en="Have a nice trip!" pt="Boa viagem!"></exemplo>

## Quando alguém espirra

Em inglês, quando alguém espirra, é comum dizer:

<exemplo en="God bless you! / Bless you!" pt="Saúde!"></exemplo>

## Em um brinde

<exemplo en="Cheers!" pt="Saúde! (brinde)"></exemplo>

## Praticando

<exercicio-interativo pergunta="Como se diz 'de nada' em inglês?" resposta="You're welcome" dica="Literalmente: 'você é bem-vindo'."></exercicio-interativo>

<exercicio-interativo pergunta="Como se diz 'com licença' em inglês?" resposta="Excuse me" dica="Duas palavras."></exercicio-interativo>

<exercicio-interativo pergunta="Como se diz 'boa sorte' em inglês?" resposta="Good luck" dica="Duas palavras curtas."></exercicio-interativo>

<flashcard frente="Como se diz 'parabéns' em inglês?" verso="Congratulations!"></flashcard>

<quiz>
O que significa "You're welcome"?
Bem-vindo à minha casa
[correta]De nada
Muito obrigado
</quiz>`
        },
        {
            id: 23,
            titulo: "Expressando Opiniões e Sentimentos",
            descricao: "I think so, I hope so, I miss you e outras expressões úteis",
            modulo: "Módulo 8: Expressões do Dia a Dia",
            ordem: 23,
            publicado: true,
            conteudo: `# Expressando Opiniões e Sentimentos

Vamos aprender expressões curtas e muito usadas no dia a dia para dar opinião, expressar esperança e falar sobre sentimentos.

## Dando opinião

[TABELA]
Inglês|Português
---|---
I think so|Acho que sim
I don't think so|Acho que não
I guess so|Suponho que sim
I hope so|Espero que sim / Tomara que sim
I hope not|Espero que não / Tomara que não
[FIM_TABELA]

## Falando de sentimentos e saudade

<exemplo en="I miss you." pt="Tenho saudades de você."></exemplo>

<exemplo en="I'm homesick." pt="Estou com saudades de casa."></exemplo>

<exemplo en="I feel sorry for them." pt="Tenho muita pena deles."></exemplo>

## Concordando e discordando

<exemplo en="Exactly! / Absolutely!" pt="Exatamente! / Com certeza!"></exemplo>

<exemplo en="Of course!" pt="Claro! / Claro que sim!"></exemplo>

<exemplo en="No way!" pt="De jeito nenhum!"></exemplo>

## Dizendo que não faz diferença

<exemplo en="It doesn't matter." pt="Não importa."></exemplo>

<exemplo en="It's up to you." pt="Você é que resolve. / Você que sabe."></exemplo>

## Praticando

<exercicio-interativo pergunta="Como se diz 'Acho que sim' em inglês?" resposta="I think so" dica="Três palavras."></exercicio-interativo>

<exercicio-interativo pergunta="Como se diz 'Tenho saudades de você' em inglês?" resposta="I miss you" dica="Três palavras curtas."></exercicio-interativo>

<exercicio-interativo pergunta="Como se diz 'Não importa' em inglês?" resposta="It doesn't matter" dica="Usa o verbo 'to matter'."></exercicio-interativo>

<quiz>
Como se diz "Claro que sim!" em inglês?
No way!
[correta]Of course!
I hope not.
</quiz>`
        },
        {
            id: 24,
            titulo: "No Trabalho e Nos Estudos",
            descricao: "Vocabulário e expressões usadas no dia a dia profissional e escolar",
            modulo: "Módulo 8: Expressões do Dia a Dia",
            ordem: 24,
            publicado: true,
            conteudo: `# Expressões no Trabalho e nos Estudos

## No trabalho (At Work)

[TABELA]
Inglês|Português
---|---
I work overtime.|Eu faço hora extra.
Today is payday.|Hoje é dia de pagamento.
I'm on vacation.|Estou de férias.
I'm going to take a day off.|Vou tirar uma folga.
He's going to retire.|Ele vai se aposentar.
A new manager will be hired.|Um novo gerente será contratado.
[FIM_TABELA]

<exemplo en="I usually walk to work, but when it rains I drive." pt="Normalmente vou a pé para o trabalho, mas quando chove eu vou de carro."></exemplo>

## Nos estudos (Studying)

[TABELA]
Inglês|Português
---|---
I'm taking an English course.|Estou fazendo um curso de inglês.
I'm going to college.|Estou fazendo faculdade.
I did well in all my classes.|Eu me saí bem em todas as matérias.
I got a good grade.|Tirei uma nota boa.
Did you hand in your paper?|Você já entregou o seu trabalho?
[FIM_TABELA]

<exemplo en="I'm taking four courses this semester." pt="Estou fazendo quatro cadeiras neste semestre."></exemplo>

<exemplo en="Each student must write a paper at the end of the semester." pt="Cada aluno deve fazer um trabalho no final do semestre."></exemplo>

## Praticando

<exercicio-interativo pergunta="Como se diz 'Estou de férias' em inglês?" resposta="I'm on vacation" dica="Usa a preposição 'on'."></exercicio-interativo>

<exercicio-interativo pergunta="Como se diz 'Tirei uma nota boa' em inglês?" resposta="I got a good grade" dica="Usa o verbo 'to get' no passado."></exercicio-interativo>

<quiz>
Como se diz "Estou fazendo faculdade" em inglês?
I'm taking a course
[correta]I'm going to college
I'm on vacation
</quiz>

Parabéns por chegar até aqui! Você já domina cumprimentos, o verbo to be, artigos, vocabulário essencial, o Present Continuous e várias expressões do dia a dia. No próximo módulo, vamos revisar os verbos irregulares mais importantes antes da revisão final do curso.`
        },

        // ========================================
        // MÓDULO 9: VERBOS IRREGULARES
        // ========================================
        {
            id: 25,
            titulo: "Verbos Irregulares Mais Comuns",
            descricao: "Referência prática dos verbos irregulares essenciais",
            modulo: "Módulo 9: Verbos Irregulares",
            ordem: 25,
            publicado: true,
            conteudo: `# Verbos Irregulares (Irregular Verbs)

Em inglês, a maioria dos verbos forma o passado simplesmente acrescentando **-ed** (verbos regulares). Mas existe um grupo de verbos muito usados no dia a dia que **não seguem essa regra** — são os verbos irregulares, e é preciso memorizá-los.

## Como funciona a tabela

Cada verbo irregular tem três formas: o **infinitivo**, o **passado (past)** e o **particípio (past participle)** — usado em tempos compostos que você vai estudar mais adiante.

## Os verbos irregulares mais usados

[TABELA]
Infinitivo|Passado|Particípio|Tradução
---|---|---|---
be|was/were|been|ser/estar
begin|began|begun|começar
break|broke|broken|quebrar
bring|brought|brought|trazer
buy|bought|bought|comprar
come|came|come|vir
do|did|done|fazer
drink|drank|drunk|beber
drive|drove|driven|dirigir
eat|ate|eaten|comer
find|found|found|encontrar
get|got|got/gotten|conseguir, pegar
give|gave|given|dar
go|went|gone|ir
have|had|had|ter
know|knew|known|saber, conhecer
make|made|made|fazer
read|read|read|ler
run|ran|run|correr
say|said|said|dizer
see|saw|seen|ver
sleep|slept|slept|dormir
speak|spoke|spoken|falar
take|took|taken|tomar, levar
teach|taught|taught|ensinar
tell|told|told|contar
think|thought|thought|pensar
understand|understood|understood|entender
write|wrote|written|escrever
[FIM_TABELA]

<colapsavel titulo="Ver mais verbos irregulares comuns">
catch → caught → caught (pegar, apanhar)

choose → chose → chosen (escolher)

feel → felt → felt (sentir)

fly → flew → flown (voar)

forget → forgot → forgotten (esquecer)

hear → heard → heard (ouvir)

lose → lost → lost (perder)

meet → met → met (encontrar, conhecer)

pay → paid → paid (pagar)

ride → rode → ridden (cavalgar, andar de)

sing → sang → sung (cantar)

sit → sat → sat (sentar-se)

stand → stood → stood (ficar em pé)

swim → swam → swum (nadar)

win → won → won (vencer)
</colapsavel>

## Dica de estudo

Não tente decorar todos de uma vez. Pratique aos poucos, sempre com exemplos de frases — é assim que os verbos ficam de fato na memória.

## Praticando

<exercicio-interativo pergunta="Qual é o passado do verbo 'to go'?" resposta="went" dica="É totalmente diferente do infinitivo."></exercicio-interativo>

<exercicio-interativo pergunta="Qual é o passado do verbo 'to eat'?" resposta="ate" dica="Rima com 'gate'."></exercicio-interativo>

<exercicio-interativo pergunta="Qual é o passado do verbo 'to see'?" resposta="saw" dica="Rima com 'law'."></exercicio-interativo>

<flashcard frente="Passado de 'to write'" verso="wrote"></flashcard>

<flashcard frente="Passado de 'to speak'" verso="spoke"></flashcard>

<quiz>
Qual é o passado correto do verbo "to have"?
haved
[correta]had
haved/had
</quiz>`
        },

        // ========================================
        // MÓDULO 10: REVISÃO FINAL
        // ========================================
        {
            id: 26,
            titulo: "Revisão Geral do Curso",
            descricao: "Revise tudo que você aprendeu com um simulado completo",
            modulo: "Módulo 10: Revisão Final",
            ordem: 26,
            publicado: true,
            conteudo: `# Revisão Geral — Você Chegou ao Fim!

Parabéns por completar todo o curso de Inglês para Iniciantes! Vamos revisar os principais pontos de cada módulo e testar tudo o que você aprendeu.

## O que você aprendeu

- **Módulo 1:** Cumprimentos e apresentações (*Hi, How are you, My name is...*)
- **Módulo 2:** Alfabeto e números
- **Módulo 3:** O verbo to be (afirmativa, negativa, interrogativa e passado)
- **Módulo 4:** Artigos (a, an, the) e pronomes demonstrativos (this, that, these, those)
- **Módulo 5:** Vocabulário essencial (família, cores, dias, animais, alimentos, profissões)
- **Módulo 6:** Present Continuous (gerúndio e seus usos)
- **Módulo 7:** Cognatos e falsos cognatos
- **Módulo 8:** Expressões do dia a dia
- **Módulo 9:** Verbos irregulares mais comuns

## Diálogo final de leitura

Leia o diálogo abaixo e tente entender tudo, usando as técnicas que você aprendeu (cognatos, contexto, vocabulário):

\`\`\`
Ana: Good morning! My name is Ana. What's your name?
Marc: Hi, Ana! I'm Marc. Nice to meet you.
Ana: Nice to meet you too! Are you a student?
Marc: Yes, I am. I'm studying English at the moment. And you?
Ana: I'm a teacher. I teach Portuguese.
Marc: That's great! Good luck with your classes.
Ana: Thank you very much. See you later!
Marc: Bye!
\`\`\`

## Simulado final

<quiz>
Como Marc se apresenta no diálogo?
My name is Marc.
[correta]I'm Marc.
I am a Marc.
</quiz>

<quiz>
O que Marc está fazendo "at the moment" (neste momento)?
Trabalhando
[correta]Estudando inglês
Dando aula
</quiz>

<quiz>
Qual é a profissão de Ana?
Student
[correta]Teacher
Doctor
</quiz>

<quiz>
Qual é a forma negativa correta de "I am a student"?
[correta]I am not a student.
I not am a student.
I amn't a student.
</quiz>

<quiz>
Qual pronome substitui "Marc and I"?
They
You
[correta]We
</quiz>

<quiz>
Complete: "This is ___ apple." (escolha o artigo certo)
a
[correta]an
the
</quiz>

<quiz>
Qual é o passado do verbo "to go"?
goed
[correta]went
gone
</quiz>

<quiz>
"Parents" é um falso cognato. O que ele realmente significa?
parentes
[correta]pais
primos
</quiz>

<exercicio-interativo pergunta="Traduza para o inglês: 'Prazer em conhecê-lo'" resposta="Nice to meet you" dica="Três palavras + 'you'."></exercicio-interativo>

<exercicio-interativo pergunta="Complete: She ___ studying now. (Present Continuous)" resposta="is" dica="'She' é terceira pessoa do singular."></exercicio-interativo>

## Próximos passos

Você concluiu a base do inglês! A partir daqui, o caminho é praticar bastante: ouça músicas e podcasts em inglês, assista vídeos com legenda, e tente ler pequenos textos todos os dias. Quanto mais contato você tiver com o idioma, mais natural ele vai se tornar.

**Congratulations on finishing the course!** 🎉`
        }
    ]
};
