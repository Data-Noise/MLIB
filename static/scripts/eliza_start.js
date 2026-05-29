let bot = null;
						let messagesDiv = document.getElementById('messages');
						let forScroll = document.getElementById('chat');
						
						var MesStyle =`
						
						--aug-border-bg: rgba(240, 255, 255, 0.333);
							--aug-br: 80px;
							--aug-border-all: 2px;
							--aug-tl: 20px;
							--aug-br: 25px;
							--aug-inlay-bg: rgba(0, 0, 0, 0);   
						`;
						
						var botMes=`
						<div style=" display: flex; 
						background-color: rgba(159, 255, 114, 1); 
						height:100%; align-items: center; 
						text-align: center; 
						justify-content: center;
						margin-right:3px; 
						padding:4px">ELIZA</div>
						`

						var youMes=`
						<div style=" display: flex; 
						background-color: rgba(255, 229, 79, 1);; 
						height:100%; align-items: center; 
						text-align: center; 
						justify-content: center;
						margin-right:3px; 
						padding:4px">You</div>
						`
						// Функция для добавления сообщения в чат
						function addMessage(text, isUser) {
							//<p class="chatText"></p> data-augmented-ui= "br-clip both"
							var image = '<div class></div>'
							var msgDiv = document.createElement('div');
							//msgDiv.classList.add('data-augmented-ui=" br-clip both"')
							msgDiv.setAttribute('data-augmented-ui', 'tl-clip br-clip both');
							msgDiv.style = MesStyle;
							//msgDiv.value = 'data-augmented-ui=" br-clip both"';
							msgDiv.className = isUser ? 'user-message' : 'bot-message';
							msgDiv.innerHTML = (isUser ? youMes : botMes) + '<p class="chatText">'+text+'</p>';
							messagesDiv.appendChild(msgDiv);
							messagesDiv.scrollTop = messagesDiv.scrollHeight;

							
						
							forScroll.scrollTo({
							top: forScroll.scrollHeight,
							behavior: 'smooth'  // плавная анимация
							});
						}
						
						// Инициализация бота
						function initBot() {
							bot = new ElizaBot(false);
							const greeting = bot.getInitial();
							addMessage(greeting, false);
						}
						
						// Отправка сообщения
						function sendMessage() {
							const input = document.getElementById('userInput');
							const userText = input.value.trim();
							
							if (userText === '') return;
							
							addMessage(userText, true);
							
							// Проверка на завершение разговора
							if (bot.quit) {
								addMessage('Сеанс завершён. Обновите страницу для нового разговора.', false);
								input.disabled = true;
								return;
							}
							
							// Получаем ответ бота
							const reply = bot.transform(userText);
							addMessage(reply, false);
							
							// Очищаем поле ввода
							input.value = '';
						}
						
						// Отправка по нажатию Enter
						document.getElementById('userInput').addEventListener('keypress', function(e) {
							if (e.key === 'Enter') {
								sendMessage();
							}
						});
						
						// Запускаем бота при загрузке страницы
						initBot();