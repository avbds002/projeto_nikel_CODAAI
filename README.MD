# Projeto Nikel CODAAÍ

Esse projeto faz parte do curso do programa VESTE TECH da Grow Dev, o projeto consiste em criar uma aplicação para gerenciamento
de transações financeiras.

A ideia por trás do projeto é fazer com que os alunos aprendam um pouco sobre desenvolvimento full stack criando uma aplicação do
ínicio ao fim e colocando a aplicação no ar.

## OBS: apesar dos 30 dias de hosting na nuvem da plataforma da UMBLER eu optei por fazer o projeto inteiro em localhost, pois a minha intenção com esse projeto era apenas entender como funciona a integração do back-end com o front-end de uma aplicação web.

Todas as fotoso e estilos já estão linkadas diretamente no projeto, caso você queira baixar o projeto para avaliar realize os seguintes passos:

1. Para clonar o projeto

```
git clone https://github.com/avbds002/projeto_nikel_CODAAI.git
```

2. Ajuste as URLs das imagens e dos estilos para que a aplicação não "quebre" o front-end

3. Abra a pasta do back-end separadamente e realize o seguinte comando para instalar todas as depêndencias:

```
npm install
```

4. Em seguida execute os comandos:

```
npm build (para transpilar o código do typescript no back-end para javascript)
npm run dev (para rodar a aplicação em ambiente de desenvolvimento)
npm run start (para rodar a aplicação em ambiente de produção)
```

### Obs: poderão ocorrer alguns erros na compilação mas para corrigir basta colocar extensão .js no final dos arquivos da pasta build, infelizmente não consegui contornar isso, mas a aplicação funciona normalmente.

Caso desejar subir a aplicação na nuvem da UMBLER procure por algum serviço de banco de dados postgres gratuito na web, como o finado ElephantSQL ou similar e realize algumas modificações nos arquivos relacionados ao prisma.
