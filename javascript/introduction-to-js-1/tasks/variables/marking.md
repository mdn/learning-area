# Guia de marcação de variáveis JavaScript

O objetivo das tarefas é demonstrar um entendimento dos recursos JavaScript abordados na lição [Armazenando as informações que você precisa — Variáveis](https://developer.mozilla.org/pt-BR/docs/Learn/JavaScript/First_steps/Variáveis) lesson in Learn Web Development on MDN.

Nota: Se houver um erro no seu código, ele será exibido no painel de resultados da página, para ajudá-lo a tentar descobrir a resposta (ou no console JavaScript do navegador, no caso da versão para download).

## Task 1

Esta tarefa abrange o entendimento básico de declarar uma variável com um valor e inicializá-la - tanto separadamente quanto ao mesmo tempo. Idealmente, seu código deve ser algo como isto:

```
let meuNome;
meuNome = 'Chris';
let minhaIdade = 42;
```

`let` é ideal para ambas as declarações. `var` também está OK, mas `let` é a melhor opção. `const` não é realmente apropriada, pois os valores podem mudar e não funcionará na primeira instância.

O valor `minhaIdade` funcionará se você o inicializou com um valor numérico (sem aspas) ou string (aspas); no entanto, é um valor numérico, portanto, usar aspas para isso não é correto.

## Tarefa 2

Na tarefa 2 o aluno precisa adicionar uma nova linha para corrigir o valor da variável `meuNome`, para que ela exiba seu nome na tela.

O código final deve ser algo como isto:

```
let meuNome = 'Paul';
meuNome = 'Chris';
```

## Tarefa 3

A última tarefa deste artigo se concentra em corrigir alguns erros relacionados a variáveis. Basicamente:

1. A variável `minhaIdade` não está sendo exibida porque está sendo declarada inicialmente como `const` e, em seguida, é feita uma tentativa de alterar o valor.
2. O resultado da soma não está sendo gerado corretamente porque a variável `myAge` está sendo declarada como um número. É preciso que sejam removidas as aspas.

A solução deve ser algo como isto:

```
let meuNome = 'Default';
meuNome = 'Chris'

let minhaIdade = 42;
```