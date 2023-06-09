import confetti from 'https://cdn.skypack.dev/canvas-confetti';

class Dialog {
  constructor(dialog, click) {
    this.click = click;
    this.dialog = dialog;
    this.dialogIndex = 0;
    this.text = '';
    this.textIndex = 0;
    this.render = this.render.bind(this); // bind the render method to the Dialog instance
  }
  render() {
    if (this.textIndex === this.text.length) return this.set();
    if (this.textIndex < this.text.length) {
      document.getElementById('dialog-content').innerHTML += this.text.charAt(
        this.textIndex
      );
      this.textIndex++;
      setTimeout(this.render, 40);
    }
  }
  set() {
    if (this.dialogIndex === this.dialog.length) return this.end();
    this.textIndex = 0;
    this.text = this.dialog[this.dialogIndex];
    setTimeout(() => {
      document.getElementById('dialog-content').innerHTML = '';
      setTimeout(this.render, 600);
    }, 1000);
    this.dialogIndex++;
  }
  end() {
    if (!this.click) {
      document.getElementById('nameForm').classList.add('bounce-in-top');
      setTimeout(() => {
        document.getElementById('name').focus();
      }, 1100);
    } else {
      const end = Date.now() + 15 * 1000;

      // go Buckeyes!
      const colors = ['#00000', '#047940'];

      (function frame() {
        confetti({
          particleCount: 2,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: colors,
        });

        confetti({
          particleCount: 2,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: colors,
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      })();
      document.getElementById('shop').style.display = 'flex';
    }
  }
  checking() {}
}

document.getElementById('send-btn').onclick = (event) => {
  document.getElementById('nameForm').style.display = 'none';
  const name = document.getElementById('name').value;
  const dialog = new Dialog(
    [
      `So you are ${name}, eh.`,
      "It looks like you're on the invitation list after all.",
      'Welcome! The tickets are $55 cash payable to Ms. Fil or Ms. Blazek.',
    ],
    true
  );
  dialog.set();
};

document.getElementById('buy').onclick = (event) => {
  window.location.href = 'mailto:jblazek@retsd.mb.ca';
};

window.addEventListener('load', (event) => {
  const dialog = new Dialog(
    ['Woah, hold on there!', 'Are you on the list?', 'Let me see some ID.'],
    false
  );
  dialog.set();
});
