# Casos de Teste - Velô Sprint - Configurador de Veículo Elétrico

## Visão Geral

Este documento contém a especificação funcional de testes do sistema Velô Sprint, contemplando os módulos de Landing Page, Configurador, Checkout/Pedido, Análise de Crédito Automática, Confirmação e Consulta de Pedidos. Os cenários foram definidos com base na lógica implementada no front-end e na regra de negócio descrita para o produto.

## Regras de Negócio Consideradas

- Valor base do veículo: R$ 40.000
- Rodas Sport: +R$ 2.000
- Precision Park: +R$ 5.500
- Flux Capacitor: +R$ 5.000
- Financiamento: parcela fixa em 12x com taxa de juros compostos de 2% ao mês
- Score de crédito:
  - > 700: Aprovado
  - 501 a 700: Em análise
  - <= 500: Reprovado
- Exceção de aprovação: entrada >= 50% do valor total aprova automaticamente o pedido, ignorando o score
- Consulta de pedidos exige o número do pedido (`order_number`)

## CT01 - Acesso à Landing Page e navegação principal

#### Objetivo
Validar que a landing page renderiza corretamente e oferece os caminhos de navegação para iniciar a configuração do veículo.

#### Pré-Condições
- O usuário acessa a aplicação em um navegador.
- A rota inicial do sistema está disponível.

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1 | Acessar a URL inicial da aplicação. | A página inicial do Velô Sprint é exibida com header, hero, especificações, CTA e FAQ. |
| 2 | Verificar a presença do logo e do menu de navegação. | O header aparece fixo no topo e contém links e botão de ação. |
| 3 | Clicar no botão principal de chamada para ação na landing page. | O usuário é redirecionado para a rota de configuração do veículo. |
| 4 | Clicar em "Consultar Pedido" no header. | O usuário é levado para a tela de consulta de pedidos. |

#### Resultados Esperados
- A landing page carrega sem erros visuais ou de navegação.
- Os links de navegação levam às telas corretas.
- O usuário consegue iniciar o fluxo de compra a partir da landing page.

#### Critérios de Aceitação
- O sistema exibe os elementos principais da landing page.
- A navegação funciona nos caminhos esperados.
- O CTA e o menu direcionam para os módulos corretos.

---

## CT02 - Configuração inicial do veículo com valor base

#### Objetivo
Verificar que o configurador inicia com as opções padrão e calcula corretamente o preço base do Velô Sprint.

#### Pré-Condições
- O usuário acessou a rota de configuração do veículo.
- O sistema está em estado inicial sem personalizações anteriores.

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1 | Acessar a tela de configuração do veículo. | O painel de configuração é exibido com visual do carro e opções de cores, rodas e opcionais. |
| 2 | Observar a cor, rodas e opcionais selecionados por padrão. | O veículo inicia com a configuração padrão do sistema. |
| 3 | Observar o valor total exibido no footer da tela. | O valor exibido corresponde ao preço base do veículo sem adicionais. |
| 4 | Clicar no botão "Monte o Seu". | O sistema avança para a tela de checkout/pedido. |

#### Resultados Esperados
- O valor base apresentado é de R$ 40.000.
- A configuração inicial não apresenta itens extras selecionados.
- A transição para a tela de pedido ocorre sem erro.

#### Critérios de Aceitação
- A configuração inicial está consistente com a regra de negócio.
- O preço exibido corresponde ao valor base do veículo.
- A navegação para o checkout é permitida.

---

## CT03 - Adição de rodas Sport e cálculo de preço

#### Objetivo
Validar que a seleção de rodas Sport aumenta corretamente o valor do veículo.

#### Pré-Condições
- O usuário está na tela de configuração.
- O veículo está em configuração padrão.

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1 | Selecionar a opção de rodas "Sport". | O sistema marca a opção como selecionada. |
| 2 | Observar a imagem do carro e o painel de preço. | A visualização do veículo atualiza para a variante com rodas Sport. |
| 3 | Verificar o valor total exibido. | O valor total deve aumentar em R$ 2.000 em relação ao valor base. |

#### Resultados Esperados
- O total do veículo passa para R$ 42.000.
- A opção de rodas Sport aparece selecionada visualmente.

#### Critérios de Aceitação
- A regra de negócio de +R$ 2.000 é aplicada corretamente.
- O valor calculado está em conformidade com a regra de negócio.

---

## CT04 - Adição de opcionais e cálculo do valor total

#### Objetivo
Validar a soma correta dos valores dos opcionais adicionais ao veículo.

#### Pré-Condições
- O usuário está na tela de configuração do veículo.
- A configuração inicial está ativa.

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1 | Selecionar o opcional "Precision Park". | O sistema marca a opção como selecionada e exibe o valor adicional. |
| 2 | Observar o valor total. | O valor total deve aumentar em R$ 5.500. |
| 3 | Selecionar o opcional "Flux Capacitor". | O sistema mantém as opções selecionadas e atualiza o valor. |
| 4 | Observar o total final. | O valor final deve incluir ambos os opcionais: +R$ 5.500 + R$ 5.000. |

#### Resultados Esperados
- O preço total da configuração com ambos os opcionais é de R$ 50.500, considerando o veículo base sem rodas Sport.
- As opções selecionadas são refletidas no total e na configuração do pedido.

#### Critérios de Aceitação
- Cada opcional adiciona corretamente seu valor de preço.
- O total calculado corresponde à soma da base + opcionais.

---

## CT05 - Remoção de opcionais e atualização do total

#### Objetivo
Verificar que a desmarcação de um opcional remove corretamente o valor do total.

#### Pré-Condições
- O usuário está na tela de configuração.
- O opcional "Precision Park" e o "Flux Capacitor" estão selecionados.

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1 | Desmarcar o opcional "Flux Capacitor". | A opção deixa de estar selecionada. |
| 2 | Observar o valor total exibido. | O valor deve diminuir em R$ 5.000. |
| 3 | Desmarcar o opcional "Precision Park". | A opção também deixa de estar selecionada. |
| 4 | Verificar o valor final. | O sistema retorna ao valor do veículo base ou ao valor dos itens atualmente selecionados. |

#### Resultados Esperados
- O cálculo do total reflete exatamente os itens ativos da configuração.
- A remoção de opcionais não mantém valores antigos no total.

#### Critérios de Aceitação
- O total está sempre consistente com a seleção atual.
- Nenhum item desmarcado continua impactando o preço.

---

## CT06 - Validação de campos obrigatórios do checkout

#### Objetivo
Validar que o sistema impede o envio de pedido com campos obrigatórios vazios ou inválidos.

#### Pré-Condições
- O usuário acessou a tela de checkout.
- O veículo já foi configurado.

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1 | Deixar todos os campos vazios. | O formulário não deve permitir o envio. |
| 2 | Tentar submeter o pedido. | O sistema exibe mensagens de erro referentes aos campos obrigatórios. |
| 3 | Preencher somente nome e sobrenome e tentar enviar. | Os demais campos obrigatórios continuam bloqueando o envio. |
| 4 | Informar um e-mail em formato inválido. | O sistema exibe erro de validação do e-mail. |
| 5 | Informar CPF, telefone e loja em formato inconsistente. | O sistema notifica que os dados são inválidos ou obrigatórios. |

#### Resultados Esperados
- O usuário não consegue finalizar a compra com dados incompletos.
- Mensagens de erro são exibidas de forma clara.

#### Critérios de Aceitação
- Todos os campos do formulário são validados antes do envio.
- Não há criação de pedido com dados incompletos.

---

## CT07 - Finalização de pedido à vista com sucesso

#### Objetivo
Validar o fluxo feliz de compra com pagamento à vista e confirmação do pedido.

#### Pré-Condições
- O veículo foi configurado.
- O usuário acessou o formulário de checkout.
- O cliente preencheu os dados corretamente.
- O pagamento à vista foi selecionado.

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1 | Selecionar a opção "À Vista". | O sistema habilita a seleção do pagamento à vista. |
| 2 | Preencher nome, sobrenome, e-mail, telefone, CPF, loja e aceitar os termos. | O formulário fica válido para envio. |
| 3 | Clicar em "Finalizar Pedido". | O sistema processa o pedido sem consultar crédito. |
| 4 | Observar a tela de confirmação. | O sistema apresenta mensagem de pedido concluído e dados do pedido. |

#### Resultados Esperados
- O pedido é criado com status de aprovação.
- A tela de confirmação exibe número do pedido, dados do cliente e valor final.

#### Critérios de Aceitação
- A compra à vista é concluída com sucesso.
- O pedido é salvo corretamente no sistema.

---

## CT08 - Finalização de pedido com financiamento e score acima de 700

#### Objetivo
Validar que um cliente com score acima de 700 é aprovado para financiamento e seu pedido é registrado corretamente.

#### Pré-Condições
- O usuário está no checkout.
- A configuração do veículo foi realizada.
- A API de análise de crédito retorna um score maior que 700.

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1 | Selecionar a opção de pagamento por "Financiamento". | O sistema mostra os valores de entrada, parcela e juros de 2% ao mês. |
| 2 | Informar dados válidos do cliente e aceitar os termos. | O formulário é validado corretamente. |
| 3 | Clicar em "Finalizar Pedido". | O sistema consulta a análise de crédito. |
| 4 | Verificar o retorno da API. | O sistema identifica score maior que 700. |
| 5 | Observar a confirmação final. | O pedido é exibido como aprovado e com parcelas em 12x. |

#### Resultados Esperados
- O pedido recebe status "APROVADO".
- O valor do financiamento e da parcela são exibidos conforme a regra do sistema.

#### Critérios de Aceitação
- O score acima de 700 garante aprovação para financiamento.
- O fluxo informa corretamente a condição de crédito e a parcela calculada.

---

## CT09 - Finalização de pedido com financiamento e score entre 501 e 700

#### Objetivo
Validar que um cliente com score dentro do intervalo 501 a 700 entra em análise.

#### Pré-Condições
- O usuário está no checkout.
- O veículo está configurado.
- A API de análise de crédito retorna um score de 650.

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1 | Selecionar financiamento. | O sistema mantém o fluxo de pagamento parcelado. |
| 2 | Informar dados válidos do cliente. | O formulário passa na validação. |
| 3 | Enviar o pedido. | O sistema realiza a análise de crédito. |
| 4 | Verificar o status resultante. | O sistema define status como "EM_ANALISE". |
| 5 | Observar a tela de confirmação. | A interface mostra o pedido em análise e não aprova automaticamente. |

#### Resultados Esperados
- O pedido não é aprovado automaticamente.
- O status final é "EM_ANALISE".

#### Critérios de Aceitação
- O comportamento segue a regra: 501 a 700 = em análise.
- O usuário recebe retorno coerente com a avaliação do crédito.

---

## CT10 - Finalização de pedido com financiamento e score menor ou igual a 500

#### Objetivo
Validar a regra de reprovação do crédito quando o score é igual ou inferior a 500.

#### Pré-Condições
- O usuário acessou a tela de checkout.
- O pagamento foi definido como financiamento.
- A API de análise de crédito retorna score 500 ou inferior.

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1 | Informar dados válidos do cliente. | O formulário é aceito. |
| 2 | Selecionar financiamento e concluir o pedido. | O sistema consulta o crédito. |
| 3 | Verificar resposta da API. | O score retornado é 500 ou menor. |
| 4 | Observar o resultado do pedido. | O sistema define status "REPROVADO". |

#### Resultados Esperados
- O pedido não é concluído como aprovado.
- O retorno final indica que o crédito foi reprovado.

#### Critérios de Aceitação
- O status "REPROVADO" é aplicado corretamente.
- A regra de negócio está consistente com o score informado.

---

## CT11 - Exceção de aprovação por entrada mínima de 50%

#### Objetivo
Validar a regra de exceção de crédito: entrada maior ou igual a 50% do valor total aprova automaticamente mesmo com score menor que 700.

#### Pré-Condições
- O cliente está em financiamento.
- O total do pedido foi calculado.
- A API de crédito retorna um score inferior a 700, por exemplo 650.

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1 | Informar o valor de entrada igual ou maior que 50% do valor total do pedido. | O sistema aceita o valor informado. |
| 2 | Selecionar financiamento e submeter a compra. | O processo de análise de crédito inicia. |
| 3 | Verificar o retorno do score. | O valor retornado é inferior a 700. |
| 4 | Observar a decisão do sistema. | O pedido é aprovado automaticamente por causa da entrada alta. |

#### Resultados Esperados
- O pedido recebe status "APROVADO" mesmo com score abaixo de 700.
- A lógica da entrada mínima prevalece sobre a avaliação do score.

#### Critérios de Aceitação
- A exceção da regra de entrada >= 50% é respeitada.
- O sistema ignora a regra de score quando a entrada atende ao critério.

---

## CT12 - Falha de comunicação com a API de crédito

#### Objetivo
Validar o comportamento do sistema quando a API de crédito falha ou não retorna dados válidos.

#### Pré-Condições
- O usuário está no checkout com financiamento selecionado.
- O sistema não consegue acessar a API de análise de crédito ou o retorno é inválido.

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1 | Preencher todos os dados do cliente corretamente. | O formulário fica válido e pronto para envio. |
| 2 | Clicar em finalizar pedido. | O sistema tenta consultar a API de crédito. |
| 3 | Simular falha da API ou resposta sem score. | O sistema deve informar erro ao usuário. |
| 4 | Verificar a mensagem exibida. | O usuário recebe notificação de falha na consulta de crédito. |

#### Resultados Esperados
- O pedido não é registrado.
- O usuário recebe indicação clara de falha no serviço.

#### Critérios de Aceitação
- O sistema trata erro de comunicação sem quebrar a interação.
- A experiência do usuário mostra mensagem informativa e não avança para confirmação.

---

## CT13 - Validação do checkbox de termos e condições

#### Objetivo
Verificar que o aceite dos termos é obrigatório para finalizar o pedido.

#### Pré-Condições
- O usuário acessou o checkout.
- Todos os outros campos estão preenchidos corretamente.

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1 | Completar todos os campos dados do cliente. | O formulário fica preenchido. |
| 2 | Não marcar o checkbox de termos. | O sistema mantém a opção como não aceita. |
| 3 | Tentar enviar a compra. | O sistema bloqueia o envio. |
| 4 | Marcar o checkbox de termos e enviar. | O pedido pode ser processado normalmente. |

#### Resultados Esperados
- O pedido só pode continuar com o aceite dos termos.
- O sistema comunica claramente a obrigação do aceite.

#### Critérios de Aceitação
- O termo é obrigatório.
- Sem aceite, não é possível concluir a compra.

---

## CT14 - Consulta de pedido com número válido

#### Objetivo
Validar que a busca por pedido funcionalmente aceita um `order_number` válido e exibe corretamente os dados.

#### Pré-Condições
- Existe um pedido registrado no sistema.
- O usuário acessou a tela de consulta de pedidos.

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1 | Informar um número de pedido existente. | O campo aceita o valor do pedido. |
| 2 | Clicar em "Buscar Pedido". | O sistema consulta o banco e localiza o registro. |
| 3 | Observar os dados exibidos na tela. | O sistema apresenta número, status, cliente, configuração e valor do pedido. |

#### Resultados Esperados
- O pedido é encontrado e exibido corretamente.
- O resultado da consulta fornece o status e informações relevantes ao cliente.

#### Critérios de Aceitação
- O número do pedido é obrigatório para a busca.
- O sistema identifica corretamente o registro correspondente.

---

## CT15 - Consulta de pedido com número inexistente

#### Objetivo
Validar o comportamento da consulta quando o número do pedido não existe no sistema.

#### Pré-Condições
- O usuário acessou a tela de consulta de pedidos.
- O sistema possui pedidos cadastrados, mas o número informado não corresponde a nenhum registro.

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1 | Informar um número de pedido inexistente. | O sistema aceita o valor inserido. |
| 2 | Clicar em "Buscar Pedido". | O sistema tenta localizar o pedido. |
| 3 | Observar retorno da tela. | O sistema informa que o pedido não foi encontrado. |

#### Resultados Esperados
- O sistema não mostra dados de pedido, apenas mensagem de não encontrado.
- A busca falha de forma amigável e sem erro crítico.

#### Critérios de Aceitação
- O sistema trata corretamente entradas inexistentes.
- A consulta encerra com mensagem informativa ao usuário.

---

## CT16 - Consulta de pedido com campo vazio

#### Objetivo
Validar que a busca exige o preenchimento do número do pedido antes de consultar.

#### Pré-Condições
- O usuário acessou a tela de consulta de pedidos.

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1 | Deixar o campo de número do pedido vazio. | O campo permanece em branco. |
| 2 | Tentar clicar em "Buscar Pedido". | O botão deve permanecer desabilitado ou a ação deve ser bloqueada. |

#### Resultados Esperados
- O usuário não consegue enviar uma consulta vazia.
- O sistema mantém a restrição de obrigatoriedade do número do pedido.

#### Critérios de Aceitação
- O campo de busca é obrigatório.
- Não há consulta sem `order_number`.

---

## CT17 - Confirmação de pedido aprovado

#### Objetivo
Validar a tela de confirmação após confirmação de um pedido aprovado.

#### Pré-Condições
- O usuário concluiu um pedido com status aprovado.
- O sistema redirecionou para a tela de sucesso.

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1 | Observar a tela de confirmação. | A interface mostra mensagem de pedido aprovado. |
| 2 | Verificar número do pedido e dados do cliente. | Os dados do cliente e do pedido são exibidos corretamente. |
| 3 | Clicar em "Consultar Pedido". | O usuário é levado para a tela de consulta. |
| 4 | Clicar em "Configurar Outro". | O usuário retorna para a tela de configuração. |

#### Resultados Esperados
- O usuário visualiza confirmação objetiva de que o pedido foi aprovado.
- As ações de consulta e configuração são acessíveis.

#### Critérios de Aceitação
- A tela de sucesso comunica corretamente o resultado ao cliente.
- Existem caminhos de navegação para etapas seguintes do fluxo.

---

## CT18 - Confirmação de pedido reprovado por crédito

#### Objetivo
Verificar o comportamento da tela de confirmação quando a análise de crédito resulta em reprovação.

#### Pré-Condições
- O usuário concluiu um pedido em financiamento.
- O score da análise resultou em status "REPROVADO".

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1 | Observar a tela de confirmação após a tentativa de compra. | O sistema mostra mensagem de crédito reprovado. |
| 2 | Verificar o texto exibido ao usuário. | O sistema informa que o pedido não foi aprovado e sugere tentativa de pagamento à vista. |
| 3 | Tentar consultar o pedido. | O sistema deve permitir a consulta do pedido, mesmo em status reprovado. |

#### Resultados Esperados
- A interface comunica claramente o motivo da rejeição.
- O usuário identifica que a compra não foi aprovada e que deve tentar outra alternativa.

#### Critérios de Aceitação
- A rejeição é exibida de forma explícita.
- O usuário entende a ação recomendada pelo sistema.

---

## CT19 - Navegação para rota inexistente

#### Objetivo
Validar o comportamento do sistema em rotas inexistentes ou não mapeadas.

#### Pré-Condições
- O usuário acessa uma URL que não corresponde a uma rota válida do sistema.

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1 | Informar uma rota inválida na URL. | O sistema tenta resolver a rota. |
| 2 | Observar a resposta da aplicação. | A aplicação exibe a página de "Not Found" ou rota inválida. |

#### Resultados Esperados
- O usuário recebe feedback de que a página não existe.
- O sistema não quebra a navegação ou a aplicação.

#### Critérios de Aceitação
- A aplicação trata rotas desconhecidas de forma controlada.
- O usuário tem uma experiência apropriada de erro de navegação.

---

## CT20 - Validação da regra de preço com combinação completa de itens

#### Objetivo
Verificar a composição final do preço ao combinar todas as variações disponíveis: roda Sport, Precision Park e Flux Capacitor.

#### Pré-Condições
- O usuário está no configurador.
- O sistema apresenta todas as opções de personalização.

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1 | Selecionar todas as opções disponíveis: rodas Sport, Precision Park e Flux Capacitor. | O sistema ativa todas as opções. |
| 2 | Observar o valor total apresentado. | O sistema deve somar o valor base + rodado Sport + Precision Park + Flux Capacitor. |
| 3 | Verificar a validade do cálculo. | O total calculado deve ser R$ 52.500. |

#### Resultados Esperados
- O valor final corresponde ao cálculo de 40.000 + 2.000 + 5.500 + 5.000 = 52.500.
- Nenhum valor é perdido ou duplicado no cálculo do total.

#### Critérios de Aceitação
- A combinação completa de itens resulta no valor esperado.
- A regra de negócio está aplicada corretamente em todas as opções.

---

## Cobertura por módulo

- Landing Page: CT01, CT19
- Configurador: CT02, CT03, CT04, CT05, CT20
- Checkout/Pedido: CT06, CT07, CT08, CT09, CT10, CT11, CT12, CT13
- Análise de Crédito Automática: CT08, CT09, CT10, CT11, CT12
- Confirmação: CT17, CT18
- Consulta de Pedidos: CT14, CT15, CT16

## Observações finais

- Os casos apresentados cobrem avaliações positivas, negativas, regras de negócio, validações de campos, erro de dados e fluxo principal do usuário.
- Como o sistema possui apenas um perfil de usuário definido (Cliente), não houve cenários de permissoes diferenciadas entre perfis.
- Não foram incluídos testes de performance, carga, stress ou automação, conforme o escopo informado.
