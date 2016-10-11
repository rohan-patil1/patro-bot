const random = array => { return array[Math.floor(Math.random() * array.length)] }

const getGreetings = () => {
  const answers = [
    'Hello!',
    'Hi :)',
    'Hey, nice to see you.',
    'Hi, how can I help you?'
  ]
  return random(answers);
}

module.exports = getGreetings;
