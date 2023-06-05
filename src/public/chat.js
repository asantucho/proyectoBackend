console.log('HALAAAAAAA');

const message = document.getElementById('message');
const send = document.getElementById('send');
const output = document.getElementById('output');
const actions = document.getElementById('actions');

let user = null;

if (!user) {
  Swal.fire({
    title: 'Log in to our chat!',
    text: 'Type your username here',
    input: 'text',
    inputValidator: (value) => {
      if (!value) {
        return 'Your username is required';
      }
    },
  }).then((input) => {
    user = input.value;
    socketClient.emit('newUser', user);
  });
}

send.addEventListener('click', () => {
  socketClient.emit('chat:message', {
    user,
    message: message.value,
  });
  message.value = '';
});

socketClient.on('messages', (data) => {
  actions.innerHTML = '';
  const chatRender = data
    .map((message) => {
      return `<p><strong>${message.user}:<strong> ${message.message}</p>`;
    })
    .join(' ');
  output.innerHTML = chatRender;
});
