# Arremate — a última linha muda tudo

Estratégia territorial local para quem gosta de antecipar sequências. Em um campo triangular, conecte dois pontos vizinhos por uma aresta ainda vazia. Fechar o terceiro lado de um triângulo captura esse retalho, vale um ponto e mantém a vez. Uma linha pode fechar dois retalhos. Sem captura, a vez passa. Termina quando todas as linhas estiverem ocupadas; maior território vence, empate possível em campos pares.

Três campos: 4/5/6 divisões, com 16/25/36 retalhos e 30/45/63 linhas. Rival Leve escolhe primeira linha disponível. Atento prioriza capturas, evita oferecer fechamento e, quando não há jogada segura, compara cadeias de captura imediata oferecidas. É heurística local determinística, sem alegar adversário ótimo. Dupla compartilha o mesmo dispositivo; não é multiplayer online. Quem começa é configurável antes da partida.

Referência: família genérica de ligar pontos e conquistar áreas, com malha triangular e regras/construção próprias. Marca, código e apresentação originais, sem copiar ativos, layouts ou fases comerciais. Diferença de Cifra: decisões de território público e sequências, sem código oculto ou feedback de dedução. Diferença de Semeia: desenhar fronteiras comuns, sem distribuição de sementes.

Preact 11 + TypeScript + SVG/CSS. Composição de cartaz com campo triangular central, placares em cantos opostos, fundo lavanda, linha azul profundo, retalhos amarelos/azuis numerados. Captura aparece como tecido dobrado, linha atual tracejada/costurada. Sem painel lateral, instrumento escuro de Cifra ou retícula industrial de Vão.

Clique/toque em linha vazia; alternativa de seleção de linha por número e botão Costurar. Teclado Tab/Enter nas linhas ou setas para percorrer/Enter para confirmar no campo focado; P pausa, Escape retoma/manual. Sem arraste. Menu e resultado em DOM. Pausa por perda de foco, retomada explícita, movimento reduzido e áudio opcional inicialmente desligado. Histórico local por campo/modo; tentativa atual não é salva.

Escopo completo: regras, três campos, ambos rivais/dupla, vitória/derrota/empate, cancelamento de timers no reset/pausa, persistência robusta, partidas pela interface e publicação pública gratuita. Sem backend, conta, API, ranking online, cartão, faturamento ou trial. Sem prometer dificuldade humana comprovada, hardware universal ou invulnerabilidade.
