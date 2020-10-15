# Gestão de Configuração

## Controle de Versão

A ferramenta de controle de versão adotada no projeto foi o
[Git](https://git-scm.com/), sendo que o [Github](https://github.com)
foi utilizado para hospedagem do repositório.

O projeto segue a seguinte convenção para o nome de branchs:

- **Master:** Contém o código estável do projeto, não deve receber commits diretamente.
- **Hotfix:** Branch extraída de Master quando se nota alguma instabilidade para reparo rápido.
- **Release:** Branch extraída de Develop para estabilizar as funcionalidades antes de aplicá-las na Master.
- **Develop:** Contém o código com todas as funcionalidades finalizadas até o momento. Pode possuir algumas instabilidades.
- **Feature:** Contém o código de uma funcionalidade, esse branch é criado logo antes do início do desenvolvimento de dada funcionalidade, e fundido com Develop depois de ser finalizada. Podem existir múltiplos branches feature ao mesmo tempo.

Quanto à gerência de issues, o projeto adota a seguinte convenção para
etiquetas:

- **bug:** uma funcionalidade encontra-se com problemas
- **documentation:** uma funcionalidade precisa ser documentada
- **enhancement:** uma nova funcionalidade precisa ser introduzida ou melhorada

## Hospedagem

> O site está sendo hospedado no repl.it em dois ambientes, um contendo o código da branch master e outro com o código em dev.
>
> Dessa forma, os integrantes podem trabalhar em suas máquinas localmente ou pelo repl.it em conjunto. Os links se encontram abaixo.
>
> - **Master:** https://libera-libras-master.gomideleo.repl.co
> - **Dev:** https://libera-libras-dev.gomideleo.repl.co
