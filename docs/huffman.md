# Algoritmo de Huffman

## O que é?

O **Algoritmo de Huffman** é um método de compressão de dados sem perda, utilizado para reduzir o tamanho de arquivos sem alterar seu conteúdo original.

Seu funcionamento é baseado na frequência dos caracteres. Caracteres que aparecem com maior frequência recebem códigos binários menores, enquanto caracteres menos frequentes recebem códigos maiores.

## Construção da Árvore de Huffman

A compactação começa com a análise do arquivo e a contagem da frequência de cada caractere. A partir dessas informações, são criados os nós que formarão a árvore.

O processo de construção segue estas etapas:

1. **Contagem das frequências:** identifica a quantidade de ocorrências de cada caractere.
2. **Criação dos nós:** cada caractere é representado por um nó contendo sua frequência.
3. **Seleção dos menores:** os dois nós com menor frequência são selecionados.
4. **Combinação:** os nós selecionados são unidos em um novo nó, cuja frequência é a soma das frequências anteriores.
5. **Repetição:** o processo continua até que todos os nós estejam conectados em uma única árvore.
6. **Definição dos códigos:** os caminhos da árvore recebem valores binários, sendo `0` para a esquerda e `1` para a direita.

O resultado é uma árvore binária, na qual os caracteres ficam nas folhas e os nós internos representam as combinações das frequências.

## Codificação

Após a construção da árvore, cada caractere recebe um código binário único, determinado pelo caminho entre a raiz e sua folha.

Esses códigos são utilizados para substituir os caracteres do arquivo original, formando a sequência de bits que será armazenada no arquivo compactado.

Como os caracteres mais frequentes possuem códigos menores, a quantidade total de bits necessária para representar o arquivo é reduzida.

## Descompactação

Para descompactar o arquivo, os bits armazenados são lidos sequencialmente e utilizados para percorrer a Árvore de Huffman:

- `0` → percorre o ramo esquerdo;
- `1` → percorre o ramo direito.

Ao alcançar uma folha, o caractere correspondente é identificado e adicionado ao arquivo restaurado. O processo continua até que todos os bits sejam processados.

Dessa forma, o conteúdo original é reconstruído sem perda de informações.