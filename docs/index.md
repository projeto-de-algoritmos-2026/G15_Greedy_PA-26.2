# Compactador e Descompactador de Arquivos

A aplicação consiste em um sistema interativo para compactação e descompactação de arquivos de texto sem perda de dados**, utilizando o algoritmo de Codificação de Huffman.

## Escopo do Projeto

O objetivo principal da aplicação é permitir tanto a compactação quanto a descompactação de arquivos de texto.

No processo de compactação, o sistema recebe um arquivo `.txt`, calcula a frequência dos caracteres, gera a Árvore de Huffman e produz o arquivo comprimido.

No processo de descompactação, o sistema recebe o arquivo comprimido e, utilizando a árvore ou a tabela de frequência armazenada, reconstrói o documento `.txt` original sem alteração do conteúdo.

## Fluxo e Funcionalidades do Sistema

A interface do sistema é composta pelos seguintes componentes funcionais:

### Entrada de Dados (Upload)

Campo interativo para submissão do arquivo `.txt` para compactação ou do arquivo comprimido para descompactação.

### Painel de Estatísticas

Exibição das métricas resultantes da compactação, incluindo:

- Tamanho original;
- Tamanho reduzido;
- Taxa de compactação obtida.

### Visualização da Árvore de Huffman

Representação gráfica da árvore binária gerada durante o processamento, exibindo os nós e as ramificações de bits:

- `0` para a esquerda;
- `1` para a direita.

### Mapeamento de Códigos

Tabela que apresenta cada caractere presente no texto e o respectivo código binário atribuído pelo algoritmo de Huffman.

### Exportação (Download)

Botões para realizar o download:

- Do arquivo compactado após o processo de compactação;
- Do arquivo `.txt` restaurado após o processo de descompactação.