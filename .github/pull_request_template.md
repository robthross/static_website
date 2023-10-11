# Avaliação de Desenvolvedor(a)

Preencha os detalhamentos referentes à categoria do seu PR (funcionalidade ou bug) e remova a outra seção.

## Issues de Origem

Adicione o link do card do monday para está PR ou a issue do github

# Funcionalidade / Melhoria

### Descrição

Insira aqui uma breve descrição da feature, contextualizando os revisores e o profissional de ops que realizará o fechamento do PR.

### Evidências

Adicionar um print do antes de depois do front ou print do insomnia/postman/swagger quando for back-end.

| ANTES                                                                                                           | DEPOIS                                                                                                           |
| --------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| ![Antes](https://user-images.githubusercontent.com/58523339/162078855-d45ea0cb-20d6-4614-a33a-612e77d7024f.png) | ![Depois](https://user-images.githubusercontent.com/58523339/162078855-d45ea0cb-20d6-4614-a33a-612e77d7024f.png) |

---

# Bug / Problema / Erro

### Descrição do Problema

Insira aqui uma breve descrição do problema, contextualizando os revisores e o profissional de ops que realizará o fechamento do PR.

### Causa

Insira aqui uma breve descrição da causa do problema.

### Solução

Insira aqui uma breve descrição de como foi implementada a solução do problema - se possível, exemplificando e colocando links de referência.

## Evidências

Adicionar um print do antes de depois do front ou print do insomnia/postman/swagger quando for back-end.

| ANTES                                                                                                           | DEPOIS                                                                                                           |
| --------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| ![Antes](https://user-images.githubusercontent.com/58523339/162078855-d45ea0cb-20d6-4614-a33a-612e77d7024f.png) | ![Depois](https://user-images.githubusercontent.com/58523339/162078855-d45ea0cb-20d6-4614-a33a-612e77d7024f.png) |

---

## Questionário

**1. PR Relacionadas? Deve listar os demais PRs dependentes da implementação atual.?**

    R:

**2. Listagem de possíveis pontos de quebra e cenários observados pelo desenvolvedor?**

    R:

**3. Houve alteração de banco de dados? Caso sim, o código foi versionado num arquivo .sql? Qual é o arquivo?**

    R:

**4. Houve alteração nos arquivos de configuração? Caso sim, qual(is) os arquivos?**

    R:

**5. É preciso realizar alguma configuração de rotina automática (por exemplo, robôs e/ou scripts)? Se sim, quais são?**

    R:

**6. É preciso realizar alguma configuração que envolva infraestrutura (por exemplo, Docker, hosts, SAML, etc)? Se sim, quais são?**

    R:

**7. Houve mudanças nas configurações de integração com outros sistemas? Se sim, quais são?**

    R:

---

## Checklist - Dev

### Preencha este item antes de colocar o PR para revisão.

- [ ] Meu PR não possui trechos de código comentados / redundantes.
- [ ] Meu PR esta com evidências da conclusão do desenvolvimento anexado. (telas, endpoints (Swagger), etc).
- [ ] Meu PR está com Testes unitários (opcional).
- [ ] Meu PR não tem credenciais ou IDs hardcoded (utilizo constantes ou variáveis descritivas).
- [ ] Meu PR aponta para o branch main e dev.
- [ ] Meu PR não possui código de debug (console.logs, echos, print_r, etc).
- [ ] Meu PR não possui conflitos de código.
- [ ] Meu código não possui "declarações inalcançáveis" (código depois de return, die, etc).
- [ ] Self-review do código.
- [ ] Solicitação de review do PR.
- [ ] Atualização da documentação caso necessário.
- [ ] A ortografia das mensagens e/ou dos campos está correta?
